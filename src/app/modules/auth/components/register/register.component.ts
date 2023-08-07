import { Component, OnDestroy } from '@angular/core';
import { SubscribeManager } from 'src/app/utils/subscribe-manager';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterForm, RegisterUser } from '../../models/User.model';
import { Router } from '@angular/router';
import { InputErrorsService } from 'src/app/modules/ui/services/input-errors.service';

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K] | null>;
}>;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends SubscribeManager implements OnDestroy {
  public processing: boolean = false;

  public registerForm = new FormGroup<RegisterForm>({
    username: new FormControl('', [Validators.minLength(2), Validators.required]),
    firstName: new FormControl('', [Validators.minLength(2), Validators.required]),
    lastName: new FormControl('', [Validators.minLength(2), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl(0),
    password: new FormControl('', [Validators.minLength(12), Validators.required])
  })

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public inputErrorsService: InputErrorsService
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.authenticated$.subscribe(authenticated => {
        if (authenticated) {
          this.router.navigate(['/tasks'])
        }
      })
    )
  }

  public submit(): void {
    this.processing = true;

    this.authService.register(this.createUser(this.registerForm.value as RegisterUser)).subscribe({
      next: (user) => { console.log(user) },
      complete: () => { this.processing = false; },
      error: (err) => { console.log(err) }
    });
  }

  private createUser(userFormData: RegisterUser) {
    const user: RegisterUser = {
      username: userFormData.username,
      firstName: userFormData.firstName,
      lastName: userFormData.lastName,
      email: userFormData.email,
      phone: userFormData.phone,
      password: userFormData.password,
    }

    return user;
  }


  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
