export interface PaymentProperties {
  id?: number;
  customerId: number;
  carId: number;
  cardNumber: string;
  firstName: string;
  lastName: string;
  expirationDate: string;
  cvv: number;
  amount: number;
}
