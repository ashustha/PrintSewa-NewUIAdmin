
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SuperCategoryComponent } from './super-category/super-category.component';
import { AddAdditionalOptionsComponent } from './add-additional-options/add-additional-options.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { OffersComponent } from './offers/offers.component';
import { EditOffersComponent } from './edit-offers/edit-offers.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { PricingManagementComponent } from './pricing-management/pricing-management.component';
import { OrdersComponent } from './orders/orders.component';
import { EditSuperCategoryComponent } from './edit-super-category/edit-super-category.component';
import { EditAdditionalOptionsComponent } from './edit-additional-options/edit-additional-options.component';


export const router: Routes = [

    { path: '', component: AdminHomeComponent },
    { path: 'superCategory', component: SuperCategoryComponent },
    { path: 'addAdditionalOptions', component: AddAdditionalOptionsComponent },
    { path: 'product', component: ProductComponent },
    { path: 'editProduct/:typeID', component: EditProductComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'editCategory/:categoryID', component: EditCategoryComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'changePassword/:loginID', component: ChangePasswordComponent },
    { path: 'editAdmin/:loginID', component: EditAdminComponent },
    { path: 'editAdmin/:loginID', component: EditAdminComponent },
    { path: 'createAdmin', component: CreateAdminComponent },
    { path: 'offers', component: OffersComponent },
    { path: 'editOffers/:offerProductID', component: EditOffersComponent },
    { path: 'contentManagement', component: ContentManagementComponent },
    { path: 'pricingManagement', component: PricingManagementComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'editSuperCategory/:superCategoryID', component: EditSuperCategoryComponent },
    { path: 'editAdditionalOptions/:additionalOptionsID', component: EditAdditionalOptionsComponent },

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

