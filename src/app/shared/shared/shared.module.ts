import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

const PRIMENG_MODULES = [
  CardModule,
  InputTextModule,
  ButtonModule,
  ToastModule,
  RippleModule,
  DropdownModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...PRIMENG_MODULES
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...PRIMENG_MODULES
  ]
})
export class SharedModule { }
