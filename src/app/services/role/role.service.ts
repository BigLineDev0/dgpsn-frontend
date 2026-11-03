import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  //read all role
  readRoles(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.ugp != undefined && req?.ugp){
        parametres = parametres.append("ugp", req?.ugp);
      }
      if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
      return this.http.get<any>(
        `${environment.baseUrl}roles?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}roles?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
  //  create role
  createRole(role: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}roles`, role);
  }

  // update a              
  updateRole(roleId:number, role:any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}roles/${roleId}`, role, {
      observe: 'response',
    });
  }

  // get a role
  readRole(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}roles/${id}`, {
      observe: 'response',
    });
  }

  //delete a role
  deleteRole(roleId:number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}roles/${roleId}`, {
      observe: 'response',
    });
  }
  // get a role
  readRoleUgp(req: any): Observable<any> {
    let parametres: HttpParams = new HttpParams(); 
    parametres = parametres.append("projectId", req?.projectId);
    return this.http.get<any>(`${environment.baseUrl}roles/roleBy`, {
      params: parametres
    });
  }
}
