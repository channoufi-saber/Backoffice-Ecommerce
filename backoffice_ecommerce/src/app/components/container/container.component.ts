import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getEntityProperties } from 'src/app/helpers/helpers';
import { routes } from 'src/app/helpers/routes';
import { EntityService } from 'src/app/services/entity.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  pagePath: String = ""
  pageName: String = ""
  datas: any;
  entityNames: Array<String> = [];
  entityNamesAll: Array<String> = [];
  isLoading: Boolean = true;
  routes: Array<any> = routes


  constructor( 
    private route: ActivatedRoute,
    private entityService: EntityService
    ){}

  ngOnInit(){
    this.initComp()   

    this.entityService.getDatas(this.pagePath).subscribe({
      next: (data: any)=>{
        const { isSuccess , results } = data
        if(isSuccess && results){
          this.isLoading = false 
          this.datas = results
        }        
      },
      error: (error: any) =>{
        console.log(error);
      }
    })
  }

  getValue(data: any, name: String){
    const index: any = name
    return data[index]
  }

  initComp(){
    this.pagePath = this.route.snapshot.url[0]?.path || "product"

    const routeObject: any = this.routes.filter(route => route.path === "/"+this.pagePath)

    if(routeObject[0]){
      this.pageName = routeObject[0]?.name
    }

    this.entityNamesAll = getEntityProperties(this.pagePath)
    this.entityNames = [this.entityNamesAll[0]]
  }

}