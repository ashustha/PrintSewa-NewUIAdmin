import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Routes, Router } from '@angular/router';
import { ProductService } from './product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

	lid;
	//build declarations
	toggleSelect;
	select;
	typeName;
	width;
	unit;
	imageHref;
	paperGsm;
	weight;
	minQty;
	maxQty;
	remarks;
	normalProductionTime;
	urgentProductionTime;
	normalPrice;
	urgentPrice;
  productName;


	allProductType;
	allProductTypeLength;
	allProductTypeNoAdditionalCost = [];
	sortedData = [];
	newSortedData = [];
	typeAdditionalCost;
	data;
	useFulArray = [];
	modalData = [];
	additionalCostData = [];
	noAdditionalCostData = [];

	modalTypeName;
	modalWidth;
	modalPaperGsm;
	modalUnit;
	modalHeight;
	modalImgHref;
	modalWeight;
	modalMinQty;
	modalMaxQty;
	modalRemarks;
	modalNormalProductionTime;
	modalUrgentProductionTime;
	modalNormalPrice;
	modalUrgentPrice;
	modalAdditionalCosts;
	priceData;

  //---------------
  createProductForm: FormGroup;
products;
additionalOption;
additionalCost;
latestID;
superCategory;
typeID;
superCategoryKey;
categoryKey;
normalTimeRadioValue;
urgentTimeRadioValue;
additionalConstList=[];
priceArray = [];
filesToUpload: Array<File> = [];
imagePath = ' ';
latestTypeID;
idData;
updateProductionType;
modalTypeID;
modalPriceID;
updatePrice;
modalUrgentTimeChange;
addNewPrices;
modalNormalTimeChange;
modalNormalTimeRadioValue;
additionalCostsLength;
height;
profitMargin;
allSuperCategory;
type;
updateProductType;
modalUrgentTimeRadioValue;
price;

