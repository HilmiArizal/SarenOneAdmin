import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material';
import { ContentComponent } from './content/content.component';
import { ContentModule } from './content/content.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentModule } from './component/component.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './service/auth.guard';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ContentModule,
    AuthModule,
    ComponentModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
