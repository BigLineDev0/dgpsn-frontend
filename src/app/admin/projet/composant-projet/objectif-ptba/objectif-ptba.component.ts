import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {
  NgbDropdownItem,
  NgbModal,
  NgbModalRef,
  NgbPaginationModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import {SpinnerComponent} from '@/app/util/spinner/spinner.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormObjectifComponent} from '../form-objectif/form-objectif.component';
import {FormAction, ObjectifActionsComponent} from '../objectif-actions/objectif-actions.component';
import {ListeBudgetComponent} from '../budget/liste-budget/liste-budget.component';
import {PlanificationActiviteComponent} from '../planification-activite/planification-activite.component';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {ManangementUnitService} from "@/app/services/manangement-unit/manangement-unit.service";
import {StructureService} from "@/app/services/structure/structure.service";
import {TacheService} from "@/app/services/tache/tache.service";
import {
  FormActionActiviteComponent
} from "@/app/admin/projet/composant-projet/form-action-activite/form-action-activite.component";
import {Router, RouterLink} from "@angular/router";
import {LabelService} from "@/app/services/labelService/label-service";
import {
  FormIndicateurAvancProjetComponent
} from "@/app/admin/projet/avancement-detaille-projet/avanc-indicateur-projet/form-indicateur-avanc-projet/form-indicateur-avanc-projet.component";
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";
import {MatRipple} from "@angular/material/core";
import {
  FormTacheComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/tache-indicateur/form-tache/form-tache.component";
import {
  FormSourceFinancementComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/source-financement-indicateur/form-source-financement/form-source-financement.component";
import {
  ListSourceFinancementComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/source-financement-indicateur/list-source-financement/list-source-financement.component";
import {Alertes} from "@/app/util/alerte";
import {
  FormIndicateurComponent
} from "@/app/admin/projet/composant-projet/indicateur/form-indicateur/form-indicateur.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

interface TreeNode {
  id: string;
  code: string;
  nomenclature: string;
  libelle: string;
  type: string;

  // Champs pour indicateurs
  // targetValue?: number;
  // valueReched?: number;
  startDate?: string;
  endDate?: string;

  // Champs pour tâches
  trimestre?: number;
  mois?: number;
  semaines?: string;
  commentaire?: string;
  statut?: string;

  children?: TreeNode[];
}

interface FlatNode {
  expandable: boolean;
  data: TreeNode;
  level: number;
}

@Component({
  selector: 'app-objectif-ptba',
  templateUrl: './objectif-ptba.component.html',
  styleUrls: ['./objectif-ptba.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    NgbTooltipModule,
    FeatherIconDirective,
    SpinnerComponent,
    FormObjectifComponent,
    ObjectifActionsComponent,
    ListeBudgetComponent,
    PlanificationActiviteComponent,
    FormActionActiviteComponent,
    NgbPaginationModule,
    FormIndicateurAvancProjetComponent,
    HasAnyAuthorityDirective,
    MatRipple,
    NgbDropdownItem,
    FormTacheComponent,
    FormSourceFinancementComponent,
    ListSourceFinancementComponent,
    RouterLink,
    FormIndicateurComponent,
    ReactiveFormsModule
  ]
})
export class ObjectifPtbaComponent implements OnInit {
  @Output() actionEvent: EventEmitter<FormAction> = new EventEmitter();
  @ViewChild('addObjectifModal') addObjectifModal!: TemplateRef<any>;
  @ViewChild('addActionModal') addActionModal!: TemplateRef<any>;
  @ViewChild('addActiviteModal') addActiviteModal!: TemplateRef<any>;
  @ViewChild('addIndicateurModal') addIndicateurModal!: TemplateRef<any>;
  @ViewChild('addTacheModal') addTacheModal!: TemplateRef<any>;

  modalRef!: NgbModalRef;
  selectedNodeId: string | null = null;
  selectedNodeType: string | null = null;
  selectedNodeData: any = null;
  parentActivityId: number | null = null;
  tacheToUpdate: any;
  indicateurToUpdate:any;
  idParentSourceFinancement: any;
  itemToUpdate: any;
  tacheId: any;
  valueIndicatorId: any;
  budgetId: any;

  // Données pour les formulaires
  structures: any[] = [];
  labels: any[] = [];

  private _transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!(node.children && node.children.length > 0),
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
      node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;

  loadingIndicator = false;

  // Colonnes pour Actions
  displayedColumnsActions: string[] = ['code', 'nomenclature', 'libelle', 'actions'];

  // Colonnes pour Activités
  displayedColumnsActivites: string[] = ['code', 'nomenclature', 'libelle', 'dateDebut', 'dateFin', 'actions'];

  indicatorForm = new FormGroup({
    code: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  // Colonnes pour Indicateurs
  displayedColumnsIndicateurs: string[] = [
    'code',
    'libelle',
    'actions'
  ];

  // Colonnes pour Tâches
  displayedColumnsTaches: string[] = [
    'trimestre',
    'mois',
    'semaines',
    'dateDebut',
    'dateFin',
    'commentaire',
    'statut',
    'actions'
  ];

  tableData: any[] = [];
  pageOptions: any = { page: 0, size: 20 };

  private readonly MOIS_LABELS: { [key: number]: string } = {
    1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril',
    5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août',
    9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre'
  };

  private readonly STATUT_LABELS: { [key: string]: string } = {
    'PLANIFIE': 'Planifié',
    'EN_COURS': 'En cours',
    'TERMINE': 'Terminé'
  };

  constructor(
      private readonly modalService: NgbModal,
      private readonly managementUnitService: ManangementUnitService,
      private readonly tacheService: TacheService,
      private readonly structureService: StructureService,
      private readonly labelService: LabelService,
      public router: Router
  ) {}

  ngOnInit(): void {
    this.budgetId = localStorage.getItem('budgetId');

    if (!this.budgetId) {
      console.warn('No managementUnitId found. Please set it before loading the tree.');
      return;
    }

    this.loadInitialData();
    this.loadTree();
  }

  loadInitialData(): void {
    this.structureService.readStructures({ page: 0, size: 1000 }).subscribe({
      next: (response) => {
        this.structures = response.content || [];
      },
      error: (error) => {
        console.error('Error loading structures:', error);
      }
    });

    this.labelService.readLabels({ page: 0, size: 1000 }).subscribe({
      next: (response) => {
        this.labels = response.content || [];
      },
      error: (error) => {
        console.error('Error loading labels:', error);
      }
    });
  }

  loadTree(): void {
    this.loadingIndicator = true;

    this.managementUnitService.readTreeManagementUnitByBudgetId(this.budgetId).subscribe({
      next: (response) => {
        const body = response?.body;
        const children = body?.children;

        if (!children || !Array.isArray(children)) {
          console.warn('No children found in tree response');
          this.dataSource.data = [];
        } else {
          const treeData = this.mapToTreeNode(children);
          this.dataSource.data = treeData;
          this.treeControl.expandAll();
          this.autoSelectFirstNodes();
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
        .filter(node => {
          const typeName = node?.type?.name || node?.type;
          return typeName && ['OBJECTIF', 'ACTION', 'ACTIVITY', 'INDICATOR'].includes(typeName);
        })
        .map(node => ({
          id: node.id?.toString() || '',
          code: node.code || '',
          libelle: node.name || '',
          nomenclature: node.nomenclature || '',
          type: node.type?.name || node.type || '',

          // Champs indicateurs
          targetValue: node.targetValue,
          valueReched: node.valueReched,
          startDate: node.startDate,
          endDate: node.endDate,

          // Champs tâches
          trimestre: node.trimestre,
          mois: node.mois,
          semaines: node.semaines,
          commentaire: node.commentaire,
          statut: node.statut,

          children: node.children ? this.mapToTreeNode(node.children) : undefined
        }));
  }

  autoSelectFirstNodes(): void {
    if (!this.treeControl.dataNodes || this.treeControl.dataNodes.length === 0) {
      console.log('No nodes available for auto-selection');
      return;
    }

    const firstObjectif = this.treeControl.dataNodes.find(node =>
        node.data.type === 'OBJECTIF' && node.level === 0
    );

    if (firstObjectif) {
      this.selectNode(firstObjectif);
    }
  }

  selectNode(node: FlatNode): void {
    this.selectedNodeId = node.data.id;
    this.selectedNodeType = node.data.type;
    this.selectedNodeData = node.data;

    console.log('Nœud sélectionné:', {
      id: node.data.id,
      libelle: node.data.libelle,
      type: node.data.type
    });

    // Charger les données du tableau selon le type
    this.loadTableData(node);
  }

  loadTableData(node: FlatNode): void {
    this.loadingIndicator = true;
    this.tableData = [];

    switch (node.data.type) {
      case 'OBJECTIF':
        this.loadActions(node);
        break;
      case 'ACTION':
        this.loadActivites(node);
        break;
      case 'ACTIVITY':
        this.loadIndicateurs(node);
        break;
      case 'INDICATOR':
        this.loadTaches(node);
        break;
      default:
        this.loadingIndicator = false;
    }
  }

  loadActions(node: FlatNode): void {
    // Charger les actions (enfants directs de l'objectif dans l'arbre)
    const children = node.data.children || [];
    this.tableData = children.filter(child => child.type === 'ACTION');
    this.loadingIndicator = false;
  }

  loadActivites(node: FlatNode): void {
    // Charger les activités (enfants directs de l'action dans l'arbre)
    const children = node.data.children || [];
    this.tableData = children.filter(child => child.type === 'ACTIVITY');
    this.loadingIndicator = false;
  }

  loadIndicateurs(node: FlatNode): void {
    const children = node.data.children || [];
    this.tableData = children.filter((child: any) => child.type === 'INDICATOR');
    this.loadingIndicator = false;
  }

  // loadTaches(node: FlatNode): void {
  //   // Le node ici est un INDICATOR, on récupère directement son ID
  //   const indicatorId = Number(node.data.id);
  //
  //   const requestParams = {
  //     indicatorId: indicatorId,  // Changé de activiteId à indicatorId
  //     page: this.pageOptions.page,
  //     size: this.pageOptions.size
  //   };
  //
  //   this.tacheService.readTaches(requestParams, requestParams).subscribe({
  //     next: (response) => {
  //       if (response?.payload) {
  //         this.tableData = response.payload;
  //       } else {
  //         this.tableData = response.content || response || [];
  //       }
  //       this.loadingIndicator = false;
  //     },
  //     error: (error) => {
  //       console.error('Error loading taches:', error);
  //       this.tableData = [];
  //       this.loadingIndicator = false;
  //     }
  //   });
  // }

  loadTaches(node: FlatNode): void {
    const indicatorId = Number(node.data.id);

    const requestParams = {
      indicatorId: indicatorId,
      page: this.pageOptions.page,
      size: this.pageOptions.size
    };

    this.tacheService.readTaches(requestParams, requestParams).subscribe({
      next: (response) => {
        this.tableData = response.payload || response.content || [];
        this.loadingIndicator = false;
      },
      error: (error) => {
        console.error('Error loading taches:', error);
        this.tableData = [];
        this.loadingIndicator = false;
      }
    });
  }

  // Méthode pour récupérer l'activité parente d'un indicateur
  getParentActivityId(indicatorNode: FlatNode | undefined): number | null {
    if (!indicatorNode) {
      return null;
    }

    const nodeIndex = this.treeControl.dataNodes.indexOf(indicatorNode);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      const node = this.treeControl.dataNodes[i];
      if (node.data.type === 'ACTIVITY' && node.level < indicatorNode.level) {
        return Number(node.data.id);
      }
    }

    return null;
  }

  // Méthode utilitaire pour récupérer le nœud sélectionné
  getSelectedNode(): FlatNode | undefined {
    return this.treeControl.dataNodes.find(n => n.data.id === this.selectedNodeId);
  }

  isNodeSelected(node: FlatNode): boolean {
    return this.selectedNodeId === node.data.id;
  }

  paginate(page: number): void {
    if (this.selectedNodeType !== 'INDICATOR') return;
    this.pageOptions.page = page - 1;

    if (this.selectedNodeData) {
      const selectedNode = this.treeControl.dataNodes.find(
          node => node.data.id === this.selectedNodeId
      );
      if (selectedNode) {
        this.loadTableData(selectedNode);
      }
    }
  }

  // openAddModal(): void {
  //   switch (this.selectedNodeType) {
  //     case 'OBJECTIF':
  //       this.openModal(this.addActionModal, 'xl');
  //       break;
  //     case 'ACTION':
  //       this.openModal(this.addActiviteModal, 'xl');
  //       break;
  //     case 'ACTIVITY':
  //       this.openModal(this.addIndicateurModal, 'lg');
  //       break;
  //     case 'INDICATOR':
  //       const selectedNode = this.treeControl.dataNodes.find(n => n.data.id === this.selectedNodeId);
  //       if (selectedNode) {
  //         this.parentActivityId = this.getParentActivityId(selectedNode);
  //       }
  //       this.openModal(this.addTacheModal, 'lg');
  //       break;
  //   }
  // }

  openAddModal(): void {
    switch (this.selectedNodeType) {
      case 'OBJECTIF':
        this.openModal(this.addActionModal, 'xl');
        break;
      case 'ACTION':
        this.openModal(this.addActiviteModal, 'xl');
        break;
      case 'ACTIVITY':
        this.openModal(this.addIndicateurModal, 'lg');
        break;
      case 'INDICATOR':
        this.openModal(this.addTacheModal, 'lg');
        break;
    }
  }

  openModal(modal: TemplateRef<any>, size: any = 'lg'): void {
    this.modalRef = this.modalService.open(modal, { size: size, backdrop: false });
  }

  editItem(modal: TemplateRef<any>, size: any = 'lg', item: any): void {
    this.itemToUpdate = item;
    this.modalRef = this.modalService.open(modal, { size: size, backdrop: 'static' });
  }

  deleteItem(item: any): void {
    if (!confirm('Voulez-vous vraiment supprimer cet élément ?')) {
      return;
    }

    switch (this.selectedNodeType) {
      case 'OBJECTIF':
        this.deleteAction(item);
        break;
      case 'ACTION':
        this.deleteActivite(item);
        break;
      case 'ACTIVITY':
        this.deleteIndicateur(item);
        break;
      case 'INDICATOR':
        this.deleteTache(item);
        break;
    }
  }

  deleteAction(action: any): void {
    this.managementUnitService.deleteActivity(action.id).subscribe({
      next: () => {
        console.log('Action supprimée avec succès');
        this.refresh(true);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'action');
      }
    });
  }

  deleteActivite(activite: any): void {
    this.managementUnitService.deleteActivity(activite.id).subscribe({
      next: () => {
        console.log('Activité supprimée avec succès');
        this.refresh(true);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'activité');
      }
    });
  }

  // deleteIndicateur(indicateur: any): void {
  //   this.valueIndicatorService.deleteValueIndicatorToProject(indicateur.id).subscribe({
  //     next: () => {
  //       console.log('Indicateur supprimé avec succès');
  //       this.refresh(true);
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors de la suppression:', error);
  //       alert('Erreur lors de la suppression de l\'indicateur');
  //     }
  //   });
  // }

  deleteIndicateur(indicateur: any): void {
    this.managementUnitService.deleteActivity(indicateur.id).subscribe({
      next: () => {
        Alertes.alerteDeleteSuccess('Indicateur supprimé avec succès');
        this.refresh(true);
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Échec de suppression');
      }
    });
  }

  deleteTache(tache: any): void {
    this.tacheService.deleteTache(tache.id).subscribe({
      next: () => {
        console.log('Tâche supprimée avec succès');
        this.refresh(true);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la tâche');
      }
    });
  }

  close(event: boolean): void {
    if (event) {
      this.modalService.dismissAll();

      const currentNodeId = this.selectedNodeId;

      this.loadTree();

      setTimeout(() => {
        if (currentNodeId) {
          const nodeToSelect = this.treeControl.dataNodes.find(
              node => node.data.id === currentNodeId
          );
          if (nodeToSelect) {
            this.selectNode(nodeToSelect);
          } else {
            this.autoSelectFirstNodes();
          }
        }
      }, 300);
    }
  }

  refresh(event: any): void {
    if (event) {
      const currentNodeId = this.selectedNodeId;
      this.managementUnitService.readTreeManagementUnitByBudgetId(this.budgetId).subscribe({
        next: (response) => {
          const body = response?.body;
          const children = body?.children;

          if (children && Array.isArray(children)) {
            const treeData = this.mapToTreeNode(children);
            this.dataSource.data = treeData;
            this.treeControl.expandAll();

            setTimeout(() => {
              if (currentNodeId) {
                const nodeToSelect = this.treeControl.dataNodes.find(
                    node => node.data.id === currentNodeId
                );
                if (nodeToSelect) {
                  this.selectNode(nodeToSelect);
                } else {
                  this.autoSelectFirstNodes();
                }
              } else {
                this.autoSelectFirstNodes();
              }
            }, 200);
          }
        },
        error: (error) => {
          console.error('Error refreshing tree:', error);
        }
      });
    }
  }

  handleAction(action: FormAction): void {
    console.log('Action triggered:', action);
    this.refresh(true);
  }

  getNodeIcon(node: FlatNode): string {
    const type = node.data.type;
    switch (type) {
      case 'OBJECTIF':
        return 'flag';
      case 'ACTION':
        return 'play_arrow';
      case 'ACTIVITY':
        return 'work';
      case 'INDICATOR':
        return 'assessment';
      default:
        return 'folder';
    }
  }

  getTypeBadgeClass(node: FlatNode): string {
    const type = node.data.type;
    switch (type) {
      case 'OBJECTIF':
        return 'bg-objectif';
      case 'ACTION':
        return 'bg-action';
      case 'ACTIVITY':
        return 'bg-activite';
      case 'INDICATOR':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR');
    } catch (error) {
      return 'N/A';
    }
  }

  getMoisLabel(mois: number): string {
    return this.MOIS_LABELS[mois] || 'Inconnu';
  }

  getStatutLabel(statut: string): string {
    return this.STATUT_LABELS[statut] || statut;
  }

  colorBadgeStatut(statut: string): string {
    const colors: any = {
      'PLANIFIE': 'bg-secondary',
      'EN_COURS': 'bg-warning',
      'TERMINE': 'bg-success'
    };
    return colors[statut] || 'bg-secondary';
  }

  getAddButtonLabel(): string {
    switch (this.selectedNodeType) {
      case 'OBJECTIF':
        return 'Nouvelle Action';
      case 'ACTION':
        return 'Nouvelle Activité';
      case 'ACTIVITY':
        return 'Nouvel Indicateur';
      case 'INDICATOR':
        return 'Nouvelle Tâche';
      default:
        return 'Ajouter';
    }
  }

  getTableTitle(): string {
    switch (this.selectedNodeType) {
      case 'OBJECTIF':
        return 'Actions';
      case 'ACTION':
        return 'Activités';
      case 'ACTIVITY':
        return 'Indicateurs';
      case 'INDICATOR':
        return 'Tâches';
      default:
        return '';
    }
  }

  navigateToSuivi(indicateur: any): void {
    localStorage.setItem("currentIndicatorId", indicateur.id);
    this.router.navigateByUrl("/admin/acces/activite/suivi-indicateur");
  }

  // openSourceFinancement(modal: TemplateRef<any>, managementUnitId?: any, tacheId?: any, valueIndicatorId?: any) {
  //   this.managementUnitId = managementUnitId;
  //   this.tacheId = tacheId;
  //   this.valueIndicatorId = valueIndicatorId;
  //   this.modalRef = this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
  // }

  openSourceFinancement(managementUnitId?: any, tacheId?: any) {
    if (managementUnitId) {
      localStorage.setItem("currentManagementUnitId", managementUnitId);
      localStorage.removeItem("currentTacheId");
      localStorage.removeItem("currentValueIndicatorId");
    }
    if (tacheId) {
      localStorage.setItem("currentTacheId", tacheId);
      localStorage.removeItem("currentValueIndicatorId");
      localStorage.removeItem("currentManagementUnitId");
    }
    this.router.navigateByUrl("/admin/acces/activite/suivi-indicateur/source-financement");
  }

  updateStatus(tache: any, statut: string): void {
    // Ne rien faire si le statut est identique
    if (tache?.statut === statut) {
      return;
    }

    const nouveauStatutLabel = this.getStatutLabel(statut);
    Alertes.confirmAction(
        'Confirmation de changement de statut',
        `Voulez-vous vraiment changer le statut de cette tâche en <strong class="text-primary">"${nouveauStatutLabel}"</strong> ?`,
        () => {
          this.tacheService.updateTacheStatut(tache.id, statut).subscribe({
            next: () => {
              Alertes.alerteValidSuccess('Le statut de la tâche a été mis à jour avec succès.');
              this.refresh(true);
            },
            error: (err) => {
              const messageErreur = err?.error?.message || 'Une erreur inconnue est survenue.';
              Alertes.errorPopPup('Échec de la mise à jour', messageErreur);
              this.refresh(true);
            }
          });
        }
    );
  }

  saveIndicator(modal: any): void {
    if (this.indicatorForm.invalid) return;

    const data = {
      code: this.indicatorForm.value.code,
      nomenclature: this.indicatorForm.value.code,
      name: this.indicatorForm.value.libelle,
      libelle: this.indicatorForm.value.libelle,
      description: this.indicatorForm.value.description,
      type: 'INDICATOR',
      parentId: this.selectedNodeId
    };

    this.managementUnitService.addNodeToTreeManagementUnit(this.selectedNodeId, data).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Indicateur ajouté avec succès');
        modal.close();
        this.loadTree(); // Rafraîchir l'arbre
      },
      error: (err) => Alertes.errorPopPup('Erreur', err?.error?.message || 'Échec')
    });
  }
}
