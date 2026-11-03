import {Component, Input, OnInit} from '@angular/core';
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-routing-appel-offre-projet',
  templateUrl: './routing-appel-offre-projet.component.html',
  styleUrls: ['./routing-appel-offre-projet.component.scss']
})
export class RoutingAppelOffreProjetComponent implements OnInit{
  @Input() addButtontitle!: string;
  @Input() pageTitle!: string;

  constructor(
    private router: ActivatedRoute
  ) {
  }
  ngOnInit() {
  }

  activeUrl(url: any, tooltip: NgbTooltip) {
    if((url === this.router.snapshot.url[0].path+'/'+this.router.snapshot.url[1].path)) {
      tooltip.open();
      return 'text-orange';
    }
    return 'text-secondary';
  }
}
