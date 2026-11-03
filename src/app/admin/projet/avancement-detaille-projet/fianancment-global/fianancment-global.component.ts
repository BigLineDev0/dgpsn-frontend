import { Component, OnInit } from '@angular/core';
import { ManangementUnitService } from 'src/app/services/manangement-unit/manangement-unit.service';

@Component({
  selector: 'app-fianancment-global',
  templateUrl: './fianancment-global.component.html',
  styleUrls: ['./fianancment-global.component.scss']
})
export class FianancmentGlobalComponent implements OnInit {
  projets: any[] = [];
  // currentValue: number = 150; 
  maxValue: number = 100;

  constructor(private projetService: ManangementUnitService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProgressbarColor(tauxExecution: any): string{
    if(tauxExecution <= 0.00) return 'light';
    else if (tauxExecution >= 1 && tauxExecution <= 100) return 'primary';
    else return 'danger';
  }

  getPercentage(currentValue: any): any {
    return ((currentValue / this.maxValue) * 100).toFixed(2);
  }

  calculateRowspan(node: any): number {
    if (!node.children || node.children.length === 0) {
      return 1;
    }
  
    // Calculer le rowspan total en parcourant les enfants
    return node.children.map((child:any) => this.calculateRowspan(child)).reduce((acc: any, val: any) => acc + val, 0);
  }

  renderRows(projet: any) {
    const rows: any[] = [];
  
    // Vérifie si le projet a des enfants (composantes)
    if (projet.children && projet.children.length > 0) {
      projet.children.forEach((composante: any, compIndex: number) => {
        if (composante.children && composante.children.length > 0) {
          composante.children.forEach((resultat: any, resIndex: number) => {
            if (resultat.children && resultat.children.length > 0) {
              resultat.children.forEach((produit: any, prodIndex: number) => {
                if (produit.children && produit.children.length > 0) {
                  produit.children.forEach((activite: any, actIndex: number) => {
                    rows.push({
                      projet: compIndex === 0 && resIndex === 0 && prodIndex === 0 && actIndex === 0 ? { ...projet, rowspan: this.calculateRowspan(projet) } : null,
                      composante: resIndex === 0 && prodIndex === 0 && actIndex === 0 ? { ...composante, rowspan: this.calculateRowspan(composante) } : null,
                      resultat: prodIndex === 0 && actIndex === 0 ? { ...resultat, rowspan: this.calculateRowspan(resultat) } : null,
                      produit: actIndex === 0 ? { ...produit, rowspan: this.calculateRowspan(produit) } : null,
                      activite: activite
                    });
                  });
                } else {
                  // Si le produit n'a pas d'activités
                  rows.push({
                    projet: compIndex === 0 && resIndex === 0 && prodIndex === 0 ? { ...projet, rowspan: this.calculateRowspan(projet) } : null,
                    composante: resIndex === 0 && prodIndex === 0 ? { ...composante, rowspan: this.calculateRowspan(composante) } : null,
                    resultat: prodIndex === 0 ? { ...resultat, rowspan: this.calculateRowspan(resultat) } : null,
                    produit: { ...produit, rowspan: 1 },
                    activite: null
                  });
                }
              });
            } else {
              // Si le résultat n'a pas de produits
              rows.push({
                projet: compIndex === 0 && resIndex === 0 ? { ...projet, rowspan: this.calculateRowspan(projet) } : null,
                composante: resIndex === 0 ? { ...composante, rowspan: this.calculateRowspan(composante) } : null,
                resultat: { ...resultat, rowspan: 1 },
                produit: null,
                activite: null
              });
            }
          });
        } else {
          // Si la composante n'a pas de résultats
          rows.push({
            projet: compIndex === 0 ? { ...projet, rowspan: this.calculateRowspan(projet) } : null,
            composante: { ...composante, rowspan: 1 },
            resultat: null,
            produit: null,
            activite: null
          });
        }
      });
    } else {
      // Si le projet n'a pas de composantes
      rows.push({
        projet: { ...projet, rowspan: 1 },
        composante: null,
        resultat: null,
        produit: null,
        activite: null
      });
    }
  
    return rows;
  }
  
  

  getProjects() {
    this.projetService.readAllProjectsWithTree().subscribe({
      next: response => {
        this.projets = response.body;
        console.log('RESPONSE:', this.projets);
      },
      error: response => {
        console.error('Erreur lors du chargement des projets:', response);
      }
    });
  }

  getType(name: any): any {
    let type = '';
    switch (name) {
      case 'PROJECT':
        type = 'Projet'
        break;
      case 'COMPONENT':
        type = 'Composante'
        break;
      case 'RESULT':
        type = 'Resultat'
        break;
      case 'PRODUCT':
        type = 'Produit'
        break;
      case 'ACTIVITY':
      type = 'Activité'
        break;
      default:
        break;
    }
    return type;
  }
}
