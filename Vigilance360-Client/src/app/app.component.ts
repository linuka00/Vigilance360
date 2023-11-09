import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'vigilance360';

  constructor(private router: Router, private authService: AuthService) {
    // let returnUrl = localStorage.getItem('returnUrl');
    // // if (!returnUrl) return;
    // if (!returnUrl) router.navigate(['/login']);
    // localStorage.removeItem('returnUrl');
    // router.navigateByUrl(returnUrl as string);
    let returnUrl = localStorage.getItem('returnUrl');
    // Check if returnUrl is defined and not null
    if (!returnUrl || returnUrl === 'null') {
      // If returnUrl is not set or is 'null', navigate to the default route, e.g., '/login'
      router.navigate(['/home']);
    } else {
      // If returnUrl is valid, navigate to it
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl as string);
    }
  }
}
