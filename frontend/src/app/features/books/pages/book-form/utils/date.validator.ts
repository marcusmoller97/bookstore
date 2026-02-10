import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null; // handled by required validator

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { invalidDate: true };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date > today) {
    return { futureDate: true };
  }
  
  return null;
}
