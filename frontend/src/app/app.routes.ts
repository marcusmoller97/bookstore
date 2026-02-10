import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';
import { RegisterComponent } from './features/auth/pages/register/register';
import { BooksList } from './features/books/pages/books-list/books-list';
import { BookForm } from './features/books/pages/book-form/book-form';
import { MyQuotes } from './features/quotes/pages/my-quotes/my-quotes';

export const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'books', component: BooksList },
    { path: 'books/new', component: BookForm },
    { path: 'books/:id/edit', component: BookForm },
    { path: 'quotes', component: MyQuotes }
];
