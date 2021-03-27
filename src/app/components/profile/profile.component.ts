import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userUpdateForm: FormGroup;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.userId],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Kullanıcı bilgileri eksik', 'Hata');
    }
  }

  getUser() {
    this.userService
      .getUserByMail(this.localStorageService.get('email'))
      .subscribe((response) => {
        this.user = response.data;
        this.userId = response.data.id;
      });
  }
}
