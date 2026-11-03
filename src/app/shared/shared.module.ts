import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CountUpDirective } from './directives/count-up.directive';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    CountUpDirective
  ], 
  exports: [
    CountUpDirective,
    NgbModule,
    ToastrModule
  ]
})
export class SharedModule { }
