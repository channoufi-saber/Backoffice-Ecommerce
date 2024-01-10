import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  @Input() src:String=""
  @Output() closeModal=new EventEmitter<any>()
  myModal:any
  constructor() { }

  ngOnInit(): void {
    const WT:any=window
    this.myModal=new WT["bootstrap"].Modal("#imagePreview",{keyboard:false})
    this.myModal.show()
  }

  handleCloseModal(){
    this.myModal.hide()
    this.closeModal.emit(true)
  }

}
