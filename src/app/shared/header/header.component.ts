import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UssarioService } from 'src/app/services/ussuario.service';
import { Usuario } from '../../models/usuario.model';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  implements OnInit {
  

  public imgUrl;
  public usuario;
  public editMessage?;
  public usuarioUID;
  public email: any;

  constructor(public usuarioService: UssarioService,
              private router: Router) { 
   
    this.usuario = usuarioService.usuario;
    this.usuarioUID= usuarioService.usuario.uid;
    this.imgUrl = this.usuarioService.usuario.imagenUrl;
  this.email= this.usuarioService.usuario.email;
        
  }
  ngOnInit(): void {
      }
  
  logout(){
    this.usuarioService.logout();

  }
  buscar(termino:string){
    if(termino.length===0){
    this.router.navigateByUrl(`/dashboard`)
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }

}
