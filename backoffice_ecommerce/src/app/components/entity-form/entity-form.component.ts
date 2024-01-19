import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { EntityService } from 'src/app/services/entity.service';


@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {

  @Input() entityNames:Array<string>=[]
  @Input() data:any;

  form:any;
  formData:any={};
  categories:any;
  categoriesSelected:any;
  files:any;

  @Output() formEmit=new EventEmitter<any>()
  constructor(private fb:FormBuilder,
              private entityService:EntityService
              ) { }

  async ngOnInit() {
    this.entityNames=this.entityNames.filter((name:String)=>{
      if(name === "created_at"){
        return false
      }

      if(name === "updated_at"){
        return false
      }
      return true
    })
    if(this.entityNames.includes("categories")){
      const data:any=await lastValueFrom(this.entityService.getDatas("category"))
      this.categoriesSelected=this.data["categories"]
      this.categories=data.results
    }
    this.initForm()
    this.initSelect()

    
  }

  initForm(){
      let formObject={}
      this.entityNames.forEach((name:any)=>{
        const value=this.data[name]
        formObject={...formObject,[name]:this.fb.control(value,[Validators.required])}
      })
      this.form=this.fb.group(formObject)

  }

  initSelect(){
    const WD:any=window
    const $=WD.jQuery
    const self=this

    $(document).ready(function(){
      $('.select-categories').select2();
      $('.single-select').select2();
      $('.select-categories').on('select2:select',function(event:any){
        const values=$('.select-categories').select2("val")
        self.formData["categories"]=values
      });

      $('.select-categories').on('select2:unselect',function(event:any){
        const values=$('.select-categories').select2("val")
        self.formData["categories"]=values
      });
      $('.single-select').on('select2:select',function(event:any){
        const {name,value}=event.target
        self.formData[name]=value
      });
    });
  }


  handleSubmit(){
    const data={...this.form.value,...this.formData}
    if(this.files){
      data["files"]=this.files
    }
   this.formEmit.emit({...data})
  }

  handleUpdateOption(data:any){
    this.formData["options"]=data
  }

  handleChangeFile(files:any){
    this.files=files
  }
 

}
