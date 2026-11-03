import {Injectable} from '@angular/core';

interface Institution {
    nom: string;
    type: string;
    description: string;
    adresse?: string;
    long?: string;
    lat?: string;
    email?: string;
    telephone?: string;
    website?: string;
    specialites?: string[];
    region?: string;
}

interface SubCategory {
    id: string;
    title: string;
}

interface MainCategory {
    slug: string;
    title: string;
    subCategories: SubCategory[];
}

interface AnnuaireCategory {
    slug: string;
    title: string;
    description: string;
    icon: string;
    duration: number;
    subCategories: SubCategory[];
}

@Injectable({
    providedIn: 'root'
})
export class AnnuaireService {
    private readonly categories: AnnuaireCategory[] = [
        {
            slug: 'institutions-juridiques',
            title: 'Institutions Juridiques',
            description: 'Découvrez les piliers constitutionnels, judiciaires et spécialisés du système.',
            icon: 'assets/img/icons/service-icons4.svg',
            duration: 800,
            subCategories: [
                {id: 'institutions-constitutionnelles', title: 'Institutions Constitutionnelles'},
                {id: 'institutions-judiciaires', title: 'Institutions Judiciaires'},
                {id: 'juridictions-specialisees', title: 'Juridictions Spécialisées'},
                {id: 'institutions-administratives', title: 'Institutions Administratives'}
            ]
        },
        {
            slug: 'professions-juridiques',
            title: 'Professions Juridiques',
            description: 'Trouvez avocats, notaires, huissiers et autres experts du droit.',
            icon: 'assets/img/icons/service-icons5.svg',
            duration: 1000,
            subCategories: [
                {id: 'avocats', title: 'Avocats'},
                {id: 'notaires', title: 'Notaires'},
                {id: 'huissiers', title: 'Huissiers de Justice'},
                {id: 'experts-judiciaires', title: 'Experts Judiciaires'},
                {id: 'arbitres', title: 'Arbitres'}
            ]
        },
        {
            slug: 'organismes-structures',
            title: 'Organismes et Structures',
            description: 'Explorez les ordres professionnels, centres de formation et d\'arbitrage.',
            icon: 'assets/img/icons/service-icons6.svg',
            duration: 1200,
            subCategories: [
                {id: 'ordres-professionnels', title: 'Ordres Professionnels'},
                {id: 'centres-formation', title: 'Centres de Formation'},
                {id: 'centres-arbitrage', title: 'Centres d\'Arbitrage'}
            ]
        },
        {
            slug: 'universites-chercheurs',
            title: 'Universités et Chercheurs',
            description: 'Consultez les facultés de droit, les chercheurs et leurs spécialités.',
            icon: 'assets/img/icons/service-icons7.svg',
            duration: 800,
            subCategories: [
                {id: 'universites', title: 'Universités'},
                {id: 'facultes-droit', title: 'Facultés de Droit'},
                {id: 'chercheurs', title: 'Chercheurs'},
                {id: 'instituts-recherche', title: 'Instituts de Recherche'}
            ]
        },
        {
            slug: 'ong-projets',
            title: 'ONG et Projets Juridiques',
            description: 'Informez-vous sur les acteurs non-gouvernementaux et les cliniques juridiques.',
            icon: 'assets/img/icons/service-icons8.svg',
            duration: 1000,
            subCategories: [
                {id: 'ong-juridiques', title: 'ONG Juridiques'},
                {id: 'cliniques-juridiques', title: 'Cliniques Juridiques'},
                {id: 'projets-sensibilisation', title: 'Projets de Sensibilisation'}
            ]
        },
        {
            slug: 'organismes-regulation',
            title: 'Organismes de Régulation',
            description: 'Prenez connaissance des autorités de contrôle (données, élections, marchés).',
            icon: 'assets/img/icons/service-icons5.svg',
            duration: 1000,
            subCategories: [
                {id: 'aide-juridique', title: 'Aide Juridique'},
                {id: 'assistance-judiciaire', title: 'Assistance Judiciaire'},
                {id: 'programmes-sensibilisation', title: 'Programmes de Sensibilisation'}
            ]
        }
    ];

