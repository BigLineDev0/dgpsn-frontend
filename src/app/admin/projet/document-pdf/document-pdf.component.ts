import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/services/document/document.service';
import { Location } from '@angular/common';
import { ReviewService } from 'src/app/services/review/review.service';
import { QueryService } from 'src/app/services/query/query.service';
import { MediathequeService } from 'src/app/services/mediatheque/mediatheque.service';

@Component({
  selector: 'app-document-pdf',
  templateUrl: './document-pdf.component.html',
  styleUrls: ['./document-pdf.component.scss']
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
  constructor(private documentService: DocumentService, private reviewService: ReviewService, private query:QueryService,
    private route: ActivatedRoute,private _location: Location, private mediathequeService: MediathequeService)
     {
          // this.documentId = this.route.snapshot.params.id;
    }

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

  back(){
    this._location.back();
  }

}
