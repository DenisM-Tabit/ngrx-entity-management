import { Injectable } from '@angular/core';
import {delay, forkJoin, Observable, of, Subject, switchMap, take} from 'rxjs';
import { IOrder, IUser} from '../models/app.interface';
import { ORDERS, USERS} from '../constants/users-mock.constant';


@Injectable({ providedIn: 'root' })
export class AppService {
  private _apiTrigger$ = new Subject<number>()




  getUsersData(): Observable<{ users: IUser[]; orders: IOrder[] }> {
    return forkJoin({
      orders: this.getOrders(),
      users: this.getUsers(),
    }).pipe(take(1));

  }

  getUsers(): Observable<IUser[]> {
    return of(USERS).pipe(delay(1000), take(1))
  }

  getOrders(): Observable<IOrder[]> {
    return of(ORDERS).pipe(delay(1500), take(1))
  }

  getSelectedUser(userId: number | null): Observable<number | null> {
    return of(userId).pipe(delay(5000), take(1));
  }

  selectedUser$ = this._apiTrigger$.pipe(
    switchMap(id => of(id).pipe(delay(5000), take(1)))
  );
}
