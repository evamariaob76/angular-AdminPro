import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo!: string;
  public tituloSubs$: Subscription | undefined;

  
  constructor( private router: Router, private route: ActivatedRoute) {
    this.getArgumentosRuta();
    //leyendo arhumentos del router
        console.log(route.snapshot.children)
        console.log(route.snapshot.children[0].data)

  }

    getArgumentosRuta(){
      this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      map((event:ActivationEnd) => event.snapshot.data)
    ).subscribe(({titulo}) =>{
      this.titulo=titulo
      document.title =`Admin Pro-  ${titulo}`;
    });
    }


  ngOnDestroy(): void {

    if(this.tituloSubs$){
          this.tituloSubs$!.unsubscribe();
    }

    this.router.navigate(['./dashboard']);


  }


  

}
