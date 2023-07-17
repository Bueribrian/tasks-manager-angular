import { Component, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { SubscribeManager } from 'src/app/utils/subscribe-manager';
import { User } from 'src/app/modules/auth/models/User.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends SubscribeManager implements OnDestroy {
  public user: User | null = null;;

  constructor(private authService: AuthenticationService) {
    super();
  }

  ngOnInit(){
    this.subscriptions.push(
      this.authService.user$.subscribe(user => {
        this.user = user;
      })
    )
  }

  public logout(){
    this.authService.logout();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
