import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './dialog/product/edit-product/edit-product.component';
import { AddProductComponent } from './dialog/product/add-product/add-product.component';
import { DeleteProductComponent } from './dialog/product/delete-product/delete-product.component';



@NgModule({
  declarations: [
    AddProductComponent,
    DeleteProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentModule { }
