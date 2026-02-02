import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product.interface';
import { ProductService } from '../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public productsList$!: Observable<IProduct[]>;
  public productSelected!: IProduct;


  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
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

  getStockSeverity(amount: number): string {
    if (amount === 0) return 'danger';
    if (amount < 10) return 'warning';
    return 'success';
  }

  handleProductEdit(product: IProduct): void {
    this.openProductFormEdit(product);
  }

  handleDeleteProduct(productId: number, productName: string): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o produto "${productName}"?`,
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.productService.deleteProduct(productId).pipe(
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao deletar produto!',
              life: 3000
            });
            return of(null);
          })
        ).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Produto "${productName}" deletado com sucesso!`,
            life: 3000
          });
          this.getProducts();
        });
      }
    });
  }

  // openProductFormCreate(): void {
  //   const ref = this.dialogService.open(ProductFormComponent, {
  //     header: 'Novo Produto',
  //     width: '70%',
  //     contentStyle: { overflow: 'auto' },
  //     baseZIndex: 10000
  //   });

  //   ref.onClose.subscribe((result) => {
  //     if (result) {
  //       this.getProducts();
  //     }
  //   });
  // }

  openProductFormCreate(): void {
    console.log('🚀 Botão clicado!');

    const ref = this.dialogService.open(ProductFormComponent, {
      header: 'Novo Produto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }

  openProductFormEdit(product: IProduct): void {
    const ref = this.dialogService.open(ProductFormComponent, {
      header: 'Editar Produto',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        product: product
      }
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.getProducts();
      }
    });
  }
}