imageUrl;
imgHref;
p;

  constructor(private router: Router, private fb: FormBuilder, private productService: ProductService) {
  	this.productService.newWithAdditionalCost().subscribe((price: any) => {
  	  var priceData;
  	  priceData = price;
  	  this.sortedData = priceData;

  	  // var newPrice = priceData.sort((a,b) => a.typeID - b.typeID);

  	  //Sanjog Code
  	      // for(var i = 0; i < newPrice.length; i++){
  	      //   for (var j = 1; j < newPrice.length; j++) {
  	      //     if(newPrice[j] != undefined){
  	      //       if(newPrice[i].typeID == newPrice[j].typeID){
  	      //         if(newPrice[i].name != null || newPrice[j].name != null){
  	      //           newPrice[i].name = newPrice[i].name.concat(','+priceData[j].name);
  	      //           var newPriceData = newPrice[i];
  	      //           this.sortedData.push(newPriceData);
  	      //           newPrice.splice(j,1);
  	      //         }
  	      //       }
  	      //       else {
  	      //         this.sortedData.push(newPrice[j]);
  	      //       }
  	      //     }
  	      //   }
  	      // }

  	  //Sanat Code
  	      // for(var i = 0; i < newPrice.length; i++){
  	      //   for (var j = 1; j < newPrice.length; j++) {
  	      //     if(newPrice[j] != undefined){
  	      //       if(newPrice[i].typeID == newPrice[j].typeID){
  	      //           newPrice[i].name = newPrice[i].name.concat(','+priceData[j].name);
  	      //           var newPriceData = newPrice[i];
  	      //           this.sortedData.push(newPriceData);
  	      //           newPrice.splice(j,1);
  	      //       }
  	      //     }
  	      //   }
  	      // }

  	      // this.sortedData.sort(this.mycomparator);
  	      // this.sortedData = newPrice;
  	});

  	this.productService.newWithNoAdditionalCost().subscribe((data: any) => {
  	   this.allProductTypeNoAdditionalCost = data;
  	});

  	this.productService.getAllProductTypes().subscribe((data: any) => {
  	   this.allProductType = data;
  	   this.allProductTypeLength = this.allProductType.length;
  	});

    //---------------------

         this.createProductForm = fb.group({
           'productType' : [null, Validators.required],
          'productKey' : [null, Validators.required],
          'productCode' : [null, Validators.required],
           'product': [null, Validators.required],
          'type': [null, Validators.required],
           'width': [null, Validators.required],
           'height': [null,Validators.required],
           'unit': [null, Validators.required],
          'remark': [null, Validators.required],
           'paper': [],
           'additionalCost': [ ],
           'weight': [null, Validators.required],
          'minQuantity': [null, Validators.required],
          'maxQuantity': [null, Validators.required],
           'normalPrice': [null, Validators.required],
           'urgentPrice': [null, Validators.required],
          'normalTime': [null, Validators.required],
          'urgentTime': [null, Validators.required],
          'profitMargin': [null, Validators.required],
        });

        this.productService.getAllProducts().subscribe((data) => {
            this.products = data;
        });

        this.productService.getAllAdditionalOptions().subscribe((additionalOption) => {
            this.additionalOption = additionalOption;
        });

        this.productService.getAllSuperCategory().subscribe((superCategory) => {
            this.superCategory = superCategory;
        });

  }

  mycomparator(a,b) {
    return parseInt(a.typeID) - parseInt(b.typeID);
  }

  ngOnInit() {
  	this.lid = localStorage.getItem("sessionItem");

  	document.getElementById('all').style.display = '';
  	document.getElementById('additionalCost').style.display = 'none';
  	document.getElementById('noAdditionalCost').style.display = 'none';

    this.productService.getLatestID().subscribe((data) => {
      this.idData = data
      if(this.idData.length == 0){
        this.typeID = 1;
      }else{
        this.typeID = data[0].typeID + 1;
      } 
    });
  }

  editProductType(typeID){
  	this.router.navigate(['/editProduct/'+typeID])
  }

  deleteProductType(typeID, type){
    this.productService.getPriceByTypeID(typeID).subscribe((price) => {
      // console.log(price[0]);
        price[0].priceStatus = "deleted";
        this.productService.updatePrice(price[0]).subscribe(() => {});
    }); 
        type.typeStatus = "deleted";
        // console.log(type);
        this.productService.updateType(type).subscribe(() => {});

    this.productService.getTypeAdditionalCostByTypeID(typeID).subscribe((typeAdditionalCost) => {
       this.typeAdditionalCost = typeAdditionalCost;
         this.productService.updateTypeAdditionalCost(this.typeAdditionalCost).subscribe(() => {});
    });

    var deleteLog = {
      loginID: this.lid,
      deletedItemID: typeID,
      deletedItemType: 'Prodcut Type',
      commitComment: 'Product Type with id ' + typeID + ' was deleted by admin with login ID '+ this.lid + ' on ' + new Date(),
    }
    this.productService.insertDeleteLog(deleteLog).subscribe(() => {});
    alert('Product Type Successfully Deleted');
    // location.reload();
  }

  // condition(type,cost){
  //   if(type == 'active' && cost == ' '){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }


  toggleAdditionalCost(toggleSelect){
    // console.log(toggleSelect);
    if(toggleSelect == 'without' || toggleSelect == null || toggleSelect == '' || toggleSelect == ' '){
      document.getElementById('all').style.display = 'none';
      document.getElementById('additionalCost').style.display = 'none';
      document.getElementById('noAdditionalCost').style.display = '';
    } else if(toggleSelect == 'all' || toggleSelect == null || toggleSelect == '' || toggleSelect == ' '){
      document.getElementById('all').style.display = '';
      document.getElementById('additionalCost').style.display = 'none';
      document.getElementById('noAdditionalCost').style.display = 'none';
    } else {
      document.getElementById('all').style.display = 'none';
      document.getElementById('additionalCost').style.display = '';
      document.getElementById('noAdditionalCost').style.display = 'none';
    }
  }
  
  feedModalData(type){
    // console.log(type)
    // console.log(this.additionalCostData)
    this.additionalCostData = [];
    this.modalData = [];

    this.modalData.push(type);
    this.modalTypeName = this.modalData[0].typeName;
    this.modalWidth = this.modalData[0].width;
    this.modalUnit = this.modalData[0].unit;
    this.modalHeight = this.modalData[0].height;
    this.modalImgHref = this.modalData[0].imgHref;
    this.modalPaperGsm = this.modalData[0].paperGsm;
    this.modalWeight = this.modalData[0].weight;
    this.modalRemarks = this.modalData[0].remarks;

    if(this.modalData[0].additionalCosts != ''){
      // console.log(this.modalData);
      this.modalAdditionalCosts = this.modalData[0].additionalCosts.split(',');
      for(var i=0; i<this.modalAdditionalCosts.length; i++){
        this.productService.getAdditionalCostName(this.modalAdditionalCosts[i]).subscribe((additionalCost) => {
            this.additionalCostData.push({
              name: additionalCost[0].name,
              cost: additionalCost[0].cost
            });
        });
      }
    }else{
      this.modalAdditionalCosts = '';
    }

    this.productService.getPriceForProductType(type.typeID).subscribe((newData) => {
      this.priceData = newData;
    });


  }

    addToPriceArray(fg: FormGroup) {
      var minQuantity = fg.value.minQuantity;
      var maxQuantity = fg.value.maxQuantity;
      var normalPrice = fg.value.normalPrice;
      var urgentPrice = fg.value.urgentPrice;
      var normalTime = fg.value.normalTime + ' ' + this.normalTimeRadioValue;
      var urgentTime = fg.value.urgentTime + ' ' + this.urgentTimeRadioValue;
      var createdBy = 'admin';
      var priceStatus = 'active';

      if(minQuantity == '' || minQuantity == '' || normalPrice == '' || urgentTime == '' || this.normalTimeRadioValue == undefined || this.urgentTimeRadioValue == undefined){
        alert('Empty field cannot be added');
      }else{
        var newPrice = {
          minQty: minQuantity,
          maxQty: maxQuantity,
          normalPrice: normalPrice,
          urgentPrice: urgentPrice,
          normalProductionTime: normalTime,
          urgentProductionTime: urgentTime,
          createdBy: createdBy,
          priceStatus: priceStatus
        }
        this.priceArray.push(newPrice);
      }
  }

    productKeyFunction(){
      var product = <HTMLSelectElement>document.getElementById("productWa");
      this.productService.getProductByName(product.value).subscribe((data) => {
          this.categoryKey = data[0].productCode;
      });
    }

    superCategoryKeyFunction(){
      var superCategory = <HTMLSelectElement>document.getElementById("type");
      this.productService.getSuperCategoryByName(superCategory.value).subscribe((superCategory) => {
          this.superCategoryKey = superCategory[0].superCategoryKey;
      });
    }

    checkChange(additionalOptionsID){
      // var flag:boolean = false;
      if(this.additionalConstList.length === 0){
        this.additionalConstList.push(additionalOptionsID);
      }else{
          if(this.additionalConstList.indexOf(additionalOptionsID) !== -1){
            var index = this.additionalConstList.indexOf(additionalOptionsID);
            this.additionalConstList.splice(index,1);
            // flag= false;
          }else{
            // flag=true;
            this.additionalConstList.push(additionalOptionsID);
          }
      }
        // console.log(this.additionalConstList);
    }

    createProductType(fg: FormGroup){
        const productType = fg.value.productType;
        const typeKey = fg.value.productKey.toUpperCase();
        const typeCode = this.categoryKey+ "-" + this.superCategoryKey + '-' + typeKey + "-" +this.typeID;
        const product = fg.value.product;
        const type = fg.value.type;
        const width = fg.value.width;
        const height = fg.value.height;
        const unit = fg.value.unit;
        const paper = fg.value.paper;
        const remark = fg.value.remark;
        const weight = fg.value.weight;
        const profitMargin = fg.value.profitMargin;

        if(this.additionalConstList == null || this.additionalConstList.length == 0 || this.additionalConstList == undefined){
            this.additionalConstList = [];
        }else{
          //  this.additionalCost = this.additionalConstList.toString();
           this.productService.getLatestTypeID().subscribe((id) => {
               if(id[0] == undefined){
                 this.latestTypeID = 1;
               } else {
                 this.latestTypeID = parseInt(id[0].typeID + 1);
               }
               var additionalCostLink = {
                 additionalCostID: this.additionalConstList,
                 typeID: this.latestTypeID
               }
               // console.log(additionalCostLink);
               this.productService.addTypeAdditionalCost(additionalCostLink).subscribe(() => {});
               alert("Additional Cost Added");
           });
        }      

        this.productService.getProductByName(product).subscribe((product) => {    
            var newProductType = {
              typeName: productType,
              typeKey: typeKey,
              typeCode: typeCode,
              productId: product[0].productID,
              type: type,
              width: width,
              height: height,
              unit: unit,
              remarks: remark,
              paperGsm: paper,
              additionalCosts: this.additionalConstList.toString() || " ",
              weight: weight,
              createdBy: 'admin',
              status: 'active',
              imageUrl: this.imagePath,
              imgHref: 'https://apips.printsewa.com.np/productImage/' + this.imagePath,
              priceArray: this.priceArray,
              profitMargin: profitMargin,
            }
            // console.log(newProductType)
            this.productService.addProductType(newProductType).subscribe((data) => {});
            //For Image Upload
            const formData: any = new FormData();
            const files: Array<File> = this.filesToUpload;
            if(files[0] == undefined){
            //Do Nothing
            } else{
              formData.append('productImage[]', files[0], files[0]['name']);

            this.productService.addImage(formData).subscribe( files => console.log('files', files));
            }

            alert('Product Added');
            this.router.navigate(['/viewProductType']);
            location.reload();
        });
    }


    fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
      this.imagePath = fileInput.target.files[0]['name'];
    }

    normalTimeChange(data){
      
      document.getElementById('normalTime').setAttribute("placeholder",data.value);
      this.normalTimeRadioValue = data.value;
    }

    urgentTimeChange(data){
      
      document.getElementById('urgentTime').setAttribute("placeholder",data.value);
      this.urgentTimeRadioValue = data.value;
    }

}
