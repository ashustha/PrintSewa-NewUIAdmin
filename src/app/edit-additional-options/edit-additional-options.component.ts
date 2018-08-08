import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { EditAdditionalOptionsService } from './edit-additional-options.service';
@Component({
  selector: 'app-edit-additional-options',
  templateUrl: './edit-additional-options.component.html',
  styleUrls: ['./edit-additional-options.component.css'],
  providers: [EditAdditionalOptionsService],
})
export class EditAdditionalOptionsComponent implements OnInit {
  name1;
  cost1;
  checked;
  createdBy;
  status;

  constructor(private router: Router, private actRoute: ActivatedRoute, private optionsService: EditAdditionalOptionsService) { }

  ngOnInit() {
  	this.actRoute.params.subscribe((params: Params)=> {
  		var additionalOptionsID = params['additionalOptionsID'];

  		this.optionsService.getAdditionalOptionsByID(additionalOptionsID).subscribe((data) => {
  			this.name1 = data[0].name;
  			this.cost1 = data[0].cost;
  			this.createdBy = data[0].createdBy;
  			this.status = data[0].additionalOptionStatus;

  			if(data[0].repeat == '1') {
  				this.checked = true;
  			} else {
  				this.checked = false;
  			}
  		})
  	})
  }

  editAdditionalOptions(name, cost, repeat, createdBy, status) {
    if(name == '' || cost == ''){
      alert("Empty field cannot be updated");
    }else{
        this.actRoute.params.subscribe((params: Params) => {
          var additionalOptionsID = params['additionalOptionsID'];
          
          var updateLog = {
            loginID: '1',
            updatedItemId: additionalOptionsID,
            updatedItemType: 'Additional Options',
            commitComment: 'This item was updated by admin with login ID: 1. Edited Additional Option: ' + additionalOptionsID + '. Edited Date: ' + new Date(),
          };
          
          var updatedOptions = {
            additionalOptionsID: additionalOptionsID,
            name: name,
            cost: cost,
            repeat: repeat,
            createdBy: createdBy,
            additionalOptionStatus: status
          };
          // console.log(updatedOptions)
          this.optionsService.editAdditionalOptions(updatedOptions).subscribe(() => {});
          this.optionsService.addUpdateLog(updateLog).subscribe(() => {});
          alert("Additional Options successfully Updated");
          this.router.navigate(['/addAdditionalOptions']);
          location.reload();
        });
      
    }
  }

}
