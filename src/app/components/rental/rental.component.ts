import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  car: Car;
  minDate: string | null;
  maxDate: string | null;
  customers: Customer[];
  rentals: Rental[] = [];
  dataLoaded = false;
  rental: Rental = {
    id: 0,
    carId: 0,
    customerName: '',
    brandName: '',
    carName: '',
    customerId: 0,
    userName: '',
    rentDate: new Date(),
    returnDate: new Date(),
  };
  rentDate: Date;
  returnDate: Date;
  customerId: number;
  rentable: boolean = false;
  firstDateSelected: boolean = false;

  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCustomers();
        this.CheckStatus(params['carId']);
        this.getRentalsByCarId(params['carId']);
      }
    });
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  getRentalsByCarId(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {
      if (response.data[response.data.length - 1]) {
        this.rental = response.data[response.data.length - 1];
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  addRental() {
    let RentalModel = {
      customerId: this.customerId,
      carId: this.car.id,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };
    this.router.navigate(['cars/rental/payment/', JSON.stringify(RentalModel)]);
    this.toastr.success(
      'Ödeme sayfasına yönlendiriliyorsunuz.',
      'Kiralama başarılı'
    );
  }

  CheckStatus(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.rentable = response.data[response.data.length - 1].status;
    });
  }

  setCustomerId(customerId: any) {
    this.customerId = +customerId;
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
}