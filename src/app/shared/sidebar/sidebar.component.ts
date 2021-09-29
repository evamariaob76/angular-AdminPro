import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UssarioService } from '../../services/ussuario.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any [];
  public imgUrl;
  public usuario: Usuario = new Usuario ();


  constructor(private sidebarService: SidebarService,
    public usuarioService : UssarioService
    ) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
    this.imgUrl = this.usuarioService.usuario.imagenUrl



   }

  ngOnInit(): void {
  }

}
