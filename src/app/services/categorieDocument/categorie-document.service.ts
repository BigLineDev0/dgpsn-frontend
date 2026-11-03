import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategorieDocumentService {
    constructor(protected http: HttpClient) {
    }

    //  create Label
    createCategorieDocument(label: any): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}categorieDocument`, label);
    }

    // update a Label
    updateCategorieDocument(labelId: any, label: any): Observable<any> {
        return this.http.put<any>(`${environment.baseUrl}categorieDocument/${labelId}`, label, {
            observe: 'response',
        });
    }

    // get a Label
    readCategorieDocument(id: any): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}categorieDocument/${id}`, {
            observe: 'response',
        });
    }

    //read all Label
    readCategorieDocuments(req?: any): Observable<any> {

        let parametres: HttpParams = new HttpParams();
        if (req) {
            if (req?.categoryDocument) {
                parametres = parametres.append("categoryDocument", req?.categoryDocument);
            }
            if (req?.libelle != undefined && req?.libelle) {
                parametres = parametres.append("libelle", req?.label);
            }
            return this.http.get<any>(
                `${environment.baseUrl}categorieDocument?page=${req?.page}&size=${req?.size}`, {
                    params: parametres
                }
            );
        } else {
            return this.http.get<any>(
                `${environment.baseUrl}categorieDocument?page=${0}&size=${100000}`, {
                    params: parametres
                }
            );
        }

    }

    //delete a Label
    deleteCategorieDocument(labelId: any): Observable<any> {
        return this.http.delete<any>(`${environment.baseUrl}categorieDocument/${labelId}`, {
            observe: 'response',
        });
    }

    // get all referentiel types
    readCategorieDocumentTypes(): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}categorieDocument/categoryDocument`, {
            observe: 'response',
        });
    }
}
