import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from "@/app/services/document/document.service";
import {ReviewService} from "@/app/services/review/review.service";
import {QueryService} from "@/app/services/query/query.service";
import {ActivatedRoute} from "@angular/router";
import {MediathequeService} from "@/app/services/mediatheque/mediatheque.service";
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { SkeletonModule } from 'primeng/skeleton';
import { FormDocumentComponent } from '../form-document/form-document.component';
import { ListDocumentComponent } from '../list-document/list-document.component';
import { DocumentPublicFormComponent } from '../public-document/document-public-form/document-public-form.component';
import { FolderFormComponent } from '../public-document/folder/folder-form/folder-form.component';
import { ViewDocumentComponent } from '../view-document/view-document.component';
import { SafeUrlPipe } from '@/app/util/pipe/safe-url/safe-url.pipe';

@Component({
  selector: 'app-document-pdf',
  imports: [
      FormDocumentComponent,
      CommonModule,
      SafeUrlPipe ,
      MatRow,
      NgIf,
      MatRowDef,
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
      SkeletonModule
    ],
  standalone:true,
  templateUrl: './document-pdf.component.html',
  styleUrl: './document-pdf.component.scss'
})
export class DocumentPdfComponent implements OnInit{

  @Input() documentId: any
  @Input() imageId: any;
  @Input() agentId: any;
  @Input() requeteId:any;
  @Input() reviewId:any
  document: any
  file: any
  dataLocalUrl: any
  constructor(private readonly documentService: DocumentService,
              private readonly reviewService: ReviewService,
              private readonly query:QueryService,
              private readonly _location: Location,
              private readonly mediathequeService: MediathequeService) {}

  ngOnInit(): void {
    this.readFile();
  }

  readFile(){
    if(this.documentId){
      this.documentService.readFile(this.documentId).subscribe(data=>{
        var file = new Blob([data], {type: 'application/pdf'});
        this.dataLocalUrl = URL.createObjectURL(file);
      })
    }else if(this.reviewId){
      this.reviewService.readFile(this.reviewId).subscribe(data=>{
        var file = new Blob([data], {type: 'application/pdf'});
        this.dataLocalUrl = URL.createObjectURL(file);
      })
    }else if(this.requeteId){
      this.query.readFile(this.requeteId).subscribe(data=>{
        var file = new Blob([data], {type: 'application/pdf'});
        this.dataLocalUrl = URL.createObjectURL(file);
      })
    } else if(this.imageId) {
      this.mediathequeService.readFile(this.imageId).subscribe(data=>{
        var file = new Blob([data], {type: 'image/jpg'});
        this.dataLocalUrl = URL.createObjectURL(file);
      })
    }
  }

}
