import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProductTypes(){
  	return this.http.get('https://apips.printsewa.com.np/product/type/all');
  }

  ultimateInnerJoin(){
    return this.http.get('https://apips.printsewa.com.np/price/ultimate');
  }

  getPriceForType(){
  	return this.http.get('https://apips.printsewa.com.np/price/type/additionalCost');
  }

  getPriceForTypeNoAdditionCost(){
    return this.http.get('https://apips.printsewa.com.np/price/type');
  }

  getAdditionalCost(){
    return this.http.get('https://apips.printsewa.com.np/additional/options/type');
  }

  // deleteProductType(typeID){
  // 	return this.http.delete('https://apips.printsewa.com.np/type/delete/' +typeID);
  // }

  // updateProductTypeStatus(updatedProduct){
  //   return this.http.put('https://apips.printsewa.com.np/edit/product', updatedProduct);
  // }

  addDeleteLog(newDeleteLog){
    return this.http.post('https://apips.printsewa.com.np/deleteLog/add', newDeleteLog);
  }

  getPriceForTypeID(typeID){
    return this.http.get('https://apips.printsewa.com.np/price/type/' +typeID);
  }

  getPriceByTypeID(typeID) {
    return this.http.get('https://apips.printsewa.com.np/price/by/typeID/' + typeID);
  }

  updatePrice(price){
    return this.http.put('https://apips.printsewa.com.np/price/update', price);
  }

  getTypeByTypeID(typeID){
    return this.http.get('https://apips.printsewa.com.np/product/typeID/' +typeID);
  }

  updateType(type){
    return this.http.put('https://apips.printsewa.com.np/type/update', type);
  }

  getTypeAdditionalCostByTypeID(typeID){
    return this.http.get('https://apips.printsewa.com.np/type/additionalCost/' +typeID);
  }

  updateTypeAdditionalCost(typeAdditionalCost){
    return this.http.put('https://apips.printsewa.com.np/type/additionalCost/update', typeAdditionalCost)
  }

  insertDeleteLog(deleteLog){
    return this.http.post('https://apips.printsewa.com.np/deleteLog/add', deleteLog);
  }

  getPriceForProductType(typeID) {
    return this.http.get("https://apips.printsewa.com.np/price/by/typeID/" + typeID);
  }

  newWithNoAdditionalCost(){
    return this.http.get("https://apips.printsewa.com.np/product/price/new");
  }

  newWithAdditionalCost() {
    return this.http.get('https://apips.printsewa.com.np/product/additionalOption/additionalCost/new');
  }

  getAdditionalCostName(id){
    return this.http.get('https://apips.printsewa.com.np/additional/options/id/' +id)
  }


  //---------------------- Create Product Type

  addProductType(newProductType){
    return this.http.post('https://apips.printsewa.com.np/type/add', newProductType);
  }

  getAllProducts(){
    return this.http.get('https://apips.printsewa.com.np/product/all');
  }

  getAllAdditionalOptions(){
    return this.http.get('https://apips.printsewa.com.np/additional/options/all');
  }

  getTypeByTypeName(typeName){
    return this.http.get('https://apips.printsewa.com.np/product/type/' +typeName);
  }

  getProductByName(name){
    return this.http.get('https://apips.printsewa.com.np/product/name/' +name);
  }

  getLatestTypeID(){
    // console.log("tyepID")
    return this.http.get('https://apips.printsewa.com.np/type/latestID');
  }

  getAdditionalOptionsByName(name){
    return this.http.get('https://apips.printsewa.com.np/')
  }

  addPrice(price){
    // console.log(price);
    return this.http.post('https://apips.printsewa.com.np/price/add', price);
  }

  addTypeAdditionalCost(additionalCostLink){
    return this.http.post('https://apips.printsewa.com.np/type/additionalCost/add', additionalCostLink);
  }

  getAllSuperCategory(){
    return this.http.get('https://apips.printsewa.com.np/super/category/all');
  }

  getLatestID(){
    return this.http.get('https://apips.printsewa.com.np/type/latestID');
  }

  addImage(formData){
    return this.http.post('https://apips.printsewa.com.np/productImage', formData);
  }

  getSuperCategoryByName(superCategory){
    return this.http.get('https://apips.printsewa.com.np/super/category/name/'+superCategory);
  }

}
