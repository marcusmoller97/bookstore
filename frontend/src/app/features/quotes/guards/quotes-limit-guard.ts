import { CanActivateFn } from '@angular/router';

export const quotesLimitGuard: CanActivateFn = (route, state) => {
  
  return true;
};
