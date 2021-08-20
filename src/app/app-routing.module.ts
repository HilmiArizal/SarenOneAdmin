import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'',
    pathMatch: 'full'
  },
  {
    path:'',
    component: ContentComponent,
    loadChildren: () => import ('./content/content.module').then(module => module.ContentModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
