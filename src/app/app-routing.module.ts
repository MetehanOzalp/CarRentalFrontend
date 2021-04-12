import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomepageComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/cardetail/:id', component: CarDetailComponent },
  { path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },
  { path: 'rental/:carId', component: RentalComponent },
  {
    path: 'cars/rental/payment/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/add',
    component: CarAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'cars/update/:carId',
    component: CarUpdateComponent,
    canActivate: [LoginGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
