import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(
    private http: HttpClient
  ) { }

  createProfile(profile: any) {
    return this.http.post<any>(`${environment.baseUrl}profiles`, profile);
  }

  updateProfile(profileId: any, profile: any) {
    return this.http.put<any>(`${environment.baseUrl}profiles/${profileId}`, profile);
  }

  readProfiles(req?:any) {
    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }
      return this.http.get<any>(`${environment.baseUrl}profiles?page=${req?.page}&size=${req.size}`,{
        params:parametres
      });
    }
    else{
      return this.http.get<any>(
        `${environment.baseUrl}profiles?page=${0}&size=${20}`,{
          params: parametres
        }
      );
    }

  }

  readProfile(profileId: any) {
    return this.http.get<any>(`${environment.baseUrl}profiles/${profileId}`);
  }

  readPermissions(req?: any) {
    let parametres: HttpParams = new HttpParams();
    if(req?.module != undefined) {
      parametres = parametres.append("module", req?.module);
      return this.http.get<any>(`${environment.baseUrl}permissions`, {
        params: parametres
      });
    } else {
      return this.http.get<any>(`${environment.baseUrl}permissions`, {
        observe: 'response'
      });
    }
    //parametres.append('module', module);
  }

  readModules() {
    return this.http.get<any>(`${environment.baseUrl}permissions/readModules`);
  }

  readByModule(req: any) {
    let parametres: HttpParams = new HttpParams();
    if(req) {
      parametres = parametres.append("name", req?.name);
    }
    return this.http.get<any>(`${environment.baseUrl}permissions/readByModule`, {
      params: parametres
    });
  }

  deleteProfile(profileId: any) {
    return this.http.delete<any>(`${environment.baseUrl}profiles/${profileId}`);
  }
}
