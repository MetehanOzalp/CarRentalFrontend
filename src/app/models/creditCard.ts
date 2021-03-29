export interface CreditCard {
  id?: number;
  customerId: number;
  cardNumber: string;
  firstName: string;
  lastName: string;
  expirationDate: string;
  cvv: number;
}
