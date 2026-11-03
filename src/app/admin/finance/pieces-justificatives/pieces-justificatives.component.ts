import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: SafeUrl | string;
  uploadProgress: number;
  isUploading: boolean;
  isImage: boolean;
  isPdf: boolean;
}

@Component({
  selector: 'app-pieces-justificatives',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './pieces-justificatives.component.html',
  styleUrl: './pieces-justificatives.component.scss'
})
export class PiecesJustificativesComponent implements OnInit {
  @Input() depenseId: string | null = null;
  @Input() isReadOnly: boolean = false; // Mode lecture seule (détails)
  @Input() depenseStatut: string = 'Brouillon'; // Statut de la dépense
  @Output() piecesChange = new EventEmitter<UploadedFile[]>();

  uploadedFiles: UploadedFile[] = [];
  dragOver = false;
  maxFileSize = 10 * 1024 * 1024; // 10MB
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  minFilesRequired = 1;

  constructor(
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Charger les pièces existantes si depenseId est fourni
    if (this.depenseId) {
      this.loadExistingPieces();
    }
  }

  private loadExistingPieces(): void {
    // Simulation : charger les pièces existantes avec des données réalistes
    // À remplacer par un appel au service réel
    this.uploadedFiles = [
      {
        id: '1',
        name: 'facture_bureau_vallee_2024-001.pdf',
        size: 245760,
        type: 'application/pdf',
        url: '/assets/sample-invoice.pdf',
        uploadProgress: 100,
        isUploading: false,
        isImage: false,
        isPdf: true
      },
      {
        id: '2',
        name: 'bon_commande_informatique_2024-001.jpg',
        size: 512000,
        type: 'image/jpeg',
        url: '/assets/sample-order.jpg',
        uploadProgress: 100,
        isUploading: false,
        isImage: true,
        isPdf: false
      },
      {
        id: '3',
        name: 'releve_bancaire_janvier_2024.pdf',
        size: 189440,
        type: 'application/pdf',
        url: '/assets/sample-bank-statement.pdf',
        uploadProgress: 100,
        isUploading: false,
        isImage: false,
        isPdf: true
      },
      {
        id: '4',
        name: 'devis_maintenance_it_support.pdf',
        size: 156780,
        type: 'application/pdf',
        url: '/assets/sample-quote.pdf',
        uploadProgress: 100,
        isUploading: false,
        isImage: false,
        isPdf: true
      }
    ];
    this.piecesChange.emit(this.uploadedFiles);
  }

  // Propriété calculée pour déterminer si le drag & drop est autorisé
  get canDropFiles(): boolean {
    return !this.isReadOnly || this.depenseStatut !== 'Validé';
  }

  onDragOver(event: DragEvent): void {
    if (!this.canDropFiles) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    if (!this.canDropFiles) {
      event.preventDefault();
      this.snackBar.open('Impossible d\'ajouter des fichiers à une dépense validée.', 'Fermer', { duration: 3000 });
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: any): void {
    if (!this.canDropFiles) {
      this.snackBar.open('Impossible d\'ajouter des fichiers à une dépense validée.', 'Fermer', { duration: 3000 });
      return;
    }
    const files = event.target.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
    // Reset input
    event.target.value = '';
  }

  private handleFiles(files: File[]): void {
    const validFiles = files.filter(file => this.validateFile(file));

    if (validFiles.length !== files.length) {
      this.snackBar.open(`${files.length - validFiles.length} fichier(s) ignoré(s) pour cause de format ou taille invalide.`, 'Fermer', { duration: 3000 });
    }

    validFiles.forEach(file => this.uploadFile(file));
  }

  private validateFile(file: File): boolean {
    if (file.size > this.maxFileSize) {
      this.snackBar.open(`Le fichier ${file.name} dépasse la taille maximale de 10MB.`, 'Fermer', { duration: 3000 });
      return false;
    }

    if (!this.allowedTypes.includes(file.type)) {
      this.snackBar.open(`Le type de fichier ${file.type} n'est pas autorisé. Formats acceptés : JPEG, PNG, GIF, PDF.`, 'Fermer', { duration: 3000 });
      return false;
    }

    return true;
  }

  private uploadFile(file: File): void {
    const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      url: '',
      uploadProgress: 0,
      isUploading: true,
      isImage,
      isPdf
    };

    this.uploadedFiles.push(newFile);
    this.piecesChange.emit(this.uploadedFiles);

    // Simulation d'upload
    this.simulateUpload(newFile, file);
  }

  private simulateUpload(uploadedFile: UploadedFile, file: File): void {
    const interval = setInterval(() => {
      uploadedFile.uploadProgress += Math.random() * 30;
      if (uploadedFile.uploadProgress >= 100) {
        uploadedFile.uploadProgress = 100;
        uploadedFile.isUploading = false;
        // Créer une URL pour prévisualisation
        if (uploadedFile.isImage) {
          const reader = new FileReader();
          reader.onload = (e) => {
            uploadedFile.url = this.sanitizer.bypassSecurityTrustUrl(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else if (uploadedFile.isPdf) {
          uploadedFile.url = '/assets/pdf-icon.png'; // Icône PDF
        }
        clearInterval(interval);
        this.snackBar.open(`Fichier ${file.name} uploadé avec succès.`, 'Fermer', { duration: 3000 });
      }
    }, 200);
  }

  removeFile(fileId: string): void {
    this.uploadedFiles = this.uploadedFiles.filter(file => file.id !== fileId);
    this.piecesChange.emit(this.uploadedFiles);
    this.snackBar.open('Fichier supprimé.', 'Fermer', { duration: 3000 });
  }

  downloadFile(file: UploadedFile): void {
    // Logique pour télécharger le fichier
    this.snackBar.open(`Téléchargement de ${file.name}...`, 'Fermer', { duration: 3000 });
  }

  getFileIcon(file: UploadedFile): string {
    if (file.isImage) return 'image';
    if (file.isPdf) return 'picture_as_pdf';
    return 'insert_drive_file';
  }

  getFileSize(file: UploadedFile): string {
    const size = file.size;
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / (1024 * 1024)).toFixed(1) + ' MB';
  }

  isFormValid(): boolean {
    return this.uploadedFiles.length >= this.minFilesRequired;
  }
}
