import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/cardetail/:id', component: CarDetailComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'rental/:carId', component: RentalComponent },
  { path: 'cars/rental/payment/:rental', component: PaymentComponent },
  { path: 'cars/add', component: CarAddComponent },
  { path: 'colors/add', component: ColorAddComponent },
  { path: 'brands/add', component: BrandAddComponent },
  { path: 'cars/update/:carId', component: CarUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
