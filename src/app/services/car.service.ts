import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ResponseModel } from '../models/responseModel';
import { CarProperties } from '../models/carProperties';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) {}

  add(car: CarProperties): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car: CarProperties): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/update';
    console.log(car);
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'cars/update', car);
  }

  getCarDetailsByFilter(brandId: number, colorId: number) {
    let newPath =
      this.apiUrl +
      'cars/getcarsdetailsbyfilter?brandId=' +
      brandId +
      '&colorId=' +
      colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsdetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByCarId(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcardetailbyid?id=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl + 'cars/getcarsdetailbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath =
      this.apiUrl + 'cars/getcarsdetailbycolorid?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
