import { Component } from '@angular/core';
import { RegisterForm } from '../auth';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    confirm_password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  submit() {
    this.authService.register(this.form).subscribe(
      response => {
        alert('Registration successful');
        this.router.navigate(['/login']);
        // Optionally, you can redirect the user to login or do any other action upon successful registration
      },
      error => {
        console.error('Registration error:', error);
        // Handle registration error, display an error message, etc.
      }
    );
  }
}
