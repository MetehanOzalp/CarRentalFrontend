export interface Rental {
  id: number;
  carId: number;
  customerId: number;
  brandName: string;
  carName: string;
  userName: string;
  customerName: string;
  rentDate: Date;
  returnDate: Date;
}
