// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
// import {Alertes} from "@/app/util/alerte";
// import {RESPONSE_STATUS} from "@/app/util/response-status";
// import {Helper} from "@/app/util/helper";
// import {CategorieDocumentService} from "@/app/services/categorieDocument/categorie-document.service";
// import {ManangementUnitService} from "@/app/services/manangement-unit/manangement-unit.service";
// import {DocumentService} from "@/app/services/documentService/document-service.service";
// import {NgForOf, NgIf} from "@angular/common";
// import {NgOptionComponent, NgSelectComponent} from "@ng-select/ng-select";

// @Component({
//   selector: 'app-form-document',
//   imports: [
//     NgIf,
//     ReactiveFormsModule,
//     NgSelectComponent,
//     NgOptionComponent,
//     NgForOf
//   ],
//   templateUrl: './form-document.component.html',
//   styleUrl: './form-document.component.scss'
// })
// export class FormDocumentComponent implements OnInit{
//   @Input() category: any
//   @Input() categoryId: any
//   @Output() submit: EventEmitter<boolean> = new EventEmitter();
//   @Output() search: EventEmitter<boolean> = new EventEmitter();
//   @Input() documentToUpdate: any = undefined;
//   @Input() modal!: NgbModalRef;
//   @Input() issearch!: boolean;
//   form!: FormGroup;
//   typeDocmnts: any;
//   file!: File;
//   linkedObjects: any;
//   categories: any;
//   desableCategorie: boolean = false;
//   desableCategoryId: boolean = false;

//   constructor(
//       private readonly documentService: DocumentService,
//       private readonly categorieDocumentService: CategorieDocumentService,
//       private readonly managementUnitService: ManangementUnitService

//   ) { }

//   ngOnInit(): void {
//     if (this.category){
//       this.desableCategorie = true;
//     }else {
//       this.desableCategorie = false;
//     }
//     if (this.categoryId){
//       this.desableCategoryId = true;
//     } else {
//       this.desableCategoryId = false;
//     }
//     // alert(this.category)
//     this.initForm()
//     this.getAllCategories()
//     this.refreshLinked()
//     this.getTypeDocuments()
//     if (this.documentToUpdate) {
//       this.edit()
//     }
//   }

//   initForm() {
//     this.form = new FormGroup({
//       code: new FormControl(''),
//       libelle: new FormControl('', Validators.required),
//       documentTypeId: new FormControl(null, Validators.required),
//       category: new FormControl(this.category),
//       categoryId: new FormControl(this.categoryId),
//       date: new FormControl(null),
//       author: new FormControl(null),
//       path: new FormControl(null),
//     })
//   }

//   selectionChange(val: any) {
//     // if (val.collectif === true) {
//     //   this.inputAgent = false;
//     // }
//     // //ici
//     // if (val.collectif === false) {
//     //   this.inputAgent = true;
//     // }
//   }

//   save() {
//     const document = this.form.value;
//     if (this.documentToUpdate === undefined) {
//       this.createDocument()
//     } else {
//       this.updateDocument();
//     }

//   }

//   fileChange(event: any) {
//     this.file = event.target.files[0];
//   }

//   getTypeDocuments() {
//     // , categoryDocument: this.category
//     let pageOptions = { page: 0, size: 100 }
//     this.categorieDocumentService.readCategorieDocuments(pageOptions).subscribe({
//       next: response => {
//         console.log("response",response);
        
//         this.typeDocmnts = response.content
//       },
//       error: response => { },
//     })
//   }

//   updateDocument() {
//     this.documentService.updateDocument(this.documentToUpdate.id, this.form.value, this.file).subscribe({
//       next: (value: any) => {
//         if (value.status == RESPONSE_STATUS.OK) {
//           Alertes.alerteUpdateSuccess();
//           this.close()
//         } else {
//           Alertes.alerteUpdateDanger(value.message)
//         }
//       }
//     })
//   }

//   createDocument() {
//     this.documentService.addDocument(this.form.value, this.file).subscribe({
//       next: (value: any) => {
//         if (value.status == RESPONSE_STATUS.OK) {
//           Alertes.alerteAddSuccess();
//           this.close()
//         } else {
//           Alertes.alerteAddDanger(value.message)
//         }
//       }
//     })
//   }

