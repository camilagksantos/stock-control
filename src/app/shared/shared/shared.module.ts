import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

const PRIMENG_MODULES = [
  CardModule,
  InputTextModule,
  ButtonModule,
  ToastModule,
  RippleModule,
  DropdownModule,
  SidebarModule,
  ToolbarModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...PRIMENG_MODULES
  ],
  exports: [
    CommonModule,
    ...PRIMENG_MODULES
  ]
})
export class SharedModule { }
