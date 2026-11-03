import { Component, Input } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DirectionService } from 'src/app/services/direction/direction.service';
import {TreeModule} from "primeng/tree";
import {CommonModule} from "@angular/common";
import {OrganizationChart} from "primeng/organizationchart";
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chart-organigramme',
    standalone: true,
  imports: [CommonModule, TreeModule, OrganizationChart, MatTreeModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './chart-organigramme.component.html',
  styleUrls: ['./chart-organigramme.component.scss']
})
export class ChartOrganigrammeComponent {
  data: any;
  pageOptions: any = { page: 0, size: 100 };
  selectedNode!: TreeNode;

  constructor(
    private directionService: DirectionService
  ) { }

  ngOnInit(): void {
    this.loadOrganigramme();
  }

  loadOrganigramme() {
    this.directionService.loadOrganigramme(this.pageOptions.page, this.pageOptions.size).subscribe({
      next: (value: any) => {
         console.log("value",value);
        const direction = value.content[0];
        console.log("direction",direction);
        
        this.data = this.mapTree(direction)
        console.log("TREE: ", this.data)
      }
    }) 
  }

  mapTree(node: any): TreeNode {
    return {
      label: node?.libelle,
      expanded: true,
      children: (node?.children as Array<any>).map(child => this.mapTree(child))
    }
  }
}
