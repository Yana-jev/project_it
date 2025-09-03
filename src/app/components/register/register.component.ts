import { Component, inject } from '@angular/core';
import { AuthService } from '../../data/services/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../data/services/cart.service';

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
  
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, Validators.required)
  }, { validators: this.passwordsMatchValidator });
  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  
onSubmit() {
    if (!this.form.valid) return;

    const { email, password } = this.form.value;

    this.authService.signUp({ email, password }).subscribe({
      next: () => {
        console.log('Registration successful');

        this.authService.login({ email, password }).subscribe({
          next: () => {
            console.log('Login successful');

            // Сливаем корзину гостя → сервер и обновляем сигнал cartItems
            this.cartService.mergeGuestCartWithServer().subscribe({
              next: (mergedItems) => {
                console.log('Guest cart merged to server');
                this.cartService.cartItems.set(mergedItems);
                this.router.navigate(['/home']);
              },
              error: (mergeError) => {
                console.error('Error merging guest cart:', mergeError);
                this.router.navigate(['/home']);
              }
            });
          },
          error: (loginError) => console.error('Login failed', loginError)
        });
      },
      error: (registrationError) => console.error('Registration failed', registrationError)
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
