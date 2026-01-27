import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
