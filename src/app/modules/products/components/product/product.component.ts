import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product.interface';
import { ProductService } from '../../service/product.service';
import { DataTransferProductService } from '../../service/data-transfer-product.service';
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
    private dataTransferService: DataTransferProductService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().pipe(
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar produtos!',
          life: 3000
        });
        return of([]);
      })
    ).subscribe(products => {
      this.dataTransferService.setProductsData(products);
    });

    this.productsList$ = this.dataTransferService.getProductsData();
  }
}
