// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class BudgetActivityService {
//
//   constructor(protected http: HttpClient) { }
//
//   //  Add budget to project
//   addBudgetActivity(budget: any): Observable<any> {
//     return this.http.post<any>(`${environment.baseUrl}budgetActivity`, budget);
//   }
//
//    //  update budget to project
//    updateBudgetActivity(budgetId: any, budget: any): Observable<any> {
//     return this.http.put<any>(`${environment.baseUrl}budgetActivity/${budgetId}`, budget);
//   }
//
//   //  Add budget to project
//   deleteBudgetActivity(budgetId: any): Observable<any> {
//     return this.http.delete<any>(`${environment.baseUrl}budgetActivity/${budgetId}`);
//   }
//
//   //read all budget of project
//   readBudgetActivity(req?: any): Observable<any> {
//
//     let parametres: HttpParams = new HttpParams();
//
//     if(req){
//       if(req?.projectId != undefined && req?.projectId){
//         parametres = parametres.append("projectId", req?.projectId);
//
//       }
//       if(req?.typeBudgetId != undefined){
//         parametres = parametres.append("typeBudgetId", req?.typeBudgetId);
//       }
//       if(req?.amount != undefined && req?.amount){
//         parametres = parametres.append("amount", req?.amount);
//       }
//       if(req?.allocation != undefined  && req?.allocation){
//         parametres = parametres.append("allocation", req?.allocation);
//       }
//       return this.http.get<any>(
//         `${environment.baseUrl}budgetActivity?page=${req.page}&size=${req.size}`,{
//           params: parametres
//         }
//       );
//     }else{
//       return this.http.get<any>(
//         `${environment.baseUrl}budgetActivity?page=${0}&size=${100000}`,{
//           params: parametres
//         }
//       );
//     }
//   }
//
//   importBudgetActivity(file: any, projectId: any) {
//     let formData: FormData = new FormData();
//     formData.append('file', file);
//     formData.append('projectId', projectId);
//
//     return this.http.post<any>(`${environment.baseUrl}budgets/import`, formData, {
//       observe: 'response'
//     });
//   }
//
//   exportMilestone() {
//     return this.http.get(`${environment.baseUrl}budgets/export`, {
//       responseType: 'blob'
//     });
//   }
//
// }
//

import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

