import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  claims: OperationClaim[] = [];
  selectedClaimId: number;
  userId: number;

  constructor(
    private userService: UserService,
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getClaims();
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
    let userOperationClaimModel: UserOperationClaim = {
      userId: this.userId,
      operationClaimId: Number(this.selectedClaimId),
    };
    this.userOperationClaimService
      .addClaim(userOperationClaimModel)
      .subscribe((response) => {
        this.toastrService.success('Yetki verildi');
      });
  }

  selectedUser(userId: number) {
    this.userId = userId;
  }
}
