import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

  transform(value: any , args:Array<any>): unknown {
    let newValue=value
    let name=args[0]
    let data=args[1]
    if(name == "imageUrls"){
      const url=value[0]
      newValue=`<img src="${url}" width="50" height="50" />`
    }
    if(name=="solde_price"){
      let currency= data["currency"]
      newValue=new Intl.NumberFormat('fr-fr',{style:'currency',currency:currency}).format(value)
    }
    if(name=="regular_price"){
      let currency= data["currency"]
      newValue=new Intl.NumberFormat('fr-fr',{style:'currency',currency:currency}).format(value)
    }
    return newValue;
  }

}
