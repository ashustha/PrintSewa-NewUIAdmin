import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [ OrdersService ],
})
export class OrdersComponent implements OnInit {
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

  constructor(private router: Router, private orderManagementService: OrdersService) {
  	this.orderManagementService.getAllOrders().subscribe((order) => {
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

  changeStatus(orderStatus, orderID){
    this.orderManagementService.getOrderByOrderID(orderID).subscribe((order) => {
      this.orderManagementService.getUserByID(order[0].userID).subscribe((userData) => {
          var r = confirm("Order " + orderStatus);
          if(r == true){
            var email = {
              name: userData[0].name,
              email: userData[0].email,
              orderID: orderID,
              typeID: order[0].typeID,
              typeName: order[0].typeName,
              status: orderStatus
            }
            this.orderManagementService.updateOrderEmail(email).subscribe(() => {});
            var changedStatus = {
              orderStatus: orderStatus,
              orderID: orderID,
            }
            this.orderManagementService.changeStatus(changedStatus).subscribe(() => {});
            location.reload();
          }else{
            location.reload();
          }
      });
    });
  }

}
