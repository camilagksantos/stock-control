import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product.interface';
import { ProductService } from '../../service/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public productsList$!: Observable<IProduct[]>;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsList$ = this.productService.getAllProducts().pipe(
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar produtos!',
          life: 3000
        });
        return of([]);
      })
    );
  }
}