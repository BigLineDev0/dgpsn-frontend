import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DirectionService } from 'src/app/services/direction/direction.service';
import { Alertes } from 'src/app/util/alerte';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-form-orgarganigramme',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-orgarganigramme.component.html',
  styleUrls: ['./form-orgarganigramme.component.scss']
})
export class FormOrgarganigrammeComponent {
  form: FormGroup = new FormGroup({});
  @Input() directionToUpdate: any;
  @Input() directionParent: any;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private directionService: DirectionService,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      code: new FormControl('', Validators.required),
      libelle: new FormControl('', Validators.required)
    });

    if (this.directionToUpdate !== undefined) {
      this.setForm();
    }
  }

  setForm() {
    this.form.controls['code'].setValue(this.directionToUpdate.code);
    this.form.controls['libelle'].setValue(this.directionToUpdate.libelle);
  }

  save() {
    const direction = this.form.value;
    direction.parentId = this.directionParent.id;
    if (this.directionToUpdate === undefined) {
      this.createDirection(direction)
    } else {
      this.updateDirection(direction);
    }
  }

  createDirection(direction: any) {
    this.directionService.createDirection(direction).subscribe({
      next: (value: any) => {
        Alertes.alerteAddSuccess();
        this.close(true)
      },
      error: (value: any) => { 
        Alertes.alerteAddDanger(value.message)
        this.close(false)
      }
    })
  }

  updateDirection(direction: any) {
    this.directionService.updateDirection(this.directionToUpdate.id, direction).subscribe({
      next: (value: any) => {
        Alertes.alerteAddSuccess();
        this.close(true)
      },
      error: (value: any) => { 
        Alertes.alerteAddDanger(value.message)
        this.close(false)
      }
    })
  }

  close(value: boolean) {
    this.submit.emit(value);
    // this.modal.close()
  }
}
