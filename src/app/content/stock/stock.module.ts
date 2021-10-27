import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStockComponent } from './add-stock/add-stock.component';
import { SalesComponent } from './sales/sales.component';
import { DetailStockComponent } from './detail-stock/detail-stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { MaterialModule } from 'src/app/material/material';
import { FirstStockComponent } from './first-stock/first-stock.component';
import { LastStockComponent } from './last-stock/last-stock.component';



@NgModule({
  declarations: [
    AddStockComponent,
    SalesComponent,
    DetailStockComponent,
    FirstStockComponent,
    LastStockComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MaterialModule
  ]
})
export class StockModule { }
