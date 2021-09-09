import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: []
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    });
    
      /*const promesa = new Promise ( (resolve, reject)=>{

        if (true){
          resolve("holaaa")}

        else{
          reject('salio mal')
        }

      });
          promesa.then( (mensaje) =>{
          console.log (mensaje)

          })
       
         .catch(error => console.log(error))
          console.log ("fuera de promesa")*/


  }
    //La funcion get Usuarios de otra forma
     /* getUsuarios(){
      const promesa= new Promise( resolve =>{
        fetch('https://reqres.in/api/users')
            .then( respuesta=>( respuesta.json())
            .then( body=> resolve(body.data))
            
          );

      });
      return promesa;    
        
  }*/
      getUsuarios(){
          return  new Promise( resolve =>{
          fetch('https://reqres.in/api/users')
              .then( respuesta=>( respuesta.json())
              .then( body=> resolve(body.data))
              
              );
    
          });
    
      }
}
