import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './dialog/product/edit-product/edit-product.component';
import { AddProductComponent } from './dialog/product/add-product/add-product.component';
import { DeleteProductComponent } from './dialog/product/delete-product/delete-product.component';
import { MaterialModule } from '../material/material';
import { EditTeamComponent } from './dialog/team/edit-team/edit-team.component';
import { DeleteTeamComponent } from './dialog/team/delete-team/delete-team.component';
import { AddTeamComponent } from './dialog/team/add-team/add-team.component';



@NgModule({
  declarations: [
    AddProductComponent,
    DeleteProductComponent,
    EditProductComponent,
    EditTeamComponent,
    DeleteTeamComponent,
    AddTeamComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ComponentModule { }
