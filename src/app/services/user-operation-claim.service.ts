import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { UserOperationClaim } from '../models/userOperationClaim';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) {}

  addClaim(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'UserOperationClaims/add';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }
}
