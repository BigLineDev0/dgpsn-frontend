import { MenuItem } from "./menu.model";
import {Authority} from "@/app/util/Authority";

export const MENU: MenuItem[] = [
  {
    label: "Accueil",
    isTitle: true,
    link: "",
    permissions : Authority.DASHBOARD,
  },
  {
    label: "Tableau de bord",
    icon: "home",
    link: "/admin/acces/dashbord",
    permissions: Authority.MODULE.DASHBOARD.DASHBOARD,

  },
  {
    label: "Rapports",
    icon: "clipboard",
    link: "/admin/acces/report",
    permissions: Authority.MODULE.DASHBOARD.RAPPORTS,
    subItems: [
      {
        label: "Financement",
        link: "/admin/acces/report/financial-report",
        permissions: Authority.MODULE.DASHBOARD.RAPPORTS,
      },
      // {
      //   label: 'Gestion administrative',
      //   link: '/admin/acces/report/administrative-report'
      // },
      // {
      //   label: "Planification",
      //   link: "/admin/acces/report/planning-report",
      // },
      {
        label: "Gestion Controle",
        link: "/admin/acces/report/controle-gestion",
        permissions: Authority.MODULE.DASHBOARD.DASHBOARD,
      },
      // {
      //   label: 'Contrôle de gestion',
      //   link: '/admin/acces/report/management-control-report'
      // }
    ],
  },

  //
  {
    label: "Gestion Administrative",
    isTitle: true,
    link: "",
    permissions: Authority.ACTES_GESTION,
  },
  {
    label: "Agents",
    icon: "users",
    link: "/admin/acces/list-agents",
    permissions: Authority.MODULE.ACTES_GESTION.AGENT,

  },
  {
    label: "Congés & Absences",
    icon: "calendar",
    link: "/admin/acces/demande-conge",
    permissions: Authority.MODULE.ACTES_GESTION.DEMANDE_CONGE,
  },
  {
    label: "Services extérieurs",
    icon: "layers",
    link: "/admin/acces/services-exterieur",
    permissions: Authority.MODULE.ACTES_GESTION.SERVICE_EXTERIEUR,
  },
  {
    label: "Recrutements",
    icon: "user-plus",
    link: "/admin/acces/recrutement",
    permissions: Authority.MODULE.ACTES_GESTION.RECRUTEMENTS,
  },
  {
    label: "Gestion des Projets",
    isTitle: true,
    link: "",
    permissions: Authority.PROJECT_LIST,
  },
  {
    label: "Projets",
    icon: "folder",
    link: "/admin/acces/projets",
    permissions: Authority.MODULE.PROJECT_LIST.PROJECT_LIST
  },
  {
    label: "Appel d'offres",
    icon: "volume-2",
    link: "/admin/acces/appel-offre/plan-de-passation",
    permissions: Authority.MODULE.PROJECT_LIST.PROJECT_LIST,
  },
  {
    label: "Ordre de mission",
    icon: "disc",
    link: "/admin/acces/ordre-mission",
    permissions: Authority.MODULE.ACTES_GESTION.ORDRE_MISSION,
  },
  {
    label: "Gestion des courriers",
    isTitle: true,
    link: "",
    permissions: Authority.GESTION_COURRIERS,
  },
  {
    label: "Courriers",
    icon: "mail",
    link: "/admin/acces/courrier/main-courrier",
    permissions: Authority.MODULE.GESTION_COURRIERS.COURRIERS,
  },
  {
    label: "Gestion Financière",
    isTitle: true,
    link: "",
    permissions: Authority.GESTION_FINANCIERE,
  },
  {
    label: "Budgets",
    icon: "dollar-sign",
    link: "/admin/acces/finance/budgets",
    permissions: Authority.MODULE.GESTION_FINANCIERE.BUDGETS,
  },
 {
    label: "PTBA",
    icon: "dollar-sign",
    link: "/admin/acces/ptba",
    permissions: Authority.MODULE.GESTION_FINANCIERE.BUDGETS,
  },
  {
    label: "Gestion Documentaire",
    isTitle: true,
    link: "",
    permissions: Authority.DOCUMENT,

  },
  {
    label: "Documents",
    icon: "file",
    link: "/admin/acces/document",
    permissions: Authority.MODULE.DOCUMENT.DOCUMENT,

  },
 
{
    label: "Organigramme",
    isTitle: true,
    link: "",
    permissions: Authority.ORGANIGRAMME,

  },
   {
    label: "Direction",
    icon: "file",
    link: "/admin/acces/organigramme",
     permissions: Authority.MODULE.ORGANIGRAMME.ORGANIGRAMME,
  },
  // {
  //   label : "Etat budget",
  //   icon : "pie-chart",
  //   link : '/admin/acces/finance/etat-budget'
  // },
  // {
  //   label: 'Contrôle de Gestion  & Pilotage',
  //   isTitle: true,
  //   link: ''
  // },
  // {
  //   label: 'Bons d\'engagement',
  //   icon: 'shield',
  //   link: '/admin/acces/controle/suiviebudgets'
  // },
  // {
  //   label: 'Audit Trail ',
  //   icon: 'shield',
  //   link: '/admin/acces/controle/suiviebudgets'
  // },
  {
    label: "Paramétrage",
    isTitle: true,
    link: "",
      permissions: Authority.PARAMETRAGE,
  },
  {
    label: "Référentiels",
    icon: "database",
    link: "",
    permissions: Authority.PARAMETRAGE,
    subItems: [
      {
        label: "Simples",
        icon: "user",
        link: "/admin/acces/referentiel",
        permissions: Authority.MODULE.PARAMETRAGE.REFERENTIELS,

      },
      {
        label: "Promoteurs",
        icon: "users",
        link: "/admin/acces/promoteur",        
        permissions: Authority.MODULE.PARAMETRAGE.PROMOTEUR,
      },
      {
        label: "Catégories documents",
        icon: "folder",
        link: "/admin/acces/categorie",
          permissions: Authority.MODULE.PARAMETRAGE.CATEGORY
      },
      {
        label: "Indicateurs",
        icon: "activity",
        link: "/admin/acces/indicateur",
          permissions: Authority.MODULE.PARAMETRAGE.INDICATOR
      },
      // {
      //   label: 'Agents',
      //   icon: 'user-check',
      //   link: '/admin/acces/agent',
      // },
      {
        label: "Régions",
        icon: "map",
        link: "/admin/acces/cadrelogique",
        permissions: Authority.MODULE.PARAMETRAGE.CADRE_LOGIQUE
      },
      {
        label: "Rôles",
        icon: "shield",
        link: "/admin/acces/role",
          permissions: Authority.MODULE.PARAMETRAGE.ROLE
      },
      {
        label: "Status",
        icon: "check-circle",
        link: "/admin/acces/status",
          permissions: Authority.MODULE.PARAMETRAGE.REF_STATUS
      },
      {
        label: "Sous-catégorie",
        icon: "layers",
        link: "/admin/acces/sousCategorie",
          permissions: Authority.MODULE.PARAMETRAGE.SUB_CATEGORY
      },
      {
        label: "Sous-secteur",
        icon: "grid",
        link: "/admin/acces/sousSecteur",
          permissions: Authority.MODULE.PARAMETRAGE.SUB_SECTOR
      },
     /* {
        label: "Type dépense",
        icon: "credit-card",
        link: "/admin/acces/depense",
      },*/
      // {
      //   label: 'Type contrat',
      //   icon: 'credit-card',
      //   link: '/admin/acces/list-typecontat',
      // },

            //  {
            //   label: 'Caracteristique',
            //   icon: 'credit-card',
            //   link: '/admin/acces/list-caracteristique',
            // },

            {
                label: "type caracteristque",
                icon: "credit-card",
                link: "/admin/acces/type-caracteristque",
            },

          /*  {
                label: "Type requête",
                icon: "file-text",
                link: "/admin/acces/requete",
            },*/
            {
                label: "Structure",
                icon: "building",
                link: "/admin/acces/structure",
                permissions: Authority.MODULE.PARAMETRAGE.STRUCTURE,
            },
            /*{
                label: "Nature spécifique",
                icon: "target",
                link: "/admin/acces/natureSpecifique",
            },*/
            {
                label: "Catégorie budgétaire",
                icon: "briefcase",
                link: "/admin/acces/categoriebudgetaire",
            },
            {
                label: "Période",
                icon: "calendar",
                link: "/admin/acces/periode",
                permissions: Authority.MODULE.PARAMETRAGE.PERIODICITY,
            },
            /*{
                label: "Nature de la recette",
                icon: "dollar-sign",
                link: "/admin/acces/naturedelarecette",
            },
            {
                label: "Nature dépense",
                icon: "shopping-bag",
                link: "/admin/acces/naturedepense",
            },*/
            /*{
                label: "Type évaluation",
                icon: "bar-chart-2",
                link: "/admin/acces/typedevaluation",
            },*/
        ],
    },
    {
        label: "Classe",
        icon: "credit-card",
        link: "/admin/acces/finance/parametres",
        permissions : Authority.MODULE.PARAMETRAGE.PLAN_COMPTABLE,

    },
    {
        label: 'Fournisseurs',
        icon: 'truck',
        link: '/admin/acces/fournisseur',
        permissions : Authority.MODULE.PARAMETRAGE.FOURNISSEURS
    },
    {
        label: "Securite",
        isTitle: true,
        link: "",
        permissions: Authority.SECURITE
    },  

    {
        label: "Alertes",
        icon: "alert-triangle",
        link: "/admin/acces/alerte",
        permissions: Authority.MODULE.SECURITE.ALERTES
    },
    {
        label: "Utilisateurs",
        icon: "users",
        link: "/admin/securite/user",
        permissions: Authority.MODULE.SECURITE.USERS
    },
    {
        label: "Profils",
        icon: "lock",
        link: "/admin/securite/profil",
        permissions: Authority.MODULE.SECURITE.PROFILS
    },
    {
        label: "Workflow",
        icon: "share-2",
        link: "/admin/acces/work-flow",
        permissions: Authority.MODULE.SECURITE.WORKFLOW
    },
    {
        label: "Journal",
        icon: "file-text",
        link: "/admin/securite/journal",
        permissions: Authority.MODULE.SECURITE.JOURNAL
    },

    // {
    //   label: 'Sécurité',
    //   icon: 'file-text',
    //   expanded: false,
    //   link: '',
    //   subItems: [

    //     {
    //       label: 'Utilisateurs',
    //       link: '/admin/securite/user'
    //     },

    //   ]
    // },
];
