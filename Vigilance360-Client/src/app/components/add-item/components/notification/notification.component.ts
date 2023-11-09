import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.notificationService
      .getReceivedRequest(this.authService.currentUser.user_id)
      .subscribe((res) => {
        this.notifications = res;
      });
  }

  ngOnInit(): void {}

  deleteRequest(sendId: string) {
    this.notificationService.deleteRequest(sendId);
  }

  acceptRequst(sendId: string) {
    this.notificationService.updateRequest(sendId);
  }
}
