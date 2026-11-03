import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, TemplateRef } from '@angular/core';
import {
  MatTree,
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
  MatTreeNode,
  MatTreeNodePadding,
  MatTreeNodeToggle
} from '@angular/material/tree';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/api';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { Alertes } from 'src/app/util/alerte';
import {CommonModule} from "@angular/common";
import {OrganizationChartModule} from "primeng/organizationchart";
import {MaterialModule} from "@/app/util/material/material.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {
  FormOrgarganigrammeComponent
} from "@/app/admin/organigramme/form-orgarganigramme/form-orgarganigramme.component";
import {ChartOrganigrammeComponent} from "@/app/admin/organigramme/chart-organigramme/chart-organigramme.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {ListAgentComponent} from "@/app/admin/agent/list-agent/list-agent.component";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon, MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-main-organigramme',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    OrganizationChartModule,
    ButtonModule,
    NgSelectModule,
     MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    ChartOrganigrammeComponent,
    FormOrgarganigrammeComponent,
    ListAgentComponent,
    MatTreeModule,
    MatTreeNode,
      MatTreeModule,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatTree,
    MatIconButton,
    MatTooltip,
    MatIconButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './main-organigramme.component.html',
  styleUrls: ['./main-organigramme.component.scss']
})
export class MainOrganigrammeComponent {
  private _transformer = (node: any, level: any) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      data: node,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: any) => node.expandable;

  pageOptions: any = { page: 0, size: 100 };

  selectedNode!: TreeNode;

  directionToUpdate: any = undefined;
  directionParent: any;
  selectedDirectionId!: number;

  constructor(
    private directionService: DirectionService,
    private modalService: NgbModal
  ) { }
  
  ngOnInit(): void {
    this.loadOrganigramme();
  }

  loadOrganigramme() {
    this.directionService.loadOrganigramme(this.pageOptions.page, this.pageOptions.size).subscribe({
      next: (value: any) => {
        this.dataSource.data = value.content;
        console.log("payload", this.dataSource.data)
      },
      complete: () => {
    }
    }) 
  }

  addUnite($event: any, content: TemplateRef<any>, size?: any, directionParent?: any) {
    this.directionParent = directionParent;
    $event.stopPropagation();
    this.openBasicModal(content, size);
  }

  updateUnite($event: any, content: TemplateRef<any>, size?: any, directionParent?: any) {
    this.directionToUpdate = directionParent;
    $event.stopPropagation();
    this.openBasicModal(content, size);
  }

  addAgent($event: any, content: TemplateRef<any>, node: any) {
    this.selectedDirectionId = node.level == 0 ? -1 : node.data.id;
    $event.stopPropagation()
    this.openBasicModal(content, 'xl');
  }

  openMenu($event: any, node: TreeNode) {
    $event.stopPropagation();
    this.selectedNode = node;
  }

  activeTreeNode($event: any) {
    this.removeActiveNode();
    $event.target.classList.add('tree-node-active');
  }


  removeActiveNode() {
    var treeNodes = document.getElementsByClassName('tree-node');
    for (let i = 0; i < treeNodes.length; i++) {
      treeNodes[i].classList.remove('tree-node-active');
    }
  }

  openBasicModal(content: TemplateRef<any>, size?: any) {
    this.modalService.open(content, {size: size, backdrop: 'static'});
  }

  addStructureEvent($event: any) {
    if ($event) {
      this.loadOrganigramme();
    }
    this.modalService.dismissAll();
  }

  deleteDirection($event:any, directionId: any) {
     $event.stopPropagation();
      Alertes.confirmAction(
        'Voulez-vous supprimé ?',
        'Cet element sera definitivement supprimé',
        () => {
          this.directionService.deleteDirection(directionId).subscribe({
            next: (value: any) => {
              Alertes.alerteDeleteSuccess();
            },
            error: (value: any) => { 
              Alertes.alerteDeleteDanger(value.message)
            },
            complete: () => this.loadOrganigramme()
         })
        }
      );
    }
}
