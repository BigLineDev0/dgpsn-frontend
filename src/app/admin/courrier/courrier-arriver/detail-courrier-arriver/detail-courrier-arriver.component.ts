import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detail-courrier-arriver',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './detail-courrier-arriver.component.html',
  styleUrls: ['./detail-courrier-arriver.component.scss']
})
export class DetailCourrierArriverComponent {
  @Input() courrier: any;
  @Output() close = new EventEmitter<void>();

  // Méthode pour fermer le modal
  onClose() {
    this.close.emit();
  }

  // Méthode pour obtenir la classe CSS du badge d'urgence
  getUrgenceClass(urgence: string): string {
    switch (urgence) {
      case 'URGENT':
        return 'badge text-bg-danger';
      case 'IMPORTANT':
        return 'badge text-bg-warning';
      case 'NORMALE':
        return 'badge text-bg-secondary';
      default:
        return 'badge text-bg-secondary';
    }
  }

  // Méthode pour obtenir la classe CSS du badge de statut
  getStatutClass(statut: any): string {
    switch (statut?.name) {
      case 'TRAITE':
        return 'badge text-bg-success';
      case 'EN_COURS':
        return 'badge text-bg-warning';
      case 'NON_TRAITE':
        return 'badge text-bg-secondary';
      case 'ARCHIVE':
        return 'badge text-bg-info';
      default:
        return 'badge text-bg-secondary';
    }
  }

  // Méthode pour formater la date
  formatDate(date: any): string {
    if (!date) return 'Non spécifié';
    return new Date(date).toLocaleDateString('fr-FR');
  }
}