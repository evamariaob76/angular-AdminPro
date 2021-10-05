import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales : Hospital[]= [];
  public hospitalesTemp : Hospital[]= [];

  public cargando : boolean = true;
  private imsgSubs : Subscription;

  constructor( private hospitalService: HospitalService,
                private modalImagenService : ModalImagenService,
                private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imsgSubs.unsubscribe();
  }

  ngOnInit(): void {  
    this.cargarHospital();
    
    this.imsgSubs= this.modalImagenService.nuevaImagen
      .pipe(delay(1000)
      )
    .subscribe(img=>
      this.cargarHospital());
  }
  

  cargarHospital(){
    this.cargando= true;

   this.hospitalService.cargarHospitales()
    .subscribe(hospitales=>{
      console.log(hospitales + 'hospitales')
      this.cargando= false;
      this.hospitales = hospitales;
    })
    }

  guardarCambios( hospital: Hospital ) {

    this.hospitalService.actualizarrHospitales( hospital._id, hospital.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', hospital.nombre, 'success' );
        });
  }

  eliminarHospital( hospital: Hospital ) {

    this.hospitalService.borrarrHospitales( hospital._id )
        .subscribe( resp => {
          this.cargarHospital();
          Swal.fire( 'Borrado', hospital.nombre, 'success' );
        });
  }

  async abrirSweetAlert(){
    const {value =''}= await Swal.fire<string>({
      title: 'Crear Hospital',
      text: ' Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre dwl hospitalL',
      showCancelButton: true,

    })
      if(value.trim().length > 0 ){
        this.hospitalService.crearrHospitales (value)
          .subscribe((resp : any) =>{
           this.hospitales.push(resp.hospital)
          })
    }
}

  abrirModal(hospital){
        this.modalImagenService.abriModal('hospitales', hospital._id, hospital.img);
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarHospital();
    }
    this.busquedasService.buscar( 'hospitales', termino )
        .subscribe( resp => {
          this.hospitales = resp as Hospital [];
        });
  }

  
}
