import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleComponent } from './components/sale/sale.component';
import { SaleFormComponent } from './components/sale-form/sale-form.component';


@NgModule({
  declarations: [
    SaleComponent,
    SaleFormComponent
  ],
  imports: [
    SaleRoutingModule,
    SharedModule
  ]
})
export class SaleModule { }
