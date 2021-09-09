import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficalComponent } from './grafical/grafical.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
  declarations: [
   PagesComponent,
   DashboardComponent,
   ProgressComponent,
   GraficalComponent,
   AccountSettingsComponent,
   PromesasComponent,
   RxjsComponent,
  ],
    exports: [
   PagesComponent,
   DashboardComponent,
   ProgressComponent,
   GraficalComponent,
   AccountSettingsComponent,

  ],  
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule

  ]
})
export class PagesModule { }
