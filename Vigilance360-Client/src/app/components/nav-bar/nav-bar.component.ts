import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogin=true
  showList=true
  currentUser;
  constructor(private authService:AuthService,private router: Router,private toastr:ToastrService) {
    this.currentUser=authService.currentUser
    this.isLogin=authService.isLoggedIn();
  }

  ngOnInit(): void {
    
  }

  toggleList() {
    this.showList = !this.showList;
  }

  logoutUser() {
    this.authService.logout().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
        this.toastr.success('Logout Successful!', 'User');
      },
      (err) => {
        this.toastr.error('Something went wrong', 'User');
      }
    );;
  }
}
