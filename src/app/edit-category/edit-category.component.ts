

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditCategoryService } from './edit-category.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
  providers: [ EditCategoryService ] 
})
export class EditCategoryComponent{
categoryID;
category;
categoryKeyValue;
description;

  constructor(private editCategoryService: EditCategoryService, private router: Router, private actRoute: ActivatedRoute) {
  	this.actRoute.params.subscribe((params: Params) => {
  	  this.categoryID = params['categoryID'];

  	  this.editCategoryService.getSuperCategoryByID(this.categoryID).subscribe((data) => {
  	  		this.category = data[0].superCategory;
          this.categoryKeyValue = data[0].superCategoryKey;
  	  		this.description = data[0].categoryDescription;
  	  });
  	});

  }

  ngOnInit() {
  }

  editCategory(category,superCategoryKey,description){
    if(category == '' || description == ''){
      alert("Empty filed cannot be updated");
    }else{
      var update = {
        superCategoryID: this.categoryID,
        superCategory: category,
        superCategoryKey: superCategoryKey.toUpperCase(),
        categoryDescription: description,
        createdBy: 'admin',
        status: 'active',
      }
      // console.log(update)
      this.editCategoryService.updateCategory(update).subscribe(() =>{});
      alert('Category Updated');
      this.router.navigate(['superCategory']);
      location.reload();
    }

  }

}

