import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

interface Planification {
    id: string;
    activityId: string;
    trimestre: number;
    mois: number;
    dateDebut: string;
    dateFin: string;
    statut: 'PLANIFIE' | 'EN_COURS' | 'TERMINE';
    semaines: number[];
    commentaire: string;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlanificationService {

    private mockPlanifications: Planification[] = [
        // Activité 1.1.1 - Tenir des réunions statutaires du CIP
        {
            id: 'plan-1',
            activityId: 'activite-1-1-1',
            trimestre: 1,
            mois: 1,
            dateDebut: '2025-01-06',
            dateFin: '2025-01-31',
            statut: 'TERMINE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Réunions du CIP - Janvier complété',
            createdAt: '2025-01-01T00:00:00Z'
        },
        {
            id: 'plan-2',
            activityId: 'activite-1-1-1',
            trimestre: 2,
            mois: 4,
            dateDebut: '2025-04-01',
            dateFin: '2025-04-30',
            statut: 'PLANIFIE',
            semaines: [2, 4],
            commentaire: 'Réunions du CIP prévues semaines 2 et 4',
            createdAt: '2025-03-01T00:00:00Z'
        },
        {
            id: 'plan-3',
            activityId: 'activite-1-1-1',
            trimestre: 3,
            mois: 7,
            dateDebut: '2025-07-07',
            dateFin: '2025-07-31',
            statut: 'PLANIFIE',
            semaines: [2, 4],
            commentaire: 'Réunions trimestrielles du CIP',
            createdAt: '2025-06-01T00:00:00Z'
        },
        {
            id: 'plan-4',
            activityId: 'activite-1-1-1',
            trimestre: 4,
            mois: 10,
            dateDebut: '2025-10-06',
            dateFin: '2025-10-31',
            statut: 'PLANIFIE',
            semaines: [2, 4],
            commentaire: 'Dernières réunions statutaires de l\'année',
            createdAt: '2025-09-01T00:00:00Z'
        },

        // Activité 1.1.2 - Organiser des rencontres de dialogue social
        {
            id: 'plan-5',
            activityId: 'activite-1-1-2',
            trimestre: 1,
            mois: 2,
            dateDebut: '2025-02-03',
            dateFin: '2025-02-28',
            statut: 'EN_COURS',
            semaines: [1, 2, 3, 4],
            commentaire: 'Dialogue social - Tout le mois de février',
            createdAt: '2025-01-15T00:00:00Z'
        },
        {
            id: 'plan-6',
            activityId: 'activite-1-1-2',
            trimestre: 2,
            mois: 5,
            dateDebut: '2025-05-05',
            dateFin: '2025-05-30',
            statut: 'PLANIFIE',
            semaines: [2, 3, 4],
            commentaire: 'Rencontres régionales de concertation',
            createdAt: '2025-04-01T00:00:00Z'
        },
        {
            id: 'plan-7',
            activityId: 'activite-1-1-2',
            trimestre: 3,
            mois: 8,
            dateDebut: '2025-08-04',
            dateFin: '2025-08-29',
            statut: 'PLANIFIE',
            semaines: [1, 3],
            commentaire: 'Sessions de dialogue avec les OSC',
            createdAt: '2025-07-01T00:00:00Z'
        },

        // Activité 1.1.3 - Organiser les rencontres statutaires des Coordinations régionales
        {
            id: 'plan-8',
            activityId: 'activite-1-1-3',
            trimestre: 1,
            mois: 3,
            dateDebut: '2025-03-03',
            dateFin: '2025-03-28',
            statut: 'TERMINE',
            semaines: [2, 3, 4],
            commentaire: 'Tournée dans les 14 régions',
            createdAt: '2025-02-01T00:00:00Z'
        },
        {
            id: 'plan-9',
            activityId: 'activite-1-1-3',
            trimestre: 2,
            mois: 6,
            dateDebut: '2025-06-02',
            dateFin: '2025-06-27',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Coordinations régionales - session semestrielle',
            createdAt: '2025-05-01T00:00:00Z'
        },
        {
            id: 'plan-10',
            activityId: 'activite-1-1-3',
            trimestre: 3,
            mois: 9,
            dateDebut: '2025-09-01',
            dateFin: '2025-09-30',
            statut: 'PLANIFIE',
            semaines: [2, 3],
            commentaire: 'Rencontres de suivi trimestriel',
            createdAt: '2025-08-01T00:00:00Z'
        },

        // Activité 1.1.4 - Organiser les rencontres du Comité technique
        {
            id: 'plan-11',
            activityId: 'activite-1-1-4',
            trimestre: 1,
            mois: 1,
            dateDebut: '2025-01-13',
            dateFin: '2025-01-17',
            statut: 'TERMINE',
            semaines: [3],
            commentaire: 'Première réunion CT de l\'année',
            createdAt: '2025-01-01T00:00:00Z'
        },
        {
            id: 'plan-12',
            activityId: 'activite-1-1-4',
            trimestre: 2,
            mois: 4,
            dateDebut: '2025-04-14',
            dateFin: '2025-04-18',
            statut: 'PLANIFIE',
            semaines: [3],
            commentaire: 'Réunion CT du 2e trimestre',
            createdAt: '2025-03-15T00:00:00Z'
        },
        {
            id: 'plan-13',
            activityId: 'activite-1-1-4',
            trimestre: 3,
            mois: 7,
            dateDebut: '2025-07-14',
            dateFin: '2025-07-18',
            statut: 'PLANIFIE',
            semaines: [3],
            commentaire: 'Comité technique - session ordinaire',
            createdAt: '2025-06-15T00:00:00Z'
        },
        {
            id: 'plan-14',
            activityId: 'activite-1-1-4',
            trimestre: 4,
            mois: 10,
            dateDebut: '2025-10-13',
            dateFin: '2025-10-17',
            statut: 'TERMINE',
            semaines: [3],
            commentaire: 'Dernière session CT de l\'année',
            createdAt: '2025-09-15T00:00:00Z'
        },

        // Activité 1.2.1 - Réaliser une étude sur l'impact
        {
            id: 'plan-15',
            activityId: 'activite-1-2-1',
            trimestre: 1,
            mois: 1,
            dateDebut: '2025-01-06',
            dateFin: '2025-03-31',
            statut: 'EN_COURS',
            semaines: [1, 2, 3, 4],
            commentaire: 'Lancement de l\'étude d\'impact - Phase de collecte',
            createdAt: '2025-01-02T00:00:00Z'
        },
        {
            id: 'plan-16',
            activityId: 'activite-1-2-1',
            trimestre: 2,
            mois: 4,
            dateDebut: '2025-04-01',
            dateFin: '2025-06-30',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Phase d\'analyse et rédaction du rapport',
            createdAt: '2025-03-01T00:00:00Z'
        },

        // Activité 1.2.2 - Organiser un atelier de restitution
        {
            id: 'plan-17',
            activityId: 'activite-1-2-2',
            trimestre: 3,
            mois: 7,
            dateDebut: '2025-07-21',
            dateFin: '2025-07-25',
            statut: 'PLANIFIE',
            semaines: [4],
            commentaire: 'Atelier national de restitution des résultats',
            createdAt: '2025-06-01T00:00:00Z'
        },

        // Activité 2.1.1 - Actualiser la base de données du RNU
        {
            id: 'plan-18',
            activityId: 'activite-2-1-1',
            trimestre: 1,
            mois: 1,
            dateDebut: '2025-01-06',
            dateFin: '2025-03-31',
            statut: 'EN_COURS',
            semaines: [1, 2, 3, 4],
            commentaire: 'Actualisation RNU - Collecte de données terrain',
            createdAt: '2025-01-01T00:00:00Z'
        },
        {
            id: 'plan-19',
            activityId: 'activite-2-1-1',
            trimestre: 2,
            mois: 4,
            dateDebut: '2025-04-01',
            dateFin: '2025-05-31',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Nettoyage et validation des données',
            createdAt: '2025-03-01T00:00:00Z'
        },

        // Activité 2.1.2 - Former les agents communautaires
        {
            id: 'plan-20',
            activityId: 'activite-2-1-2',
            trimestre: 1,
            mois: 2,
            dateDebut: '2025-02-03',
            dateFin: '2025-02-28',
            statut: 'EN_COURS',
            semaines: [1, 2, 3],
            commentaire: 'Formation au ciblage - 3 cohortes',
            createdAt: '2025-01-15T00:00:00Z'
        },
        {
            id: 'plan-21',
            activityId: 'activite-2-1-2',
            trimestre: 3,
            mois: 9,
            dateDebut: '2025-09-01',
            dateFin: '2025-09-26',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Session de formation continue',
            createdAt: '2025-08-01T00:00:00Z'
        },

        // Activité 2.1.3 - Organiser des missions de contrôle
        {
            id: 'plan-22',
            activityId: 'activite-2-1-3',
            trimestre: 2,
            mois: 5,
            dateDebut: '2025-05-05',
            dateFin: '2025-05-30',
            statut: 'TERMINE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Missions de contrôle dans 8 régions',
            createdAt: '2025-04-01T00:00:00Z'
        },
        {
            id: 'plan-23',
            activityId: 'activite-2-1-3',
            trimestre: 4,
            mois: 11,
            dateDebut: '2025-11-03',
            dateFin: '2025-11-28',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Missions de vérification finale',
            createdAt: '2025-10-01T00:00:00Z'
        },

        // Activité 2.2.1 - Digitaliser le système de paiement
        {
            id: 'plan-24',
            activityId: 'activite-2-2-1',
            trimestre: 1,
            mois: 1,
            dateDebut: '2025-01-06',
            dateFin: '2025-03-31',
            statut: 'EN_COURS',
            semaines: [1, 2, 3, 4],
            commentaire: 'Phase de développement de la plateforme',
            createdAt: '2025-01-01T00:00:00Z'
        },
        {
            id: 'plan-25',
            activityId: 'activite-2-2-1',
            trimestre: 2,
            mois: 4,
            dateDebut: '2025-04-01',
            dateFin: '2025-04-30',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Tests et mise en production pilote',
            createdAt: '2025-03-01T00:00:00Z'
        },

        // Activité 2.2.2 - Former les bénéficiaires au mobile money
        {
            id: 'plan-26',
            activityId: 'activite-2-2-2',
            trimestre: 2,
            mois: 5,
            dateDebut: '2025-05-05',
            dateFin: '2025-06-30',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Campagne de formation mobile money',
            createdAt: '2025-04-01T00:00:00Z'
        },

        // Activité 2.3.1 - Organiser des campagnes de sensibilisation
        {
            id: 'plan-27',
            activityId: 'activite-2-3-1',
            trimestre: 1,
            mois: 3,
            dateDebut: '2025-03-03',
            dateFin: '2025-03-28',
            statut: 'TERMINE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Campagne de sensibilisation communautaire',
            createdAt: '2025-02-01T00:00:00Z'
        },
        {
            id: 'plan-28',
            activityId: 'activite-2-3-1',
            trimestre: 3,
            mois: 9,
            dateDebut: '2025-09-01',
            dateFin: '2025-09-30',
            statut: 'PLANIFIE',
            semaines: [2, 3, 4],
            commentaire: 'Campagne nationale sur le PNBSF',
            createdAt: '2025-08-01T00:00:00Z'
        },

        // Activité 2.3.2 - Produire des émissions radio et TV
        {
            id: 'plan-29',
            activityId: 'activite-2-3-2',
            trimestre: 2,
            mois: 4,
            dateDebut: '2025-04-01',
            dateFin: '2025-06-30',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Production d\'émissions médias - 12 émissions',
            createdAt: '2025-03-01T00:00:00Z'
        },
        {
            id: 'plan-30',
            activityId: 'activite-2-3-2',
            trimestre: 4,
            mois: 10,
            dateDebut: '2025-10-01',
            dateFin: '2025-12-31',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Dernière série d\'émissions de l\'année',
            createdAt: '2025-09-01T00:00:00Z'
        },

        // Activité 3.1.1 - Réunions hebdomadaires de coordination
        {
            id: 'plan-31',
            activityId: 'activite-3-1-1',
            trimestre: 1,
            mois: 1,
            dateDebut: '2025-01-06',
            dateFin: '2025-03-31',
            statut: 'EN_COURS',
            semaines: [1, 2, 3, 4],
            commentaire: 'Réunions hebdomadaires - Tous les lundis',
            createdAt: '2025-01-01T00:00:00Z'
        },
        {
            id: 'plan-32',
            activityId: 'activite-3-1-1',
            trimestre: 2,
            mois: 4,
            dateDebut: '2025-04-01',
            dateFin: '2025-06-30',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Coordination continue - T2',
            createdAt: '2025-03-01T00:00:00Z'
        },
        {
            id: 'plan-33',
            activityId: 'activite-3-1-1',
            trimestre: 3,
            mois: 7,
            dateDebut: '2025-07-01',
            dateFin: '2025-09-30',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Coordination continue - T3',
            createdAt: '2025-06-01T00:00:00Z'
        },
        {
            id: 'plan-34',
            activityId: 'activite-3-1-1',
            trimestre: 4,
            mois: 10,
            dateDebut: '2025-10-01',
            dateFin: '2025-12-31',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3, 4],
            commentaire: 'Coordination continue - T4',
            createdAt: '2025-09-01T00:00:00Z'
        },

        // Activité 3.2.1 - Acquérir des véhicules
        {
            id: 'plan-35',
            activityId: 'activite-3-2-1',
            trimestre: 1,
            mois: 2,
            dateDebut: '2025-02-03',
            dateFin: '2025-03-31',
            statut: 'EN_COURS',
            semaines: [1, 2, 3, 4],
            commentaire: 'Processus d\'acquisition de 15 véhicules',
            createdAt: '2025-01-15T00:00:00Z'
        },
        {
            id: 'plan-36',
            activityId: 'activite-3-2-1',
            trimestre: 2,
            mois: 5,
            dateDebut: '2025-05-01',
            dateFin: '2025-05-31',
            statut: 'PLANIFIE',
            semaines: [1, 2, 3],
            commentaire: 'Réception et immatriculation des véhicules',
            createdAt: '2025-04-01T00:00:00Z'
        }
    ];

