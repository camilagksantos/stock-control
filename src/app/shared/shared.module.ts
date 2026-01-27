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
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';


const PRIMENG_MODULES = [
  CardModule,
  InputTextModule,
  ButtonModule,
  ToastModule,
  RippleModule,
  DropdownModule,
  SidebarModule,
  ToolbarModule,
  TableModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextareaModule,
  InputNumberModule,
  DynamicDialogModule,
  ConfirmDialogModule,
  TooltipModule,
  TagModule
];

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...PRIMENG_MODULES
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, 
    FormsModule,
    ...PRIMENG_MODULES,
    ToolbarComponent
  ],
  providers: [
    DialogService,
    ConfirmationService
  ]
})
export class SharedModule { }
