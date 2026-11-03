import {Component, Input} from '@angular/core';
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SafeUrlPipe} from "@/app/util/pipe/safe-url/safe-url.pipe";

@Component({
  selector: 'app-viewgenereted-document',
  imports: [
    SafeUrlPipe
  ],
  templateUrl: './viewgenereted-document.component.html',
  styleUrl: './viewgenereted-document.component.scss'
})
export class ViewgeneretedDocumentComponent {

  @Input() modalRef!: NgbModalRef;
  @Input() dataLocalUrl: any
}
