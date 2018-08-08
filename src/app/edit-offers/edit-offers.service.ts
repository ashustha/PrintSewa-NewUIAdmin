import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditOffersService {

  constructor(private http: HttpClient) { }

  getAllProductTypes(){
    return this.http.get('https://apips.printsewa.com.np/product/type/active');
  }

  getOfferProductByOfferProductID(offerProductID){
  	return this.http.get('https://apips.printsewa.com.np/offerProducts/id/' + offerProductID);
  }

  updateOfferProducts(updatedOfferProduct){
  	return this.http.put('https://apips.printsewa.com.np/offerProducts/update', updatedOfferProduct);

  }

  deleteOfferProducts(offerProductID){
  	return this.http.delete('https://apips.printsewa.com.np/offerProducts/delete/' + offerProductID);
  }
  
  addUpdateLog(updateLog){
  	return this.http.post('https://apips.printsewa.com.np/updateLog/add', updateLog);
  }

}

