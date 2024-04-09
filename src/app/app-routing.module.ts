import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'list', component: ExpensesListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddEditComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddEditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
