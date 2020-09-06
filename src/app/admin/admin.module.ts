import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { EditCreateCustomerComponent } from './components/edit-create-customer/edit-create-customer.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminContainerComponent, 
    CustomersListComponent, 
    EditCreateCustomerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
