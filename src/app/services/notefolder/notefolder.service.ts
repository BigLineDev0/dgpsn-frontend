import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotefolderService {

  constructor(protected http: HttpClient) { }


  createNoteFolder(foldermrk: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}notefile`, foldermrk);
  }

  updateNoteFolder(Id : any, foldermrk: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}notefile/${Id}`, foldermrk, {
      observe: 'response',
    });
  }

   readNoteFolder(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}notefile/${id}`, {
      observe: 'response',
    });
  }


//lire tous les notes d'un dossiers specificique :connaisant l'id du dossier.
 readAllNotePerIdFolder(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}notefile/folder/${id}`, {
      observe: 'response',
    });
  }
  readNoteFolderPage(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();
    if(req){
      if(req?.code){
        parametres = parametres.append("code",req?.code);
      }
      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle",req?.libelle);
      }
      return this.http.get<any>(
        `${environment.baseUrl}notefile?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}notefile?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
    
  }

  deleteNoteFolder(foldermrkId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}notefile/${foldermrkId}`, {
      observe: 'response',
    });
  }

}
