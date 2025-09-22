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
    email: new FormControl(null, [Validators.required, Validators.email], [emailExistsValidator(this.authService)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, Validators.required)
  }, { validators: this.passwordsMatchValidator });
  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  
// onSubmit() {
//   if (!this.form.valid) return;

//   const { email, password } = this.form.value;

//   this.authService.signUp({ email, password }).subscribe({
//     next: () => {
//       console.log('Registration successful');

//       // Сразу логинимся
//       this.authService.login({ email, password }).subscribe({
//         next: () => {
//           console.log('Login successful');

//           // Мержим гостевую корзину
//           this.cartService.mergeGuestCartWithServer().subscribe({
//             next: (mergedItems) => {
//               console.log('Guest cart merged to server');
//               this.cartService.cartItems.set(mergedItems);
//               this.router.navigate(['/home']);
//             },
//             error: (mergeError) => {
//               console.error('Error merging guest cart:', mergeError);
//               this.router.navigate(['/home']);
//             }
//           });
//         },
//         error: (loginError) => console.error('Login failed', loginError)
//       });
//     },
//     error: (registrationError) => {
//       console.error('Registration failed', registrationError);

//       // Проверяем, есть ли ошибка "email уже существует"
//       if (
//         registrationError.status === 400 &&
//         registrationError.error?.message.includes('Ya existe')
//       ) {
//         // Добавляем ошибку в контрол email
//         this.emailExistsError = true;
//       }
//     }
//   });
// }




onSubmit() {
  if (!this.form.valid) return;

  const { email, password } = this.form.value;
  this.emailExistsError = false; // сброс флага перед отправкой

  this.authService.signUp({ email, password }).pipe(
    switchMap(() => this.authService.login({ email, password })), // логин после успешной регистрации
    switchMap(() => this.cartService.mergeGuestCartWithServer()), // мердж корзины
    catchError((err) => {
      console.error('Error during registration/login/cart merge:', err);

      if (err.status === 400 && err.error?.message.includes('Ya existe')) {
        // email уже зарегистрирован
        this.emailExistsError = true;
      }

      // чтобы поток завершился без ошибок
      return of(null);
    })
  ).subscribe((mergedItems) => {
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
