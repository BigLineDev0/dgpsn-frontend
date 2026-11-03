import { CongeService } from '@/app/services/conge/conge.service';
import { GenerateWordService } from '@/app/services/generate-word/generate-word.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
import { NgbPaginationModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-cessation',
   imports: [
    CommonModule,
     NgbPaginationModule,
        NgbDropdownModule,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
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
       
  ],
  templateUrl: './cessation.component.html',
  styleUrl: './cessation.component.scss'
})
export class CessationComponent {

 objectNumChildren:any;
  objectNumChildrenWords:any;
  formattedDateDemande!: string;
  formattedDateDebut!:string
  @Input()typeConge:any
  isLoading !:boolean; 
  @Input() renseignementFiche!: boolean;
  @Input()conge:any;
  @ViewChild('content', { static: false }) content!: ElementRef;

  ngOnInit() {
   this.getNumberOfChildren();
  }
  constructor(
    private http: HttpClient,
    private generateWordService:GenerateWordService,
      private congeService: CongeService,
  ) {}

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
  //   //   (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  //   //     pdfMake.createPdf(documentDefinition).download('fiche-renseignement ('+this.conge.typeConge.description+')-'+this.conge.agent.prenom+' '+this.conge.agent.nom);
  //   // });
  //   (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  //   pdfMake.createPdf(documentDefinition).download('fiche-renseignement ('+this.conge.typeConge.description+')-'+this.conge.agent.prenom+' '+this.conge.agent.nom);
  //     this.isLoading = false; 
  //   }).catch(() => {
  //     this.isLoading = false; 
  //   });

  // }

getNumberOfChildren() { 
  let nomberChildren = this.conge.agent.id;
  this.congeService.readNumberChildrensByAgentId(nomberChildren).subscribe({
      next: (response) => {
          const numberOfChildren = response.body;
          const numberOfChildrenWords = this.numberToWords(numberOfChildren);
          this.objectNumChildren = numberOfChildren;
          this.objectNumChildrenWords = numberOfChildrenWords;
      },
  });
}

generateWord(){
  let renseignementFiche='assets/template-word/cessation-service.docx';
 
  let type='';
  type = renseignementFiche

  this.http.get(type, { responseType: 'arraybuffer' })
    .subscribe((template:any) => {
      let demande = this.conge;
      demande.conge.objectNumChildrenDisplay = `${this.objectNumChildrenWords} (${this.objectNumChildren})`;
      console.log('demande',demande)
      if(demande?.conge?.dateDepart!=undefined || !isNaN(demande?.conge?.dateDepart)){
         demande.conge.dateDepart = this.formatDate(new Date(demande?.conge?.dateDepart));
      }
      if(demande?.conge?.dateReprise!=undefined || !isNaN(demande?.conge?.dateReprise)){
        demande.conge.dateReprise = this.formatDate(new Date(demande?.conge?.dateReprise));
      }
      this.generateWordService.generateDocument(demande, template,'cessation-service ('+this.conge?.conge?.typeConge.description+')-'+this.conge?.conge?.agent?.prenom+' '+this.conge?.conge?.agent?.nom);
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
  if (this.conge?.conge?.dateDepart) {
    this.formattedDateDemande = this.formatDate(new Date(this.conge?.conge?.dateDepart));
  }
  if (this.conge?.conge?.dateReprise) {
    this.formattedDateDebut = this.formatDate(new Date(this.conge?.conge?.dateReprise));
  }
}
numberToWords(number:any) {
  const units = ['zero', 'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix', 'Onze', 'Douze', 'Treize', 'Quatorze', 'Quinze', 'Seize'];
  const tens = ['', '', 'Vingt', 'Trente', 'Quarante', 'Cinquante', 'Soixante', 'Soixante-dix', 'Quatre-vingt', 'Quatre-vingt-dix'];

  if (number < 17) {
      return units[number];
  } else if (number < 20) {
      return 'Dix-' + units[number - 10];
  } else if (number < 70 || (number < 80 && number % 10 === 0)) {
      return tens[Math.floor(number / 10)] + (number % 10 !== 0 ? '-' + units[number % 10] : '');
  } else if (number === 80) {
      return 'Quatre-vingts';
  } else if (number < 100) {
      return 'Quatre-vingt-' + units[number % 20];
  } else {
      return 'Nombre trop grand';
  }
}

}



