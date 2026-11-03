import {Component, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ListeCandidatComponent } from '../liste-candidat/liste-candidat.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {CandidatService} from "@/app/services/candidat/candidat.service";

@Component({
  selector: 'app-main-suivi-recrutement',
  standalone: true,
  imports: [CommonModule, MatIconModule, ListeCandidatComponent, NgbNavModule],
  templateUrl: './main-suivi-recrutement.component.html',
  styleUrls: ['./main-suivi-recrutement.component.scss'],
})
export class MainSuiviRecrutementComponent implements OnInit {
  activeTabIndex: string = '1';
  typeCandidat: string = 'CAN';
  libelle: string | null = '';
    private service = inject(CandidatService);
    countByTpe(type : 'CAN' | 'CAN_PRE_ENT' | 'CAN_RET' | 'CAN_PRE_FINAL'){
        return this.service.getCount(type)();
    }

  ngOnInit(): void {
    this.libelle = localStorage.getItem('libelleRecrutement');
    const savedTab = localStorage.getItem('activeTabSortie');
    if (savedTab) {
      this.activeTabIndex = savedTab;
      this.updateTypeFromTab(+savedTab);
    }
  }

  onTabChange(index: string): void {
    this.activeTabIndex = index;
    this.updateTypeFromTab(+index);
    localStorage.setItem('activeTabSortie', index);
  }

    private updateTypeFromTab(index: number) {
        const types = ['CAN', 'CAN_PRE_ENT', 'CAN_RET', 'CAN_PRE_FINAL'];
        this.typeCandidat = types[index - 1] || 'CAN';
    }

}
