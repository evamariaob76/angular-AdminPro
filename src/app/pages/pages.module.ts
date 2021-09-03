import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficalComponent } from './grafical/grafical.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
   PagesComponent,
   DashboardComponent,
   ProgressComponent,
   GraficalComponent,
  ],
    exports: [
   PagesComponent,
   DashboardComponent,
   ProgressComponent,
   GraficalComponent,
  ],  
  imports: [
    CommonModule,
    SharedModule,
    RouterModule

  ]
})
export class PagesModule { }
