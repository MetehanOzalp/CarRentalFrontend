import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(
      'https://localhost:44326/api/rentals/getrentals'
    );
  }

  addRental(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getRentalsByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getrentaldetails?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  isRentable(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/isrentable';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  checkFindeksScore(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/checkfindeksscore';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
