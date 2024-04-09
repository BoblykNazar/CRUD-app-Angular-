import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  loginErrorMessage = '';
  passwordErrorMessage = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges
    )
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateErrorMessage());

    this.form = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  updateErrorMessage() {
    this.checkErrorLogin();
    this.checkErrorPass();
  }

  checkErrorLogin () {
    if (this.email.hasError('required')) {
      this.loginErrorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.loginErrorMessage = 'Not a valid email';
    } else {
      this.loginErrorMessage = '';
    }
  }

  checkErrorPass () {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage = 'You must enter a password';
    } else if (this.password.hasError('minlength')) {
      this.passwordErrorMessage = 'Not a valid password';
    } else {
      this.passwordErrorMessage = '';
    }
  }

  onLogin() {
    const { email, password } = this.form.value;
    if (this.authService.login(email, password)) {
      this.router.navigate(['/list']);
    } else {
      this.loginErrorMessage = 'Incorrect email or password';
    }
  }
}
