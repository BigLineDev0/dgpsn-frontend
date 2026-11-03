export class Authority {
  // permission general
  static readonly ALL_ACCESS = "ALL_ACCESS";

  // permission du tableau de bord
  static readonly READ_TDB_RESUME = "READ_TDB_RESUME";
  static readonly READ_TDB_BUDGET = "READ_TDB_BUDGET";
  static readonly READ_TDB_PROJETS = "READ_TDB_PROJETS";
  static readonly READ_TDB_AGENT = "READ_TDB_AGENT";
  static readonly READ_TDB_FINANCMENTS = "READ_TDB_FINANCMENTS";
  static readonly READ_TDB_PROBLEMES = "READ_TDB_PROBLEMES";
  static readonly READ_TDB_ENTREPRISE = "READ_TDB_ENTREPRISE";
  static readonly READ_TDB_QUALITE_AIR = "READ_TDB_QUALITE_AIR";
  static readonly READ_TDB_EVALUATION = "READ_TDB_EVALUATION";
  static readonly READ_TDB_POLLUTION = "READ_TDB_POLLUTION";
  static readonly READ_TDB_ICPE = "READ_TDB_ICPE";
  static readonly READ_TDB_SERVICE = "READ_TDB_SERVICE";
  static readonly READ_TDB_CONGE = "READ_TDB_CONGE";

  // permission du rapport
  static readonly READ_RAPPORT = "READ_RAPPORT";
  static readonly READ_RAPPORTS = "READ_RAPPORTS";
  static readonly READ_RAPPORT_FINANCEMENT = "READ_RAPPORT_FINANCEMENT";
  static readonly READ_RAPPORT_GESTION_CONTROLE = "READ_RAPPORT_GESTION_CONTROLE";
  static readonly EXPORT_RAPPORT = "EXPORT_RAPPORT";
  static readonly GENERATE_RAPPORT = "GENERATE_RAPPORT";

  // ===== GESTION ADMINISTRATIVE =====
  // Agents
  static readonly READ_AGENT = "READ_AGENT";
  static readonly ADD_AGENT = "ADD_AGENT";
  static readonly EDIT_AGENT = "EDIT_AGENT";
  static readonly DELETE_AGENT = "DELETE_AGENT";
  static readonly IMPORT_AGENT = "IMPORT_AGENT";
  static readonly EXPORT_AGENT = "EXPORT_AGENT";
  static readonly READ_FILE_AGENT = "READ_FILE_AGENT";

  // Congés & Absences
  static readonly READ_CONGE = "READ_CONGE";
  static readonly ADD_CONGE = "ADD_CONGE";
  static readonly EDIT_CONGE = "EDIT_CONGE";
  static readonly DELETE_CONGE = "DELETE_CONGE";
  static readonly VALIDATION_CONGE = "VALIDATION_CONGE";
  static readonly GENERATE_FICHE_CONGE = "GENERATE_FICHE_CONGE";
  static readonly GENERATE_DEMANDE_CONGE = "GENERATE_DEMANDE_CONGE";
  static readonly GENERATE_DECISION_CONGE = "GENERATE_DECISION_CONGE";
  static readonly GENERATE_BE_CONGE = "GENERATE_BE_CONGE";
  static readonly READ_DOCUMENT_CONGE = "READ_DOCUMENT_CONGE";

  // Cessation de service
  static readonly READ_CESSATION_CONGE = "READ_CESSATION_CONGE";
  static readonly ADD_CESSATION = "ADD_CESSATION";
  static readonly EDIT_CESSATION = "EDIT_CESSATION";
  static readonly DELETE_CESSATION = "DELETE_CESSATION";

  // Services extérieurs - Formations Extérieures
  static readonly READ_FORMATION_EXTERIEUR = "READ_FORMATION_EXTERIEUR";
  static readonly ADD_FORMATION_EXTERIEUR = "ADD_FORMATION_EXTERIEUR";
  static readonly EDIT_FORMATION_EXTERIEUR = "EDIT_FORMATION_EXTERIEUR";
  static readonly DELETE_FORMATION_EXTERIEUR = "DELETE_FORMATION_EXTERIEUR";

  // Services extérieurs - Ateliers
  static readonly READ_ATELIER = "READ_ATELIER";
  static readonly ADD_ATELIER = "ADD_ATELIER";
  static readonly EDIT_ATELIER = "EDIT_ATELIER";
  static readonly DELETE_ATELIER = "DELETE_ATELIER";

  // Recrutements
  static readonly READ_RECRUTEMENT = "READ_RECRUTEMENT";
  static readonly ADD_RECRUTEMENT = "ADD_RECRUTEMENT";
  static readonly EDIT_RECRUTEMENT = "EDIT_RECRUTEMENT";
  static readonly DELETE_RECRUTEMENT = "DELETE_RECRUTEMENT";
  static readonly UPDATE_STATUT_RECRUTEMENT = "UPDATE_STATUT_RECRUTEMENT";
  static readonly IMPORT_RECRUTEMENT = "IMPORT_RECRUTEMENT";
  static readonly EXPORT_RECRUTEMENT = "EXPORT_RECRUTEMENT";
  static readonly READ_FILE_RECRUTEMENT = "READ_FILE_RECRUTEMENT";

  // ===== GESTION DES PROJETS =====
  // Projets
  static readonly READ_PROJECT = "READ_PROJECT";
  static readonly ADD_PROJECT = "ADD_PROJECT";
  static readonly EDIT_PROJECT = "EDIT_PROJECT";
  static readonly DELETE_PROJECT = "DELETE_PROJECT";
  static readonly IMPORT_PROJECT = "IMPORT_PROJECT";
  static readonly EXPORT_PROJECT = "EXPORT_PROJECT";
  static readonly READ_PROJECT_PROGRESS_TRACKING = "READ_PROJECT_PROGRESS_TRACKING";
  static readonly READ_PROJECT_ACTIVITY_MONITORING = "READ_PROJECT_ACTIVITY_MONITORING";
  static readonly READ_PROJECT_FINANCEMENT = "READ_PROJECT_FINANCEMENT";
  static readonly READ_PROJECT_APPEL_OFFRE = "READ_PROJECT_APPEL_OFFRE";
  static readonly READ_PROJECT_ESG = "READ_PROJECT_ESG";
  static readonly READ_PROJECT_TDB = "READ_PROJECT_TDB";
  static readonly READ_PROJECT_EENTREPRISE = "READ_PROJECT_EENTREPRISE";
  static readonly READ_SUMMARY_SHEET = "READ_SUMMARY_SHEET";
  static readonly READ_DETAIL = "READ_DETAIL";
  static readonly READ_PROJECT_SETTINGS = "READ_PROJECT_SETTINGS";
  static readonly ADD_PLAN_DE_PASSATION_MARKET = "ADD_PLAN_DE_PASSATION_MARKET";
  static readonly READ_PLAN_DE_PASSATION_MARKET = "READ_PLAN_DE_PASSATION_MARKET";
  static readonly DELETE_PLAN_DE_PASSATION_MARKET = "DELETE_PLAN_DE_PASSATION_MARKET";
  static readonly EDIT_PLAN_DE_PASSATION_MARKET = "EDIT_PLAN_DE_PASSATION_MARKET";

  // Indicateurs
  static readonly READ_INDICATOR = "READ_INDICATOR";
  static readonly ADD_INDICATOR = "ADD_INDICATOR";
  static readonly EDIT_INDICATOR = "EDIT_INDICATOR";
  static readonly DELETE_INDICATOR = "DELETE_INDICATOR";
  static readonly EXPORT_INDICATOR = "EXPORT_INDICATOR";
  static readonly IMPORT_INDICATOR = "IMPORT_INDICATOR";

  // Avancement détaillé
  static readonly VALIDER_PROGRESS_TRACKING_INDICATOR = "VALIDER_PROGRESS_TRACKING_INDICATOR";
  static readonly ADD_PROGRESS_TRACKING_INDICATOR = "ADD_PROGRESS_TRACKING_INDICATOR";
  static readonly EDIT_PROGRESS_TRACKING_INDICATOR = "EDIT_PROGRESS_TRACKING_INDICATOR";
  static readonly DELETE_PROGRESS_TRACKING_INDICATOR = "DELETE_PROGRESS_TRACKING_INDICATOR";
  static readonly IMPORT_PROGRESS_TRACKING_INDICATOR = "IMPORT_PROGRESS_TRACKING_INDICATOR";
  static readonly EXPORT_PROGRESS_TRACKING_INDICATOR = "EXPORT_PROGRESS_TRACKING_INDICATOR";
  static readonly READ_FILE_PROGRESS_TRACKING_INDICATOR = "READ_FILE_PROGRESS_TRACKING_INDICATOR";

  // JALONS (Dates importantes)
  static readonly READ_MILESTONE = "READ_MILESTONE";
  static readonly ADD_MILESTONE = "ADD_MILESTONE";
  static readonly EDIT_MILESTONE = "EDIT_MILESTONE";
  static readonly DELETE_MILESTONE = "DELETE_MILESTONE";
  static readonly IMPORT_MILESTONE = "IMPORT_MILESTONE";
  static readonly EXPORT_MILESTONE = "EXPORT_MILESTONE";

  // ===== PARAMÉTRAGE PROJETS =====
  static readonly READ_UGP = "READ_UGP";
  static readonly ADD_UGP = "ADD_UGP";
  static readonly EDIT_UGP = "EDIT_UGP";
  static readonly DELETE_UGP = "DELETE_UGP";

  static readonly READ_INTERVENTION_AREA = "READ_INTERVENTION_AREA";
  static readonly ADD_INTERVENTION_AREA = "ADD_INTERVENTION_AREA";
  static readonly DELETE_INTERVENTION_AREA = "DELETE_INTERVENTION_AREA";
  static readonly EXPORT_INTERVENTION_AREA = "EXPORT_INTERVENTION_AREA";
  static readonly IMPORT_INTERVENTION_AREA = "IMPORT_INTERVENTION_AREA";

  static readonly READ_SUPERVISION_EXECUTION_STRUCTURE = "READ_SUPERVISION_EXECUTION_STRUCTURE";
  static readonly ADD_SUPERVISION_EXECUTION_STRUCTURE = "ADD_SUPERVISION_EXECUTION_STRUCTURE";
  static readonly EDIT_SUPERVISION_EXECUTION_STRUCTURE = "EDIT_SUPERVISION_EXECUTION_STRUCTURE";
  static readonly DELETE_SUPERVISION_EXECUTION_STRUCTURE = "DELETE_SUPERVISION_EXECUTION_STRUCTURE";
  static readonly EXPORT_SUPERVISION_EXECUTION_STRUCTURE = "EXPORT_SUPERVISION_EXECUTION_STRUCTURE";
  static readonly IMPORT_SUPERVISION_EXECUTION_STRUCTURE = "IMPORT_SUPERVISION_EXECUTION_STRUCTURE";

  static readonly READ_PARTNER = "READ_PARTNER";
  static readonly ADD_PARTNER = "ADD_PARTNER";
  static readonly EDIT_PARTNER = "EDIT_PARTNER";
  static readonly DELETE_PARTNER = "DELETE_PARTNER";
  static readonly EXPORT_PARTNER = "EXPORT_PARTNER";
  static readonly IMPORT_PARTNER = "IMPORT_PARTNER";

  static readonly READ_ACTOR ="Consulter acteur";
  static readonly ADD_ACTOR ="Consulter acteur";
  static readonly EDIT_ACTOR ="Modifier acteur";
  static  readonly  DELETE_ACTOR= "Supprimer acteur";
  static  readonly  EXPORT_ACTOR ="Exporter acteur";
  static readonly  IMPORT_ACTOR ="Importer acteur";

  // ===== AUTRES FONCTIONNALITÉS =====
  static readonly ADD_PLAN_DE_PASSATION = "ADD_PLAN_DE_PASSATION";
  static readonly READ_PLAN_DE_PASSATION = "READ_PLAN_DE_PASSATION";
  static readonly EDIT_PLAN_DE_PASSATION = "EDIT_PLAN_DE_PASSATION";
  static readonly DELETE_PLAN_DE_PASSATION = "DELETE_PLAN_DE_PASSATION";

  static readonly READ_REALISATION = "READ_REALISATION";
  static readonly ADD_REALISATION = "ADD_REALISATION";
  static readonly EDIT_REALISATION = "EDIT_REALISATION";
  static readonly DELETE_REALISATION = "DELETE_REALISATION";

  static readonly READ_LIGNE_BUDGETAIRE = "READ_LIGNE_BUDGETAIRE";
  static readonly ADD_LIGNE_BUDGETAIRE = "ADD_LIGNE_BUDGETAIRE";
  static readonly EDIT_LIGNE_BUDGETAIRE = "EDIT_LIGNE_BUDGETAIRE";
  static readonly DELETE_LIGNE_BUDGETAIRE = "DELETE_LIGNE_BUDGETAIRE";

  static readonly READ_FUNDING_SOURCE = "READ_FUNDING_SOURCE";
  static readonly ADD_FUNDING_SOURCE = "ADD_FUNDING_SOURCE";
  static readonly EDIT_FUNDING_SOURCE = "EDIT_FUNDING_SOURCE";
  static readonly DELETE_FUNDING_SOURCE = "DELETE_FUNDING_SOURCE";

  static readonly READ_FUNDING_CONFIG = "READ_FUNDING_CONFIG";
  static readonly ADD_FUNDING_CONFIG = "ADD_FUNDING_CONFIG";
  static readonly EDIT_FUNDING_CONFIG = "EDIT_FUNDING_CONFIG";
  static readonly DELETE_FUNDING_CONFIG = "DELETE_FUNDING_CONFIG";

  static readonly READ_FUNDING_NEED = "READ_FUNDING_NEED";
  static readonly ADD_FUNDING_NEED = "ADD_FUNDING_NEED";
  static readonly EDIT_FUNDING_NEED = "EDIT_FUNDING_NEED";
  static readonly DELETE_FUNDING_NEED = "DELETE_FUNDING_NEED";

  static readonly READ_FUNDING_EXECUTION = "READ_FUNDING_EXECUTION";
  static readonly ADD_FUNDING_EXECUTION = "ADD_FUNDING_EXECUTION";
  static readonly EDIT_FUNDING_EXECUTION = "EDIT_FUNDING_EXECUTION";
  static readonly DELETE_FUNDING_EXECUTION = "DELETE_FUNDING_EXECUTION";

  static readonly READ_FUNDING_MOBILISATION = "READ_FUNDING_MOBILISATION";
  static readonly ADD_FUNDING_MOBILISATION = "ADD_FUNDING_MOBILISATION";
  static readonly EDIT_FUNDING_MOBILISATION = "EDIT_FUNDING_MOBILISATION";
  static readonly DELETE_FUNDING_MOBILISATION = "DELETE_FUNDING_MOBILISATION";

  static readonly READ_BUDGET_ACTIVITY = "READ_BUDGET_ACTIVITY";
  static readonly ADD_BUDGET_ACTIVITY = "ADD_BUDGET_ACTIVITY";
  static readonly EDIT_BUDGET_ACTIVITY = "EDIT_BUDGET_ACTIVITY";
  static readonly DELETE_BUDGET_ACTIVITY = "DELETE_BUDGET_ACTIVITY";

  static readonly READ_ETAPE_MISSION_ACTIVITY = "READ_ETAPE_MISSION_ACTIVITY";
  static readonly ADD_ETAPE_MISSION_ACTIVITY = "ADD_ETAPE_MISSION_ACTIVITY";
  static readonly EDIT_ETAPE_MISSION_ACTIVITY = "EDIT_ETAPE_MISSION_ACTIVITY";
  static readonly DELETE_ETAPE_MISSION_ACTIVITY = "DELETE_ETAPE_MISSION_ACTIVITY";

  static readonly READ_PARTICIPANT = "READ_PARTICIPANT";
  static readonly ADD_PARTICIPANT = "ADD_PARTICIPANT";
  static readonly EDIT_PARTICIPANT = "EDIT_PARTICIPANT";
  static readonly DELETE_PARTICIPANT = "DELETE_PARTICIPANT";

  static readonly READ_EXPENSE_ACTIVITY = "READ_EXPENSE_ACTIVITY";
  static readonly ADD_EXPENSE_ACTIVITY = "ADD_EXPENSE_ACTIVITY";
  static readonly EDIT_EXPENSE_ACTIVITY = "EDIT_EXPENSE_ACTIVITY";
  static readonly DELETE_EXPENSE_ACTIVITY = "DELETE_EXPENSE_ACTIVITY";

  // ===== GESTION DES COURRIERS =====
  static readonly READ_COURRIER = "READ_COURRIER";
  static readonly ADD_COURRIER = "ADD_COURRIER";
  static readonly EDIT_COURRIER = "EDIT_COURRIER";
  static readonly DELETE_COURRIER = "DELETE_COURRIER";
  static readonly ARCHIVER_COURRIER = "ARCHIVER_COURRIER";
  static readonly DESARCHIVER_COURRIER = "DESARCHIVER_COURRIER";
  static readonly CHANGER_STATUT_COURRIER = "CHANGER_STATUT_COURRIER";
  static readonly READ_STATISTIQUES = "READ_STATISTIQUES";
  static readonly IMPORT_COURRIER = "IMPORT_COURRIER";
  static readonly EXPORT_COURRIER = "EXPORT_COURRIER";
  static readonly DOCUMENT_COURIER = "DOCUMENT_COURIER";

  // ===== GESTION FINANCIÈRE =====
  static readonly READ_BUDGET = "READ_BUDGET";
  static readonly ADD_BUDGET = "ADD_BUDGET";
  static readonly EDIT_BUDGET = "EDIT_BUDGET";
  static readonly DELETE_BUDGET = "DELETE_BUDGET";
  static readonly READ_FINANCEMENT_BUDGET ="READ_FINANCEMENT_BUDGET";
  static readonly READ_PTBA = "READ_PTBA";
  static readonly SUIVIS_LIGNE_BUDGETAIRE = "SUIVIS_LIGNE_BUDGETAIRE"


  // ===== GESTION DOCUMENTAIRE =====
  static readonly READ_DOCUMENT = "READ_DOCUMENT";
  static readonly READ_FILE_DOCUMENT = "READ_FILE_DOCUMENT";
  static readonly ADD_DOCUMENT = "ADD_DOCUMENT";
  static readonly EDIT_DOCUMENT = "EDIT_DOCUMENT";
  static readonly DELETE_DOCUMENT = "DELETE_DOCUMENT";
  static readonly READ_FOLDER = "READ_FOLDER";
  static readonly ADD_FOLDER = "ADD_FOLDER";
  static readonly EDIT_FOLDER = "EDIT_FOLDER";
  static readonly DELETE_FOLDER = "DELETE_FOLDER";

  // ===== ORGANIGRAMME =====
  static readonly READ_ORGANIGRAMME = "READ_ORGANIGRAMME";
  static readonly ADD_ORGANIGRAMME = "ADD_ORGANIGRAMME";
  static readonly EDIT_ORGANIGRAMME = "EDIT_ORGANIGRAMME";
  static readonly DELETE_ORGANIGRAMME = "DELETE_ORGANIGRAMME";
  static readonly CONFIG_AGENT = "CONFIG_AGENT";
  static readonly READ_DIRECTION = "READ_DIRECTION";
  static readonly ADD_DIRECTION = "ADD_DIRECTION";
  static readonly EDIT_DIRECTION = "EDIT_DIRECTION";
  static readonly DELETE_DIRECTION = "DELETE_DIRECTION";

  // ===== PARAMÉTRAGE =====
  static readonly READ_REFERENTIEL = "READ_REFERENTIEL";
  static readonly ADD_REFERENTIEL = "ADD_REFERENTIEL";
  static readonly EDIT_REFERENTIEL = "EDIT_REFERENTIEL";
  static readonly DELETE_REFERENTIEL = "DELETE_REFERENTIEL";
  static readonly READ_FOURNISSEUR = "READ_FOURNISSEUR";
  static readonly ADD_FOURNISSEUR = "ADD_FOURNISSEUR";
  static readonly EDIT_FOURNISSEUR = "EDIT_FOURNISSEUR";
  static readonly DELETE_FOURNISSEUR = "DELETE_FOURNISSEUR";
  static readonly READ_JOURNAL ="Consulter journal";


  // ===== SÉCURITÉ =====
  // Alertes
  static readonly READ_ALERTE = "READ_ALERTE";
  static readonly ADD_ALERTE = "ADD_ALERTE";
  static readonly EDIT_ALERTE = "EDIT_ALERTE";
  static readonly DELETE_ALERTE = "DELETE_ALERTE";
  static readonly READ_NOTIFICATION = "READ_NOTIFICATION";


  static readonly READ_USER = "READ_USER";
  static readonly ADD_USER = "ADD_USER";
  static readonly EDIT_USER = "EDIT_USER";
  static readonly DELETE_USER = "DELETE_USER";
  static readonly UPDATE_PASSWORD = "UPDATE_PASSWORD";
  static readonly UPDATE_MY_PASSWORD = "UPDATE_MY_PASSWORD";
  static readonly GENERATE_AUTH_CODE = "GENERATE_AUTH_CODE";
  static readonly READ_TEMPORARY_CODE = "READ_TEMPORARY_CODE";
  static readonly UPDATE_TEMPORARY_CODE_STATUS = "UPDATE_TEMPORARY_CODE_STATUS";

  // Profils
  static readonly READ_PROFILE = "READ_PROFILE";
  static readonly ADD_PROFILE = "ADD_PROFILE";
  static readonly EDIT_PROFILE = "EDIT_PROFILE";
  static readonly DELETE_PROFILE = "DELETE_PROFILE";
  static readonly CONFIGURE_PROFILE = "CONFIGURE_PROFILE";

  // Journal
  static readonly READ_LOG = "READ_LOG";

  // ===== RÉFÉRENTIELS =====
  static readonly READ_PLAN_COMPTABLE = "READ_PLAN_COMPTABLE";
  static readonly ADD_PLAN_COMPTABLE = "ADD_PLAN_COMPTABLE";
  static readonly EDIT_PLAN_COMPTABLE = "EDIT_PLAN_COMPTABLE";
  static readonly DELETE_PLAN_COMPTABLE = "DELETE_PLAN_COMPTABLE";
  static readonly IMPORT_PLAN_COMPTABLE = "IMPORT_PLAN_COMPTABLE";
  static readonly EXPORT_PLAN_COMPTABLE = "EXPORT_PLAN_COMPTABLE";
  static readonly READ_FILE_PLAN_COMPTABLE = "READ_FILE_PLAN_COMPTABLE";

  static readonly READ_SUB_CATEGORY = "READ_SUB_CATEGORY";
  static readonly ADD_SUB_CATEGORY = "ADD_SUB_CATEGORY";
  static readonly EDIT_SUB_CATEGORY = "EDIT_SUB_CATEGORY";
  static readonly DELETE_SUB_CATEGORY = "DELETE_SUB_CATEGORY";

  static readonly READ_PERIODICITY = "READ_PERIODICITY";
  static readonly ADD_PERIODICITY = "ADD_PERIODICITY";
  static readonly EDIT_PERIODICITY = "EDIT_PERIODICITY";
  static readonly DELETE_PERIODICITY = "DELETE_PERIODICITY";

  static readonly READ_PARTNER_GROUP = "READ_PARTNER_GROUP";
  static readonly ADD_PARTNER_GROUP = "ADD_PARTNER_GROUP";
  static readonly EDIT_PARTNER_GROUP = "EDIT_PARTNER_GROUP";
  static readonly DELETE_PARTNER_GROUP = "DELETE_PARTNER_GROUP";

  static readonly READ_TAG = "READ_TAG";
  static readonly ADD_TAG = "ADD_TAG";
  static readonly EDIT_TAG = "EDIT_TAG";
  static readonly DELETE_TAG = "DELETE_TAG";

  static readonly READ_PERIOD = "READ_PERIOD";
  static readonly ADD_PERIOD = "ADD_PERIOD";
  static readonly EDIT_PERIOD = "EDIT_PERIOD";
  static readonly DELETE_PERIOD = "DELETE_PERIOD";

  static readonly READ_UNIT = "READ_UNIT";
  static readonly ADD_UNIT = "ADD_UNIT";
  static readonly EDIT_UNIT = "EDIT_UNIT";
  static readonly DELETE_UNIT = "DELETE_UNIT";

  static readonly READ_CADRE_LOGIQUE_TYPE = "READ_CADRE_LOGIQUE_TYPE";
  static readonly ADD_CADRE_LOGIQUE_TYPE = "ADD_CADRE_LOGIQUE_TYPE";
  static readonly EDIT_CADRE_LOGIQUE_TYPE = "EDIT_CADRE_LOGIQUE_TYPE";
  static readonly DELETE_CADRE_LOGIQUE_TYPE = "DELETE_CADRE_LOGIQUE_TYPE";

  static readonly READ_CADRE_LOGIQUE = "READ_CADRE_LOGIQUE";
  static readonly ADD_CADRE_LOGIQUE = "ADD_CADRE_LOGIQUE";
  static readonly EDIT_CADRE_LOGIQUE = "EDIT_CADRE_LOGIQUE";
  static readonly DELETE_CADRE_LOGIQUE = "DELETE_CADRE_LOGIQUE";

  static readonly READ_COUNTRY = "READ_COUNTRY";
  static readonly ADD_COUNTRY = "ADD_COUNTRY";
  static readonly EDIT_COUNTRY = "EDIT_COUNTRY";
  static readonly DELETE_COUNTRY = "DELETE_COUNTRY";

  static readonly READ_SECTOR = "READ_SECTOR";
  static readonly ADD_SECTOR = "ADD_SECTOR";
  static readonly EDIT_SECTOR = "EDIT_SECTOR";
  static readonly DELETE_SECTOR = "DELETE_SECTOR";

  static readonly READ_SUB_SECTOR = "READ_SUB_SECTOR";
  static readonly ADD_SUB_SECTOR = "ADD_SUB_SECTOR";
  static readonly EDIT_SUB_SECTOR = "EDIT_SUB_SECTOR";
  static readonly DELETE_SUB_SECTOR = "DELETE_SUB_SECTOR";

  static readonly READ_REF_STATUS = "READ_REF_STATUS";
  static readonly ADD_REF_STATUS = "ADD_REF_STATUS";
  static readonly EDIT_REF_STATUS = "EDIT_REF_STATUS";
  static readonly DELETE_REF_STATUS = "DELETE_REF_STATUS";

  static readonly READ_REF_STATUS_TYPE = "READ_REF_STATUS_TYPE";
  static readonly ADD_REF_STATUS_TYPE = "ADD_REF_STATUS_TYPE";
  static readonly EDIT_REF_STATUS_TYPE = "EDIT_REF_STATUS_TYPE";
  static readonly DELETE_REF_STATUS_TYPE = "DELETE_REF_STATUS_TYPE";

  static readonly READ_REF_INDICATOR = "READ_REF_INDICATOR";
  static readonly ADD_REF_INDICATOR = "ADD_REF_INDICATOR";
  static readonly EDIT_REF_INDICATOR = "EDIT_REF_INDICATOR";
  static readonly DELETE_REF_INDICATOR = "DELETE_REF_INDICATOR";



  static readonly READ_REF_TYPE_EXPENSE = "READ_REF_TYPE_EXPENSE";
  static readonly ADD_REF_TYPE_EXPENSE = "ADD_REF_TYPE_EXPENSE";
  static readonly EDIT_REF_TYPE_EXPENSE = "EDIT_REF_TYPE_EXPENSE";
  static readonly DELETE_REF_TYPE_EXPENSE = "DELETE_REF_TYPE_EXPENSE";

  static readonly READ_REF_TYPE_REQUETE = "READ_REF_TYPE_REQUETE";
  static readonly ADD_REF_TYPE_REQUETE = "ADD_REF_TYPE_REQUETE";
  static readonly EDIT_REF_TYPE_REQUETE = "EDIT_REF_TYPE_REQUETE";
  static readonly DELETE_REF_TYPE_REQUETE = "DELETE_REF_TYPE_REQUETE";

  static readonly READ_INDICATOR_TYPE = "READ_INDICATOR_TYPE";
  static readonly ADD_INDICATOR_TYPE = "ADD_INDICATOR_TYPE";
  static readonly EDIT_INDICATOR_TYPE = "EDIT_INDICATOR_TYPE";
  static readonly DELETE_INDICATOR_TYPE = "DELETE_INDICATOR_TYPE";

  static readonly READ_ASSIGNMENT_TYPE = "READ_ASSIGNMENT_TYPE";
  static readonly ADD_ASSIGNMENT_TYPE = "ADD_ASSIGNMENT_TYPE";
  static readonly EDIT_ASSIGNMENT_TYPE = "EDIT_ASSIGNMENT_TYPE";
  static readonly DELETE_ASSIGNMENT_TYPE = "DELETE_ASSIGNMENT_TYPE";

  static readonly READ_ROLE = "READ_ROLE";
  static readonly ADD_ROLE = "ADD_ROLE";
  static readonly EDIT_ROLE = "EDIT_ROLE";
  static readonly DELETE_ROLE = "DELETE_ROLE";

  static readonly READ_AXE_PSE = "READ_AXE_PSE";
  static readonly ADD_AXE_PSE = "ADD_AXE_PSE";
  static readonly EDIT_AXE_PSE = "EDIT_AXE_PSE";
  static readonly DELETE_AXE_PSE = "DELETE_AXE_PSE";

  static readonly READ_CATEGORY = "READ_CATEGORY";
  static readonly ADD_CATEGORY = "ADD_CATEGORY";
  static readonly EDIT_CATEGORY = "EDIT_CATEGORY";
  static readonly DELETE_CATEGORY = "DELETE_CATEGORY";

  static readonly READ_RESPONDENT = "READ_RESPONDENT";
  static readonly ADD_RESPONDENT = "ADD_RESPONDENT";
  static readonly EDIT_RESPONDENT = "EDIT_RESPONDENT";
  static readonly DELETE_RESPONDENT = "DELETE_RESPONDENT";

  // Templates
  static readonly READ_TEMPLATE = "READ_TEMPLATE";
  static readonly ADD_TEMPLATE = "ADD_TEMPLATE";
  static readonly EDIT_TEMPLATE = "EDIT_TEMPLATE";
  static readonly DELETE_TEMPLATE = "DELETE_TEMPLATE";

  static readonly READ_SOURCE = "READ_SOURCE";
  static readonly ADD_SOURCE = "ADD_SOURCE";
  static readonly EDIT_SOURCE = "EDIT_SOURCE";
  static readonly DELETE_SOURCE = "DELETE_SOURCE";

  static readonly READ_STRUCTURE = "READ_STRUCTURE";
  static readonly ADD_STRUCTURE = "ADD_STRUCTURE";
  static readonly EDIT_STRUCTURE = "EDIT_STRUCTURE";
  static readonly DELETE_STRUCTURE = "DELETE_STRUCTURE";
  static readonly IMPORT_STRUCTURE = "IMPORT_STRUCTURE";
  static readonly EXPORT_STRUCTURE = "EXPORT_STRUCTURE";

  static readonly READ_FUNDING_TYPE = "READ_FUNDING_TYPE";
  static readonly ADD_FUNDING_TYPE = "ADD_FUNDING_TYPE";
  static readonly EDIT_FUNDING_TYPE = "EDIT_FUNDING_TYPE";
  static readonly DELETE_FUNDING_TYPE = "DELETE_FUNDING_TYPE";

  static readonly READ_FUNDING     = "Consulter financement";
  static readonly ADD_FUNDING      = "Ajouter financement";
  static readonly EDIT_FUNDING     = "Modifier financement";
  static readonly DELETE_FUNDING   = "Supprimer financement";
  static readonly EXPORT_FUNDING   = "Exporter financement";
  static readonly IMPORT_FUNDING   = "Importer financement";
  static readonly DETAIL_FUNDING   = "Détail financement";
  static readonly READ_PROLONGATION   = "Consulter prolongation";
  static readonly ADD_PROLONGATION    = "Ajouter prolongation";
  static readonly EDIT_PROLONGATION   = "Modifier prolongation";
  static readonly DELETE_PROLONGATION = "Supprimer prolongation";


  static readonly READ_NATURE = "READ_NATURE";
  static readonly ADD_NATURE = "ADD_NATURE";
  static readonly EDIT_NATURE = "EDIT_NATURE";
  static readonly DELETE_NATURE = "DELETE_NATURE";

  static readonly READ_SPECIFIC_NATURE = "READ_SPECIFIC_NATURE";
  static readonly ADD_SPECIFIC_NATURE = "ADD_SPECIFIC_NATURE";
  static readonly EDIT_SPECIFIC_NATURE = "EDIT_SPECIFIC_NATURE";
  static readonly DELETE_SPECIFIC_NATURE = "DELETE_SPECIFIC_NATURE";

  static readonly READ_DOCUMENT_TYPE = "READ_DOCUMENT_TYPE";
  static readonly ADD_DOCUMENT_TYPE = "ADD_DOCUMENT_TYPE";
  static readonly EDIT_DOCUMENT_TYPE = "EDIT_DOCUMENT_TYPE";
  static readonly DELETE_DOCUMENT_TYPE = "DELETE_DOCUMENT_TYPE";

  static readonly ADD_PROMOTEUR = "ADD_PROMOTEUR";
  static readonly EDIT_PROMOTEUR = "EDIT_PROMOTEUR";
  static readonly DELETE_PROMOTEUR = "DELETE_PROMOTEUR";
  static readonly READ_PROMOTEUR = "READ_PROMOTEUR";

  static readonly ADD_ORDRE_MISSION_AGENT = "ADD_ORDRE_MISSION_AGENT";
  static readonly EDIT_ORDRE_MISSION_AGENT = "EDIT_ORDRE_MISSION_AGENT";
  static readonly DELETE_ORDRE_MISSION_AGENT = "DELETE_ORDRE_MISSION_AGENT";
  static readonly READ_ORDRE_MISSION_AGENT = "READ_ORDRE_MISSION_AGENT";

  static readonly READ_WORKFLOW_HISTORIQUE = "READ_WORKFLOW_HISTORIQUE";
  static readonly ADD_WORKFLOW_HISTORIQUE = "ADD_WORKFLOW_HISTORIQUE";
  static readonly EDIT_WORKFLOW_HISTORIQUE = "EDIT_WORKFLOW_HISTORIQUE";
  static readonly DELETE_WORKFLOW_HISTORIQUE = "DELETE_WORKFLOW_HISTORIQUE";

  // === CANDIDAT ===
  static readonly READ_CANDIDAT = "Consulter candidat";
  static readonly ADD_CANDIDAT = "Ajouter candidat";
  static readonly EDIT_CANDIDAT = "Modifier candidat";
  static readonly DELETE_CANDIDAT = "Supprimer candidat";

// === NOTATION (évaluation du candidat) ===
  static readonly READ_NOTATION = "Consulter notation";
  static readonly ADD_NOTATION = "Ajouter notation";
  static readonly EDIT_NOTATION = "Modifier notation";
  static readonly DELETE_NOTATION = "Supprimer notation";

  static readonly READ_DATES_IMPORTANTES   = "Consulter les dates importantes";
  static readonly ADD_DATES_IMPORTANTES    = "Ajouter une date importante";
  static readonly EDIT_DATES_IMPORTANTES   = "Modifier une date importante";
  static readonly DELETE_DATES_IMPORTANTES = "Supprimer une date importante";
  static readonly EXPORT_DATES_IMPORTANTES = "Exporter les dates importantes";
  static readonly IMPORT_DATES_IMPORTANTES = "Importer les dates importantes";

  // ===== GROUPES DE PERMISSIONS PAR MODULE =====
  static DASHBOARD = [
    Authority.ALL_ACCESS,
    Authority.READ_TDB_RESUME,
    Authority.READ_TDB_BUDGET,
    Authority.READ_TDB_PROJETS,
    Authority.READ_TDB_FINANCMENTS,
    Authority.READ_TDB_PROBLEMES,
    Authority.READ_TDB_ENTREPRISE,
    Authority.READ_TDB_SERVICE,
    Authority.READ_TDB_CONGE,
    Authority.READ_TDB_AGENT

  ];

  static AGENT = [
    Authority.ALL_ACCESS,
    Authority.ADD_AGENT,
    Authority.EDIT_AGENT,
    Authority.DELETE_AGENT,
    Authority.IMPORT_AGENT,
    Authority.EXPORT_AGENT,
    Authority.READ_FILE_AGENT

   ];

  static SERVICE_EXTERIEUR= [
    Authority.ALL_ACCESS,
    Authority.ADD_FORMATION_EXTERIEUR,
    Authority.EDIT_FORMATION_EXTERIEUR,
    Authority.DELETE_FORMATION_EXTERIEUR,
    Authority.READ_ATELIER,
    Authority.ADD_ATELIER,
    Authority.EDIT_ATELIER,
    Authority.DELETE_ATELIER,


  ];


  static PARTICIPANT = [
    Authority.READ_PARTICIPANT,
    Authority.ADD_PARTICIPANT,
    Authority.EDIT_PARTICIPANT,
    Authority.DELETE_PARTICIPANT,

  ];

  static EXPENSE_ACTIVITY = [
    Authority.READ_EXPENSE_ACTIVITY,
    Authority.ADD_EXPENSE_ACTIVITY,
    Authority.EDIT_EXPENSE_ACTIVITY,
    Authority.DELETE_EXPENSE_ACTIVITY,

  ];


  static DEMANDE_CONGE = [
    Authority.ALL_ACCESS,
    Authority.READ_CONGE,
    Authority.ADD_CONGE,
    Authority.EDIT_CONGE,
    Authority.DELETE_CONGE,
    Authority.VALIDATION_CONGE,
    Authority.GENERATE_FICHE_CONGE,
    Authority.GENERATE_DEMANDE_CONGE,
    Authority.GENERATE_DECISION_CONGE,
    Authority.GENERATE_BE_CONGE,
    Authority.READ_DOCUMENT_CONGE,
    Authority.READ_CESSATION_CONGE,
    Authority.ADD_CESSATION,
    Authority.EDIT_CESSATION,
    Authority.DELETE_CESSATION,
  ];


  static RECRUTEMENT = [
    Authority.READ_RECRUTEMENT,
    Authority.ADD_RECRUTEMENT,
    Authority.EDIT_RECRUTEMENT,
    Authority.DELETE_RECRUTEMENT,
    Authority.UPDATE_STATUT_RECRUTEMENT,
    Authority.IMPORT_RECRUTEMENT,
    Authority.READ_FILE_RECRUTEMENT,

  ];

  static SUB_CATEGORY = [
    Authority.READ_SUB_CATEGORY,
    Authority.ADD_SUB_CATEGORY,
    Authority.EDIT_SUB_CATEGORY,
    Authority.DELETE_SUB_CATEGORY,
  ];


  static PERIODICITY = [
    Authority.READ_PERIODICITY,
    Authority.ADD_PERIODICITY,
    Authority.EDIT_PERIODICITY,
    Authority.DELETE_PERIODICITY,
  ];

  static PARTNER_GROUP = [
    Authority.READ_PARTNER_GROUP,
    Authority.ADD_PARTNER_GROUP,
    Authority.EDIT_PARTNER_GROUP,
    Authority.DELETE_PARTNER_GROUP,
  ];

  static TAG = [
    Authority.READ_TAG,
    Authority.ADD_TAG,
    Authority.EDIT_TAG,
    Authority.DELETE_TAG,
  ];

  static PERIOD = [
    Authority.READ_PERIOD,
    Authority.ADD_PERIOD,
    Authority.EDIT_PERIOD,
    Authority.DELETE_PERIOD,
  ];

  static TEMPLATE = [
    Authority.READ_TEMPLATE,
    Authority.ADD_TEMPLATE,
    Authority.EDIT_TEMPLATE,
    Authority.DELETE_TEMPLATE,
  ];

  static UNIT = [
    Authority.READ_UNIT,
    Authority.ADD_UNIT,
    Authority.EDIT_UNIT,
    Authority.DELETE_UNIT,

  ];

  static CADRE_LOGIQUE_TYPE = [
    Authority.READ_CADRE_LOGIQUE_TYPE,
    Authority.ADD_CADRE_LOGIQUE_TYPE,
    Authority.EDIT_CADRE_LOGIQUE_TYPE,
    Authority.DELETE_CADRE_LOGIQUE_TYPE,
  ];

  static CADRE_LOGIQUE = [
    Authority.READ_CADRE_LOGIQUE,
    Authority.ADD_CADRE_LOGIQUE,
    Authority.EDIT_CADRE_LOGIQUE,
    Authority.DELETE_CADRE_LOGIQUE,
  ];

static COUNTRY = [
  Authority.READ_COUNTRY,
  Authority.ADD_COUNTRY,
  Authority.EDIT_COUNTRY,
  Authority.DELETE_COUNTRY,
];

static SECTOR=[
    Authority.READ_SECTOR,
    Authority.ADD_SECTOR,
    Authority.EDIT_SECTOR,
    Authority.DELETE_SECTOR,

]

  static SUB_SECTOR=[
      Authority.READ_SUB_SECTOR,
      Authority.ADD_SUB_SECTOR,
      Authority.EDIT_SUB_SECTOR,
      Authority.DELETE_SUB_SECTOR,

  ]



  static  STATUS_TYPE =[
      Authority.READ_REF_STATUS_TYPE,
      Authority.ADD_REF_STATUS_TYPE,
      Authority.EDIT_REF_STATUS_TYPE,
      Authority.DELETE_REF_STATUS_TYPE,

  ]

  static REF_INDICATOR=[
      Authority.READ_REF_INDICATOR,
      Authority.ADD_REF_INDICATOR,
      Authority.EDIT_REF_INDICATOR,
      Authority.DELETE_REF_INDICATOR,

  ]
static EXPENSE_TYPE =[
      Authority.READ_REF_TYPE_EXPENSE,
      Authority.ADD_REF_TYPE_EXPENSE,
      Authority.EDIT_REF_TYPE_EXPENSE,
      Authority.DELETE_REF_TYPE_EXPENSE,

]
static REQUETE_TYPE=[
      Authority.READ_REF_TYPE_REQUETE,
      Authority.ADD_REF_TYPE_REQUETE,
      Authority.EDIT_REF_TYPE_REQUETE,
      Authority.DELETE_REF_TYPE_REQUETE,

]
  static INDICATOR_TYPE=[
      Authority.READ_INDICATOR_TYPE,
      Authority.ADD_INDICATOR_TYPE,
      Authority.EDIT_INDICATOR_TYPE,
      Authority.DELETE_INDICATOR_TYPE,

  ]

static  ASSIGNMENT_TYPE=[
      Authority.READ_ASSIGNMENT_TYPE,
      Authority.ADD_ASSIGNMENT_TYPE,
      Authority.EDIT_ASSIGNMENT_TYPE,
      Authority.DELETE_ASSIGNMENT_TYPE,

]

static ROLE=[
      Authority.READ_ROLE,
      Authority.ADD_ROLE,
      Authority.EDIT_ROLE,
      Authority.DELETE_ROLE,

]

static  AXE_PSE=[
      Authority.READ_AXE_PSE,
      Authority.ADD_AXE_PSE,
      Authority.EDIT_AXE_PSE,
      Authority.DELETE_AXE_PSE,

]
static CATEGORY =[
      Authority.READ_CATEGORY,
      Authority.ADD_CATEGORY,
      Authority.EDIT_CATEGORY,
      Authority.DELETE_CATEGORY,

]

static SOURCE=[
      Authority.READ_SOURCE,
      Authority.ADD_SOURCE,
      Authority.EDIT_SOURCE,
      Authority.DELETE_SOURCE,

]

static STRUCTURE =[
      Authority.READ_STRUCTURE,
      Authority.ADD_STRUCTURE,
      Authority.EDIT_STRUCTURE,
      Authority.DELETE_STRUCTURE,
      Authority.IMPORT_STRUCTURE,
      Authority.EXPORT_STRUCTURE,
      Authority.READ_STRUCTURE

]


  static PLAN_COMPTABLE = [
    Authority.READ_PLAN_COMPTABLE,
    Authority.ADD_PLAN_COMPTABLE,
    Authority.EDIT_PLAN_COMPTABLE,
    Authority.DELETE_PLAN_COMPTABLE,
    Authority.READ_FILE_PLAN_COMPTABLE,
    Authority.EXPORT_PLAN_COMPTABLE,
    Authority.IMPORT_PLAN_COMPTABLE,

  ];


  // Projets
  static PROJECT_LIST = [
    Authority.READ_PROJECT,
    Authority.ADD_PROJECT,
    Authority.EDIT_PROJECT,
    Authority.DELETE_PROJECT,
    Authority.IMPORT_PROJECT,
    Authority.EXPORT_PROJECT,
    Authority.READ_PROJECT_PROGRESS_TRACKING,
    Authority.READ_PROJECT_ACTIVITY_MONITORING,
    Authority.READ_PROJECT_FINANCEMENT,
    Authority.READ_PROJECT_APPEL_OFFRE,
    Authority.READ_PROJECT_ESG,
    Authority.READ_PROJECT_TDB,
    Authority.READ_PROJECT_EENTREPRISE,
    Authority.READ_SUMMARY_SHEET,
    Authority.READ_DETAIL,
    Authority.READ_PROJECT_SETTINGS,
  ];
 static INDICATOR= [
    Authority.READ_INDICATOR,
    Authority.ADD_INDICATOR,
    Authority.EDIT_INDICATOR,
    Authority.DELETE_INDICATOR,
    Authority.EXPORT_INDICATOR,
    Authority.IMPORT_INDICATOR,
  ];

 static  FUNDING_EXECUTION = [
    Authority.ALL_ACCESS,
    Authority.READ_FUNDING_EXECUTION,
    Authority.ADD_FUNDING_EXECUTION,
    Authority.EDIT_FUNDING_EXECUTION,
    Authority.DELETE_FUNDING_EXECUTION,

  ];

 static FUNDING_NEED = [
    Authority.ALL_ACCESS,
    Authority.READ_FUNDING_NEED,
    Authority.ADD_FUNDING_NEED,
    Authority.EDIT_FUNDING_NEED,
    Authority.DELETE_FUNDING_NEED,

  ];
static  FUNDING_MOBILISATION = [
    Authority.ALL_ACCESS,
    Authority.READ_FUNDING_MOBILISATION,
    Authority.ADD_FUNDING_MOBILISATION,
    Authority.EDIT_FUNDING_MOBILISATION,
    Authority.DELETE_FUNDING_MOBILISATION,

  ];
static BUDGET_ACTIVITY = [
    Authority.ALL_ACCESS,
    Authority.READ_BUDGET_ACTIVITY,
    Authority.ADD_BUDGET_ACTIVITY,
    Authority.EDIT_BUDGET_ACTIVITY,
    Authority.DELETE_BUDGET_ACTIVITY,

  ];

static ETAPE_MISSION_ACTIVITY = [
    Authority.ALL_ACCESS,
    Authority.READ_ETAPE_MISSION_ACTIVITY,
    Authority.ADD_ETAPE_MISSION_ACTIVITY,
    Authority.EDIT_ETAPE_MISSION_ACTIVITY,
    Authority.DELETE_ETAPE_MISSION_ACTIVITY,

  ];


static PROGRESS_TRACKING_INDICATOR = [
    Authority.VALIDER_PROGRESS_TRACKING_INDICATOR,
    Authority.ADD_PROGRESS_TRACKING_INDICATOR,
    Authority.EDIT_PROGRESS_TRACKING_INDICATOR,
    Authority.DELETE_PROGRESS_TRACKING_INDICATOR,
    Authority.IMPORT_PROGRESS_TRACKING_INDICATOR,
    Authority.EXPORT_PROGRESS_TRACKING_INDICATOR,
    Authority.READ_FILE_PROGRESS_TRACKING_INDICATOR,
  ];


  static MILESTONE = [
    Authority.READ_MILESTONE,
    Authority.ADD_MILESTONE,
    Authority.EDIT_MILESTONE,
    Authority.DELETE_MILESTONE,
    Authority.IMPORT_MILESTONE,
    Authority.EXPORT_MILESTONE,
    Authority.READ_DATES_IMPORTANTES,
    Authority.ADD_DATES_IMPORTANTES,
    Authority.EDIT_DATES_IMPORTANTES,
    Authority.DELETE_DATES_IMPORTANTES,
    Authority.IMPORT_DATES_IMPORTANTES,
    Authority.EXPORT_DATES_IMPORTANTES,
  ];

 // PARAMÉTRAGE PROJETS =====
  static UGP = [
    // UGP
    Authority.READ_UGP,
    Authority.ADD_UGP,
    Authority.EDIT_UGP,
    Authority.DELETE_UGP,

  ];

  static  FUNDING_CONFIG = [
    Authority.ALL_ACCESS,
    Authority.READ_FUNDING_CONFIG,
    Authority.ADD_FUNDING_CONFIG,
    Authority.EDIT_FUNDING_CONFIG,
    Authority.DELETE_FUNDING_CONFIG,
    Authority.READ_FUNDING_NEED,
    Authority.ADD_FUNDING_NEED,
    Authority.EDIT_FUNDING_NEED,
    Authority.DELETE_FUNDING_NEED,

  ];

  static  INTERVENTION_AREA = [
    Authority.READ_INTERVENTION_AREA,
    Authority.ADD_INTERVENTION_AREA,
    Authority.DELETE_INTERVENTION_AREA,
    Authority.EXPORT_INTERVENTION_AREA,
    Authority.IMPORT_INTERVENTION_AREA,
  ];

  static SUPERVISION_EXECUTION_STRUCTURE = [
    Authority.READ_SUPERVISION_EXECUTION_STRUCTURE,
    Authority.ADD_SUPERVISION_EXECUTION_STRUCTURE,
    Authority.EDIT_SUPERVISION_EXECUTION_STRUCTURE,
    Authority.DELETE_SUPERVISION_EXECUTION_STRUCTURE,
    Authority.EXPORT_SUPERVISION_EXECUTION_STRUCTURE,
    Authority.IMPORT_SUPERVISION_EXECUTION_STRUCTURE,
  ];

  static PARTNER = [
    Authority.READ_PARTNER,
    Authority.ADD_PARTNER,
    Authority.EDIT_PARTNER,
    Authority.DELETE_PARTNER,
    Authority.EXPORT_PARTNER,
    Authority.IMPORT_PARTNER,
  ];
static REF_STATUS = [
  Authority.READ_REF_STATUS,
  Authority.ADD_REF_STATUS,
  Authority.EDIT_REF_STATUS,
  Authority.DELETE_REF_STATUS,

];

static  FUNDING = [
  Authority.ALL_ACCESS,
  Authority.READ_FUNDING,
  Authority.ADD_FUNDING,
  Authority.EDIT_FUNDING,
  Authority.DELETE_FUNDING,
  Authority.EXPORT_FUNDING,
  Authority.IMPORT_FUNDING,
  Authority.DETAIL_FUNDING,
  Authority.READ_PROLONGATION,
  Authority.ADD_PROLONGATION,
  Authority.EDIT_PROLONGATION,
  Authority.DELETE_PROLONGATION,
];

  // ===== COURRIERS =====

  static COURRIER = [
    Authority.READ_COURRIER,
    Authority.ADD_COURRIER,
    Authority.EDIT_COURRIER,
    Authority.DELETE_COURRIER,
    Authority.ARCHIVER_COURRIER,
    Authority.DESARCHIVER_COURRIER,
    Authority.CHANGER_STATUT_COURRIER,
    Authority.READ_STATISTIQUES,
    Authority.IMPORT_COURRIER,
    Authority.EXPORT_COURRIER,
    Authority.DOCUMENT_COURIER,
  ];

  static ACTOR = [
    Authority.READ_ACTOR,
    Authority.ADD_ACTOR,
    Authority.EDIT_ACTOR,
    Authority.DELETE_ACTOR,
    Authority.EXPORT_ACTOR,
    Authority.IMPORT_ACTOR,
  ];





  static FINANCIER = [
    Authority.READ_BUDGET,
    Authority.ADD_BUDGET,
    Authority.EDIT_BUDGET,
    Authority.DELETE_BUDGET,
    Authority.READ_PTBA,
    Authority.READ_FINANCEMENT_BUDGET,
  ];

static  DOCUMENT = [
    Authority.ALL_ACCESS,
    Authority.READ_DOCUMENT,
    Authority.ADD_DOCUMENT,
    Authority.EDIT_DOCUMENT,
    Authority.DELETE_DOCUMENT,


  ];

static NATURE=[
    Authority.READ_NATURE,
    Authority.ADD_NATURE,
    Authority.EDIT_NATURE,
    Authority.DELETE_NATURE,

];

  static USER = [
    Authority.ALL_ACCESS,
    Authority.READ_USER,
    Authority.ADD_USER,
    Authority.EDIT_USER,
    Authority.DELETE_USER,
    Authority.UPDATE_PASSWORD,
    Authority.UPDATE_MY_PASSWORD,
    Authority.GENERATE_AUTH_CODE,
    Authority.READ_TEMPORARY_CODE,
    Authority.UPDATE_TEMPORARY_CODE_STATUS
  ];

static  WORKFLOW=[
    Authority.ADD_WORKFLOW_HISTORIQUE,
    Authority.READ_WORKFLOW_HISTORIQUE,
    Authority.EDIT_WORKFLOW_HISTORIQUE,
    Authority.DELETE_WORKFLOW_HISTORIQUE,

];
static ORDRE_MISSION=[
    Authority.ADD_ORDRE_MISSION_AGENT,
    Authority.READ_ORDRE_MISSION_AGENT,
    Authority.EDIT_ORDRE_MISSION_AGENT,
    Authority.DELETE_ORDRE_MISSION_AGENT,
];

static JOURNAL=[
    Authority.READ_JOURNAL,

];

static PROMOTEUR=[
    Authority.READ_PROMOTEUR,
    Authority.ADD_PROMOTEUR,
    Authority.EDIT_PROMOTEUR,
    Authority.DELETE_PROMOTEUR,

];
static DOCUMENT_TYPE=[
    Authority.READ_DOCUMENT_TYPE,
    Authority.ADD_DOCUMENT_TYPE,
    Authority.EDIT_DOCUMENT_TYPE,
    Authority.DELETE_DOCUMENT_TYPE,

];

static SPECIFIC_NATURE=[
    Authority.READ_SPECIFIC_NATURE,
    Authority.ADD_SPECIFIC_NATURE,
    Authority.EDIT_SPECIFIC_NATURE,
    Authority.DELETE_SPECIFIC_NATURE,

];




  static ACTES_GESTION = [
    Authority.ALL_ACCESS,
    Authority.READ_AGENT,
    Authority.ADD_AGENT,
    Authority.EDIT_AGENT,
    Authority.DELETE_AGENT,
    Authority.IMPORT_AGENT,
    Authority.EXPORT_AGENT,
    Authority.READ_FILE_AGENT,
    Authority.READ_CONGE,
    Authority.ADD_CONGE,
    Authority.EDIT_CONGE,
    Authority.DELETE_CONGE,
    Authority.VALIDATION_CONGE,
    Authority.GENERATE_FICHE_CONGE,
    Authority.GENERATE_DEMANDE_CONGE,
    Authority.GENERATE_DECISION_CONGE,
    Authority.GENERATE_BE_CONGE,
    Authority.READ_DOCUMENT_CONGE,
    Authority.READ_CESSATION_CONGE,
    Authority.ADD_CESSATION,
    Authority.EDIT_CESSATION,
    Authority.DELETE_CESSATION,
    Authority.READ_FORMATION_EXTERIEUR,
    Authority.ADD_FORMATION_EXTERIEUR,
    Authority.EDIT_FORMATION_EXTERIEUR,
    Authority.DELETE_FORMATION_EXTERIEUR,
    Authority.READ_ATELIER,
    Authority.ADD_ATELIER,
    Authority.EDIT_ATELIER,
    Authority.DELETE_ATELIER,
    Authority.READ_RECRUTEMENT,
    Authority.ADD_RECRUTEMENT,
    Authority.EDIT_RECRUTEMENT,
    Authority.DELETE_RECRUTEMENT,
    Authority.UPDATE_STATUT_RECRUTEMENT,
    Authority.IMPORT_RECRUTEMENT,
    Authority.EXPORT_RECRUTEMENT,
    Authority.READ_FILE_RECRUTEMENT
  ];

  static GESTION_PROJETS = [
    Authority.ALL_ACCESS,
    Authority.READ_PROJECT,
    Authority.ADD_PROJECT,
    Authority.EDIT_PROJECT,
    Authority.DELETE_PROJECT,
    Authority.IMPORT_PROJECT,
    Authority.EXPORT_PROJECT,
    Authority.READ_PROJECT_PROGRESS_TRACKING,
    Authority.READ_PROJECT_ACTIVITY_MONITORING,
    Authority.READ_PROJECT_FINANCEMENT,
    Authority.READ_PROJECT_APPEL_OFFRE,
    Authority.READ_PROJECT_ESG,
    Authority.READ_PROJECT_TDB,
    Authority.READ_PROJECT_EENTREPRISE,
    Authority.READ_SUMMARY_SHEET,
    Authority.READ_DETAIL,
    Authority.READ_PROJECT_SETTINGS,
    Authority.READ_INDICATOR,
    Authority.ADD_INDICATOR,
    Authority.EDIT_INDICATOR,
    Authority.DELETE_INDICATOR,
    Authority.IMPORT_INDICATOR,
    Authority.EXPORT_INDICATOR,
    Authority.VALIDER_PROGRESS_TRACKING_INDICATOR,
    Authority.ADD_PROGRESS_TRACKING_INDICATOR,
    Authority.EDIT_PROGRESS_TRACKING_INDICATOR,
    Authority.DELETE_PROGRESS_TRACKING_INDICATOR,
    Authority.IMPORT_PROGRESS_TRACKING_INDICATOR,
    Authority.EXPORT_PROGRESS_TRACKING_INDICATOR,
    Authority.READ_FILE_PROGRESS_TRACKING_INDICATOR,
    Authority.READ_MILESTONE,
    Authority.ADD_MILESTONE,
    Authority.EDIT_MILESTONE,
    Authority.DELETE_MILESTONE,
    Authority.IMPORT_MILESTONE,
    Authority.EXPORT_MILESTONE
  ];

  static BUDGET = [
    Authority.ALL_ACCESS,

    // Réalisations
    Authority.READ_REALISATION,
    Authority.ADD_REALISATION,
    Authority.EDIT_REALISATION,
    Authority.DELETE_REALISATION,

    // Budget
    Authority.READ_BUDGET,
    Authority.ADD_BUDGET,
    Authority.EDIT_BUDGET,
    Authority.DELETE_BUDGET,
    Authority.READ_LIGNE_BUDGETAIRE,
    Authority.ADD_LIGNE_BUDGETAIRE,
    Authority.EDIT_LIGNE_BUDGETAIRE,
    Authority.DELETE_LIGNE_BUDGETAIRE,
    Authority.READ_FUNDING_SOURCE,
    Authority.ADD_FUNDING_SOURCE,
    Authority.EDIT_FUNDING_SOURCE,
    Authority.DELETE_FUNDING_SOURCE,
    Authority.READ_FOLDER,
    Authority.ADD_FOLDER,
    Authority.EDIT_FOLDER,
    Authority.DELETE_FOLDER,
    Authority.READ_PTBA ,
    Authority.READ_FINANCEMENT_BUDGET,
    Authority.SUIVIS_LIGNE_BUDGETAIRE
  ];

  static  CANDIDAT = [
    Authority.ALL_ACCESS,
    Authority.READ_CANDIDAT,
    Authority.ADD_CANDIDAT,
    Authority.EDIT_CANDIDAT,
    Authority.DELETE_CANDIDAT,
    Authority.READ_NOTATION,
    Authority.ADD_NOTATION,
    Authority.EDIT_NOTATION,
    Authority.DELETE_NOTATION,

  ];

  static GESTION_COURRIERS = [
    Authority.ALL_ACCESS,
    Authority.READ_COURRIER,
    Authority.ADD_COURRIER,
    Authority.EDIT_COURRIER,
    Authority.DELETE_COURRIER,
    Authority.ARCHIVER_COURRIER,
    Authority.DESARCHIVER_COURRIER,
    Authority.CHANGER_STATUT_COURRIER,
    Authority.READ_STATISTIQUES,
    Authority.IMPORT_COURRIER,
    Authority.EXPORT_COURRIER
  ];

  static GESTION_FINANCIERE = [
    Authority.ALL_ACCESS,
    Authority.READ_BUDGET,
    Authority.ADD_BUDGET,
    Authority.EDIT_BUDGET,
    Authority.DELETE_BUDGET
  ];

  static GESTION_DOCUMENTAIRE = [
    Authority.ALL_ACCESS,
    Authority.READ_DOCUMENT,
    Authority.READ_FILE_DOCUMENT,
    Authority.ADD_DOCUMENT,
    Authority.EDIT_DOCUMENT,
    Authority.DELETE_DOCUMENT,
    Authority.READ_FOLDER,
    Authority.ADD_FOLDER,
    Authority.EDIT_FOLDER,
    Authority.DELETE_FOLDER
  ];

  static ORGANIGRAMME = [
    Authority.ALL_ACCESS,
    Authority.READ_ORGANIGRAMME,
    Authority.ADD_ORGANIGRAMME,
    Authority.EDIT_ORGANIGRAMME,
    Authority.DELETE_ORGANIGRAMME,
    Authority.CONFIG_AGENT,
    Authority.READ_DIRECTION,
    Authority.ADD_DIRECTION,
    Authority.EDIT_DIRECTION,
    Authority.DELETE_DIRECTION
  ];

  static PARAMETRAGE = [
    Authority.ALL_ACCESS,
    Authority.READ_REFERENTIEL,
    Authority.ADD_REFERENTIEL,
    Authority.EDIT_REFERENTIEL,
    Authority.DELETE_REFERENTIEL,
    Authority.READ_FOURNISSEUR,
    Authority.ADD_FOURNISSEUR,
    Authority.EDIT_FOURNISSEUR,
    Authority.DELETE_FOURNISSEUR
  ];

  static SECURITE = [
    Authority.ALL_ACCESS,
    Authority.READ_ALERTE,
    Authority.ADD_ALERTE,
    Authority.EDIT_ALERTE,
    Authority.DELETE_ALERTE,
    Authority.READ_USER,
    Authority.ADD_USER,
    Authority.EDIT_USER,
    Authority.DELETE_USER,
    Authority.UPDATE_PASSWORD,
    Authority.UPDATE_MY_PASSWORD,
    Authority.GENERATE_AUTH_CODE,
    Authority.READ_TEMPORARY_CODE,
    Authority.UPDATE_TEMPORARY_CODE_STATUS,
    Authority.READ_PROFILE,
    Authority.ADD_PROFILE,
    Authority.EDIT_PROFILE,
    Authority.DELETE_PROFILE,
    Authority.CONFIGURE_PROFILE,
    Authority.READ_LOG
  ];



  // ===== STRUCTURE MODULAIRE DÉTAILLÉE =====
  static MODULE = {
    DASHBOARD: {
      DASHBOARD: [
        Authority.ALL_ACCESS,
        Authority.READ_TDB_RESUME,
        Authority.READ_TDB_BUDGET,
        Authority.READ_TDB_PROJETS,
        Authority.READ_TDB_FINANCMENTS,
        Authority.READ_TDB_PROBLEMES,
        Authority.READ_TDB_ENTREPRISE,
        Authority.READ_TDB_QUALITE_AIR,
        Authority.READ_TDB_EVALUATION,
        Authority.READ_TDB_POLLUTION,
        Authority.READ_TDB_ICPE,
        Authority.READ_TDB_SERVICE,
        Authority.READ_TDB_CONGE,
        Authority.READ_AGENT,
      ],
      RAPPORTS: [
        Authority.ALL_ACCESS,
        Authority.READ_RAPPORT,
        Authority.READ_RAPPORTS,
        Authority.READ_RAPPORT_FINANCEMENT,
        Authority.READ_RAPPORT_GESTION_CONTROLE,
        Authority.EXPORT_RAPPORT,
        Authority.GENERATE_RAPPORT
      ]
    },
    ACTES_GESTION: {
      AGENT: [
        Authority.ALL_ACCESS,
        Authority.READ_AGENT,
        Authority.ADD_AGENT,
        Authority.EDIT_AGENT,
        Authority.DELETE_AGENT,
        Authority.IMPORT_AGENT,
        Authority.EXPORT_AGENT,
        Authority.READ_FILE_AGENT,
      ],
      DEMANDE_CONGE: [
        Authority.ALL_ACCESS,
        Authority.READ_CONGE,
        Authority.ADD_CONGE,
        Authority.EDIT_CONGE,
        Authority.DELETE_CONGE,
        Authority.VALIDATION_CONGE,
        Authority.GENERATE_FICHE_CONGE,
        Authority.GENERATE_DEMANDE_CONGE,
        Authority.GENERATE_DECISION_CONGE,
        Authority.GENERATE_BE_CONGE,
        Authority.READ_DOCUMENT_CONGE,
        Authority.READ_CESSATION_CONGE,
        Authority.ADD_CESSATION,
        Authority.EDIT_CESSATION,
        Authority.DELETE_CESSATION
      ],

      SERVICE_EXTERIEUR: [
        Authority.ALL_ACCESS,
        Authority.READ_FORMATION_EXTERIEUR,
        Authority.ADD_FORMATION_EXTERIEUR,
        Authority.EDIT_FORMATION_EXTERIEUR,
        Authority.DELETE_FORMATION_EXTERIEUR,
        Authority.ALL_ACCESS,
        Authority.READ_ATELIER,
        Authority.ADD_ATELIER,
        Authority.EDIT_ATELIER,
        Authority.DELETE_ATELIER
      ],
      PARTICIPANT: [
        Authority.ALL_ACCESS,
        Authority.READ_PARTICIPANT,
        Authority.ADD_PARTICIPANT,
        Authority.EDIT_PARTICIPANT,
        Authority.DELETE_PARTICIPANT
      ],
      RECRUTEMENTS: [
        Authority.ALL_ACCESS,
        Authority.READ_RECRUTEMENT,
        Authority.ADD_RECRUTEMENT,
        Authority.EDIT_RECRUTEMENT,
        Authority.DELETE_RECRUTEMENT,
        Authority.UPDATE_STATUT_RECRUTEMENT,
        Authority.IMPORT_RECRUTEMENT,
        Authority.EXPORT_RECRUTEMENT,
        Authority.READ_FILE_RECRUTEMENT
      ],
      CANDIDAT: [
        Authority.ALL_ACCESS,
        Authority.READ_CANDIDAT,
        Authority.ADD_CANDIDAT,
        Authority.EDIT_CANDIDAT,
        Authority.DELETE_CANDIDAT,
        Authority.READ_NOTATION,
        Authority.ADD_NOTATION,
        Authority.EDIT_NOTATION,
        Authority.DELETE_NOTATION
      ],
      ORDRE_MISSION: [
        Authority.ALL_ACCESS,
        Authority.READ_ORDRE_MISSION_AGENT,
        Authority.ADD_ORDRE_MISSION_AGENT,
        Authority.EDIT_ORDRE_MISSION_AGENT,
        Authority.DELETE_ORDRE_MISSION_AGENT
      ]
    },

    PROJECT_LIST: {
      PROJECT_LIST: [
        Authority.ALL_ACCESS,
        Authority.READ_PROJECT,
        Authority.ADD_PROJECT,
        Authority.EDIT_PROJECT,
        Authority.DELETE_PROJECT,
        Authority.IMPORT_PROJECT,
        Authority.EXPORT_PROJECT,
        Authority.READ_PROJECT_PROGRESS_TRACKING,
        Authority.READ_PROJECT_ACTIVITY_MONITORING,
        Authority.READ_PROJECT_FINANCEMENT,
        Authority.READ_PROJECT_APPEL_OFFRE,
        Authority.READ_PROJECT_ESG,
        Authority.READ_PROJECT_TDB,
        Authority.READ_PROJECT_EENTREPRISE,
        Authority.READ_SUMMARY_SHEET,
        Authority.READ_DETAIL,
        Authority.READ_PROJECT_SETTINGS
      ],



      AVANCEMENT: [
        Authority.ALL_ACCESS,
        Authority.VALIDER_PROGRESS_TRACKING_INDICATOR,
        Authority.ADD_PROGRESS_TRACKING_INDICATOR,
        Authority.EDIT_PROGRESS_TRACKING_INDICATOR,
        Authority.DELETE_PROGRESS_TRACKING_INDICATOR,
        Authority.IMPORT_PROGRESS_TRACKING_INDICATOR,
        Authority.EXPORT_PROGRESS_TRACKING_INDICATOR,
        Authority.READ_FILE_PROGRESS_TRACKING_INDICATOR
      ],
      JALONS: [
        Authority.ALL_ACCESS,
        Authority.READ_MILESTONE,
        Authority.ADD_MILESTONE,
        Authority.EDIT_MILESTONE,
        Authority.DELETE_MILESTONE,
        Authority.IMPORT_MILESTONE,
        Authority.EXPORT_MILESTONE
      ]
    },
    GESTION_COURRIERS: {
      COURRIERS: [
        Authority.ALL_ACCESS,
        Authority.READ_COURRIER,
        Authority.ADD_COURRIER,
        Authority.EDIT_COURRIER,
        Authority.DELETE_COURRIER,
        Authority.ARCHIVER_COURRIER,
        Authority.DESARCHIVER_COURRIER,
        Authority.CHANGER_STATUT_COURRIER,
        Authority.READ_STATISTIQUES,
        Authority.IMPORT_COURRIER,
        Authority.EXPORT_COURRIER
      ]
    },
    GESTION_FINANCIERE: {
      BUDGETS: [
        Authority.ALL_ACCESS,
        Authority.READ_BUDGET,
        Authority.ADD_BUDGET,
        Authority.EDIT_BUDGET,
        Authority.DELETE_BUDGET,
        Authority.READ_PTBA,
        Authority.READ_FINANCEMENT_BUDGET,
        Authority.SUIVIS_LIGNE_BUDGETAIRE,
      ]
    },
    DOCUMENT: {
      DOCUMENT: [
        Authority.ALL_ACCESS,
        Authority.READ_DOCUMENT,
        Authority.READ_FILE_DOCUMENT,
        Authority.ADD_DOCUMENT,
        Authority.EDIT_DOCUMENT,
        Authority.DELETE_DOCUMENT
      ],
     /* FOLDERS: [
        Authority.ALL_ACCESS,
        Authority.READ_FOLDER,
        Authority.ADD_FOLDER,
        Authority.EDIT_FOLDER,
        Authority.DELETE_FOLDER
      ]*/
    },
    ORGANIGRAMME: {
      ORGANIGRAMME: [
        Authority.ALL_ACCESS,
        Authority.READ_ORGANIGRAMME,
        Authority.ADD_ORGANIGRAMME,
        Authority.EDIT_ORGANIGRAMME,
        Authority.DELETE_ORGANIGRAMME,
        Authority.CONFIG_AGENT
      ],
      DIRECTION: [
        Authority.ALL_ACCESS,
        Authority.READ_DIRECTION,
        Authority.ADD_DIRECTION,
        Authority.EDIT_DIRECTION,
        Authority.DELETE_DIRECTION
      ]
    },

    PARAMETRAGE: {
      REFERENTIELS: [
        Authority.ALL_ACCESS,
        Authority.READ_REFERENTIEL,
        Authority.ADD_REFERENTIEL,
        Authority.EDIT_REFERENTIEL,
        Authority.DELETE_REFERENTIEL
      ],
      FOURNISSEURS: [
        Authority.ALL_ACCESS,
        Authority.READ_FOURNISSEUR,
        Authority.ADD_FOURNISSEUR,
        Authority.EDIT_FOURNISSEUR,
        Authority.DELETE_FOURNISSEUR
      ],

       PROMOTEUR :[
          Authority.READ_PROMOTEUR,
          Authority.ADD_PROMOTEUR,
          Authority.EDIT_PROMOTEUR,
          Authority.DELETE_PROMOTEUR,

      ],

       CATEGORY :[
        Authority.READ_CATEGORY,
        Authority.ADD_CATEGORY,
        Authority.EDIT_CATEGORY,
        Authority.DELETE_CATEGORY,

      ],

      INDICATOR: [
        Authority.ALL_ACCESS,
        Authority.READ_INDICATOR,
        Authority.ADD_INDICATOR,
        Authority.EDIT_INDICATOR,
        Authority.DELETE_INDICATOR,
        Authority.IMPORT_INDICATOR,
        Authority.EXPORT_INDICATOR
      ],
      CADRE_LOGIQUE:[
        Authority.READ_CADRE_LOGIQUE,
        Authority.ADD_CADRE_LOGIQUE,
        Authority.EDIT_CADRE_LOGIQUE,
        Authority.DELETE_CADRE_LOGIQUE,
      ],
      ROLE:[
        Authority.READ_ROLE,
        Authority.ADD_ROLE,
        Authority.EDIT_ROLE,
        Authority.DELETE_ROLE,
      ],

      STRUCTURE :[
        Authority.READ_STRUCTURE,
        Authority.ADD_STRUCTURE,
        Authority.EDIT_STRUCTURE,
        Authority.DELETE_STRUCTURE,
        Authority.IMPORT_STRUCTURE,
        Authority.EXPORT_STRUCTURE,
        Authority.READ_STRUCTURE
      ],

      REF_STATUS :[
        Authority.READ_REF_STATUS,
        Authority.ADD_REF_STATUS,
        Authority.EDIT_REF_STATUS,
        Authority.DELETE_REF_STATUS,
      ],

      SUB_CATEGORY :[
        Authority.READ_SUB_CATEGORY,
        Authority.ADD_SUB_CATEGORY,
        Authority.EDIT_SUB_CATEGORY,
        Authority.DELETE_SUB_CATEGORY,
      ],

      SUB_SECTOR :[
        Authority.READ_SUB_SECTOR,
        Authority.ADD_SUB_SECTOR,
        Authority.EDIT_SUB_SECTOR,
        Authority.DELETE_SUB_SECTOR,
      ],

   PLAN_COMPTABLE :[
        Authority.READ_PLAN_COMPTABLE,
        Authority.ADD_PLAN_COMPTABLE,
        Authority.EDIT_PLAN_COMPTABLE,
        Authority.DELETE_PLAN_COMPTABLE,
        Authority.READ_FILE_PLAN_COMPTABLE,
        Authority.EXPORT_PLAN_COMPTABLE,
        Authority.IMPORT_PLAN_COMPTABLE,

      ],
      PERIODICITY : [
        Authority.READ_PERIODICITY,
        Authority.ADD_PERIODICITY,
        Authority.EDIT_PERIODICITY,
        Authority.DELETE_PERIODICITY,
      ],

    },
    SECURITE: {
      ALERTES: [
        Authority.ALL_ACCESS,
        Authority.READ_ALERTE,
        Authority.ADD_ALERTE,
        Authority.EDIT_ALERTE,
        Authority.DELETE_ALERTE
      ],



      USERS: [
        Authority.ALL_ACCESS,
        Authority.READ_USER,
        Authority.ADD_USER,
        Authority.EDIT_USER,
        Authority.DELETE_USER,
        Authority.UPDATE_PASSWORD,
        Authority.UPDATE_MY_PASSWORD,
        Authority.GENERATE_AUTH_CODE,
        Authority.READ_TEMPORARY_CODE,
        Authority.UPDATE_TEMPORARY_CODE_STATUS
      ],
      PROFILS: [
        Authority.ALL_ACCESS,
        Authority.READ_PROFILE,
        Authority.ADD_PROFILE,
        Authority.EDIT_PROFILE,
        Authority.DELETE_PROFILE,
        Authority.CONFIGURE_PROFILE
      ],

       WORKFLOW:[
        Authority.ADD_WORKFLOW_HISTORIQUE,
        Authority.READ_WORKFLOW_HISTORIQUE,
        Authority.EDIT_WORKFLOW_HISTORIQUE,
        Authority.DELETE_WORKFLOW_HISTORIQUE,

      ],



      JOURNAL: [
        Authority.ALL_ACCESS,
        Authority.READ_LOG
      ]
    },

  };

}
