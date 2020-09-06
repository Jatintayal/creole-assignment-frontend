// Imports
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICustomer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Declare Variables
  private url =  environment.apiUrl;
  private customersUrl = `${this.url}/customer`;

  constructor(
    private http: HttpClient
  ) { }

  // Request Handlers

  // Create customer handler
  createCustomer(customerData: ICustomer) {
    return this.http.post(
      this.customersUrl, 
      customerData
    )
    .pipe(
      catchError((error: HttpErrorResponse) => throwError(error.message || 'Server Error'))
    );
  }

  // Get all customers handler
  getAllCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(
      this.customersUrl
    )
    .pipe(
      catchError((error: HttpErrorResponse) => throwError(error.message || 'Server Error'))
    );
  }

  // Get a specific customer
  getCustomer(customerId: string) {
    return this.http.get(
      `${this.customersUrl}/${customerId}`
    )
    .pipe(
      catchError((error: HttpErrorResponse) => throwError(error.message || 'Server Error'))
    );
  }

  // Update details of a specific customer
  updateCustomer(customerData: ICustomer) {
    return this.http.put(
      this.customersUrl, 
      customerData
    )
    .pipe(
      catchError((error: HttpErrorResponse) => throwError(error.message || 'Server Error'))
    );
  }

  // Delete a specific customer
  deleteCustomer(customerId: string) {
    return this.http.delete(
      `${this.customersUrl}/${customerId}`
    )
    .pipe(
      catchError((error: HttpErrorResponse) => throwError(error.message || 'Server Error'))
    );
  }
}
