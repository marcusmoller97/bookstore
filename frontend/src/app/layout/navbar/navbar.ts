import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  theme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    const stored = localStorage.getItem('theme');
    this.theme = stored === 'dark' ? 'dark' : 'light';
    this.applyTheme();
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  get username(): string {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw).username ?? '' : '';
    } catch {
      return '';
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-bs-theme', this.theme);
  }
}
