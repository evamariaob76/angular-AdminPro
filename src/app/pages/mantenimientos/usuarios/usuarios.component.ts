import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { UssarioService } from 'src/app/services/ussuario.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

    public totalUsuarios : number= 0;
    public usuarios: Usuario []= [];
    public usuariosTemp: Usuario []= [];
    public imsgSubs : Subscription;

    public desde: number = 0;
    public cargando: boolean = true;

  constructor(private usuarioService : UssarioService,
              private busquedasService: BusquedasService,
              private modalImagenService : ModalImagenService) { }
  
  
   ngOnDestroy(): void {
    this.imsgSubs.unsubscribe();  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imsgSubs= this.modalImagenService.nuevaImagen
      .pipe(delay(1000)
      )
    .subscribe(img=>{
      this.cargarUsuarios()});
  }
  
  cargarUsuarios(){
    this.cargando= true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios})=>{
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

        this.cargando= false;
       /* if(usuarios.length!==0){
        this.usuarios = usuarios;
        }*/
      })
    }


  cambiarPagina(valor: number){
    this.desde+= valor;

    if(this.desde<0){
      this.desde = 0;
    }
    else if (this.desde> this.totalUsuarios){
      this.desde -= valor;
    }
    console.log(valor)
    this.cargarUsuarios();
  }

  buscar(termino: string){
    if(termino.length===0){
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedasService.buscar('usuarios', termino)
      .subscribe(resp=> {
        this.usuarios= resp as Usuario [];
      })
  }

  eliminarUsuario (usuario: Usuario){
      if (usuario.uid === this.usuarioService.uid){
        return Swal.fire('Error', ' No puede borrarse a si mismo', 'error')
      }
      //return;
       Swal.fire({
          title: '¿Borrar Usuario?',
          text: `Está a punto de borrar a ${usuario.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si'
        }).then((result) => {

          if (result.value) {

            this.usuarioService.eliminarUsuario(usuario)

              .subscribe(resp=> {
                this.cargarUsuarios();
                Swal.fire('Usuario borrado', `${usuario.nombre} fue liminado correctamente`, 'success');

              } )
          }
        }) 
   }

     cambiarRole(usuario: Usuario){
        this.usuarioService.guardarUsuarui(usuario)
          .subscribe (resp=>{
            console.log(resp)
          })
      }
      abrirModal(usuario: Usuario){
        console.log(usuario);
        this.modalImagenService.abriModal('usuarios', usuario.uid, usuario.img);

      }

}
