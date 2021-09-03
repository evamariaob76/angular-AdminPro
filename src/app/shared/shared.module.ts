import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [

    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
  ],
  
    exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
  ],

  imports: [
    CommonModule
  ]
})
export class SharedModule { }
