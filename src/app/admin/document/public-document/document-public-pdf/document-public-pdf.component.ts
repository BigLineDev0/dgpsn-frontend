import { SafeUrlPipe } from '@/app/util/pipe/safe-url/safe-url.pipe';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgbPagination, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SkeletonModule } from 'primeng/skeleton';
import { DocumentPublicService } from 'src/app/services/documentPublic/document-public.service';
import { DocumentPdfComponent } from '../../document-pdf/document-pdf.component';
import { FormDocumentComponent } from '../../form-document/form-document.component';
import { ListDocumentComponent } from '../../list-document/list-document.component';
import { ViewDocumentComponent } from '../../view-document/view-document.component';
import { DocumentPublicFormComponent } from '../document-public-form/document-public-form.component';
import { DocumentPublicListComponent } from '../document-public-list/document-public-list.component';
import { FolderFormComponent } from '../folder/folder-form/folder-form.component';

@Component({
  selector: 'app-document-public-pdf',
  templateUrl: './document-public-pdf.component.html',
  styleUrls: ['./document-public-pdf.component.scss'],
    imports: [
       FormDocumentComponent,
       CommonModule,
       SafeUrlPipe ,
       ViewDocumentComponent,
       NgbPagination,
       MatHeaderRow,
       MatRow,
       NgIf,
       MatRowDef,
       MatIconModule,
       DocumentPdfComponent,
       DocumentPublicPdfComponent,
       MatHeaderRowDef,
       MatColumnDef,
       MatHeaderCell,
       MatCell,
       SpinnerComponent,
       MatTable,
       MatHeaderCellDef,
       MatCellDef,
       FolderFormComponent,
       ListDocumentComponent,
       DocumentPdfComponent,    
       DocumentPublicFormComponent,
       SkeletonModule,
       DocumentPublicListComponent,
       NgbTooltipModule,
     ],
})
export class DocumentPublicPdfComponent {

  @Input() documentId: any

  @Input() imageId: any;

  @Input() agentId: any;


  @Input() requeteId:any;

  document: any
  @Input() reviewId:any
  file: any
  dataLocalUrl: any
  constructor(private documentPublicService: DocumentPublicService,
    private route: ActivatedRoute)
     {
          // this.documentId = this.route.snapshot.params.id;
    }

  ngOnInit(): void {

    this.readFile()

  }
  readFile(){
      if(this.documentId){
        this.documentPublicService.readFile(this.documentId).subscribe(data=>{

          // those two line help to view the pdf
          var file = new Blob([data], {type: 'application/pdf'});
          this.dataLocalUrl = URL.createObjectURL(file);

        })
      }
  }

  back(){
    // this._location.back();
  }

}
