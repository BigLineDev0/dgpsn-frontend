  import { FormParticipantAtelierComponent } from '@/app/admin/serviceExterieur/atteliers/participant/form-participant-atelier/form-participant-atelier.component';
import { GeographicalLocationService } from '@/app/services/geographical-location/geographical-location.service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
  import {MenuItem, TreeNode} from "primeng/api";
import { RoutingConfigProjetComponent } from '../../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { CadreLogiqueService } from '@/app/services/cadre-logique/cadre-logique.service';
import { ListboxModule } from 'primeng/listbox';
@Component({
  selector: 'app-form-zone-intervention-projet',
  templateUrl: './form-zone-intervention-projet.component.html',
  styleUrls: ['./form-zone-intervention-projet.component.scss'],
     standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgSelectModule,
    HasAnyAuthorityDirective,
    ListboxModule,
  ]
})
export class FormZoneInterventionProjetComponent implements OnInit{

  cadreLogiques!: TreeNode[];
  selectedNodes!: TreeNode[];
  cols!: any[]
  @Input() projetId: any;
  @Input() localisationsId: any;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() cadreLogiqueId: any;

  treeCadreLogiques!: TreeNode[];
  selectedCadreLogique!: TreeNode[];
  nodeSelected!: TreeNode;

  selectedCardres: any;
  cardres: any;

  items!: MenuItem[];


  constructor(private cadreLogiqueService: CadreLogiqueService
    , private geographicalLocationService: GeographicalLocationService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'libelle', header: 'Libellé' }
    ];
    if(this.cadreLogiqueId){
      this.getChildren();
    }else {
      this.getRegions()
    }

    // this.readTree();
    // this.getRegions();
    // this.setSeleted()

  }
  create() {
    // let list = this.selectedCadreLogique.map(val => val.data);
    let geos: any = [];
    this.selectedCardres.forEach((item: any) => {
      geos.push({
        projetId: this.projetId,
        cadreLogiqueId: item.id
      })
    });
    this.geographicalLocationService.creategeographicalLocation(geos).subscribe(response => {
      this.close();
    })
  }

  readTree() {
    // console.log("locationIds", this.localisationsId)
    this.cadreLogiqueService.readTree(this.projetId).subscribe(response => {
      this.cadreLogiques = response.body;
    })
  }

  close() {
    this.submit.emit(true);
  }

  nodeSelect(event: any) {
    this.nodeSelected = event.node;
    // this.selectedDirectory = event.node.data;
    // localStorage.setItem("selectedNode", this.selectedDirectory.id)

  }

  loadNode(event: any) {
    if (event.node) {
      let cadreLogiqueId = event.node.data.id;
      this.cadreLogiqueService.readByParent(cadreLogiqueId).subscribe(data => {
        this.cardres = data.body;
        console.log("data ",data)
        let directories = data.body;
        let nodes: any = [];
        directories.forEach((d: any) => {
          nodes.push({
            data: d,
            children: [],
            label: d.libelle,
            expandedIcon: "pi pi-globe",
            collapsedIcon: "pi pi-globe",
            "leaf": false,
            "parent": event.node
          });

        })
        event.node.children = nodes;
      });

    }
  }

  getRegions() {
    let pageOptions = { page: 0, size: 1000 };
    this.cadreLogiqueService.readRegions({projectId: this.projetId}).subscribe(data => {
      this.cardres = data;
      console.log("cardres",this.cardres);
      
      // let regions = data;
      // this.treeCadreLogiques = [];
      // regions.forEach((d: any) => {
      //   this.treeCadreLogiques.push({
      //     data: d,
      //     children: [],
      //     label: d.libelle,
      //     expandedIcon: "pi pi-globe",
      //     collapsedIcon: "pi pi-globe",
      //     "leaf": true,
      //   });

      // })

    });
  }

  NodeContextMenuSelect(event: any) {
    // this.selectedDirectory = event.node.data;
    this.nodeSelected = event.node;
  }

  setSeleted() {
    this.selectedCadreLogique = [];
    this.localisationsId.forEach((d: any) => {
      this.selectedCadreLogique.push({
        data: d.cadreLogique,
        children: [],
        label: d.cadreLogique?.libelle,
        expandedIcon: "pin_drop",
        collapsedIcon: "add_location",
        "leaf": false,
      });

    })
  }

  getChildren() {
    this.cadreLogiqueService.readByParent(this.projetId, this.cadreLogiqueId).subscribe(data => {
      this.cardres = data;
    });
  }

}

