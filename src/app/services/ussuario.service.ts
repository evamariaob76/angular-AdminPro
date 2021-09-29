import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';
import { pairwise } from 'rxjs-compat/operator/pairwise';
import { Usuario } from '../models/usuario.model';


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
    data = {
      ...data,
      role: this.usuario?.role!
    };

   return  this.http.put(`${base_url}/usuarios/${this.uid}`, data,{

    headers: {
        'x-token': this.token
      }
   })

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
 
  getUsuario(uid) {
   return this.http.get(`${base_url}/usuarios/${this.uid}`, {
   headers: {
        'x-token': this.token
      }

   })
                 
    
  }
}