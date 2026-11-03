
import { Component, computed, OnInit, signal, inject, TemplateRef,Inject, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgIf, NgFor, DatePipe, SlicePipe, LowerCasePipe, DOCUMENT } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { AlertDetailsModalComponent } from '@layouts/admin-layout/navbar/alert-details-modal/alert-details-modal.component';
import { AuthService } from '@/app/services/auth/auth.service';
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Alert } from '@/app/admin/alerte/config-alerte/config-alerte.component';
import {AlerteService} from "../../../services/alerte/alerte.service";
import { DetailsAlerteComponent } from '@/app/admin/alerte/details-alerte/details-alerte.component';
// import { ThemeModeService } from '../../../core/services/theme-mode.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgbDropdownModule,
    NgIf,
    NgFor,
    DatePipe,
    SlicePipe,
    LowerCasePipe,
    NgClass,
    RouterModule,
    DetailsAlerteComponent,
    AlertDetailsModalComponent,
      HasAnyAuthorityDirective

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private modalRef: any;
  pageOptions: any = {page: 0, size: 1000};
  @ViewChild('matriculeInput') matriculeInput!: ElementRef;
  currentTheme!: string;
   alertes = signal<Alert[]>([])
   alerte = signal<Alert | null>(null)
  countAlertes = computed(() => this.alertes().length);
  userName: any;
  userToUpdate: any;
  newAlerte = true
  listAlertes:any;
  title: any;
  nameUser: any = '';
  fonctionUser: any = '';
  profileLibelle: any = '';

  constructor(
     @Inject(DOCUMENT) private document: Document,
    private router: Router, private authService: AuthService,
    private alerteService : AlerteService,
    private modalService: NgbModal
  ) {}


 ngOnInit(): void {
    this.getUserName();
    this.getInfosUser();
    this.getAllAlertes();

  }

  getInfosUser() {
    let token = sessionStorage.getItem("accessToken")
    if (token) {
      const decode = new JwtHelperService();
      const decodedToken = decode.decodeToken(token);
      this.nameUser = decodedToken?.nameAgent;
      this.fonctionUser = decodedToken?.nameFonction;
      this.profileLibelle = decodedToken?.profileLibelle;
    }
  }

  openUrl(url:any) {
    // localStorage.setItem('idAgent',this.idAgent);
    this.modalService.dismissAll();
    this.router.navigateByUrl(url);
  }
  openFiche(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }).catch((res) => {});
  }

  focusOnInput() {
    this.matriculeInput.nativeElement.focus();
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
 onLogout() {
    this.authService.signOut();
  }

  getUserName() {
     this.userName = localStorage.getItem('username');
  }

  getAllAlertes() {
    let req = {page: 0, size: 1000, read: false}
    this.alerteService.readAll(req).subscribe({
      next: value => {
        this.listAlertes = value.content;
        if(this.listAlertes?.length > 0) {
          this.title = `${this.listAlertes.length} nouvel(les) notification(s)`;
          this.newAlerte = true;
        }else {
          this.newAlerte = false;
        }
      }
    })
  }

  viewAlerte(content: TemplateRef<any>, alert?: any) {
    // event.preventDefault();
    this.alerte = alert;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }).catch((res) => {});
  }

  viewAllAlerte(event: any, listAlertes: any[]) {
    event.preventDefault();
    this.router.navigateByUrl('admin/acces/main-alerte');
  }

  fermer(){
    // window.location.reload();
    let req = {page: 0, size: 20, username: this.userName}
    this.modalService.dismissAll();
    window.location.reload();
    //  this.getAllAlertes();
  }

  getMessage(message: any) {
    return message?.substring(0, 70) + "...";
  }

  openBasicModal(content: TemplateRef<any>, user?: any) {
    this.userToUpdate = user;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
    }
  }

  closeuPdate(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.onLogout();
    }else {
      this.modalService.dismissAll();
    }
  }

}
