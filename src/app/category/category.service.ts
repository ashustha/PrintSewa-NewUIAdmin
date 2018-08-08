import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllSuperCategory(){
  	return this.http.get('https://apips.printsewa.com.np/super/category/all');
  }

  getProductTypeFromSuperCategoryName(superCategory){
  	return this.http.get('https://apips.printsewa.com.np/super/category/type/'+superCategory);
  }

  updateSuperCategory(superCatgory){
  	return this.http.put('https://apips.printsewa.com.np/super/category/update', superCatgory);
  }

  addDeleteLog(newDeleteLog){
  	return this.http.post('https://apips.printsewa.com.np/deleteLog/add', newDeleteLog);
  }

  addCategory(newCategory){
    return this.http.post('https://apips.printsewa.com.np/super/category/add', newCategory);
  }

}
