import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContentRoutingModule } from './content-routing.module';
import { MaterialModule } from '../material/material';
import { MatTableModule } from '@angular/material/table';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TeamComponent } from './team/team.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    TeamComponent,
    NotFoundComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MaterialModule,
    MatTableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentModule { }
