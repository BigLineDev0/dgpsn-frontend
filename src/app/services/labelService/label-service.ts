import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LabelService {
  constructor(protected http: HttpClient) {}

  //  create Label
  createLabel(label: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}labels`, label);
  }

  // update a Label
  updateLabel(labelId: any, label: any): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}labels/${labelId}`,
      label,
      {
        observe: "response",
      }
    );
  }

  // get a Label
  readLabel(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}labels/${id}`, {
      observe: "response",
    });
  }

  //read all Label
  readLabels(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if (req) {
      if (req?.categorieId) {
        parametres = parametres.append("categorieId", req?.categorieId);
      }
      if (req?.type != undefined && req?.type) {
        parametres = parametres.append("type", req?.type);
      }
      if (req?.libelle != undefined && req?.libelle) {
        parametres = parametres.append("libelle", req?.libelle);
      }
      if (req?.code != undefined && req?.code) {
        parametres = parametres.append("code", req?.code);
      }
      if (req?.referentielType) {
        parametres = parametres.append("referentielType", req?.referentielType);
      }
      if (req?.ordre != undefined && req?.ordre) {
        parametres = parametres.append("ordre", req?.ordre);
      }
      if (req?.sortDirection != undefined && req?.sortDirection) {
        parametres = parametres.append("sortDirection", req?.sortDirection);
      }
      if (req?.sortProperty != undefined && req?.sortProperty) {
        parametres = parametres.append("sortProperty", req?.sortProperty);
      }
      // console.log("parametres ", parametres)
      return this.http.get<any>(
        `${environment.baseUrl}labels?page=${req?.page}&size=${req?.size}`,
        {
          params: parametres,
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}labels?page=${0}&size=${100000}`,
        {
          params: parametres,
        }
      );
    }
  }

  //delete a Label
  deleteLabel(labelId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}labels/${labelId}`, {
      observe: "response",
    });
  }

  // get all referentiel types

  readReferentielTypes(req?: any): Observable<any> {
  let params: HttpParams = new HttpParams();

  if (req) {
    if (req?.code != undefined && req?.code) {
      params = params.append("code", req?.code);
    }
    // ✅ Ajouter le support pour 'label'
    if (req?.label != undefined && req?.label) {
      params = params.append("label", req?.label);
    }
    // ✅ Ajouter le support pour 'description'
    if (req?.description != undefined && req?.description) {
      params = params.append("description", req?.description);
    }
    return this.http.get<any>(
      `${environment.baseUrl}labels/referentielTypes?page=${req.page}&size=${req.size}`,
      {
        params: params,
      }
    );
  } else {
    return this.http.get<any>(
      `${environment.baseUrl}labels/referentielTypes`,
      {
        params: params,
        observe: "response",
      }
    );
  }
}
  readReferentielLabel(name: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}labels?referentielType=${name}`,
      {
        observe: "response",
      }
    );
  }
}
