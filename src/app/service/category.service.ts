import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/environment';
import { ICategory } from '../interface/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL = environment.API_URL;
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    constructor(
      private http: HttpClient
    ) { }
  
  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.API_URL}/categories`, this.httpOptions);
  }

  getCategoryById(categoryId: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.API_URL}/categories/${categoryId}`, this.httpOptions);
  }

  createCategory(categoryData: { name: string }): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.API_URL}/categories`, categoryData, this.httpOptions);
  }

  updateCategory(categoryId: number, categoryData: { name: string }): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.API_URL}/categories/${categoryId}`, categoryData, this.httpOptions);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/categories/${categoryId}`, this.httpOptions);
  }
}
