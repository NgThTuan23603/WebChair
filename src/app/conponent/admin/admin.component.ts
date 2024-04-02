// admin.component.ts
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  isNewProduct: boolean = false;
  selectedProduct: Product | null = null;
  formData: FormData = new FormData();
  successMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  toggleNewProductForm() {
    this.isNewProduct = !this.isNewProduct;
  }

  handleFileInput(event: any) {
    if (this.selectedProduct && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedProduct.imageUrl = file;
    }
}

addProduct(productForm: NgForm) {
  if (productForm && productForm.valid) { // Check if the form is valid
    const formData = new FormData();
    const formValue = productForm.value;

    formData.append('name', formValue.name);
    formData.append('price', formValue.price);
    formData.append('description', formValue.description);
    
    if (this.selectedProduct && formValue.image) {
      formData.append('image', formValue.image);
    }

    if (formData) {
      this.productService.AddProduct(formData).subscribe(
        () => {
          this.getAllProducts();
          this.isNewProduct = false;
          this.formData = new FormData();
        },
        error => {
          console.error('Error adding product:', error);
          // Handle error here (e.g., display error message to user)
        }
      );
    }
  } else {
    console.error('Form is not valid');
    // Handle invalid form here (e.g., display error message to user)
  }
}



updateProduct(id: number, formData: any) {
    // Tạo FormData mới
    const updatedFormData = new FormData();
  
    // Thêm các trường dữ liệu vào FormData
    updatedFormData.append('name', formData.name);
    updatedFormData.append('price', formData.price);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('image', formData.image);
  
    // Gọi service để cập nhật sản phẩm
    this.productService.UpdateProduct(id, updatedFormData).subscribe(() => {
      this.getAllProducts();
      this.successMessage = 'Cập nhật sản phẩm thành công!';
      this.selectedProduct = null;
    });

}


  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  deleteProduct(id: number){
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng không?');
    if (confirmDelete) {
      this.productService.DeleteProduct(id).subscribe(() => {
        this.getAllProducts();
      });
    }
  }
}