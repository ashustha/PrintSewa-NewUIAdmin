import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Routes, Router } from '@angular/router';
import { AddAdditionalOptionsService } from './add-additional-options.service';

@Component({
  selector: 'app-add-additional-options',
  templateUrl: './add-additional-options.component.html',
  styleUrls: ['./add-additional-options.component.css'],
  providers: [ AddAdditionalOptionsService ]
})
export class AddAdditionalOptionsComponent implements OnInit {
editAdditionalOptions: FormGroup;
additionalOption;
additionalOptionLength;
name;
lid;

//---------
additionalOptions: FormGroup;
repeat;
p;


  constructor(private router: Router, private fb: FormBuilder, private AddAdditionalOptionsService: AddAdditionalOptionsService) { 
  	this.AddAdditionalOptionsService.getAllAdditionalCost().subscribe((data) => {
  		this.additionalOption = data;
      this.additionalOptionLength = this.additionalOption.length;
  	});

    this.additionalOptions = fb.group({
      'name': [null, Validators.required],
      'cost': [null, Validators.required],
      'repeat': [' ']
    });
  }

  ngOnInit() {
    this.lid = localStorage.getItem("sessionItem");
  }


  deleteAdditionalOptions(option){
    // console.log(option);
    this.AddAdditionalOptionsService.checkDependency(option.additionalOptionsID).subscribe((data: Array<object>) => {
      if(data.length > 0) {
        alert("This additional option has dependency. Please clear the dependency before deleting this option.")
      } else {
          option.additionalOptionStatus = 'deleted';

          var deleteLog = {
            loginID: this.lid,
            deletedItemID: option.additionalOptionsID,
            deletedItemType: 'Additional Options',
            commitComment: 'Additional Option with id: ' + option.additionalOptionsID + ' was deleted by admin with login ID:'+ this.lid+ ' on, '+ new Date(),
          }

          this.AddAdditionalOptionsService.addDeleteLog(deleteLog).subscribe(() => {});
          this.AddAdditionalOptionsService.editAdditionalOptions(option).subscribe(() => {});
          alert("Additional Option's status was changed to Deleted. Refer to delete log");
          location.reload();
        }
    })
  }

  addAdditionalOptions(fg: FormGroup){
    const name = fg.value.name;
    const cost = fg.value.cost;
    this.repeat = fg.value.repeat;
    if(this.repeat == true){
      this.repeat = 1;
    }else{
      this.repeat = 0;
    }
    var additionalOptions = {
      name: name,
      cost: cost,
      repeat: this.repeat,
      createdBy: 'admin',
      status: 'active',
    }
    // console.log(additionalOptions)
    this.AddAdditionalOptionsService.addAdditionalOption(additionalOptions).subscribe(() => { });
    alert('New Addtional Option Added Successfully');
    // this.router.navigate(['viewAdditionalOptions']);
    location.reload();
  }
}