//   close() {
//     this.submit.emit(true);
//     this.modal.close()
//   }
//   edit() {
//     this.form.get('libelle')?.setValue(this.documentToUpdate?.libelle);
//     this.form.get('documentTypeId')?.setValue(this.documentToUpdate?.documentType?.id);
//     this.form.get('date')?.setValue(Helper.editDate(this.documentToUpdate?.date));
//     this.form.get('agentId')?.setValue(this.documentToUpdate?.agent?.id);
//     this.form.get('category')?.setValue(this.documentToUpdate?.category);
//     this.form.get('categoryId')?.setValue(this.documentToUpdate?.categoryId);
//     this.form.get('path')?.setValue(this.documentToUpdate?.path);
//     this.form.get('author')?.setValue(this.documentToUpdate?.author);
//     this.form.get('code')?.setValue(this.documentToUpdate?.code);
//     this.getTypeDocuments()
//   }

//   getAllCategories() {
//     this.categorieDocumentService.readCategorieDocumentTypes().subscribe({
//       next: response => {
//         this.categories = response.body;
//         // console.log("categories ", this.categories)
//       },
//       error: response => { },
//       complete: () => console.log("complete")
//     })
//   }

//   getManagementUnit(pageOptions: any) {
//     this.managementUnitService.readAllProgrammes(pageOptions).subscribe(
//         {
//           next: response => {
//             this.linkedObjects = response.content;
//             // console.log('liste programmes :', response);
//           },
//           error: err => {
//             console.log(err);
//           },
//           complete: () => {

//           }
//         })
//   }

//   refreshLinked() {
//     this.category = this.form.get("category")?.value;
//     if (this.category == 'PROJECT') {
//       this.getManagementUnit({type:'PROJECT'});
//     } else if (this.category == 'PROGRAMME') {
//       this.getManagementUnit({type:'PROGRAMME'});
//     } else if (this.category == 'ACTIVITY') {
//       this.getManagementUnit({type:'ACTIVITY'});
//     }

//     this.getTypeDocuments()
//   }

//   doSearch(){
//     // console.log("form value", this.form.value)
//     this.search.emit(this.form.value)
//   }


// }

import { ResponseApi } from '@/app/util/response.model';
import { NgIf, NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent, NgOptionComponent } from '@ng-select/ng-select';
import { CategorieDocumentService } from 'src/app/services/categorieDocument/categorie-document.service';
import { DocumentService } from 'src/app/services/documentService/document-service.service';
import { ManangementUnitService } from 'src/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { RESPONSE_STATUS } from 'src/app/util/response-status';




@Component({
  selector: 'app-form-document',
  templateUrl: './form-document.component.html',
  styleUrls: ['./form-document.component.scss'],
    imports: [
    NgIf,
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    NgForOf
  ],
  standalone:true
})
export class FormDocumentComponent {
  @Input() category: any
  @Input() categoryId: any
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() documentToUpdate: any = undefined;
  form!: FormGroup;
  typeDocmnts: any;
  file!: File
  @Input() modal!: NgbModalRef;
  linkedObjects: any;
  categories: any;
  desableCategorie!: boolean;
  desableCategoryId!: boolean;
  @Input() issearch!: Boolean

  constructor(
    private readonly documentService: DocumentService,
    private readonly categorieDocumentService: CategorieDocumentService,
    private readonly managementUnitService: ManangementUnitService,
  ) { }

  ngOnInit(): void {
    // alert(this.category)
    if(this.category){
      this.desableCategorie = true;
    }else {
      this.desableCategorie = false;
    }
    if(this.categoryId){
      this.desableCategoryId = true;
    }else {
      this.desableCategoryId = false;
    }
    // alert(this.category)
    this.initForm()
    this.getAllCategories()
    this.refreshLinked()
    this.getTypeDocuments()
    if (this.documentToUpdate) {
      this.edit()
    }
  }

