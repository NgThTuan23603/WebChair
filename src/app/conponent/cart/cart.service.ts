import { Injectable } from '@angular/core';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartList: Product[] = [];
  totalItems: number = 0; // Biến lưu trữ tổng số lượng sản phẩm đã thêm vào giỏ hàng

  constructor() { }

  addToCart(product: Product) {
    this.cartList.push(product);
    this.calculateTotalItems(); // Tính lại tổng số lượng sản phẩm sau khi thêm vào giỏ hàng
  }

  removeFromCart(index: number) {
    this.cartList.splice(index, 1);
    this.calculateTotalItems(); // Tính lại tổng số lượng sản phẩm sau khi xoá khỏi giỏ hàng
  }

  private calculateTotalItems() {
    this.totalItems = 0;
    this.cartList.forEach(item => {
      this.totalItems += item.quantity; // Cộng dồn số lượng của mỗi mặt hàng vào tổng số lượng
    });
  }

  getCartList() {
    return this.cartList;
  }

  getTotalItems() {
    return this.totalItems;
  }
}
