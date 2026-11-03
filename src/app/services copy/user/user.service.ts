import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}users`, user)
  }
  updateUser(userId: any, user: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}users/${userId}`, user)
  }

  readUser(userId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}users/${userId}`)
  }

  //read all users
  readUsers(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.structureId != undefined && req?.structureId){
        parametres = parametres.append("structureId", req?.structureId);
      }
      if(req?.login != undefined && req?.login){
        parametres = parametres.append("login", req?.login);
      }
      if(req?.agentId != undefined && req?.agentId){
        parametres = parametres.append("agentId", req?.agentId);
      }
      if(req?.profileId != undefined && req?.profileId){
        parametres = parametres.append("profileId", req?.profileId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}users?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}users`,{
          params: parametres
        }
      );
    }

  }

  deleteUser(userId : any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}users/${userId}`, {
      observe: 'response',
    });
  }

  activeOrDesativeUser(userId : any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}users/activeOrDesactive/${userId}`, {
      observe: 'response',
    });
  }
  updatePassword(user: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}users`, user)
  }

}
