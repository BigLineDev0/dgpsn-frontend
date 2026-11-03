import { Component } from '@angular/core';
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-agent-routing',
  standalone:true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './agent-routing.component.html',
  styleUrl: './agent-routing.component.scss'
})
export class AgentRoutingComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  activeUrl(url: string, tooltip: NgbTooltip) {
    const currentUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
    if (url === currentUrl) {
      tooltip.open();
      return 'text-orange';
    }
    return 'text-secondary';
  }

}
