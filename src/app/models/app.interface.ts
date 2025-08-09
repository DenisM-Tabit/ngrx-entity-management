

export interface IAppState {
  users: {
    entities: Record<number, IUser>;
    selectedUserId?: number | null;
  };
  orders: {
    entities: Record<number, IOrder>;
  };
}

export interface IUser {
  id:number;
  name: string;
}
export interface IOrder {
  id:number;
  userId:number;
  total: number;
}

export interface IUsersOrderSum{
  user: IUser;
  totalOrdersSum: number;
}


