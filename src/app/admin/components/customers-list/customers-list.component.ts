// Imports
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services';
import { ICustomer } from '../../models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  // Declare Variables
  subscriptions: Subscription[] = [];
  searchValue = '';
  customers: ICustomer[];
  customersToDisplay: ICustomer[] = [];
  sortName: string | null = null;
  sortValue: string | null = null;

  constructor(
    private adminServ: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  // Reset search
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  // Sort
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    if (this.sortName && this.sortValue) {
      if (this.sortValue === 'ascend') {
        this.customersToDisplay = [...this.customers.sort((a, b) => {
          if ( a[this.sortName] < b[this.sortName] ){
            return -1;
          }
          if ( a[this.sortName] > b[this.sortName] ){
            return 1;
          }
        })] 
      } else {
        this.customersToDisplay = [...this.customers.sort((a, b) => {
          if ( a[this.sortName] < b[this.sortName] ){
            return 1;
          }
          if ( a[this.sortName] > b[this.sortName] ){
            return -1;
          }
        })] 
      }
    } else {
      this.customersToDisplay = [...this.customers];
    }
  }

  // Search name
  search(): void {
    this.customersToDisplay = [...this.customers.filter(data => data.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1)]
  }

  // Get customers
  getCustomers() {
    this.subscriptions.push(this.adminServ.getAllCustomers().subscribe(
      res => {
        this.customers = res;
        this.customersToDisplay = [...this.customers];
      }, err => {
        console.log(err);
      }
    ));
  }

  // Delete customer
  deleteCustomer(customerId: string) {
    this.subscriptions.push(this.adminServ.deleteCustomer(customerId).subscribe(
      res => {
        this.getCustomers();
      }, err => {
        console.log(err);
      }
    ));
  }
  
  // Navigate to create customer page
  createCustomer() {
    this.router.navigate(['admin/customer/create'])
  }

  // Navigate to edit customer page
  editCustomer(customerId: string) {
    this.router.navigate(['admin/customer/edit', customerId]);
  }

  ngOnDestroy() {
    // Unsubscribe to all the subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
