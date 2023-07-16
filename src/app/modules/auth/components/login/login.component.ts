import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { SubscribeManager } from 'src/app/utils/subscribe-manager';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface LoginFormGroup {
  email: FormControl<string | null>,
  password: FormControl<string | null>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SubscribeManager implements OnInit, OnDestroy {

  public loginForm: FormGroup = new FormGroup<LoginFormGroup>({
    email: new FormControl('', [Validators.required, Validators.email, Validators.min(12)],),
    password: new FormControl('', [Validators.required, Validators.min(12)])
  })

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authenticationService.authenticated$.subscribe(authenticated => {
        if (authenticated) {
          this.router.navigate(['/tasks'])
        }
      })
    )
  }

  public submit(): void {
    if (this.loginForm.valid) {
      this.authenticationService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      );
    }
  }


  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
