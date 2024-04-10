import { Injectable } from '@angular/core';
import { Expense } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private readonly STORAGE_KEY = 'expenses';

  constructor() { }

  getExpenses(): Expense[] {
    const expensesJson = localStorage.getItem(this.STORAGE_KEY);
    return expensesJson ? JSON.parse(expensesJson) : [];
  }

  getNextPosition(): number {
    const expenses = this.getExpenses();
    const maxPosition = expenses.length > 0 ? Math.max(...expenses.map(expense => expense.position)) : 0;
    return maxPosition + 1;
  }

  getExpenseById(id: number): Expense | undefined {
    const expenses = this.getExpenses();
    return expenses.find(expense => expense.position === id);
  }

  addExpense(expense: Expense): void {
    const expenses = this.getExpenses();
    expenses.push(expense);
    this.saveExpenses(expenses);
  }

  updateExpense(id: number, expense: Expense): void {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(item => item.position === id);

    if (index !== -1) {
      expenses[index] = expense;
      this.saveExpenses(expenses);
    }
  }

  deleteExpense(id: number): void {
    const expenses = this.getExpenses();
    const index = expenses.findIndex(expense => expense.position === id);

    if (index !== -1) {
      expenses.splice(index, 1);
      this.updatePositions(expenses);
      this.saveExpenses(expenses);
    }
  }

  private updatePositions(expenses: Expense[]): void {
    expenses.forEach((expense, index) => expense.position = index + 1);
  }

  private saveExpenses(expenses: Expense[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
  }
}
