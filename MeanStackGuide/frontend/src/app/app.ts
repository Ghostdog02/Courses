import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.autoAuthUser();
  }

}
