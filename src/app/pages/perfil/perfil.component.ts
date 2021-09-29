import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UssarioService } from '../../services/ussuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {


  public usuario?: Usuario;
  public imagenSubir!: File;
  public perfilForm: FormGroup;
  public imgTemp: any = null;



  constructor(private fb: FormBuilder, 
              public usuarioService: UssarioService,
              private fileUploadService: FileUploadService ) 
              {
                  this.usuario= usuarioService.usuario; }

  /*public perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]]
    })*/


  ngOnInit(): void {
    this.perfilForm= this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email :[this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil() {
      this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( () => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario= new Usuario(nombre,email);
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          this.usuarioService.usuario=this.usuario;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success')
        }, (err) =>{
          Swal.fire('Error', err.error.msg, 'error')
        });
  }

  cambiarImagen(evt:any):any {
 
    if(evt?.target?.files[0]){
      this.imagenSubir = evt?.target?.files[0];
  
      if (!evt) {
        return this.imgTemp = null;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(this.imagenSubir);
      reader.onloadend = () => {      
       this.imgTemp = reader.result;
      }
    }
  }
 

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then ( img => {
      this.usuarioService.usuario.img = img;
              Swal.fire('Guardado', 'Imagen actualizada', 'success')  
    }).catch(err=>{
          Swal.fire('Error', 'No se pudo subir la imagen', 'error')
        })
  }
    
  
}
