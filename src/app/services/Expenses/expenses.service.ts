import { Injectable } from '@angular/core';
import { TableData } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  // private readonly STORAGE_KEY = 'expenses';

  // constructor() { }

  // getExpenses(): PeriodicElement[] {
  //   const expensesJson = localStorage.getItem(this.STORAGE_KEY);
  //   return expensesJson ? JSON.parse(expensesJson) : [];
  // }

  // saveExpenses(expenses: PeriodicElement[]): void {
  //   localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
  // }

  private readonly STORAGE_KEY = 'expenses';

  constructor() { }

  getExpenses(): TableData[] {
    const expensesJson = localStorage.getItem(this.STORAGE_KEY);
    return expensesJson ? JSON.parse(expensesJson) : [];
  }

  getNextPosition(): number {
    const expenses = this.getExpenses();
    const maxPosition = expenses.length > 0 ? Math.max(...expenses.map(expense => expense.position)) : 0;
    return maxPosition + 1;
  }

  getExpenseById(id: number): TableData | undefined {
    const expenses = this.getExpenses();
    return expenses.find(expense => expense.position === id);
  }

  addExpense(expense: TableData): void {
    let expenses = this.getExpenses();
    expenses.push(expense);
    this.saveExpenses(expenses);
  }

  updateExpense(id: number, expense: TableData): void {
    let expenses = this.getExpenses();
    const index = expenses.findIndex(item => item.position === id);
    if (index !== -1) {
      expenses[index] = expense;
      this.saveExpenses(expenses);
    }
  }

  deleteExpense(id: number): void {
    let expenses = this.getExpenses();
    const index = expenses.findIndex(expense => expense.position === id);
    if (index !== -1) {
      expenses.splice(index, 1);
      this.updatePositions(expenses);
      this.saveExpenses(expenses);
    }
  }

  private updatePositions(expenses: TableData[]): void {
    expenses.forEach((expense, index) => expense.position = index + 1);
  }

  private saveExpenses(expenses: TableData[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
  }
}
