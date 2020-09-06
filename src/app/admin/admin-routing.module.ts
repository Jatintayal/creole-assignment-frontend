import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { EditCreateCustomerComponent } from './components/edit-create-customer/edit-create-customer.component';

const routes: Routes = [
    {path: '', redirectTo: 'customers', pathMatch: 'full'},
    {
        path: '',
        component: AdminContainerComponent,
        children: [
            { path: 'customers', component: CustomersListComponent },
            { path: 'customer/create', component: EditCreateCustomerComponent },
            { path: 'customer/edit/:id', component: EditCreateCustomerComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }