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

  reset(): void {
    this.searchValue = '';
    this.search();
  }
  
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    if (this.sortName && this.sortValue) {
      this.customersToDisplay = this.customers.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.customersToDisplay = this.customers;
    }
  }

  search(): void {
    this.customersToDisplay = [...this.customers.filter(data => data.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) != -1)]
  }

  getCustomers() {
    this.subscriptions.push(this.adminServ.getAllCustomers().subscribe(
      res => {
        console.log(res);
        this.customers = res;
        this.customersToDisplay = [...this.customers];
      }, err => {
        console.log(err);
      }
    ));
  }

  deleteCustomer(customerId: string) {
    this.subscriptions.push(this.adminServ.deleteCustomer(customerId).subscribe(
      res => {
        console.log(res);
        this.getCustomers();
      }, err => {
        console.log(err);
      }
    ));
  }
  
  createCustomer() {
    this.router.navigate(['admin/customer/create'])
  }

  editCustomer(customerId: string) {
    this.router.navigate(['admin/customer/edit', customerId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
