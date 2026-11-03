import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from 'src/app/services/folder/folder.service';
import { Alertes } from 'src/app/util/alerte';
import { FormDocumentComponent } from '../../../form-document/form-document.component';
import { ViewDocumentComponent } from '../../../view-document/view-document.component';

@Component({
  selector: 'app-folder-form',
  templateUrl: './folder-form.component.html',
  styleUrls: ['./folder-form.component.scss'],
     imports: [
      CommonModule,
      ReactiveFormsModule,
      FormDocumentComponent,
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
export class FolderFormComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @Input() folder: any;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private folderService: FolderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  save() {
    if(this.form.valid) {
      if(this.folder === undefined) {
        this.saveFolder();
      } else {
        this.saveSubFolder();
      }
    }
  }

  saveFolder() {
    this.folderService.createFolder(this.form.value).subscribe({
      next: value => Alertes.alerteAddSuccess(),
      error: value => Alertes.alerteAddDanger(value),
      complete: () => this.close()
    })
  }
  

  saveSubFolder() {
    this.folderService.createSubFolder(this.folder.id, this.form.value).subscribe({
      next: value => Alertes.alerteAddSuccess(),
      error: value => Alertes.alerteAddDanger(value),
      complete: () => this.close()
    })
  }


  close() {
    this.submit.emit(true);
    this.modalService.dismissAll();
  }

}
