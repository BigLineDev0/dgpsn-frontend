import { Routes } from '@angular/router';
import {ListDocumentComponent} from "@/app/admin/document/list-document/list-document.component";
import { DocumentMainComponent } from './public-document/document-main/document-main.component';

export const DOCUMENT_ROUTES: Routes = [

    // {path: 'document', component: ListDocumentComponent},
     {path: 'document',component: DocumentMainComponent
      },
];
