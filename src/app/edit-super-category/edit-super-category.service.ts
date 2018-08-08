import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditSuperCategoryService {

  constructor(private http: HttpClient) { }

  getProductByID(productID){
  	return this.http.get('https://apips.printsewa.com.np/product/id/' + productID);
  }

  editProduct(updatedProduct){
  	return this.http.put('https://apips.printsewa.com.np/edit/product', updatedProduct);
  }

  addUpdateLog(updateLog){
  	return this.http.post('https://apips.printsewa.com.np/updateLog/add', updateLog);
  }

}
