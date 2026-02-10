import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookStoreService } from '../../services/book-store.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm {
  form;
  isEdit = false;
  bookId: number | null = null;
  error = '';

  constructor(
    private fb: FormBuilder,
    private store: BookStoreService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      publishedDate: ['', [Validators.required]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const book = this.store.getById(id);
      if (book) {
        this.isEdit = true;
        this.bookId = id;
        this.form.patchValue(book);
      } else {
        this.error = 'Hittade inte boken.';
      }
    }
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();
    if (this.isEdit && this.bookId !== null) {
      this.store.update(this.bookId, payload);
    } else {
      this.store.create(payload);
    }

    this.router.navigate(['/books']);
  }
}
