import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Request } from 'src/app/model/request';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ServerService } from 'src/app/service/server.service';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css'],
})
export class AddOrgComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private serverService: ServerService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const user_id = queryParams.get('user_id');
      notificationService.getSendRequest(user_id!).subscribe((res: any) => {
        console.log(res[0]);
        if (res[0]?.isAccept) {
          this.join(res[0].receivedId);
        } else if (res[0]?.isAccept == false) {
          router.navigate(['/wait']);
        }
      });
    });
  }
  orgs: any[] = [];
  showModal = false;
  ngOnInit(): void {
    this.authService.getAllOrgs().then((res) => {
      res.forEach((org) => {
        this.orgs.push(org.data());
      });
    });
  }

  showAndHide() {
    this.showModal = !this.showModal;
  }

  join(orgId: string) {
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const user_id = queryParams.get('user_id');
      const email = queryParams.get('email');
      this.auth.joinOrg(user_id, orgId).then(() => {
        this.serverService
          .getToken({
            email: email,
            id: orgId,
            email_verified: false,
          })
          .subscribe((token: any) => {
            console.log(token.access_token);
            localStorage.setItem('token', token.access_token);
            if (returnUrl) this.router.navigate([returnUrl]);
            else {
              let scanStatus = localStorage.getItem('isScan');
              if (scanStatus) this.router.navigate(['/test']);
              else this.router.navigate(['/add']);
            }
          });
      });
    });
  }

  sendRequest(orgId: string) {
    this.activatedRoute.queryParamMap.subscribe((queryParams) => {
      const request: Request = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        email: queryParams.get('email')!,
        sendId: queryParams.get('user_id')!,
        receivedId: orgId,
        isAccept: false,
      };
      this.notificationService.addRequest(request).subscribe((res) => {
        console.log(res);
      });
    });
  }
}
