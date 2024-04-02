import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service'; // Import CartService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    public cartService: CartService // Đảm bảo cartService được khai báo là public
  ) { }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
  }
}
