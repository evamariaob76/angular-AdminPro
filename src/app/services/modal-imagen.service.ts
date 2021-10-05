import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModeal : boolean = true;
  public tipo: string;
  //  public tipo: 'ususarios'| 'medicos'| 'hospitales';

  public id: string;
  public  img: string
  public nuevaImagen : EventEmitter<string>= new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModeal;
  }

  abriModal(
    tipo: 'usuarios'|'medicos' |'hospitales',
    id: string,
    img: string = 'no-img'
  ){
    this._ocultarModeal = false;
    this.tipo= tipo;
    this.id= id;
    
    if( img.includes('https')){
      this.img = img

    } else{
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
  }


  cerrarModal(){
    this._ocultarModeal = true;
  }  
  
  constructor() { }

}