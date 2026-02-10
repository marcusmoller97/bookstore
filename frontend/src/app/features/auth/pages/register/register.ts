import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private auth: AuthService,
  ) {
    this.form = this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();
    if (payload.password !== payload.confirmPassword) {
      this.error = 'Lösenorden matchar inte.';
      this.success = '';
      return;
    }

    // db registration call
    this.auth.register({ username: payload.username, password: payload.password }).subscribe({
      next: (response) => {
        /* console.log('Registration successful:', response); */
        this.error = '';
        this.success = 'Registrering klar! Du kan logga in nu.';
        this.form.reset();

        // redirect to login after a short delay if successful registration
        setTimeout(() => this.router.navigate(['/login']), 800);
      },
      error: (err) => {
        console.log(Response)
        this.error = 'Registrering misslyckades. Försök igen.';
        this.success = '';
      },
    });

  }
}
