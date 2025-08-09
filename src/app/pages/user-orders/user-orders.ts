import {Component, inject, signal} from '@angular/core';
import {AppStore} from '../../store/app.store';
import {MatMenu, MatMenuItem, MatMenuTrigger,} from '@angular/material/menu';
import {User} from '../user/user';
import {Order} from '../order/order';
import {MatButton} from '@angular/material/button';
import {IUser} from '../../models/app.interface';
import {interval, takeUntil, tap, timer} from 'rxjs';

@Component({
  selector: 'app-user-orders',
  imports: [
    MatMenu,
    MatMenuItem,
    User,
    Order,
    MatButton,
    MatMenuTrigger,
  ],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss'
})
export class UserOrders {
  store = inject(AppStore)

  users = this.store.usersEntities;
  selectedUserTotal = this.store.selectedUserTotal;
  selectedUser = this.store.selectedUser;

  timeElapsed = signal<number>(0)

  selectUser(user: IUser) {
    this.store.updateSelectedUserId(user.id);
    this.startCounter()
  }

  // search timer emulator for display purpose.
  private startCounter () {
    this.timeElapsed.set(0)
    interval(1000).pipe(
      tap(() => this.timeElapsed.update(v => v + 1)),
      takeUntil(timer(5100))
    ).subscribe({
      complete:() => {
        this.timeElapsed.set(0)
      }
    });
  }
}
