import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  private baseUrl = environment.apiUrl;
  

  constructor(private httpClient: HttpClient, private router: Router) {}

  public isLoggedIn():boolean {
    const token = localStorage.getItem('token');
    
    if (token) { 
      return true; 
    }else{
      return false;
    }
  }

  public logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('file');
    this.router.navigate(['/auth/login']);
  }
  
  public routeToLogin() {
    this.router.navigate(['/auth']);
  }
}
