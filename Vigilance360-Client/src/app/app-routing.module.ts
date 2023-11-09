import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuadService } from './guads/auth-guad.service';
import { HomeComponent } from './components/home/home.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddDeviceComponent } from './components/add-item/components/add-device/add-device.component';
import { AddSoftwareComponent } from './components/add-item/components/add-software/add-software.component';
import { AddHardwareComponent } from './components/add-item/components/add-hardware/add-hardware.component';
import { AddOsComponent } from './components/add-item/components/add-os/add-os.component';
import { MyReportComponent } from './components/my-report/my-report.component';
import { AddThreatComponent } from './components/add-item/components/add-threat/add-threat.component';
import { AddResourceComponent } from './components/add-item/components/add-resource/add-resource.component';
import { AddOrgComponent } from './components/add-org/add-org.component';
import { NotificationComponent } from './components/add-item/components/notification/notification.component';
import { WaitComponent } from './components/wait/wait.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent, canActivate: [AuthGuadService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'my-report',
    component: MyReportComponent,
    canActivate: [AuthGuadService],
  },
  {
    path: 'add',
    component: AddItemComponent,
    canActivate: [AuthGuadService],
    children: [
      { path: '', redirectTo: 'device', pathMatch: 'full' },
      { path: 'device', component: AddDeviceComponent },
      { path: 'software', component: AddSoftwareComponent },
      { path: 'hardware', component: AddHardwareComponent },
      { path: 'os', component: AddOsComponent },
      { path: 'resources', component: AddResourceComponent },
      { path: 'notification', component: NotificationComponent },
    ],
  },
  { path: 'addOrg', component: AddOrgComponent },
  { path: 'wait', component: WaitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
