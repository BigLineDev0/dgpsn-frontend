import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-fournisseur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-fournisseur.component.html',
  styleUrls: ['./detail-fournisseur.component.scss']
})
export class DetailFournisseurComponent implements OnInit {
  
  @Input() fournisseurDetails: any; // Reçoit les données du fournisseur
  private modalService = inject(NgbModal);

  constructor() { }

  ngOnInit(): void {
    if (!this.fournisseurDetails) {
        console.error("Aucune donnée fournisseur fournie pour les détails.");
    }
  }

  close() {
    this.modalService.dismissAll();
  }
}