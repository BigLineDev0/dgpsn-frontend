import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Demarche {
    id: number;
    title?: string;
    category?: string;
    shortDescription?: string;
    description?: string;
    image?: string;
    keyPoints?: string[];
    steps?: any[];
    faqs?: any[];
    documents?: any[];
    duration?: string;
    cost?: string;
    forms?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class DetailDemarcheService {

    private demarches: any[] = [
        // PROCÉDURES CIVILES
        {
            id: 1,
            title: "Demande d'extrait d'acte de naissance",
            category: 'Procédures Civiles',
            shortDescription: "Obtenez rapidement une copie officielle de votre acte de naissance",
            description: "La demande d’extrait d’acte de naissance est une étape administrative essentielle pour de nombreuses procédures officielles. Ce document permet de justifier à la fois votre identité et votre filiation, ce qui le rend indispensable auprès des administrations.\n" +
                "\n" +
                "Il est fréquemment requis pour des démarches importantes telles que le mariage, l’obtention d’une pièce d’identité (carte nationale d’identité ou passeport) ou encore l’inscription à certains concours. Il peut également être demandé dans le cadre d’une succession, d’une adoption ou d’une demande de naturalisation.\n" +
                "\n" +
                "La demande peut se faire en ligne, par courrier ou directement à la mairie du lieu de naissance. Selon les besoins, il est possible de demander un extrait avec ou sans filiation, chaque version ayant son utilité spécifique.\n" +
                "\n" +
                "En somme, l’extrait d’acte de naissance est un document clé qui accompagne chaque citoyen dans les moments importants de sa vie administrative.",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Document officiel délivré par le centre d'état civil",
                "Valable pour toutes les démarches administratives",
                "Disponible en version intégrale ou en extrait",
                "Peut être demandé par vous-même ou un parent proche"
            ],
            steps: [
                {
                    title: "Se présenter au centre d'état civil",
                    details: "Rendez-vous au centre d'état civil de votre lieu de naissance ou de résidence pendant les heures d'ouverture (généralement de 8h à 16h).",
                    requirements: ["Pièce d'identité valide"],
                    duration: "15-30 minutes",
                    tips: ["Évitez les heures de pointe (début de matinée et pause déjeuner)", "Vérifiez les horaires d'ouverture avant de vous déplacer"]
                },
                {
                    title: "Fournir les informations requises",
                    details: "Communiquez au préposé toutes les informations nécessaires concernant l'acte demandé (nom, prénoms, date et lieu de naissance, noms des parents).",
                    requirements: ["Ancien extrait si disponible", "Informations exactes des parents"],
                    duration: "10-15 minutes",
                    tips: ["Préparez les informations à l'avance", "Vérifiez l'orthographe des noms"]
                },
                {
                    title: "Payer les frais",
                    details: "Règlement des frais administratifs pour l'obtention de l'extrait.",
                    requirements: ["Montant exact de préférence"],
                    duration: "5-10 minutes",
                    tips: ["Prévoyez de la monnaie"]
                },
                {
                    title: "Récupérer l'extrait",
                    details: "Récupération du document après traitement de la demande.",
                    duration: "Variable selon le centre",
                    tips: ["Vérifiez les informations sur l'extrait avant de partir"]
                }
            ],
            faqs: [
                {
                    question: "Puis-je demander un extrait d'acte de naissance pour quelqu'un d'autre ?",
                    answer: "Oui, vous pouvez demander un extrait d'acte de naissance pour : vos ascendants directs (parents, grands-parents), vos descendants directs (enfants, petits-enfants), votre conjoint. Une procuration peut être nécessaire dans certains cas."
                },
                {
                    question: "Quelle est la durée de validité d'un extrait d'acte de naissance ?",
                    answer: "La durée de validité varie selon l'utilisation : 3 mois pour un passeport ou une carte d'identité, 6 mois pour un mariage. Certaines administrations peuvent accepter des extraits plus anciens."
                },
                {
                    question: "Puis-je faire la demande en ligne ?",
                    answer: "Oui, la demande en ligne est possible sur le portail e-services. Cependant, tous les centres d'état civil ne proposent pas encore ce service. Vérifiez la disponibilité pour votre lieu de naissance."
                },
                {
                    question: "Que faire en cas d'erreur sur l'acte de naissance ?",
                    answer: "En cas d'erreur, vous devez demander une rectification d'acte de naissance. La procédure se fait auprès du tribunal de grande instance de votre lieu de résidence. Des justificatifs seront nécessaires."
                }
            ],
            documents: [
                "Pièce d'identité valide",
                "Ancien extrait (si disponible)"
            ],
            duration: '1-2 jours ouvrables',
            cost: '500 FCFA',
            forms: ["Formulaire de demande d'extrait"]
        },
        {
            id: 2,
            title: "Déclaration de mariage",
            category: 'Procédures Civiles',
            shortDescription: "Enregistrez officiellement votre union civile auprès des autorités compétentes",
            description: "La déclaration de mariage est une étape légale indispensable pour officialiser l'union entre deux personnes. Cette procédure consiste à enregistrer le mariage civil auprès des autorités compétentes, généralement à la mairie du lieu de résidence des futurs époux.\n" +
                "\n" +
                "Le processus inclut plusieurs étapes importantes telles que la publication des bans, la constitution d’un dossier complet, et la cérémonie de mariage elle-même. Une fois le mariage célébré, les époux reçoivent un livret de famille qui atteste leur nouvelle situation matrimoniale.\n" +
                "\n" +
                "Cette démarche garantit aux époux les droits et obligations inhérents au mariage, tels que ceux liés au patrimoine commun, aux successions ou encore à la filiation.",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Officialisation légale de l'union",
                "Publication préalable des bans obligatoire",
                "Cérémonie devant un officier d'état civil",
                "Obtention du livret de famille après célébration",
                "Valable dans toutes les démarches administratives"
            ],
            steps: [
                {
                    title: "Publication des bans",
                    details: "Les bans doivent être publiés dans les communes de résidence des deux futurs époux pendant une durée de 21 jours avant la cérémonie.",
                    requirements: ["Copie d'acte de naissance des deux époux", "Certificat de résidence"],
                    duration: "21 jours",
                    tips: ["Vérifiez les délais avec la mairie concernée", "Assurez-vous que tous les documents sont à jour"]
                },
                {
                    title: "Constitution du dossier complet",
                    details: "Réunissez tous les documents nécessaires pour finaliser votre dossier de mariage.",
                    requirements: ["Copie d'acte de naissance des deux époux", "Certificat de résidence", "Certificat de visite médicale prénuptiale", "Pièces d'identité des témoins", "Photos d'identité"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Préparez les documents bien à l'avance", "Faites des copies supplémentaires des pièces justificatives"]
                },
                {
                    title: "Dépôt du dossier à la mairie",
                    details: "Rendez-vous à la mairie où doit se dérouler la cérémonie pour déposer votre dossier complet.",
                    requirements: ["Dossier constitué", "Formulaire de publication des bans rempli"],
                    duration: "30 minutes environ",
                    tips: ["Prenez rendez-vous à l'avance", "Assurez-vous que tous les documents sont conformes"]
                },
                {
                    title: "Cérémonie de mariage",
                    details: "Participez à la cérémonie officielle de mariage devant un officier d'état civil.",
                    requirements: ["Présence des témoins", "Tenue appropriée"],
                    duration: "30-45 minutes",
                    tips: ["Arrivez à l'heure", "Apportez vos documents d'identité"]
                },
                {
                    title: "Retrait du livret de famille",
                    details: "Une fois le mariage célébré, retirez votre livret de famille qui certifie votre union.",
                    duration: "Immédiatement après la cérémonie ou quelques jours plus tard",
                    tips: ["Vérifiez les informations sur le livret avant de quitter la mairie"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce que la publication des bans ?",
                    answer: "La publication des bans est une formalité obligatoire qui consiste à afficher publiquement l'intention de mariage des futurs époux pendant 21 jours afin de permettre toute opposition éventuelle."
                },
                {
                    question: "Pourquoi faut-il un certificat de visite médicale prénuptiale ?",
                    answer: "Ce certificat atteste que les futurs époux n'ont aucune maladie contagieuse ou incapacitante susceptible de compromettre le mariage."
                },
                {
                    question: "Puis-je me marier dans une autre commune que celle de ma résidence ?",
                    answer: "Oui, mais vous devez fournir un certificat de résidence de moins de trois mois délivré par la commune où vous résidez."
                },
                {
                    question: "Combien coûte un mariage civil ?",
                    answer: "Les frais varient selon les communes, mais ils incluent généralement les taxes liées à la publication des bans et à la célébration du mariage."
                }
            ],
            documents: [
                "Copie d'acte de naissance des deux époux",
                "Certificat de résidence",
                "Certificat de visite médicale prénuptiale",
                "Pièces d'identité des témoins",
                "Photos d'identité"
            ],
            duration: '1 mois',
            cost: '15 000 FCFA',
            forms: ["Formulaire de publication des bans", "Formulaire de déclaration de mariage"]
        },
        {
            id: 3,
            title: "Demande de certificat de décès",
            category: 'Procédures Civiles',
            shortDescription: "Obtenez un certificat de décès pour les formalités administratives nécessaires",
            description: "Le certificat de décès est un document officiel indispensable pour régulariser les formalités suite au décès d'une personne. Ce document permet notamment de clôturer les comptes bancaires, percevoir des pensions de réversion ou encore régler les questions liées à la succession.\n" +
                "\n" +
                "La demande doit être effectuée auprès du centre d'état civil du lieu où le décès s'est produit. Le processus est généralement simple et rapide, mais il est important de se munir des documents requis pour éviter tout retard dans la procédure.\n" +
                "\n" +
                "Ce certificat joue un rôle crucial dans toutes les démarches post-décès, garantissant ainsi une gestion fluide des affaires administratives liées au défunt.",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Document officiel délivré par l'état civil",
                "Nécessaire pour les démarches post-décès",
                "Valable pour toutes les administrations",
                "Délai de traitement rapide"
            ],
            steps: [
                {
                    title: "Se rendre au centre d'état civil du lieu de décès",
                    details: "Rendez-vous au centre d'état civil compétent pour déclarer le décès et obtenir le certificat.",
                    requirements: ["Certificat médical de décès", "Pièce d'identité du déclarant"],
                    duration: "Immédiatement après le décès (délai légal de 24h)",
                    tips: ["Privilégiez les horaires de grande disponibilité", "Vérifiez les pièces justificatives avant de vous déplacer"]
                },
                {
                    title: "Fournir les pièces justificatives",
                    details: "Présentez les documents requis pour valider la déclaration de décès.",
                    requirements: ["Certificat médical de décès", "Pièce d'identité du défunt (si disponible)", "Pièce d'identité du déclarant"],
                    duration: "10-15 minutes",
                    tips: ["Assurez-vous que tous les documents sont conformes", "Prévoyez des copies supplémentaires si nécessaire"]
                },
                {
                    title: "Payer les frais éventuels",
                    details: "Règlement des frais administratifs liés à la délivrance du certificat de décès.",
                    requirements: ["Montant exact si applicable"],
                    duration: "5 minutes",
                    tips: ["Les frais peuvent être gratuits dans certains cas", "Prévoyez de la monnaie si nécessaire"]
                },
                {
                    title: "Récupérer le certificat",
                    details: "Une fois la demande traitée, récupérez votre certificat de décès.",
                    duration: "Immédiatement ou sous 1 jour ouvrable",
                    tips: ["Vérifiez les informations sur le certificat avant de partir", "Demandez des copies supplémentaires si besoin"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut demander un certificat de décès ?",
                    answer: "Toute personne ayant un intérêt légitime peut demander un certificat de décès, notamment les proches parents ou les représentants légaux."
                },
                {
                    question: "Quelle est la durée de validité d'un certificat de décès ?",
                    answer: "Le certificat de décès n'a pas de date de péremption. Cependant, certaines administrations peuvent exiger un certificat récent pour les démarches spécifiques."
                },
                {
                    question: "Que faire si je perds le certificat de décès ?",
                    answer: "En cas de perte, vous pouvez demander une copie du certificat de décès auprès du même centre d'état civil qui l'a délivré initialement."
                },
                {
                    question: "Est-il obligatoire de fournir un certificat médical de décès ?",
                    answer: "Oui, le certificat médical de décès est obligatoire pour attester du décès et enregistrer l'événement auprès de l'état civil."
                }
            ],
            documents: [
                "Certificat médical de décès",
                "Pièce d'identité du défunt (si disponible)",
                "Pièce d'identité du déclarant"
            ],
            duration: '1 jour ouvrable',
            cost: 'Gratuit ou frais minimes',
            forms: ["Formulaire de déclaration de décès"]
        },
        {
            id: 4,
            title: "Demande de transcription d'acte de mariage",
            category: 'Procédures Civiles',
            shortDescription: "Inscrivez votre mariage célébré à l'étranger dans les registres d'état civil sénégalais",
            description: "La transcription d'un acte de mariage étranger dans les registres d'état civil sénégalais est une procédure obligatoire pour valider officiellement une union contractée hors du territoire national. <br><br> Cette démarche permet aux époux de bénéficier des droits liés au mariage selon la législation sénégalaise, tels que ceux relatifs à la nationalité, aux successions ou encore à la filiation. <br><br> Pour ce faire, il est nécessaire de constituer un dossier complet et de le soumettre au consulat sénégalais ou à l'état civil compétent. Une fois validé, le mariage sera inscrit dans les registres officiels, garantissant ainsi sa reconnaissance légale au Sénégal.",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Valide un mariage célébré à l'étranger",
                "Inscription dans les registres d'état civil sénégalais",
                "Nécessaire pour les démarches administratives au Sénégal",
                "Délai de traitement de 1 à 2 mois"
            ],
            steps: [
                {
                    title: "Constituer le dossier de demande",
                    details: "Réunissez tous les documents requis pour prouver la légalité de votre mariage et justifier votre identité et votre nationalité.",
                    requirements: ["Copie intégrale de l'acte de mariage étranger", "Pièces d'identité des époux", "Justificatif de nationalité sénégalaise", "Preuve de domicile"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Vérifiez que tous les documents sont traduits en français si nécessaire", "Faites des copies supplémentaires pour éviter les pertes"]
                },
                {
                    title: "Envoyer ou déposer le dossier au consulat ou à l'état civil compétent",
                    details: "Soumettez votre dossier complet soit par courrier, soit directement auprès du consulat sénégalais ou de l'état civil concerné.",
                    requirements: ["Dossier constitué", "Formulaire de demande de transcription rempli"],
                    duration: "Immédiatement après constitution du dossier",
                    tips: ["Privilégiez le dépôt en main propre pour plus de sécurité", "Conservez une copie de tout ce que vous envoyez"]
                },
                {
                    title: "Attendre la validation et la transcription",
                    details: "Une fois votre dossier reçu, attendez la validation de votre demande et la transcription de votre mariage dans les registres d'état civil sénégalais.",
                    duration: "1 à 2 mois",
                    tips: ["Patientez pendant le traitement de votre dossier", "Contactez le service concerné en cas de retard anormal"]
                }
            ],
            faqs: [
                {
                    question: "Pourquoi transcrire un mariage célébré à l'étranger ?",
                    answer: "La transcription est indispensable pour que votre mariage soit reconnu par les autorités sénégalaises et pour pouvoir effectuer certaines démarches comme l'obtention d'une carte d'identité commune ou une demande de nationalité."
                },
                {
                    question: "Quelle est la différence entre une transcription et une certification d'un acte de mariage ?",
                    answer: "La transcription inscrit définitivement l'acte dans les registres d'état civil sénégalais, tandis qu'une certification atteste simplement de la conformité de l'acte sans inscription dans les registres."
                },
                {
                    question: "Que se passe-t-il si mon acte de mariage n'est pas en français ?",
                    answer: "Vous devez faire traduire votre acte de mariage par un traducteur assermenté avant de le soumettre aux autorités compétentes."
                },
                {
                    question: "Puis-je demander la transcription pour un tiers ?",
                    answer: "Oui, mais vous devrez fournir une procuration signée par les époux ou un justificatif prouvant votre lien avec eux."
                }
            ],
            documents: [
                "Copie intégrale de l'acte de mariage étranger",
                "Pièces d'identité des époux",
                "Justificatif de nationalité sénégalaise",
                "Preuve de domicile"
            ],
            duration: '1 à 2 mois',
            cost: '10 000 FCFA',
            forms: ["Formulaire de demande de transcription"]
        },
        {
            id: 5,
            title: "Demande d'extrait d'acte de divorce",
            category: 'Procédures Civiles',
            shortDescription: "Obtenez une copie officielle du jugement de divorce prononcé",
            description: "<p>La demande d'extrait d'acte de divorce permet d'obtenir une copie officielle du jugement prononcé par le tribunal compétent. Ce document est essentiel pour justifier l'état civil des personnes divorcées et peut être requis dans diverses démarches administratives, telles que le remariage ou la modification du nom.</p><br><p>Cette procédure s'effectue auprès du greffe du tribunal ayant prononcé le divorce. Il est important de se munir des références exactes du jugement pour faciliter le traitement de la demande.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Document officiel délivré par le tribunal",
                "Justifie l'état civil après divorce",
                "Nécessaire pour certaines démarches administratives",
                "Délai de traitement court"
            ],
            steps: [
                {
                    title: "Se rendre au greffe du tribunal ayant prononcé le divorce",
                    details: "Rendez-vous au greffe du tribunal où le divorce a été prononcé pour initier votre demande d'extrait d'acte de divorce.",
                    requirements: ["Pièce d'identité", "Jugement original ou copie"],
                    duration: "Immédiatement après avoir obtenu les informations nécessaires",
                    tips: ["Privilégiez les horaires de grande disponibilité", "Vérifiez que vous avez toutes les informations requises"]
                },
                {
                    title: "Fournir les références du jugement",
                    details: "Communiquez les références précises du jugement de divorce (numéro, date, parties concernées) pour faciliter la recherche du dossier.",
                    requirements: ["Jugement original ou copie", "Informations complètes sur le jugement"],
                    duration: "10-15 minutes",
                    tips: ["Assurez-vous que les informations sont exactes", "Apportez une copie supplémentaire si disponible"]
                },
                {
                    title: "Payer les frais de délivrance",
                    details: "Effectuez le paiement des frais administratifs liés à la délivrance de l'extrait d'acte de divorce.",
                    requirements: ["Montant exact des frais", "Preuve de paiement"],
                    duration: "5 minutes",
                    tips: ["Prévoyez de la monnaie si nécessaire", "Conservez le reçu de paiement"]
                },
                {
                    title: "Récupérer l'extrait",
                    details: "Une fois la demande traitée, récupérez votre extrait d'acte de divorce auprès du greffe.",
                    duration: "1 semaine",
                    tips: ["Vérifiez les informations sur l'extrait avant de quitter le greffe", "Demandez des copies supplémentaires si besoin"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce qu'un extrait d'acte de divorce ?",
                    answer: "Un extrait d'acte de divorce est un document officiel qui atteste la dissolution du mariage par un jugement de divorce prononcé par un tribunal."
                },
                {
                    question: "Qui peut demander un extrait d'acte de divorce ?",
                    answer: "Les époux concernés par le divorce ou toute personne ayant un intérêt légitime peuvent demander un extrait d'acte de divorce, sous réserve de fournir les justificatifs nécessaires."
                },
                {
                    question: "Combien de temps faut-il pour obtenir un extrait d'acte de divorce ?",
                    answer: "Le délai de traitement est généralement d'environ une semaine, mais il peut varier selon la charge de travail du greffe."
                },
                {
                    question: "Que faire si je perds mon extrait d'acte de divorce ?",
                    answer: "En cas de perte, vous pouvez demander une nouvelle copie auprès du même tribunal qui a prononcé le divorce."
                }
            ],
            documents: [
                "Pièce d'identité",
                "Jugement original ou copie",
                "Preuve de paiement des frais"
            ],
            duration: '1 semaine',
            cost: '5 000 FCFA',
            forms: ["Demande de copie de jugement"]
        },
        {
            id: 6,
            title: "Procédure de changement de nom ou de prénom",
            category: 'Procédures Civiles',
            shortDescription: "Obtenez l'autorisation légale pour changer de nom ou de prénom",
            description: "<p>Le changement de nom ou de prénom est une procédure juridique qui permet de modifier officiellement votre identité civile. Cette démarche nécessite une requête motivée déposée devant un tribunal compétent, accompagnée de justificatifs solides et d'une audience avec un juge.</p><br><p>Les motifs du changement doivent être sérieux et légitimes, tels que des raisons personnelles, professionnelles ou liées à des discriminations. Une fois approuvée, la décision doit être publiée conformément à la loi pour entrer en vigueur.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Modification légale de l'identité civile",
                "Requête motivée auprès du tribunal",
                "Motifs sérieux requis",
                "Publication obligatoire de la décision"
            ],
            steps: [
                {
                    title: "Rédiger une requête motivée au tribunal",
                    details: "Préparez une requête écrite exposant vos motifs pour demander le changement de nom ou de prénom. Expliquez clairement les raisons qui justifient cette demande.",
                    requirements: ["Requête détaillée", "Acte de naissance", "Justificatif d'identité"],
                    duration: "Variable selon la complexité de la requête",
                    tips: ["Soignez la présentation de votre requête", "Fournissez des exemples concrets pour appuyer vos arguments"]
                },
                {
                    title: "Fournir les documents justificatifs",
                    details: "Réunissez tous les documents nécessaires pour étayer votre demande, notamment ceux prouvant l'opportunité et la nécessité du changement de nom ou de prénom.",
                    requirements: ["Acte de naissance", "Justificatif d'identité", "Tous autres documents pertinents liés aux motifs"],
                    duration: "Avant le dépôt de la requête",
                    tips: ["Vérifiez que tous les documents sont à jour", "Prévoyez des copies supplémentaires si nécessaire"]
                },
                {
                    title: "Passage devant le juge",
                    details: "Vous serez convoqué(e) pour une audience devant le juge, qui évaluera la légitimité de votre demande et décidera si elle peut être acceptée.",
                    requirements: ["Présence obligatoire à l'audience", "Documents soumis lors du dépôt"],
                    duration: "Selon la disponibilité du tribunal (quelques semaines après le dépôt)",
                    tips: ["Préparez-vous à expliquer vos motivations", "Respectez les règles de bienséance lors de l'audience"]
                },
                {
                    title: "Publication de la décision",
                    details: "Si votre demande est approuvée, la décision sera publiée conformément à la loi pour officialiser le changement de nom ou de prénom.",
                    duration: "Après validation par le juge",
                    tips: ["Suivez les instructions du tribunal pour la publication", "Conservez précieusement la copie de la décision"]
                }
            ],
            faqs: [
                {
                    question: "Quels sont les motifs acceptés pour un changement de nom ou de prénom ?",
                    answer: "Les motifs peuvent inclure des raisons personnelles (difficultés dans la vie sociale), professionnelles (carrière artistique ou professionnelle), ou encore des cas de discrimination ou de harcèlement."
                },
                {
                    question: "Combien coûte une procédure de changement de nom ?",
                    answer: "Les frais varient selon les tribunaux et peuvent inclure des frais de justice ainsi que des coûts liés à la publication de la décision. Il est recommandé de consulter le tribunal concerné pour connaître les tarifs exacts."
                },
                {
                    question: "Puis-je changer uniquement de prénom ou dois-je aussi changer de nom ?",
                    answer: "Il est possible de demander le changement de prénom seul, sans modifier le nom de famille, à condition de fournir des motifs valables."
                },
                {
                    question: "Que faire si ma demande est rejetée ?",
                    answer: "En cas de rejet, vous pouvez interjeter appel de la décision devant une juridiction supérieure ou formuler une nouvelle requête avec des arguments renforcés."
                }
            ],
            documents: [
                "Acte de naissance",
                "Justificatif d'identité",
                "Motifs sérieux du changement de nom"
            ],
            duration: '3-6 mois',
            cost: 'Variable (frais de justice)',
            forms: ["Requête de changement de nom"]
        },
        {
            id: 7,
            title: "Demande de reconnaissance d'enfant",
            category: 'Procédures Civiles',
            shortDescription: "Reconnaître officiellement un enfant né hors mariage",
            description: "<p>La reconnaissance d'un enfant est une démarche légale permettant à un parent de reconnaître officiellement un enfant né hors mariage. Cette procédure établit un lien légal entre le parent et l'enfant, lui accordant ainsi des droits familiaux et patrimoniaux.</p><br><p>La reconnaissance peut être effectuée avant ou après la naissance de l'enfant, auprès du centre d'état civil compétent. Elle est gratuite et nécessite la présentation de quelques documents pour valider la demande.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Établissement d'un lien parental légal",
                "Procédure gratuite et rapide",
                "Nécessaire pour les droits de l'enfant",
                "Peut être faite avant ou après la naissance"
            ],
            steps: [
                {
                    title: "Se présenter au centre d'état civil",
                    details: "Rendez-vous au centre d'état civil compétent (lieu de naissance de l'enfant ou résidence du parent) pour entamer la procédure de reconnaissance.",
                    requirements: ["Pièce d'identité du déclarant", "Acte de naissance de l'enfant (si déjà disponible)"],
                    duration: "Immédiatement après la décision de reconnaissance",
                    tips: ["Privilégiez les horaires moins chargés", "Vérifiez les pièces justificatives avant de vous déplacer"]
                },
                {
                    title: "Signer l'acte de reconnaissance",
                    details: "Signez l'acte de reconnaissance en présence d'un officier d'état civil. Cet acte officialise le lien parental entre le parent et l'enfant.",
                    requirements: ["Formulaire de reconnaissance d'enfant rempli", "Documents d'identité"],
                    duration: "10-15 minutes",
                    tips: ["Prenez le temps de lire attentivement l'acte avant de signer", "Conservez une copie de l'acte signé"]
                },
                {
                    title: "Fournir les pièces justificatives",
                    details: "Soumettez les documents requis pour compléter la procédure, tels que la pièce d'identité du parent et l'acte de naissance de l'enfant si disponible.",
                    requirements: ["Pièce d'identité du déclarant", "Acte de naissance de l'enfant", "Preuve de lien parental (le cas échéant)"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Assurez-vous que tous les documents sont à jour", "Prévoyez des copies supplémentaires si nécessaire"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce qu'une reconnaissance d'enfant ?",
                    answer: "La reconnaissance d'enfant est une démarche juridique par laquelle un parent accepte officiellement être le père ou la mère d'un enfant né hors mariage, établissant ainsi un lien légal entre eux."
                },
                {
                    question: "Puis-je reconnaître mon enfant après sa naissance ?",
                    answer: "Oui, la reconnaissance peut être effectuée avant ou après la naissance de l'enfant. Si elle est faite après, elle se fait auprès du centre d'état civil du lieu de naissance ou de résidence du parent."
                },
                {
                    question: "Est-il obligatoire de reconnaître un enfant ?",
                    answer: "Non, ce n'est pas obligatoire, mais cela permet d'établir un lien légal avec l'enfant et d'assurer ses droits familiaux et patrimoniaux."
                },
                {
                    question: "Que faire si je ne sais pas où me rendre pour la reconnaissance ?",
                    answer: "Contactez le centre d'état civil le plus proche ou le consulat sénégalais si vous êtes à l'étranger. Ils pourront vous orienter vers le service compétent."
                }
            ],
            documents: [
                "Pièce d'identité du déclarant",
                "Acte de naissance de l'enfant",
                "Preuve de lien parental (le cas échéant)"
            ],
            duration: '1 jour ouvrable',
            cost: 'Gratuit',
            forms: ["Formulaire de reconnaissance d'enfant"]
        },
        {
            id: 8,
            title: "Procédure d'adoption",
            category: 'Procédures Civiles',
            shortDescription: "Adoptez légalement un enfant au Sénégal en suivant les étapes officielles",
            description: "<p>L'adoption est une procédure juridique permettant à une personne ou un couple de devenir les parents légaux d'un enfant, conférant ainsi tous les droits et obligations inhérents à cette relation parentale.</p><br><p>La procédure d'adoption au Sénégal est encadrée par des règles strictes visant à protéger l'intérêt supérieur de l'enfant. Elle implique plusieurs étapes, notamment la constitution d'un dossier complet, une enquête sociale et une audience devant le juge des affaires familiales pour valider l'adoption.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Procédure encadrée par la loi",
                "Protège l'intérêt supérieur de l'enfant",
                "Enquête sociale obligatoire",
                "Validation par un juge des affaires familiales"
            ],
            steps: [
                {
                    title: "Constituer le dossier d'adoption",
                    details: "Réunissez tous les documents nécessaires pour prouver votre capacité à adopter un enfant, incluant vos pièces d'identité, ainsi que toute information relative à l'enfant concerné.",
                    requirements: ["Acte de naissance de l'enfant", "Pièces d'identité des adoptants", "Consentement des parents biologiques (le cas échéant)"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Commencez à rassembler les documents dès que possible", "Vérifiez que tous les papiers sont à jour"]
                },
                {
                    title: "Passage devant le juge des affaires familiales",
                    details: "Présentez-vous avec votre dossier complet devant le juge des affaires familiales, qui examinera votre demande et décidera si l'adoption est conforme à l'intérêt de l'enfant.",
                    requirements: ["Dossier constitué", "Rapport d'enquête sociale"],
                    duration: "Plusieurs semaines après le dépôt du dossier",
                    tips: ["Préparez-vous à expliquer vos motivations", "Soyez patient·e face aux délais administratifs"]
                },
                {
                    title: "Validation et transcription de l'adoption",
                    details: "Si votre demande est approuvée, l'adoption sera validée par le juge et transmise à l'état civil pour inscription dans les registres officiels, officialisant ainsi la nouvelle filiation.",
                    duration: "Après décision favorable du juge",
                    tips: ["Conservez précieusement les documents reçus", "Contactez l'état civil pour vérifier l'avancement de la transcription"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut adopter un enfant au Sénégal ?",
                    answer: "L'adoption peut être demandée par une personne seule ou un couple marié, sous réserve de remplir certaines conditions légales, telles qu'une différence d'âge minimale avec l'enfant et une stabilité financière et psychologique."
                },
                {
                    question: "Quelle est l'importance de l'enquête sociale ?",
                    answer: "L'enquête sociale vise à évaluer la capacité des adoptants à assurer le bien-être de l'enfant, en analysant leur environnement familial, financier et émotionnel."
                },
                {
                    question: "Que faire si les parents biologiques refusent de consentir à l'adoption ?",
                    answer: "Dans certains cas, le juge peut autoriser l'adoption sans consentement des parents biologiques si cela est jugé dans l'intérêt supérieur de l'enfant."
                },
                {
                    question: "Combien coûte une procédure d'adoption ?",
                    answer: "Les frais varient en fonction des démarches spécifiques (enquête sociale, honoraires d'avocat, etc.), mais ils peuvent inclure des frais judiciaires et administratifs. Il est recommandé de consulter un professionnel pour une estimation précise."
                }
            ],
            documents: [
                "Acte de naissance de l'enfant",
                "Pièces d'identité des adoptants",
                "Enquête sociale",
                "Consentement des parents biologiques (le cas échéant)"
            ],
            duration: '6-12 mois',
            cost: 'Variable',
            forms: ["Demande d'adoption"]
        },
// AFFAIRES COMMERCIALES
        {
            id: 9,
            title: "Création d'entreprise",
            category: "Affaires Commerciales",
            shortDescription: "Immatriculez votre nouvelle entreprise au registre du commerce",
            description: "<p>La création d'une entreprise est une procédure structurée qui permet d'immatriculer officiellement votre activité au Registre du Commerce et du Crédit des Entreprises (RCCE). Cette démarche confère à votre entreprise une existence légale, vous permettant ainsi de commencer vos activités dans les règles.</p><br><p>Le processus inclut plusieurs étapes clés, telles que la réservation du nom commercial, l'établissement des statuts, le dépôt du capital social et l'enregistrement fiscal. Le choix de la forme juridique détermine également les formalités spécifiques à accomplir.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Immatriculation obligatoire pour toute activité commerciale",
                "Procédure encadrée par le RCCE",
                "Coût variable selon la forme juridique choisie",
                "Délai de traitement rapide"
            ],
            steps: [
                {
                    title: "Réservation du nom commercial",
                    details: "Choisissez un nom unique pour votre entreprise et vérifiez sa disponibilité auprès du Registre du Commerce. Cette étape garantit que votre nom ne sera pas utilisé par une autre entité.",
                    requirements: ["Formulaire de demande de réservation de nom", "Pièces d'identité des associés"],
                    duration: "1-2 jours ouvrables",
                    tips: ["Préparez plusieurs options de noms", "Assurez-vous que le nom respecte les règles en vigueur"]
                },
                {
                    title: "Établissement des statuts",
                    details: "Rédigez les statuts de votre entreprise, qui définissent notamment son objet social, son siège, son capital social et ses organes de gestion. Ces documents sont essentiels pour valider votre structure.",
                    requirements: ["Modèle de statuts adaptés à votre forme juridique", "Signature des associés"],
                    duration: "Variable selon la complexité de la structure",
                    tips: ["Consultez un expert-comptable ou un avocat si nécessaire", "Vérifiez que tous les champs obligatoires sont remplis"]
                },
                {
                    title: "Dépôt du capital social",
                    details: "Versement du capital social requis pour votre entreprise auprès d'une banque agréée. Une attestation de dépôt vous sera délivrée pour prouver cette opération.",
                    requirements: ["Montant minimum légal du capital", "Compte bancaire ouvert"],
                    duration: "Immédiatement après ouverture du compte",
                    tips: ["Privilégiez une banque proche de votre siège social", "Conservez précieusement l'attestation de dépôt"]
                },
                {
                    title: "Enregistrement fiscal",
                    details: "Effectuez les démarches nécessaires pour enregistrer votre entreprise auprès des services fiscaux. Vous obtiendrez un numéro d'immatriculation fiscale indispensable pour vos transactions futures.",
                    requirements: ["Statuts de l'entreprise", "Justificatif de domiciliation", "Pièces d'identité des associés"],
                    duration: "2-3 jours ouvrables",
                    tips: ["Préparez toutes les informations financières requises", "Suivez attentivement les instructions des services fiscaux"]
                },
                {
                    title: "Immatriculation au registre du commerce",
                    details: "Soumettez votre dossier complet au Registre du Commerce pour finaliser l'immatriculation de votre entreprise. Une fois validée, vous recevrez un extrait Kbis attestant de votre inscription.",
                    requirements: ["Formulaire M1 rempli", "Tous les documents précédemment obtenus"],
                    duration: "2-5 jours ouvrables",
                    tips: ["Vérifiez que tous les documents sont conformes avant dépôt", "Conservez une copie de chaque document soumis"]
                }
            ],
            faqs: [
                {
                    question: "Quelle est la différence entre une micro-entreprise et une SARL ?",
                    answer: "Une micro-entreprise est une structure simplifiée avec peu de formalités, tandis qu'une SARL (Société à Responsabilité Limitée) offre une protection juridique plus robuste mais nécessite davantage de démarches administratives."
                },
                {
                    question: "Combien coûte la création d'une entreprise ?",
                    answer: "Les coûts varient selon la forme juridique choisie, allant de 25 000 FCFA pour une micro-entreprise à 150 000 FCFA pour une SARL ou une société plus complexe."
                },
                {
                    question: "Est-il obligatoire de faire appel à un expert-comptable ?",
                    answer: "Non, il n'est pas obligatoire, mais un expert-comptable peut vous accompagner dans les démarches complexes et vous conseiller sur les meilleures options pour votre entreprise."
                },
                {
                    question: "Que faire si mon nom commercial est déjà pris ?",
                    answer: "Si le nom que vous souhaitez est déjà enregistré, vous devrez en choisir un autre. Il est recommandé de préparer plusieurs options dès le départ."
                }
            ],
            documents: [
                "Pièces d'identité des associés",
                "Justificatif de domiciliation",
                "Statuts de l'entreprise",
                "Attestation de dépôt du capital",
                "Contrat de bail commercial"
            ],
            duration: "7-14 jours",
            cost: "25 000 - 150 000 FCFA selon la forme juridique",
            forms: ["Formulaire M1 - Création d'entreprise", "Formulaire TNS - Déclaration sociale"]
        },
        {
            id: 10,
            title: "Modification des statuts d'une entreprise",
            category: "Affaires Commerciales",
            shortDescription: "Mettriez à jour les statuts de votre société suite à un changement (gérant, adresse, activité, etc.)",
            description: "<p>La modification des statuts d'une entreprise est une procédure juridique obligatoire lorsqu'il y a un changement significatif dans la structure ou l'activité de la société. Cela peut inclure un changement de gérant, d'adresse, d'objet social, ou encore une augmentation du capital social.</p><br><p>Le processus implique plusieurs étapes, notamment la tenue d'une assemblée générale pour valider les modifications, la mise à jour des statuts et leur enregistrement auprès du greffe du tribunal de commerce. Une publication dans un journal d'annonces légales est également requise pour officialiser les changements.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Procédure obligatoire pour tout changement majeur",
                "Enregistrement au greffe du tribunal de commerce",
                "Publication dans un journal d'annonces légales",
                "Délai de traitement court"
            ],
            steps: [
                {
                    title: "Rédiger le procès-verbal de l'assemblée générale",
                    details: "Organisez une assemblée générale pour discuter et valider les modifications souhaitées. Rédigez ensuite un procès-verbal détaillant les décisions prises par les associés.",
                    requirements: ["Présence des associés ou représentants", "Ordre du jour précis"],
                    duration: "Immédiatement après la décision de modification",
                    tips: ["Assurez-vous que tous les associés soient informés", "Conservez une copie du procès-verbal signé"]
                },
                {
                    title: "Mettre à jour les statuts",
                    details: "Adaptez les statuts de votre entreprise pour refléter les nouvelles informations approuvées lors de l'assemblée générale. Ces modifications doivent être clairement identifiées.",
                    requirements: ["Statuts actuels", "Procès-verbal validé"],
                    duration: "Variable selon la complexité des modifications",
                    tips: ["Faites appel à un expert-comptable ou avocat si nécessaire", "Vérifiez que toutes les modifications sont conformes à la loi"]
                },
                {
                    title: "Enregistrer la modification au greffe du tribunal de commerce",
                    details: "Soumettez votre dossier complet, incluant le procès-verbal et les statuts mis à jour, au greffe du tribunal de commerce compétent pour enregistrer officiellement les modifications.",
                    requirements: ["Procès-verbal de l'assemblée générale", "Statuts mis à jour", "Formulaire M2 rempli"],
                    duration: "2-3 jours ouvrables",
                    tips: ["Vérifiez que tous les documents sont conformes avant dépôt", "Prévoyez les frais d'enregistrement"]
                },
                {
                    title: "Publier un avis de modification dans un journal d'annonces légales",
                    details: "Pour rendre les modifications publiques, publiez un avis dans un journal habilité à recevoir les annonces légales. Cette étape est obligatoire pour valider les changements apportés aux statuts.",
                    requirements: ["Texte de l'avis conforme aux normes légales", "Paiement des frais de publication"],
                    duration: "Immédiatement après validation par le greffe",
                    tips: ["Choisissez un journal reconnu par les autorités", "Conservez une preuve de publication"]
                }
            ],
            faqs: [
                {
                    question: "Quels types de modifications nécessitent une mise à jour des statuts ?",
                    answer: "Les principaux cas incluent un changement de gérant, d'adresse sociale, d'objet social, d'augmentation ou diminution du capital, ou encore une transformation de la forme juridique."
                },
                {
                    question: "Combien coûte la modification des statuts d'une entreprise ?",
                    answer: "Les coûts varient entre 20 000 et 50 000 FCFA, incluant les frais d'enregistrement et de publication dans un journal d'annonces légales."
                },
                {
                    question: "Est-il obligatoire de publier un avis dans un journal d'annonces légales ?",
                    answer: "Oui, cette publication est obligatoire pour rendre les modifications officielles et accessibles au public."
                },
                {
                    question: "Que faire si je ne respecte pas les délais pour modifier mes statuts ?",
                    answer: "Le non-respect des formalités peut entraîner des sanctions administratives ou pénales. Il est donc crucial de finaliser les démarches rapidement."
                }
            ],
            documents: [
                "Procès-verbal de l'assemblée générale",
                "Statuts mis à jour",
                "Justificatif de domiciliation",
                "Formulaire de modification"
            ],
            duration: "7-10 jours",
            cost: "20 000 - 50 000 FCFA",
            forms: ["Formulaire M2 - Modification d'entreprise"]
        },
        {
            id: 11,
            title: "Radiation d'une entreprise",
            category: "Affaires Commerciales",
            shortDescription: "Clôturez définitivement votre entreprise et radiez-la du registre du commerce",
            description: "<p>La radiation d'une entreprise est une procédure légale permettant de fermer définitivement une société et de la retirer du registre du commerce. Cette démarche est obligatoire lorsque l'entreprise cesse ses activités, qu'elle soit dissoute volontairement ou contrainte par des circonstances telles que la faillite.</p><br><p>Le processus inclut plusieurs étapes clés : prise de décision lors d'une assemblée générale extraordinaire, liquidation des actifs et passifs, dépôt du dossier de radiation au greffe du tribunal de commerce, et publication de la radiation dans un journal d'annonces légales.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Clôture définitive de l'activité commerciale",
                "Procédure obligatoire pour toute cessation d'activité",
                "Publication dans un journal d'annonces légales requise",
                "Délai de traitement d'environ 1 mois"
            ],
            steps: [
                {
                    title: "Décision de dissolution (AG extraordinaire)",
                    details: "Organisez une assemblée générale extraordinaire pour prendre la décision de dissolution de l'entreprise. Rédigez un procès-verbal détaillant les résolutions prises.",
                    requirements: ["Présence des associés ou représentants", "Ordre du jour précis"],
                    duration: "Immédiatement après la décision de cessation",
                    tips: ["Assurez-vous que tous les associés soient informés", "Conservez une copie signée du procès-verbal"]
                },
                {
                    title: "Liquidation des actifs et passifs",
                    details: "Procédez à la liquidation des biens et dettes de l'entreprise. Établissez un bilan de liquidation qui reflète l'état financier final de la société.",
                    requirements: ["Inventaire complet des actifs et passifs", "Justificatifs des transactions financières"],
                    duration: "Variable selon la complexité des opérations",
                    tips: ["Faites appel à un expert-comptable si nécessaire", "Vérifiez que toutes les obligations fiscales sont acquittées"]
                },
                {
                    title: "Dépôt du dossier de radiation au greffe",
                    details: "Soumettez votre dossier complet au greffe du tribunal de commerce compétent pour officialiser la radiation de l'entreprise. Ce dépôt inclut notamment le procès-verbal de dissolution et le bilan de liquidation.",
                    requirements: ["Procès-verbal de dissolution", "Bilan de liquidation", "Formulaire M4 rempli"],
                    duration: "2-3 jours ouvrables",
                    tips: ["Vérifiez que tous les documents sont conformes avant dépôt", "Prévoyez les frais d'enregistrement"]
                },
                {
                    title: "Publication de la radiation dans un journal d'annonces légales",
                    details: "Publiez un avis de radiation dans un journal habilité à recevoir les annonces légales. Cette étape est obligatoire pour rendre officielle la cessation d'activité de l'entreprise.",
                    requirements: ["Texte de l'avis conforme aux normes légales", "Paiement des frais de publication"],
                    duration: "Immédiatement après validation par le greffe",
                    tips: ["Choisissez un journal reconnu par les autorités", "Conservez une preuve de publication"]
                }
            ],
            faqs: [
                {
                    question: "Quand doit-on procéder à la radiation d'une entreprise ?",
                    answer: "La radiation est nécessaire lorsque l'entreprise cesse définitivement ses activités, que ce soit par décision volontaire des associés ou suite à une obligation légale telle que la faillite."
                },
                {
                    question: "Combien coûte la radiation d'une entreprise ?",
                    answer: "Les coûts varient entre 30 000 et 100 000 FCFA, incluant les frais d'enregistrement et de publication dans un journal d'annonces légales."
                },
                {
                    question: "Est-il obligatoire de publier un avis de radiation ?",
                    answer: "Oui, cette publication est obligatoire pour informer le public et les partenaires de la cessation définitive de l'activité."
                },
                {
                    question: "Que se passe-t-il si je ne respecte pas les formalités de radiation ?",
                    answer: "Le non-respect des démarches peut entraîner des sanctions administratives, des poursuites judiciaires ou des inscriptions au fichier des entreprises en cessation irrégulière."
                }
            ],
            documents: [
                "Procès-verbal de dissolution",
                "Bilan de liquidation",
                "Justificatif de clôture des comptes",
                "Avis de publication de dissolution"
            ],
            duration: "1 mois",
            cost: "30 000 - 100 000 FCFA",
            forms: ["Formulaire M4 - Radiation d'entreprise"]
        },
        {
            id: 12,
            title: "Demande de registre de commerce et de crédit mobilier (RCCM)",
            category: "Affaires Commerciales",
            shortDescription: "Obtenez un numéro RCCM pour exercer légalement votre activité commerciale",
            description: "<p>Le Registre de Commerce et du Crédit Mobilier (RCCM) est un document officiel indispensable pour toute personne souhaitant exercer une activité commerciale au Sénégal. Ce numéro atteste de l'immatriculation de votre entreprise et vous permet de contracter avec des tiers, d'ouvrir un compte bancaire professionnel et de bénéficier de droits fiscaux et sociaux.</p><br><p>La procédure consiste à constituer un dossier complet, le déposer auprès du tribunal de commerce compétent, puis obtenir le certificat RCCM après validation de votre demande.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Numéro obligatoire pour les entreprises commerciales",
                "Procédure rapide et encadrée",
                "Accès aux droits fiscaux et bancaires",
                "Délai de traitement court"
            ],
            steps: [
                {
                    title: "Constitution du dossier d'immatriculation",
                    details: "Réunissez tous les documents nécessaires pour prouver l'existence légale de votre entreprise, notamment les statuts, le justificatif de domiciliation et les pièces d'identité des responsables.",
                    requirements: ["Statuts de l'entreprise", "Justificatif de domiciliation", "Copie de la pièce d'identité du gérant"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Vérifiez que tous les documents sont à jour", "Préparez plusieurs copies des pièces importantes"]
                },
                {
                    title: "Dépôt au tribunal de commerce",
                    details: "Soumettez votre dossier complet au greffe du tribunal de commerce compétent. Un agent vérifiera les informations fournies et initiera le processus d'immatriculation.",
                    requirements: ["Dossier constitué", "Formulaire de demande d'immatriculation RCCM rempli"],
                    duration: "Immédiatement après constitution du dossier",
                    tips: ["Prenez rendez-vous si possible pour éviter les longues files d'attente", "Assurez-vous que tous les documents sont conformes avant dépôt"]
                },
                {
                    title: "Obtention du certificat RCCM",
                    details: "Une fois votre dossier validé, vous recevrez un certificat RCCM contenant votre numéro d'immatriculation. Ce document est essentiel pour exercer légalement votre activité.",
                    duration: "3-5 jours ouvrables",
                    tips: ["Vérifiez les informations sur le certificat avant de quitter le tribunal", "Conservez précieusement ce document"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce que le RCCM ?",
                    answer: "Le RCCM (Registre de Commerce et du Crédit Mobilier) est un registre public où sont inscrites toutes les entreprises commerciales. Il attribue un numéro unique permettant d'exercer légalement une activité."
                },
                {
                    question: "Qui doit demander un RCCM ?",
                    answer: "Toute personne physique ou morale exerçant une activité commerciale au Sénégal doit obtenir un RCCM pour se conformer à la réglementation en vigueur."
                },
                {
                    question: "Combien coûte une demande de RCCM ?",
                    answer: "Les frais varient entre 10 000 et 25 000 FCFA, en fonction de la nature et de la taille de l'entreprise. Ces frais incluent les droits d'immatriculation."
                },
                {
                    question: "Que faire si j'ai perdu mon certificat RCCM ?",
                    answer: "En cas de perte ou de vol, vous pouvez demander une copie du certificat RCCM auprès du tribunal de commerce où l'immatriculation a été effectuée."
                }
            ],
            documents: [
                "Statuts de l'entreprise",
                "Justificatif de domiciliation",
                "Copie de la pièce d'identité du gérant",
                "Formulaire de demande d'immatriculation"
            ],
            duration: "3-5 jours",
            cost: "10 000 - 25 000 FCFA",
            forms: ["Demande d'immatriculation RCCM"]
        },
        //
        {
            id: 13,
            title: "Obtention d'un numéro d'identifiant fiscal (NINEA)",
            category: "Affaires Commerciales",
            description: "Démarche pour obtenir un NINEA auprès des services fiscaux",
            steps: [
                "Remplir le formulaire de demande",
                "Fournir les documents d'identification de l'entreprise",
                "Déposer le dossier à la direction des impôts",
                "Obtention du certificat NINEA"
            ],
            documents: [
                "Statuts de l'entreprise",
                "Contrat de bail ou attestation de domiciliation",
                "Pièce d'identité du gérant",
                "Formulaire de demande de NINEA"
            ],
            duration: "2-3 jours",
            cost: "Gratuit",
            forms: ["Formulaire de demande de NINEA"]
        },
        {
            id: 14,
            title: "Demande d'agrément ou d'autorisation d'exercer",
            category: "Affaires Commerciales",
            description: "Obtenir une autorisation spécifique pour l'exercice de certaines activités réglementées",
            steps: [
                "Constituer le dossier d'agrément",
                "Dépôt auprès du ministère ou de l'autorité compétente",
                "Inspection ou enquête préalable",
                "Obtention de l'agrément"
            ],
            documents: [
                "Statuts de l'entreprise",
                "Pièce d'identité du gérant",
                "Justificatif de capacité professionnelle",
                "Formulaire de demande d'agrément"
            ],
            duration: "15-30 jours",
            cost: "Variable selon l'activité",
            forms: ["Demande d'agrément"]
        },
        {
            id: 15,
            title: "Immatriculation au registre du commerce pour les commerçants individuels",
            category: "Affaires Commerciales",
            description: "Démarche pour immatriculer un commerçant individuel",
            steps: [
                "Constitution du dossier de demande",
                "Dépôt au greffe du tribunal de commerce",
                "Obtention de l'extrait RCCM"
            ],
            documents: [
                "Copie de la pièce d'identité",
                "Justificatif de domicile",
                "Formulaire de demande d'immatriculation"
            ],
            duration: "2-3 jours",
            cost: "10 000 FCFA",
            forms: ["Demande d'immatriculation pour commerçant individuel"]
        },
        {
            id: 16,
            title: "Certificat de conformité d'entreprise",
            category: "Affaires Commerciales",
            description: "Obtention d'un certificat de conformité pour prouver la régularité administrative d'une entreprise",
            steps: [
                "Remplir le formulaire de demande",
                "Fournir les documents requis",
                "Dépôt du dossier au guichet unique",
                "Obtention du certificat"
            ],
            documents: [
                "Extrait RCCM",
                "NINEA",
                "Justificatif de domiciliation",
                "Formulaire de demande de certificat de conformité"
            ],
            duration: "5-7 jours",
            cost: "15 000 FCFA",
            forms: ["Demande de certificat de conformité"]
        },
// PROCÉDURES JUDICIAIRES
        {
            id: 17,
            title: "Dépôt de plainte",
            category: "Procédures Judiciaires",
            shortDescription: "Portez plainte auprès des autorités judiciaires pour signaler une infraction",
            description: "<p>Le dépôt de plainte est une procédure permettant à toute personne victime d'une infraction ou témoin d'un acte illégal de signaler les faits aux autorités compétentes. Cette démarche déclenche une enquête qui peut aboutir à des poursuites pénales contre les auteurs présumés.</p><br><p>Le processus inclut la rédaction d'une plainte détaillée, son dépôt auprès du commissariat ou de la gendarmerie, et l'obtention d'un récépissé confirmant le signalement. Les preuves éventuelles doivent être fournies pour appuyer votre demande.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Signaler une infraction aux autorités",
                "Procédure gratuite et accessible",
                "Obtention d'un récépissé confirmant le dépôt",
                "Peut déclencher une enquête pénale"
            ],
            steps: [
                {
                    title: "Rédaction de la plainte",
                    details: "Rédigez une plainte claire et détaillée en expliquant les faits constatés, leurs circonstances, ainsi que les préjudices subis. Incluez toutes les informations pertinentes pour faciliter l'enquête.",
                    requirements: ["Informations sur les faits", "Pièce d'identité"],
                    duration: "Variable selon la complexité des faits",
                    tips: ["Précisez les dates, lieux et personnes impliquées", "Conservez une copie de votre plainte"]
                },
                {
                    title: "Dépôt au commissariat ou à la gendarmerie",
                    details: "Rendez-vous dans le commissariat ou la gendarmerie territorialement compétent pour déposer votre plainte. Un agent vous recevra et pourra vous assister dans la formalisation de votre demande.",
                    requirements: ["Plainte écrite", "Pièce d'identité", "Preuves éventuelles"],
                    duration: "Immédiatement après rédaction",
                    tips: ["Choisissez un moment où les services ne sont pas trop occupés", "Apportez toutes les preuves disponibles"]
                },
                {
                    title: "Enregistrement de la plainte",
                    details: "L'agent enregistrera votre plainte dans les registres officiels et initiera les démarches nécessaires pour ouvrir une enquête si les faits le justifient.",
                    requirements: ["Dossier complet", "Coopération avec les autorités"],
                    duration: "Immédiat",
                    tips: ["Répondez aux questions posées par les agents avec précision", "Soyez patient·e face aux délais d'enquête"]
                },
                {
                    title: "Obtention du récépissé",
                    details: "À l'issue du dépôt, vous recevrez un récépissé officiel confirmant la réception de votre plainte. Ce document est important pour suivre l'avancement de votre dossier.",
                    duration: "Immédiat après enregistrement",
                    tips: ["Conservez précieusement le récépissé", "Notez le numéro de référence pour vos futures correspondances"]
                }
            ],
            faqs: [
                {
                    question: "Puis-je déposer une plainte anonyme ?",
                    answer: "Les plaintes anonymes ne sont généralement pas prises en compte. Cependant, vous pouvez demander à rester discret sur votre identité dans certaines situations particulières."
                },
                {
                    question: "Combien coûte le dépôt d'une plainte ?",
                    answer: "Le dépôt d'une plainte est gratuit. Vous n'aurez aucun frais à payer lors de cette démarche."
                },
                {
                    question: "Que faire si ma plainte n'est pas prise en compte ?",
                    answer: "Si votre plainte n'est pas retenue, vous pouvez solliciter une explication des autorités ou saisir un procureur pour obtenir un avis supplémentaire."
                },
                {
                    question: "Est-il obligatoire de fournir des preuves lors du dépôt ?",
                    answer: "Bien que non obligatoire, fournir des preuves (photos, témoignages, certificats médicaux) renforce votre plainte et facilite l'enquête."
                }
            ],
            documents: [
                "Pièce d'identité",
                "Preuves éventuelles",
                "Certificat médical (si nécessaire)"
            ],
            duration: "Immédiat pour le dépôt",
            cost: "Gratuit",
            forms: ["Formulaire de dépôt de plainte"]
        },
        {
            id: 18,
            title: "Demande de casier judiciaire",
            category: "Procédures Judiciaires",
            shortDescription: "Obtenez un extrait de votre casier judiciaire pour des démarches administratives ou professionnelles",
            description: "<p>Le casier judiciaire est un document officiel qui recense les condamnations pénales éventuelles d'une personne. Il peut être requis pour diverses démarches, telles que l'obtention d'un emploi, une demande de visa ou encore certaines inscriptions universitaires.</p><br><p>La demande d'extrait de casier judiciaire s'effectue auprès du tribunal compétent et nécessite le dépôt d'un formulaire accompagné de pièces justificatives. Une fois traitée, la demande permet d'obtenir un extrait vierge (sans mention de condamnation) ou annoté (avec mentions).</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Document indispensable pour certaines démarches",
                "Délai de traitement rapide",
                "Coût modique",
                "Valable pour les besoins professionnels et administratifs"
            ],
            steps: [
                {
                    title: "Se rendre au greffe du tribunal",
                    details: "Rendez-vous au greffe du tribunal compétent pour initier votre demande d'extrait de casier judiciaire. Vous pouvez également vérifier si des services en ligne sont disponibles dans votre région.",
                    requirements: ["Pièce d'identité", "Extrait de naissance"],
                    duration: "Immédiatement après préparation des documents",
                    tips: ["Privilégiez les horaires moins chargés", "Vérifiez les modalités spécifiques du tribunal concerné"]
                },
                {
                    title: "Remplir le formulaire de demande",
                    details: "Complétez soigneusement le formulaire de demande d'extrait de casier judiciaire en fournissant toutes les informations demandées. Assurez-vous que les données saisies sont exactes.",
                    requirements: ["Formulaire de demande", "Informations personnelles complètes"],
                    duration: "10-15 minutes",
                    tips: ["Prenez le temps de relire le formulaire avant soumission", "Faites des copies supplémentaires si nécessaire"]
                },
                {
                    title: "Fournir les pièces justificatives",
                    details: "Soumettez les documents requis pour valider votre demande, notamment une pièce d'identité et un extrait de naissance. Ces pièces permettent de prouver votre identité et votre nationalité.",
                    requirements: ["Pièce d'identité", "Extrait de naissance", "Formulaire rempli"],
                    duration: "Immédiatement après dépôt du formulaire",
                    tips: ["Vérifiez que tous les documents sont à jour", "Prévoyez des photocopies si demandé"]
                },
                {
                    title: "Retrait de l'extrait",
                    details: "Une fois votre demande traitée, retirez votre extrait de casier judiciaire auprès du greffe. Ce document sera tamponné et signé pour attester de son authenticité.",
                    duration: "1-2 jours",
                    tips: ["Vérifiez les informations sur l'extrait avant de quitter le greffe", "Conservez précieusement ce document"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce qu'un extrait de casier judiciaire ?",
                    answer: "Un extrait de casier judiciaire est un document officiel qui liste les condamnations pénales éventuelles d'une personne. Il peut être vierge (sans mention) ou annoté (avec mentions)."
                },
                {
                    question: "Pourquoi puis-je avoir besoin d'un extrait de casier judiciaire ?",
                    answer: "Cet extrait est souvent requis pour des emplois nécessitant une totale probité (banques, éducation, sécurité), des demandes de visas ou encore des inscriptions dans certaines institutions."
                },
                {
                    question: "Combien coûte une demande d'extrait de casier judiciaire ?",
                    answer: "Le coût est fixé à 1 000 FCFA pour une demande standard. Des frais supplémentaires peuvent s'appliquer pour des services accélérés ou en ligne selon les régions."
                },
                {
                    question: "Que faire si je perds mon extrait de casier judiciaire ?",
                    answer: "En cas de perte, vous pouvez effectuer une nouvelle demande en suivant la même procédure. Conservez toujours une copie pour éviter cette situation."
                }
            ],
            documents: [
                "Pièce d'identité",
                "Extrait de naissance",
                "Formulaire de demande"
            ],
            duration: "1-2 jours",
            cost: "1 000 FCFA",
            forms: ["Demande d'extrait de casier judiciaire"]
        },
        {
            id: 19,
            title: "Assignation en justice",
            category: "Procédures Judiciaires",
            shortDescription: "Saisissez un tribunal civil ou commercial pour résoudre un litige",
            description: "<p>L'assignation en justice est une procédure permettant de saisir un tribunal compétent pour régler un différend civil ou commercial. Cette démarche implique la rédaction d'un acte d'assignation, sa signification par un huissier de justice, puis son dépôt au greffe du tribunal concerné.</p><br><p>Le processus peut varier selon la nature du litige et le tribunal saisi, mais il est essentiel de respecter les étapes légales pour garantir la validité de votre requête et obtenir une audience.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Moyen légal pour résoudre un conflit",
                "Signification obligatoire par huissier",
                "Dépôt au greffe du tribunal compétent",
                "Délai variable selon le tribunal"
            ],
            steps: [
                {
                    title: "Rédaction de l'acte d'assignation",
                    details: "Rédigez un acte d'assignation détaillant les faits, vos demandes et les preuves à l'appui. Cet acte doit être rédigé conformément aux règles légales et inclure toutes les informations nécessaires sur les parties concernées.",
                    requirements: ["Modèle d'assignation en justice", "Précisions sur le litige"],
                    duration: "Variable selon la complexité du dossier",
                    tips: ["Consultez un avocat si nécessaire pour assurer la qualité juridique de l'acte", "Vérifiez que tous les éléments requis sont présents"]
                },
                {
                    title: "Signification par un huissier de justice",
                    details: "Confiez votre acte d'assignation à un huissier de justice pour qu'il le notifie officiellement à la partie adverse. Cette étape est obligatoire pour valider la procédure.",
                    requirements: ["Acte d'assignation rédigé", "Nom et adresse de la partie adverse"],
                    duration: "Immédiatement après finalisation de l'acte",
                    tips: ["Choisissez un huissier de confiance", "Prévoyez les frais de signification"]
                },
                {
                    title: "Dépôt au greffe du tribunal",
                    details: "Une fois l'acte d'assignation signifié, déposez-le au greffe du tribunal compétent pour officialiser la saisine. Le greffe vous communiquera ensuite les prochaines étapes et la date d'audience.",
                    requirements: ["Acte d'assignation signifié", "Pièces justificatives du litige", "Pièce d'identité"],
                    duration: "Immédiatement après signification",
                    tips: ["Vérifiez que tous les documents sont complets avant dépôt", "Conservez une copie de l'acte déposé"]
                },
                {
                    title: "Suivi de la procédure",
                    details: "Suivez attentivement l'avancement de votre affaire auprès du greffe et préparez-vous pour l'audience. Vous pouvez également solliciter l'assistance d'un avocat pour vous représenter devant le tribunal.",
                    duration: "Variable selon le calendrier du tribunal",
                    tips: ["Restez en contact avec le greffe pour toute information", "Préparez soigneusement vos arguments et preuves avant l'audience"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce qu'une assignation en justice ?",
                    answer: "Une assignation en justice est un acte juridique permettant de saisir un tribunal pour régler un différend civil ou commercial entre deux parties."
                },
                {
                    question: "Dois-je obligatoirement passer par un avocat pour assigner en justice ?",
                    answer: "Non, ce n'est pas obligatoire dans tous les cas. Cependant, un avocat peut vous accompagner pour garantir la solidité de votre dossier et vous représenter devant le tribunal."
                },
                {
                    question: "Combien coûte une assignation en justice ?",
                    answer: "Les coûts varient selon la complexité du dossier et incluent les frais d'huissier pour la signification ainsi que les éventuels droits de greffe."
                },
                {
                    question: "Que faire si je reçois une assignation en justice ?",
                    answer: "Si vous recevez une assignation, prenez connaissance des faits reprochés et préparez votre défense. Il est recommandé de consulter un avocat pour vous assister lors de l'audience."
                }
            ],
            documents: [
                "Assignation rédigée",
                "Pièce d'identité",
                "Preuves du litige"
            ],
            duration: "Variable selon le tribunal",
            cost: "Frais d'huissier et de greffe",
            forms: ["Modèle d'assignation en justice"]
        },
        {
            id: 20,
            title: "Demande de mise sous tutelle",
            category: "Procédures Judiciaires",
            shortDescription: "Protégez une personne majeure vulnérable en demandant sa mise sous tutelle",
            description: "<p>La mise sous tutelle est une mesure légale destinée à protéger une personne majeure qui, en raison de son état physique ou mental, ne peut plus gérer seule ses intérêts et sa vie courante. Cette procédure nécessite la constitution d'un dossier détaillé, un dépôt au tribunal compétent, ainsi qu'une enquête sociale et médicale pour évaluer la situation.</p><br><p>Le juge des tutelles statue ensuite sur la mise en place de cette mesure protectrice, en nommant un tuteur chargé de veiller aux droits et intérêts de la personne concernée.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Protection juridique d'une personne vulnérable",
                "Évaluation médicale et sociale obligatoire",
                "Décision prise par le juge des tutelles",
                "Durée variable selon la complexité du dossier"
            ],
            steps: [
                {
                    title: "Constitution du dossier",
                    details: "Réunissez tous les documents nécessaires pour justifier la demande de mise sous tutelle, notamment un certificat médical circonstancié attestant de l'incapacité de la personne concernée à gérer ses affaires.",
                    requirements: ["Pièce d'identité du demandeur", "Certificat médical circonstancié", "Justificatif du lien avec la personne protégée"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Consultez un médecin spécialisé pour obtenir un certificat précis", "Préparez toutes les informations relatives à la situation de la personne"]
                },
                {
                    title: "Dépôt de la demande au tribunal",
                    details: "Soumettez votre dossier complet au greffe du tribunal compétent. Un agent vérifiera les pièces fournies et transmettra le dossier au juge des tutelles pour examen.",
                    requirements: ["Dossier constitué", "Formulaire de demande rempli"],
                    duration: "Immédiatement après finalisation du dossier",
                    tips: ["Vérifiez que tous les documents sont conformes avant dépôt", "Prévoyez une copie de votre dossier pour vos archives"]
                },
                {
                    title: "Enquête sociale et médicale",
                    details: "Une enquête sociale et médicale sera menée pour évaluer la situation de la personne concernée et déterminer si une mise sous tutelle est justifiée. Des professionnels spécialisés seront mandatés pour réaliser ces expertises.",
                    requirements: ["Autorisation du tribunal", "Coopération de la personne concernée"],
                    duration: "2-4 semaines",
                    tips: ["Collaborez pleinement avec les enquêteurs", "Fournissez toutes les informations demandées dans les délais impartis"]
                },
                {
                    title: "Décision du juge des tutelles",
                    details: "Le juge des tutelles analysera le rapport d'enquête et prendra une décision finale quant à la mise sous tutelle. Si la mesure est approuvée, un tuteur sera nommé pour assurer la protection de la personne concernée.",
                    duration: "1-3 mois après le dépôt du dossier",
                    tips: ["Patientez pendant l'instruction du dossier", "Contactez régulièrement le greffe pour connaître l'avancement"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut demander la mise sous tutelle d'une personne ?",
                    answer: "La demande peut être initiée par un membre de la famille, un proche, ou encore un professionnel de santé ayant constaté l'incapacité de la personne à gérer ses affaires."
                },
                {
                    question: "Quelle est la différence entre une tutelle et une curatelle ?",
                    answer: "La tutelle est une mesure plus restrictive que la curatelle. Elle est appliquée lorsque la personne est incapable de prendre toute décision importante, tandis que la curatelle concerne des situations moins graves où elle conserve certains droits."
                },
                {
                    question: "Combien coûte une procédure de mise sous tutelle ?",
                    answer: "Les coûts varient selon les expertises médicales et sociales requises. Des aides financières peuvent être accordées dans certains cas pour alléger les frais."
                },
                {
                    question: "Que se passe-t-il si la demande est rejetée ?",
                    answer: "En cas de rejet, il est possible de faire appel de la décision ou de soumettre une nouvelle demande si de nouveaux éléments viennent justifier la nécessité de la mesure."
                }
            ],
            documents: [
                "Pièce d'identité du demandeur",
                "Certificat médical circonstancié",
                "Justificatif du lien avec la personne protégée"
            ],
            duration: "1-3 mois",
            cost: "Variable (selon expertise médicale)",
            forms: ["Demande de mise sous tutelle"]
        },
        //
        {
            id: 21,
            title: "Requête en divorce",
            category: "Procédures Judiciaires",
            description: "Démarche pour engager une procédure de divorce devant le tribunal",
            steps: [
                "Consultation avec un avocat",
                "Dépôt de la requête au tribunal",
                "Audience de conciliation",
                "Jugement de divorce"
            ],
            documents: [
                "Acte de mariage",
                "Extraits de naissance des enfants",
                "Pièce d'identité",
                "Justificatifs de ressources"
            ],
            duration: "3-12 mois",
            cost: "Honoraires d'avocat + frais de greffe",
            forms: ["Requête en divorce"]
        },
        {
            id: 22,
            title: "Saisine du tribunal du travail",
            category: "Procédures Judiciaires",
            description: "Procédure pour régler un litige entre employeur et salarié",
            steps: [
                "Tentative de conciliation devant l'inspection du travail",
                "Dépôt de la requête au tribunal",
                "Audience et plaidoiries",
                "Jugement du tribunal"
            ],
            documents: [
                "Contrat de travail",
                "Bulletins de salaire",
                "Preuves du litige",
                "Pièce d'identité"
            ],
            duration: "1-6 mois",
            cost: "Gratuit (hors frais d'avocat)",
            forms: ["Requête devant le tribunal du travail"]
        },
        {
            id: 23,
            title: "Recours en appel",
            category: "Procédures Judiciaires",
            description: "Faire appel d'une décision judiciaire devant une cour d'appel",
            steps: [
                "Rédaction de la déclaration d'appel",
                "Dépôt au greffe de la cour d'appel",
                "Audience d'appel",
                "Décision de la cour"
            ],
            documents: [
                "Jugement attaqué",
                "Pièce d'identité",
                "Preuves complémentaires"
            ],
            duration: "3-12 mois",
            cost: "Frais de justice et honoraires d'avocat",
            forms: ["Déclaration d'appel"]
        },
        {
            id: 24,
            title: "Demande de liberté provisoire",
            category: "Procédures Judiciaires",
            description: "Procédure pour obtenir une libération provisoire en attendant le procès",
            steps: [
                "Constitution du dossier",
                "Dépôt de la demande au juge d'instruction",
                "Examen de la demande",
                "Décision du juge"
            ],
            documents: [
                "Pièce d'identité",
                "Certificat de résidence",
                "Justificatifs de garanties (emploi, famille, etc.)"
            ],
            duration: "7-15 jours",
            cost: "Gratuit",
            forms: ["Demande de liberté provisoire"]
        },
        {
            id: 25,
            title: "Opposition à une décision de justice",
            category: "Procédures Judiciaires",
            description: "Faire opposition à une décision rendue par défaut",
            steps: [
                "Rédaction de l'acte d'opposition",
                "Dépôt au greffe du tribunal",
                "Audience d'opposition",
                "Décision du tribunal"
            ],
            documents: [
                "Jugement attaqué",
                "Pièce d'identité",
                "Preuves du litige"
            ],
            duration: "1-3 mois",
            cost: "Frais de greffe et honoraires d'avocat",
            forms: ["Déclaration d'opposition"]
        },
// ASSISTANCE JURIDIQUE
        {
            id: 26,
            title: "Demande d'aide juridictionnelle",
            category: "Assistance Juridique",
            shortDescription: "Obtenez une assistance juridique gratuite ou à moindre coût",
            description: "<p>L'aide juridictionnelle est une mesure destinée à permettre l'accès à la justice aux personnes ayant des ressources limitées. Elle peut couvrir les frais d'avocat, de procédure ou d'expertise selon le niveau d'assistance accordé.</p><br><p>La demande nécessite la constitution d'un dossier détaillé et son dépôt auprès du bureau d'aide juridictionnelle compétent. Après examen, une décision est prise pour accorder totalement, partiellement ou refuser l'aide demandée.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Accès à la justice pour les personnes à faibles revenus",
                "Couverture partielle ou totale des frais juridiques",
                "Instruction rapide de la demande",
                "Délai de traitement de 15 à 30 jours"
            ],
            steps: [
                {
                    title: "Constitution du dossier",
                    details: "Réunissez tous les documents nécessaires pour justifier vos ressources financières et décrire votre situation juridique. Un formulaire de demande doit être rempli avec précision.",
                    requirements: ["Justificatif de revenus", "Pièce d'identité", "Justificatif de domicile", "Description de l'affaire"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Vérifiez que tous les documents sont à jour", "Faites des copies supplémentaires des pièces justificatives"]
                },
                {
                    title: "Dépôt au bureau d'aide juridictionnelle",
                    details: "Soumettez votre dossier complet au bureau d'aide juridictionnelle compétent dans votre région. Un agent vérifiera les pièces fournies et enregistrera votre demande.",
                    requirements: ["Dossier constitué", "Formulaire de demande rempli"],
                    duration: "Immédiatement après finalisation du dossier",
                    tips: ["Privilégiez les horaires moins chargés pour éviter les longues attentes", "Conservez un accusé de réception du dépôt"]
                },
                {
                    title: "Examen de la demande",
                    details: "Le bureau d'aide juridictionnelle examine votre dossier pour évaluer votre éligibilité en fonction de vos ressources et de la nature de votre affaire. Cette étape peut inclure des vérifications complémentaires.",
                    duration: "15-20 jours",
                    tips: ["Répondez rapidement à toute demande de documents supplémentaires", "Patientez pendant l'instruction de votre dossier"]
                },
                {
                    title: "Notification de la décision",
                    details: "Une fois l'examen terminé, vous recevrez une notification officielle informant de la décision concernant votre demande. Si acceptée, un avocat sera désigné pour vous assister si nécessaire.",
                    duration: "Jusqu'à 30 jours après le dépôt",
                    tips: ["Lisez attentivement la décision reçue", "Contactez le bureau si vous avez des questions sur la réponse"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut bénéficier de l'aide juridictionnelle ?",
                    answer: "Les personnes dont les revenus sont inférieurs à un certain seuil fixé par la loi peuvent prétendre à cette aide. Les critères varient selon la situation familiale et géographique."
                },
                {
                    question: "Quels types de frais sont couverts par l'aide juridictionnelle ?",
                    answer: "L'aide peut couvrir les frais d'avocat, de procédure, d'huissier ou encore d'expertise médicale ou technique, selon le niveau d'assistance accordé (totale ou partielle)."
                },
                {
                    question: "Est-il obligatoire de passer par un avocat avec l'aide juridictionnelle ?",
                    answer: "Non, l'aide juridictionnelle peut également financer d'autres démarches comme les frais de greffe ou d'huissier. Cependant, un avocat peut être désigné si nécessaire pour représenter le bénéficiaire."
                },
                {
                    question: "Que faire si ma demande est rejetée ?",
                    answer: "En cas de rejet, il est possible de contester la décision ou de soumettre une nouvelle demande si votre situation a évolué favorablement."
                }
            ],
            documents: [
                "Justificatif de revenus",
                "Pièce d'identité",
                "Justificatif de domicile",
                "Description de l'affaire"
            ],
            duration: "15-30 jours",
            cost: "Gratuit",
            forms: ["Formulaire de demande d'aide juridictionnelle"]
        },
        {
            id: 27,
            title: "Consultation juridique gratuite",
            category: "Assistance Juridique",
            shortDescription: "Bénéficiez de conseils juridiques gratuits pour vos problèmes légaux",
            description: "<p>La consultation juridique gratuite permet d'obtenir des conseils ou des orientations auprès d'un avocat ou d'un conseiller juridique, sans frais. Cette prestation est généralement offerte par des centres juridiques, des associations ou des barreaux dans le cadre de leur mission d'accès à la justice.</p><br><p>Pendant la consultation, vous pouvez poser des questions sur votre situation légale, fournir les documents nécessaires et recevoir des recommandations adaptées à votre cas spécifique.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Accès gratuit à un conseil juridique professionnel",
                "Orientations personnalisées selon votre situation",
                "Disponible dans les centres juridiques ou au barreau",
                "Délai rapide pour obtenir un rendez-vous"
            ],
            steps: [
                {
                    title: "Prendre rendez-vous au centre juridique ou au barreau",
                    details: "Contactez un centre juridique, une association spécialisée ou le barreau local pour prendre rendez-vous. Certains services proposent également des consultations en ligne ou par téléphone.",
                    requirements: ["Pièce d'identité", "Justificatif de domicile"],
                    duration: "Immédiat ou sous 48 heures",
                    tips: ["Privilégiez les horaires où les centres sont moins chargés", "Précisez clairement votre demande lors du premier contact"]
                },
                {
                    title: "Présenter les documents liés à l'affaire",
                    details: "Apportez tous les documents pertinents relatifs à votre situation juridique (contrats, courriers, jugements, etc.) afin de faciliter l'analyse de votre dossier par le conseiller.",
                    requirements: ["Documents relatifs au litige", "Copies des pièces justificatives"],
                    duration: "Avant la consultation",
                    tips: ["Organisez vos documents dans l'ordre chronologique", "Faites des copies supplémentaires si nécessaire"]
                },
                {
                    title: "Échanger avec un avocat ou un conseiller juridique",
                    details: "Lors de la consultation, exposez votre situation clairement et posez toutes vos questions. Le conseiller ou l'avocat vous expliquera vos droits, vos obligations et les démarches possibles.",
                    duration: "30 minutes à 1 heure",
                    tips: ["Notez les informations importantes durant l'échange", "N'hésitez pas à demander des clarifications si besoin"]
                },
                {
                    title: "Recevoir des recommandations ou une orientation",
                    details: "À l'issue de la consultation, vous recevrez des recommandations pratiques ou une orientation vers les ressources appropriées pour résoudre votre problème juridique.",
                    duration: "Immédiatement après la consultation",
                    tips: ["Demandez un récapitulatif écrit si possible", "Suivez les conseils donnés pour agir efficacement"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut bénéficier d'une consultation juridique gratuite ?",
                    answer: "Toute personne ayant besoin de conseils juridiques peut solliciter cette prestation, que ce soit pour une affaire familiale, immobilière, pénale ou autre."
                },
                {
                    question: "Dois-je préparer quelque chose avant la consultation ?",
                    answer: "Il est recommandé de rassembler tous les documents liés à votre situation (contrats, jugements, courriers) pour permettre au conseiller de mieux comprendre votre cas."
                },
                {
                    question: "Est-ce que la consultation engage mes choix ultérieurs ?",
                    answer: "Non, la consultation ne vous engage pas. Les conseils reçus vous aident simplement à prendre une décision éclairée concernant votre situation juridique."
                },
                {
                    question: "Que faire si j'ai besoin d'une assistance plus approfondie après la consultation ?",
                    answer: "Le conseiller peut vous orienter vers des services complémentaires, comme une aide juridictionnelle ou un avocat spécialisé, si votre cas le nécessite."
                }
            ],
            documents: [
                "Pièce d'identité",
                "Documents relatifs au litige",
                "Justificatif de domicile"
            ],
            duration: "Immédiat ou sous 48 heures",
            cost: "Gratuit",
            forms: ["Formulaire de consultation juridique (si nécessaire)"]
        },
        {
            id: 28,
            title: "Assistance juridique en détention",
            category: "Assistance Juridique",
            shortDescription: "Obtenez une aide juridique pour les personnes en garde à vue ou en détention préventive",
            description: "<p>L'assistance juridique en détention est un droit fondamental qui permet aux personnes placées en garde à vue ou en détention préventive d'être accompagnées par un avocat. Cette aide est cruciale pour garantir leur défense et leurs droits tout au long de la procédure judiciaire.</p><br><p>Le processus démarre par une demande d'assistance, suivie de l'intervention d'un avocat commis d'office si nécessaire. Un entretien est ensuite organisé avec le détenu pour analyser son cas et préparer sa défense, avant de poursuivre le suivi de la procédure.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Accès immédiat à un avocat pour les personnes en détention",
                "Garantie des droits du détenu durant la procédure",
                "Intervention gratuite d'un avocat commis d'office",
                "Suivi personnalisé de la situation judiciaire"
            ],
            steps: [
                {
                    title: "Demande d'assistance par le détenu ou sa famille",
                    details: "La demande d'assistance peut être initiée directement par le détenu ou par ses proches auprès des autorités pénitentiaires ou judiciaires compétentes.",
                    requirements: ["Pièce d'identité du demandeur", "Informations sur le détenu", "Références du dossier judiciaire"],
                    duration: "Immédiat",
                    tips: ["Précisez clairement les circonstances de la détention", "Contactez rapidement un avocat ou le service concerné"]
                },
                {
                    title: "Intervention d'un avocat commis d'office",
                    details: "Si le détenu n'a pas de moyen financier suffisant pour engager un avocat, un avocat sera désigné d'office pour assurer son assistance juridique.",
                    requirements: ["Demande d'assistance validée", "Justificatif de ressources (si applicable)"],
                    duration: "Immédiatement après la demande",
                    tips: ["L'avocat commis d'office est tenu de respecter la confidentialité", "Collaborez pleinement avec l'avocat désigné"]
                },
                {
                    title: "Entretien juridique avec le détenu",
                    details: "Un entretien confidentiel est organisé entre le détenu et son avocat pour évaluer la situation, comprendre les faits et préparer la défense appropriée.",
                    duration: "Planifié selon les disponibilités",
                    tips: ["Exprimez clairement votre version des faits", "Apportez tous les documents disponibles liés à votre cas"]
                },
                {
                    title: "Suivi de la procédure judiciaire",
                    details: "L'avocat assure un suivi continu de la procédure judiciaire, représentant le détenu lors des audiences et veillant à la protection de ses droits tout au long du processus.",
                    duration: "Jusqu'à la résolution de l'affaire",
                    tips: ["Communiquez régulièrement avec votre avocat", "Signalez toute irrégularité constatée dans la procédure"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut demander l'assistance juridique en détention ?",
                    answer: "Le détenu lui-même ou ses proches peuvent solliciter cette assistance auprès des autorités compétentes ou directement auprès d'un avocat."
                },
                {
                    question: "Est-ce que l'assistance juridique est gratuite en détention ?",
                    answer: "Oui, l'assistance juridique est gratuite pour les personnes sans ressources suffisantes, grâce à la désignation d'un avocat commis d'office."
                },
                {
                    question: "Combien de temps prend l'intervention d'un avocat en détention ?",
                    answer: "L'intervention est généralement rapide, souvent dans les heures suivant la demande, afin de garantir un soutien juridique immédiat."
                },
                {
                    question: "Que faire si je ne suis pas satisfait de l'avocat commis d'office ?",
                    answer: "Vous pouvez demander un changement d'avocat dans certaines circonstances justifiées, comme une incompatibilité d'intérêts ou un manque de confiance."
                }
            ],
            documents: [
                "Pièce d'identité du demandeur",
                "Informations sur le détenu",
                "Références du dossier judiciaire"
            ],
            duration: "Immédiat",
            cost: "Gratuit",
            forms: ["Demande d'assistance en détention"]
        },
        {
            id: 29,
            title: "Médiation familiale",
            category: "Assistance Juridique",
            shortDescription: "Résolvez vos conflits familiaux de manière amiable avec l'aide d'un médiateur professionnel",
            description: "<p>La médiation familiale est une méthode alternative permettant de résoudre les conflits au sein du cadre familial sans recourir à un procès. Elle offre un espace neutre et confidentiel où les parties concernées peuvent exprimer leurs points de vue et trouver des solutions mutuellement acceptables sous la guidance d'un médiateur qualifié.</p><br><p>Cette démarche peut être utilisée pour régler des problèmes tels que les divorces, les pensions alimentaires, la garde des enfants ou encore les successions.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Solution alternative aux procédures judiciaires",
                "Processus confidentiel et volontaire",
                "Accompagnement par un médiateur professionnel",
                "Durée limitée et coût réduit"
            ],
            steps: [
                {
                    title: "Prise de contact avec un centre de médiation",
                    details: "Contactez un centre de médiation familiale agréé pour obtenir des informations sur la procédure et vérifier si votre situation est éligible à la médiation.",
                    requirements: ["Pièce d'identité", "Justificatif de résidence"],
                    duration: "Immédiat",
                    tips: ["Choisissez un centre proche de votre domicile", "Posez toutes vos questions lors du premier contact"]
                },
                {
                    title: "Première rencontre avec le médiateur",
                    details: "Participez à une première séance d'information avec le médiateur pour mieux comprendre le processus et déterminer si la médiation est adaptée à votre situation.",
                    requirements: ["Documents relatifs au conflit (jugement, pension, etc.)", "Disponibilité des parties concernées"],
                    duration: "1-2 heures",
                    tips: ["Exprimez clairement vos attentes", "Écoutez attentivement les explications du médiateur"]
                },
                {
                    title: "Séances de médiation (1 à 3 séances)",
                    details: "Engagez-vous dans des séances de médiation où vous et les autres parties concernées travaillerez avec le médiateur pour trouver des solutions concrètes à vos différends.",
                    duration: "1 à 3 séances, généralement espacées de quelques semaines",
                    tips: ["Restez ouvert à la discussion", "Apportez tous les documents nécessaires pour clarifier les points litigieux"]
                },
                {
                    title: "Accord ou procès-verbal de non-conciliation",
                    details: "À l'issue des séances, soit un accord est conclu et formalisé par écrit, soit un procès-verbal de non-conciliation est dressé si aucune solution commune n'a pu être trouvée.",
                    duration: "Immédiatement après les séances",
                    tips: ["Relisez attentivement l'accord avant signature", "Conservez une copie de tout document final"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut solliciter une médiation familiale ?",
                    answer: "Toute personne impliquée dans un conflit familial, qu'il s'agisse de parents en divorce, d'enfants ou encore de membres d'une famille concernés par une succession."
                },
                {
                    question: "Est-ce obligatoire de passer par un médiateur ?",
                    answer: "Non, la médiation est une démarche volontaire. Cependant, elle est souvent recommandée avant d'envisager une procédure judiciaire plus coûteuse et longue."
                },
                {
                    question: "Combien coûte une médiation familiale ?",
                    answer: "La médiation familiale peut être gratuite ou à coût réduit selon les ressources financières des parties concernées et les aides disponibles."
                },
                {
                    question: "Que se passe-t-il si nous ne parvenons pas à un accord ?",
                    answer: "En cas d'échec de la médiation, les parties peuvent choisir de poursuivre leur affaire devant un tribunal, mais elles auront déjà bénéficié d'une tentative de résolution amiable."
                }
            ],
            documents: [
                "Pièce d'identité",
                "Justificatif de résidence",
                "Documents relatifs au conflit (jugement, pension, etc.)"
            ],
            duration: "1-2 mois",
            cost: "Gratuit ou coût réduit",
            forms: ["Demande de médiation familiale"]
        },
        {
            id: 30,
            title: "Saisine du Défenseur des Droits",
            category: "Assistance Juridique",
            shortDescription: "Signalez une violation de vos droits fondamentaux auprès d'une autorité indépendante",
            description: "<p>Le Défenseur des Droits est une institution indépendante chargée de veiller au respect des droits fondamentaux et des libertés publiques. En cas de discrimination, de dysfonctionnement administratif ou de violation de vos droits, vous pouvez saisir cette autorité pour obtenir une médiation ou une intervention.</p><br><p>La procédure consiste à déposer une plainte écrite, qui sera ensuite examinée par le Défenseur des Droits ou son équipe. Après enquête, une décision ou des recommandations peuvent être formulées pour résoudre le problème rencontré.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Recours gratuit et accessible",
                "Médiation ou investigation en cas de violation des droits",
                "Traitement confidentiel des plaintes",
                "Durée variable selon la complexité du dossier"
            ],
            steps: [
                {
                    title: "Rédaction d'une plainte écrite",
                    details: "Rédigez une plainte claire et détaillée exposant les faits, les circonstances et les préjudices subis. Attachez toutes les preuves disponibles pour appuyer votre demande.",
                    requirements: ["Pièce d'identité", "Preuves de la violation", "Coordonnées du plaignant"],
                    duration: "Variable selon la complexité du dossier",
                    tips: ["Précisez les dates, lieux et personnes impliquées", "Conservez une copie de votre plainte"]
                },
                {
                    title: "Dépôt auprès du bureau du Défenseur des Droits",
                    details: "Soumettez votre plainte via le formulaire en ligne, par courrier ou directement dans l'un des bureaux locaux du Défenseur des Droits. Un accusé de réception vous sera remis ou envoyé après dépôt.",
                    requirements: ["Plainte écrite complète", "Documents justificatifs"],
                    duration: "Immédiatement après finalisation de la plainte",
                    tips: ["Vérifiez que tous les documents sont joints avant dépôt", "Utilisez le canal officiel pour garantir le traitement de votre plainte"]
                },
                {
                    title: "Enquête et médiation",
                    details: "Le Défenseur des Droits ou son équipe mène une enquête approfondie sur votre dossier. Une médiation peut être proposée pour résoudre le conflit à l'amiable avec l'autorité ou l'organisme concerné.",
                    duration: "1-3 mois",
                    tips: ["Collaborez pleinement avec les enquêteurs", "Communiquez régulièrement si de nouveaux éléments apparaissent"]
                },
                {
                    title: "Décision ou recommandations",
                    details: "À l'issue de l'enquête, le Défenseur des Droits émet une décision ou des recommandations visant à corriger la situation. Ces conclusions sont communiquées aux parties concernées.",
                    duration: "Jusqu'à 6 mois après le dépôt",
                    tips: ["Lisez attentivement les conclusions reçues", "Contactez le Défenseur des Droits si vous avez des questions sur les recommandations"]
                }
            ],
            faqs: [
                {
                    question: "Qui peut saisir le Défenseur des Droits ?",
                    answer: "Toute personne physique ou morale ayant constaté une violation de ses droits ou des dysfonctionnements administratifs peut saisir le Défenseur des Droits."
                },
                {
                    question: "Quels types de problèmes relèvent du Défenseur des Droits ?",
                    answer: "Les domaines couverts incluent la discrimination, les abus de pouvoir, les dysfonctionnements administratifs, les droits des enfants, des personnes handicapées et des usagers des services publics."
                },
                {
                    question: "Est-ce que la saisine est gratuite ?",
                    answer: "Oui, la saisine du Défenseur des Droits est entièrement gratuite et accessible à toute personne justifiant d'un intérêt légitime."
                },
                {
                    question: "Que faire si je ne suis pas satisfait des conclusions du Défenseur des Droits ?",
                    answer: "Si les recommandations ne sont pas suivies d'effet ou si vous n'êtes pas satisfait, vous pouvez envisager d'autres recours, notamment judiciaires, après avoir épuisé cette voie amiable."
                }
            ],
            documents: [
                "Pièce d'identité",
                "Preuves de la violation",
                "Coordonnées du plaignant"
            ],
            duration: "Variable (1-6 mois)",
            cost: "Gratuit",
            forms: ["Formulaire de saisine du Défenseur des Droits"]
        },
        {
            id: 31,
            title: "Procédure de recours gracieux",
            category: "Assistance Juridique",
            shortDescription: "Contester une décision administrative sans passer directement par le tribunal",
            description: "<p>Le recours gracieux est une procédure permettant de demander la révision ou l'annulation d'une décision administrative auprès de l'autorité qui l'a prise. Cette démarche amiable constitue souvent une étape préalable obligatoire avant toute saisine du tribunal administratif.</p><br><p>La procédure consiste à rédiger une requête motivée, détaillant les raisons pour lesquelles vous contestez la décision, puis à l'envoyer à l'autorité concernée. Une réponse doit être donnée dans un délai légal, après quoi il est possible de poursuivre devant un juge si nécessaire.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Moyen amiable pour contester une décision administrative",
                "Pas besoin de passer immédiatement par un tribunal",
                "Délai légal pour obtenir une réponse",
                "Possibilité de poursuite judiciaire en cas d'échec"
            ],
            steps: [
                {
                    title: "Rédaction du recours gracieux",
                    details: "Rédigez une lettre ou un mémoire précis et argumenté exposant les motifs de votre contestation. Expliquez pourquoi vous estimez que la décision est illégale ou injuste.",
                    requirements: ["Copie de la décision contestée", "Pièce d'identité", "Justificatif d'intérêt à agir"],
                    duration: "Variable selon la complexité du dossier",
                    tips: ["Soyez clair et concis dans vos arguments", "Joignez tous les documents nécessaires pour appuyer votre demande"]
                },
                {
                    title: "Envoi à l'autorité ayant pris la décision",
                    details: "Transmettez votre recours gracieux par courrier recommandé avec accusé de réception ou déposez-le directement auprès de l'autorité administrative concernée.",
                    requirements: ["Recours gracieux rédigé", "Documents justificatifs"],
                    duration: "Immédiatement après finalisation du recours",
                    tips: ["Conservez une copie de votre envoi", "Privilégiez le courrier recommandé pour prouver la date de dépôt"]
                },
                {
                    title: "Attente de la réponse (délai légal)",
                    details: "L'autorité disposera d'un délai légal (généralement deux mois) pour répondre à votre demande. Elle peut soit annuler ou modifier la décision, soit confirmer sa position.",
                    duration: "1-2 mois",
                    tips: ["Patientez pendant le traitement de votre dossier", "Si aucune réponse n'est reçue dans les délais, cela équivaut à un rejet implicite"]
                },
                {
                    title: "Saisine éventuelle du tribunal administratif",
                    details: "Si votre recours gracieux est rejeté ou si aucune réponse n'est apportée dans les délais impartis, vous pouvez saisir le tribunal administratif pour contester la décision.",
                    duration: "Après expiration du délai légal",
                    tips: ["Consultez un avocat spécialisé en droit administratif si nécessaire", "Préparez soigneusement votre dossier avant toute saisine judiciaire"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce qu'un recours gracieux ?",
                    answer: "Un recours gracieux est une démarche amiable permettant de demander la révision ou l'annulation d'une décision administrative auprès de l'autorité qui l'a prise, avant toute action judiciaire."
                },
                {
                    question: "Quelles décisions peuvent faire l'objet d'un recours gracieux ?",
                    answer: "Toute décision administrative individuelle (refus de permis, sanction disciplinaire, retrait d'une subvention, etc.) peut être contestée par cette voie."
                },
                {
                    question: "Combien coûte un recours gracieux ?",
                    answer: "La procédure de recours gracieux est gratuite. Toutefois, des frais peuvent être engagés si vous faites appel à un conseil juridique pour rédiger votre demande."
                },
                {
                    question: "Que faire si mon recours gracieux est rejeté ?",
                    answer: "En cas de rejet explicite ou implicite (absence de réponse dans les délais), vous pouvez introduire un recours contentieux devant le tribunal administratif pour poursuivre votre contestation."
                }
            ],
            documents: [
                "Copie de la décision contestée",
                "Pièce d'identité",
                "Justificatif d'intérêt à agir"
            ],
            duration: "1-2 mois",
            cost: "Gratuit",
            forms: ["Modèle de recours gracieux"]
        },
// FONCIER ET IMMOBILIER
        {
            id: 32,
            title: "Demande de titre foncier",
            category: "Foncier et Immobilier",
            shortDescription: "Obtenez un titre de propriété définitif pour sécuriser votre terrain",
            description: "<p>La demande de titre foncier est une procédure juridique permettant d'obtenir un document officiel attestant de la propriété d'un terrain. Ce titre garantit vos droits sur le bien immobilier et vous protège contre toute contestation ou intrusion.</p><br><p>Le processus inclut plusieurs étapes importantes telles que la délimitation du terrain, l'établissement du plan cadastral, ainsi qu'une enquête administrative pour s'assurer que personne ne revendique le même terrain. Une fois ces démarches validées, le titre foncier est délivré.</p>",
            image: "assets/images/foncier-immobilier.png",
            keyPoints: [
                "Sécurisation légale de la propriété foncière",
                "Procédure encadrée par les autorités administratives",
                "Nécessite une enquête publique et administrative",
                "Valide pour une durée indéterminée"
            ],
            steps: [
                {
                    title: "Délimitation du terrain",
                    details: "Définissez précisément les limites de votre terrain avec l'aide d'un géomètre agréé. Cette étape est cruciale pour éviter tout conflit futur avec les voisins.",
                    requirements: ["Plan de situation", "Attestation de droit coutumier"],
                    duration: "1-2 mois",
                    tips: ["Engagez un professionnel qualifié", "Communiquez avec les propriétaires voisins pour éviter des litiges"]
                },
                {
                    title: "Établissement du plan cadastral",
                    details: "Le géomètre établit un plan cadastral précis indiquant les coordonnées exactes du terrain. Ce document sera soumis aux autorités compétentes.",
                    requirements: ["Rapport de bornage", "Quittance des frais de bornage"],
                    duration: "1 mois",
                    tips: ["Vérifiez l'exactitude des informations sur le plan", "Conservez une copie du plan pour vos archives"]
                },
                {
                    title: "Publication au journal officiel",
                    details: "Une annonce relative à votre demande de titre foncier est publiée au Journal Officiel pour informer le public et permettre toute opposition éventuelle.",
                    requirements: ["Formulaire de demande de titre foncier", "Documents justificatifs"],
                    duration: "30 jours",
                    tips: ["Suivez attentivement les délais de publication", "Préparez-vous à répondre à toute opposition légitime"]
                },
                {
                    title: "Enquête administrative",
                    details: "Les autorités compétentes mènent une enquête pour vérifier la légalité et la conformité de votre demande. Cela peut inclure des inspections sur place et des consultations auprès des services concernés.",
                    requirements: ["Certificat administratif", "Tous les documents précédemment soumis"],
                    duration: "2-3 mois",
                    tips: ["Collaborez pleinement avec les enquêteurs", "Fournissez toutes les informations demandées dans les délais impartis"]
                },
                {
                    title: "Délivrance du titre",
                    details: "Si toutes les étapes sont validées et qu'aucune opposition n'est retenue, le titre foncier vous est délivré officiellement.",
                    duration: "Après achèvement de l'enquête",
                    tips: ["Vérifiez les informations sur le titre avant de signer", "Conservez précieusement ce document"]
                }
            ],
            faqs: [
                {
                    question: "Qu'est-ce qu'un titre foncier ?",
                    answer: "Un titre foncier est un document officiel qui atteste de la propriété d'un terrain. Il garantit vos droits sur le bien immobilier et vous protège contre toute contestation."
                },
                {
                    question: "Pourquoi dois-je passer par une enquête administrative ?",
                    answer: "L'enquête administrative vise à s'assurer que votre demande ne contrevient pas aux lois foncières et qu'aucun tiers ne revendique le même terrain."
                },
                {
                    question: "Combien coûte une demande de titre foncier ?",
                    answer: "Les coûts varient selon les régions et les superficies, mais ils incluent généralement les frais de bornage, de publication et d'enregistrement. Comptez environ 250 000 FCFA en moyenne."
                },
                {
                    question: "Que faire si mon voisin conteste ma demande de titre foncier ?",
                    answer: "En cas de contestation, l'enquête administrative prendra en compte les arguments de toutes les parties concernées. Si nécessaire, le litige peut être tranché par un tribunal."
                }
            ],
            documents: [
                "Plan de situation",
                "Attestation de droit coutumier",
                "Certificat administratif",
                "Quittance des frais de bornage"
            ],
            duration: "6-12 mois",
            cost: "250 000 FCFA",
            forms: ["Formulaire de demande de titre foncier", "Formulaire de bornage"]
        },
        {
            id: 33,
            title: "Demande de certificat de propriété foncière",
            category: "Foncier et Immobilier",
            shortDescription: "Obtenez un certificat de propriété foncière pour sécuriser votre terrain en zone rurale",
            description: "<p>Le certificat de propriété foncière est un document officiel qui atteste de vos droits sur un bien immobilier situé dans une zone rurale. Cette démarche permet de sécuriser votre patrimoine contre toute contestation ou intrusion.</p><br><p>La procédure inclut la collecte des documents nécessaires, la soumission d'une demande auprès du bureau foncier local, une vérification par les autorités compétentes et, enfin, la délivrance du certificat après validation.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Sécurisation des droits fonciers en zone rurale",
                "Procédure encadrée par les autorités foncières",
                "Vérification obligatoire des informations",
                "Délai de traitement de 3 à 6 mois"
            ],
            steps: [
                {
                    title: "Collecte des documents nécessaires",
                    details: "Réunissez tous les documents requis pour prouver vos droits sur le terrain concerné, tels que le titre foncier antérieur, l'attestation de résidence et le plan cadastral.",
                    requirements: ["Titre foncier antérieur", "Attestation de résidence", "Pièce d'identité du demandeur", "Plan cadastral"],
                    duration: "Variable selon la disponibilité des documents",
                    tips: ["Vérifiez que tous les documents sont à jour", "Préparez des copies supplémentaires si nécessaire"]
                },
                {
                    title: "Demande auprès du bureau foncier local",
                    details: "Soumettez votre dossier complet au bureau foncier local compétent pour entamer la procédure de délivrance du certificat de propriété foncière.",
                    requirements: ["Formulaire de demande rempli", "Documents justificatifs complets"],
                    duration: "Immédiatement après constitution du dossier",
                    tips: ["Prenez rendez-vous si possible pour éviter les files d'attente", "Assurez-vous que votre formulaire est correctement rempli"]
                },
                {
                    title: "Vérification des informations par les autorités",
                    details: "Les autorités compétentes procèdent à une vérification approfondie des informations fournies pour s'assurer de la légalité et de la conformité de votre demande.",
                    duration: "2-4 mois",
                    tips: ["Collaborez pleinement avec les enquêteurs si besoin", "Patientez pendant le processus de vérification"]
                },
                {
                    title: "Délivrance du certificat",
                    details: "Une fois toutes les vérifications effectuées et validées, le certificat de propriété foncière vous sera délivré officiellement.",
                    duration: "Après achèvement des vérifications",
                    tips: ["Vérifiez les informations sur le certificat avant de quitter le bureau", "Conservez précieusement ce document"]
                }
            ],
            faqs: [
                {
                    question: "Quelle est la différence entre un certificat de propriété foncière et un titre foncier ?",
                    answer: "Le certificat de propriété foncière est destiné aux zones rurales et offre une protection juridique simplifiée, tandis que le titre foncier concerne principalement les zones urbaines et offre une sécurité juridique plus complète."
                },
                {
                    question: "Combien coûte la demande de certificat de propriété foncière ?",
                    answer: "Le coût de la procédure est fixé à 150 000 FCFA, incluant les frais d'instruction et de délivrance du certificat."
                },
                {
                    question: "Puis-je faire cette démarche pour un tiers ?",
                    answer: "Oui, mais vous devez fournir une procuration signée par le propriétaire ainsi que ses pièces d'identité."
                },
                {
                    question: "Que faire si mon dossier est rejeté ?",
                    answer: "En cas de rejet, vous pouvez demander une explication écrite des motifs et introduire un recours administratif ou judiciaire selon les circonstances."
                }
            ],
            documents: [
                "Titre foncier antérieur",
                "Attestation de résidence",
                "Pièce d'identité du demandeur",
                "Plan cadastral"
            ],
            duration: "3-6 mois",
            cost: "150 000 FCFA",
            forms: ["Formulaire de demande de certificat foncier"]
        },
        {
            id: 34,
            title: "Demande de permis de construire",
            category: "Foncier et Immobilier",
            shortDescription: "Obtenez une autorisation légale pour entreprendre des travaux de construction",
            description: "<p>Le permis de construire est une autorisation administrative indispensable avant de débuter tout projet de construction, d'aménagement ou de modification importante d'un bien immobilier. Cette démarche vise à garantir que les travaux respectent les règles d'urbanisme locales et nationales.</p><br><p>La procédure nécessite la soumission d'une demande complète au service d'urbanisme compétent, accompagnée des plans détaillés du projet et des documents justificatifs requis.</p>",
            image: "assets/img/Demarche-administrative.png",
            keyPoints: [
                "Autorisation obligatoire pour toute construction",
                "Validation par les services d'urbanisme",
                "Délai de traitement de 1 à 2 mois",
                "Coût variable selon la taille et la nature du projet"
            ],
            steps: [
                {
                    title: "Soumettre une demande au service d'urbanisme",
                    details: "Rendez-vous auprès du service d'urbanisme de votre commune ou préfecture pour initier votre demande de permis de construire. Vous devez remplir un formulaire officiel et y joindre les documents requis.",
                    requirements: ["Formulaire de demande de permis de construire", "Pièce d'identité"],
                    duration: "Immédiatement après préparation du dossier",
                    tips: ["Vérifiez les spécificités locales concernant les documents à fournir", "Privilégiez les horaires où les services sont moins chargés"]
                },
                {
                    title: "Fournir les plans et documents nécessaires",
                    details: "Joignez à votre demande les plans détaillés de votre projet (plan de situation, plan de construction) ainsi que les pièces justificatives relatives à votre terrain et à votre identité.",
                    requirements: ["Plan de situation du terrain", "Plan de construction", "Attestation de propriété foncière"],
                    duration: "Avant dépôt de la demande",
                    tips: ["Engagez un architecte qualifié pour élaborer vos plans", "Assurez-vous que tous les documents sont conformes aux normes locales"]
                },
                {
                    title: "Inspection par l'autorité compétente",
                    details: "Une fois votre dossier déposé, les services d'urbanisme procèdent à une inspection technique et juridique pour vérifier si votre projet respecte les réglementations en vigueur (PLU, servitudes, etc.).",
                    duration: "2-4 semaines",
                    tips: ["Collaborez avec les inspecteurs lors des visites sur site", "Corrigez rapidement tout manquement signalé"]
                },
                {
                    title: "Obtention du permis",
                    details: "Si votre dossier est complet et que votre projet est conforme aux règles d'urbanisme, vous recevrez votre permis de construire, vous autorisant à démarrer les travaux dans les délais impartis.",
                    duration: "Jusqu'à 2 mois après dépôt",
                    tips: ["Vérifiez attentivement les conditions mentionnées dans le permis", "Conservez précieusement ce document pour toute future formalité"]
                }
            ],
            faqs: [
                {
                    question: "Quand dois-je demander un permis de construire ?",
                    answer: "Vous devez obtenir un permis de construire avant de commencer tout projet de construction, extension ou modification importante d'un bâtiment, quelle que soit sa nature."
                },
                {
                    question: "Combien coûte une demande de permis de construire ?",
                    answer: "Les frais varient entre 50 000 et 200 000 FCFA selon la taille et la complexité du projet. Ces coûts incluent les taxes administratives et les éventuels frais d'instruction."
                },
                {
                    question: "Que se passe-t-il si je commence les travaux sans permis ?",
                    answer: "Commencer des travaux sans permis peut entraîner des sanctions pénales, des amendes importantes ou même l'ordre de démolition des constructions illégales."
                },
                {
                    question: "Puis-je faire cette démarche moi-même ou dois-je passer par un professionnel ?",
                    answer: "Vous pouvez effectuer cette démarche seul(e), mais il est souvent recommandé de solliciter l'aide d'un architecte ou d'un expert pour garantir que votre projet respecte toutes les normes requises."
                }
            ],
            documents: [
                "Plan de situation du terrain",
                "Plan de construction",
                "Pièce d'identité",
                "Attestation de propriété foncière"
            ],
            duration: "1-2 mois",
            cost: "50 000 - 200 000 FCFA",
            forms: ["Formulaire de demande de permis de construire"]
        },
        //
        {
            id: 35,
            title: "Vérification de la propriété foncière",
            category: "Foncier et Immobilier",
            description: "Vérification de la propriété foncière pour éviter les litiges ou fraudes",
            steps: [
                "Demander un extrait cadastral",
                "Vérifier les titres fonciers auprès du cadastre",
                "Inspection du terrain et vérification des délimitations"
            ],
            documents: [
                "Extrait cadastral",
                "Pièce d'identité du demandeur",
                "Titre foncier"
            ],
            duration: "1-2 mois",
            cost: "50000 FCFA",
            forms: ["Formulaire de demande d'extrait cadastral"]
        },
        {
            id: 36,
            title: "Transfert de propriété foncière",
            category: "Foncier et Immobilier",
            description: "Procédure pour transférer la propriété d'un bien foncier à une autre personne",
            steps: [
                "Rédaction de l'acte de vente",
                "Soumission à l'autorité compétente pour enregistrement",
                "Paiement des frais de transfert",
                "Enregistrement et délivrance du nouveau titre foncier"
            ],
            documents: [
                "Acte de vente",
                "Pièce d'identité des deux parties",
                "Titre foncier original",
                "Quittance de paiement des taxes"
            ],
            duration: "3-6 mois",
            cost: "200000-500000 FCFA",
            forms: ["Formulaire de transfert de propriété foncière"]
        },
        {
            id: 37,
            title: "Demande de mutation de titre foncier",
            category: "Foncier et Immobilier",
            description: "Procédure pour changer le nom du propriétaire sur le titre foncier",
            steps: [
                "Soumettre une demande de mutation",
                "Fournir les documents nécessaires pour prouver la propriété",
                "Enregistrement et modification des informations sur le titre foncier"
            ],
            documents: [
                "Ancien titre foncier",
                "Acte de décès (si applicable)",
                "Pièce d'identité",
                "Acte notarié de succession"
            ],
            duration: "2-3 mois",
            cost: "100000-300000 FCFA",
            forms: ["Formulaire de demande de mutation de titre foncier"]
        },
        {
            id: 38,
            title: "Demande de rectification de titre foncier",
            category: "Foncier et Immobilier",
            description: "Procédure pour rectifier une erreur sur un titre foncier",
            steps: [
                "Rédaction d'une demande de rectification",
                "Fournir les documents justificatifs",
                "Soumettre la demande à l'autorité compétente",
                "Révision du titre foncier et rectification"
            ],
            documents: [
                "Ancien titre foncier",
                "Pièce d'identité",
                "Documents justifiant l'erreur"
            ],
            duration: "1-3 mois",
            cost: "50000-100000 FCFA",
            forms: ["Formulaire de demande de rectification de titre foncier"]
        },
        {
            id: 39,
            title: "Demande de certificat d'occupation",
            category: "Foncier et Immobilier",
            description: "Procédure pour obtenir un certificat d'occupation pour un terrain non titré",
            steps: [
                "Soumettre une demande au service foncier",
                "Fournir des preuves d'occupation du terrain",
                "Vérification sur le terrain",
                "Délivrance du certificat d'occupation"
            ],
            documents: [
                "Pièce d'identité",
                "Justificatifs de résidence ou occupation",
                "Attestation de non-conflit foncier"
            ],
            duration: "3-6 mois",
            cost: "30000 FCFA",
            forms: ["Formulaire de demande de certificat d'occupation"]
        },
        {
            id: 40,
            title: "Demande de permis d'aménager",
            category: "Foncier et Immobilier",
            description: "Procédure pour obtenir un permis d'aménager un terrain ou un site",
            steps: [
                "Soumettre une demande auprès des autorités compétentes",
                "Fournir des plans d'aménagement",
                "Inspection par l'autorité compétente",
                "Obtention du permis"
            ],
            documents: [
                "Plans d'aménagement",
                "Attestation de propriété foncière",
                "Pièce d'identité",
                "Étude d'impact environnemental (si nécessaire)"
            ],
            duration: "1-3 mois",
            cost: "50000-150000 FCFA",
            forms: ["Formulaire de demande de permis d'aménager"]
        },
        {
            id: 41,
            title: "Enregistrement de bail commercial",
            category: "Foncier et Immobilier",
            description: "Procédure pour enregistrer un contrat de bail commercial auprès des autorités compétentes",
            steps: [
                "Rédaction du contrat de bail",
                "Soumettre le contrat pour enregistrement",
                "Paiement des frais d'enregistrement",
                "Obtention de l'attestation d'enregistrement"
            ],
            documents: [
                "Contrat de bail",
                "Pièce d'identité",
                "Titre de propriété du bailleur",
                "Justificatif de domicile"
            ],
            duration: "1 mois",
            cost: "20000-50000 FCFA",
            forms: ["Formulaire d'enregistrement de bail commercial"]
        },
