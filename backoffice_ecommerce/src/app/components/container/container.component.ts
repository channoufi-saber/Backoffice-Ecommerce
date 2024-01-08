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
  pageNumber:number=1
  pageLimit:number=5
  datas: any;
  result:any;
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

    this.entityService.getDatasByPage(this.pagePath,this.pageNumber,this.pageLimit).subscribe({
      next: (data: any)=>{
        const { isSuccess , results } = data
        if(isSuccess && results){
          this.isLoading = false 
          this.datas = results
          this.result=data
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

setPage(page: number){
    this.pageNumber = page 
    this.getDatasByPage()
  }

setPageLimit(event: any){
    const { name, value } = event.target
    const pageLimit = parseInt(value)
    if(!isNaN(pageLimit)){
      this.pageLimit = parseInt(value)
      this.getDatasByPage()
    }
    
  }

  getDatasByPage(){
    this.entityService.getDatasByPage(this.pagePath, this.pageNumber, this.pageLimit).subscribe({
      next: (data: any)=>{
        const { isSuccess , results } = data
        if(isSuccess && results){
          this.isLoading = false 
          this.datas = results
          this.result = data
        }else{
          // gestion des erreurs
        }
        
      },
      error: (error: any) =>{
        // gestion des erreurs
        console.log(error);
      }
    })
  }
}