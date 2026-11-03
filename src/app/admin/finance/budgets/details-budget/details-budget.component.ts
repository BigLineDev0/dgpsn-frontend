// import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {
//     NgbAccordionModule,
//     NgbAlertModule,
//     NgbDropdownModule,
//     NgbNavModule,
//     NgbPaginationModule,
//     NgbPopoverModule,
//     NgbTooltipModule
// } from '@ng-bootstrap/ng-bootstrap';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatTableModule} from '@angular/material/table';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatIconModule} from '@angular/material/icon';
// import {MatRippleModule} from '@angular/material/core';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {NgSelectModule} from '@ng-select/ng-select';
// import {MatButtonModule} from '@angular/material/button';
// import {QuillModule} from 'ngx-quill';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatCardModule} from '@angular/material/card';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatSelectModule} from '@angular/material/select';
// import {HasAnyAuthorityDirective} from '@views/has-any-authority/has-any-authority.module';
// import {Router, RouterModule} from '@angular/router';
// import {LignesChargesComponent} from '../charges/lignes-charges/lignes-charges.component';
// import {ListeProductComponent} from '../produits/list-product/list-product.component';
// import {InvestissementComponent} from '../investissements/list-investissement/investissement.component';
// import {PlanService} from '@/app/services/plan-compte/plan.service';

// @Component({
//     selector: 'app-details-budget',
//     standalone: true,
//     imports: [
//         CommonModule,
//         RouterModule,
//         NgbPaginationModule,
//         NgbDropdownModule,
//         MatTabsModule,
//         NgbAccordionModule,
//         MatDialogModule,
//         MatTableModule,
//         NgbTooltipModule,
//         MatMenuModule,
//         MatIconModule,
//         MatDialogModule,
//         MatRippleModule,
//         ReactiveFormsModule,
//         NgSelectModule,
//         MatButtonModule,
//         QuillModule,
//         MatRadioModule,
//         NgbNavModule,
//         MatCardModule,
//         FormsModule,
//         MatPaginatorModule,
//         MatSelectModule,
//         NgbAlertModule,
//         HasAnyAuthorityDirective,
//         NgbPopoverModule,
//         ListeProductComponent,
//         LignesChargesComponent,
//         InvestissementComponent
//     ],
//     templateUrl: './details-budget.component.html',
//     styleUrls: ['./details-budget.component.scss']
// })
// export class DetailsBudgetComponent implements OnInit {
//   @ViewChild('tabContainer') tabContainer!: ElementRef;
//     activeId: number = 1;
//     budgetCode: any;
//     classes: any;
//     classe: any;

//     constructor(
//         private readonly router: Router,
//         private readonly planService: PlanService,
//     ) {
//     }

//     ngOnInit(): void {
//         this.budgetCode = localStorage.getItem('budgetId');
//         this.getClasses();
//         // this.loadClasses();
//     }

//     getClasses(): void {
//         this.planService.getClasses({page: 0, size: 10}).subscribe({
//             next: (classes) => {
//                 this.classes = classes.content;
//                 this.classes.sort((a:any, b:any) => a.code.localeCompare(b.code));
//                 this.classes.forEach((classe:any) => {
//                     classe.icon = this.getClassIcon(classe.code);
//                 });

//                 if (this.classes.length === 0) {
//                     this.activeId = 1;
//                 }
//             },
//             error: (err) => {
//                 console.error('Erreur lors de la lecture de la liste des classes:', err);
//                 this.classes = [];
//             }
//         });
//     }

// scrollTabs(direction: 'left' | 'right') {
//     const container = this.tabContainer.nativeElement;
//     const scrollAmount = 200;
//     container.scrollBy({
//       left: direction === 'left' ? -scrollAmount : scrollAmount,
//       behavior: 'smooth'
//     });
//   }

