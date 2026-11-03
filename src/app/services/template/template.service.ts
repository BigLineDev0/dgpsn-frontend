import { Helper } from '@/app/util/helper';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private http: HttpClient
  ) { }

  addTemplate(template: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}templates`, template)
  }

  // update a template
  updateTemplate(templateId : any, template: any): Observable<any> {
    // console.log("id", templateId)
    return this.http.put<any>(`${environment.baseUrl}templates/${templateId}`, template, {
      observe: 'response',
    });
  }

  //delete template

  deleteTemplate(templateId : any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}templates/${templateId}`, {
      observe: 'response',
    });
  }
  // get a template
  readTemplate(templateId: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}templates/${templateId}`, {
      observe: 'response',
    });
  }

  //read all templates
  readTemplates(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if (req){
      if(req?.message != undefined && req?.message){
        parametres = parametres.append("message",req?.message);
      }
      if(req?.categorieAlerte != undefined && req?.categorieAlerte){
        parametres = parametres.append("categorieAlerte",req?.categorieAlerte);
      }
      if(req?.typeAlerte != undefined && req?.typeAlerte){
        parametres = parametres.append("typeAlerte",req?.typeAlerte);
      }
      if(req?.date != undefined && req?.date){
        parametres = parametres.append("date", Helper.getDateFormatter(req?.date)!);
      }
      // if(req?.date != undefined && req?.date){
      //   parametres = parametres.append("date", req?.date);
      // }
      if(req?.read != undefined){
        parametres = parametres.append("read",req?.read);
      }
      if(req?.priority != undefined && req?.priority){
        parametres = parametres.append("priority",req?.priority);
      }
      if(req?.profileId != undefined && req?.profileId){
        parametres = parametres.append("profileId",req?.profileId);
      }

      return this.http.get<any>(`${environment.baseUrl}templates?page=${req.page}&size=${req.size}`,{
        params: parametres
      });
    }
    else{
      return this.http.get<any>(`${environment.baseUrl}templates`,{
        params: parametres
      });
    }
  }

  readAllTypeAlerte(categorieAlerte:any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}templates/readAllTypeAlerte?categorieAlerte=${categorieAlerte}`);
  }

  readAllCategorieAlerte(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}templates/readAllCategorieAlerte`);
  }

  readAllPriorities(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}templates/readAllPriorities`);
  }
}
