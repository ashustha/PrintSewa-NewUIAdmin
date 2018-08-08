import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute, Params, Routes, Router } from '@angular/router';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [ ChangePasswordService ]
})
export class ChangePasswordComponent implements OnInit {
category;
loginID; loginData; oldPassword;
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

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private changePasswordService: ChangePasswordService) {
  		this.route.params.subscribe((params: Params) => {
  			this.loginID = params['loginID'];
  			this.changePasswordService.getAdmin(this.loginID).subscribe((login) => {
  	      		this.loginData = login;
  				this.oldPassword = this.loginData[0].password;
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
  			});
  		});
  }

  ngOnInit() {
  }

  changePassword(oldPass,pass, cpass){
  	if(oldPass == undefined || oldPass == null || oldPass == '' || pass == undefined || pass == null || pass == '' || cpass == undefined || cpass == null || cpass == '' ){
  		alert('Password fields cannot be empty');	
  	}else if(pass.length > 5){
        if(pass != cpass){
          alert('Password does not Match');
        }else{
      		var update = {
      		  loginID: this.loginID,
      		  username: this.username,
      		  email: this.email,
      		  password: Md5.hashStr(pass),
      		  userID: ' ',
      		  productManagementModule: this.productManagementModule,
      		  pricingManagementModule: this.pricingManagementModule,
      		  orderManagementModule: this.orderManagementModule,
      		  adminCreatorModule: this.adminCreatorModule,
      		  contentManagementModule: this.contentManagementModule,
      		  acessManagementModule: this.accessManagementModule,
      		  type: 'admin'
    		  }
          this.changePasswordService.updateAdmin(update).subscribe(() => {});
          alert('Password Successfully Updated');
          this.router.navigate(['/showAdmin']);
          location.reload();
         }
  	}else{
      alert('Password should be more than 5 characters');
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
