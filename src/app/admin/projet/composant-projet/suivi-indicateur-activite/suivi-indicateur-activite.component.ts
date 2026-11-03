import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-suivi-indicateur-activite',
  imports: [
    RouterLink,
    NgbTooltip,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './suivi-indicateur-activite.component.html',
  styleUrl: './suivi-indicateur-activite.component.scss'
})
export class SuiviIndicateurActiviteComponent implements OnInit{
  @Input() addButtontitle!: string;
  @Input() pageTitle!: string;
  @ViewChildren(NgbTooltip) tooltips!: QueryList<NgbTooltip>;

  constructor(
      private readonly router: ActivatedRoute,
  ) {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // Ouvrir le tooltip de la page active après l'initialisation de la vue
    setTimeout(() => {
      const currentPath = this.router.snapshot.url[0]?.path;

      this.tooltips.forEach((tooltip, index) => {
        const urls = ['tache', 'source-financement', 'execution'];
        if (urls[index] === currentPath) {
          tooltip.open();
        }
      });
    });
  }

  isActiveUrl(url: string): boolean {
    return url === this.router.snapshot.url[0]?.path;
  }


}
