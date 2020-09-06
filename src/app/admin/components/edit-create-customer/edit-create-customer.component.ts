// Imports
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-create-customer',
  templateUrl: './edit-create-customer.component.html',
  styleUrls: ['./edit-create-customer.component.css']
})
export class EditCreateCustomerComponent implements OnInit {
  // Declare Variables
  subscriptions: Subscription[] = [];
  task: string = 'create';
  customerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]]
  });
  customerId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminServ: AdminService
  ) { }

  ngOnInit() {
    // Switch between create, edit forms
    switch (this.router.url.split('/')[3]) {
      case 'create':
        // To create new customer
        this.task = 'create';
        break;
      case 'edit':
        // To edit existing customer
        this.subscriptions.push(this.adminServ.getCustomer(this.router.url.split('/')[4]).subscribe(
          res => {
            this.task = 'edit';
            this.customerId = res['_id'];
            // Add customer's values to customer form
            this.customerForm.patchValue({
              name: res['name'],
              email: res['email'],
              password: res['password'],
              phone: res['phone'],
              address: res['address']
            });
          }, err => {
            console.log(err);
          }
        ));
        break;
    }
  }
  // Submit filled form details
  submitForm(): void {
    switch (this.task) {
      case 'create':
        // Create new customer
        this.subscriptions.push(this.adminServ.createCustomer(this.customerForm.value).subscribe(
          res => {
            this.router.navigate(['admin/customers']);
          }
        ));
        break;
      case 'edit':
        // Edit existing customer
        this.subscriptions.push(this.adminServ.updateCustomer({_id: this.customerId, ...this.customerForm.value}).subscribe(
          res => {
            this.router.navigate(['admin/customers']);
          }
        ));
        break;
    }
  }

  ngOnDestroy() {
    // Unsubscribe to all the subscriptions
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
