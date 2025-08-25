import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading = false;

  onLogin(form: NgForm) {
    console.log(form.value);
  }
}
