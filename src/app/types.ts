export interface Expense {
  position: number;
  amount: number;
  date: Date;
  category: string;
  comment: string;
}

export interface User {
  email: string;
  password: string;
}
