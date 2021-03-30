import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44326/api/customers/getall';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }

  getCustomerByUserId(userId: number): Observable<ListResponseModel<Customer>> {
    let newPath =
      'https://localhost:44326/api/customers/getcustomerdetailbyuserid?userId=' +
      userId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
