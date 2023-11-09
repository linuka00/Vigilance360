import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ItemService } from 'src/app/service/item.service';
import { ServerService } from 'src/app/service/server.service';
import { ToastrService } from 'ngx-toastr';
import { ResourceService } from 'src/app/service/resource.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  isClickEnabled = true;
  deviceCount$;
  softwareCount$;
  hardwareCount$;
  osCount$;
  softwareCount = 0;
  hardwareCount = 0;
  osCount = 0;
  urlsCount = 0;
  notifications = 0;

  constructor(
    private resourceService: ResourceService,
    private itemService: ItemService,
    public authService: AuthService,
    private serverService: ServerService,
    private toastr: ToastrService,
    private notificationService: NotificationService
  ) {
    this.deviceCount$ = this.itemService
      .getAllDevice(this.authService.currentUser.user_id)
      .valueChanges()
      .pipe(map((devices) => devices.length));
    this.softwareCount$ = this.itemService
      .getAllSoftware(this.authService.currentUser.user_id)
      .valueChanges()
      .pipe(map((software) => software.length));
    this.hardwareCount$ = this.itemService
      .getAllHardware(this.authService.currentUser.user_id)
      .valueChanges()
      .pipe(map((hardware) => hardware.length));
    this.osCount$ = this.itemService
      .getAllOs(this.authService.currentUser.user_id)
      .valueChanges()
      .pipe(map((os) => os.length));
    this.resourceService.getAllUrl().forEach((value) => {
      this.urlsCount = value.length;
    });
    this.notificationService
      .getReceivedRequest(authService.currentUser.user_id)
      .subscribe((res) => {
        this.notifications = res.length;
      });
  }

  ngOnInit(): void {}

  scanNow() {
    this.isClickEnabled = false;
    this.serverService
      .sendRequestToServer(this.authService.currentUser.user_id)
      .subscribe(
        (res) => {
          this.isClickEnabled = true;
          localStorage.setItem('isScan', 'true');
        },
        (err) => {
          this.toastr.error('Something went wrong', 'Scan');
          this.isClickEnabled = true;
        }
      );
  }
}
