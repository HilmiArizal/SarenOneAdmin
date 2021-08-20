import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ContentRoutingModule } from './content-routing.module';


@NgModule({
  declarations: [
    HomeComponent 
  ],
  imports: [
    CommonModule,
    ContentRoutingModule
  ],
})
export class ContentModule { }
