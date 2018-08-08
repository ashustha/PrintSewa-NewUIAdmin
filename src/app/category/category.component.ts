import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ CategoryService ]
})
export class CategoryComponent implements OnInit {
allCategory;
allCategoryLength;
lid;
p;

//-----------

addCategoryForm;
superCategory;
// productCode;
description;
// productID;


constructor(private router: Router,private fb: FormBuilder, private categoryService: CategoryService) {

    this.addCategoryForm = fb.group({
      'superCategory' : [null, Validators.required],
      'superCategoryKey': [null, Validators.required],
      'description' : [null, Validators.required]
    });
 }

  ngOnInit() {
    this.lid = localStorage.getItem("sessionItem");

  	this.categoryService.getAllSuperCategory().subscribe((data)=> {
      // console.log(data)
  		this.allCategory = data;
      this.allCategoryLength = this.allCategory.length;
  	})
  }

  editCategory(categoryID){
  	this.router.navigate(['/editCategory/' +categoryID]);
  }

  deleteCategory(category){
    this.categoryService.getProductTypeFromSuperCategoryName(category.superCategory).subscribe((superCategory: Array<Object>) => {
      if(superCategory.length > 0) {
        alert("This Super Category has product type dependency. Please clear the dependency before deleting this product. Thank You. :)");
      } else {
        category.superCategoryStatus = 'deleted';

        var deleteLog = {
          loginID: this.lid,
          deletedItemID: category.superCategoryID,
          deletedItemType: 'Super Category',
          commitComment: 'Super Category with id ' + category.superCategoryID + ' was deleted by admin with login ID '+this.lid + ',' + ' on '+ new Date(),
        }

        this.categoryService.addDeleteLog(deleteLog).subscribe(() => {});
        this.categoryService.updateSuperCategory(category).subscribe(() => {});
        

        alert("Super Category Status has been changed to deleted. Please refer to delete log for further information");
        location.reload();

      }
    })
    
  }

  //-------------

  addCategory(fg: FormGroup) {
    var superCategory =  fg.value.superCategory;
    var superCategoryKey = fg.value.superCategoryKey.toUpperCase();
    var description = fg.value.description;

    var newCategory = {
      superCategory: superCategory,
      superCategoryKey: superCategoryKey,
      description: description,
      createdBy: 'admin',
      status: 'active'
    }

    this.categoryService.addCategory(newCategory).subscribe(()=> {});
    alert("Super Category successfully added.");
    this.router.navigate(['superCategory']);
    location.reload();
  }


}
