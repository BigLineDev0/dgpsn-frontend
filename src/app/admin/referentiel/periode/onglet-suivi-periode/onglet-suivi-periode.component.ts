import { Component, Input, OnInit } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onglet-suivi-periode',
  templateUrl: './onglet-suivi-periode.component.html',
  styleUrls: ['./onglet-suivi-periode.component.scss']
})
export class OngletSuiviPeriodeComponent implements OnInit {

  @Input() addButtontitle!: string;
  @Input() pageTitle!: string;

  constructor(private router: ActivatedRoute) {
  }

    ngOnInit() {
  }

  activeUrl(url: any, tooltip: NgbTooltip) {
  if((url === this.router.snapshot.url[0].path)) {    tooltip.open();
    return 'text-orange';
   }
   return 'text-secondary';
  }
}
