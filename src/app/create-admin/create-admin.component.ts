import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Routes, Router } from '@angular/router';
import { CreateAdminService } from './create-admin.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
  providers: [ CreateAdminService ]
})

export class CreateAdminComponent{
createAdminForm;

  constructor(private router: Router, private fb: FormBuilder, private createAdminService: CreateAdminService) { 
  		this.createAdminForm = fb.group({
  			'username': [null, Validators.compose([Validators.required])],
        'email': [null, Validators.compose([Validators.required, Validators.email])],
  			'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        'cpass': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
  			// 'role': [null, Validators.required]
        'productManagementModule': [],
        'pricingManagementModule': [],
        'orderManagementModule': [],
        'adminCreatorModule': [],
        'contentManagementModule': [],
        'accessManagementModule': []
  		});
  }

  ngOnInit() {
  }

  createAdmin(fg: FormGroup){
  	const username = fg.value.username;
    const email = fg.value.email;
  	const password = Md5.hashStr(fg.value.password);
    const cpass = Md5.hashStr(fg.value.cpass);
  	const role = fg.value.role;
    var productManagementModule = fg.value.productManagementModule;
    var pricingManagementModule = fg.value.pricingManagementModule;
    var orderManagementModule = fg.value.orderManagementModule;
    var adminCreatorModule = fg.value.adminCreatorModule;
    var contentManagementModule = fg.value.contentManagementModule;
    var accessManagementModule = fg.value.accessManagementModule;

    if(password != cpass){
      alert('Password Doesnot Match')
    }else{        
        if(productManagementModule != true){
          productManagementModule = false;
        }
        if(contentManagementModule != true){
          contentManagementModule = false;
        }
        if(adminCreatorModule != true){
          adminCreatorModule = false;
        }
        if(orderManagementModule != true){
          orderManagementModule = false;
        }
        if(pricingManagementModule != true){
          pricingManagementModule = false;
        }
        if(accessManagementModule != true){
          accessManagementModule = false;
        }

        var newLogin = {
          username: username,
          email: email,
          password: password,
          userID: 0,
          productManagementModule: productManagementModule,
          pricingManagementModule: pricingManagementModule,
          orderManagementModule: orderManagementModule,
          adminCreatorModule: adminCreatorModule,
          contentManagementModule: contentManagementModule,
          accessManagementModule: accessManagementModule,
          type: 'admin'

        }
        
        this.createAdminService.addAdminLogin(newLogin).subscribe(() => {});
        alert('Admin Added Successfully');
        location.reload();
        this.router.navigate(['/showAdmin']);
    }
  }

}
