import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { AuthService } from 'src/app/services/auth.service';
import { ThemingService } from 'src/app/services/theming.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ThemeableComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  @ViewChild('errorText') loginErrorText!: ElementRef;

  constructor(private authService: AuthService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

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

  login(event: any) {
    event.preventDefault();
    this.loginErrorText.nativeElement.innerText = '';

    if (this.email.pristine || this.password.pristine) {
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    if (this.email.invalid) {
      return;
    }

    if (this.password.invalid) {
      return;
    }
    
    this.authService.login(this.email.value as string, this.password.value as string)
      .subscribe({
        next: response => {
          console.log("RESPONSE RECEIVED");
          console.log(response);
        },
        error: response => this.loginErrorText.nativeElement.innerText = response.error.message
      });
  }
}
