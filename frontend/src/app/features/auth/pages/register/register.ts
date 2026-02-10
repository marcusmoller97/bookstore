import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  form;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { username, password, confirmPassword } = this.form.getRawValue();
    if (password !== confirmPassword) {
      this.error = 'Lösenorden matchar inte.';
      this.success = '';
      return;
    }

    // Demo: spara lokalt tills backend finns
    const users = JSON.parse(localStorage.getItem('demo_users') ?? '[]');
    if (users.find((u: { username: string }) => u.username === username)) {
      this.error = 'Användarnamnet är redan taget.';
      this.success = '';
      return;
    }

    users.push({ username, password });
    localStorage.setItem('demo_users', JSON.stringify(users));

    this.error = '';
    this.success = 'Registrering klar! Du kan logga in nu.';
    this.form.reset();

    // valfritt: gå till login efter kort stund
    setTimeout(() => this.router.navigate(['/login']), 800);
  }
}
