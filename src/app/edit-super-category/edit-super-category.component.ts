import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditSuperCategoryService } from './edit-super-category.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-super-category',
  templateUrl: './edit-super-category.component.html',
  styleUrls: ['./edit-super-category.component.css'],
  providers: [ EditSuperCategoryService ] 
})
export class EditSuperCategoryComponent implements OnInit {
  editProductForm;
    productName;
    productCode;
    description;
    pname;
    pcode;
    desc;
    productID;
    createdBy;
    productStatus;

    constructor(private fb: FormBuilder, private editService: EditSuperCategoryService, private router: Router, private actRoute: ActivatedRoute) {
    this.editProductForm = fb.group({
      'productName' : [null, Validators.required],
      'productCode' : [null, Validators.required],
      'productKey' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
  }

  ngOnInit() {
    this.actRoute.params.subscribe((params: Params) => {
      const productID = params['superCategoryID'];

      this.editService.getProductByID(productID).subscribe((data) => {
        this.pname = data[0].productName;
        this.pcode = data[0].productCode;
        this.desc = data[0].productDescription;
        this.productID = data[0].productID;
        this.createdBy = data[0].createdBy;
        this.productStatus  = data[0].productStatus;
      });
    });
  }

  editProduct(productName, productCode, productDescription, productID, createdBy, status) {
    if(productName == '' || productCode == '' || productDescription == ''){
      alert('Empty field cannot be updated');
    }else{
      var updatedProduct = {
        productID: productID,
        productName: productName,
        productCode: productCode.toUpperCase(),
        productDescription: productDescription,
        createdBy: "admin",
        productStatus: status
      }

      var updateLog = {
        loginID: '1',
        updatedItemId: productID,
        updatedItemType: 'Product',
        commitComment: 'This item was updated by admin with login ID: 1. Edited Product: ' + productID + '. Edited Date: ' + new Date(),
      }

      this.editService.editProduct(updatedProduct).subscribe(()=> {});
      this.editService.addUpdateLog(updateLog).subscribe(() => {});
      alert("Super Category successfully edited");
      this.router.navigate(['superCategory']);
      location.reload();
    }
  }

}

