import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { Observable, of, map } from 'rxjs';
import { IProduct } from 'src/app/models/interfaces/product.interface';
import { ProductService } from 'src/app/modules/products/service/product.service';
import { DataTransferProductService } from 'src/app/modules/products/service/data-transfer-product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public productsList$!: Observable<IProduct[]>;
  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;

  constructor(
    private productService: ProductService,
    private dataTransferService: DataTransferProductService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.setProductsChartConfig([]);
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

      if (products.length > 0) {
        this.setProductsChartConfig(products);
      }
    });

    this.productsList$ = this.dataTransferService.getProductsData();
  }

  setProductsChartConfig(products: IProduct[]): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productsChartDatas = {
      labels: products.map((element) => element?.name),
      datasets: [
        {
          label: 'Quantidade',
          backgroundColor: '#4338ca',
          borderColor: '#1e1b6b',
          hoverBackgroundColor: '#2d2a8f',
          data: products.map((element) => element?.amount),
        }
      ],
    };

    this.productsChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            },
          },
          grid: {
            color: surfaceBorder 
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder 
          }
        }
      }
    };
  }
}