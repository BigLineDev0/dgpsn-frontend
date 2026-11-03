import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { Alertes } from 'src/app/util/alerte';

import { ContentChange, SelectionChange } from 'ngx-quill';
import { NgbAccordionModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserAlertComponent } from '../user-alert/user-alert.component';
import { QuillModule } from 'ngx-quill';
import { TextFormatterPipe } from '@/app/util/pipe/text/text-formatter.pipe';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TemplateService } from '@/app/services/template/template.service';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-edit-alerte',
  templateUrl: './edit-alerte.component.html',
  styleUrls: ['./edit-alerte.component.scss'],
  standalone:true,
    imports:[
    CommonModule,
        NgbDropdownModule,
        NgbDatepickerModule,
        ReactiveFormsModule,
        NgbAccordionModule,
        NgSelectModule,
        QuillModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTooltipModule,
        NgbNavModule,
        NgbCollapseModule,
        NgbAccordionModule,
        HasAnyAuthorityDirective,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule ,
        MatRippleModule,
        TextFormatterPipe,
        ListboxModule,
        FormsModule,
        MultiSelectModule,
        MaterialModule,
       UserAlertComponent,
  ]

})
export class EditAlerteComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() label: string = '';
  @Input() templateToUpdate: any;
  @Input() isSearch!: boolean;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() categorie!: string;
  typeAlertes: any;
  @Input() categorieName: any;

  form!: FormGroup;

  profils: any = [];

  priorites = [];

  // typeAlertes: any = [];

  tags: any = [];

  models: any = [];

  users: any = [];
  selectedItems: any = []



  //===================QuILL================================
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video']
      ],
    },
  }
  allTypeAlertes: any;
  selecteds: any;
  selectAll: any;
  index: any;

  constructor(
    private templateService: TemplateService,
    private profileService: ProfilService,
    private modalService: NgbModal
  ) {
    this.models.push({ id: 0, profiles: [] });
  }

  ngOnInit(): void {
    this.initForm();
    this.tags = this.templateToUpdate?.typeAlerte?.tags;
    if (this.templateToUpdate != undefined) {
      this.editForm();
    }

    this.getAllTypeAlerte();

    // this.loadTags()
    this.getAllPriorities();

    // this.getAllProfiles();
    // this.getAlerteTypeNotAdded();
  }

  initForm() {
    this.form = new FormGroup(
      {
        libelle: new FormControl(''),
        typeAlerte: new FormControl('', Validators.required),
        priority: new FormControl('', Validators.required),
        deadlines: new FormControl(''),
        sendMail: new FormControl(''),
        sendSms: new FormControl(''),
        message: new FormControl('', Validators.required),
        profileIds: new FormControl('', Validators.required),
        description: new FormControl('')
      }
    );
  }


editForm() {
  this.templateService.readTemplate(this.templateToUpdate?.id).subscribe({
    next: (value) => {
      this.templateToUpdate = value.body;
      this.form.get('libelle')?.setValue(this.templateToUpdate?.libelle);
      this.form.get('typeAlerte')?.setValue(this.templateToUpdate?.typeAlerte?.name);
      this.form.get('priority')?.setValue(this.templateToUpdate?.priority?.name);
      this.form.get('deadlines')?.setValue(this.templateToUpdate?.deadlines);
      this.form.get('sendMail')?.setValue(this.templateToUpdate?.sendMail);
      this.form.get('sendSms')?.setValue(this.templateToUpdate?.sendSms);
      this.form.get('message')?.setValue(this.templateToUpdate?.message);
      this.form.get('profileIds')?.setValue(this.templateToUpdate?.profiles?.map((a: any) => a.id));
      this.models[0].profiles = this.templateToUpdate?.profiles;
      this.selectedItems = this.templateToUpdate?.profiles;
      this.form.get('description')?.setValue(this.templateToUpdate?.typeAlerte?.description);
      console.log("form", this.form.value);
    }
  });
}
  create() {
    const templateRequest = this.form.value;
    templateRequest.profileIds = this.selectedItems.map((profile:any) => profile.id);
    templateRequest.categorieAlerte = this.categorieName;
    console.log("templateRequest", templateRequest);

    if (!this.templateToUpdate) {
      this.templateService.addTemplate(templateRequest).subscribe({
        next: value => {
          Alertes.alerteAddSuccess();
        },
        error: value => {
          console.log("value",value);
          
          Alertes.errorPopPup("Error", "Problème détecté: " + value?.error?.errors)
        },
        complete: () => {
          this.close();
        }
      })

    }
      else {
        templateRequest.categorieAlerte = this.templateToUpdate?.categorieAlerte?.name
        this.templateService.updateTemplate(this.templateToUpdate.id, templateRequest).subscribe({
        next: (data) => {
          Alertes.alerteUpdateSuccess();
          this.close();
        },
        error: (error) => {
          Alertes.alerteUpdateDanger(error.error.message)
        }
      })
    }

  }

  close() {
    this.submit.emit(true);
  }

  getAllTypeAlerte() {
    this.templateService.readAllTypeAlerte(this.categorieName).subscribe({
      next: value => {this.allTypeAlertes = value;
        // console.log("allTypeAlertes",this.allTypeAlertes);

      },
    })
  }

  getAllPriorities() {
    this.templateService.readAllPriorities().subscribe({
      next: value => this.priorites = value
    })
  }

  getAllProfiles() {
    this.profileService.readProfiles().subscribe({
      next: value => {
        this.profils = value.content;
      }
    })

  }

  loadTags(event: any) {
    this.tags = event.tags;
  }

  addTag(code: string) {
    let value = this.form.value.message;

    if (!value) {
      value = '<p>'.concat(code).concat('</p>');
    } else {
      value = value.replace('</p>', '').concat(code).concat('</p>');
    }

    this.form.get('message')?.setValue(value);

  }

  //===================QuILL================================

  onSelectionChanged = (event: SelectionChange) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: ContentChange) => {
    // console.log(event.html);
  }

  onFocus = () => {
    // console.log("On Focus");
  }
  onBlur = () => {
    // console.log("Blurred");
  }

  doSearch() {
    this.search.emit(this.form.value);
  }

  getSelectedProfiles(i: any) {
    // alert("Ok")
    // this.selecteds = this.form.value.profileIds
    this.models[i].profiles = this.selectedItems
    
  }
  addModel() {
    let i = this.models.length
    this.models.push({ id: i, profile: [] });
  }

  remove(i: any) {
    this.models.pop(i);
  }



  openBasicModal(content: TemplateRef<any>, users?: any) {
    // console.log("USERS",users)
    this.users = users;
    this.modalService.open(content, { size: 'sm' }).result.then((result) => {
    }).catch((res) => { });
  }

  openModalProfile(content: TemplateRef<any>, index?: any) {
    this.index = index;
    this.getAllProfiles();
    this.modalService.open(content, { size: 'ml' }).result.then((result) => {
    }).catch((res) => { });
  }

  onSelectAllChange(event: any) {
    this.selectedItems = event.checked ? [...this.profils] : [];
    this.selectAll = event.checked;
    event.updateModel(this.selectedItems, event.originalEvent)
  }

  onChange(event: any) {
    const { originalEvent, value } = event
    if (value) this.selectAll = value.length === this.profils.length;
  }


save() {
  this.getSelectedProfiles(this.index);
  const profileIds = this.selectedItems.map((profile: any) => profile.id);
  this.form.get('profileIds')?.setValue(profileIds);
}

}
