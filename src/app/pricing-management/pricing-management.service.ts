import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable()
export class PricingManagementService {

  constructor(private http: HttpClient) { }

  getAllGeneral(){
  	return this.http.get('https://apips.printsewa.com.np/general/all');
  }

  updateContent(update){
  	return this.http.put('https://apips.printsewa.com.np/content/update', update);
  }
}
