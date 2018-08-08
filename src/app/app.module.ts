import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SuperCategoryComponent } from './super-category/super-category.component';
import { AddAdditionalOptionsComponent } from './add-additional-options/add-additional-options.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { EditSuperCategoryComponent } from './edit-super-category/edit-super-category.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { OffersComponent } from './offers/offers.component';
import { EditOffersComponent } from './edit-offers/edit-offers.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
import { OrdersComponent } from './orders/orders.component';
import { EditAdditionalOptionsComponent } from './edit-additional-options/edit-additional-options.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminSidebarComponent,
    AdminHomeComponent,
    SuperCategoryComponent,
    AddAdditionalOptionsComponent,
    ProductComponent,
    EditProductComponent,
    CategoryComponent,
    EditCategoryComponent,
    EditSuperCategoryComponent,
    AdminComponent,
    ChangePasswordComponent,
    EditAdminComponent,
    CreateAdminComponent,
    OffersComponent,
    EditOffersComponent,
    ContentManagementComponent,
    PricingManagementComponent,
    OrdersComponent,
    EditAdditionalOptionsComponent
  ],
  imports: [
    routes,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
