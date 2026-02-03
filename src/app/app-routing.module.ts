import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/product.module').then(m => m.ProductModule),
    canActivate: [authGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
    canActivate: [authGuard]
  },
  {
    path: 'sales',
    loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
