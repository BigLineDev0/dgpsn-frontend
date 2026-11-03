import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ManagementUnitMockService {

    private readonly mockData = {
        id: 'ptba-2025',
        name: 'PTBA 2025',
        type: { name: 'PTBA' },
        children: [
            // ========== OBJECTIF 1 ==========
            {
                id: 'obj-1',
                code: 'OBJ-1',
                name: 'Animation des instances de coordination de la SNPS',
                type: { name: 'OBJECTIF' },
                description: 'Assurer le pilotage et la coordination de la Stratégie Nationale de Protection Sociale',
                children: [
                    // Action 1.1
                    {
                        id: 'action-1-1',
                        code: 'ACT-1.1',
                        name: 'Animer les instances de coordination de la SNPS (CIP, CT, CCV, Plateformes régionales)',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-1-1-1',
                                code: 'ACT-1.1.1',
                                name: 'Tenir des réunions statutaires du CIP',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de réunions tenues',
                                taches: 'Organiser les rencontres statutaires du CIP',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Membres du CIP, Partenaires',
                                coutCFA: 3780000,
                                annee: 2025
                            },
                            {
                                id: 'activite-1-1-2',
                                code: 'ACT-1.1.2',
                                name: 'Organiser des rencontres de dialogue social de concertation entre les acteurs de la SNPS',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de rencontres organisées',
                                taches: 'Organiser les rencontres des plateformes régionales',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Acteurs régionaux, OSC',
                                coutCFA: 15000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-1-1-3',
                                code: 'ACT-1.1.3',
                                name: 'Organiser les rencontres statutaires des Coordinations régionales',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de rencontres organisées',
                                taches: 'Organiser les rencontres statutaires des Coordinations régionales',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Coordinations régionales',
                                coutCFA: 12500000,
                                annee: 2025
                            },
                            {
                                id: 'activite-1-1-4',
                                code: 'ACT-1.1.4',
                                name: 'Organiser les rencontres du Comité technique (CT)',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de rencontres organisées',
                                taches: 'Elaborer une note conceptuelle et convoquer les membres',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Membres du CT',
                                coutCFA: 2800000,
                                annee: 2025
                            }
                        ]
                    },
                    // Action 1.2
                    {
                        id: 'action-1-2',
                        code: 'ACT-1.2',
                        name: 'Promotion d\'études et recherches en matière de protection sociale',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-1-2-1',
                                code: 'ACT-1.2.1',
                                name: 'Réaliser une étude sur l\'impact des programmes de protection sociale',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Rapport d\'étude disponible',
                                taches: 'Recruter un cabinet, collecter les données, analyser',
                                acteurResponsable: 'DPSE',
                                acteurImplique: 'Consultants, Partenaires techniques',
                                coutCFA: 45000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-1-2-2',
                                code: 'ACT-1.2.2',
                                name: 'Organiser un atelier de restitution des résultats d\'études',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'ateliers organisés',
                                taches: 'Préparer la salle, inviter les participants, présenter',
                                acteurResponsable: 'DPSE',
                                acteurImplique: 'Chercheurs, Décideurs',
                                coutCFA: 8500000,
                                annee: 2025
                            }
                        ]
                    }
                ]
            },

            // ========== OBJECTIF 2 ==========
            {
                id: 'obj-2',
                code: 'OBJ-2',
                name: 'Consolidation du Programme National de Bourses de Sécurité Familiale (PNBSF)',
                type: { name: 'OBJECTIF' },
                description: 'Renforcer et étendre le programme PNBSF à l\'ensemble du territoire',
                children: [
                    // Action 2.1
                    {
                        id: 'action-2-1',
                        code: 'ACT-2.1',
                        name: 'Renforcer le ciblage et l\'enregistrement des bénéficiaires',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-2-1-1',
                                code: 'ACT-2.1.1',
                                name: 'Actualiser la base de données du RNU',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Taux de mise à jour de la base',
                                taches: 'Collecter les données, nettoyer, valider',
                                acteurResponsable: 'DPSE',
                                acteurImplique: 'Collectivités locales',
                                coutCFA: 125000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-2-1-2',
                                code: 'ACT-2.1.2',
                                name: 'Former les agents communautaires au ciblage',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Organiser des sessions de formation',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Agents communautaires',
                                coutCFA: 18000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-2-1-3',
                                code: 'ACT-2.1.3',
                                name: 'Organiser des missions de contrôle et vérification',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de missions réalisées',
                                taches: 'Planifier et conduire les missions terrain',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Superviseurs régionaux',
                                coutCFA: 22000000,
                                annee: 2025
                            }
                        ]
                    },
                    // Action 2.2
                    {
                        id: 'action-2-2',
                        code: 'ACT-2.2',
                        name: 'Améliorer le système de paiement des bourses',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-2-2-1',
                                code: 'ACT-2.2.1',
                                name: 'Digitaliser le système de paiement mobile',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Taux de digitalisation',
                                taches: 'Mettre en place la plateforme de paiement',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Opérateurs de télécommunication',
                                coutCFA: 85000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-2-2-2',
                                code: 'ACT-2.2.2',
                                name: 'Former les bénéficiaires à l\'utilisation du mobile money',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de bénéficiaires formés',
                                taches: 'Organiser des séances de sensibilisation',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Bénéficiaires, Agents',
                                coutCFA: 12000000,
                                annee: 2025
                            }
                        ]
                    },
                    // Action 2.3
                    {
                        id: 'action-2-3',
                        code: 'ACT-2.3',
                        name: 'Organisation des exercices de sensibilisation',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-2-3-1',
                                code: 'ACT-2.3.1',
                                name: 'Organiser des campagnes de sensibilisation communautaire',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de campagnes organisées',
                                taches: 'Préparer les supports, organiser les événements',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Leaders communautaires',
                                coutCFA: 28000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-2-3-2',
                                code: 'ACT-2.3.2',
                                name: 'Produire des émissions radio et TV sur le PNBSF',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'émissions produites',
                                taches: 'Rédiger les scripts, enregistrer, diffuser',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Médias locaux',
                                coutCFA: 15000000,
                                annee: 2025
                            }
                        ]
                    }
                ]
            },

            // ========== OBJECTIF 3 ==========
            {
                id: 'obj-3',
                code: 'OBJ-3',
                name: 'Renforcement des capacités institutionnelles de la DGPSN',
                type: { name: 'OBJECTIF' },
                description: 'Améliorer les capacités opérationnelles et de pilotage de la DGPSN',
                children: [
                    // Action 3.1
                    {
                        id: 'action-3-1',
                        code: 'ACT-3.1',
                        name: 'Pilotage et coordination de la DGPSN',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-3-1-1',
                                code: 'ACT-3.1.1',
                                name: 'Organiser les réunions hebdomadaires de coordination',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de réunions tenues',
                                taches: 'Convoquer, animer, rédiger les PV',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Chefs de division',
                                coutCFA: 4500000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-1-2',
                                code: 'ACT-3.1.2',
                                name: 'Elaborer les rapports d\'activités trimestriels',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de rapports produits',
                                taches: 'Collecter les données, rédiger, valider',
                                acteurResponsable: 'DPSE',
                                acteurImplique: 'Toutes les divisions',
                                coutCFA: 6000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-1-3',
                                code: 'ACT-3.1.3',
                                name: 'Organiser les missions de supervision régionale',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de missions effectuées',
                                taches: 'Planifier, conduire, rapporter',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Structures déconcentrées',
                                coutCFA: 35000000,
                                annee: 2025
                            }
                        ]
                    },
                    // Action 3.2
                    {
                        id: 'action-3-2',
                        code: 'ACT-3.2',
                        name: 'Renforcer le parc automobile et logistique',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-3-2-1',
                                code: 'ACT-3.2.1',
                                name: 'Acquérir des véhicules pour les missions terrain',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de véhicules acquis',
                                taches: 'Lancer l\'appel d\'offres, réceptionner',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Commission de passation',
                                coutCFA: 180000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-2-2',
                                code: 'ACT-3.2.2',
                                name: 'Entretenir et réparer le parc automobile existant',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Taux de disponibilité des véhicules',
                                taches: 'Etablir le planning d\'entretien',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Chauffeurs, Mécaniciens',
                                coutCFA: 25000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-2-3',
                                code: 'ACT-3.2.3',
                                name: 'Acquérir du matériel informatique et bureautique',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'équipements acquis',
                                taches: 'Etablir les besoins, lancer la commande',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Service informatique',
                                coutCFA: 45000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-2-4',
                                code: 'ACT-3.2.4',
                                name: 'Aménager les bureaux et espaces de travail',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de bureaux aménagés',
                                taches: 'Réaliser les travaux d\'aménagement',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Entreprises prestataires',
                                coutCFA: 65000000,
                                annee: 2025
                            }
                        ]
                    },
                    // Action 3.3
                    {
                        id: 'action-3-3',
                        code: 'ACT-3.3',
                        name: 'Mettre en œuvre le plan de formation du personnel',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-3-3-1',
                                code: 'ACT-3.3.1',
                                name: 'Former le personnel en gestion de projet',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Organiser les sessions de formation',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Personnel technique',
                                coutCFA: 18000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-2',
                                code: 'ACT-3.3.2',
                                name: 'Former le personnel en suivi-évaluation',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Recruter formateur, organiser sessions',
                                acteurResponsable: 'DPSE',
                                acteurImplique: 'Personnel M&E',
                                coutCFA: 22000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-3',
                                code: 'ACT-3.3.3',
                                name: 'Former en passation des marchés publics',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Organiser formation certifiante',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Personnel DAF',
                                coutCFA: 15000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-4',
                                code: 'ACT-3.3.4',
                                name: 'Former en gestion budgétaire et financière',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Sessions de formation pratique',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Personnel comptable',
                                coutCFA: 12000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-5',
                                code: 'ACT-3.3.5',
                                name: 'Former en communication institutionnelle',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Formation en médias et relations publiques',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Chargés de communication',
                                coutCFA: 10000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-6',
                                code: 'ACT-3.3.6',
                                name: 'Former en outils informatiques avancés',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Formation Excel, PowerBI, outils SIG',
                                acteurResponsable: 'DPSE',
                                acteurImplique: 'Personnel technique',
                                coutCFA: 14000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-7',
                                code: 'ACT-3.3.7',
                                name: 'Former en protection des données personnelles',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Formation RGPD et conformité',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Personnel gestionnaire de données',
                                coutCFA: 9000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-8',
                                code: 'ACT-3.3.8',
                                name: 'Organiser des formations en genre et inclusion',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Sensibilisation genre et équité',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Tout le personnel',
                                coutCFA: 11000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-9',
                                code: 'ACT-3.3.9',
                                name: 'Former en leadership et management',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de cadres formés',
                                taches: 'Formation pour chefs de service',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Cadres supérieurs',
                                coutCFA: 16000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-10',
                                code: 'ACT-3.3.10',
                                name: 'Former en archivage et gestion documentaire',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Formation aux techniques d\'archivage',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Archivistes, secrétaires',
                                coutCFA: 7500000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-11',
                                code: 'ACT-3.3.11',
                                name: 'Organiser des formations en anglais professionnel',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Cours d\'anglais pour cadres',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Cadres internationaux',
                                coutCFA: 13000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-12',
                                code: 'ACT-3.3.12',
                                name: 'Former en gestion des risques et audit',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'agents formés',
                                taches: 'Formation en audit interne',
                                acteurResponsable: 'DAF',
                                acteurImplique: 'Contrôleurs',
                                coutCFA: 17000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-3-13',
                                code: 'ACT-3.3.13',
                                name: 'Organiser des ateliers de renforcement d\'équipe',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre d\'ateliers organisés',
                                taches: 'Team building et cohésion',
                                acteurResponsable: 'DES/DGPSN',
                                acteurImplique: 'Tout le personnel',
                                coutCFA: 8500000,
                                annee: 2025
                            }
                        ]
                    },
                    // Action 3.4
                    {
                        id: 'action-3-4',
                        code: 'ACT-3.4',
                        name: 'Renforcer la communication institutionnelle',
                        type: { name: 'ACTION' },
                        children: [
                            {
                                id: 'activite-3-4-1',
                                code: 'ACT-3.4.1',
                                name: 'Elaborer la stratégie de communication 2025-2027',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Document de stratégie validé',
                                taches: 'Rédiger, valider, diffuser',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Consultant communication',
                                coutCFA: 18000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-4-2',
                                code: 'ACT-3.4.2',
                                name: 'Produire des supports de communication',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de supports produits',
                                taches: 'Concevoir flyers, brochures, vidéos',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Agence de communication',
                                coutCFA: 35000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-4-3',
                                code: 'ACT-3.4.3',
                                name: 'Animer les réseaux sociaux de la DGPSN',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de publications',
                                taches: 'Créer contenus, publier, modérer',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Community manager',
                                coutCFA: 12000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-4-4',
                                code: 'ACT-3.4.4',
                                name: 'Organiser des conférences de presse',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Nombre de conférences organisées',
                                taches: 'Préparer dossier de presse, inviter médias',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Journalistes',
                                coutCFA: 8500000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-4-5',
                                code: 'ACT-3.4.5',
                                name: 'Mettre à jour le site web de la DGPSN',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Fréquence de mise à jour',
                                taches: 'Actualiser contenus, améliorer design',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Webmaster',
                                coutCFA: 15000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-4-6',
                                code: 'ACT-3.4.6',
                                name: 'Organiser la Journée de la Protection Sociale',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Evénement organisé',
                                taches: 'Planifier, coordonner, animer',
                                acteurResponsable: 'Cell Com',
                                acteurImplique: 'Toutes les divisions, Partenaires',
                                coutCFA: 75000000,
                                annee: 2025
                            },
                            {
                                id: 'activite-3-4-7',
                                code: 'ACT-3.4.7',
                                name: 'Produire le rapport annuel d\'activités 2024',
                                type: { name: 'ACTIVITE' },
                                indicateurs: 'Rapport publié',
                                taches: 'Collecter données, rédiger, éditer',
                                acteurResponsable: 'DPSE',
                                acteurImplique: 'Toutes les divisions',
                                coutCFA: 22000000,
                                annee: 2025
                            }
                        ]
                    }
                ]
            }
        ]
    };

    constructor() {}

    readTreeManagementUnit(ptbaId: string): Observable<any> {
        return of({ body: this.mockData }).pipe(delay(500));
    }

    readAllActivity(params: { parentId: string }): Observable<any> {
        // Trouver le nœud parent et retourner ses activités
        const activities = this.findActivitiesByParentId(params.parentId);
        return of({
            content: activities,
            totalElements: activities.length
        }).pipe(delay(300));
    }

    private findActivitiesByParentId(parentId: string): any[] {
        const result: any[] = [];

        const searchNode = (node: any): void => {
            if (node.id === parentId) {
                if (node.children) {
                    node.children.forEach((child: any) => {
                        if (child.type.name === 'ACTIVITE') {
                            result.push(child);
                        } else if (child.children) {
                            // Si c'est une action, on récupère ses activités
                            child.children.forEach((activity: any) => {
                                if (activity.type.name === 'ACTIVITE') {
                                    result.push(activity);
                                }
                            });
                        }
                    });
                }
            }

            if (node.children) {
                node.children.forEach((child: any) => searchNode(child));
            }
        };

        searchNode(this.mockData);
        return result;
    }

    createNode(data: any, type: string): Observable<any> {
        console.log('Mock create:', type, data);
        return of({ success: true, id: 'new-' + Date.now() }).pipe(delay(300));
    }

    updateProjet(id: string, data: any): Observable<any> {
        console.log('Mock update:', id, data);
        return of({ success: true }).pipe(delay(300));
    }

    deleteProjet(id: string): Observable<any> {
        console.log('Mock delete:', id);
        return of({ success: true }).pipe(delay(300));
    }
}
