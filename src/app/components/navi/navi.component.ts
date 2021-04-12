import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthenticated: boolean;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  userClaims: OperationClaim[] = [];
  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthenticated();
    if (this.isAuthenticated) {
      this.getUser();
    }
  }

  isAdmin() {
    for (let i = 0; i < this.userClaims.length; i++) {
      if (this.userClaims[i].name == 'admin') {
        return true;
      }
    }
    return false;
  }

  checkAuthenticated() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  getUser() {
    this.userService
      .getUserByMail(this.localStorageService.get('email'))
      .subscribe((response) => {
        this.user = response.data;
        this.getUserClaims(this.user);
      });
  }

  getUserClaims(user: User) {
    this.userService.getUserClaims(user).subscribe((response) => {
      this.userClaims = response.data;
    });
  }

  signOut() {
    this.localStorageService.clean();
    timer(25).subscribe((p) => {
      window.location.href = '/';
    });
  }
}
