import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/interfaces/category.interface';
import { IProduct, IProductPayload } from 'src/app/models/interfaces/product.interface';
import { ProductService } from '../../service/product.service';
import { CategoryService } from 'src/app/modules/category/service/category.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  public productForm!: FormGroup;
  public categoriesList: ICategory[] = [];
  public isEditMode: boolean = false;
  public productToEdit?: IProduct;
  public isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.initializeForm();
    this.checkEditMode();
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios!',
        life: 3000
      });
      return;
    }

    const formData = this.productForm.value;

    if (this.isEditMode && this.productToEdit) {
      this.updateProduct(formData);
    } else {
      this.createProduct(formData);
    }
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().pipe(
      take(1)
    ).subscribe({
      next: (categories) => {
        this.categoriesList = categories;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar categorias!',
          life: 3000
        });
      }
    });
  }

  initializeForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]]
    });
  }

  checkEditMode(): void {
    const productData = this.config.data?.product;

    if (productData) {
      this.isEditMode = true;
      this.productToEdit = productData;
      this.populateForm(productData);
    }
  }

  populateForm(product: IProduct): void {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      amount: product.amount,
      categoryId: product.category.categoryId
    });
  }

  typescriptonSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios!',
        life: 3000
      });
      return;
    }

    const formData = this.productForm.value;

    if (this.isEditMode && this.productToEdit) {
      this.updateProduct(formData);
    } else {
      this.createProduct(formData);
    }
  }

  createProduct(formData: any): void {
    this.isSubmitting = true;

    const productPayload: IProductPayload = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      amount: formData.amount,
      categoryId: formData.categoryId
    };

    this.productService.createProduct(productPayload).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto criado com sucesso!',
          life: 3000
        });
        this.ref.close(true);
      },
      error: () => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar produto!',
          life: 3000
        });
      }
    });
  }

  updateProduct(formData: any): void {
    this.isSubmitting = true;

    const productPayload: IProductPayload = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      amount: formData.amount,
      categoryId: formData.categoryId
    };

    this.productService.updateProduct(this.productToEdit!.productId, productPayload).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto atualizado com sucesso!',
          life: 3000
        });
        this.ref.close(true);
      },
      error: () => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar produto!',
          life: 3000
        });
      }
    });
  }

  onCancel(): void {
    this.ref.close();
  }
}
