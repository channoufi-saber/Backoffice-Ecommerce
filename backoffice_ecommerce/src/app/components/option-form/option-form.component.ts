import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {generateId} from 'src/app/helpers/util';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.css']
})
export class OptionFormComponent implements OnInit {

  @Input() options:any;
  @Output() emitOption=new EventEmitter<any>()
  constructor() { }

  ngOnInit(): void {
    this.options=this.options? this.options:[]
  }

  addOption(){
    this.options.push({
      _id:generateId(),
      name:"Option Name",
      values:[
      {
        _id:generateId(),
        value:"Option Value"
      }

        ]
    })
  }


addOptionValue(optionId:String){
  this.options=this.options.map((option:any)=>{
    if(option._id === optionId){
      option.values.push({
        _id:generateId(),
        name:"Option Value"
      })
    }
    return option
  })
}

updateOption(event:any,optionId:String){
  const {value}=event.target
  this.options=this.options.map((option:any)=>{
    if(option._id === optionId){
      option.name=value
    }
    return option
  })
  this.emitOption.emit(this.options)
}

updateOptionValue(event:any,optionId:String,valueId:String){
  const {value}=event.target
  this.options=this.options.map((option:any)=>{
    if(option._id === optionId){
      option.values=option.values.map((valueItem:any)=>{
        if(valueItem._id === valueId){
          valueItem.name=value
        }
        return valueItem
      })
    }
    return option
  })
  this.emitOption.emit(this.options)

}

removeOption(optionId:String){
  this.options=this.options.filter((option:any)=>option._id !== optionId)
    this.emitOption.emit(this.options)

}

removeOptionValue(optionId:String,valueId:String){
  this.options=this.options.map((option:any)=>{
    if(option._id === optionId){
      option.values=option.values.filter((item:any)=>item._id !== valueId)
    }
    return option
  })
    this.emitOption.emit(this.options)

}
}
