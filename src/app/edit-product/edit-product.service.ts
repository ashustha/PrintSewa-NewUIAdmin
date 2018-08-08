import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class EditProductService {

  constructor(private http: HttpClient) { }

  getAllSuperCategory(){
    return this.http.get('https://apips.printsewa.com.np/super/category/all');
  }

  getPriceForTypeID(typeID){
  	return this.http.get('https://apips.printsewa.com.np/price/by/typeID/' +typeID);
  }

  getPriceForPriceID(priceID){
    return this.http.get('https://apips.printsewa.com.np/price/priceID/' +priceID);
  }

  addPrice(price){
    return this.http.post('https://apips.printsewa.com.np/price/add', price);
  }

  deletePrice(deletePrice){
    return this.http.put('https://apips.printsewa.com.np/price/delete',deletePrice);
  }

  addDeleteLog(newDeleteLog){
    return this.http.post('https://apips.printsewa.com.np/deleteLog/add', newDeleteLog);
  }

  getProductTypeByTypeID(typeID){
    return this.http.get('https://apips.printsewa.com.np/product/typeID/' + typeID);
  }

  getAllProducts(){
  	return this.http.get('https://apips.printsewa.com.np/product/all');
  }

  getAllAdditionalOptions(){
  	return this.http.get('https://apips.printsewa.com.np/additional/options/all');
  }

  getProductByID(productID){
  	return this.http.get('https://apips.printsewa.com.np/product/id/' +productID);
  }

  getAddtionalOptionsByID(id){
  	return this.http.get('https://apips.printsewa.com.np/additional/options/id/' +id);
  }

  getProductByName(name){
    return this.http.get('https://apips.printsewa.com.np/product/name/' +name);
  }

  updateProductType(type){
  	return this.http.put('https://apips.printsewa.com.np/type/update', type);
  }

  updatePrice(price){
  	return this.http.put('https://apips.printsewa.com.np/price/update', price);
  }

  getAdditionalCostByTypeID(typeID){
    return this.http.get('https://apips.printsewa.com.np/type/additionalCost/' + typeID);
  }

  addImage(formData){
    return this.http.post('https://apips.printsewa.com.np/productImage', formData);
  }

  addTypeAdditionalCost(additionalCostLink){
    // console.log(additionalCostLink)
    return this.http.post('https://apips.printsewa.com.np/type/additionalCost/add', additionalCostLink);
  }

  updateTypeAdditionalCost(updateAdditionalCostLink){
    return this.http.put('https://apips.printsewa.com.np/type/additionalCost/update', updateAdditionalCostLink);
  }

  deleteTypeAdditionalCost(deleteAdditionalLink){
    // console.log(deleteAdditionalLink.additionalOptionID.toString())
    return this.http.delete('https://apips.printsewa.com.np/type/additionalCost/delete/'+deleteAdditionalLink.additionalOptionID.toString()+'/'+deleteAdditionalLink.typeID);
  }

}
