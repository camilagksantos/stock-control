import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs/operators';
import { IProduct } from 'src/app/models/interfaces/product.interface';
import { ISaleItemPayload, ISalePayload } from 'src/app/models/interfaces/sale.interface';
import { ProductService } from 'src/app/modules/products/service/product.service';
import { SaleService } from '../../service/sale.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit {

  public saleForm!: FormGroup;
  public productForm!: FormGroup;
  public availableProducts: IProduct[] = [];
  public selectedItems: ISaleItemPayload[] = [];
  public isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private productService: ProductService,
    private messageService: MessageService,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.initializeForms();
  }

  loadProducts(): void {
    this.productService.getAllProducts().pipe(
      take(1)
    ).subscribe({
      next: (products) => {
        this.availableProducts = products.filter(p => p.amount > 0);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar produtos!',
          life: 3000
        });
      }
    });
  }

  initializeForms(): void {
    this.saleForm = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.productForm = this.formBuilder.group({
      productId: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const productId = this.productForm.value.productId;
    const quantity = this.productForm.value.quantity;

    const product = this.availableProducts.find(p => p.productId === productId);

    if (!product) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto não encontrado!',
        life: 3000
      });
      return;
    }

    if (quantity > product.amount) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Estoque Insuficiente',
        detail: `Disponível: ${product.amount} unidades`,
        life: 3000
      });
      return;
    }

    const existingItem = this.selectedItems.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.selectedItems.push({ productId, quantity });
    }

    this.productForm.reset({ productId: null, quantity: 1 });
    this.messageService.add({
      severity: 'success',
      summary: 'Adicionado',
      detail: `${product.name} adicionado à venda`,
      life: 2000
    });
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
  }

  getProductById(productId: number): IProduct | undefined {
    return this.availableProducts.find(p => p.productId === productId);
  }

  calculateItemSubtotal(item: ISaleItemPayload): number {
    const product = this.getProductById(item.productId);
    return product ? product.price * item.quantity : 0;
  }

  calculateTotal(): number {
    return this.selectedItems.reduce((total, item) => total + this.calculateItemSubtotal(item), 0);
  }

  onSubmit(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha o nome do cliente!',
        life: 3000
      });
      return;
    }

    if (this.selectedItems.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Adicione pelo menos um produto à venda!',
        life: 3000
      });
      return;
    }

    this.createSale();
  }

  createSale(): void {
    this.isSubmitting = true;

    const salePayload: ISalePayload = {
      customerName: this.saleForm.value.customerName,
      items: this.selectedItems
    };

    this.saleService.createSale(salePayload).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Venda realizada com sucesso!',
          life: 3000
        });
        this.ref.close(true);
      },
      error: (error) => {
        this.isSubmitting = false;
        const errorMessage = error.error?.message || 'Erro ao realizar venda!';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
          life: 3000
        });
      }
    });
  }

  onCancel(): void {
    this.ref.close();
  }
}