import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'websiteName'
})
export class WebsiteNamePipe implements PipeTransform {

  transform(value: string, args?: string[]): any {
    // let limit = (args && args[0])? parseInt(args[0]):25
    // if(value)
    //   return value.substring(0,limit)+"...";
    if(value){
      let a = value.indexOf('.');
      let b = value.indexOf('.',a+1);
      
      return value.substring(a+1,b);
  }
  }

}
