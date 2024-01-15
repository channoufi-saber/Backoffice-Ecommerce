import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/helpers/routes';
import { actions } from 'src/app/helpers/actions';
import { formatToCamelcase } from 'src/app/helpers/util';
import { EntityService } from 'src/app/services/entity.service';
import { getEntityProperties } from 'src/app/helpers/helpers';




@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css']
})
export class DataManagerComponent implements OnInit {

entity: any;
  entityId: any;
  pageName: any;
  action: any;
  entityNamesAll: any;
  data:any;
  result:any;
  routes: Array<any> = routes
  actions: Array<String> = actions

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService

    ){}


  ngOnInit(): void {
  
    window.scrollTo(0,0)
    const urls = this.route.snapshot.url
    if(urls.length < 3){
      this.router.navigate(["/error"])
    }
    this.entity = urls[0]?.path
    this.entityId = urls[1].path
    this.action = urls[2].path
    
    const isEntityExist = routes.filter((route: any)=> route.path === "/"+this.entity)
    if(!isEntityExist || !isEntityExist[0]){
      this.router.navigate(["/error"])
    }

    if(!this.actions.includes(this.action)){
      this.router.navigate(["/error"])
    }    

    const routeObject:any=this.routes.filter(route =>route.path === "/"+this.entity)
    if(routeObject[0]){
      this.pageName= formatToCamelcase(this.action)+" "+ routeObject[0]?.single
    }
    this.entityNamesAll = getEntityProperties(this.entity)
    this.getDataById();
  }

  getDataById(){
    this.entityService.getDataById(this.entity,this.entityId).subscribe({
      next:(value:any)=>{
        console.log(value)
        this.result=value
        this.data=value.result
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

  getValue(name:any){
    return this.data[name]
  }


}