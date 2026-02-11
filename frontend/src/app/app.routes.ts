import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register';
import { BooksList } from './features/books/pages/books-list/books-list';
import { BookForm } from './features/books/pages/book-form/book-form';
import { MyQuotes } from './features/quotes/pages/my-quotes/my-quotes';
import { authGuard, guestGuard } from './features/auth/guards/auth-guard';
import { QuoteForm } from './features/quotes/pages/quote-form/quote-form';

export const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'login', component: LoginComponent,  canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: 'books', component: BooksList, canActivate: [authGuard] },
    { path: 'books/new', component: BookForm, canActivate: [authGuard] },
    { path: 'books/:id/edit', component: BookForm, canActivate: [authGuard] },
    { path: 'quotes', component: MyQuotes, canActivate: [authGuard] },
    {path: 'quotes/new', component: QuoteForm, canActivate: [authGuard] },
];
