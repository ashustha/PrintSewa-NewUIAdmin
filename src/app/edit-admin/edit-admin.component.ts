import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute, Params, Routes, Router } from '@angular/router';
import { EditAdminService } from './edit-admin.service'

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css'],
  providers: [ EditAdminService ]
})
export class EditAdminComponent implements OnInit {
oldPassword;
loginData;

loginID;
type;
userID;
username;
password;
email;
accessManagementModule;
adminCreatorModule;
contentManagementModule;
orderManagementModule;
pricingManagementModule;
productManagementModule;
accessManagementModuleValue;
adminCreatorModuleValue;
contentManagementModuleValue;
orderManagementModuleValue;
pricingManagementModuleValue;
productManagementModuleValue;


  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private editAdminService: EditAdminService) {
  	this.route.params.subscribe((params: Params) => {
  		this.loginID = params['loginID'];
  		this.editAdminService.getAdmin(this.loginID).subscribe((login) => {
        this.loginData = login;
  			this.username = this.loginData[0].username;
  			this.password = this.loginData[0].password;
  			this.email = this.loginData[0].email;
        this.oldPassword = this.loginData[0].password;
        this.accessManagementModule = this.loginData[0].accessManagementModule;
        this.adminCreatorModule = this.loginData[0].adminCreatorModule;
        this.contentManagementModule = this.loginData[0].contentManagementModule;
        this.orderManagementModule = this.loginData[0].orderManagementModule;
        this.pricingManagementModule = this.loginData[0].pricingManagementModule;
        this.productManagementModule = this.loginData[0].productManagementModule;
            console.log(this.accessManagementModule);
            console.log(this.contentManagementModule);
    	});
  	});
  }

  ngOnInit() {
  }


  updateAdmin(uname,email,accMS,admMS,cMS,oMS,priMS,proMS,loginID){
    
  	if(uname == null || uname == '' || uname == undefined || email == null || email == undefined || email == ''){
        alert('Fields cannot be empty');
    }else{
      if(accMS == true) {
        accMS = 1;
      } else {
        accMS = 0;
      }

      if(admMS == true) {
        admMS = 1;
      } else {
        admMS =0;
      } 

      if(cMS == true) {
        cMS = 1;
      } else {
        cMS = 0;
      }

      if(oMS == true) {
        oMS = 1;
      } else {
        oMS = 0;
      }

      if(priMS == true) {
        priMS = 1;
      } else {
        priMS =0;
      }

      if(proMS == true) {
        proMS = 1;
      } else {
        proMS = 0;
      }
      var update = {
          loginID: loginID, 
          username: uname,
          email: email,
          password: this.password,
          userID: 0,
          productManagementModule: proMS,
          pricingManagementModule: priMS,
          orderManagementModule: oMS,
          adminCreatorModule: admMS,
          contentManagementModule: cMS,
          accessManagementModule: accMS,
          type: 'admin'

        }
        this.editAdminService.updateAdmin(update).subscribe(() => {});
        alert('Admin Updated');
        this.router.navigate(['/showAdmin']);
        location.reload();
    }
  }

  checkOldPassword(oldPassword){
    var password = Md5.hashStr(oldPassword);
    var error = document.getElementById('oldPasswordEmpty');
    if(this.oldPassword != password){
      error.innerHTML = 'Your old password does not match';
    }else{
      error.innerHTML = ' ';
    }
  }

}
