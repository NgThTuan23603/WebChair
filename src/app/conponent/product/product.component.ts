// product.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() productHome: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.productHome = products; // Chỉnh sửa thành this.productHome
    });
  }
}
