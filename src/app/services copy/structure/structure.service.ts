import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  constructor(protected http: HttpClient) { }

  //  create Structure
  createStructure(structure: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}structures`, structure);
  }

  // update a Structure
  updateStructure(structureId: any, structure: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}structures/${structureId}`, structure, {
      // observe: 'response',
    });
  }

  // get a Structure
  readStructure(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}structures/${id}`, {
      // observe: 'response',
    });
  }

  //read all Structure
  readStructures(page?: any, map?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(map){
      if(map?.code){
        parametres = parametres.append("code",map?.code);
      }
      if(map?.libelle != undefined && map?.libelle){
        parametres = parametres.append("libelle",map?.libelle);
      }
      if(map?.telephone != undefined && map?.telephone){
        parametres = parametres.append("telephone",map?.telephone);
      }
      if(map?.pays != undefined && map?.pays){
        parametres = parametres.append("pays",map?.pays);
      }
      if(map?.regions != undefined && map?.regions){
        parametres = parametres.append("regions",map?.regions);
      }
      if(map?.ville != undefined && map?.ville){
        parametres = parametres.append("ville",map?.ville);
      }
      if(map?.adresse != undefined && map?.adresse){
        parametres = parametres.append("adresse",map?.adresse);
      }
      if(map?.nomContact != undefined && map?.nomContact){
        parametres = parametres.append("nomContact",map?.nomContact);
      }
      if(map?.email != undefined && map?.email){
        parametres = parametres.append("email",map?.email);
      }
      if(map?.fonctionContact != undefined && map?.fonctionContact){
        parametres = parametres.append("email",map?.fonctionContact);
      }
      if(map?.description != undefined && map?.description){
        parametres = parametres.append("description",map?.description);
      }
      if(map?.typeStructureId != undefined && map?.typeStructureId){
        parametres = parametres.append("typeStructureId",map?.typeStructureId);
      }
    }
    return this.http.get<any>(
      `${environment.baseUrl}structures?page=${page?.page}&size=${page?.size}`,{
        params: parametres
      }
    );

  }

  //delete a Structure
  deleteStructure(structureId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}structures/${structureId}`, {
      observe: 'response',
    });
  }
}
