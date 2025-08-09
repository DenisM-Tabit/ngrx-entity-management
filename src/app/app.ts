import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AppStore} from './store/app.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [AppStore]
})
export class App {}
