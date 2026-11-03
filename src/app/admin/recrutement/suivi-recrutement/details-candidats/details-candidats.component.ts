import {Component, EventEmitter, inject, Input, OnInit, Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidatDTO } from '@/app/models/candidat.model';
import { ExperienceLabelPipe } from '@/app/util/pipe/text/experience-label.pipe';
import { NiveauEtudePipe } from '@/app/util/pipe/text/niveau-etude.pipe';
import {NotationDTO} from "@/app/services/candidat/NotationService";


interface Document {
  nom: string;
  type: string;
  url: string;
  dateAjout: Date;
}
@Component({
  selector: 'app-details-candidats',
  templateUrl: './details-candidats.component.html',
  imports: [CommonModule, MatTabsModule, MatIconModule, NgbNavModule, ExperienceLabelPipe, NiveauEtudePipe],
  styleUrls: ['./details-candidats.component.scss']
})
export class DetailsCandidatsComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() candidat: CandidatDTO | undefined;


  mockDocx = signal<Document[]>([
     {
        nom: 'CV - Développeur Web',
        type: 'pdf',
        url: 'assets/documents/cv_developpeur.pdf',
        dateAjout: new Date('2024-01-10')
      },
      {
        nom: 'Lettre de motivation',
        type: 'docx',
        url: 'assets/documents/lettre_motivation.docx',
        dateAjout: new Date('2024-01-12')
      },
      {
        nom: 'Certificat de travail',
        type: 'pdf',
        url: 'assets/documents/certificat_travail.pdf',
        dateAjout: new Date('2024-01-15')
      },
      {
        nom: 'Photo profil',
        type: 'png',
        url: 'assets/documents/certificat_travail.png',
        dateAjout: new Date('2024-01-15')
      }
  ])

  criteres : any = [
    { code: '01', libelle: 'Première impression (politesse, tenue vestimentaire, …)', value: 'BIEN' },
    { code: '02', libelle: 'Ecoute, réactivité et dynamisme', value: 'TRES BIEN' },
    { code: '03', libelle: 'Degré de motivation', value: 'BIEN' },
    { code: '04', libelle: 'Communication non verbale', value: 'INSUFFISANT' },
    { code: '05', libelle: 'Adaptabilité', value: 'INSUFFISANT' },
  ];

  constructor() {}

  ngOnInit() {
  }

  // documents:any = [
  //   { nom: 'CV_Jean_Dupont.pdf', type: 'pdf', url: 'assets/docs/CV.pdf' },
  //   { nom: 'Lettre_Motivation.docx', type: 'docx', url: 'assets/docs/Lettre_Motivation.docx' },
  //   { nom: 'Photo_Profil.png', type: 'png', url: 'assets/docs/Photo_Profil.png' },
  // ]


  getIconClass(type: string): string {
    const icons:any = {
      'pdf': 'mdi mdi-file-pdf-box text-danger',
      'doc': 'mdi mdi-file-word-box text-primary',
      'docx': 'mdi mdi-file-word-box text-primary',
      'xls': 'mdi mdi-file-excel-box text-success',
      'xlsx': 'mdi mdi-file-excel-box text-success',
      'png': 'mdi mdi-file-image text-warning',
      'jpg': 'mdi mdi-file-image text-warning',
      'jpeg': 'mdi mdi-file-image text-warning'
    };
    return icons[type] || 'mdi mdi-file text-secondary';
  }

  getBadgeClass(value: string): string {
    if (value == 'INSUFFISANT') {
      return 'badge-insuffisant';
    } else if (value == 'BIEN') {
      return 'badge-bien';
    } else if (value == 'TRES BIEN') {
      return 'badge-tres-bien';
    }
    return '';
  }


  isPreviewable(type: string): boolean {
    return ['jpg', 'png', 'pdf'].includes(type);
  }

  download(doc: any) {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.nom;
    link.click();
  }

  preview(doc: any) {
    window.open(doc.url, '_blank');
  }
}
