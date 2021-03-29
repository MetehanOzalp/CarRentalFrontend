import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  cars: Car[];
  car: Car;
  getCarId: number;
  images: CarImage[];
  rentable: boolean;
  baseUrl: string = 'https://localhost:44326/';
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetails(params['id']);
        this.getImagesByCarId(params['id']);
        //this.CheckStatus(params['id']);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.car = response.data[0];
      this.rentable = response.data[0].status;
      this.getCarId = response.data[0].id;
    });
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.images = response.data;
    });
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  CheckStatus(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.rentable = response.data[response.data.length - 1].status;
    });
  }
}
