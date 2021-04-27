import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'operationclaims/getall';
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }
}