// DROITS DE LA FAMILLE
        {
            id: 42,
            title: "Demande de pension alimentaire",
            category: "Droits de la Famille",
            description: "Procédure pour obtenir une pension alimentaire pour enfant(s)",
            steps: [
                "Dépôt de la requête",
                "Convocation des parties",
                "Audience de conciliation",
                "Jugement",
                "Exécution de la décision"
            ],
            documents: [
                "Actes de naissance des enfants",
                "Justificatifs de revenus",
                "Justificatifs de charges",
                "Jugement de divorce (si applicable)"
            ],
            duration: "2-3 mois",
            cost: "10000 FCFA",
            forms: ["Formulaire de demande de pension alimentaire"]
        },
        {
            id: 43,
            title: "Demande de garde d'enfant",
            category: "Droits de la Famille",
            description: "Procédure pour déterminer la garde d'un ou plusieurs enfants après une séparation ou un divorce",
            steps: [
                "Dépôt de la demande de garde",
                "Audience de conciliation",
                "Examen des conditions de vie des parents",
                "Jugement sur la garde de l'enfant"
            ],
            documents: [
                "Actes de naissance de l'enfant",
                "Certificat de résidence",
                "Preuves des capacités parentales"
            ],
            duration: "2-3 mois",
            cost: "Gratuit",
            forms: ["Formulaire de demande de garde d'enfant"]
        },
        {
            id: 44,
            title: "Demande de divorce",
            category: "Droits de la Famille",
            description: "Procédure pour mettre fin à un mariage par voie judiciaire",
            steps: [
                "Dépôt de la requête en divorce",
                "Convocation des parties",
                "Audience de conciliation",
                "Jugement de divorce"
            ],
            documents: [
                "Acte de mariage",
                "Actes de naissance des enfants (si applicable)",
                "Justificatifs de résidence",
                "Preuves de l'incompatibilité des conjoints"
            ],
            duration: "3-6 mois",
            cost: "5000 FCFA",
            forms: ["Formulaire de demande de divorce"]
        },
        {
            id: 45,
            title: "Reconnaissance d'enfant",
            category: "Droits de la Famille",
            description: "Procédure pour qu'un père reconnaisse légalement un enfant né hors mariage",
            steps: [
                "Rédaction de la déclaration de reconnaissance",
                "Enregistrement au service d'état civil",
                "Obtention de l'acte de naissance avec mention"
            ],
            documents: [
                "Acte de naissance de l'enfant",
                "Pièce d'identité du père",
                "Preuve de paternité (si nécessaire)"
            ],
            duration: "1-2 mois",
            cost: "Gratuit",
            forms: ["Formulaire de reconnaissance d'enfant"]
        },
        {
            id: 46,
            title: "Changement de nom de famille",
            category: "Droits de la Famille",
            description: "Procédure pour demander le changement de nom de famille d'un enfant",
            steps: [
                "Dépôt de la demande",
                "Examen de la demande par l'autorité compétente",
                "Audience judiciaire",
                "Jugement autorisant le changement de nom"
            ],
            documents: [
                "Acte de naissance de l'enfant",
                "Motifs justifiant la demande",
                "Preuves de l'intérêt de l'enfant"
            ],
            duration: "6-12 mois",
            cost: "5000 FCFA",
            forms: ["Formulaire de demande de changement de nom"]
        },
        {
            id: 47,
            title: "Demande d'adoption",
            category: "Droits de la Famille",
            description: "Procédure pour adopter un enfant, qu'il soit national ou international",
            steps: [
                "Demande d'adoption auprès des autorités",
                "Examen des conditions de l'adoptant",
                "Vérification des conditions de l'enfant",
                "Jugement d'adoption"
            ],
            documents: [
                "Certificat de célibat ou de mariage",
                "Justificatifs de revenus et de domicile",
                "Attestation médicale",
                "Preuves de l'intérêt supérieur de l'enfant"
            ],
            duration: "6-18 mois",
            cost: "Variable selon la situation",
            forms: ["Formulaire de demande d'adoption"]
        },
        {
            id: 48,
            title: "Demande de changement de statut matrimonial",
            category: "Droits de la Famille",
            description: "Procédure pour demander le changement de statut matrimonial (par exemple, changement de nom après mariage)",
            steps: [
                "Dépôt de la demande de changement",
                "Fournir les documents justificatifs",
                "Examen de la demande",
                "Décision de l'autorité compétente"
            ],
            documents: [
                "Acte de mariage",
                "Pièce d'identité",
                "Acte de naissance"
            ],
            duration: "1-2 mois",
            cost: "Gratuit",
            forms: ["Formulaire de demande de changement de statut matrimonial"]
        },
        {
            id: 49,
            title: "Protection des droits des enfants mineurs",
            category: "Droits de la Famille",
            description: "Procédure pour assurer la protection des droits des enfants mineurs en cas de conflit familial",
            steps: [
                "Dépôt d'une plainte ou demande de protection",
                "Examen de la situation de l'enfant",
                "Mise en place de mesures de protection",
                "Suivi de la situation par les autorités"
            ],
            documents: [
                "Acte de naissance de l'enfant",
                "Preuves de la maltraitance ou négligence",
                "Rapports médicaux (si applicable)"
            ],
            duration: "1-3 mois",
            cost: "Gratuit",
            forms: ["Formulaire de demande de protection des droits des enfants"]
        },
        {
            id: 50,
            title: "Demande de révision de pension alimentaire",
            category: "Droits de la Famille",
            description: "Procédure pour modifier le montant ou les modalités de la pension alimentaire",
            steps: [
                "Dépôt de la demande de révision",
                "Examen des changements de situation financière",
                "Audience judiciaire",
                "Jugement sur la révision"
            ],
            documents: [
                "Jugement initial de pension alimentaire",
                "Justificatifs de revenus actuels",
                "Justificatifs de nouvelles charges"
            ],
            duration: "2-3 mois",
            cost: "10000 FCFA",
            forms: ["Formulaire de demande de révision de pension alimentaire"]
        },
        {
            id: 51,
            title: "Demande de protection contre la violence conjugale",
            category: "Droits de la Famille",
            description: "Procédure pour demander une protection contre la violence conjugale",
            steps: [
                "Dépôt de la plainte",
                "Évaluation de la situation",
                "Mise en place de mesures de protection",
                "Suivi judiciaire"
            ],
            documents: [
                "Acte de naissance",
                "Preuves de violence",
                "Certificat médical"
            ],
            duration: "Immédiat",
            cost: "Gratuit",
            forms: ["Formulaire de demande de protection contre la violence"]
        },