    private readonly institutions: Institution[] = [
        // Institutions Juridiques - Institutions Constitutionnelles
        {
            nom: 'Conseil Constitutionnel',
            type: 'institutions-constitutionnelles',
            description: 'Organe de contrôle de la constitutionnalité des lois',
            adresse: 'Dakar, Sénégal',
            long: '-17.4441',
            lat: '14.6928',
            telephone: '+221 33 821 23 45',
            email: 'conseilconstitutionnel@sn.gov.sg',
            website: 'www.conseil-constitutionnel.sn',
            region: 'Dakar'
        },
        {
            nom: 'Assemblée Nationale',
            type: 'institutions-constitutionnelles',
            description: 'Pouvoir législatif de la République du Sénégal',
            adresse: 'Place Soweto, Dakar',
            long: '-17.4417',
            lat: '14.6937',
            telephone: '+221 33 849 62 00',
            email: 'assemblee-nationale@sn.gov.sg',
            website: 'www.assemblee-nationale.sn',
            region: 'Dakar'
        },
        {
            nom: 'Présidence de la République',
            type: 'institutions-constitutionnelles',
            description: 'Siège du pouvoir exécutif du Sénégal',
            adresse: 'Palais Présidentiel, Dakar',
            long: '-17.4467',
            lat: '14.6953',
            telephone: '+221 33 823 45 67',
            email: 'presidence@sn.gov.sg',
            website: 'www.presidence.sn',
            region: 'Dakar'
        },
        {
            nom: 'Haut Conseil des Collectivités Territoriales (HCCT)',
            type: 'institutions-constitutionnelles',
            description: 'Instance consultative sur les collectivités territoriales',
            adresse: 'Dakar, Sénégal',
            long: '-17.4378',
            lat: '14.6892',
            email: 'hcct@sn.gov.sg',
            telephone: '+221 33 824 56 78',
            region: 'Dakar'
        },
        {
            nom: 'Conseil Économique, Social et Environnemental (CESE)',
            type: 'institutions-constitutionnelles',
            description: 'Organe consultatif sur les questions économiques et sociales',
            adresse: 'Dakar, Sénégal',
            long: '-17.4355',
            lat: '14.6874',
            email: 'cese@sn.gov.sg',
            telephone: '+221 33 825 67 89',
            region: 'Dakar'
        },

        // Institutions Juridiques - Institutions Judiciaires
        {
            nom: 'Cour Suprême',
            type: 'institutions-judiciaires',
            description: 'Plus haute juridiction du pays',
            adresse: 'Plateau, Dakar',
            long: '-17.4441',
            lat: '14.6937',
            email: 'csd@sn.gov.sg',
            telephone: '+221 33 821 45 67',
            region: 'Dakar'
        },
        {
            nom: 'Cour d\'Appel de Dakar',
            type: 'institutions-judiciaires',
            description: 'Juridiction d\'appel pour la région de Dakar',
            adresse: 'Plateau, Dakar',
            long: '-17.4425',
            lat: '14.6920',
            email: 'cad@sn.gov.sg',
            telephone: '+221 33 821 78 90',
            region: 'Dakar'
        },
        {
            nom: 'Cour d\'Appel de Thiès',
            type: 'institutions-judiciaires',
            description: 'Juridiction d\'appel pour la région de Thiès',
            adresse: 'Centre-ville, Thiès',
            long: '-16.9633',
            lat: '14.7886',
            email: 'caat@sn.gov.sg',
            telephone: '+221 33 951 12 34',
            region: 'Thiès'
        },
        {
            nom: 'Conseil d\'État (ou Section administrative de la Cour suprême)',
            type: 'institutions-judiciaires',
            description: 'Section administrative de la Cour Suprême',
            adresse: 'Plateau, Dakar',
            long: '-17.4448',
            lat: '14.6942',
            email: 'cse@sn.gov.sg',
            telephone: '+221 33 821 90 12',
            region: 'Dakar'
        },
        {
            nom: 'Cour d\'Appel de Saint-Louis',
            type: 'institutions-judiciaires',
            description: 'Juridiction d\'appel pour la région de Saint-Louis',
            adresse: 'Saint-Louis, Sénégal',
            long: '-16.4889',
            lat: '16.0469',
            email: 'caas@sn.gov.sg',
            telephone: '+221 33 961 23 45',
            region: 'Saint-Louis'
        },
        {
            nom: 'Tribunaux d\'Instance',
            type: 'institutions-judiciaires',
            description: 'Juridictions de première instance pour les affaires courantes',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            email: 'tribunauxinstance@sn.gov.sg',
            telephone: '+221 33 800 00 00',
            region: ''
        },
        {
            nom: 'Tribunaux du Travail',
            type: 'institutions-judiciaires',
            description: 'Juridictions spécialisées dans les litiges du travail',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            email: 'tribunaudetravail@sn.gov.sg',
            telephone: '+221 33 800 00 00',
            region: ''
        },
        {
            nom: 'Tribunaux pour Enfants',
            type: 'institutions-judiciaires',
            description: 'Juridictions dédiées aux affaires impliquant des mineurs',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            email: 'tribunaenfants@sn.gov.sg',
            telephone: '+221 33 800 00 00',
            region: ''
        },
        {
            nom: 'Cours d\'Assises',
            type: 'institutions-judiciaires',
            description: 'Juridictions pour les affaires criminelles graves',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            email: 'tribunecoursdesaises@sn.gov.sg',
            telephone: '+221 33 800 00 00',
            region: ''
        },

// Institutions Juridiques - Juridictions Spécialisées
        {
            nom: 'Cour des Comptes',
            type: 'juridictions-specialisees',
            description: 'Contrôle des finances publiques',
            adresse: 'Liberté 6, Dakar',
            long: '-17.4658',
            lat: '14.7167',
            email: 'tribunecourcomptes@sn.gov.sg',
            telephone: '+221 33 824 56 78',
            region: 'Dakar'
        },
        {
            nom: 'Tribunal de Commerce de Dakar',
            type: 'juridictions-specialisees',
            description: 'Juridiction spécialisée en droit commercial',
            adresse: 'Plateau, Dakar',
            long: '-17.4433',
            lat: '14.6925',
            email: 'tribunecourcommerce@sn.gov.sg',
            telephone: '+221 33 822 89 01',
            specialites: ['Droit commercial', 'Droit des sociétés'],
            region: 'Dakar'
        },
        {
            nom: 'Tribunal Militaire',
            type: 'juridictions-specialisees',
            description: 'Juridiction pour les affaires militaires',
            adresse: 'Dakar, Sénégal',
            long: '-17.4500',
            lat: '14.6800',
            email: 'tribunemilitaire@sn.gov.sg',
            telephone: '+221 33 826 78 90',
            region: 'Dakar'
        },
        {
            nom: 'Haute Cour de Justice',
            type: 'juridictions-specialisees',
            description: 'Juridiction pour juger les hauts responsables',
            adresse: 'Dakar, Sénégal',
            long: '-17.4455',
            lat: '14.6945',
            email: 'tribunehauts@sn.gov.sg',
            telephone: '+221 33 827 89 01',
            region: 'Dakar'
        },

// Professions Juridiques - Avocats
        {
            nom: 'Barreau de Dakar',
            type: 'institutions-judiciaires',
            description: 'Ordre des avocats de Dakar',
            adresse: 'Palais de Justice, Dakar',
            long: '-17.4430',
            lat: '14.6918',
            telephone: '+221 33 821 34 56',
            website: 'www.barreau-dakar.sn',
            region: 'Dakar'
        },
        {
            nom: 'Ordre des avocats',
            type: 'institutions-judiciaires',
            description: 'Organisation nationale des avocats',
            adresse: 'Dakar, Sénégal',
            long: '-17.4435',
            lat: '14.6922',
            telephone: '+221 33 821 45 67',
            region: 'Dakar'
        },
        {
            nom: 'Maître Aminata Touré',
            type: 'avocats',
            description: 'Avocate spécialisée en droit des affaires et droit commercial',
            adresse: 'Cabinet Touré & Associés, Plateau, Dakar',
            long: '-17.4430',
            lat: '14.6918',
            telephone: '+221 33 821 34 56',
            email: 'a.toure@cabinet-toure.sn',
            specialites: ['Droit des affaires', 'Droit commercial', 'Arbitrage'],
            region: 'Dakar'
        },
        {
            nom: 'Maître Ousmane Diallo',
            type: 'avocats',
            description: 'Avocat en droit pénal et droit de la famille',
            adresse: 'Cabinet Diallo, Médina, Dakar',
            long: '-17.4435',
            lat: '14.6922',
            telephone: '+221 33 821 45 67',
            email: 'o.diallo@avocat-diallo.sn',
            specialites: ['Droit pénal', 'Droit de la famille', 'Droit civil'],
            region: 'Dakar'
        },
        {
            nom: 'Maître Fatou Ndiaye',
            type: 'avocats',
            description: 'Avocate spécialisée en droit du travail et droit social',
            adresse: 'Sacré-Cœur, Dakar',
            long: '-17.4500',
            lat: '14.7000',
            telephone: '+221 33 825 78 90',
            email: 'f.ndiaye@cabinet-ndiaye.sn',
            specialites: ['Droit du travail', 'Droit social', 'Contentieux administratif'],
            region: 'Dakar'
        },

// Professions Juridiques - Notaires
        {
            nom: 'Chambre Nationale des Notaires',
            type: 'institutions-judiciaires',
            description: 'Ordre des notaires du Sénégal',
            adresse: 'Sacré-Cœur, Dakar',
            long: '-17.4744',
            lat: '14.7056',
            telephone: '+221 33 864 78 90',
            region: 'Dakar'
        },
        {
            nom: 'Maître Ibrahima Sarr',
            type: 'notaires',
            description: 'Notaire, spécialisé en droit immobilier et succession',
            adresse: 'Étude Sarr, Sacré-Cœur, Dakar',
            long: '-17.4744',
            lat: '14.7056',
            telephone: '+221 33 864 78 90',
            email: 'i.sarr@notaire-sarr.sn',
            specialites: ['Droit immobilier', 'Successions', 'Contrats'],
            region: 'Dakar'
        },
        {
            nom: 'Maître Aïssa Ba',
            type: 'notaires',
            description: 'Notaire associée, expert en droit des sociétés',
            adresse: 'Étude Ba & Associés, Point E, Dakar',
            long: '-17.4600',
            lat: '14.7100',
            telephone: '+221 33 867 45 23',
            email: 'a.ba@etude-ba.sn',
            specialites: ['Droit des sociétés', 'Actes commerciaux', 'Fiscalité'],
            region: 'Dakar'
        },

// Professions Juridiques - Huissiers de Justice
        {
            nom: 'Ordre des huissiers',
            type: 'institutions-judiciaires',
            description: 'Organisation des huissiers de justice',
            adresse: 'Dakar, Sénégal',
            long: '-17.4400',
            lat: '14.6900',
            telephone: '+221 33 822 56 78',
            region: 'Dakar'
        },
        {
            nom: 'Études d\'huissiers',
            type: 'huissiers',
            description: 'Services d\'huissiers de justice',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            telephone: '+221 33 800 00 00',
            region: ''
        },
        {
            nom: 'Maître Moussa Gaye',
            type: 'huissiers',
            description: 'Huissier de justice, exécution et signification',
            adresse: 'Étude Gaye, Plateau, Dakar',
            long: '-17.4400',
            lat: '14.6900',
            telephone: '+221 33 822 56 78',
            email: 'm.gaye@huissier-gaye.sn',
            specialites: ['Exécution forcée', 'Signification', 'Constat'],
            region: 'Dakar'
        },
        {
            nom: 'Maître Khadija Faye',
            type: 'huissiers',
            description: 'Huissière de justice, recouvrement et contentieux',
            adresse: 'Cabinet Faye, Mermoz, Dakar',
            long: '-17.4550',
            lat: '14.7150',
            telephone: '+221 33 824 67 89',
            email: 'k.faye@huissier-faye.sn',
            specialites: ['Recouvrement', 'Contentieux civil', 'Procédures d\'exécution'],
            region: 'Dakar'
        },

// Professions Juridiques - Experts Judiciaires
        {
            nom: 'Ordre des experts judiciaires',
            type: 'institutions-judiciaires',
            description: 'Organisation des experts judiciaires',
            adresse: 'Dakar, Sénégal',
            long: '-17.4445',
            lat: '14.6930',
            telephone: '+221 33 823 67 89',
            region: 'Dakar'
        },
        {
            nom: 'Dr. Alioune Mbengue',
            type: 'experts-judiciaires',
            description: 'Expert judiciaire en comptabilité et finance',
            adresse: 'Cabinet Mbengue Expertise, Almadies, Dakar',
            long: '-17.4445',
            lat: '14.6930',
            telephone: '+221 33 823 67 89',
            email: 'a.mbengue@expertise-mbengue.sn',
            specialites: ['Expertise comptable', 'Évaluation d\'entreprises', 'Audit judiciaire'],
            region: 'Dakar'
        },
        {
            nom: 'Ing. Cheikh Tidiane Fall',
            type: 'experts-judiciaires',
            description: 'Expert judiciaire en BTP et architecture',
            adresse: 'Bureau Fall Expertise, VDN, Dakar',
            long: '-17.4700',
            lat: '14.7200',
            telephone: '+221 33 825 78 34',
            email: 'ct.fall@expertise-fall.sn',
            specialites: ['Expertise BTP', 'Malfaçons', 'Évaluation immobilière'],
            region: 'Dakar'
        },

// Professions Juridiques - Arbitres (pas d'institution spécifique, laissé vide pour l'instant)

// Organismes et Structures - Ordres Professionnels
// (Aucune institution spécifique ici, peut être couvert par professions-juridiques)

// Organismes et Structures - Centres de Formation
        {
            nom: 'Centre de Formation Judiciaire (CFJ)',
            type: 'centres-formation',
            description: 'Formation des magistrats et personnels judiciaires',
            adresse: 'Dakar, Sénégal',
            long: '-17.4611',
            lat: '14.7278',
            telephone: '+221 33 825 89 01',
            region: 'Dakar'
        },
        {
            nom: 'Écoles privées de droit',
            type: 'centres-formation',
            description: 'Établissements privés formant en droit',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            telephone: '+221 33 800 00 00',
            region: ''
        },

// Organismes et Structures - Centres d'Arbitrage
        {
            nom: 'Centre d\'Arbitrage, de Médiation et de Conciliation (CAMC)',
            type: 'centres-arbitrage',
            description: 'Centre pour la résolution alternative des litiges',
            adresse: 'Dakar, Sénégal',
            long: '-17.4550',
            lat: '14.7000',
            telephone: '+221 33 826 90 12',
            region: 'Dakar'
        },
        {
            nom: 'Institutions de médiation communautaire',
            type: 'centres-arbitrage',
            description: 'Médiation au niveau communautaire',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            telephone: '+221 33 800 00 00',
            region: ''
        },

// Universités et Chercheurs - Facultés de Droit
        {
            "nom": "UCAD - Faculté des Sciences Juridiques",
            "type": "facultes-droit",
            "description": "Formation supérieure en droit",
            "adresse": "Fann, Dakar",
            "long": "-17.4500",
            "lat": "14.6833",
            "telephone": "+221 33 824 23 79",
            "website": "www.ucad.sn",
            "specialites": ["Droit public", "Droit privé", "Droit OHADA"],
            "region": "Dakar"
        },
        {
            "nom": "UGB - UFR Sciences Juridiques et Politiques (SJP)",
            "type": "facultes-droit",
            "description": "Formation juridique à Saint-Louis",
            "adresse": "Saint-Louis, Sénégal",
            "long": "-16.4633",
            "lat": "16.0583",
            "telephone": "+221 33 961 19 06",
            "website": "www.ugb.sn",
            "specialites": ["Droit public", "Droit des affaires", "Droit de l'homme"],
            "region": "Saint-Louis"
        },
        {
            "nom": "Université Gaston Berger - UFR Sciences Juridiques et Politiques (SJP)",
            "type": "facultes-droit",
            "description": "Unité de Formation et de Recherche axée sur les sciences juridiques et politiques.",
            "adresse": "Saint-Louis, Sénégal",
            "long": "-16.4633",
            "lat": "16.0583",
            "telephone": "+221 33 961 19 06",
            "website": "www.ugb.sn/ufr-sjp/",
            "specialites": ["Droit Public", "Droit Privé", "Science Politique"],
            "region": "Saint-Louis"
        },
        {
            "nom": "Université Alioune Diop de Bambey (UADB) - Unité des Sciences Juridiques et Politiques",
            "type": "facultes-droit",
            "description": "Formation en droit public, privé et science politique.",
            "adresse": "Bambey, Sénégal",
            "long": "-16.4760",
            "lat": "14.7088",
            "telephone": "+221 33 973 40 40",
            "website": "www.uadb.edu.sn",
            "specialites": ["Droit Public", "Droit Privé", "Science Politique"],
            "region": "Diourbel"
        },
        {
            "nom": "Université Cheikh Anta Diop - Laboratoire de Droit Public",
            "type": "chercheurs",
            "description": "Recherche en droit public, droit constitutionnel, droit administratif.",
            "adresse": "Fann, Dakar",
            "long": "-17.4500",
            "lat": "14.6833",
            "telephone": "+221 33 824 23 79",
            "website": "www.ucad.sn",
            "specialites": ["Droit public", "Droit constitutionnel", "Droit administratif"],
            "region": "Dakar"
        },
        {
            "nom": "Université Cheikh Anta Diop - Centre de Recherches, d’Études et de Documentation sur le Droit de l’Environnement (CREDDE)",
            "type": "chercheurs",
            "description": "Recherche et documentation sur le droit de l'environnement.",
            "adresse": "Fann, Dakar",
            "long": "-17.4500",
            "lat": "14.6833",
            "telephone": "+221 33 824 23 79",
            "website": "www.ucad.sn",
            "specialites": ["Droit de l'environnement", "Droit de l'urbanisme"],
            "region": "Dakar"
        },
        {
            "nom": "ISM Dakar - Institut Supérieur de Management - Droit des Affaires",
            "type": "facultes-droit",
            "description": "Établissement privé spécialisé en droit des affaires.",
            "adresse": "Dakar, Sénégal",
            "long": "-17.4526",
            "lat": "14.7001",
            "telephone": "+221 33 869 11 11",
            "website": "www.ism.edu.sn",
            "specialites": ["Droit des affaires", "Droit fiscal", "Droit bancaire"],
            "region": "Dakar"
        },
        {
            "nom": "Université Amadou Mahtar Mbow (UAM) - Faculté des Sciences Juridiques et Politiques",
            "type": "facultes-droit",
            "description": "Formation en sciences juridiques et politiques.",
            "adresse": "Diamniadio, Dakar, Sénégal",
            "long": "-17.2000",
            "lat": "14.7000",
            "telephone": "",
            "website": "www.uam.edu.sn",
            "specialites": ["Droit public", "Droit privé", "Science politique"],
            "region": "Dakar"
        },
        {
            "nom": "Université du Sine Saloum El Hadj Ibrahima Niass (USSEIN) - Département Droit",
            "type": "facultes-droit",
            "description": "Département de droit axé sur les problématiques juridiques locales.",
            "adresse": "Fatick, Kaolack, Kaffrine (Campus)",
            "long": "-16.4167",
            "lat": "14.4833",
            "telephone": "+221 33 941 23 45",
            "website": "www.ussein.sn",
            "specialites": ["Droit privé", "Droit public"],
            "region": "Fatick"
        },
        {
            "nom": "SupDroit Dakar",
            "type": "facultes-droit",
            "description": "Établissement privé de formation en droit.",
            "adresse": "Dakar, Sénégal",
            "long": "-17.4468",
            "lat": "14.7005",
            "telephone": "+221 33 825 80 80",
            "website": "www.supdroit.com",
            "specialites": ["Droit des affaires", "Droit privé"],
            "region": "Dakar"
        },
        {
            "nom": "Université Assane Seck de Ziguinchor (UASZ) - UFR Sciences Juridiques et Économiques",
            "type": "facultes-droit",
            "description": "Formation en droit dans le sud du Sénégal.",
            "adresse": "Ziguinchor, Sénégal",
            "long": "-16.2750",
            "lat": "12.5667",
            "telephone": "+221 33 991 19 06",
            "website": "www.uas-ziguinchor.sn",
            "specialites": ["Droit public", "Droit privé"],
            "region": "Ziguinchor"
        },
        {
            nom: "Université Virtuelle du Sénégal (UVS) - Droit et Sciences Politiques",
            type: "facultes-droit",
            description: "Formation à distance en droit et sciences politiques.",
            adresse: "Dakar, Sénégal",
            long: "-17.4479",
            lat: "14.6974",
            telephone: "+221 33 859 13 13",
            website: "www.uvs.sn",
            specialites: ["Droit à distance", "Sciences politiques"],
            region: "Dakar"
        },
        {
            nom: "Prof. Ismaïla Madior Fall",
            type: "chercheurs",
            description: "Professeur titulaire de Droit public, ancien Ministre d'État. Spécialiste du droit constitutionnel et des institutions politiques.",
            adresse: "Faculté des Sciences Juridiques et Politiques, UCAD",
            long: "-17.4500",
            lat: "14.6833",
            telephone: "+221 33 800 00 00",
            website: "www.ucad.sn",
            specialites: ["Droit constitutionnel", "Droit public", "Droit international public"],
            region: "Dakar"
        },
        {
            nom: "Prof. Abdoulaye Sakho",
            type: "chercheurs",
            description: "Professeur Agrégé de Droit privé. Expert en droit économique et droit des affaires, notamment le droit OHADA.",
            adresse: "Faculté des Sciences Juridiques et Politiques, UCAD",
            long: "-17.4500",
            lat: "14.6833",
            telephone: "+221 33 800 00 00",
            website: "www.ucad.sn",
            specialites: ["Droit OHADA", "Droit des affaires", "Droit économique"],
            region: "Dakar"
        },
        {
            nom: "Prof. Mouhamadou Moustapha Aidara",
            type: "chercheurs",
            description: "Professeur Agrégé de Droit public à l'Université Gaston Berger (UGB). Spécialiste du droit des collectivités publiques et de la commande publique.",
            adresse: "UFR Sciences Juridiques et Politiques, UGB",
            long: "-16.4633",
            lat: "16.0583",
            telephone: "+221 33 800 00 00",
            website: "www.ugb.sn",
            specialites: ["Droit administratif", "Droit des collectivités publiques", "Droit de la commande publique"],
            region: "Saint-Louis"
        },
        {
            nom: "Prof. Patrice Samuel Aristide Badji",
            type: "chercheurs",
            description: "Professeur Agrégé de Droit privé. Enseignant-chercheur à l'UCAD, spécialisé en droit civil et droit des obligations.",
            adresse: "Faculté des Sciences Juridiques et Politiques, UCAD",
            long: "-17.4500",
            lat: "14.6833",
            telephone: "+221 33 800 00 00",
            website: "www.ucad.sn",
            specialites: ["Droit civil", "Droit des obligations", "Droit privé"],
            region: "Dakar"
        },
        {
            nom: "Prof. Babacar Ndiaye",
            type: "chercheurs",
            description: "Professeur de Droit et ancien Recteur de l'Université Amadou Mahtar Mbow (UAM).",
            adresse: "Université Amadou Mahtar Mbow (UAM)",
            long: "-17.2000",
            lat: "14.7000",
            telephone: "+221 33 800 00 00",
            website: "www.uam.edu.sn",
            specialites: ["Droit public"],
            region: "Dakar"
        },
        {
            nom: "Prof. Mamadou Niang",
            type: "chercheurs",
            description: "Professeur titulaire de Droit public à l'UCAD. Spécialiste en droit international public et droit de l'Union européenne.",
            adresse: "Faculté des Sciences Juridiques et Politiques, UCAD",
            long: "-17.4500",
            lat: "14.6833",
            telephone: "+221 33 800 00 00",
            website: "www.ucad.sn",
            specialites: ["Droit international public", "Droit de l'Union européenne"],
            region: "Dakar"
        },
        {
            nom: "Dr. Jean-Louis Correa",
            type: "chercheurs",
            description: "Enseignant-chercheur en Droit public, rattaché à l'Université Virtuelle du Sénégal (UVS).",
            adresse: "Université Virtuelle du Sénégal (UVS)",
            long: "-17.4479",
            lat: "14.6974",
            telephone: '+221 33 800 00 00',
            website: "www.uvs.sn",
            specialites: ["Droit public", "Droit constitutionnel"],
            region: "Dakar"
        },
        {
            nom: "Dr. Khamad Ndour",
            type: "chercheurs",
            description: "Assistant en Droit privé à la Faculté des Sciences Juridiques et Politiques de l'UCAD.",
            adresse: "Faculté des Sciences Juridiques et Politiques, UCAD",
            long: "-17.4500",
            lat: "14.6833",
            telephone: "+221 33 800 00 00",
            website: "www.ucad.sn",
            specialites: ["Droit privé"],
            region: "Dakar"
        },
        {
            nom: "Prof. Moussa Gueye",
            type: "chercheurs",
            description: "Professeur Agrégé de Droit privé à l'UCAD. Spécialiste en droit civil.",
            adresse: "Faculté des Sciences Juridiques et Politiques, UCAD",
            long: "-17.4500",
            lat: "14.6833",
            telephone: "+221 33 800 00 00",
            website: "www.ucad.sn",
            specialites: ["Droit civil", "Droit privé"],
            region: "Dakar"
        },
        {
            nom: "Prof. Diegane Diouf",
            type: "chercheurs",
            description: "Recteur de l'Université du Sine Saloum El Hadj Ibrahima Niass (USSEIN). Il a des travaux de recherche en droit public.",
            adresse: "Université du Sine Saloum (USSEIN)",
            long: "-16.4167",
            lat: "14.4833",
            telephone: "+221 33 800 00 00",
            website: "www.ussein.sn",
            specialites: ["Droit public"],
            region: "Fatick"
        },
// Universités et Chercheurs - Chercheurs (pas d'institution spécifique, laissé vide pour l'instant)

// ONG et Projets - ONG Juridiques
        {
            nom: 'RADDHO',
            type: 'ong-juridiques',
            description: 'Rencontre Africaine des Droits de l\'Homme',
            adresse: 'Dakar, Sénégal',
            long: '-17.4667',
            lat: '14.7167',
            telephone: '+221 33 827 01 23',
            region: 'Dakar'
        },
        {
            nom: 'Amnesty International Sénégal',
            type: 'ong-juridiques',
            description: 'Défense des droits humains',
            adresse: 'Dakar, Sénégal',
            long: '-17.4589',
            lat: '14.7089',
            telephone: '+221 33 828 12 34',
            region: 'Dakar'
        },
        {
            nom: 'Article 19',
            type: 'ong-juridiques',
            description: 'Promotion de la liberté d\'expression',
            adresse: 'Dakar, Sénégal',
            long: '-17.4722',
            lat: '14.7144',
            telephone: '+221 33 829 23 45',
            region: 'Dakar'
        },
        {
            nom: 'OSIWA',
            type: 'ong-juridiques',
            description: 'Open Society Initiative for West Africa',
            adresse: 'Dakar, Sénégal',
            long: '-17.4633',
            lat: '14.7111',
            telephone: '+221 33 830 34 56',
            region: 'Dakar'
        },

// ONG et Projets - Cliniques Juridiques
        {
            nom: 'Cliniques communautaires de quartier',
            type: 'cliniques-juridiques',
            description: 'Aide juridique au niveau local',
            adresse: 'Diverses régions, Sénégal',
            long: '-14.4974',
            lat: '14.4974',
            telephone: '+221 33 800 00 00',
            region: ''
        },

// Organismes de Régulation - Aide Juridique (réinterprété pour inclure régulateurs)
        {
            nom: 'Commission Nationale des Données Personnelles (CDP)',
            type: 'aide-juridique',
            description: 'Régulation de la protection des données',
            adresse: 'Dakar, Sénégal',
            long: '-17.4556',
            lat: '14.7056',
            telephone: '+221 33 832 56 78',
            region: 'Dakar'
        },
        {
            nom: 'Commission Électorale Nationale Autonome (CENA)',
            type: 'aide-juridique',
            description: 'Organisation des élections',
            adresse: 'Dakar, Sénégal',
            long: '-17.4578',
            lat: '14.7078',
            telephone: '+221 33 833 67 89',
            region: 'Dakar'
        },
        {
            nom: 'Autorité de Régulation des Marchés Publics (ARMP)',
            type: 'aide-juridique',
            description: 'Contrôle des marchés publics',
            adresse: 'Dakar, Sénégal',
            long: '-17.4600',
            lat: '14.7100',
            telephone: '+221 33 834 78 90',
            region: 'Dakar'
        },
        {
            nom: 'Office National de Lutte contre la Fraude et la Corruption (OFNAC)',
            type: 'aide-juridique',
            description: 'Lutte contre la corruption',
            adresse: 'Dakar, Sénégal',
            long: '-17.4522',
            lat: '14.7022',
            telephone: '+221 33 835 89 01',
            region: 'Dakar'
        }
    ];

    getCategories(): AnnuaireCategory[] {
        return this.categories;
    }

    getInstitutions(): Institution[] {
        return this.institutions;
    }
}