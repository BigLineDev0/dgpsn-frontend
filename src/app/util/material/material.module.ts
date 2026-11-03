import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatStepperModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatRippleModule,
    MatChipsModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
