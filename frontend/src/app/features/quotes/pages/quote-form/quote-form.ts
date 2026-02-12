import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuotesService } from '../../service/quotes.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss',
})
export class QuoteForm {
  form;
  isEdit = false;
  quoteId: number | null = null;
  error = '';

  constructor(
    private fb: FormBuilder,
    private store: QuotesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.nonNullable.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[^<>]*$/)]],
      text: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[^<>]*$/)]],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.store.getById(id).subscribe({
        next: (quote) => {
          this.isEdit = true;
          this.quoteId = id;
          this.form.patchValue(quote);
        },
        error: () => {
          this.error = 'Hittade inte citatet.';
        }
      });
    }
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();
    if (this.isEdit && this.quoteId !== null) {
      this.store.update(this.quoteId, payload).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: () => {
          this.error = 'Kunde inte uppdatera citatet.';
        }
      });
      return;
    }

    this.store.create(payload).subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: () => {
        this.error = 'Kunde inte skapa citatet.';
      }
    });
  }
}
