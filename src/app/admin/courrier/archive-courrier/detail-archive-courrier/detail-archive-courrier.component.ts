import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-detail-archive-courrier',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './detail-archive-courrier.component.html',
  styleUrls: ['./detail-archive-courrier.component.scss']
})
export class DetailArchiveCourrierComponent {
  @Input() courrier: any;
  @Output() close = new EventEmitter<void>();
  @Output() desarchiverCourrier = new EventEmitter<any>();

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
      case 'ARCHIVE':
        return 'badge text-bg-info';
      case 'TRAITE':
        return 'badge text-bg-success';
      case 'EN_COURS':
        return 'badge text-bg-warning';
      case 'NON_TRAITE':
        return 'badge text-bg-secondary';
      case 'ENVOYE':
        return 'badge text-bg-success';
      case 'EN_PREPARATION':
        return 'badge text-bg-warning';
      case 'BROUILLON':
        return 'badge text-bg-secondary';
      case 'ANNULE':
        return 'badge text-bg-danger';
      default:
        return 'badge text-bg-secondary';
    }
  }

  // Méthode pour formater la date
  formatDate(date: any): string {
    if (!date) return 'Non spécifié';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Méthode pour calculer la date d'échéance de conservation
  calculerDateEcheance(): string {
    if (!this.courrier?.dateArchivage) return 'Non spécifié';
    
    const dateArchivage = new Date(this.courrier.dateArchivage);
    const dureeAnnees = parseInt(this.courrier?.dureeConservation) || 5;
    const dateEcheance = new Date(dateArchivage);
    dateEcheance.setFullYear(dateEcheance.getFullYear() + dureeAnnees);
    
    return this.formatDate(dateEcheance);
  }

  // Méthodes spécifiques aux archives
  desarchiver() {
    if (confirm(`Voulez-vous désarchiver le courrier "${this.courrier?.reference}" ?`)) {
      this.desarchiverCourrier.emit(this.courrier);
      this.onClose();
    }
  }

  telechargerArchive() {
    alert(`Téléchargement de l'archive: ${this.courrier?.reference}`);
    // Implémentation réelle à ajouter ici
  }

  imprimer() {
    alert(`Impression des détails d'archive pour: ${this.courrier?.reference}`);
    // Implémentation réelle à ajouter ici
  }
}