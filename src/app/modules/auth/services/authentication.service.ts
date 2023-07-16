import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import User, { LoginUser, RegisterUser } from '../models/User.model';
import { Router } from '@angular/router';

//TODO: Agregar login con un servicio backend

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private browserStorageKey = environment.browserStorageKey + 'user';

  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {
      this.getUserLocalStorage();
  }

  public login(email: string, password: string){
    const userLogged = new User('test', 'test', email);
    this.saveUserLocalStorage(userLogged);
    this.user$.next(userLogged);
    this.authenticated$.next(true);
  }

  public register(user: RegisterUser){
    const userRegister = new User(user.name, user.lastName, user.email, user.phone)
    this.login(user.email, user.password);
  }

  public logout(){
    this.deleteUserLocalStorage();
    this.authenticated$.next(false);
    this.user$.next(null);
    this.router.navigate(['/auth/login']);
  }

  private getUserLocalStorage(): void {
    const user = localStorage.getItem(this.browserStorageKey);

    if(user){
      this.user$.next(JSON.parse(user));
      this.authenticated$.next(true);
    }else{
      this.authenticated$.next(false);
      this.router.navigate(['/auth/login']);
    }
  }

  private saveUserLocalStorage(user: User): void {
    if(user){
      localStorage.setItem(this.browserStorageKey, JSON.stringify(user))
    }
  }

  private deleteUserLocalStorage(): void {
    localStorage.removeItem(this.browserStorageKey);
  }
}
