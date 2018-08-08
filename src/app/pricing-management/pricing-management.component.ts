import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Routes, Router } from '@angular/router';
import { PricingManagementService } from './pricing-management.service';

@Component({
  selector: 'app-pricing-management',
  templateUrl: './pricing-management.component.html',
  styleUrls: ['./pricing-management.component.css'],
  providers: [ PricingManagementService ]
})

export class PricingManagementComponent implements OnInit {
generalData;
generalDataLength;

contentID;
companyCity;
companyCountry;
companyEmail;
companyName;
companyPhone;
companyStreetAddress;
companyZone;
discountCorporate;
discountIndividual;
profitMargin;
taxRate;


  constructor(private router: Router, private pricingManagementService: PricingManagementService) {
  	this.pricingManagementService.getAllGeneral().subscribe((data) => {
  		this.generalData = data;
  		this.generalDataLength = this.generalData; 
      console.log(data)
      this.contentID = this.generalData[0].contentID;
      this.companyCity = this.generalData[0].companyCity;
      this.companyCountry = this.generalData[0].companyCountry;
      this.companyEmail = this.generalData[0].companyEmail;
      this.companyName = this.generalData[0].companyName;
      this.companyPhone = this.generalData[0].companyPhone;
      this.companyStreetAddress = this.generalData[0].companyStreetAddress;
      this.companyZone = this.generalData[0].companyZone;
      this.discountCorporate = this.generalData[0].discountCorporate;
      this.discountIndividual = this.generalData[0].discountIndividual;
      this.profitMargin = this.generalData[0].profitMargin;
      this.taxRate = this.generalData[0].taxRate;  
    });
  }

  ngOnInit() {
  }

  // editGeneral(contentID){
  // 	this.router.navigate(['/editPricingManagement/' +contentID]);
  // }

  updateContent(name,email,disCor,disInd,profit,tax,street,city,zone,country,phone){
    if(disCor == '' || disInd == '' || profit == '' || tax == ''){
      alert('Empty fields cannot be updated');
    }else{
      var update = {
        contentID: this.contentID,
        companyCity: city,
        companyCountry: country,
        companyEmail: email,
        companyName: name,
        companyPhone: phone,
        companyStreetAddress: street,
        companyZone: zone,
        discountCorporate: disCor,
        discountIndividual: disInd,
        profitMargin: profit,
        taxRate: tax,
      }
      this.pricingManagementService.updateContent(update).subscribe(() => {});
      alert('Pricing Update');
      this.router.navigate(['/pricingManagement']);
      location.reload();
    }
  }
}
