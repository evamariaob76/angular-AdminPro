import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import Swal from 'sweetalert2';

import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { UsuariosComponent } from '../pages/mantenimientos/usuarios/usuarios.component';


const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UssarioService {
  public auth2 : any;
  public usuario2?: Usuario;
  public img;
  public usuario:Usuario = new Usuario();



  constructor( private http : HttpClient,
              private router : Router,
              private ngZone : NgZone
              ) {
                this.googleInit();
               // this.usuario= new Usuario();
               }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario?.uid || '';
  }

  get headers(){
    return{
      headers: {
          'x-token': this.token
      }
    }
  }

    googleInit() {
      return new Promise<void> (resolve =>{
      console.log('google init')
      gapi.load('auth2',()=>{
        this.auth2= gapi.auth2.init({
          client_id: '695072086067-4g8jn5pgeg0vqr0a4ct6lul2prbvjcmv.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
    });
    })

    //throw new Error('Method not implemented.');
}
  
    logout(){
      localStorage.removeItem('token');
      this.auth2.signOut().then( () => {
        this.ngZone.run(()=>{
              this.router.navigateByUrl('/login');
  
        })
      });
    }

   validarToken(): Observable<boolean> {
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
      }).pipe(
        map( (resp: any) => {
         const { email, google, nombre, role, img = '', uid } = resp.usuarioDB;
         this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
         // this.usuario = <Usuario> resp.usuarioDB;
          localStorage.setItem('token', resp.token );
          console.log(this.usuario.imagenUrl+'---imagen no hay')
  
       this.img= resp.usuarioDB.imagenUrl;
        return true;
      }),
      catchError( error => of(false) )
    );
  }



    crearUsuario (formdata: RegisterForm){
     return  this.http.post(`${base_url}/usuarios`, formdata)
                 .pipe(
                     tap((resp:any)=>{
                    localStorage.setItem('token', resp.token)                   })
                   )
    }
  
     actualizarPerfil( data: { email: string, nombre: string, role: string } ) {
       //Regla de validación
       data = {
        ...data,
        role: this.usuario.role
      };
       return  this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
  
    }

    login (formdata: LoginForm){
     return  this.http.post(`${base_url}/login`, formdata)
                 .pipe(
                   tap((resp:any)=>{
                  localStorage.setItem('token', resp.token)                   })
                 )
  }

    loginGoogle (token){
     return  this.http.post(`${base_url}/login/google`, {token})
                 .pipe(
                   tap((resp:any)=>{
                  localStorage.setItem('token', resp.token)                   })
                 ) 
  }
 
      /*getUsuario(uid) {
       return this.http.get(`${base_url}/usuarios/${this.uid}`, {
       headers: {
            'x-token': this.token
          }
    
       })
                     
        
      }*/
    cargarUsuarios( desde : number =0){
      const url = `${base_url}/usuarios?desde=${desde}`;
      return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(resp =>{
          const usuarios = resp.usuarios.map(
            user=>new Usuario (user.nombre, user.email, '', user.img, user.google, user.role, user.uid),

          )
          return {
            total: resp.total,
            usuarios
          };
        })
      )
    } 

      eliminarUsuario(usuario:Usuario){
        const url = `${base_url}/usuarios/${usuario.uid}`;
        return this.http.delete(url, this.headers);
       }

      guardarUsuarui( usuario: Usuario ) {
       return  this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers)
    }

}