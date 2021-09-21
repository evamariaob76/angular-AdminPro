import { Component } from '@angular/core';
import { UssarioService } from 'src/app/services/ussuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent   {

  constructor(private usuarioService: UssarioService) { }

  logout(){
    this.usuarioService.logout();
  }

}
