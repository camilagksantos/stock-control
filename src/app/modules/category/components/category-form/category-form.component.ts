import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs/operators';
import { ICategory } from 'src/app/models/interfaces/category.interface';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  public categoryForm!: FormGroup;
  public isEditMode: boolean = false;
  public categoryToEdit?: ICategory;
  public isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  checkEditMode(): void {
    const categoryData = this.config.data?.category;

    if (categoryData) {
      this.isEditMode = true;
      this.categoryToEdit = categoryData;
      this.populateForm(categoryData);
    }
  }

  populateForm(category: ICategory): void {
    this.categoryForm.patchValue({
      name: category.name
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Preencha todos os campos obrigatórios!',
        life: 3000
      });
      return;
    }

    const formData = this.categoryForm.value;

    if (this.isEditMode && this.categoryToEdit) {
      this.updateCategory(formData);
    } else {
      this.createCategory(formData);
    }
  }

  createCategory(formData: any): void {
    this.isSubmitting = true;

    const categoryPayload = {
      name: formData.name
    };

    this.categoryService.createCategory(categoryPayload).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria criada com sucesso!',
          life: 3000
        });
        this.ref.close(true);
      },
      error: () => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar categoria!',
          life: 3000
        });
      }
    });
  }

  updateCategory(formData: any): void {
    this.isSubmitting = true;

    const categoryPayload = {
      name: formData.name
    };

    this.categoryService.updateCategory(this.categoryToEdit!.categoryId, categoryPayload).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria atualizada com sucesso!',
          life: 3000
        });
        this.ref.close(true);
      },
      error: () => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar categoria!',
          life: 3000
        });
      }
    });
  }

  onCancel(): void {
    this.ref.close();
  }
}