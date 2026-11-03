import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongeService {

  constructor(protected http: HttpClient) { }

  //  create Conge
  createConge(conge: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}conge`, conge)

  }

  // update a Conge
  updateConge(congeId: any, conge: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}conge/${congeId}`, conge, {
      observe: 'response',
    });
  }
  updateCongeStatut(congeId: number, newStatut: string): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}conge/${congeId}/updateStatut`, null, { params: { statutType: newStatut } });
  }

  readConge(id: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}conge/${id}`, {
      observe: 'response',
    });
  }

  //read all Conge per list
  readListConges(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}Conge/list`);
  }

  //read all Conge par page
  readPageConges(params: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    parametres = parametres.append("typeConge", params?.typeConge);

    if (params.libelle) {
      parametres = parametres.append("libelle", params?.libelle);
    }

    if (params.duree) {
      parametres = parametres.append("duree", params?.duree);
    }

    if (params.dateDebut) {
      parametres = parametres.append("dateDebut", params?.dateDebut);
    }
    if (params.dateDepart) {
      parametres = parametres.append("dateDepart", params?.dateDepart);
    }
    if (params.dateReprise) {
      parametres = parametres.append("dateReprise", params?.dateReprise);
    }
    if (params.description) {
      parametres = parametres.append("description", params?.description);
    }
    if (params.agentId) {
      parametres = parametres.append("agentId", params?.agentId);
    }

    return this.http.get<any>(
      `${environment.baseUrl}conge/page?page=${params.page}&size=${params.size}`, {
      params: parametres
    }
    );
  }

  //delete a Conge
  deleteConge(congeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}conge/${congeId}`, {
      observe: 'response',
    });
  }

  deleteDocumentConge(congeId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}conge/doc/${congeId}`, {
      observe: 'response',
    });
  }
  createCongeDocument(congeId?: any, file?: any, document?: any,): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('DocumentDTO', JSON.stringify(document));
    if (file) {
      formData.append('file', file[0]);
    }
    return this.http.post<any>(`${environment.baseUrl}conge/docOrdre/${congeId}`, formData);

  }

  // update numero decision
updateNumeroDecision(congeId: number, numeroDecision: number): Observable<any> {
    return this.http.put<any>(
        `${environment.baseUrl}conge/${congeId}/numero-decision`,
        null,
        { 
            params: { numeroDecision: numeroDecision.toString() },
            observe: 'response'
        }
    );
}

  ///////End Conge de Autres Service///
  readNumberChildrensByAgentId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}family/count-children/${id}`, {
      observe: 'response',
    });
  }
  //convert duree en lettre
  private units = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  private teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  private tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

  convertNumberToWords(number: number): string {
    if (number < 10) {
      return this.units[number];
    } else if (number < 20) {
      return this.teens[number - 10];
    } else if (number < 100) {
      let unit = number % 10;
      let ten = Math.floor(number / 10);
      return this.tens[ten] + (unit !== 0 ? '-' + this.units[unit] : '');
    }
    // Add more cases for hundreds, thousands, etc.
    return number.toString();
  }

}



