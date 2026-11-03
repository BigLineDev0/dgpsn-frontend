import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(protected http: HttpClient) { }

  //  create category
  createCategory(category: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}category`, category);
  }

  // update a category
  updateCategory(categoryId: any, category: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}category/${categoryId}`,category, {
      observe: 'response',
    });
  }

  // get a category
  readCategory(categoryId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}category/${categoryId}`, {
      observe: 'response',
    });
  }


  //read all category
  readCategories(req?: any): Observable<any> {

    let parametres: HttpParams = new HttpParams();

    if(req){

      if(req?.code != undefined && req?.code){
        parametres = parametres.append("code", req?.code);
      }

      if(req?.libelle != undefined && req?.libelle){
        parametres = parametres.append("libelle", req?.libelle);
      }

      return this.http.get<any>(
        `${environment.baseUrl}category?page=${req.page}&size=${req.size}`,{
          params: parametres
        }
      );
    }else{
      return this.http.get<any>(
        `${environment.baseUrl}category?page=${0}&size=${100000}`,{
          params: parametres
        }
      );
    }
  }
   //delete a category
   deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}category/${categoryId}`)
   }

}