    private currentId = 37;

    constructor() {}

    readPlanifications(params: any): Observable<any> {
        return of(null).pipe(
            delay(500),
            () => {
                let filtered = [...this.mockPlanifications];

                if (params.activityId) {
                    filtered = filtered.filter(p => p.activityId === params.activityId);
                }

                if (params.trimestre) {
                    filtered = filtered.filter(p => p.trimestre === Number(params.trimestre));
                }

                if (params.mois) {
                    filtered = filtered.filter(p => p.mois === Number(params.mois));
                }

                if (params.statut) {
                    filtered = filtered.filter(p => p.statut === params.statut);
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

    createPlanification(planning: any): Observable<any> {
        return of(null).pipe(
            delay(300),
            () => {
                const newPlanning: Planification = {
                    id: String(this.currentId++),
                    activityId: planning.activityId,
                    trimestre: planning.trimestre,
                    mois: planning.mois,
                    dateDebut: planning.dateDebut,
                    dateFin: planning.dateFin,
                    statut: planning.statut || 'PLANIFIE',
                    semaines: planning.semaines || [],
                    commentaire: planning.commentaire || '',
                    createdAt: new Date().toISOString()
                };

                this.mockPlanifications.push(newPlanning);
                console.log('✅ Planification créée:', newPlanning);
                return of(newPlanning);
            }
        );
    }

    updatePlanification(id: any, planning: any): Observable<any> {
        return of(null).pipe(
            delay(300),
            () => {
                const index = this.mockPlanifications.findIndex(p => p.id === String(id));

                if (index === -1) {
                    return throwError(() => ({
                        error: { message: 'Planification non trouvée' }
                    }));
                }

                this.mockPlanifications[index] = {
                    ...this.mockPlanifications[index],
                    trimestre: planning.trimestre,
                    mois: planning.mois,
                    dateDebut: planning.dateDebut,
                    dateFin: planning.dateFin,
                    statut: planning.statut || this.mockPlanifications[index].statut,
                    semaines: planning.semaines || [],
                    commentaire: planning.commentaire || ''
                };

                console.log('✅ Planification mise à jour:', this.mockPlanifications[index]);
                return of(this.mockPlanifications[index]);
            }
        );
    }

    deletePlanification(id: any): Observable<any> {
        return of(null).pipe(
            delay(300),
            () => {
                const index = this.mockPlanifications.findIndex(p => p.id === String(id));

                if (index === -1) {
                    return throwError(() => ({
                        error: { message: 'Planification non trouvée' }
                    }));
                }

                const deleted = this.mockPlanifications.splice(index, 1)[0];
                console.log('🗑️ Planification supprimée:', deleted);
                return of({ success: true, message: 'Planification supprimée avec succès' });
            }
        );
    }
}
