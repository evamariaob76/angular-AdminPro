import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos : Medico[]=[];
  private imsgSubs : Subscription;

  constructor( private  medicoService: MedicoService,
                private modalImagenService: ModalImagenService,
                private busquedasService : BusquedasService) { }
  ngOnDestroy(): void {
  this.imsgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

     this.imsgSubs= this.modalImagenService.nuevaImagen
      .pipe(delay(1000)
      )
    .subscribe(img=>
      this.cargarMedicos());
  }

  cargarMedicos(){
    this.cargando= true;

   this.medicoService.cargarMedicos()
    .subscribe(medicos=>{
      this.cargando= false;
      this.medicos = medicos;
      console.log(medicos)
    })
    }

    buscar(termino: string){
      
       if ( termino.length === 0 ) {
      return this.cargarMedicos();
    }
    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( resp => {
          this.medicos = resp as Medico [];
        });
    }

    abrirModal(medico){
    this.modalImagenService.abriModal('medicos', medico._id, medico.img);

  }

  borrarMedico(medico){
          Swal.fire({
          title: '¿Borrar Medico?',
          text: `Está a punto de borrar a ${medico.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si'
        }).then((result) => {

          if (result.value) {

            this.medicoService.borrarrMedicos(medico._id)
              .subscribe(resp=> {
                this.cargarMedicos();
                Swal.fire('Usuario borrado', `${medico.nombre} fue liminado correctamente`, 'success');

              } )
          }
        }) 
  }
}
