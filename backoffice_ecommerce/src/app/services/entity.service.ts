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
}
