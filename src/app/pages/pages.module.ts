import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficalComponent } from './grafical/grafical.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderComponent } from '../shared/header/header.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';



@NgModule({
  declarations: [
   PagesComponent,
   DashboardComponent,
   ProgressComponent,
   GraficalComponent,
   AccountSettingsComponent,
   PromesasComponent,
   RxjsComponent,
   PerfilComponent,
   UsuariosComponent,
   HospitalesComponent,
   MedicosComponent,
   MedicoComponent,
  ],
    exports: [
   PagesComponent,
   DashboardComponent,
   ProgressComponent,
   GraficalComponent,
   AccountSettingsComponent,
   HeaderComponent,
   PerfilComponent

  ],  
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule

  ]
})
export class PagesModule { }