// NATIONALITÉ ET IMMIGRATION
        {
            id: 52,
            title: "Demande de nationalité sénégalaise",
            category: "Nationalité et Immigration",
            description: "Procédure d'acquisition de la nationalité sénégalaise par naturalisation",
            steps: [
                "Constitution du dossier",
                "Dépôt au ministère de la Justice",
                "Enquête de moralité",
                "Examen de la demande",
                "Décret de naturalisation"
            ],
            documents: [
                "Acte de naissance",
                "Casier judiciaire",
                "Certificat de résidence",
                "Justificatifs de ressources",
                "Certificat de nationalité d'origine"
            ],
            duration: "12-24 mois",
            cost: "100000 FCFA",
            forms: ["Formulaire de demande de naturalisation"]
        },
        {
            id: 53,
            title: "Demande de visa de long séjour",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir un visa de long séjour pour vivre au Sénégal",
            steps: [
                "Constitution du dossier",
                "Dépôt auprès de l'ambassade ou du consulat",
                "Examen de la demande",
                "Délivrance du visa"
            ],
            documents: [
                "Passeport valide",
                "Justificatif de ressources financières",
                "Lettre d'invitation ou contrat de travail",
                "Attestation de logement"
            ],
            duration: "1-2 mois",
            cost: "Variable selon la durée du visa",
            forms: ["Formulaire de demande de visa de long séjour"]
        },
        {
            id: 54,
            title: "Demande de visa d'études",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir un visa d'études pour étudier au Sénégal",
            steps: [
                "Constitution du dossier d'inscription",
                "Dépôt à l'ambassade ou au consulat",
                "Examen de la demande",
                "Obtention du visa d'études"
            ],
            documents: [
                "Lettre d'admission d'une université sénégalaise",
                "Preuves de capacité financière",
                "Certificat médical",
                "Passeport valide"
            ],
            duration: "1-3 mois",
            cost: "Variable selon la durée",
            forms: ["Formulaire de demande de visa d'études"]
        },
        {
            id: 55,
            title: "Demande de visa touristique",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir un visa touristique pour visiter le Sénégal",
            steps: [
                "Constitution du dossier",
                "Dépôt à l'ambassade ou au consulat",
                "Examen de la demande",
                "Obtention du visa touristique"
            ],
            documents: [
                "Passeport valide",
                "Justificatif de réservation d'hôtel",
                "Justificatif de ressources financières",
                "Billet d'avion"
            ],
            duration: "1-2 mois",
            cost: "Variable",
            forms: ["Formulaire de demande de visa touristique"]
        },
        {
            id: 56,
            title: "Demande de carte de séjour",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir une carte de séjour au Sénégal pour les étrangers",
            steps: [
                "Constitution du dossier",
                "Dépôt au ministère de l'Intérieur",
                "Examen de la demande",
                "Délivrance de la carte de séjour"
            ],
            documents: [
                "Passeport valide",
                "Justificatif de résidence au Sénégal",
                "Certificat de travail ou d'études",
                "Justificatifs de ressources"
            ],
            duration: "3-6 mois",
            cost: "50 000 FCFA",
            forms: ["Formulaire de demande de carte de séjour"]
        },
        {
            id: 57,
            title: "Demande d'asile politique",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir l'asile politique au Sénégal",
            steps: [
                "Dépôt de la demande au Haut-Commissariat des Nations Unies pour les réfugiés (HCR)",
                "Examen de la demande",
                "Entretien avec le demandeur",
                "Décision d'octroi du statut de réfugié"
            ],
            documents: [
                "Passeport ou document d'identité",
                "Preuves de persécution dans le pays d'origine",
                "Certificat médical (si applicable)"
            ],
            duration: "6-12 mois",
            cost: "Gratuit",
            forms: ["Formulaire de demande d'asile"]
        },
        {
            id: 58,
            title: "Demande de carte d'identité sénégalaise",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir une carte d'identité sénégalaise pour les citoyens",
            steps: [
                "Constitution du dossier",
                "Dépôt au centre d'état civil",
                "Enregistrement des empreintes digitales",
                "Délivrance de la carte d'identité"
            ],
            documents: [
                "Acte de naissance sénégalais",
                "Pièce d'identité valide",
                "Justificatif de résidence"
            ],
            duration: "1-2 mois",
            cost: "2000 FCFA",
            forms: ["Formulaire de demande de carte d'identité"]
        },
        {
            id: 59,
            title: "Demande de carte consulaire",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir une carte consulaire pour les Sénégalais résidant à l'étranger",
            steps: [
                "Constitution du dossier",
                "Dépôt à l'ambassade ou au consulat",
                "Examen de la demande",
                "Délivrance de la carte consulaire"
            ],
            documents: [
                "Acte de naissance sénégalais",
                "Justificatif de résidence à l'étranger",
                "Passeport"
            ],
            duration: "1-2 mois",
            cost: "5000 FCFA",
            forms: ["Formulaire de demande de carte consulaire"]
        },
        {
            id: 60,
            title: "Demande de renonciation à la nationalité sénégalaise",
            category: "Nationalité et Immigration",
            description: "Procédure pour renoncer à la nationalité sénégalaise",
            steps: [
                "Constitution du dossier de renonciation",
                "Dépôt au ministère de la Justice",
                "Examen de la demande",
                "Décret de renonciation"
            ],
            documents: [
                "Acte de naissance",
                "Passeport valide",
                "Justificatif de nationalité étrangère"
            ],
            duration: "12-18 mois",
            cost: "50 000 FCFA",
            forms: ["Formulaire de renonciation à la nationalité"]
        },
        {
            id: 61,
            title: "Demande de visa de transit",
            category: "Nationalité et Immigration",
            description: "Procédure pour obtenir un visa de transit pour passer par le Sénégal",
            steps: [
                "Constitution du dossier",
                "Dépôt à l'ambassade ou au consulat",
                "Examen de la demande",
                "Délivrance du visa de transit"
            ],
            documents: [
                "Passeport valide",
                "Billet d'avion de continuation",
                "Justificatif de résidence dans le pays d'origine"
            ],
            duration: "2-4 semaines",
            cost: "Variable",
            forms: ["Formulaire de demande de visa de transit"]
        },
