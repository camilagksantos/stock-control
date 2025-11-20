import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductPayload } from 'src/app/models/interfaces/product.interface';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = environment.API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.API_URL}/products`, this.httpOptions);
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API_URL}/products/${productId}`, this.httpOptions);
  }

  createProduct(productData: IProductPayload): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.API_URL}/products`, productData, this.httpOptions);
  }

  updateProduct(productId: number, productData: IProductPayload): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.API_URL}/products/${productId}`, productData, this.httpOptions);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/products/${productId}`, this.httpOptions);
  }
}
