import {environment} from '@/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    constructor(protected http: HttpClient) {
    }

    getClasses(req?: any): Observable<any> {
        let parametres: HttpParams = new HttpParams();
            parametres = parametres.append("page", req.page ?? 0);
            parametres = parametres.append("size", req.size ?? 10);
        return this.http.get<any>(`${environment.baseUrl}plancomptableelements/classes`, {params: parametres});
    }

    createPlanComptableElement(element: any): Observable<any> {
        return this.http.post<any>(`${environment.baseUrl}plancomptableelements`, element);
    }

    updatePlanComptableElement(elementId: any, element: any): Observable<any> {
        return this.http.put<any>(`${environment.baseUrl}plancomptableelements/${elementId}`, element, {
            observe: 'response',
        });
    }

    deletePlanComptableElement(elementId: any): Observable<any> {
        return this.http.delete<any>(`${environment.baseUrl}plancomptableelements/${elementId}`, {
            observe: 'response',
        });
    }

    readAllPlanComptableElement(): Observable<any> {
        return this.http.get<any>(`${environment.baseUrl}plancomptableelements`);
    }

    getRealisationConfig(parentId: any) {
        return this.http.get<any>(`${environment.baseUrl}plancomptableelements/realisation/${parentId}`, {
            observe: 'response',
        });
    }

    getRubriquesByClasseId(classeId: any): Observable<any[]> {
        return this.http.get<any>(`${environment.baseUrl}plancomptableelements/rubriques/${classeId}`);
    }
}
