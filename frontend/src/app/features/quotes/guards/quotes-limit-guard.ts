import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuotesService } from '../service/quotes.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const quotesLimitGuard: CanActivateFn = () => {
  const quotes = inject(QuotesService);
  const router = inject(Router);

  return quotes.getAll().pipe(
    map((quoteList) => (quoteList.length >= 5 ? router.createUrlTree(['/quotes']) : true)),
    catchError(() => of(router.createUrlTree(['/quotes']))),
  );
};
