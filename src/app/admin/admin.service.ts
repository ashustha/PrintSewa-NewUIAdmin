import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllAdmins(){
  	return this.http.get('https://apips.printsewa.com.np/admin/all');
  }

  getInfo(id){
  	return this.http.get('https://apips.printsewa.com.np/admin/id/' +id);
  }

}
