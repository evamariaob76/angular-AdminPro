import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import{Usuario} from'../models/usuario.model'
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

public usuario? : Usuario;
  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {

   customInitFunctions();

  }
recibir(mensaje){
this.usuario= mensaje;
}

}

