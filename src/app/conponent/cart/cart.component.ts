import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { CartService } from '../cart/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Import AuthService để kiểm tra trạng thái đăng nhập

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Product[] = []; 

  constructor(
    private cartService: CartService, 
    private router: Router,
    private authService: AuthService // Inject AuthService vào constructor
  ) {} 

  ngOnInit(): void {
    this.cartList = this.cartService.getCartList();
  }

  removeFromCart(index: number) {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng không?');
    if (confirmDelete) {
      this.cartList.splice(index, 1);
    }
  }

  updateCart() {
    // Perform update logic if needed
  }

  calculateSubtotal(): number {
    let subtotal = 0;
    for (let item of this.cartList) {
      subtotal += item.price * item.quantity;
    }
    return subtotal;
  }

  calculateTotal(): number {
    let total = 0;
    for (let item of this.cartList) {
      total += item.quantity * item.price;
    }
    return total;
  }

  increaseQuantity(index: number) {
    this.cartList[index].quantity++;
  }
  
  decreaseQuantity(index: number) {
    if (this.cartList[index].quantity > 1) {
      this.cartList[index].quantity--;
    }
  }

  proceedToCheckout() {
    if (this.authService.isLoggedIn()) { // Kiểm tra xem người dùng đã đăng nhập chưa
      this.router.navigate(['/thank']);
    } else {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập và sau đó trở lại trang giỏ hàng
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' }});
    }
  }
}
