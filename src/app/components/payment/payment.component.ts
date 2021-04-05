import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  card: CreditCard = {
    customerId: 0,
    cardNumber: '',
    firstName: '',
    lastName: '',
    expirationDate: '',
    cvv: 0,
  };
  cards: CreditCard[];
  saveCard: boolean;
  car: Car;
  calculatedTotalPrice: number;
  paymentAddForm: FormGroup;

  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.createPaymentAddForm();
        this.getCreditCardsByCustomerId(this.rental.customerId);
        this.carService
          .getCarByCarId(this.rental.carId)
          .subscribe((response) => {
            this.car = response.data[0];
            this.calculateTotalPrice();
          });
      }
    });
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  addRental() {
    if (this.paymentAddForm.valid) {
      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.addPayment(paymentModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.rentalService.addRental(this.rental).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
          },
          (responseError) => {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        );
        if (this.saveCard) {
          this.addCreditCard();
        }
        this.router.navigate(['cars/']);
      });
    } else {
      this.toastrService.error('Lütfen bütün alanları doldurunuz');
    }
  }

  addCreditCard() {
    let newCreditCard: CreditCard = {
      customerId: this.cards[0].customerId,
      cardNumber: this.card.cardNumber,
      firstName: this.card.firstName,
      lastName: this.card.lastName,
      expirationDate: this.card.expirationDate,
      cvv: this.card.cvv,
    };

    this.creditCardService.addCreditCard(newCreditCard).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
      },
      (responseError) => {
        this.toastrService.warning(responseError.error.message, 'Dikkat');
      }
    );
  }

  getCreditCardsByCustomerId(customerId: number) {
    this.creditCardService
      .getCreditCardsByCustomerId(customerId)
      .subscribe((response) => {
        this.cards = response.data;
      });
  }

  cardSelectChangeHandler(event: any) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id == event.target.value) {
        this.card = this.cards[i];
      }
    }
  }

  calculateTotalPrice() {
    var startDate = new Date(this.rental.rentDate);
    var finishDate = new Date(this.rental.returnDate);
    this.calculatedTotalPrice =
      ((finishDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24) *
      this.car.dailyPrice;
  }
}
