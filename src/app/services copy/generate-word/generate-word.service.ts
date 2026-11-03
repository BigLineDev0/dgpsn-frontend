import { Injectable } from '@angular/core';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GenerateWordService {

  constructor(private http: HttpClient) { }

  readTemplateWord(path: string): Observable<any> {
    return this.http.get(path, { responseType: 'arraybuffer' });
  }

  generateDocument(data: any, template: ArrayBuffer, fileName: string) {
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(data);

    try {
      doc.render();
    } catch (error) {
      console.error();
      throw error;
    }

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    saveAs(out, fileName+'.docx');
  }
}
