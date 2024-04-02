import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from './auth';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  private usersUrl = 'http://localhost:3000/user'; // Assuming your JSON server API endpoint for users is '/api/users'

  constructor(private http: HttpClient, private router: Router) { }

  login(form: LoginForm) {
    this.isLoading = true;
    this.http.get<any[]>(this.usersUrl).subscribe(
      users => {
        const foundUser = users.find(user => user.email === form.email && user.password === form.password);
        if (foundUser) {
          this.isAuthenticated = true;
          alert('Login successful');
          this.router.navigate(['/home']);
        } else {
          alert('Login not successful');
          this.isAuthenticated = false;
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
        this.isLoading = false;
      }
    );
  }

  register(form: RegisterForm): Observable<any> {
    if (form.password !== form.confirm_password) {
      return throwError("Passwords do not match");
    } else {
      const newUser = { email: form.email, password: form.password };
      return this.http.post(this.usersUrl, newUser).pipe(
        catchError((error: any) => {
          console.error('Error during registration:', error);
          return throwError("Registration failed"); // You can customize the error message here
        })
      );
    }
  }

  logout() {
    this.router.navigate(['login']);
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
