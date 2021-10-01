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

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data:{titulo: 'Dasboard'}},
            { path: 'progress', component: ProgressComponent, data:{titulo: 'ProgressBar'} },
            { path: 'grafica1', component: GraficalComponent, data:{titulo: 'Gráfica 1'}},
            { path: 'account-settings', component: AccountSettingsComponent, data:{titulo: 'Ajustes'} },
            { path: 'promesa', component: PromesasComponent, data:{titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data:{titulo: 'RXJS'}},
            { path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil de Usuario'}},

            //Mantenimintos
            { path: 'usuarios', component: UsuariosComponent, data:{titulo: 'Usuarios de aplicación'}},


        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


