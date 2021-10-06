import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data:{titulo: 'Dasboard'}},
            { path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Ajustes'} },
            { path: 'grafica1', component: GraficalComponent, data:{titulo: 'Gráfica 1'}},
            { path: 'buscar/:termino', component: BusquedaComponent, data:{titulo: 'Búsquedas'}},
            { path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil de Usuario'}},
            { path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'} },
            { path: 'promesa', component: PromesasComponent, data:{titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data:{titulo: 'RXJS'}},


            //Mantenimintos
            { path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Mantenimiento de hospitales'}},
            { path: 'medicos', component: MedicosComponent, data:{titulo: 'Mantenimiento de médicos'}},
            { path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Mantenimiento de médicos'}},

            //Rutas admins
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data:{titulo: 'Mantenimiento de médicos'}},

        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


