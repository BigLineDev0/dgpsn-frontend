import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanComptableElementService {

  constructor(protected http: HttpClient) { }

  /**
   * Créer un nouvel élément du plan comptable
   */
  createPlanComptableElement(element: any): Observable<any> {
    return this.http.post<any>(
      `${environment.baseUrl}plancomptableelements`, 
      element
    );
  }

  /**
   * Modifier un élément existant
   */
  updatePlanComptableElement(elementId: number, element: any): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}plancomptableelements/${elementId}`, 
      element,
      { observe: 'response' }
    );
  }

  /**
   * Lire un élément par son ID
   */
  readPlanComptableElement(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}plancomptableelements/${id}`,
      { observe: 'response' }
    );
  }

  /**
   * Supprimer un élément
   */
  deletePlanComptableElement(elementId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.baseUrl}plancomptableelements/${elementId}`,
      { observe: 'response' }
    );
  }

  /**
   * Récupérer tous les éléments avec filtres
   */
  getAllPlanComptableElements(req?: any): Observable<any> {
    let parametres = new HttpParams();

    if (req) {
      if (req.code) {
        parametres = parametres.append("code", req.code);
      }

      if (req.libelle) {
        parametres = parametres.append("libelle", req.libelle);
      }

      if (req.type) {
        parametres = parametres.append("type", req.type);
      }

      // ✅ CORRECTION: parentId au lieu de parenId
      if (req.parentId !== undefined && req.parentId !== null) {
        parametres = parametres.append("parentId", req.parentId.toString());
      }

      if (req.idsToIgnore && req.idsToIgnore.length > 0) {
        parametres = parametres.append("idsToIgnore", req.idsToIgnore.join(','));
      }

      if (req.sortBy) {
        parametres = parametres.append("sortBy", req.sortBy);
      }

      if (req.ascending !== undefined && req.ascending !== null) {
        parametres = parametres.append("ascending", req.ascending.toString());
      }

      const page = req.page !== undefined ? req.page : 0;
      const size = req.size !== undefined ? req.size : 20;

      parametres = parametres.append("page", page.toString());
      parametres = parametres.append("size", size.toString());

      return this.http.get<any>(
        `${environment.baseUrl}plancomptableelements`,
        { params: parametres }
      );
    }

    return this.http.get<any>(
      `${environment.baseUrl}plancomptableelements?page=0&size=100000`
    );
  }

  /**
   * Récupérer uniquement les CLASSES
   */
  getAllClasses(req?: any): Observable<any> {
    return this.getAllPlanComptableElements({
      ...req,
      type: 'CLASSE'
    });
  }

  /**
   * Récupérer les COMPTES d'une CLASSE spécifique
   */
  getComptesByClasseId(classeId: number, req?: any): Observable<any> {
    return this.getAllPlanComptableElements({
      ...req,
      type: 'COMPTE',
      parentId: classeId
    });
  }

  /**
   * Récupérer les SOUS_COMPTES d'un COMPTE spécifique
   */
  getSousComptesByCompteId(compteId: number, req?: any): Observable<any> {
    return this.getAllPlanComptableElements({
      ...req,
      type: 'SOUS_COMPTE',
      parentId: compteId
    });
  }

  /**
   * Récupérer les RUBRIQUES d'un SOUS_COMPTE spécifique
   */
  getRubriquesBySousCompteId(sousCompteId: number, req?: any): Observable<any> {
    return this.getAllPlanComptableElements({
      ...req,
      type: 'RUBRIQUE',
      parentId: sousCompteId
    });
  }

  /**
 * Récupérer les RÉALISATIONS d'une RUBRIQUE spécifique
 */
getRealisationsByRubriqueId(rubriqueId: number, req?: any): Observable<any> {
  return this.getAllPlanComptableElements({
    ...req,
    type: 'REALISATION',
    parentId: rubriqueId
  });
}

  /**
   * Importer des éléments depuis un fichier
   */
  importPlanComptableElements(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(
      `${environment.baseUrl}plancomptableelements/import`,
      formData,
      { observe: 'response' }
    );
  }
}