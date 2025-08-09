import {IOrder, IUser} from '../models/app.interface';

export const USERS: IUser[] =[
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Davis' },
  { id: 4, name: 'Diana Miller' },
  { id: 5, name: 'Ethan Wilson' },
  { id: 6, name: 'Fiona Clark' },
  { id: 7, name: 'George Lewis' },
  { id: 8, name: 'Hannah Young' },
  { id: 9, name: 'Ian Hall' },
  { id: 10, name: 'Jasmine Allen' },
]

export const ORDERS : IOrder[] =[
  { id: 1, userId: 1, total: 50 },
  { id: 2, userId: 1, total: 75 },
  { id: 3, userId: 2, total: 20 },
  { id: 4, userId: 2, total: 30 },
  { id: 5, userId: 3, total: 100 },
  { id: 6, userId: 3, total: 45 },
  { id: 7, userId: 4, total: 60 },
  { id: 8, userId: 4, total: 25 },
  { id: 9, userId: 6, total: 80 },
  { id: 10, userId: 6, total: 40 },
  { id: 11, userId: 7, total: 15 },
  { id: 12, userId: 7, total: 35 },
  { id: 13, userId: 8, total: 90 },
  { id: 14, userId: 8, total: 20 },
  { id: 15, userId: 9, total: 55 },
  { id: 16, userId: 9, total: 65 },
  { id: 17, userId: 10, total: 10 },
  { id: 18, userId: 10, total: 15 },
  { id: 19, userId: 1, total: 120 },
  { id: 20, userId: 3, total: 75 },
]
