import {Component, input} from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User {
  selectedUserName = input<string | null | undefined>(null);
}
