import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  authService = inject(AuthService)
  
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, Validators.required)
  }, { validators: this.passwordsMatchValidator });

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.signUp({ email, password }).subscribe({
        next: (response: any) => { // Указываем тип данных для ответа
          console.log('Registration successful', response);
          // Перенаправить пользователя или вывести сообщение об успехе
        },
        error: (error: any) => {
          console.log('Registration failed', error);
        }
      });
    }
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
