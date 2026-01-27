import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product.interface';
import { ProductService } from '../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public productsList$!: Observable<IProduct[]>;
  public productSelected!: IProduct;


  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService

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
    console.log('Editar produto:', product);
    // TODO: Abrir modal de edição (implementaremos depois)
    this.messageService.add({
      severity: 'info',
      summary: 'Em desenvolvimento',
      detail: `Edição do produto ${product.name} será implementada em breve`,
      life: 3000
    });
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
}