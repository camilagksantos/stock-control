import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataTransferProductService {

  private productsDataEmitter$ = new BehaviorSubject<IProduct[]>([]);

  setProductsData(products: IProduct[]): void {
    this.productsDataEmitter$.next(products);
  }

  getProductsData(): Observable<IProduct[]> {
    return this.productsDataEmitter$.asObservable();
  }

  getProductsInStock(): Observable<IProduct[]> {
    return this.productsDataEmitter$.asObservable().pipe(
      map(products => products.filter(p => p.amount > 0))
    );
  }
}
