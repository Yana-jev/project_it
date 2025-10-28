import { Component, inject } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../data/services/cart.service';
import { emailExistsValidator } from '../../data/services/authasyncValidator';
import { catchError, switchMap, of } from 'rxjs';
@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  authService = inject(AuthService);
  cartService = inject(CartService)
  router = inject(Router); 
  emailExistsError = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, Validators.required)
  }, { validators: this.passwordsMatchValidator });
  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }


onSubmit() {
  if (!this.form.valid) return;

  const { email, password } = this.form.value;
  this.emailExistsError = false;

  this.authService.signUp({ email, password }).pipe(
    switchMap(() => this.authService.login({ email, password })),
    switchMap(() => this.cartService.mergeGuestCartWithServer()),
    catchError((err) => {
      const errorMessage = err?.error?.message ?? '';

      if (err.status === 400 && errorMessage.includes('Ya existe')) {
        this.emailExistsError = true;
        return of(null);
      }


      if (err.status === 400 && Array.isArray(err.error?.errors)) {
        const firstError = err.error.errors[0];
        this.form.setErrors({ server: firstError.msg });
        return of(null);
      }

      return of(null);
    })
  ).subscribe((mergedItems) => {
    if (this.emailExistsError || this.form.errors?.['server']) {
      return;
    }

    if (mergedItems) {
      this.cartService.cartItems.set(mergedItems);
    }

    this.router.navigate(['/home']);
  });
}





  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsMismatch: true };
    }
    return null;
  }
}
