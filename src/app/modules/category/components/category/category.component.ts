import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ICategory } from 'src/app/models/interfaces/category.interface';
import { CategoryService } from '../../service/category.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categoriesList$!: Observable<ICategory[]>;
  public categorySelected!: ICategory;

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesList$ = this.categoryService.getAllCategories().pipe(
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar categorias!',
          life: 3000
        });
        return of([]);
      })
    );
  }

  handleCategoryEdit(category: ICategory): void {
    this.openCategoryFormEdit(category);
  }

  handleDeleteCategory(categoryId: number, categoryName: string): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a categoria "${categoryName}"?`,
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).pipe(
          catchError((error) => {
            if (error.status === 500) {
              this.messageService.add({
                severity: 'warn',
                summary: 'Não foi possível excluir',
                detail: `A categoria "${categoryName}" possui produtos vinculados. Remova ou transfira os produtos primeiro.`,
                life: 5000
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Erro ao deletar categoria!',
                life: 3000
              });
            }
            return of(null);
          })
        ).subscribe((result) => {
          if (result !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Categoria "${categoryName}" deletada com sucesso!`,
              life: 3000
            });
            this.getCategories();
          }
        });
      }
    });
  }

  openCategoryFormCreate(): void {
    const ref = this.dialogService.open(CategoryFormComponent, {
      header: 'Nova Categoria',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }

  openCategoryFormEdit(category: ICategory): void {
    const ref = this.dialogService.open(CategoryFormComponent, {
      header: 'Editar Categoria',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        category: category
      }
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.getCategories();
      }
    });
  }
}