import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { UserComponent } from './components/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddDeviceComponent } from './components/add-item/components/add-device/add-device.component';
import { AddSoftwareComponent } from './components/add-item/components/add-software/add-software.component';
import { AddHardwareComponent } from './components/add-item/components/add-hardware/add-hardware.component';
import { AddOsComponent } from './components/add-item/components/add-os/add-os.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyReportComponent } from './components/my-report/my-report.component';
import { AddThreatComponent } from './components/add-item/components/add-threat/add-threat.component';
import { AddResourceComponent } from './components/add-item/components/add-resource/add-resource.component';
import { AddOrgComponent } from './components/add-org/add-org.component';
import { NotificationComponent } from './components/add-item/components/notification/notification.component';
import { WaitComponent } from './components/wait/wait.component';

export function tokenGetter() {
  return localStorage.getItem('token'); // Replace with your token retrieval logic
}
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TestComponent,
    LoginComponent,
    RegisterComponent,
    VarifyEmailComponent,
    ForgotPasswordComponent,
    HomeComponent,
    AddItemComponent,
    AddDeviceComponent,
    AddSoftwareComponent,
    AddHardwareComponent,
    AddOsComponent,
    NavBarComponent,
    MyReportComponent,
    AddThreatComponent,
    AddResourceComponent,
    AddOrgComponent,
    NotificationComponent,
    WaitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    JwtModule.forRoot({}),
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'], // Specify your allowed domains
        disallowedRoutes: ['example.com/auth/'], // Specify routes that should not include the token
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
