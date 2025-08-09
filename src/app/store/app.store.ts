import {computed, DestroyRef, inject} from '@angular/core';
import {patchState, signalStore, type, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {
  entityConfig,
  removeEntity,
  setAllEntities, updateEntity,
  upsertEntity,
  withEntities
} from '@ngrx/signals/entities';

import {IOrder, IUser } from '../models/app.interface';
import {AppService} from '../app.service.ts/app.service';
import {Subject, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

const usersMeta  = entityConfig({
  entity: type<IUser>(),
  collection: 'users',
  selectId: (user: IUser) => user.id
});
const ordersMeta = entityConfig({
  entity: type<IOrder>(),
  collection: 'orders',
  selectId: (order: IOrder) => order.id
});

const INITIAL_APP_STATE: AppState = {
  selectedUserId: null,
};

type AppState = {
  selectedUserId: number | null;
}


export const AppStore = signalStore(
  withState(INITIAL_APP_STATE),
  withEntities(usersMeta),
  withEntities(ordersMeta),
  withComputed((store) => {
    const selectedUser = computed(() => {
      const userId = store.selectedUserId();
      if (!userId) {
        return null;
      }
      return store.usersEntityMap()[String(userId)];
    });
    const selectedUserOrders = computed<IOrder[]>(() => {
      const id = store.selectedUserId();
      if (!id) {
        return [];
      }
      return store.ordersEntities().filter(o => o.userId === id);
    });
    const selectedUserTotal = computed(() => {
      const orders = selectedUserOrders() as IOrder[];
      return  orders.reduce((sum, order) => sum + (order.total ?? 0), 0);
    });
    return {
      selectedUser,
      selectedUserOrders,
      selectedUserTotal
    }
  }),


  withMethods((store, appService = inject(AppService), destroyRef = inject(DestroyRef)) => {
    const saveUser = (user: IUser) => {
      patchState(store, upsertEntity(user, usersMeta));
    };

    const updateUser = (user: IUser) => {
      patchState(store, updateEntity({ id: user.id, changes: user }, usersMeta));
    };

    const deleteUser = (userId: number) => {
      const wasSelected = store.selectedUserId() === userId;
      patchState(store, removeEntity(userId, usersMeta));
      if (wasSelected) {
        updateSelectedUserId(null);
      }
    };
    const updateSelectedUserId = (userId: number | null) => {
      searchTrigger$.next(userId);
    };
    const searchTrigger$ = new Subject<number | null>();
    searchTrigger$.pipe(switchMap(id => appService.getSelectedUser(id)),takeUntilDestroyed(destroyRef))
      .subscribe(id => patchState(store, { selectedUserId: id }));

    const getUsersOrdersSum = () => {
      const selectedUser = store.selectedUser();
      const selectedUserOrders = store.selectedUserOrders();
      const totalOrdersSum = selectedUserOrders.reduce((sum, order) => sum + (order.total ?? 0), 0);
      return { selectedUser, totalOrdersSum };
    };
    return {
      saveUser,
      updateUser,
      deleteUser,
      updateSelectedUserId,
      getUsersOrdersSum,
    }
  }),
  withHooks({
    onInit(store) {
      const appService = inject(AppService);
      appService.getUsersData().subscribe(({ users, orders }) => {
        patchState(store, setAllEntities(users, usersMeta));
        patchState(store, setAllEntities(orders, ordersMeta));
      })
  }})
)
