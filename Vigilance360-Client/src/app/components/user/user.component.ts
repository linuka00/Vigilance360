import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  users: User[] = [];

  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
  });

  getAllUser() {
    this.userService.getAllUser().subscribe((res) => {
      this.users = res.map((e: any) => {
        const user = e.payload.doc.data();
        user.id = e.payload.doc.id;
        return user;
      });
    });
  }

  deleteUser(user: User) {
    this.userService
      .deleteUser(user)
      .then(() => {
        alert('Deleted!');
      })
      .catch((err) => {
        console.log(err.meessage);
      });
  }

  addUser() {
    const user: User = {
      id: '',
      name: this.userForm.get('name')?.value ?? '',
      email: this.userForm.get('email')?.value ?? '',
      mobile: this.userForm.get('mobile')?.value ?? '',
    };
    this.userService
      .addUser(user)
      .then(() => {
        alert('Added!');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  logoutUser() {
    this.authService.logout();
  }
}