//     getClassIcon(code: string): string {
//         const icons: { [key: string]: string } = {
//             '1': 'account_balance',
//             '2': 'business',
//             '3': 'trending_up',
//             '4': 'savings',
//             '5': 'category',
//             '6': 'trending_up',
//             '7': 'savings',
//             '8': 'trending_up',
//         };
//         return icons[code] || 'category';
//     }

//     typeLigneBugetaire(classeCode: string): string {
//         const mapping: { [key: string]: string } = {
//             '1': 'CLASSE_1',
//             '2': 'CLASSE_2',
//             '3': 'CLASSE_3',
//             '4': 'CLASSE_4',
//             '5': 'CLASSE_5',
//             '6': 'CLASSE_6',
//             '7': 'CLASSE_7',
//             '8': 'CLASSE_8',
//         };
//         return mapping[classeCode] || `CLASSE_${classeCode}`;
//     }

//     goBack() {
//         this.router.navigate(['/admin/acces/finance/budgets']);
//     }
// }

import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PlanService } from '@/app/services/plan-compte/plan.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbPaginationModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { LignesChargesComponent } from '../charges/lignes-charges/lignes-charges.component';
import { InvestissementComponent } from '../investissements/list-investissement/investissement.component';
import { ListeProductComponent } from '../produits/list-product/list-product.component';

@Component({
  selector: 'app-details-budget',
  standalone: true,
  templateUrl: './details-budget.component.html',
  styleUrls: ['./details-budget.component.scss'],
   imports: [
        CommonModule,
        RouterModule,
        NgbPaginationModule,
        NgbDropdownModule,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatRippleModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatButtonModule,
        QuillModule,
        MatRadioModule,
        NgbNavModule,
        MatCardModule,
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        NgbAlertModule,
        HasAnyAuthorityDirective,
        NgbPopoverModule,
        ListeProductComponent,
        LignesChargesComponent,
        InvestissementComponent
    ],
})
export class DetailsBudgetComponent implements OnInit, AfterViewInit {

  @ViewChild('tabContainer') tabContainer!: ElementRef;
  classes: any[] = [];
  budgetCode: any;
  selectedIndex = 0;

  showLeftArrow = false;
  showRightArrow = false;

  constructor(
    private readonly router: Router,
    private readonly planService: PlanService
  ) {}

  ngOnInit(): void {
    this.budgetCode = localStorage.getItem('budgetId');
    this.getClasses();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkScrollButtons(), 500);
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScrollButtons();
  }

  getClasses(): void {
    this.planService.getClasses({ page: 0, size: 20 }).subscribe({
      next: (res) => {
        this.classes = res.content.sort((a: any, b: any) => a.code.localeCompare(b.code));
        this.classes.forEach((c: any) => c.icon = this.getClassIcon(c.code));
        setTimeout(() => this.checkScrollButtons(), 500);
      },
      error: (err) => {
        console.error('Erreur chargement classes:', err);
        this.classes = [];
      }
    });
  }

  scrollTabs(direction: 'left' | 'right') {
    const container = this.tabContainer.nativeElement.querySelector('.mat-mdc-tab-header');
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(() => this.checkScrollButtons(), 300);
  }

  checkScrollButtons() {
    const container = this.tabContainer.nativeElement.querySelector('.mat-mdc-tab-header');
    if (!container) return;
    this.showLeftArrow = container.scrollLeft > 0;
    this.showRightArrow = container.scrollWidth > container.clientWidth + container.scrollLeft;
  }

  getClassIcon(code: string): string {
    const icons: Record<string, string> = {
      '1': 'account_balance',
      '2': 'business',
      '3': 'trending_up',
      '4': 'savings',
      '5': 'category',
      '6': 'trending_up',
      '7': 'savings',
      '8': 'trending_up',
    };
    return icons[code] || 'category';
  }

  typeLigneBugetaire(classeCode: string): string {
    return `CLASSE_${classeCode}`;
  }

  goBack() {
    this.router.navigate(['/admin/acces/finance/budgets']);
  }
  
}
