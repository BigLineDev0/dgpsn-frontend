import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { NgbPaginationModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';

import html2canvas from 'html2canvas';
import { QuillModule } from 'ngx-quill';

import { CongeService } from 'src/app/services/conge/conge.service';
import { GenerateWordService } from 'src/app/services/generate-word/generate-word.service';
import { FormCessationComponent } from '../cessation/form-cessation/form-cessation.component';
import { AddDemandeComponent } from '../demande-conge/add-demande/add-demande.component';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';



@Component({
  selector: 'app-demande',
    standalone:true,
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss'],
   imports: [
    CommonModule,
    AddDemandeComponent,
     NgbPaginationModule,
        NgbDropdownModule,
        SpinnerComponent,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        FeatherIconDirective,
        MatRippleModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatButtonModule,
        QuillModule,
        MatRadioModule,
        NgbNavModule,
        MatCardModule,
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        NgbAlertModule,
        HasAnyAuthorityDirective,
        NgbPopoverModule,
        FormCessationComponent
  ],
})
export class DemandeComponent implements OnInit{
  @Input()conge:any;
  objetConge:any
  @Input() demande:any;
  formattedDateDemande!: string;
  formattedDateDebut!:string
  @Input() administratifDemande!: boolean;
  @Input() deciderMaladie!: boolean;
  @Input() materniter!: boolean;
  @Input() maladie!: boolean;
  @Input() autres!: boolean;
  @Input() signataire:any
  dureeEnLettres!: string;
  isLoading !:boolean;
  sexe!:string;
  @ViewChild('content', { static: false }) content!: ElementRef;
  constructor(
    private http: HttpClient,
    private generateWordService:GenerateWordService,
    private congeService: CongeService
  ) {
  }
  ngOnInit() {
    this.dureeEnLettres = this.congeService.convertNumberToWords(this.conge.duree);
    this.sexe = this.conge?.agent?.sexe?.name === 'F' ? 'Madame' : 'Monsieur';
  }

// generatePdf() {
//   this.isLoading = true; 
//   const contentElement = this.content.nativeElement;
//   const options = {
//     dpi: 600,
//     scale: 3
//   };
//   html2canvas(contentElement,options).then(canvas => {
//     const imgData = canvas.toDataURL('image/png');
//     const imgWidth = 500;
//     const imgHeight = canvas.height * (imgWidth / canvas.width);
//     const documentDefinition = {
//       content: [
//         {
//           image: imgData,
//           width: imgWidth,
//           height: imgHeight
//         }
//       ]
//     };
//     (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
//     pdfMake.createPdf(documentDefinition).download('Demande ('+this.conge.typeConge.description+')-'+this.conge.agent.prenom+' '+this.conge.agent.nom);

//       this.isLoading = false; 
//     }).catch(() => {
//       this.isLoading = false; 
//     });

// }
// generatePdf() {
//   this.isLoading = true; 
//   const contentElement = this.content.nativeElement;
//   const options = {
//     dpi: 600,
//     scale: 3
//   };

//   html2canvas(contentElement, options).then(canvas => {
//     const imgData = canvas.toDataURL('image/png');
//     const imgWidth = 500;
//     const imgHeight = canvas.height * (imgWidth / canvas.width);

//     const documentDefinition = {
//       content: [
//         {
//           image: imgData,
//           width: imgWidth,
//           height: imgHeight
//         }
//       ]
//     };

//     // ✅ Correction ici
//     (pdfMake as any).vfs = (pdfFonts as any).vfs;

//     const nomFichier = `Demande (${this.conge.typeConge.description}) - ${this.conge.agent.prenom} ${this.conge.agent.nom}.pdf`;
//     pdfMake.createPdf(documentDefinition).download(nomFichier);

//     this.isLoading = false; 
//   }).catch(() => {
//     this.isLoading = false; 
//   });
// }


generateWord(){
  let administratifDemande='assets/template-word/fiche-demande.docx';
  let maternite = 'assets/template-word/conge-maladie-maternite.docx';
  let maladie  = 'assets/template-word/conge-maladie-maternite.docx';
  let autres  = 'assets/template-word/conge-maladie-maternite.docx';
 

  let type= administratifDemande;
  // if(this.conge?.typeConge?.name=='ADMINISTRATIF'){
  //   type = administratifDemande
  // }
  // if(this.conge?.typeConge?.name=='MATERNITE'){
  //    type = maternite;
  // }
  // if(this.conge?.typeConge?.name=='MALADIE'){
  //   type = maladie;
  // }
  // if(this.conge?.typeConge?.name=='AUTRES'){
  //   type = autres;
  // }


  this.http.get(type, { responseType: 'arraybuffer' })
    .subscribe((template:any) => {
      let demande = this.conge;
      demande.genre = (this.conge?.agent?.sexe?.name === 'M') ? 'MONSIEUR' : 'MADAME';
      demande.dureeEnLettres = this.convertirNombreEnLettres(this.conge?.duree);
       

      if(demande.dateDemande!=undefined || !isNaN(demande.dateDemande)){
        demande.dateDemande = this.formatDate(new Date(demande.dateDemande));
      }
      if(demande.dateDebut!=undefined || !isNaN(demande.dateDebut)){
        demande.dateDebut = this.formatDate(new Date(demande.dateDebut));
      }
      this.generateWordService.generateDocument(demande, template,'Demande('+this.conge?.typeConge?.description+')-'+this.conge?.agent?.prenom+' '+this.conge?.agent?.nom);
    });
}

formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

formatDates() {
  if (this.conge?.dateDemande) {
    this.formattedDateDemande = this.formatDate(new Date(this.conge?.dateDemande));
  }
  if (this.conge?.dateDebut) {
    this.formattedDateDebut = this.formatDate(new Date(this.conge?.dateDebut));
  }
}
convertirNombreEnLettres(nombre: number): string {
  const unite = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const dizaine = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
  if (nombre < 10) {
    return unite[nombre];
  } else if (nombre < 20) {
    return ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'][nombre - 10];
  } else {
    const dizainePart = Math.floor(nombre / 10);
    const unitePart = nombre % 10;

    let result = dizaine[dizainePart];
    if (dizainePart === 7 || dizainePart === 9) {
      result = dizaine[dizainePart - 1] + '-' + ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'][unitePart];
    } else if (unitePart !== 0) {
      result += '-' + unite[unitePart];
    }

    return result;
  }
}

}
