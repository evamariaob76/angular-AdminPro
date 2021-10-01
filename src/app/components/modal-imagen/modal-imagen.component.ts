import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService  ) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

   /* cambiarImagen( file: File ) {
      this.imagenSubir = file;
  
      if ( !file ) {         console.log('no existe file')

        return this.imgTemp = null;
      }
          console.log('SI existe file')

      const reader = new FileReader();
      reader.readAsDataURL( file );
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
  
    }*/

      cambiarImagen(evt:any):any {
 
    if(evt?.target?.files[0]){
      this.imagenSubir = evt?.target?.files[0];
      console.log(this.imagenSubir+'---imagensubir')
  
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
subirImagen() {

    const id   = this.modalImagenService.id;
    const tipo : any= this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }
}