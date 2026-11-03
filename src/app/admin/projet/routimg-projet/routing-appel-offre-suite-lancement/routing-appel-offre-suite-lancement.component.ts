import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-routing-appel-offre-suite-lancement',
  templateUrl: './routing-appel-offre-suite-lancement.component.html',
  styleUrls: ['./routing-appel-offre-suite-lancement.component.scss']
})
export class RoutingAppelOffreSuiteLancementComponent implements OnInit {
 
  @Input() addButtontitle!: string;
  @Input() pageTitle!: string;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