  initForm() {
    this.form = new FormGroup({
      code: new FormControl(''),
      libelle: new FormControl('', Validators.required),
      documentTypeId: new FormControl(null, Validators.required),
      category: new FormControl(this.category),
      categoryId: new FormControl(this.categoryId),
      date: new FormControl(null),
      author: new FormControl(null),
      path: new FormControl(null),
    })
  }

  selectionChange(val: any) {
    // if (val.collectif === true) {
    //   this.inputAgent = false;
    // } 
    // //ici
    // if (val.collectif === false) {
    //   this.inputAgent = true;
    // }
  }

  save() {
    const document = this.form.value;
    if (this.documentToUpdate === undefined) {
      this.createDocument()
    } else {
      this.updateDocument();
    }

  }

  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  getTypeDocuments() {
    let pageOptions = { page: 0, size: 100, categoryDocument: this.category }
    this.categorieDocumentService.readCategorieDocuments(pageOptions).subscribe({
      next: response => {
        this.typeDocmnts = response.content
      },
      error: response => { },
    })
  }

  updateDocument() {
    this.documentService.updateDocument(this.documentToUpdate.id, this.form.value, this.file).subscribe({
      next: (value: ResponseApi) => {
        if (value.status == RESPONSE_STATUS.OK) {
          Alertes.alerteUpdateSuccess();
          this.close()
        } else {
          Alertes.alerteUpdateDanger(value.message)
        }
      }
    })
  }

  createDocument() {
    this.documentService.addDocument(this.form.value, this.file).subscribe({
      next: (value: ResponseApi) => {
        if (value.status == RESPONSE_STATUS.OK) {
          Alertes.alerteAddSuccess();
          this.close()
        } else {
          Alertes.alerteAddDanger(value.message)
        }
      }
    })
  }

  close() {
    this.submit.emit(true);
    this.modal.close()
  }
  edit() {
    this.form.get('libelle')?.setValue(this.documentToUpdate?.libelle);
    this.form.get('documentTypeId')?.setValue(this.documentToUpdate?.documentType?.id);
    this.form.get('date')?.setValue(Helper.editDate(this.documentToUpdate?.date));
    this.form.get('agentId')?.setValue(this.documentToUpdate?.agent?.id);
    this.form.get('category')?.setValue(this.documentToUpdate?.category);
    this.form.get('categoryId')?.setValue(this.documentToUpdate?.categoryId);
    this.form.get('path')?.setValue(this.documentToUpdate?.path);
    this.form.get('author')?.setValue(this.documentToUpdate?.author);
    this.form.get('code')?.setValue(this.documentToUpdate?.code);
    this.getTypeDocuments()
  }

  getAllCategories() {
    this.categorieDocumentService.readCategorieDocumentTypes().subscribe({
      next: response => {
        this.categories = response.body;
        // console.log("categories ", this.categories)
      },
      error: response => { },
      complete: () => console.log("complete")
    })
  }

  getManagementUnit(pageOptions: any) {
    this.managementUnitService.readAllProgrammes(pageOptions).subscribe(
      {
        next: response => {
          this.linkedObjects = response.content;
          // console.log('liste programmes :', response);
        },
        error: err => {
          console.log(err);
        },
        complete: () => {

        }
      })
  }

  getEntreprises() {
    let params = { page: 0, size: 20000 }
    // this.entrepriseService.readEntreprises(params).subscribe({
    //   next: response => {
    //     this.linkedObjects = response?.payload;
    //   },
    //   error: err => console.log("error"),
    //   complete: () => console.log("complete")
    // });
  }
  refreshLinked() {
    this.category = this.form.get("category")?.value;
    if (this.category == 'PROJECT') {
      this.getManagementUnit({type:'PROJECT'});
    } else if (this.category == 'PROGRAMME') {
      this.getManagementUnit({type:'PROGRAMME'});
    } else if (this.category == 'ACTIVITY') {
      this.getManagementUnit({type:'ACTIVITY'});
    } else if (this.category == 'ENTREPRISE') {
      this.getEntreprises()
    } 

    this.getTypeDocuments()
  }

  doSearch(){
    // console.log("form value", this.form.value)
    this.search.emit(this.form.value)
  }


}
