import { routes } from '@/app/app.routes';
import { MaterialModule } from '@/app/util/material/material.module';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbDatepickerModule, NgbAccordionModule, NgbPaginationModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { AlerteFormatterPipe } from '@/app/util/pipe/alerte/alerte-formatter.pipe';
import { TextFormatterPipe } from '@/app/util/pipe/text/text-formatter.pipe';
import { ThousandsSeparatorPipe } from '@/app/util/pipe/text/number-formatter.pipe';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';

@Component({
  selector: 'app-user-alert',
  templateUrl: './user-alert.component.html',
  styleUrls: ['./user-alert.component.scss'],
   imports: [
        CommonModule,
        NgbDropdownModule,
        NgbDatepickerModule,
        ReactiveFormsModule,
        NgbAccordionModule,
        NgSelectModule, // Ng-selec
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTooltipModule,
        NgbNavModule,
        NgbCollapseModule,
        ListboxModule,
        FormsModule,
        MultiSelectModule,
        MaterialModule,
    ],
})
export class UserAlertComponent {

  @Input() users: any;
  constructor(
   
  ) {}
  ngOnInit(): void {
    this.items = this.users
    this.selectedItems = this.users
  }

  items = []

  selectedItems!: any[];

  selectAll = false;

  onSelectAllChange(event: any) {
    this.selectedItems = event.checked ? [...this.items] : [];
    this.selectAll = event.checked;
    event.updateModel(this.selectedItems, event.originalEvent)
}

onChange(event: any) {
    const { originalEvent, value } = event
    if(value) this.selectAll = value.length === this.items.length;
}


}
