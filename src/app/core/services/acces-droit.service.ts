import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DroitArticle {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    readTime: number;
    difficulty: 'debutant' | 'intermediaire' | 'avance';
    lastUpdated: Date;
    views: number;
    likes: number;
    relatedArticles?: string[];
    resources?: {
        title: string;
        type: 'loi' | 'decret' | 'arrete' | 'guide' | 'formulaire';
        url?: string;
        description?: string;
    }[];
    professionalLinks?: {
        type: 'avocat' | 'notaire' | 'huissier' | 'mediateur';
        title: string;
        slug: string;
    }[];
    procedureLinks?: {
        title: string;
        slug: string;
        category: string;
    }[];
}

export interface DroitCategory {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    articleCount: number;
    featured: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AccesDroitService {
    private analyticsSubject = new BehaviorSubject<any>(null);
    public analytics$ = this.analyticsSubject.asObservable();

    private categories: DroitCategory[] = [
        {
            id: 'droits-civils',
            title: 'Droits Civils',
            slug: 'droits-civils',
            description: 'Mariage, divorce, succession, propriété et droits de la personne',
            icon: '/assets/icons/civil-rights.svg',
            color: '#8d6e63',
            articleCount: 24,
            featured: true
        },
        {
            id: 'droits-commerciaux',
            title: 'Droits Commerciaux',
            slug: 'droits-commerciaux',
            description: 'Création d\'entreprise, contrats commerciaux, litiges d\'affaires',
            icon: '/assets/icons/commercial-rights.svg',
            color: '#efb808',
            articleCount: 18,
            featured: true
        },
        {
            id: 'droits-travail',
            title: 'Droit du Travail',
            slug: 'droits-travail',
            description: 'Contrats de travail, licenciement, congés et protection sociale',
            icon: '/assets/icons/work-rights.svg',
            color: '#6a9f7a',
            articleCount: 15,
            featured: false
        },
        {
            id: 'droits-immobilier',
            title: 'Droit Immobilier',
            slug: 'droits-immobilier',
            description: 'Achat, vente, location et conflits immobiliers',
            icon: '/assets/icons/real-estate.svg',
            color: '#26a69a',
            articleCount: 12,
            featured: false
        },
        {
            id: 'droits-famille',
            title: 'Droit de la Famille',
            slug: 'droits-famille',
            description: 'Filiation, adoption, protection de l\'enfance et violence domestique',
            icon: '/assets/icons/family-rights.svg',
            color: '#5d4e75',
            articleCount: 21,
            featured: true
        },
        {
            id: 'droits-penal',
            title: 'Droit Pénal',
            slug: 'droits-penal',
            description: 'Infractions, procédures pénales et droits de la défense',
            icon: '/assets/icons/criminal-law.svg',
            color: '#d32f2f',
            articleCount: 9,
            featured: false
        },
        {
            id: 'modes-alternatifs',
            title: 'Modes Alternatifs',
            slug: 'modes-alternatifs',
            description: 'Médiation, conciliation et arbitrage pour résoudre les litiges',
            icon: '/assets/icons/mediation.svg',
            color: '#f57c00',
            articleCount: 8,
            featured: false
        },
        {
            id: 'droits-administratifs',
            title: 'Droits Administratifs',
            slug: 'droits-administratifs',
            description: 'Relations avec l\'administration et recours contentieux',
            icon: '/assets/icons/admin-rights.svg',
            color: '#795548',
            articleCount: 11,
            featured: false
        }
    ];

    private articles: DroitArticle[] = [
        {
            id: 'mariage-civil-senegal',
            title: 'Guide complet du mariage civil au Sénégal',
            slug: 'mariage-civil-senegal',
            description: 'Tout ce que vous devez savoir sur les procédures, documents requis et démarches pour un mariage civil au Sénégal.',
            content: `# Guide complet du mariage civil au Sénégal

## Introduction
Le mariage civil au Sénégal est régi par le Code de la famille et nécessite le respect de certaines conditions et formalités...

## Conditions préalables
- Âge minimum : 18 ans pour les hommes et 16 ans pour les femmes
- Consentement libre des deux époux
- Absence d'empêchements légaux

## Documents requis
1. Acte de naissance de moins de 3 mois
2. Certificat de célibat
3. Certificat médical prénuptial
4. Pièce d'identité nationale
5. 4 photos d'identité récentes

## Procédure
La procédure se déroule en plusieurs étapes importantes...`,
            category: 'droits-civils',
            tags: ['mariage', 'état civil', 'famille', 'procédure'],
            readTime: 8,
            difficulty: 'debutant',
            lastUpdated: new Date('2024-01-15'),
            views: 1247,
            likes: 89,
            relatedArticles: ['divorce-contentieux', 'succession-heritage'],
            resources: [
                {
                    title: 'Code de la famille sénégalais',
                    type: 'loi',
                    description: 'Texte complet régissant le mariage au Sénégal'
                },
                {
                    title: 'Formulaire de demande de mariage',
                    type: 'formulaire',
                    description: 'Formulaire officiel à remplir pour la demande'
                }
            ],
            professionalLinks: [
                {
                    type: 'avocat',
                    title: 'Avocats spécialisés en droit de la famille',
                    slug: 'avocats'
                },
                {
                    type: 'notaire',
                    title: 'Notaires pour contrat de mariage',
                    slug: 'notaires'
                }
            ],
            procedureLinks: [
                {
                    title: 'Demande d\'acte de naissance',
                    slug: 'acte-naissance',
                    category: 'etat-civil'
                }
            ]
        },
        {
            id: 'creation-entreprise-senegal',
            title: 'Créer son entreprise au Sénégal : démarches simplifiées',
            slug: 'creation-entreprise-senegal',
            description: 'Guide pratique pour créer votre entreprise au Sénégal avec toutes les étapes, coûts et délais.',
            content: `# Créer son entreprise au Sénégal : démarches simplifiées

## Types d'entreprises
Le Sénégal offre plusieurs formes juridiques d'entreprises...

## Étapes de création
1. Choix de la forme juridique
2. Réservation du nom commercial
3. Rédaction des statuts
4. Dépôt du capital social
5. Immatriculation au RCCM

## Coûts et délais
Les frais varient selon la forme juridique choisie...`,
            category: 'droits-commerciaux',
            tags: ['entreprise', 'SARL', 'SA', 'immatriculation', 'RCCM'],
            readTime: 12,
            difficulty: 'intermediaire',
            lastUpdated: new Date('2024-01-20'),
            views: 892,
            likes: 67,
            relatedArticles: ['contrats-commerciaux', 'fiscalite-entreprise'],
            resources: [
                {
                    title: 'Code des sociétés',
                    type: 'loi',
                    description: 'Réglementation des sociétés commerciales'
                },
                {
                    title: 'Formulaire RCCM',
                    type: 'formulaire',
                    description: 'Formulaire d\'immatriculation au registre du commerce'
                }
            ],
            professionalLinks: [
                {
                    type: 'avocat',
                    title: 'Avocats en droit des affaires',
                    slug: 'avocats'
                },
                {
                    type: 'notaire',
                    title: 'Notaires pour statuts de société',
                    slug: 'notaires'
                }
            ]
        },
        {
            id: 'licenciement-abusif',
            title: 'Licenciement abusif : vos droits et recours',
            slug: 'licenciement-abusif',
            description: 'Comment identifier un licenciement abusif et quels sont vos recours légaux au Sénégal.',
            content: `# Licenciement abusif : vos droits et recours

## Qu'est-ce qu'un licenciement abusif ?
Un licenciement est considéré comme abusif lorsqu'il ne respecte pas...

## Procédure de licenciement
L'employeur doit respecter certaines étapes obligatoires...

## Vos recours
En cas de licenciement abusif, plusieurs options s'offrent à vous...`,
            category: 'droits-travail',
            tags: ['licenciement', 'droit du travail', 'indemnités', 'recours'],
            readTime: 10,
            difficulty: 'intermediaire',
            lastUpdated: new Date('2024-01-18'),
            views: 1156,
            likes: 94,
            relatedArticles: ['contrat-travail', 'indemnites-travail'],
            resources: [
                {
                    title: 'Code du travail sénégalais',
                    type: 'loi',
                    description: 'Dispositions relatives au licenciement'
                }
            ],
            professionalLinks: [
                {
                    type: 'avocat',
                    title: 'Avocats en droit du travail',
                    slug: 'avocats'
                }
            ]
        }
    ];

    getCategories(): DroitCategory[] {
        return this.categories;
    }

    getFeaturedCategories(): DroitCategory[] {
        return this.categories.filter(cat => cat.featured);
    }

    getArticles(): DroitArticle[] {
        return this.articles;
    }

    getArticlesByCategory(categorySlug: string): DroitArticle[] {
        const category = this.categories.find(cat => cat.slug === categorySlug);
        if (!category) return [];

        return this.articles.filter(article => article.category === category.id);
    }

    getArticleBySlug(slug: string): DroitArticle | undefined {
        return this.articles.find(article => article.slug === slug);
    }

    getRelatedArticles(articleId: string): DroitArticle[] {
        const article = this.articles.find(a => a.id === articleId);
        if (!article?.relatedArticles) return [];

        return this.articles.filter(a => article.relatedArticles!.includes(a.id));
    }

    searchArticles(query: string, categorySlug?: string): DroitArticle[] {
        let filtered = this.articles;

        if (categorySlug) {
            const category = this.categories.find(cat => cat.slug === categorySlug);
            if (category) {
                filtered = filtered.filter(article => article.category === category.id);
            }
        }

        if (query.trim()) {
            const searchTerm = query.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.description.toLowerCase().includes(searchTerm) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        return filtered.sort((a, b) => b.views - a.views);
    }

    incrementViews(articleId: string): void {
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            article.views++;
            this.trackEvent('article_view', { articleId, title: article.title });
        }
    }

    toggleLike(articleId: string): boolean {
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            // En réalité, il faudrait vérifier si l'utilisateur a déjà liké
            article.likes++;
            this.trackEvent('article_like', { articleId, title: article.title });
            return true;
        }
        return false;
    }

    getPopularArticles(limit: number = 5): DroitArticle[] {
        return [...this.articles]
            .sort((a, b) => b.views - a.views)
            .slice(0, limit);
    }

    getRecentArticles(limit: number = 5): DroitArticle[] {
        return [...this.articles]
            .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
            .slice(0, limit);
    }

    private trackEvent(eventName: string, data: any): void {
        // Simulation d'envoi d'analytics
        const event = {
            name: eventName,
            timestamp: new Date(),
            data
        };

        this.analyticsSubject.next(event);
        console.log('Analytics Event:', event);
    }
}