import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject, of, switchMap} from 'rxjs';
import {environment} from 'src/environments/environment';

import {Router} from "@angular/router";
import { Alertes } from '@/app/util/alerte';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authenticated: boolean = false;
  private authenticationState = new Subject<any>();
  private _userPermissions: string[] = [];


  /**
   * Constructor
   */
  constructor(
    private router: Router,
    private _httpClient: HttpClient,
    // this.router.navigate([this.returnUrl]);
    // private conf:ConfigurationService,

  ) {


  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    // localStorage.setItem('accessToken', token);
    sessionStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  set username(username: string) {
    // localStorage.setItem('username', username);
    sessionStorage.setItem('username', username);
  }

  get username(): any {
    // return localStorage.getItem("username");
    return sessionStorage.getItem("username")
  }

  set userPermissions(permissions: string[]) {
    sessionStorage.setItem('userPermissions', JSON.stringify(permissions));
    this._userPermissions = permissions;
  }

  get userPermissions(): string[] {
    const storedPermissions = sessionStorage.getItem('userPermissions');
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */

  signIn(credentials: { login: string; password: string }): Observable<any> {
    return this._httpClient.post<any>(`${environment.baseUrl}auth/signIn`, credentials,)
      .pipe(
        switchMap((response: any) => {
          const decode = new JwtHelperService();

          const decodedToken = decode.decodeToken(response.access_token);
          console.log("test tex",decodedToken);

          // Récupérer les permissions de l'utilisateur
          this.userPermissions = decodedToken.auth || [];
          sessionStorage.setItem('userPermissions', JSON.stringify(this.userPermissions));


          // Store the access token in the local storage
          this.getDecodedAccessToken(response.access_token)
          Alertes.alerteCustomSucces("Connexion réussie. Bienvenue !");

          // Return a new observable with the response
          return of(response);
        })
      );
  }

  getDecodedAccessToken(token: string): any {

    const decode = new JwtHelperService();

    const decodedToken = decode.decodeToken(token);
    // Other functions
    const expirationDate = decode.getTokenExpirationDate(token);
    const isExpired = decode.isTokenExpired(token);

    this.accessToken = token;


    // // Set the authenticated flag to true
    this._authenticated = true;


    // // Store the user on the user service

    this.username = decodedToken.sub

    // console.log("userName",  this.username);
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    // sessionStorage.removeItem('accessToken');
    // localStorage.removeItem('isLoggedin')
    sessionStorage.clear();
    localStorage.clear();
    // Set the authenticated flag to falseejfekjrjrtj
    this._authenticated = false;
    this.router.navigate(['/auth/login']);
    Alertes.alerteCustomSucces("Déconnexion réussie. À bientôt !");
    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    return this._httpClient.post('auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    console.log("authenticated ==============={}", this._authenticated)

    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    } else {
      //    localStorage.clear()
    }
    if (this.accessToken) {
      return of(true);
    }


    // Check the access token availability
    if (!this.accessToken) {
      console.log("erreur token")
      return of(false);
    }
    return of(false);

    // Check the access token expire date
    // if ( AuthUtils.isTokenExpired(this.accessToken) )
    // {
    //     console.log("errreur authen")
    //     return of(false);
    // }

    // If the access token exists and it didn't expire, sign in using it
    //   return this.signInUsingToken();
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }
}
