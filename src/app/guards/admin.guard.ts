import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ignoreElements } from 'rxjs-compat/operator/ignoreElements';
import {UssarioService} from '../services/ussuario.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( private ussarioService: UssarioService,
                private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {    
      if(this.ussarioService.role ==='ADMIN_ROLE') {
        return true;
      }   
      else{
          this.router.navigateByUrl('/dashboard')

          return false;

      }

  }
  
}
