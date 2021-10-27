import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from './dialog/product/edit-product/edit-product.component';
import { AddProductComponent } from './dialog/product/add-product/add-product.component';
import { DeleteProductComponent } from './dialog/product/delete-product/delete-product.component';
import { MaterialModule } from '../material/material';
import { EditTeamComponent } from './dialog/team/edit-team/edit-team.component';
import { DeleteTeamComponent } from './dialog/team/delete-team/delete-team.component';
import { AddTeamComponent } from './dialog/team/add-team/add-team.component';
import { AddStoreComponent } from './dialog/store/add-store/add-store.component';
import { EditStoreComponent } from './dialog/store/edit-store/edit-store.component';
import { DeleteStoreComponent } from './dialog/store/delete-store/delete-store.component';



@NgModule({
  declarations: [
    AddProductComponent,
    DeleteProductComponent,
    EditProductComponent,
    EditTeamComponent,
    DeleteTeamComponent,
    AddTeamComponent,
    AddStoreComponent,
    EditStoreComponent,
    DeleteStoreComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ComponentModule { }
