import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register';
import { BooksList } from './features/books/pages/books-list/books-list';
import { BookForm } from './features/books/pages/book-form/book-form';
import { MyQuotes } from './features/quotes/pages/my-quotes/my-quotes';
import { authGuard, guestGuard } from './features/auth/guards/auth-guard';
import { QuoteForm } from './features/quotes/pages/quote-form/quote-form';
import { Title } from '@angular/platform-browser';
import { quotesLimitGuard } from './features/quotes/guards/quotes-limit-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Logga in', canActivate: [guestGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registrera',
    canActivate: [guestGuard],
  },
  { path: 'books', component: BooksList, title: 'Böcker', canActivate: [authGuard] },
  { path: 'books/new', component: BookForm, title: 'Ny bok', canActivate: [authGuard] },
  { path: 'books/:id/edit', component: BookForm, title: 'Redigera bok', canActivate: [authGuard] },
  { path: 'quotes', component: MyQuotes, title: 'Mina citat', canActivate: [authGuard] },
  { path: 'quotes/new', component: QuoteForm, title: 'Nytt citat', canActivate: [authGuard, quotesLimitGuard] },
  {
    path: 'quotes/:id/edit',
    component: QuoteForm,
    title: 'Redigera citat',
    canActivate: [authGuard],
  },
];
