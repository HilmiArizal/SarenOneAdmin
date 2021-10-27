import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockModule } from './stock.module';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './add-stock/add-stock.component';
import { SalesComponent } from './sales/sales.component';
import { DetailStockComponent } from './detail-stock/detail-stock.component';
import { FirstStockComponent } from './first-stock/first-stock.component';
import { LastStockComponent } from './last-stock/last-stock.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'stock',
    pathMatch: 'full'
  },
  {
    path: 'first-stock',
    component: FirstStockComponent
  },
  {
    path: 'add-stock',
    component: AddStockComponent
  },
  {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'last-stock',
    component: LastStockComponent
  },
  {
    path: 'detail-stock',
    component: DetailStockComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StockRoutingModule { }
