// import { Component, Input } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//     selector: 'app-footer',
//     imports: [RouterLink],
//     templateUrl: './footer.component.html',
//     styles: ``
// })
// export class FooterComponent {
//     currentYear = new Date().getFullYear()
//     @Input() logo!: string;
//     @Input() containerClass!: string;
// }

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


interface Service {
  name: string;
  imageUrl: string;
}

interface FooterData {
  services: Service[];
  displayCount: number;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  @Input() logo!: string;
  @Input() containerClass!: string;

  footerData: FooterData = {
    services: [
      {
        name: "Conseil juridique",
        imageUrl: "assets/img/all-images/service-img1.png"
      },
      {
        name: "Dépôt de plainte",
        imageUrl: "assets/img/all-images/service-img2.png"
      },
      {
        name: "Assistance aux litiges",
        imageUrl: "assets/img/all-images/service-img3.png"
      },
      {
        name: "Médiation et conciliation",
        imageUrl: "assets/img/all-images/service-img3.png"
      },
      {
        name: "Accès aux tribunaux",
        imageUrl: "assets/img/all-images/service-img3.png"
      }
    ],
    displayCount: 5
  };
}