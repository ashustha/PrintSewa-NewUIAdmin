import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Routes, Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ AdminService ],
})
export class AdminComponent implements OnInit {
allAdmin;
admin_role;
accessManagementModule;
p;
allOrdersLength;
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

  constructor(private router: Router, private AdminService: AdminService) { 
    // var x = document.cookie.split(';');
    // var lid = x[1].split('=')[1];
    var lid = localStorage.getItem('sessionItem');
    console.log(lid)

    this.AdminService.getInfo(lid).subscribe((data) => {
      this.admin_role = data[0].type;
      this.accessManagementModule = data[0].accessManagementModule;
    });

  	this.AdminService.getAllAdmins().subscribe((admin) => {
  		this.allAdmin = admin;
      // console.log(admin)
  	});

  }

  ngOnInit() {
  }

  editAdmin(loginID){
    this.router.navigate(['/editAdmin/'+loginID]);
  }

  changePassword(loginID){
    this.router.navigate(['/changePassword/' +loginID]);
  }
}

