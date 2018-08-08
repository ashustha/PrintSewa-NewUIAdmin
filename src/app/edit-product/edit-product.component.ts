import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute, Params, Routes, Router } from '@angular/router';
import { EditProductService } from './edit-product.service'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ EditProductService ]
})
export class EditProductComponent implements OnInit {
productType;
allSuperCategory;
products;
additionalOption;

priceID;
typeName;
typeID;
productID;
productName;
type;
width;
height;
unit;
remarks;
paperGsm;
additionalCosts;
additionalCostsLength;
additionalCostsArray = [];
weight;
minQty;
maxQty;
normalPrice;
urgentPrice;
normalProductionTime;
urgentProductionTime;
newAdditionalCostArray = [];
productImage;
price;
imageUrl;
imgHref;
profitMargin;
newPricesArray = [];

normalTimeRadioValue;
urgentTimeRadioValue;

modalNormalTimeRadioValue;
modalUrgentTimeRadioValue;


filesToUpload: Array<File> = [];
imagePath;

addAdditionalArray = [];
deleteAdditionalArray = [];

uniqueAddAdditionalArray = [];
uniqueDeleteAdditionalArray = [];

modalPriceID;
modalTypeID;
modalMinQty;
modalMaxQty;
modalNormalPrice;
modalUrgentPrice;
modalNormalProductionTime;
modalUrgentProductionTime;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private editProductTypeService: EditProductService) { 
    this.editProductTypeService.getAllSuperCategory().subscribe((superCategory) => {
        this.allSuperCategory = superCategory;
    });

    this.editProductTypeService.getAllProducts().subscribe((data) => {
        this.products = data;
    });

    this.editProductTypeService.getAllAdditionalOptions().subscribe((additionalOption) => {
        this.additionalOption = additionalOption;
        // console.log(this.additionalOption)
    });

  	this.route.params.subscribe((params: Params) => {
  		var typeID = params['typeID'];
      this.typeID = typeID;
  		this.editProductTypeService.getPriceForTypeID(typeID).subscribe((price) => {
        this.editProductTypeService.getProductTypeByTypeID(typeID).subscribe((type) => {
          // console.log(type)
          this.price = price;
          this.productType = type;
          console.log(this.productType)
          this.typeName = this.productType[0].typeName;
          this.productID = this.productType[0].productID;
          this.editProductTypeService.getProductByID(this.productID).subscribe((product) => {
              this.productName = product[0].productName;
          });
          this.type = this.productType[0].type;
          this.width = this.productType[0].width;
          this.height = this.productType[0].height;
          this.unit = this.productType[0].unit;
          this.remarks = this.productType[0].remarks;
          this.paperGsm = this.productType[0].paperGsm;
          if(this.productType[0].additionalCosts == ""){
            this.additionalCosts = [];
            this.additionalCostsLength = this.additionalCosts.length;
          }else{
            var additionalCost = [];
            this.additionalCosts = this.productType[0].additionalCosts.split(',');
            console.log(this.additionalCosts);
            for(var i=0; i<this.additionalCosts.length; i++){
              additionalCost.push(parseInt(this.additionalCosts[i]));
            }

            additionalCost.sort(this.sortNumber);

            this.additionalCosts = additionalCost;
            this.additionalCostsLength = this.additionalCosts.length;
            
            for(var k=0; k<this.additionalOption.length; k++){
              for(var l=0; l<this.additionalCosts.length; l++){
                if(this.additionalOption[k] != undefined){
                  if(this.additionalCosts[l] == this.additionalOption[k].additionalOptionsID){
                    this.additionalOption.splice(k,1);
                  }else{
                    //not matched
                  }
                }
              }
            }

            for(var i=0; i<this.additionalCosts.length; i++){
              this.editProductTypeService.getAddtionalOptionsByID(this.additionalCosts[i]).subscribe((additionalOptions) => {
                  this.additionalCostsArray.push({
                      additionalOptionStatus: additionalOptions[0].additionalOptionStatus,
                      additionalOptionsID: additionalOptions[0].additionalOptionsID,
                      cost: additionalOptions[0].cost,
                      createdBy: additionalOptions[0].createdBy,
                      name: additionalOptions[0].name,
                      repeat: additionalOptions[0].repeat
                  });
              });
            }
          }
          this.imageUrl = this.productType[0].imageUrl;
          this.imgHref = this.productType[0].imgHref;
          this.profitMargin = this.productType[0].profitMargin;
          this.weight = this.productType[0].weight;
          this.minQty = this.productType[0].minQty;
          this.maxQty = this.productType[0].maxQty;
          this.normalPrice = this.productType[0].normalPrice;
          this.urgentPrice = this.productType[0].urgentPrice;
          this.normalProductionTime = this.productType[0].normalProductionTime;
          this.urgentProductionTime = this.productType[0].urgentProductionTime;
        });
  		});
  	});
  }

  ngOnInit() {
  }

  sortNumber(a,b) {
      return a - b;
  }

  modalPrice(priceID){
    this.editProductTypeService.getPriceForPriceID(priceID).subscribe((priceData) => {
        this.modalPriceID = priceData[0].priceID;
        this.modalTypeID = priceData[0].typeID;
        this.modalMaxQty = priceData[0].maxQty;
        this.modalMinQty = priceData[0].minQty;
        this.modalNormalPrice = priceData[0].normalPrice;
        this.modalUrgentPrice = priceData[0].urgentPrice;
        this.modalNormalProductionTime = priceData[0].normalProductionTime.split(' ',1);
        this.modalUrgentProductionTime = priceData[0].urgentProductionTime.split(' ',1);
    });
  }

  updatePrice(priceID,typeID,modalMin,modalMax,modalPriceNormal,modalPriceUrgent,modalTimeNormal,modalTimeUrgent){
    if(modalMin == '' || modalMax == '' || modalPriceNormal == '' || modalPriceUrgent == '' || modalTimeNormal == '' || modalTimeUrgent == '' || this.modalNormalTimeRadioValue == undefined || this.modalUrgentTimeRadioValue == undefined){
      alert('Empty fields cannot be added');
    }else{
      var update = {
        priceID: priceID,
        typeID: typeID,
        minQty: modalMin,
        maxQty: modalMax,
        normalPrice: modalPriceNormal,
        urgentPrice: modalPriceUrgent,
        normalProductionTime: modalTimeNormal + ' ' + this.modalNormalTimeRadioValue,
        urgentProductionTime: modalTimeUrgent + ' ' + this.modalUrgentTimeRadioValue,
        createdBy: 'admin',
        priceStatus: 'active',
      }
      this.editProductTypeService.updatePrice(update).subscribe(() => {});
      alert('Price Updated Successfully');
      location.reload();
    }
  }  

  deletePrice(price){
    price.priceStatus = 'deleted';

    this.price = this.price.filter(item => item.minQty != price.minQty);
    
    var deletePrice = {
      priceID: price.priceID,
      priceStatus: "deleted"
    }

    var newDeleteLog = {
      loginID: localStorage.getItem('sessionItem'),
      deletedItemID: price.priceID,
      deletedItemType: 'Price',
      commitComment: "Admin with login ID: "+localStorage.getItem('sessionItem')+"has deleted a price with ID: " + price.priceID + "on: " + new Date()
    }
    this.editProductTypeService.deletePrice(deletePrice).subscribe(() => {});
    this.editProductTypeService.addDeleteLog(newDeleteLog).subscribe(() => {});
    alert("Price has been deleted please check the delete log for further details.");
  }

  addNewPrices(minQuantity,maxQuantity,normalPrice1,urgentPrice1,normalTime,urgentTime){
    if(minQuantity == '' || maxQuantity == '' || normalPrice1 == '' || urgentPrice1 == '' || normalTime == '' || urgentTime == '' || this.normalTimeRadioValue == undefined || this.urgentTimeRadioValue == undefined){
      alert('Empty fields cannot be added');
    }else{
      var newPrice = {
        typeID: this.typeID,
        minQty: minQuantity,
        maxQty: maxQuantity,
        normalPrice: normalPrice1,
        urgentPrice: urgentPrice1,
        normalProductionTime: normalTime + ' ' + this.normalTimeRadioValue,
        urgentProductionTime: urgentTime + ' ' + this.urgentTimeRadioValue,
        createdBy: 'admin',
        priceStatus: 'active',
      }

      this.newPricesArray.push(newPrice);
      this.price.push(newPrice);
      // console.log(this.newPricesArray);

      this.editProductTypeService.addPrice(this.newPricesArray).subscribe(() => {});
      alert("Price has been successfully added");
    }
  }

  checkChange(additionalOptionsID){
    if(this.newAdditionalCostArray.length === 0){
      this.newAdditionalCostArray.push(additionalOptionsID);
    }else{
        if(this.newAdditionalCostArray.indexOf(additionalOptionsID) !== -1){
          var index = this.newAdditionalCostArray.indexOf(additionalOptionsID);
          this.newAdditionalCostArray.splice(index,1);
          // flag= false;
        }else{
          // flag=true;
          this.newAdditionalCostArray.push(additionalOptionsID);
        }
    }
      // console.log(this.newAdditionalCostArray);
  }

  updateProductType(productType,product,type,profitMargin,width,height,unit,remark,paper,weight,imageUrl,imgHref){
      if(productType== '' ||product== '' ||type== '' ||width== '' ||height== '' ||unit== '' ||remark== '' ||paper== '' ||weight== '' || productType== ' ' ||product== ' ' ||type== ' ' ||width== ' ' ||height== ' ' ||unit== ' ' ||remark== ' ' ||paper== ' ' ||weight== ' '){
        alert('Empty field cannot be updated');
      }else{
        this.route.params.subscribe((params: Params) => {
          var typeID = params['typeID'];
          this.editProductTypeService.getAdditionalCostByTypeID(typeID).subscribe((data: Array<object>) => {
            // console.log(data)
            //Additional Cost chaina bhaney
            if(data.length == 0){
              //New Additional cost add gareko cha bhaney
              //if not added then empty array is sent
              if(this.newAdditionalCostArray.length != 0){
                var additionalCostLink = {
                   additionalCostID: this.newAdditionalCostArray,
                   typeID: typeID
                 }
                 // console.log(additionalCostLink)
                 this.editProductTypeService.addTypeAdditionalCost(additionalCostLink).subscribe(() => {});
              }
              //Prodcut Update Gareko
               this.editProductTypeService.getProductByName(product).subscribe((product) => {
                var updateType = {
                  typeID: typeID,
                  typeName: productType,
                  productID: product[0].productID,
                  type: type,
                  width: width,
                  height: height,
                  unit: unit,
                  remarks: remark,
                  paperGsm: paper,
                  additionalCosts: this.newAdditionalCostArray.toString(),
                  weight: weight,
                  createdBy: 'admin',
                  typeStatus: 'active',
                  imageUrl: this.imageUrl,
                  imgHref: "https://apips.printsewa.com.np/productImage/" + this.imageUrl,
                  profitMargin: profitMargin,
              }
              // console.log(updateType)
              this.editProductTypeService.updateProductType(updateType).subscribe(() => {});
                   //For Image Upload
          const formData: any = new FormData();
          const files: Array<File> = this.filesToUpload;
          if(files[0] == undefined){
          //Do Nothing
          } else{
            formData.append('productImage[]', files[0], files[0]['name']);

          this.editProductTypeService.addImage(formData).subscribe( files => console.log('files', files));
          }
          });
         } 
         //Additional Cost cha bhaney
         else {
           //paile and aaile ko additional array check garera add garney and delete garney array created
           var initiallyChecked = this.additionalCosts.sort();
           var clicked = this.newAdditionalCostArray.sort();

           for(var i=0;i<initiallyChecked.length; i++){
             for(var j=0;j<clicked.length; j++){
               if(initiallyChecked[i] == clicked[j]){
                  this.deleteAdditionalArray.push(clicked[j]);
               }
             }
           }

           for(var k=0; k<clicked.length; k++){
             for(var l=0; l<this.deleteAdditionalArray.length; l++){
               if(clicked[k] == this.deleteAdditionalArray[l]){
                 clicked.splice(k,1);
               }
             }
           }

           for(var i=0; i<this.additionalCosts.length; i++){
             for(var j=0; j<this.deleteAdditionalArray.length; j++){
                 if(this.additionalCosts[i] == this.deleteAdditionalArray[j]){
                    this.additionalCosts.splice(i,1);
                 }
             }
           }
           var mergedClicked = clicked.concat(this.additionalCosts) 

           //yedi update garda additional cost cha bhaney
           if(this.deleteAdditionalArray.length != 0){
              var deleteAdditionalLink = {
                additionalOptionID: this.deleteAdditionalArray.toString(),
                typeID: typeID
              }
              this.editProductTypeService.deleteTypeAdditionalCost(deleteAdditionalLink).subscribe(() => {}); 
           }

           //yedi update garda additional cost cha bhaney
           //chaina bhaney empty array is sent
           if(clicked.length != 0){
             var newAdditionalCostLink = {
                additionalCostID: clicked,
                typeID: typeID
              }
              this.editProductTypeService.addTypeAdditionalCost(newAdditionalCostLink).subscribe(() => {});
            }

            this.editProductTypeService.getProductByName(product).subscribe((product) => {
               //updating type
               if(clicked.length != 0){
                   var updateType = {
                     typeID: typeID,
                     typeName: productType,
                     productID: product[0].productID,
                     type: type,
                     width: width,
                     height: height,
                     unit: unit,
                     remarks: remark,
                     paperGsm: paper,
                     additionalCosts: mergedClicked.toString(),
                     weight: weight,
                     createdBy: 'admin',
                     typeStatus: 'active',
                     imageUrl: this.imageUrl,
                     imgHref: "https://apips.printsewa.com.np/productImage/" + this.imageUrl,
                     profitMargin: profitMargin,
                  }
                  // console.log(updateType)
                 this.editProductTypeService.updateProductType(updateType).subscribe(() => {});
               }else{
                   var updateType1 = {
                     typeID: typeID,
                     typeName: productType,
                     productID: product[0].productID,
                     type: type,
                     width: width,
                     height: height,
                     unit: unit,
                     remarks: remark,
                     paperGsm: paper,
                     additionalCosts: this.additionalCosts.toString(),
                     weight: weight,
                     createdBy: 'admin',
                     typeStatus: 'active',
                     imageUrl: this.imageUrl,
                     imgHref: "https://apips.printsewa.com.np/productImage/" + this.imageUrl,
                     profitMargin: profitMargin,
                 }
                 // console.log(updateType)
                 this.editProductTypeService.updateProductType(updateType1).subscribe(() => {});
               }
              const formData: any = new FormData();
              const files: Array<File> = this.filesToUpload;
              if(files[0] == undefined){
              //Do Nothing
              } else{
                formData.append('productImage[]', files[0], files[0]['name']);

              this.editProductTypeService.addImage(formData).subscribe( files => console.log('files', files));
              }
          });
            }
          });
        });
        alert('Type Updated');
        // this.router.navigate(['/viewProductType']);
        // location.reload();
      }     
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.imageUrl = fileInput.target.files[0]['name'];
  }

  normalTimeChange(data){ 
    document.getElementById('normalTime').setAttribute("placeholder",data.value);
    this.normalTimeRadioValue = data.value;
  }

  urgentTimeChange(data){
    document.getElementById('urgentTime').setAttribute("placeholder",data.value);
    this.urgentTimeRadioValue = data.value;
  }

  modalNormalTimeChange(data){ 
    this.modalNormalTimeRadioValue = data.value;
  }

  modalUrgentTimeChange(data){
    this.modalUrgentTimeRadioValue = data.value;
  }

}
