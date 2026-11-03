import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GenerateWordService } from '@/app/services/generate-word/generate-word.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-model-ordre-mission',
  imports: [],
  templateUrl: './model-ordre-mission.component.html',
  styleUrl: './model-ordre-mission.component.scss'
})
export class ModelOrdreMissionComponent {
 @Input()ordre:any;
  objetordre:any
  @Input() demande:any;
  formattedDateDemande!: string;
  formattedDateDebut!:string
  @Input() OrdreMission !: boolean;
  dureeEnLettres!: string;
  isLoading !:boolean;
  sexe!:string;
  @ViewChild('content', { static: false }) content!: ElementRef;
  constructor(
    private http: HttpClient,
    private generateWordService:GenerateWordService,
  ) {
  }
  ngOnInit() {
  }

generateWord(){
  let OrdreMission ='assets/template-word/modele-ordres-mission.docx';
  let type= OrdreMission ;
  this.http.get(type, { responseType: 'arraybuffer' })
    .subscribe((template:any) => {
      let demande = this.ordre;
     
      if(demande.dateDepartOrdre!=undefined || !isNaN(demande.dateDepartOrdre)){
        demande.dateDepartOrdre = this.formatDate(new Date(demande.dateDepartOrdre));
      }
      if(demande.dateRetourOrdre!=undefined || !isNaN(demande.dateRetourOrdre)){
        demande.dateRetourOrdre = this.formatDate(new Date(demande.dateRetourOrdre));
      }
      this.generateWordService.generateDocument(demande, template,'Ordre-de-mission '+this.ordre?.agent?.prenom+' '+this.ordre?.agent?.nom);
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
  if (this.ordre?.dateDepartOrdre) {
    this.formattedDateDemande = this.formatDate(new Date(this.ordre?.dateDepartOrdre));
  }
  if (this.ordre?.dateRetourOrdre) {
    this.formattedDateDebut = this.formatDate(new Date(this.ordre?.dateRetourOrdre));
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
