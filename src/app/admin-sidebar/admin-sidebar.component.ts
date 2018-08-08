import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	$('#sidebarCollapse').on('click', function () {
  	    $('#sidebar').toggleClass('active');
  	});

  	$('#sidebar').css('min-height',$(document).height()); 
  }

     
}
