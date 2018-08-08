import { Component, OnInit } from '@angular/core';
import { EditOffersService } from './edit-offers.service';
import {ActivatedRoute,Router, Params} from '@angular/router';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.component.html',
  styleUrls: ['./edit-offers.component.css'],
  providers: [EditOffersService],
})
export class EditOffersComponent implements OnInit {
	lid;
  offerProductData;
	offerProductID;
	productCode1;
	offerProductName1;
	offerProductDescription1;
	offerProductDiscountPercentage1;
  hotDeal1;
  offerStatus;

  productsData;

  constructor(private router: Router, private service: EditOffersService, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.lid = localStorage.getItem("sessionItem");

    this.service.getAllProductTypes().subscribe((productData) => {
      this.productsData = productData;
    });

  	this.actRoute.params.subscribe((params: Params) => {
  		this.offerProductID = params['offerProductID'];
  		
  		this.service.getOfferProductByOfferProductID(this.offerProductID).subscribe((data) => {
  			this.productCode1 = data[0].productID;
  			this.offerProductName1 = data[0].offerProductName;
  			this.offerProductDescription1 = data[0].offerProductDescription;
  			this.offerProductDiscountPercentage1 = data[0].offerProductDiscountPercentage;
        this.hotDeal1 = data[0].hotDeal;
        this.offerStatus = data[0].offerProductsStatus;
  		});
  	});

   }

  editOfferProduct(offerProductName,productCode,offerProductDescription,offerProductDiscountPercentage,hotDeal,offerProductID,status){
  	if(offerProductName == '' ||productCode == ''||offerProductDescription == ''||offerProductDiscountPercentage == ' ' ||offerProductName == ' ' ||productCode == ' '||offerProductDescription == ' '||offerProductDiscountPercentage == ' '){
      alert('Empty field cannot be updated');
    }else{
        var updatedOfferProduct = {
          offerProductID: offerProductID,
          offerProductName: offerProductName,
          productID: productCode,
          offerProductDescription: offerProductDescription,
          offerProductDiscountPercentage: offerProductDiscountPercentage,
          offerProductsStatus: status,
          hotDeal: hotDeal
        }

        var updateLog = {
          loginID: this.lid,
          updatedItemId: offerProductID,
          updatedItemType: 'Offer Product',
          commitComment: 'This item was updated by admin with login ID: '+this.lid +' on, ' + new Date(),
        }

        // console.log(updatedOfferProduct)
        // console.log(updateLog)

        this.service.updateOfferProducts(updatedOfferProduct).subscribe(() => {});
        this.service.addUpdateLog(updateLog).subscribe(() => {});
        alert('Successfully updated');
        this.router.navigate(['/showOffers']);
        location.reload();
    }
  }




}

