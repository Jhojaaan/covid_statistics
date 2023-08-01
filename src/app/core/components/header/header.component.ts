import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService:AuthService) {}

  public LogOut(): void {
    this.authService.logOut();
  }

}
