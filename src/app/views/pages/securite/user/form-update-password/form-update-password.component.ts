import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Alertes } from 'src/app/util/alerte';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-form-update-password',
  templateUrl: './form-update-password.component.html',
  styleUrls: ['./form-update-password.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  standalone: true
})
export class FormUpdatePasswordComponent implements OnInit {
  @Input() user: any;
  @Output() updatePassword: EventEmitter<any> = new EventEmitter();
  form: FormGroup = new FormGroup({});
  login: string | null = '';
  isAdmin: boolean = false

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    console.log("user",this.user)

    if(this.user == null){
      this.login = localStorage.getItem('username');
      this.isAdmin = false;
    }else {
      console.log("user not null",this.user)
      if (this.user.login && this.user.login != 'admin') {
        this.login = this.user?.login
        this.isAdmin = false;
      }else{
        this.login = localStorage.getItem('username');
        this.isAdmin = true;
      }

    }
    this.initForm();

  }

  initForm() {
    if(this.isAdmin) {
      this.form = new FormGroup(
        {
          password: new FormControl('', Validators.required),
          confirmPassword: new FormControl('', Validators.required),
        }
      );
    }else {
      this.form = new FormGroup(
        {
          password: new FormControl('', Validators.required),
          confirmPassword: new FormControl('', Validators.required),
          holdPassword:  new FormControl('', Validators.required),
        }
      );
    }

  }
  save() {
    let userToUpdate = this.form.value;
    userToUpdate.login = this.login;
    // console.log("userToUpdate ", userToUpdate)
    if(userToUpdate.password !== userToUpdate.confirmPassword) {
      Alertes.alerteGlobal("", "le mot de passe et sa confirmation doivent être identiques")
    } else {
      this.userService.updatePassword(userToUpdate).subscribe({
        next: value => {
          Alertes.alerteUpdateSuccess();
          this.updatePassword.emit(true);
        },
        error: (value) => {
          console.log("error ", value)
          // Alertes.alerteUpdateDanger(value.error?.message)
          Alertes.errorPopPup('Erreur', value.error?.message)
        },
        complete: () => {
          // this.updatePassword.emit(true);
        }
      })
    }

  }

  close() {
    this.updatePassword.emit(false);
  }

  togglePassword(input: any) {
    input.type === 'password' ?  input.type = 'text' : input.type = 'password';
  }

  getIcon(input: any): any {
    return {
      off: input.type === 'password',
      on: input.type === 'text'
    }
  }

}
