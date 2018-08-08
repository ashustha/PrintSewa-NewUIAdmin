import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditAdditionalOptionsService {

  constructor(private http: HttpClient) { }

  getAdditionalOptionsByID(additionalOptionID) {
  	return this.http.get('https://apips.printsewa.com.np/additional/options/id/' + additionalOptionID);
  }

  editAdditionalOptions(updatedOptions) {
  	return this.http.put('https://apips.printsewa.com.np/additional/options/edit', updatedOptions);
  }

  addUpdateLog(updateLog){
  	return this.http.post('https://apips.printsewa.com.np/updateLog/add', updateLog);
  }

}
