import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../data/services/auth.service';

export function emailExistsValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null); // если пусто, не валидируем
    }
    return authService.checkEmailExists(control.value).pipe(
      map((exists) => (exists ? { emailTaken: true } : null)),
      catchError(() => of(null)) // на случай ошибки сервера, пропускаем
    );
  };
}
