import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  addDocument(document: any, file: File | null): Observable<any> {
    console.log("file ", file)
    const formData = this.appendFile(document, file);
    return this.http.post<any>(`${this.baseUrl}documents`, formData);
  }

  updateDocument(documentId: string, document: any, file: File | null): Observable<any> {
    const formData = this.appendFile(document, file);
    return this.http.put<any>(`${this.baseUrl}documents/${documentId}`, formData);
  }

  deleteDocument(documentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}documents/${documentId}`);
  }

  updateStatut(id: number, statut: string): Observable<any> {
    return this.http.put<any>(
       `${environment.baseUrl}documents/${id}/statut`,
       null,
       { params: { statutType: statut } }
     );
   }

  updateDocumentType(documentTypeId: number, document: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}documentTypes/${documentTypeId}`, document, {
      observe: 'response',
    });
  }

  readFile(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}documents/${id}/_download`, {
      responseType: 'blob'
    });
  }

  readDocuments(req?: any): Observable<any> {
    const params = this.buildParams(req);
    const page = req?.page ?? 0;
    const size = req?.size ?? 100000;
  
    return this.http.get<any>(
      `${this.baseUrl}documents`,
      { params: params.append('page', page.toString()).append('size', size.toString()) }
    );
  }
  
  private buildParams(req?: any): HttpParams {
    let params = new HttpParams();
    const paramMapping: Record<string, string> = {
      categoryId: 'categoryId',
      category: 'category',
      libelle: 'libelle',
      author: 'author',
      date: 'date',
      documentTypeId: 'documentTypeId'
    };
  
    if (req) {
      Object.entries(paramMapping).forEach(([key, value]) => {
        if (req[key] != null) {
          params = params.append(value, req[key]);
        }
      });
    }
  
    return params;
  }
  
  private appendFile(document: any, file: File | null): FormData {
    const formData = new FormData();
    formData.append('DocumentDTO', JSON.stringify(document));
    if (file) {
      formData.append('file', file, file.name);
    }
    return formData;
  }
}


