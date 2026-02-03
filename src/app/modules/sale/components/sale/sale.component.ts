import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ISale } from 'src/app/models/interfaces/sale.interface';
import { SaleService } from '../../service/sale.service';
import { SaleFormComponent } from '../sale-form/sale-form.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  public salesList$!: Observable<ISale[]>;
  public saleSelected!: ISale;

  constructor(
    private saleService: SaleService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(): void {
    this.salesList$ = this.saleService.getAllSales().pipe(
      catchError((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar vendas!',
          life: 3000
        });
        return of([]);
      })
    );
  }

  openSaleFormCreate(): void {
    const ref = this.dialogService.open(SaleFormComponent, {
      header: 'Nova Venda',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.getSales();
      }
    });
  }

  handleCancelSale(saleId: number, customerName: string): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja cancelar a venda de "${customerName}"? O estoque será devolvido.`,
      header: 'Confirmação de cancelamento',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.saleService.cancelSale(saleId).pipe(
          catchError((error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao cancelar venda!',
              life: 3000
            });
            return of(null);
          })
        ).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Venda cancelada com sucesso! Estoque devolvido.`,
            life: 3000
          });
          this.getSales();
        });
      }
    });
  }
}