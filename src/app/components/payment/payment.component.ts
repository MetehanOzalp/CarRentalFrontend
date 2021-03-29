import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cardNumber: string;
  firstName: string;
  lastName: string;
  expirationDate: string;
  cVV: number;
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

  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCreditCardsByCustomerId(this.rental.customerId);
      }
    });
  }

  addRental() {
    let newPayment: Payment = {
      cardNumber: this.card.cardNumber,
      firstName: this.card.firstName,
      lastName: this.card.lastName,
      expirationDate: this.card.expirationDate,
      cVV: this.card.cvv,
    };
    this.paymentService.addPayment(newPayment).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      this.rentalService.addRental(this.rental);
      if (this.saveCard) {
        this.addCreditCard();
      }
    });

    this.router.navigate(['cars/']);
  }

  addCreditCard() {
    let newCreditCard: CreditCard = {
      customerId: this.card.customerId,
      cardNumber: this.card.cardNumber,
      firstName: this.card.firstName,
      lastName: this.card.lastName,
      expirationDate: this.card.expirationDate,
      cvv: this.card.cvv,
    };

    if (!this.cardAvailable) {
      this.creditCardService
        .addCreditCard(newCreditCard)
        .subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
        });
    } else {
      this.toastrService.warning('Bu kart numarası zaten kayıtlı', 'Dikkat');
    }
  }

  cardAvailable(): boolean {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.card.cardNumber == this.cards[i].cardNumber) {
        return true;
      }
    }
    return false;
  }

  getCreditCardsByCustomerId(customerId: number) {
    this.creditCardService
      .getCreditCardsByCustomerId(customerId)
      .subscribe((response) => {
        this.cards = response.data;
        this.card = response.data[0];
      });
  }

  cardSelectChangeHandler(event: any) {
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id == event.target.value) {
        this.card = this.cards[i];
      }
    }
  }
}
