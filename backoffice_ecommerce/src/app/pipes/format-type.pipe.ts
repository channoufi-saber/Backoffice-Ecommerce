import { Pipe, PipeTransform } from '@angular/core';

enum Type{
  INPUT="INPUT",
  SELECT="SELECT",
  TEXT="TEXT",
  IMAGE="IMAGE",
  OPTION="OPTION"
}

@Pipe({
  name: 'formatType'
})


export class FormatTypePipe implements PipeTransform {

  transform(name:any,data:any): unknown {
    let type=Type.INPUT
    let selectDatas=["status","availability","isBestSeller","isNewArrival","isFeatured","isSpecialOffer"]
      
    if(selectDatas.includes(name)){
      type=Type.SELECT
    }

    if(name ==="imageUrls"){
      type=Type.IMAGE
    }

    if(name ==="options"){
      type=Type.OPTION
    }

   
    return type;
  }

}
