import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContentManagementService {

  constructor(private http: HttpClient) { }

  addContent(newContent) {
  	return this.http.post('https://apips.printsewa.com.np/general/add', newContent);
  }

  addAboutUs(newAboutUs){
  	return this.http.post('https://apips.printsewa.com.np/about/add', newAboutUs);
  }

  addTerms(newTerms){
  	return this.http.post('https://apips.printsewa.com.np/terms/add', newTerms);
  }

  addImage(formData){
    return this.http.post('https://apips.printsewa.com.np/uploadbanner', formData);
  }

  addHomePageSlider(newSlider){
    return this.http.post('https://apips.printsewa.com.np/banner/add', newSlider);
  }

  addFaq(newFaq){
    return this.http.post("https://apips.printsewa.com.np/faq/add", newFaq);
  }

  getActiveHomepageSlider(){
    return this.http.get('https://apips.printsewa.com.np/banner/view/active');
  }

  getAllGeneral(){
    return this.http.get('https://apips.printsewa.com.np/general/all');
  }
  

}