// DOCUMENTATION JURIDIQUE
        {
            id: 62,
            title: "Demande de casier judiciaire",
            category: 'Documentation Juridique',
            description: "Procédure d'obtention d'un extrait de casier judiciaire",
            steps: [
                'Dépôt de la demande',
                'Vérification des informations',
                'Paiement des frais',
                'Retrait du document'
            ],
            documents: [
                'Pièce d\'identité',
                'Copie d\'acte de naissance',
                'Justificatif de domicile'
            ],
            duration: '2-3 jours',
            cost: '2000 FCFA',
            forms: ['Formulaire de demande de casier judiciaire']
        },
        {
            id: 63,
            title: "Demande de certificat de mariage",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir un certificat de mariage auprès des autorités compétentes",
            steps: [
                'Se rendre à l\'officier de l\'état civil',
                'Fournir les informations requises',
                'Payer les frais',
                'Retrait du certificat'
            ],
            documents: [
                'Pièce d\'identité',
                'Acte de mariage'
            ],
            duration: '1-2 jours',
            cost: '1000 FCFA',
            forms: ['Formulaire de demande de certificat de mariage']
        },
        {
            id: 11,
            title: "Demande de certificat de décès",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir un certificat de décès d'une personne décédée au Sénégal",
            steps: [
                'Se rendre à l\'officier de l\'état civil',
                'Fournir les informations requises',
                'Payer les frais',
                'Retrait du certificat'
            ],
            documents: [
                'Pièce d\'identité',
                'Acte de décès'
            ],
            duration: '1-2 jours',
            cost: '1000 FCFA',
            forms: ['Formulaire de demande de certificat de décès']
        },
        {
            id: 12,
            title: "Demande de certificat de résidence",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir un certificat de résidence dans une commune",
            steps: [
                'Se rendre à la mairie de la commune de résidence',
                'Fournir les documents requis',
                'Payer les frais',
                'Retrait du certificat'
            ],
            documents: [
                'Pièce d\'identité',
                'Justificatif de domicile'
            ],
            duration: '1-2 jours',
            cost: '1500 FCFA',
            forms: ['Formulaire de demande de certificat de résidence']
        },
        {
            id: 13,
            title: "Demande d'extrait de jugement",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir un extrait d'un jugement rendu par le tribunal",
            steps: [
                'Se rendre au tribunal ayant rendu le jugement',
                'Fournir les informations nécessaires',
                'Payer les frais',
                'Retrait de l\'extrait'
            ],
            documents: [
                'Pièce d\'identité',
                'Numéro de dossier judiciaire'
            ],
            duration: '3-7 jours',
            cost: '5000 FCFA',
            forms: ['Formulaire de demande d\'extrait de jugement']
        },
        {
            id: 14,
            title: "Demande de certificat de non-gage",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir un certificat de non-gage pour un véhicule",
            steps: [
                'Se rendre à l\'administration des transports',
                'Fournir les informations sur le véhicule',
                'Payer les frais',
                'Retrait du certificat'
            ],
            documents: [
                'Carte grise du véhicule',
                'Pièce d\'identité du propriétaire'
            ],
            duration: '1-2 jours',
            cost: '2000 FCFA',
            forms: ['Formulaire de demande de certificat de non-gage']
        },
        {
            id: 15,
            title: "Demande de copie d'acte de naissance",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir une copie d'acte de naissance auprès des autorités compétentes",
            steps: [
                'Se rendre à l\'officier de l\'état civil',
                'Fournir les informations nécessaires',
                'Payer les frais',
                'Retrait de la copie'
            ],
            documents: [
                'Pièce d\'identité',
                'Informations sur la naissance (date, lieu, parents)'
            ],
            duration: '1-2 jours',
            cost: '1000 FCFA',
            forms: ['Formulaire de demande de copie d\'acte de naissance']
        },
        {
            id: 16,
            title: "Demande de certificat de divorce",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir un certificat de divorce auprès des autorités compétentes",
            steps: [
                'Se rendre au tribunal ayant prononcé le divorce',
                'Fournir les informations nécessaires',
                'Payer les frais',
                'Retrait du certificat'
            ],
            documents: [
                'Pièce d\'identité',
                'Jugement de divorce'
            ],
            duration: '1-2 jours',
            cost: '1000 FCFA',
            forms: ['Formulaire de demande de certificat de divorce']
        },
        {
            id: 17,
            title: "Demande de copie d'acte de mariage",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir une copie d'acte de mariage auprès des autorités compétentes",
            steps: [
                'Se rendre à l\'officier de l\'état civil',
                'Fournir les informations nécessaires',
                'Payer les frais',
                'Retrait de la copie'
            ],
            documents: [
                'Pièce d\'identité',
                'Informations sur le mariage (date, lieu, époux)'
            ],
            duration: '1-2 jours',
            cost: '1000 FCFA',
            forms: ['Formulaire de demande de copie d\'acte de mariage']
        },
        {
            id: 18,
            title: "Demande de certificat d'hérédité",
            category: 'Documentation Juridique',
            description: "Procédure pour obtenir un certificat d'hérédité après un décès",
            steps: [
                'Se rendre à la mairie',
                'Fournir les informations requises',
                'Payer les frais',
                'Retrait du certificat'
            ],
            documents: [
                'Acte de décès',
                'Pièces d\'identité des héritiers'
            ],
            duration: '1-3 jours',
            cost: '2000 FCFA',
            forms: ['Formulaire de demande de certificat d\'hérédité']
        },
