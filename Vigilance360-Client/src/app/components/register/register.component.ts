import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  registerFrom = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  register() {
    this.auth
      .register(
        this.registerFrom.get('email')?.value as string,
        this.registerFrom.get('password')?.value as string
      )
      .then(
        (res) => {
          console.log(res);
          this.auth
            .saveUser({
              email: res.user?.email,
              id: res.user?.uid,
              orgId: '',
              email_verified: res.user?.emailVerified,
            })
            .then(() => {})
            .catch(() => {});
          this.toastr.success('Registration Successful!', 'User');
          this.router.navigate(['/login']);
          this.auth.sendEmailForVarification(res.user!).then(
            (res: any) => {
              this.toastr.success('Send Varification Email', 'User');
              this.toastr.info('Varify Email Analyst', 'User');
            },
            (err: any) => {
              this.toastr.error(
                'Something went wrong, Not able to send mail to your email',
                'User'
              );
            }
          );
        },
        (err) => {
          this.toastr.error(err.message, 'User');
          this.router.navigate(['/register']);
        }
      );
  }
}
