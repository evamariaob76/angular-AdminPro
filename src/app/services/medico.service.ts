import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Medico } from '../models/medico.model';


const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medico : Medico;
  public auth2 : any;


  constructor( private http : HttpClient,
              private router : Router) { }

    get token(): string {
    return localStorage.getItem('token') || '';
  }

    get uid():string {
    return this.medico._id || '';
  }

    get headers(){
    return{
      headers: {
          'x-token': this.token
      }
    }
  }

    cargarMedicos( ){
      const url = `${base_url}/medicos`;
      return this.http.get(url, this.headers)
      .pipe(
        map((resp : {ok : boolean, medicos :Medico[]})=> resp.medicos)
      )
    } 

      cargarMedicoById(id: string){
      const url = `${base_url}/medicos/${id}`;
      return this.http.get(url, this.headers)
      .pipe(
        map((resp : {ok : boolean, medico :Medico})=> resp.medico)
      )
    } 

    
    crearMedicos(medico:  {nombre: string, hospital: string}){
      const url = `${base_url}/medicos`;
      return this.http.post(url, medico, this.headers)
     
    } 

    actualizarrMedico(medico: Medico){
      const url = `${base_url}/medicos/${medico._id}`;
      return this.http.put(url, medico, this.headers)
     
    } 
    borrarrMedicos(_id: string){
      const url = `${base_url}/medicos/${_id}`;
      return this.http.delete(url, this.headers)
     
    }

}