import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancementActivityService {

  constructor(protected http: HttpClient) { }

  ////////////// START CRUD FOR BUDGET SERVICE /////////////////////////////

  createBudget(budget: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}budget`, budget);
  }

  updateBudget( budgetId:any, budget: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}budget/${budgetId}`, budget, {
      observe: 'response',
    });
  }

  deleteBudget(budgetId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}budget/${budgetId}`, {
      observe: 'response',
    });
  }

 
  readAllBudget(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if (req) {
      if(req?.managementUnitId != undefined){
        parametres = parametres.append("managementUnitId",req?.managementUnitId);
      }
      if (req?.libelle != undefined && req?.libelle) {
        parametres = parametres.append("libelle", req?.libelle); 
      }
      
      if(req?.souceBudget != undefined && req?.souceBudget){
        parametres = parametres.append("souceBudget", req?.souceBudget);
      }
      if(req?.estimatedAmount != undefined && req?.estimatedAmount){
        parametres = parametres.append("estimatedAmount", req?.estimatedAmount);
      }
      if(req?.actualAmount != undefined && req?.actualAmount){
        parametres = parametres.append("actualAmount", req?.actualAmount);
      }
      if(req?.publicShare != undefined && req?.publicShare){
        parametres = parametres.append("publicShare", req?.publicShare);
      }
      if(req?.privateShare != undefined && req?.privateShare){
        parametres = parametres.append("privateShare", req?.privateShare);
      }
      return this.http.get<any>(
        `${environment.baseUrl}budget?page=${req?.page}&size=${req?.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}budget?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }

  //read historyFlag by code
  readTotalBudget(): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}budget/totalBudget`);
  }
   ////////////// END CRUD FOR BUDGET SERVICE /////////////////////////////

    ////////////// START CRUD FOR Source SERVICE /////////////////////////////

  createSource(source: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}source`, source);
  }

  updateSource( sourceId:any, source: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}source/${sourceId}`, source, {
      observe: 'response',
    });
  }
  
  deleteSource(sourceId: any): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}source/${sourceId}`, {
      observe: 'response',
    });
  }

  readAllSource(req?: any): Observable<any> {
    let parametres: HttpParams = new HttpParams();
    if (req) {
      
      if(req?.managementUnitId != undefined){
        parametres = parametres.append("managementUnitId",req?.managementUnitId);
      }

      if (req?.tacheId != undefined && req?.tacheId) {
        parametres = parametres.append("tacheId", req?.tacheId);
      }

      if (req?.valueIndicatorId != undefined && req?.valueIndicatorId) {
        parametres = parametres.append("valueIndicatorId", req?.valueIndicatorId);
      }

      if (req?.budgetId != undefined && req?.budgetId) {
        parametres = parametres.append("budgetId", req?.budgetId); 
      }

      if (req?.budgetGlobalId != undefined && req?.budgetGlobalId) {
        parametres = parametres.append("budgetGlobalId", req?.budgetGlobalId);
      }

      if(req?.structureId != undefined && req?.structureId){
        parametres = parametres.append("structureId", req?.structureId);
      }
      if(req?.montant != undefined && req?.montant){
        parametres = parametres.append("montant", req?.montant);
      }
     
      return this.http.get<any>(
        `${environment.baseUrl}source?page=${req?.page}&size=${req?.size}`, {
          params: parametres
        }
      );
    } else {
      return this.http.get<any>(
        `${environment.baseUrl}source?page=${0}&size=${100000}`, {
          params: parametres
        }
      );
    }
  }
   ////////////// END CRUD FOR BUDGET SERVICE /////////////////////////////

////////////// START CRUD FOR BESOIN FINANCEMENT SERVICE /////////////////////////////

createBesoin(besoin: any): Observable<any> {
 besoin.fundingTypeConfig = 'FINANCING_NEED';
  return this.http.post<any>(`${environment.baseUrl}fundingConfig`, besoin);
}

updateBesoin( besoinId:any, besoin: any): Observable<any> {
  besoin.fundingTypeConfig = 'FINANCING_NEED';
  return this.http.put<any>(`${environment.baseUrl}fundingConfig/${besoinId}`, besoin, {
    observe: 'response',
  });
}

deleteBesoin(besoinId: any): Observable<any> {
  return this.http.delete<any>(`${environment.baseUrl}fundingConfig/${besoinId}`, {
    observe: 'response',
  });
}

readAllBesoin(req?: any): Observable<any> {
  let parametres: HttpParams = new HttpParams();
  parametres = parametres.append("fundingTypeConfig", 'FINANCING_NEED');

  if (req) {
    
    if(req?.managementUnitId != undefined){
      parametres = parametres.append("managementUnitId",req?.managementUnitId);
    }
  
    if (req?.libelle != undefined && req?.libelle) {
      parametres = parametres.append("libelle", req?.libelle); 
    }

    if(req?.annee != undefined && req?.annee){
      parametres = parametres.append("annee", req?.annee);
    }
    if(req?.startingDate != undefined && req?.startingDate){
      parametres = parametres.append("startingDate", req?.startingDate);
    }
    if(req?.endingDate != undefined && req?.endingDate){
      parametres = parametres.append("endingDate", req?.endingDate);
    }
   
    if(req?.estimatedAmount != undefined && req?.estimatedAmount){
      parametres = parametres.append("estimatedAmount", req?.estimatedAmount);
    }
   
    if(req?.actualAmount != undefined && req?.actualAmount){
      parametres = parametres.append("actualAmount", req?.actualAmount);
    }
   
    return this.http.get<any>(
      `${environment.baseUrl}fundingConfig?page=${req?.page}&size=${req?.size}`, {
        params: parametres
      }
    );
  } else {
    return this.http.get<any>(
      `${environment.baseUrl}fundingConfig?page=${0}&size=${100000}`, {
        params: parametres
      }
    );
  }
}
 ////////////// END CRUD FOR BESOIN FINANCEMENT SERVICE /////////////////////////////

