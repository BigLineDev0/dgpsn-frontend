import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
constructor(protected http: HttpClient) { }
  
  //  create Direction
  createDirection(direction: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}directions`, direction);
  }

  // update a Direction
  updateDirection(directionId: any, direction: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}directions/${directionId}`, direction, {
      observe: 'response',
    });
  }

  // get a Direction
  readDirection(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}directions/${id}`, {
      observe: 'response',
    });
  }

  //read all Direction
  readDirections(direction: { [key:string]: string} | null, page: any, size: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (direction !== null) {
      Object.entries(direction).forEach(([key, value]) => {
        params = params.set(key, value);
      });
    }

    return this.http.get<any>(`${environment.baseUrl}directions`, { params: params });

  }

    //read all Direction
  loadOrganigramme(page: any, size: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}directions/organigramme?page=${page}&size=${size}`);
  }

  //delete a Direction
  deleteDirection(directionId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}directions/${directionId}`, {
      observe: 'response',
    });
  }

  // add structure to project
  addStructureToProject(directionId: any, structuresIds: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}directions/add-structures/${directionId}`, structuresIds, {
      observe: 'response',
    });
  }
}
