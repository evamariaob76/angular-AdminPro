import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';
import { pairwise } from 'rxjs-compat/operator/pairwise';

const base_url = environment.base_url;
declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UssarioService {
  public auth2 : any;

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

  constructor( private http : HttpClient,
              private router : Router,
              private ngZone : NgZone
              ) {
                this.googleInit();
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
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
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
}
