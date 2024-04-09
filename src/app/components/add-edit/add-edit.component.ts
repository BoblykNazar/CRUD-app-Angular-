import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../../services/Expenses/expenses.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {
  form: FormGroup;
  categories: string[] = ['Food', 'Transport', 'Shopping','Others'];
  isEditing: boolean = false;
  expenseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private expensesService: ExpensesService
  ) {
    this.form = this.fb.group({
      position: this.expensesService.getNextPosition(),
      amount: [null, Validators.required],
      date: new Date(),
      category: ['', Validators.required],
      comment: ''
    });
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.expenseId = +id;
        this.loadExpense(this.expenseId);
      }
    });
  }

  loadExpense(id: number): void {
    const expense = this.expensesService.getExpenseById(id);
    if (expense) {
      this.form.patchValue(expense);
    }
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      if (this.isEditing && this.expenseId) {
        this.expensesService.updateExpense(this.expenseId, this.form.value);
      } else {
        this.expensesService.addExpense(this.form.value);
      }
      this.router.navigate(['/list']);
    }
  }

  onCancelForm() {
    this.router.navigate(['/list']);
  }
}
