import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product.interface';
import { ProductService } from 'src/app/modules/products/service/product.service';
import { DataTransferProductService } from 'src/app/modules/products/service/data-transfer-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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
