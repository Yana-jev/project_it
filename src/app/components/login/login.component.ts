import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../data/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router); 

  form: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)

  })

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);

      this.authService.login(this.form.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Login failed', error);
          alert('Login failed: ' + error.error.message || 'Unknown error');
        }
      );
    }
  }
}
