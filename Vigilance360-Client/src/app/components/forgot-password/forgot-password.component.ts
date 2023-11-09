import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private auth:AuthService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  forgotPasswordForm=new FormGroup({
    email:new FormControl('',Validators.required),
  })

  forgotPassword(){
    this.auth.forgotPassword(this.forgotPasswordForm.get('email')?.value as string).then(
      () => {
        this.toastr.info('Check Your Inbox', 'User');
      },
      (err) => {
        this.toastr.error('Something went wrong', 'User');
      }
    );
  }
  
}
