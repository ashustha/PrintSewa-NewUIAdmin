

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OffersService {

  constructor(private http: HttpClient) { }

  getAllProductOffers(){
  	return this.http.get('https://apips.printsewa.com.np/offerProducts/all');
  }

  getTypeByTypeCode(typeCode){
    return this.http.get('https://apips.printsewa.com.np/product/type/code/' +typeCode);
  }

  deleteOfferProducts(offerProductID){
  	return this.http.delete('https://apips.printsewa.com.np/offerProducts/delete/' + offerProductID);
  }

  addDeleteLog(newDeleteLog){
  	return this.http.post('https://apips.printsewa.com.np/deleteLog/add', newDeleteLog);
  }

  getAllProductTypes(){
    return this.http.get('https://apips.printsewa.com.np/product/type/active');
  }

  addOfferProducts(newProductOffer){
    return this.http.post('https://apips.printsewa.com.np/offerProducts/add', newProductOffer);
  }

  getProductTypeByCode(productTypeCode){
    return this.http.get('https://apips.printsewa.com.np/product/type/code/' + productTypeCode);
  }
}

