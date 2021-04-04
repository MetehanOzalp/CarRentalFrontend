import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  @Input() car: Car;
  minDate: string | null;
  maxDate: string | null;
  customers: Customer[];
  customer: Customer;
  userId: number;
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
  rentDate: Date = new Date();
  returnDate: Date = new Date();
  customerId: number;
  firstDateSelected: boolean = false;
  email: string;

  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.email = this.localStorageService.get('email');
    this.getUser();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
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

  getUser() {
    if (this.email) {
      this.userService.getUserByMail(this.email).subscribe((response) => {
        this.userId = response.data.id;
        this.getCustomer(this.userId);
      });
    }
  }

  getCustomer(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe((response) => {
      this.customer = response.data[0];
    });
  }

  addRental() {
    if (this.customer) {
      let RentalModel = {
        customerId: this.customer.id,
        carId: this.car.id,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
        brandName: '',
        carName: '',
        userName: '',
        customerName: '',
      };
      this.rentalService.isRentable(RentalModel).subscribe(
        (response) => {
          this.router.navigate([
            'cars/rental/payment/',
            JSON.stringify(RentalModel),
          ]);
          this.toastr.success('Ödeme sayfasına yönlendiriliyorsunuz.');
        },
        (responseError) => {
          this.toastr.error(responseError.error.message, 'Hata');
        }
      );
    } else {
      this.router.navigate(['login']);
      this.toastrService.warning(
        'Araç kiralamadan önce sisteme giriş yapmalısınız!',
        'Dikkat'
      );
    }
  }

  // CheckStatus(carId: number) {
  //   this.carService.getCarByCarId(carId).subscribe((response) => {
  //     this.rentable = response.data[response.data.length - 1].status;
  //   });
  // }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  calculateTotalPrice() {
    var startDate = new Date(this.rentDate);
    var finishDay = new Date(this.returnDate);
    var calculatedTotalPrice =
      ((finishDay.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24) *
      this.car.dailyPrice;
    return calculatedTotalPrice;
  }
}
