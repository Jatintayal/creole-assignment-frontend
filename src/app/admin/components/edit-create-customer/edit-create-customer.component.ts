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

  subscriptions: Subscription[] = [];
  task: string = 'create';
  customerForm: FormGroup;
  customerId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminServ: AdminService
  ) { }

  ngOnInit() {
    switch (this.router.url.split('/')[3]) {
      case 'create':
        this.task = 'create';
        this.createForm({
          name: '',
          email: '',
          password: '',
          phone: '',
          address: ''
        });
        break;
      case 'edit':
        this.subscriptions.push(this.adminServ.getCustomer(this.router.url.split('/')[4]).subscribe(
          res => {
            this.task = 'edit';
            this.customerId = res['_id'];
            this.createForm(res);
          }, err => {
            console.log(err);
          }
        ));
        break;
    }
    console.log()
    
  }

  createForm(customerData) {
    this.customerForm = this.fb.group({
      name: [customerData.name, [Validators.required]],
      email: [customerData.email, [Validators.email, Validators.required]],
      password: [customerData.password, [Validators.required]],
      phone: [customerData.phone, [Validators.required]],
      address: [customerData.address, [Validators.required]]
    });
  }

  submitForm(): void {
    switch (this.task) {
      case 'create':
        this.subscriptions.push(this.adminServ.createCustomer(this.customerForm.value).subscribe(
          res => {
            this.router.navigate(['admin/customers']);
          }
        ));
        break;
      case 'edit':
        this.subscriptions.push(this.adminServ.updateCustomer({_id: this.customerId, ...this.customerForm.value}).subscribe(
          res => {
            this.router.navigate(['admin/customers']);
          }
        ));
        break;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
