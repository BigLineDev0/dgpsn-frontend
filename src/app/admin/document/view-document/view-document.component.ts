import {Component, Input} from '@angular/core';
import {DocumentService} from "@/app/services/document/document.service";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SafeUrlPipe} from "@/app/util/pipe/safe-url/safe-url.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-document',
  standalone:true,
  imports: [
    SafeUrlPipe,
    CommonModule
  ],
  templateUrl: './view-document.component.html',
  styleUrl: './view-document.component.scss'
})
export class ViewDocumentComponent {
  @Input() documentId: any
  @Input() modalRef!: NgbModalRef;
  file: any
  dataLocalUrl: any
  constructor(private readonly documentService: DocumentService) {}

  ngOnInit(): void {
    this.readFile()
  }
  readFile(){
    if(this.documentId){
      this.documentService.readFile(this.documentId).subscribe(data=>{

        // those two line help to view the pdf
        var file = new Blob([data], {type: 'application/pdf'});
        this.dataLocalUrl = URL.createObjectURL(file);

      })
    }
  }

}
