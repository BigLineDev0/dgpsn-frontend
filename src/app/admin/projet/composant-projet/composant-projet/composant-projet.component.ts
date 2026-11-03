
import { Component, TemplateRef, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FormPlanPassationProjetComponent } from '../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { FormComposantComponent } from '../form-composant/form-composant.component';
import { ListeBudgetComponent } from '../budget/liste-budget/liste-budget.component';
import { ProjetActionsComponent } from '../composant-actions/projet-actions.component';
import { ListeDepenseComponent } from '../depense/liste-depense/liste-depense.component';


interface TreeNode {
  id: string;
  code: string;
  libelle: string;
  type: string;
  produits?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  data: TreeNode;
  level: number;
}

interface Activite {
  id: string;
  code: string;
  libelle: string;
  dateDebut: string;
  dateFin: string;
}

@Component({
  selector: 'app-composant-projet',
  templateUrl: './composant-projet.component.html',
  styleUrls: ['./composant-projet.component.scss'],
    standalone:true,
  imports:[
     CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
    NgbPaginationModule,
    MatMenuModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgbNavModule,
    NgbProgressbarModule,
    ListboxModule,
    FormsModule,
    NgbCarouselModule,
    // NgGanttEditorModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    // ProgrammeModule,
    // NgApexchartsModule,
    // DocumentModule,
    MatRippleModule,
    HasAnyAuthorityDirective,
    // TdbProjetSepecifiqueModule,
    // FoncierePubliqueModule,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    SpinnerComponent,
     FormComposantComponent,
     ListeBudgetComponent,
     ProjetActionsComponent,
     ListeDepenseComponent

  ]
})
export class ComposantProjetComponent implements OnInit {
  pageOptionsActivite: any = { page: 0, size: 10 };
  projetId: any;
  activity: any;

  private _transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!(node.produits && node.produits.length > 0),
    data: node,
    level
  });

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.produits
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.expandable;

  loadingIndicator = false;
  displayedColumns: string[] = ['code', 'libelle', 'actions'];
  activites: Activite[] = [];

  constructor(
    private modalService: NgbModal,
    private managementUnitService: ManangementUnitService
  ) {}

  ngOnInit(): void {
    this.projetId = localStorage.getItem('projetId');
    if (!this.projetId) {
      console.error('projetId is missing from localStorage');
      this.dataSource.data = [];
      this.loadingIndicator = false;
      return;
    }
    this.loadTree();
  }

  loadTree(): void {
    this.loadingIndicator = true;
    this.managementUnitService.readTreeManagementUnit(this.projetId).subscribe({
      next: (response) => {
        console.log('API response:', response); // Log for debugging
        const children = response?.body?.children;
        if (!children || !Array.isArray(children)) {
          console.warn('No valid children data found in response:', response);
          this.dataSource.data = [];
        } else {
          const treeData = this.mapToTreeNode(children);
          this.dataSource.data = treeData;
          this.treeControl.expandAll();
        }
        this.loadingIndicator = false;
      },
      error: (error) => {
        console.error('Error loading tree:', error);
        this.dataSource.data = [];
        this.loadingIndicator = false;
      }
    });
  }

  mapToTreeNode(data: any[]): TreeNode[] {
    if (!data || !Array.isArray(data)) return [];
    return data
      .filter(node => node?.type?.name && ['COMPONENT', 'RESULT', 'PRODUCT'].includes(node.type.name))
      .map(node => ({
        id: node.id?.toString() || '',
        code: node.code || '',
        libelle: node.name || '',
        type: node.type?.name || '',
        produits: node.children ? this.mapToTreeNode(node.children) : undefined
      }));
  }

  loadActivites(node: FlatNode): void {
    if (node.level === 0 || node.level === 2) {
      this.loadingIndicator = true;
      this.managementUnitService.readAllActivity({ parentId: node.data.id }).subscribe({
        next: (response) => {
          this.activites = response.content || [];
          this.loadingIndicator = false;
        },
        error: (error) => {
          console.error('Error loading activities:', error);
          this.activites = [];
          this.loadingIndicator = false;
        }
      });
    }
  }

  openAddComposant(modal: TemplateRef<any>, size: any, activity?: any) {
    this.activity = activity?.id;
    console.log('this.activity:', this.activity);
    this.modalService.open(modal, { size: size, backdrop: false });
  }

  close(event: boolean): void {
    if (event) {
      this.modalService.dismissAll();
      this.loadTree();
    }
  }

  refresh(event: any): void {
    this.loadTree();
  }
}