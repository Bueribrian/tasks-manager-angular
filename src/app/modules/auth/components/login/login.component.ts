import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { SubscribeManager } from 'src/app/utils/subscribe-manager';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputErrorsService } from 'src/app/modules/ui/services/input-errors.service';

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
  public processing: boolean = false;

  public loginForm: FormGroup = new FormGroup<LoginFormGroup>({
    email: new FormControl('', [Validators.required, Validators.email, Validators.min(12)],),
    password: new FormControl('', [Validators.required, Validators.min(12)])
  })

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public inputErrorsService: InputErrorsService
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
      this.processing = true;

      this.authenticationService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      ).subscribe({
        next: (user) => { console.log(user) },
        complete: () => { this.processing = false; },
        error: (err) => { console.log(err) }
      });
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