// DROITS DU TRAVAIL
        {
            id: 10,
            title: "Déclaration d'accident du travail",
            category: 'Droits du Travail',
            description: "Procédure de déclaration d'un accident survenu dans le cadre professionnel",
            steps: [
                'Information immédiate de l\'employeur',
                'Déclaration à la sécurité sociale',
                'Examen médical',
                'Suivi administratif'
            ],
            documents: [
                'Certificat médical initial',
                'Contrat de travail',
                'Attestation de l\'employeur',
                'Témoignages éventuels'
            ],
            duration: '48 heures pour la déclaration',
            cost: 'Gratuit',
            forms: ['Formulaire de déclaration d\'accident du travail']
        },
        {
            id: 11,
            title: "Demande de congé maternité",
            category: 'Droits du Travail',
            description: "Procédure pour obtenir un congé maternité conformément à la législation en vigueur",
            steps: [
                'Informer l\'employeur du début de la grossesse',
                'Fournir un certificat médical',
                'Soumettre une demande de congé maternité',
                'Suivi des démarches administratives'
            ],
            documents: [
                'Certificat médical attestant de la grossesse',
                'Justificatif d\'emploi',
                'Attestation de l\'employeur'
            ],
            duration: '1 à 3 mois de congé selon les conditions',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de congé maternité']
        },
        {
            id: 12,
            title: "Demande de congé paternité",
            category: 'Droits du Travail',
            description: "Procédure pour obtenir un congé paternité suite à la naissance d'un enfant",
            steps: [
                'Informer l\'employeur de la naissance',
                'Soumettre une demande de congé paternité',
                'Fournir un acte de naissance de l\'enfant'
            ],
            documents: [
                'Acte de naissance de l\'enfant',
                'Justificatif d\'emploi',
                'Attestation de l\'employeur'
            ],
            duration: '5 à 10 jours de congé',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de congé paternité']
        },
        {
            id: 13,
            title: "Demande de certificats de travail",
            category: 'Droits du Travail',
            description: "Procédure pour obtenir un certificat de travail délivré par l'employeur",
            steps: [
                'Faire une demande écrite à l\'employeur',
                'Fournir les informations nécessaires (dates de travail, poste occupé)',
                'Retirer le certificat auprès de l\'employeur'
            ],
            documents: [
                'Lettre de demande',
                'Documents prouvant l\'emploi (contrat, fiche de paie)'
            ],
            duration: '1 à 2 semaines',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de certificat de travail']
        },
        {
            id: 14,
            title: "Déclaration de licenciement",
            category: 'Droits du Travail',
            description: "Procédure de déclaration d'un licenciement auprès des autorités compétentes",
            steps: [
                'Informer l\'employé du licenciement',
                'Envoyer la notification de licenciement',
                'Fournir une lettre de licenciement',
                'Informer l\'inspection du travail'
            ],
            documents: [
                'Lettre de licenciement',
                'Contrat de travail',
                'Attestation de l\'employeur'
            ],
            duration: '1 mois de préavis',
            cost: 'Gratuit',
            forms: ['Formulaire de déclaration de licenciement']
        },
        {
            id: 15,
            title: "Demande de régularisation de contrat de travail",
            category: 'Droits du Travail',
            description: "Procédure pour régulariser un contrat de travail non formalisé par écrit",
            steps: [
                'Soumettre une demande auprès de l\'employeur',
                'Fournir un justificatif d\'emploi',
                'Rédiger un contrat écrit'
            ],
            documents: [
                'Justificatif d\'emploi',
                'Identité de l\'employeur',
                'Ancien contrat verbal (si applicable)'
            ],
            duration: 'Variable',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de régularisation de contrat']
        },
        {
            id: 16,
            title: "Demande de promotion professionnelle",
            category: 'Droits du Travail',
            description: "Procédure pour demander une promotion professionnelle ou une réévaluation de son poste",
            steps: [
                'Soumettre une demande de promotion à l\'employeur',
                'Justifier de ses réalisations',
                'Passer un entretien avec l\'employeur',
                'Attendre la décision'
            ],
            documents: [
                'Rapport de performance',
                'CV actualisé',
                'Lettres de recommandation'
            ],
            duration: '1 à 3 mois',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de promotion professionnelle']
        },
        {
            id: 17,
            title: "Demande de retraite anticipée",
            category: 'Droits du Travail',
            description: "Procédure pour demander une retraite anticipée avant l'âge légal de départ à la retraite",
            steps: [
                'Vérification des conditions d\'éligibilité',
                'Soumettre une demande auprès de l\'employeur',
                'Fournir les pièces justificatives',
                'Réception de la décision'
            ],
            documents: [
                'Pièce d\'identité',
                'Bulletins de salaire',
                'Certificat médical (si nécessaire)'
            ],
            duration: 'Variable',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de retraite anticipée']
        },
        {
            id: 18,
            title: "Demande d\'augmentation salariale",
            category: 'Droits du Travail',
            description: "Procédure pour demander une augmentation salariale auprès de l'employeur",
            steps: [
                'Soumettre une demande formelle',
                'Justification des raisons de l\'augmentation',
                'Entretien avec l\'employeur',
                'Décision de l\'employeur'
            ],
            documents: [
                'Lettre de demande d\'augmentation',
                'Rapport de performance',
                'Documents de comparaison salariale'
            ],
            duration: '1-2 semaines',
            cost: 'Gratuit',
            forms: ['Formulaire de demande d\'augmentation salariale']
        },
        {
            id: 19,
            title: "Demande d'indemnité de chômage",
            category: 'Droits du Travail',
            description: "Procédure pour demander une indemnité de chômage après une perte d'emploi",
            steps: [
                'Faire une demande auprès de l\'organisme compétent',
                'Fournir les pièces justificatives',
                'Suivre le traitement de la demande',
                'Réception de l\'indemnité'
            ],
            documents: [
                'Attestation de chômage',
                'Pièce d\'identité',
                'Justificatifs de travail'
            ],
            duration: 'Variable',
            cost: 'Gratuit',
            forms: ['Formulaire de demande d\'indemnité de chômage']
        },
