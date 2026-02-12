import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { quotesLimitGuard } from './quotes-limit-guard';

describe('quotesLimitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => quotesLimitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
