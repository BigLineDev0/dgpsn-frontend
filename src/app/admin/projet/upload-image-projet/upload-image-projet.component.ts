import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManangementUnitService } from 'src/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-upload-image-projet',
  templateUrl: './upload-image-projet.component.html',
  styleUrls: ['./upload-image-projet.component.scss']
})
export class UploadImageProjetComponent {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @Input() projetId: any;

  file: any;

  constructor(private managementUnitService:ManangementUnitService,) {}

  fileChange(event: any){
    this.file = event.target.files[0];
  }

  close(){
    this.submit.emit(true);
  }

  save() {
    this.managementUnitService.ulpoadImage(this.projetId, this.file).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Upload reussi');
      },
      error:(error)=>{ 
        Alertes.alerteAddDanger(error.error.message)
      },
      complete: () => this.close()
    })
  }

}
