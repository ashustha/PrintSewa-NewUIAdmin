import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders(){
  	return this.http.get('https://apips.printsewa.com.np/orders/all');
  }

  getOrderByOrderID(orderID){
  	return this.http.get('https://apips.printsewa.com.np/order/typeID/' +orderID)
  }

  getUserByID(userID){
  	return this.http.get('https://apips.printsewa.com.np/user/id/' +userID);
  }

  changeStatus(changedStatus) {
  	return this.http.put('https://apips.printsewa.com.np/orders/update/status/', changedStatus);
  }

  updateOrderEmail(email){
  	return this.http.post('https://apips.printsewa.com.np/order/update/email', email);
  }
}
