import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FolderService } from 'src/app/services/folder/folder.service';
import { Alertes } from 'src/app/util/alerte';
import { FormDocumentComponent } from '../../../form-document/form-document.component';
import { ViewDocumentComponent } from '../../../view-document/view-document.component';
import { FolderFormComponent } from '../folder-form/folder-form.component';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  data: any,
  level: number;
}

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
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
      MatCellDef,
      FolderFormComponent
    ],
})
export class FolderListComponent implements OnInit, OnChanges {

  @Output() clickedFolder: EventEmitter<number> = new EventEmitter();

  @Input() refresh!: boolean;

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.subFolders && node.subFolders.length > 0,
      name: node.name,
      data: node,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.subFolders,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  pageOptions: any = { page: 0, size: 20 };

  loadingIndicator = true;

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  updateFolder: any;

  constructor(
    private modalService: NgbModal,
    private folderService: FolderService
  ) {}

  ngOnInit(): void {
    this.getFolders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshListFolders(changes);
  }

  getFolders() {
    this.folderService.readParentsOnly().subscribe({
      next: value => this.dataSource.data = value,
      error: value => {},
      complete: () => this.loadingIndicator = false
    })
  }

  refreshListFolders(changes: SimpleChanges) {
    if(changes['refresh'].currentValue) {
      this.getFolders();
    }
  }

  getClickedFolder(folderId: any) {
    this.clickedFolder.emit(folderId);
  }

  openNewFolder(content: TemplateRef<any>) {
    this.openModal(content, 'md');
  }

  openForUpdate(content: TemplateRef<any>, folder: any) {
    this.updateFolder = folder;

    this.openModal(content, 'md');
  }


  openModal(content: TemplateRef<any>, size: string) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteFolder(folderId: any) {
    Alertes.confirmAction(
      'Suppression dossier',
      'Ce dossier va être supprimé', 
      () => {
        this.folderService.deleteFolder(folderId).subscribe({
          next: value => Alertes.alerteAddSuccess(),
          error: value => Alertes.alerteAddDanger(),
          complete: () => this.getFolders()
        })
      }
    );
  }

  close(event: any) {
    if(event) {
      this.getFolders();
    }
  }
}
