import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(private http:HttpClient) { }

  getDatas(entityName:String){
    return this.http.get(environment.apiUrl+entityName)
  }

  getDatasByPage(entityName:String,pageNumber:Number,pageLimit:Number){
    return this.http.get(environment.apiUrl+entityName+"/by/page?pageNumber="+pageNumber+"&pageLimit="+pageLimit)
  }
}
