import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers: [OffersService]
})
export class OffersComponent implements OnInit {
  productOffers;
  productOffersLength;
  
  lid;

  //----------------------------

  addProductOffersForm: FormGroup;
  productsData;
  

  constructor(private service: OffersService, private fb: FormBuilder) {

    this.addProductOffersForm = fb.group({
      offerProductName: [null, Validators.required],
      offerProductDescription: [null, Validators.required],
      productCode: [null, Validators.required],
      offerProductDiscountPercentage: [null, Validators.required],
      hotDeal: [null, Validators.required]
    })

   }

  ngOnInit() {
  	this.service.getAllProductOffers().subscribe((offerData)=> {
      this.productOffers = offerData;
      this.productOffersLength = this.productOffers.length;
  	});

    this.service.getAllProductTypes().subscribe((productData) => {
      this.productsData = productData;
    });
    
  }

  deleteOfferProducts(offerProductID) {
    var deleteLog = {
      loginID: this.lid,
      deletedItemID: offerProductID,
      deletedItemType: 'Offer Product',
      commitComment: 'Offer Product with id ' + offerProductID + ' was deleted by admin with login ID'+ this.lid + ' on '+ new Date(),
    }

    this.service.deleteOfferProducts(offerProductID).subscribe(() => {});
    this.service.addDeleteLog(deleteLog).subscribe(() => {});
    alert("Product Offer Deleted");
    location.reload();
  }

  addProductOffer(fg: FormGroup){
    var productCode = fg.value.productCode;
    this.service.getProductTypeByCode(productCode).subscribe((product) => {
         var offerProductName = fg.value.offerProductName;
         var offerProductDescription = fg.value.offerProductDescription;
         var offerProductDiscountPercentage = fg.value.offerProductDiscountPercentage;
         var hotDeal = fg.value.hotDeal;
         
         var newProductOffer = {
           productID: productCode,
           offerProductName: offerProductName,
           offerProductDescription: offerProductDescription,
           offerProductDiscountPercentage: offerProductDiscountPercentage,
           hotDeal: hotDeal,
           offerProductsStatus: 'active'
          }
          // console.log(newProductOffer)
         this.service.addOfferProducts(newProductOffer).subscribe(() => {});
         alert("New Product Offer Added");
         // this.router.navigate(['showOffers']);
         location.reload();
    });
  }

}

