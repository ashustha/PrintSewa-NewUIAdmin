import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditCategoryService {

  constructor(private http: HttpClient) { }

  getSuperCategoryByID(categoryID){
  	return this.http.get('https://apips.printsewa.com.np/super/category/' +categoryID);
  }

  updateCategory(update){
  	return this.http.put('https://apips.printsewa.com.np/super/category/update', update);	
  }

}