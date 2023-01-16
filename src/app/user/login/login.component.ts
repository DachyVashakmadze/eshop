import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThemeableComponent } from 'src/app/common/theamable.component';
import { AuthService } from 'src/app/services/auth.service';
import { ThemingService } from 'src/app/services/theming.service';
import { CookieService } from 'src/app/services/cookie.service'

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

  constructor(private authService: AuthService, private cookie: CookieService,
    protected override themingService: ThemingService
  ) {
    super(themingService);
  }

  ngOnInit() {
    this.initGoogleAPI();
  }

  private initGoogleAPI() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: '848019162270-fevhe2hj70t6778jkd7avdguqh6n5i9o.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });

    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "filled_blue", size: "large", width: "100%" }
    );
  };

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

    if (this.email.invalid || this.password.invalid) return;

    // Todo needs error checking
    this.authService.login(this.email.value as string, this.password.value as string)
      .subscribe({
        next: response => this.authService.submitLogin(response),
        error: response => this.loginErrorText.nativeElement.innerText = response.error.message
      });
  }

  async handleCredentialResponse(response: any) {
    this.authService.loginViaGoogle(response.credential).subscribe({
      next: response => this.authService.submitLogin(response),
      error: response => this.loginErrorText.nativeElement.innerText = response.error.message
    })
  }
}
