import {Component, input} from '@angular/core';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order {
  selectedUserTotal = input<number | null>(null);

}
