import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private http: HttpClient) { }

  createFolder(folder: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}folders`, folder);
  }

  createSubFolder(folderId: any, subFolder: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}folders/${folderId}`, subFolder);
  }

  updateFolder(folderId: any, folder: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}folders/${folderId}`, folder);
  }

  deleteFolder(folderId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}folders/${folderId}`);
  }

  readParentsOnly(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){
      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }
      if(req?.name != undefined && req?.name){
        parametres = parametres.append("name", req?.name);
      }
      return this.http.get<any>(
        `${environment.baseUrl}folders?page=${req?.page}&size=${req?.size}`,{
          params: parametres
        }
      );
    } else{
      return this.http.get<any>(
        `${environment.baseUrl}folders`,{
          params: parametres
        }
      );
    }
  }

  readAllFolders(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}folders/all`
    );
  }
}
