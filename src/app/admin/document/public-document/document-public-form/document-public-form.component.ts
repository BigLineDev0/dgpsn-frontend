import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { StructureService } from 'src/app/services/structure/structure.service';
import { SubSectorService } from 'src/app/services/sub-sector/sub-sector.service';
import { TypeDocumentService } from 'src/app/services/type-document/type-document.service';
import { Alertes } from 'src/app/util/alerte';
import { FormDocumentComponent } from '../../form-document/form-document.component';
import { ViewDocumentComponent } from '../../view-document/view-document.component';
import { DocumentPublicService } from '@/app/services/documentPublic/document-public.service';
import { FolderService } from '@/app/services/folder/folder.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-document-public-form',
  templateUrl: './document-public-form.component.html',
  styleUrls: ['./document-public-form.component.scss'],
    imports: [
    FormDocumentComponent,
    NgSelectModule,
    CommonModule,
    ReactiveFormsModule,
    ViewDocumentComponent,
    NgbPagination,
    MatHeaderRow,
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
    MatCellDef
  ],
  standalone:true
})
export class DocumentPublicFormComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  @Input() documentToEdit: any;

  form!: FormGroup;

  typeDocuments: any;

  dossiers: any;

  partners: any;

  sectors: any;

  file: any;

  @Input() search: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private typeDocumentService: TypeDocumentService,
    private partnersService: StructureService,
    private subSectorService: SubSectorService,
    private folderService: FolderService,
    private documentPublicService: DocumentPublicService
  ) {}

  ngOnInit(): void {
    this.getReferentiels();

    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      titre: ['', Validators.required],
      date: [null],
      authors: [null],
      themes: [null],
      documentTypeId: [null],
      folderId: [null],
      partnerIds: [null],
      sectorIds: [null]
    });

    if(this.documentToEdit !== undefined) {
      this.loadFieds();
    }
  }

  loadFieds() {
    if(this.documentToEdit !== undefined) {
      this.form.get('titre')?.setValue(this.documentToEdit.titre);
      this.form.get('date')?.setValue(this.documentToEdit.date);
      this.form.get('authors')?.setValue(this.documentToEdit.authors);
      this.form.get('themes')?.setValue(this.documentToEdit.themes);
      this.form.get('documentTypeId')?.setValue(this.documentToEdit.documentType.id);
      this.form.get('folderId')?.setValue(this.documentToEdit.folder.id);
      this.form.get('partnerIds')?.setValue(this.documentToEdit.partners.map((p:any) => p.id));
      this.form.get('sectorIds')?.setValue(this.documentToEdit.sectors.map((s:any) => s.id));
    }
  }

  fileChange(event: any){
    this.file = event.target.files[0];
  }

  save() {
    const document = this.form.value;

    if(this.documentToEdit === undefined) {
      this.createDocument(document)
    } else {
      this.updateDocument(document);
    }
  }

  createDocument(document: any) {
    this.documentPublicService.createDocument(document, this.file).subscribe({
      next: reponse => Alertes.alerteAddSuccess(),
      error: response => Alertes.alerteAddDanger(response),
      complete: () => this.close()
    })
  }

  updateDocument(document: any) {
    this.documentPublicService.updateDocument(this.documentToEdit.id, document).subscribe({
      next: reponse => Alertes.alerteUpdateSuccess(),
      error: response => Alertes.alerteUpdateDanger(response),
      complete: () => this.close()
    })
  }

  doSearch() {
    var searchForm = this.form.value;
    searchForm.page = 0;
    searchForm.size = 20;

    this.searchEvent.emit(searchForm);

    this.modalService.dismissAll();
  }

  close() {
    this.submit.emit(true);
    this.modalService.dismissAll();
  }

  getReferentiels() {
    this.getDocumentTypes();

    this.getPartners();

    this.getSubSectors();

    this.getFolders();

  }

  getDocumentTypes() {
    this.typeDocumentService.readTypesDocument({page: 0, size: 10000000}).subscribe(response => {
      this.typeDocuments = response.content;
    })
  }

  getPartners() {
    this.partnersService.readStructures({page: 0, size: 10000000, typeStructure: 'Partenaire'}).subscribe(response => {
      this.partners = response.content;
    })
  }

  getSubSectors() {
    this.subSectorService.readSubsectors({page: 0, size: 10000000}).subscribe(response => {
      this.sectors = response.content;
    })
  }

  getFolders() {
    this.folderService.readAllFolders().subscribe(response => {
      this.dossiers = response;
    })
  }
}

