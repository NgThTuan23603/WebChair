import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../product/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail: Product | undefined;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private prod: ProductService, 
              private cartService: CartService, 
              private cdr: ChangeDetectorRef) {} // Thêm ChangeDetectorRef vào constructor

  ngOnInit(): void {
    let id = Number(this.route.snapshot.params['id']);
    this.prod.getProductId(id).subscribe(data => {
      this.productDetail = data;
    });
  }

  addToCart() {
    if (this.productDetail && this.productDetail.inStock > 0) {
      let existingProduct = this.cartService.getCartList().find(item => item.id === this.productDetail?.id);
      if (existingProduct) {
        existingProduct.quantity++; // Tăng số lượng sản phẩm đã tồn tại trong giỏ hàng
      } else {
        this.productDetail.quantity = 1; // Khởi tạo số lượng là 1
        this.cartService.addToCart(this.productDetail); // Thêm sản phẩm vào giỏ hàng
      }
      this.productDetail.inStock--; // Giảm số lượng trong kho
      this.cdr.detectChanges(); // Gọi detectChanges() để thông báo cho Angular về sự thay đổi trong model
    }
  }
}
