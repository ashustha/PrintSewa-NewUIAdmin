import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AddAdditionalOptionsService {

  constructor(private http: HttpClient) { }


  getAllAdditionalCost(){
  	return this.http.get('https://apips.printsewa.com.np/additional/options/non/deleted');
  }

  editAdditionalOptions(updatedOptions) {
  	return this.http.put('https://apips.printsewa.com.np/additional/options/edit', updatedOptions);
  }

  addDeleteLog(newDeleteLog){
  	return this.http.post('https://apips.printsewa.com.np/deleteLog/add', newDeleteLog);
  }

  checkDependency(additionalOptionsID){
     return this.http.get('https://apips.printsewa.com.np/additional/options/dependency/' + additionalOptionsID);
   }

   //-----
   addAdditionalOption(additionalOptions){
     return this.http.post('https://apips.printsewa.com.np/additional/options/add', additionalOptions);
   }


}

