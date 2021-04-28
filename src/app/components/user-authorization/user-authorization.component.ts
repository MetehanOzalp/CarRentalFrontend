import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.css'],
})
export class UserAuthorizationComponent implements OnInit {
  users: User[] = [];
  claims: OperationClaim[] = [];
  selectedClaimId: number;
  userId: number;
  claimAddForm: FormGroup;

  constructor(
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createClaimAddForm();
    this.getUsers();
    this.getClaims();
  }

  createClaimAddForm() {
    this.claimAddForm = this.formBuilder.group({
      userId: [],
      operationClaimId: ['', Validators.required],
    });
  }

  getUsers() {
    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
    });
  }

  getClaims() {
    this.operationClaimService.getAll().subscribe((response) => {
      this.claims = response.data;
    });
  }

  addAuthorization() {
    if (this.claimAddForm.valid) {
      let userOperationClaimModel = Object.assign({}, this.claimAddForm.value);
      userOperationClaimModel.userId = Number(this.userId);
      userOperationClaimModel.operationClaimId = Number(
        userOperationClaimModel.operationClaimId
      );
      this.userOperationClaimService
        .addClaim(userOperationClaimModel)
        .subscribe(
          (response) => {
            this.toastrService.success('Yetki verildi');
          },
          (responseError) => {
            this.toastrService.error(responseError.error.message);
          }
        );
    } else {
      this.toastrService.error('Lütfen yetki seçiniz');
    }
  }

  selectedUser(userId: number) {
    this.userId = userId;
  }
}
