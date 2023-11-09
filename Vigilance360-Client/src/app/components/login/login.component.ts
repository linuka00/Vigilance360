import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { user } from '@angular/fire/auth';
import { ServerService } from 'src/app/service/server.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private jwtHelper: JwtHelperService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {}

  ngOnInit(): void {}

  loginFrom = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl!);
    this.auth
      .login(
        this.loginFrom.get('email')?.value as string,
        this.loginFrom.get('password')?.value as string
      )
      .then(
        (res) => {
          res.user
            ?.getIdToken()
            .then((token) => {
              this.toastr.success('Login Successful!', 'User');
              // const payload = {
              //   user_id: '8v39DtrxeWT5ukwyBgnuPpnB6f22',
              //   email: res.user?.email,
              //   email_verified: res.user?.emailVerified,
              // };
              // const secretKey = 'your-secret-key';

              // const token1 = jwt.sign(payload, secretKey, { expiresIn: '1h' });
              let deToken = this.jwtHelper.decodeToken(token);
              console.log(deToken);
              this.auth
                .updateUsesr(deToken.user_id, deToken.email_verified)
                .then(() => {
                  if (!deToken.email_verified) {
                    this.auth
                      .getUser(deToken.user_id)
                      .then((user) => {
                        console.log(user);
                        user.forEach((userData: any) => {
                          console.log(userData);
                          if (userData.data().orgId != '') {
                            this.serverService
                              .getToken({
                                email: deToken.email,
                                id: userData.data().orgId,
                                email_verified: false,
                              })
                              .subscribe((token: any) => {
                                console.log(token.access_token);
                                localStorage.setItem(
                                  'token',
                                  token.access_token
                                );
                                if (returnUrl)
                                  this.router.navigate([returnUrl]);
                                else {
                                  let scanStatus =
                                    localStorage.getItem('isScan');
                                  if (scanStatus)
                                    this.router.navigate(['/test']);
                                  else this.router.navigate(['/add']);
                                }
                              });
                          } else {
                            this.router.navigate(['/addOrg'], {
                              queryParams: {
                                user_id: deToken.user_id,
                                email: deToken.email,
                              },
                            });
                          }
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    localStorage.setItem('token', token);
                    if (returnUrl) this.router.navigate([returnUrl]);
                    else {
                      let scanStatus = localStorage.getItem('isScan');
                      if (scanStatus) this.router.navigate(['/test']);
                      else this.router.navigate(['/add']);
                    }
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              this.toastr.error('Something went wrong', 'User');
              this.router.navigate(['/login']);
            });
        },
        (err) => {
          this.toastr.error('Something went wrong', 'User');
          this.router.navigate(['/login']);
        }
      );
  }
}