// DROITS DES CONSOMMATEURS
        {
            id: 12,
            title: "Demande de remboursement produit défectueux",
            category: 'Droits des Consommateurs',
            description: "Procédure pour demander un remboursement ou un échange pour un produit défectueux",
            steps: [
                'Retourner le produit au vendeur',
                'Soumettre une demande de remboursement',
                'Fournir les justificatifs d\'achat',
                'Suivre la réponse du vendeur'
            ],
            documents: [
                'Facture ou reçu d\'achat',
                'Photos du produit défectueux',
                'Lettre de réclamation'
            ],
            duration: '10-30 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de remboursement']
        },
        {
            id: 13,
            title: "Réclamation pour publicité trompeuse",
            category: 'Droits des Consommateurs',
            description: "Procédure pour signaler une publicité mensongère ou trompeuse",
            steps: [
                'Analyser les termes de la publicité',
                'Rédiger une réclamation formelle',
                'Soumettre la réclamation à l\'autorité compétente',
                'Suivi du dossier'
            ],
            documents: [
                'Copie de la publicité',
                'Pièce d\'identité',
                'Preuves de la tromperie'
            ],
            duration: '30-60 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de réclamation pour publicité trompeuse']
        },
        {
            id: 14,
            title: "Dépôt de plainte pour abus de pouvoir commercial",
            category: 'Droits des Consommateurs',
            description: "Procédure pour porter plainte contre une entreprise abusant de sa position dominante",
            steps: [
                'Collecter les preuves d\'abus',
                'Faire une réclamation auprès de l\'autorité de régulation',
                'Soumettre une plainte officielle',
                'Suivi de l\'enquête'
            ],
            documents: [
                'Contrat ou facture concerné',
                'Preuves de l\'abus commercial',
                'Lettre de plainte'
            ],
            duration: '3 à 6 mois',
            cost: 'Gratuit',
            forms: ['Formulaire de plainte pour abus commercial']
        },
        {
            id: 15,
            title: "Demande de compensation pour retard de livraison",
            category: 'Droits des Consommateurs',
            description: "Procédure pour obtenir une compensation en cas de retard dans la livraison d\'un produit",
            steps: [
                'Vérifier les conditions de livraison',
                'Contacter le vendeur pour expliquer la situation',
                'Soumettre une réclamation formelle',
                'Demander une compensation'
            ],
            documents: [
                'Preuve d\'achat',
                'Confirmation de retard de livraison',
                'Échange de correspondances'
            ],
            duration: '7-15 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de compensation']
        },
        {
            id: 16,
            title: "Réclamation pour vente à distance non conforme",
            category: 'Droits des Consommateurs',
            description: "Procédure pour réclamer un remboursement ou échange d\'un produit acheté en ligne, non conforme à la commande",
            steps: [
                'Vérifier les conditions de retour de l\'entreprise',
                'Soumettre une demande de retour ou échange',
                'Joindre les preuves de la non-conformité',
                'Suivi du retour'
            ],
            documents: [
                'Facture d\'achat',
                'Preuve de la non-conformité',
                'Correspondance avec le vendeur'
            ],
            duration: '10-20 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de réclamation pour vente à distance']
        },
        {
            id: 17,
            title: "Requête pour facturation abusive",
            category: 'Droits des Consommateurs',
            description: "Procédure pour contester une facture abusive ou erronée",
            steps: [
                'Analyser les détails de la facture',
                'Contacter le fournisseur pour clarifier',
                'Soumettre une réclamation formelle',
                'Suivi de la procédure'
            ],
            documents: [
                'Facture contestée',
                'Correspondance avec le fournisseur',
                'Preuves de facturation abusive'
            ],
            duration: '15-30 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de contestation de facture']
        },
        {
            id: 18,
            title: "Demande de réparation sous garantie",
            category: 'Droits des Consommateurs',
            description: "Procédure pour obtenir une réparation ou un remplacement sous garantie",
            steps: [
                'Contacter le fabricant ou le vendeur',
                'Soumettre la demande de réparation',
                'Fournir les preuves d\'achat et de défaut',
                'Suivi de l\'intervention'
            ],
            documents: [
                'Preuve d\'achat',
                'Certificat de garantie',
                'Photos du défaut'
            ],
            duration: '15-30 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de réparation sous garantie']
        },
        {
            id: 19,
            title: "Réclamation pour fraude à la carte bancaire",
            category: 'Droits des Consommateurs',
            description: "Procédure pour signaler une fraude impliquant une carte bancaire",
            steps: [
                'Contacter la banque immédiatement',
                'Déposer une plainte auprès des autorités compétentes',
                'Suivre l\'enquête',
                'Obtenir un remboursement si applicable'
            ],
            documents: [
                'Relevé bancaire',
                'Déclaration de fraude',
                'Pièce d\'identité'
            ],
            duration: '30-60 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de réclamation pour fraude bancaire']
        },
        {
            id: 20,
            title: "Demande de remboursement pour vol ou perte de bien",
            category: 'Droits des Consommateurs',
            description: "Procédure pour demander un remboursement suite au vol ou à la perte d'un bien acheté",
            steps: [
                'Signaler le vol ou la perte au vendeur',
                'Contacter l\'assurance si applicable',
                'Soumettre une réclamation formelle',
                'Suivi du dossier'
            ],
            documents: [
                'Preuve d\'achat',
                'Déclaration de vol ou perte',
                'Correspondance avec le vendeur ou l\'assurance'
            ],
            duration: '30-60 jours',
            cost: 'Gratuit',
            forms: ['Formulaire de demande de remboursement pour vol ou perte']
        }
    ];

    getDemarches(): any[] {
        return this.demarches;
    }

}