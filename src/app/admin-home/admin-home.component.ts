import { Component, OnInit } from '@angular/core';
import { AdminHomeService } from './admin-home.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [ AdminHomeService ]
})
export class AdminHomeComponent implements OnInit {
allOrders;
allOrdersLegth;

orderPlaced = [];
processing = [];
dispatched = [];
delivered = [];
readyForCollection = [];
paymentPending = [];
paymentReceived = [];
deferred = [];

  constructor(private adminHomeService: AdminHomeService) {
  	this.adminHomeService.getAllOrders().subscribe((order) => {
  		console.log(order)
  		this.allOrders = order;
  		this.allOrdersLegth = this.allOrders.length;
      for(var i=0; i<this.allOrdersLegth; i++){
        switch (this.allOrders[i].orderStatus) {
          case "Order Placed": this.orderPlaced.push(this.allOrders[i]); break;
          case "Processing": this.processing.push(this.allOrders[i]); break;
          case "Dispatched": this.dispatched.push(this.allOrders[i]); break;
          case "Delivered": this.delivered.push(this.allOrders[i]); break;
          case "Ready for Collection": this.readyForCollection.push(this.allOrders[i]); break;
          case "Payment Pending": this.paymentPending.push(this.allOrders[i]); break;
          case "Payment Received": this.paymentReceived.push(this.allOrders[i]); break;
          case "Deferred": this.deferred.push(this.allOrders[i]); break;
        }
      }
  	});

  }

  ngOnInit() {
  }

}
