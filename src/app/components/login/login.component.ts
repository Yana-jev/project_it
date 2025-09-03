import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data/services/auth.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../data/services/cart.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  cartService = inject(CartService); 
  router = inject(Router); 
  
  form: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
    
  })
  
  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

onSubmit() {
  if (this.form.valid) {
    this.authService.login(this.form.value).subscribe({
      next: () => {
        console.log('Login successful');

        // Переносим корзину гостя → в серверную и ждём завершения
        this.cartService.mergeGuestCartWithServer().subscribe({
          next: () => {
            console.log('Guest cart merged to server');
            this.router.navigate(['/home']);
          },
          error: (mergeError) => {
            console.error('Error merging guest cart:', mergeError);
            // даже если ошибка — всё равно идём на /home
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed: ' + (err.error?.message || 'Unknown error'));
      },
    });
  }
}


}
