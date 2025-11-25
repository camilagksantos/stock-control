import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CategoryComponent } from './components/category/category.component';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
