import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient: HttpClient) {}

  addPayment(payment: Payment) {
    let newPath = this.apiUrl + 'payments/add';
    this.httpClient.post(newPath, payment).subscribe();
  }
}
