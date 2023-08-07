import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User, RegisterUser, UserLogged } from '../models/User.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


//TODO: Agregar login con un servicio backend

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl: string = environment.apiBaseUrl + 'api/auth/';
  private loginUrl: string = this.authUrl + 'local'
  private registerUrl: string = this.loginUrl + '/register';

  private browserStorageKey = environment.browserStorageKey + 'user';
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {
      this.getUserLocalStorage();
  }

  public login(identifier: string, password: string): Observable<any>{
    return this.http.post<{ jwt: string, user: User }>(this.loginUrl, {identifier, password}).pipe(
      map((response) => {
        return this.setUser(response);
      })
    )
  }

  public register(user: RegisterUser){
    return this.http.post<{ jwt: string, user: User }>(this.registerUrl, user).pipe(
      map(response => {
        console.log(response)
        return this.setUser(response);
      })
    )
  }

  public setUser(userLogged: UserLogged){
    this.saveUserLocalStorage(userLogged);
    this.user$.next(userLogged.user);
    this.authenticated$.next(true);

    return userLogged;
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

  private saveUserLocalStorage(user: UserLogged): void {
    localStorage.setItem(this.browserStorageKey, JSON.stringify(user))
  }

  private deleteUserLocalStorage(): void {
    localStorage.removeItem(this.browserStorageKey);
  }
}
