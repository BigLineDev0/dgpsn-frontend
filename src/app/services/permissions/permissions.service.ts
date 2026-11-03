import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(protected http: HttpClient) { }

  // get modules
  readPermissions(module?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if(module) {
      parametres =  parametres.append("module", module);
    }
    return this.http.get<any>(`${environment.baseUrl}permissions`, {
      params: parametres,
      observe: 'response',
    })
  }

  // get feature by module
  readFeatureByModule(module: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    parametres =  parametres.append("module", module);
    return this.http.get<any>(`${environment.baseUrl}permissions/readFeatureByModule`, {
      params: parametres,
      observe: 'response',
    })
  }

  // filter by module and feature
  filterByModuleAndFeature(req: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    parametres =  parametres.append("moduleName", req.module);
    if(req.feature) {
      parametres =  parametres.append("featureName", req.feature);
    }
    return this.http.get<any>(`${environment.baseUrl}permissions/filterByModuleAndFeature`, {
      params: parametres,
      observe: 'response',
    })
  }
}