interface BudgetActivity {
  id: string;
  activityId: string;
  label: string;
  amount: number;
  year: number;
  comment: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetActivityService {

  private mockBudgets: BudgetActivity[] = [
    // Activité 1.1.1 - Tenir des réunions statutaires du CIP
    {
      id: 'budget-1',
      activityId: 'activite-1-1-1',
      label: 'Budget réunions CIP T1',
      amount: 945000,
      year: 2025,
      comment: 'Frais de location salle, restauration, documentation',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-2',
      activityId: 'activite-1-1-1',
      label: 'Budget réunions CIP T2',
      amount: 945000,
      year: 2025,
      comment: 'Deuxième trimestre - mêmes postes',
      createdAt: '2025-03-01T00:00:00Z'
    },
    {
      id: 'budget-3',
      activityId: 'activite-1-1-1',
      label: 'Budget réunions CIP T3',
      amount: 945000,
      year: 2025,
      comment: 'Troisième trimestre',
      createdAt: '2025-06-01T00:00:00Z'
    },
    {
      id: 'budget-4',
      activityId: 'activite-1-1-1',
      label: 'Budget réunions CIP T4',
      amount: 945000,
      year: 2025,
      comment: 'Dernier trimestre de l\'année',
      createdAt: '2025-09-01T00:00:00Z'
    },

    // Activité 1.1.2 - Organiser des rencontres de dialogue social
    {
      id: 'budget-5',
      activityId: 'activite-1-1-2',
      label: 'Budget dialogue social - 4 régions',
      amount: 3750000,
      year: 2025,
      comment: 'Transport, hébergement, per diem participants',
      createdAt: '2025-01-10T00:00:00Z'
    },
    {
      id: 'budget-6',
      activityId: 'activite-1-1-2',
      label: 'Budget dialogue social - 5 régions',
      amount: 4687500,
      year: 2025,
      comment: 'Deuxième phase - régions restantes',
      createdAt: '2025-04-01T00:00:00Z'
    },
    {
      id: 'budget-7',
      activityId: 'activite-1-1-2',
      label: 'Budget dialogue social - 5 régions (suite)',
      amount: 4687500,
      year: 2025,
      comment: 'Troisième phase - consolidation',
      createdAt: '2025-07-01T00:00:00Z'
    },
    {
      id: 'budget-8',
      activityId: 'activite-1-1-2',
      label: 'Budget suivi post-dialogue',
      amount: 1875000,
      year: 2025,
      comment: 'Missions de suivi des engagements',
      createdAt: '2025-10-01T00:00:00Z'
    },

    // Activité 1.1.3 - Coordinations régionales
    {
      id: 'budget-9',
      activityId: 'activite-1-1-3',
      label: 'Budget coordinations régionales - Phase 1',
      amount: 4166667,
      year: 2025,
      comment: 'Tournée 7 régions - Transport et logistique',
      createdAt: '2025-02-01T00:00:00Z'
    },
    {
      id: 'budget-10',
      activityId: 'activite-1-1-3',
      label: 'Budget coordinations régionales - Phase 2',
      amount: 4166667,
      year: 2025,
      comment: 'Tournée 7 régions restantes',
      createdAt: '2025-05-01T00:00:00Z'
    },
    {
      id: 'budget-11',
      activityId: 'activite-1-1-3',
      label: 'Budget rencontres nationales',
      amount: 4166666,
      year: 2025,
      comment: 'Assemblée générale des coordinations',
      createdAt: '2025-08-01T00:00:00Z'
    },

    // Activité 1.1.4 - Comité technique
    {
      id: 'budget-12',
      activityId: 'activite-1-1-4',
      label: 'Budget CT - Janvier',
      amount: 700000,
      year: 2025,
      comment: 'Première session - Frais de réunion',
      createdAt: '2025-01-05T00:00:00Z'
    },
    {
      id: 'budget-13',
      activityId: 'activite-1-1-4',
      label: 'Budget CT - Avril',
      amount: 700000,
      year: 2025,
      comment: 'Deuxième session',
      createdAt: '2025-03-20T00:00:00Z'
    },
    {
      id: 'budget-14',
      activityId: 'activite-1-1-4',
      label: 'Budget CT - Juillet',
      amount: 700000,
      year: 2025,
      comment: 'Troisième session',
      createdAt: '2025-06-20T00:00:00Z'
    },
    {
      id: 'budget-15',
      activityId: 'activite-1-1-4',
      label: 'Budget CT - Octobre',
      amount: 700000,
      year: 2025,
      comment: 'Quatrième session',
      createdAt: '2025-09-20T00:00:00Z'
    },

    // Activité 1.2.1 - Etude d'impact
    {
      id: 'budget-16',
      activityId: 'activite-1-2-1',
      label: 'Budget étude - Honoraires consultant',
      amount: 25000000,
      year: 2025,
      comment: 'Recrutement cabinet d\'études',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-17',
      activityId: 'activite-1-2-1',
      label: 'Budget étude - Collecte de données',
      amount: 12000000,
      year: 2025,
      comment: 'Enquêtes terrain, focus groups',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-18',
      activityId: 'activite-1-2-1',
      label: 'Budget étude - Analyse et rapportage',
      amount: 8000000,
      year: 2025,
      comment: 'Traitement données, rédaction rapport',
      createdAt: '2025-04-01T00:00:00Z'
    },

    // Activité 1.2.2 - Atelier de restitution
    {
      id: 'budget-19',
      activityId: 'activite-1-2-2',
      label: 'Budget atelier de restitution',
      amount: 8500000,
      year: 2025,
      comment: 'Location salle, hébergement 80 participants, restauration, documentation',
      createdAt: '2025-06-01T00:00:00Z'
    },

    // Activité 2.1.1 - Actualisation RNU
    {
      id: 'budget-20',
      activityId: 'activite-2-1-1',
      label: 'Budget RNU - Collecte de données',
      amount: 50000000,
      year: 2025,
      comment: 'Déploiement 200 agents, tablettes, connexion',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-21',
      activityId: 'activite-2-1-1',
      label: 'Budget RNU - Plateforme informatique',
      amount: 35000000,
      year: 2025,
      comment: 'Développement système, serveurs, maintenance',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-22',
      activityId: 'activite-2-1-1',
      label: 'Budget RNU - Validation et nettoyage',
      amount: 25000000,
      year: 2025,
      comment: 'Agents de validation, contrôle qualité',
      createdAt: '2025-04-01T00:00:00Z'
    },
    {
      id: 'budget-23',
      activityId: 'activite-2-1-1',
      label: 'Budget RNU - Impression cartes bénéficiaires',
      amount: 15000000,
      year: 2025,
      comment: 'Production 500,000 cartes',
      createdAt: '2025-05-01T00:00:00Z'
    },

    // Activité 2.1.2 - Formation agents
    {
      id: 'budget-24',
      activityId: 'activite-2-1-2',
      label: 'Budget formation agents - Cohorte 1',
      amount: 6000000,
      year: 2025,
      comment: 'Formation 60 agents - Module ciblage',
      createdAt: '2025-01-15T00:00:00Z'
    },
    {
      id: 'budget-25',
      activityId: 'activite-2-1-2',
      label: 'Budget formation agents - Cohorte 2',
      amount: 6000000,
      year: 2025,
      comment: 'Formation 60 agents supplémentaires',
      createdAt: '2025-02-01T00:00:00Z'
    },
    {
      id: 'budget-26',
      activityId: 'activite-2-1-2',
      label: 'Budget formation agents - Cohorte 3',
      amount: 6000000,
      year: 2025,
      comment: 'Dernière cohorte 60 agents',
      createdAt: '2025-02-15T00:00:00Z'
    },

    // Activité 2.1.3 - Missions de contrôle
    {
      id: 'budget-27',
      activityId: 'activite-2-1-3',
      label: 'Budget missions contrôle - Phase 1',
      amount: 11000000,
      year: 2025,
      comment: '8 missions régionales - Transport et hébergement',
      createdAt: '2025-04-01T00:00:00Z'
    },
    {
      id: 'budget-28',
      activityId: 'activite-2-1-3',
      label: 'Budget missions contrôle - Phase 2',
      amount: 11000000,
      year: 2025,
      comment: '8 missions de vérification finale',
      createdAt: '2025-10-01T00:00:00Z'
    },

    // Activité 2.2.1 - Digitalisation paiement
    {
      id: 'budget-29',
      activityId: 'activite-2-2-1',
      label: 'Budget plateforme - Développement',
      amount: 45000000,
      year: 2025,
      comment: 'Développement application mobile et back-office',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-30',
      activityId: 'activite-2-2-1',
      label: 'Budget plateforme - Infrastructure',
      amount: 25000000,
      year: 2025,
      comment: 'Serveurs, licences, sécurité',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-31',
      activityId: 'activite-2-2-1',
      label: 'Budget plateforme - Tests et déploiement',
      amount: 15000000,
      year: 2025,
      comment: 'Phase pilote 5000 bénéficiaires',
      createdAt: '2025-03-01T00:00:00Z'
    },

    // Activité 2.2.2 - Formation mobile money
    {
      id: 'budget-32',
      activityId: 'activite-2-2-2',
      label: 'Budget formation mobile money',
      amount: 12000000,
      year: 2025,
      comment: 'Sensibilisation 50,000 bénéficiaires',
      createdAt: '2025-04-01T00:00:00Z'
    },

    // Activité 2.3.1 - Campagnes de sensibilisation
    {
      id: 'budget-33',
      activityId: 'activite-2-3-1',
      label: 'Budget campagne - Phase 1',
      amount: 14000000,
      year: 2025,
      comment: 'Sensibilisation communautaire 7 régions',
      createdAt: '2025-02-01T00:00:00Z'
    },
    {
      id: 'budget-34',
      activityId: 'activite-2-3-1',
      label: 'Budget campagne - Phase 2',
      amount: 14000000,
      year: 2025,
      comment: 'Extension 7 régions restantes',
      createdAt: '2025-08-01T00:00:00Z'
    },

    // Activité 2.3.2 - Emissions médias
    {
      id: 'budget-35',
      activityId: 'activite-2-3-2',
      label: 'Budget émissions T2',
      amount: 7500000,
      year: 2025,
      comment: 'Production 6 émissions radio/TV',
      createdAt: '2025-03-01T00:00:00Z'
    },
    {
      id: 'budget-36',
      activityId: 'activite-2-3-2',
      label: 'Budget émissions T4',
      amount: 7500000,
      year: 2025,
      comment: 'Production 6 émissions supplémentaires',
      createdAt: '2025-09-01T00:00:00Z'
    },

    // Activité 3.1.1 - Réunions de coordination
    {
      id: 'budget-37',
      activityId: 'activite-3-1-1',
      label: 'Budget coordination T1',
      amount: 1125000,
      year: 2025,
      comment: 'Réunions hebdomadaires + logistique',
      createdAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'budget-38',
      activityId: 'activite-3-1-1',
      label: 'Budget coordination T2',
      amount: 1125000,
      year: 2025,
      comment: 'Continuation des réunions',
      createdAt: '2025-04-01T00:00:00Z'
    },
    {
      id: 'budget-39',
      activityId: 'activite-3-1-1',
      label: 'Budget coordination T3',
      amount: 1125000,
      year: 2025,
      comment: 'Réunions de coordination',
      createdAt: '2025-07-01T00:00:00Z'
    },
    {
      id: 'budget-40',
      activityId: 'activite-3-1-1',
      label: 'Budget coordination T4',
      amount: 1125000,
      year: 2025,
      comment: 'Dernières réunions de l\'année',
      createdAt: '2025-10-01T00:00:00Z'
    },

    // Activité 3.2.1 - Acquisition véhicules
    {
      id: 'budget-41',
      activityId: 'activite-3-2-1',
      label: 'Budget véhicules - 10 Pick-up 4x4',
      amount: 120000000,
      year: 2025,
      comment: 'Acquisition 10 véhicules tout-terrain',
      createdAt: '2025-02-01T00:00:00Z'
    },
    {
      id: 'budget-42',
      activityId: 'activite-3-2-1',
      label: 'Budget véhicules - 5 berlines',
      amount: 40000000,
      year: 2025,
      comment: 'Acquisition 5 berlines service',
      createdAt: '2025-02-01T00:00:00Z'
    },
    {
      id: 'budget-43',
      activityId: 'activite-3-2-1',
      label: 'Budget accessoires et équipements',
      amount: 20000000,
      year: 2025,
      comment: 'GPS, trousses de secours, équipements',
      createdAt: '2025-05-01T00:00:00Z'
    }
  ];

  private currentId = 44;

  constructor() {}

  readBudgetActivity(params: any): Observable<any> {
    return of(null).pipe(
        delay(500),
        () => {
          let filtered = [...this.mockBudgets];

          if (params.projectId) {
            filtered = filtered.filter(b => b.activityId === params.projectId);
          }

          if (params.libelle) {
            filtered = filtered.filter(b =>
                b.label.toLowerCase().includes(params.libelle.toLowerCase())
            );
          }

          if (params.year) {
            filtered = filtered.filter(b => b.year === Number(params.year));
          }

          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          const page = params.page || 0;
          const size = params.size || 20;
          const start = page * size;
          const end = start + size;
          const paginatedData = filtered.slice(start, end);

          return of({
            content: paginatedData,
            totalElements: filtered.length,
            totalPages: Math.ceil(filtered.length / size),
            size: size,
            number: page
          });
        }
    );
  }

  createBudgetActivity(budget: any): Observable<any> {
    return of(null).pipe(
        delay(300),
        () => {
          const newBudget: BudgetActivity = {
            id: String(this.currentId++),
            activityId: budget.activityId,
            label: budget.label,
            amount: budget.amount,
            year: budget.year || 2025,
            comment: budget.comment || '',
            createdAt: new Date().toISOString()
          };

          this.mockBudgets.push(newBudget);
          console.log('✅ Budget créé:', newBudget);
          return of(newBudget);
        }
    );
  }

  updateBudgetActivity(id: any, budget: any): Observable<any> {
    return of(null).pipe(
        delay(300),
        () => {
          const index = this.mockBudgets.findIndex(b => b.id === String(id));

          if (index === -1) {
            return throwError(() => ({
              error: { message: 'Budget non trouvé' }
            }));
          }

          this.mockBudgets[index] = {
            ...this.mockBudgets[index],
            label: budget.label,
            amount: budget.amount,
            year: budget.year || this.mockBudgets[index].year,
            comment: budget.comment || ''
          };

          console.log('✅ Budget mis à jour:', this.mockBudgets[index]);
          return of(this.mockBudgets[index]);
        }
    );
  }

  deleteBudgetActivity(id: any): Observable<any> {
    return of(null).pipe(
        delay(300),
        () => {
          const index = this.mockBudgets.findIndex(b => b.id === String(id));

          if (index === -1) {
            return throwError(() => ({
              error: { message: 'Budget non trouvé' }
            }));
          }

          const deleted = this.mockBudgets.splice(index, 1)[0];
          console.log('🗑️ Budget supprimé:', deleted);
          return of({ success: true, message: 'Budget supprimé avec succès' });
        }
    );
  }
}
