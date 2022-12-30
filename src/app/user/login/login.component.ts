import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemeableComponent } from 'src/app/common/theamable.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ThemeableComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }

    return '';
  }

  toggleHide(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }
}
