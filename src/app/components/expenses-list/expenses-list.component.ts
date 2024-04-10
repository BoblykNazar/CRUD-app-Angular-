import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/Expenses/expenses.service';
import { Router } from '@angular/router';
import { Expense } from '../../types';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.scss'
})
export class ExpensesListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'amount', 'date', 'category','comment', 'actions'];
  expense: Expense[] = [];

  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) { };

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expense = this.expensesService.getExpenses();
  }

  openForm() {
    this.router.navigate(['/add']);
  }

  editExpense(element: Expense): void {
    this.router.navigate(['/edit', element.position]);
  }

  deleteExpense(element: Expense): void {
    this.expensesService.deleteExpense(element.position);
    this.loadExpenses();
  }

  getCategoryClass(category: string): string {
    switch (category.toLowerCase()) {
      case 'food':
        return 'food';
      case 'transport':
        return 'transport';
      case 'shopping':
        return 'shopping';
      default:
        return '';
    }
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }
}
