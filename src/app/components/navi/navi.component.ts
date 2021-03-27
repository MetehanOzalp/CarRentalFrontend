import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  checkAuthenticated() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  getUser() {
    this.userService
      .getUserByMail(this.localStorageService.get('email'))
      .subscribe((response) => {
        this.user = response.data;
      });
  }

  signOut() {
    this.localStorageService.clean();
    this.router.navigate(['']);
    window.location.reload();
  }
}
