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
  query:String=""
  searchTag:String=""
  displaySelectionBox:Boolean=false
  imageUrl:String|null=null


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
    const localData=this.getLocalData(this.pagePath)
    this.entityNames = localData? localData?.entityNames : [this.entityNamesAll[0]]
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

  searchData(data:any){
    this.query=""
    if(data){
      this.searchTag=data.value
      this.query += data.name + "="+data.value
    }
    this.getDatasByPage();
  }

  getDatasByPage(){
    if(this.query){
      this.entityService.searchDataByPage(this.pagePath,this.query,this.pageNumber, this.pageLimit).subscribe({
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
    }else{
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

  setDisplaySelectionBox(){
    this.displaySelectionBox= !this.displaySelectionBox
  }

  setEntityNames(event:any,name:String){
    const {checked}=event.target
      if(checked){
          if(!this.entityNames.includes(name)){
            const oldValue=this.entityNames
            oldValue.push(name)
            this.entityNames=[]
            this.entityNames=this.entityNamesAll.filter(name =>oldValue.includes(name))
          }
      }else{
        this.entityNames=this.entityNames.filter((entityName:String)=>entityName !==name)
      }
      const index:any=this.pagePath
      let data:any={"entityNames":this.entityNames}
      this.saveLocalData(index,data)
  }

  setImageView(name:any,data:any){
    if(!name && !data){
      this.imageUrl=null
    }
    if(name === "imageUrls"){
      this.imageUrl = data["imageUrls"][0]
    }else{

      this.imageUrl=null
    }
  }

  saveLocalData(key:string,value:string) {
    if(window.localStorage){
      window.localStorage.setItem(key,JSON.stringify(value))
    }
  }


getLocalData(key:any):any {
    if(window.localStorage){
      const value:any=window.localStorage.getItem(key)
      return JSON.parse(value)
    }
  }



  
}