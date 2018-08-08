import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AdminHomeService {

  constructor(private http: HttpClient) { }

  getAllOrders(){
  	return this.http.get('https://apips.printsewa.com.np/orders/all');
  }

}
