import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:3000/category"

  constructor(private http: HttpClient) { }

  saveCategoryData(data: any) {
    return this.http.post(this.url, data);
  }

  getAllCategoryData() {
    return this.http.get(this.url)
  }

  getSingleCategory(id: number) {
    return this.http.get(`${this.url}/${id}`)
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`)
  }

  updateCategory(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data)
  }
}
