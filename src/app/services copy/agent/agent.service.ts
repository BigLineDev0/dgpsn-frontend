import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(protected http: HttpClient) { }

  //  create agent
  createAgent( agent?: any, file?: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('AgentDTO', JSON.stringify(agent));
    if(file){
      formData.append('file', file[0]);
    }
    return this.http.post<any>(`${environment.baseUrl}agents`, formData);
  }

  // update a agent
  updateAgent( agentId:any, agent: any, file:any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('AgentDTO', JSON.stringify(agent));
    if(file){
      formData.append('file', file[0]);
    }
    return this.http.put<any>(`${environment.baseUrl}agents/${agentId}`, formData, {
      observe: 'response',
    });
  }

   // get a agent
   readAgent(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}agents/${id}`, {
      observe: 'response',
    });
  }

  //read all agents
  getAllAgents(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.prenom){
        parametres = parametres.append("prenom",req?.prenom);
      }
      if(req?.nom != undefined && req?.nom){
        parametres = parametres.append("nom",req?.nom);
      }
      if(req?.email != undefined && req?.email){
        parametres = parametres.append("email", req?.email);
      }
      if(req?.telephone != undefined && req?.telephone){
        parametres = parametres.append("telephone", req?.telephone);
      }
      if(req?.adresse != undefined && req?.adresse){
        parametres = parametres.append("adresse", req?.adresse);
      }
      if(req?.structureId != undefined && req?.structureId){
        parametres = parametres.append("structureId", req?.structureId);
      }
      if(req?.fonctionId != undefined && req?.fonctionId){
        parametres = parametres.append("fonctionId", req?.fonctionId);
      }
      if(req?.sortBy != undefined && req?.sortBy){
        parametres = parametres.append("sortBy", req?.sortBy);
      }
      if(req?.ascending != undefined && req?.ascending){
        parametres = parametres.append("ascending", req?.ascending);
      }
      if(req?.directionId != undefined && req?.directionId){
        parametres = parametres.append("directionId", req?.directionId);
      }
      return this.http.get<any>(
        `${environment.baseUrl}agents?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}agents?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }

  }

  //delete a agent
  deleteAgent(agentId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}agents/${agentId}`, {
      observe: 'response',
    });
  }


  readFile(id: any): Observable <any>{
    return this.http
      .get(
        `${environment.baseUrl}agents/${id}/_download`,
        {

          responseType: 'blob'
        }
      );
  }


    importAgent(file: any) {
      let formData: FormData = new FormData();
      formData.append('file', file);

      return this.http.post<any>(`${environment.baseUrl}agents/import`, formData, {
        observe: 'response'
      });
    }

  exportAgent() {
    return this.http.get(`${environment.baseUrl}agents/export`, {
      responseType: 'blob' as 'json'
    });
  }

  // get a agent not have account
  readAgentNotInUser(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}agents/notInUser`, {
      observe: 'response',
    });
  }
}
