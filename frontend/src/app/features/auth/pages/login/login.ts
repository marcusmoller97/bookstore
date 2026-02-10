import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  form;

  error = '';
  readonly demoUsers = [
    { username: 'admin', password: 'admin123', name: 'Admin' },
    { username: 'user', password: 'user123', name: 'User' },
    { username: 'student', password: 'student123', name: 'Student' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.getRawValue();
    const match = this.demoUsers.find(
      (user) => user.username === username && user.password === password,
    );

    if (!match) {
      this.error = 'Fel användarnamn eller lösenord.';
      return;
    }

    // Demo-token: byt ut mot riktig JWT senare.
    const token = `demo-token.${btoa(username)}.${Date.now()}`;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify({ username, name: match.name }));

    this.error = '';
    this.router.navigate(['/books']);
  }
}
