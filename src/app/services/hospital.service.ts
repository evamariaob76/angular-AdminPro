import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Hospital } from '../models/hospital.model';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
    public hospital:Hospital;



  constructor( private http : HttpClient,
              private router : Router,
              private ngZone : NgZone) { }




   get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{
      headers: {
          'x-token': this.token
      }
    }
  }

  cargarHospitales( ){
      const url = `${base_url}/hospitales`;
      return this.http.get(url, this.headers)
      .pipe(
        map((resp : {ok : boolean, hospitales :Hospital[]})=> resp.hospitales)
      )
    } 

    crearrHospitales(nombre: string ){
      const url = `${base_url}/hospitales`;
      return this.http.post(url, {nombre}, this.headers)
     
    } 

    actualizarrHospitales(_id: string, nombre: string ){
      const url = `${base_url}/hospitales/${_id}`;
      return this.http.put(url, {nombre}, this.headers)
     
    } 
    borrarrHospitales(_id: string){
      const url = `${base_url}/hospitales/${_id}`;
      return this.http.delete(url, this.headers)
     
    }
}
