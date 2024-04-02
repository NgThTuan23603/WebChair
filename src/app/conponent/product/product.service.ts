import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) {}
  products: Product[] = [];

  getProduct() {
    return this.products;
  }
  getProductId(id: number) {
    return this.http.get<Product>(`${this.URL}/${id}`)
  }

  AutoId() {
    var max = 1;
    this.products.forEach((item) => {
      if (item.id > max) {
        max = item.id;
      }
    });
    return max + 1;
  }
  private URL='http://localhost:3000/product';
  getAllProducts(): Observable<Product[]> { // Sửa tên phương thức thành getAllProducts
    return this.http.get<Product[]>(`${this.URL}`);
  }
  AddProduct(frmProduct: any):Observable<Product[]> {
    return this.http.post<Product[]>(`${this.URL}`,frmProduct)
  }
  EditProduct(id: number) {
    return this.products[id];
  }
  UpdateProduct(id: number, frmProduct: any) {
    return this.http.put<Product[]>(`${this.URL}/${id}`,frmProduct)
  }
  DeleteProduct(id: number): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.URL}/${id}`)}
  
}
