import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:3000/products"

  constructor(private http: HttpClient) { }

  saveProductData(data: any) {
    return this.http.post(this.url, data);
  }

  getAllProductData() {
    return this.http.get(this.url)
  }

  geSingleProduct(id: number) {
    return this.http.get(`${this.url}/${id}`)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  updateProduct(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data)
  }

}