////////////// START CRUD FOR MOBILISATION SERVICE /////////////////////////////

createMobilisation(mobilisation: any): Observable<any> {
  mobilisation.fundingTypeConfig = 'MOBILISATION';
   return this.http.post<any>(`${environment.baseUrl}fundingConfig`, mobilisation);
 }
 
 updateMobilisation( mobilisationId:any, mobilisation: any): Observable<any> {
   mobilisation.fundingTypeConfig = 'MOBILISATION';
   return this.http.put<any>(`${environment.baseUrl}fundingConfig/${mobilisationId}`, mobilisation, {
     observe: 'response',
   });
 }
 
 deleteMobilisation(mobilisationId: any): Observable<any> {
   return this.http.delete<any>(`${environment.baseUrl}fundingConfig/${mobilisationId}`, {
     observe: 'response',
   });
 }
 readAllMobilisation(req?: any): Observable<any> {
   let parametres: HttpParams = new HttpParams();
   parametres = parametres.append("fundingTypeConfig", 'MOBILISATION');
     
   if (req) {
     
     if(req?.managementUnitId != undefined){
       parametres = parametres.append("managementUnitId",req?.managementUnitId);
     }
   
     if (req?.libelle != undefined && req?.libelle) {
       parametres = parametres.append("libelle", req?.libelle); 
     }
 
     if(req?.annee != undefined && req?.annee){
       parametres = parametres.append("annee", req?.annee);
     }
     if(req?.startingDate != undefined && req?.startingDate){
       parametres = parametres.append("startingDate", req?.startingDate);
     }
     if(req?.endingDate != undefined && req?.endingDate){
       parametres = parametres.append("endingDate", req?.endingDate);
     }
    
     if(req?.estimatedAmount != undefined && req?.estimatedAmount){
       parametres = parametres.append("estimatedAmount", req?.estimatedAmount);
     }
    
     if(req?.actualAmount != undefined && req?.actualAmount){
       parametres = parametres.append("actualAmount", req?.actualAmount);
     }
    
     return this.http.get<any>(
       `${environment.baseUrl}fundingConfig?page=${req?.page}&size=${req?.size}`, {
         params: parametres
       }
     );
   } else {
     return this.http.get<any>(
       `${environment.baseUrl}fundingConfig?page=${0}&size=${100000}`, {
         params: parametres
       }
     );
   }
 }
  ////////////// END CRUD FOR MOBILISATION SERVICE /////////////////////////////

  ////////////// START CRUD FOR EXECUTION SERVICE /////////////////////////////

createExecution(mobilisation: any): Observable<any> {
  mobilisation.fundingTypeConfig = 'EXECUTION';
   return this.http.post<any>(`${environment.baseUrl}fundingConfig`, mobilisation);
 }
 
 updateExecution( mobilisationId:any, mobilisation: any): Observable<any> {
   mobilisation.fundingTypeConfig = 'EXECUTION';
   return this.http.put<any>(`${environment.baseUrl}fundingConfig/${mobilisationId}`, mobilisation, {
     observe: 'response',
   });
 }
 
 deleteExecution(mobilisationId: any): Observable<any> {
   return this.http.delete<any>(`${environment.baseUrl}fundingConfig/${mobilisationId}`, {
     observe: 'response',
   });
 }
 
 readAllExecution(req?: any): Observable<any> {
   let parametres: HttpParams = new HttpParams();
   parametres = parametres.append("fundingTypeConfig", 'EXECUTION');
     
   if (req) {
     
     if(req?.managementUnitId != undefined){
       parametres = parametres.append("managementUnitId",req?.managementUnitId);
     }
   
     if (req?.libelle != undefined && req?.libelle) {
       parametres = parametres.append("libelle", req?.libelle); 
     }
 
     if(req?.annee != undefined && req?.annee){
       parametres = parametres.append("annee", req?.annee);
     }
     if(req?.startingDate != undefined && req?.startingDate){
       parametres = parametres.append("startingDate", req?.startingDate);
     }
     if(req?.endingDate != undefined && req?.endingDate){
       parametres = parametres.append("endingDate", req?.endingDate);
     }
    
     if(req?.estimatedAmount != undefined && req?.estimatedAmount){
       parametres = parametres.append("estimatedAmount", req?.estimatedAmount);
     }
    
     if(req?.actualAmount != undefined && req?.actualAmount){
       parametres = parametres.append("actualAmount", req?.actualAmount);
     }
    
     return this.http.get<any>(
       `${environment.baseUrl}fundingConfig?page=${req?.page}&size=${req?.size}`, {
         params: parametres
       }
     );
   } else {
     return this.http.get<any>(
       `${environment.baseUrl}fundingConfig?page=${0}&size=${100000}`, {
         params: parametres
       }
     );
   }
 }
  ////////////// END CRUD FOR EXECUTION SERVICE /////////////////////////////
 }
 
