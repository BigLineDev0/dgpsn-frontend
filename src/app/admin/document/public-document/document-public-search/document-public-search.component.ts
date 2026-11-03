import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-document-public-search',
  templateUrl: './document-public-search.component.html',
  styleUrls: ['./document-public-search.component.scss']
})
export class DocumentPublicSearchComponent implements OnInit {

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      titre: [''],
      date: [null],
      authors: [null],
      themes: [null],
      documentType: [null],
      partner: [null],
      sector: [null]
    });
  }

  doSearch() {
    var searchForm = this.form.value;
    searchForm.page = 0;
    searchForm.size = 20;

    console.log('DOC_SEARCH: ', searchForm)

    this.searchEvent.emit(searchForm);
  }
}
