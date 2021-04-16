import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { CarImageAdd } from '../models/carImageAdd';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl: 'https://localhost:44326/api/';

  constructor(private httpClient: HttpClient) {}

  getImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    //let newPath = this.apiUrl + 'carImages/getimagesbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(
      'https://localhost:44326/api/carImages/getimagesbycarid?carId=' + carId
    );
  }

  getAllImages(): Observable<ListResponseModel<CarImage>> {
    //let newPath = this.apiUrl + 'carImages/getallimages';
    return this.httpClient.get<ListResponseModel<CarImage>>(
      'https://localhost:44326/api/carImages/getallimages'
    );
  }

  addImage(carImage: any): Observable<ResponseModel> {
    let newPath = this.apiUrl + '/carimages/add';
    return this.httpClient.post<ResponseModel>(
      'https://localhost:44326/api/CarImages/add',
      carImage
    );
  }
}
