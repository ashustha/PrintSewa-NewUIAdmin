import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperCategoryService } from './super-category.service';

@Component({
  selector: 'app-super-category',
  templateUrl: './super-category.component.html',
  styleUrls: ['./super-category.component.css'],
  providers: [SuperCategoryService]
})
export class SuperCategoryComponent implements OnInit {
	allProducts;
  allProductsLength;
  lid;

  //----------
  addProductForm;
  productName;
  productCode;
  description;
  productID;
  p;

  
  constructor(private superCategory: SuperCategoryService, private fb: FormBuilder) {

      this.addProductForm = fb.group({
        'productName' : [null, Validators.required],
        'productKey': [null, Validators.required],
        'description' : [null, Validators.required]
      });
  }

  ngOnInit() {
    this.lid = localStorage.getItem("sessionItem");

  	this.superCategory.getAllProducts().subscribe((data)=> {
  		this.allProducts = data;
      this.allProductsLength = this.allProducts.length;
  	});

    this.superCategory.getLatestProductID().subscribe((data) => {
      if(data[0] == undefined)
        this.productID = 1;
      else 
        this.productID = data[0].productID + 1;
    });

  }

  deleteProduct(product){
    this.superCategory.getProductTypeFromProductID(product.productID).subscribe((typeData: Array<Object>) => {
      if(typeData.length > 0) {
        alert("This product has product type dependency. Please clear the dependency before deleting this product. Thank You. :)");
      } else {
        product.productStatus = 'deleted';

        var deleteLog = {
          loginID: this.lid,
          deletedItemID: product.productID,
          deletedItemType: 'Product',
          commitComment: 'Product with id ' + product.productID + ' was deleted by admin with login ID '+this.lid +',' + ' on '+ new Date(),
        }
        this.superCategory.addDeleteLog(deleteLog).subscribe(() => {});
        this.superCategory.updateProductStatus(product).subscribe(() => {});
        

        alert("Product status has been changed to deleted. Please refer to delete log for further information");
        location.reload();

      }
    })
    
  }

  addProduct(fg: FormGroup) {
    var createdBy = localStorage.getItem('username');
    var productName = fg.value.productName;
    var productKey = fg.value.productKey.toUpperCase();
    var description = fg.value.description;

    var newProduct = {
      productName: productName,
      productKey: productKey,
      description: description,
      createdBy: 'Sanjog Rijal',
      status: 'active'
    }
    // console.log(newProduct)
    this.superCategory.addProduct(newProduct).subscribe(()=> {});
    alert("Super Category successfully added.");
    // this.router.navigate(['showProduct'])
    location.reload();
  }

}
