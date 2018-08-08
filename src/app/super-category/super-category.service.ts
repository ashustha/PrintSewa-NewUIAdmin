import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SuperCategoryService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
  	return this.http.get('https://apips.printsewa.com.np/product/non/deleted');
  }

  deleteProduct(productID){
  	return this.http.delete('https://apips.printsewa.com.np/product/delete/' + productID);
  }

  getProductTypeFromProductID(productID) {
  	return this.http.get('https://apips.printsewa.com.np/type/productID/' + productID);
  }

  updateProductStatus(updatedProduct){
  	return this.http.put('https://apips.printsewa.com.np/edit/product', updatedProduct);
  }

  addDeleteLog(newDeleteLog){
  	return this.http.post('https://apips.printsewa.com.np/deleteLog/add', newDeleteLog);
  }

  //---------add product------------//
  
  addProduct(newProduct){
    return this.http.post('https://apips.printsewa.com.np/product/add', newProduct);
  }

  getLatestProductID(){
    return this.http.get('https://apips.printsewa.com.np/product/latestID');
  }
}
