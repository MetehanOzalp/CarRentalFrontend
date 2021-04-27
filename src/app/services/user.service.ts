import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  update(userModel: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'users/update';
    return this.httpClient.post<ResponseModel>(newPath, userModel);
  }

  getUserByMail(email: string): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserClaims(user: User): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'users/getuserclaims?userId=' + user.id;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }
}
