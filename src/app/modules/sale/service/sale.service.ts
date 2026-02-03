import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISale, ISalePayload } from 'src/app/models/interfaces/sale.interface';
import { environment } from 'src/enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private API_URL = environment.API_URL;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllSales(): Observable<ISale[]> {
    return this.http.get<ISale[]>(`${this.API_URL}/sales`, this.httpOptions);
  }

  getSaleById(saleId: number): Observable<ISale> {
    return this.http.get<ISale>(`${this.API_URL}/sales/${saleId}`, this.httpOptions);
  }

  createSale(saleData: ISalePayload): Observable<ISale> {
    return this.http.post<ISale>(`${this.API_URL}/sales`, saleData, this.httpOptions);
  }

  cancelSale(saleId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/sales/${saleId}`, this.httpOptions);
  }
}