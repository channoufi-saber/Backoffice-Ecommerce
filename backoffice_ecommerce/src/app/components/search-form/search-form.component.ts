import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Input() name:any="name"
  @Output() newValue=new EventEmitter<any>()
  value:String=""

  handleSubmit(event:any){
    event.preventDefault()
    if(this.value){
      const data:any={name:this.name,value:this.value}
      this.newValue.emit(data)
    }else{
      this.newValue.emit(null)
    }

  }
  constructor() { }

  ngOnInit(): void {
  }

}
