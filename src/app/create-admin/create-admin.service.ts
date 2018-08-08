import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class CreateAdminService {

  constructor(private http: HttpClient) { }

  addAdminLogin(newLogin){
  	return this.http.post('https://apips.printsewa.com.np/admin/add', newLogin);
  }
}
