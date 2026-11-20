export type ThemeId =
  | 'prevention-securite'
  | 'management-organisation'
  | 'qvct'
  | 'normes-iso'
  | 'rse';

export type ChallengeId =
  | 'conformite-sst'
  | 'rps'
  | 'management'
  | 'qvct'
  | 'rse'
  | 'iso'
  | 'efficacite'
  | 'duerp';

export interface ThemeCategory {
  id: ThemeId;
  label: string;
  shortLabel: string;
  description: string;
  subCategories: string[];
}

export interface ChallengeItem {
  id: ChallengeId;
  index: string;
  title: string;
  subtitle: string;
  targetTheme: ThemeId;
  targetMode: 'formation' | 'conseil';
}

export interface FormationItem {
  id: string;
  title: string;
  themeId: ThemeId;
  subCategory: string;
  duration: string;
  format: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  summary: string;
  objectives: string[];
  modules: string[];
  audience: string;
  certification: string;
  challengeIds: ChallengeId[];
}

export interface ConsultingOffer {
  id: string;
  index: string;
  title: string;
  domain: string;
  summary: string;
  deliverables: string[];
  duration: string;
  regulatoryRef: string;
}

export interface Accreditation {
  id: string;
  code: string;
  title: string;
  authority: string;
  description: string;
  scope: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  category: string;
  quote: string;
}

export const SITE_IMAGES = {
  hero: './src/assets/images/hero_consulting_team_1795181079512.jpg',
  conseil: './src/assets/images/conseil_accompagnement_1795181078870.jpg',
  equipe: './src/assets/images/equipe_pilotage_1795181079506.jpg',
  formations: './src/assets/images/formation_atelier_1795181078959.jpg',
} as const;

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
}

export const THEMES: ThemeCategory[] = [
  {
    id: 'prevention-securite',
    label: 'Prévention & Sécurité',
    shortLabel: 'Prévention & Sécurité',
    description:
      'Formations réglementaires et opérationnelles pour protéger vos collaborateurs, répondre aux obligations du Code du travail et structurer votre culture sécurité.',
    subCategories: [
      'CSE (comité social et économique)',
      'Secourisme',
      'Formations de formateur SST',
      'Habilitations électriques',
      'Incendie',
      'Management de la sécurité',
      'Référent Harcèlement',
      'Référent sécurité',
      'Risques physiques',
      'Risques Psychosociaux',
      'Santé Mentale au travail',
    ],
  },
  {
    id: 'management-organisation',
    label: 'Management & Organisation',
    shortLabel: 'Management',
    description:
      'Développez la posture managériale, l’efficacité collective, la conduite d’entretiens et la transmission des savoirs au sein de vos équipes.',
    subCategories: [
      'Management',
      'Animation de réunion',
      'Communication professionnelle',
      'Développement personnel',
      'Entretien individuel',
      'Gestion du temps',
      'Transmission du savoir',
    ],
  },
  {
    id: 'qvct',
    label: 'Qualité de vie et conditions de travail',
    shortLabel: 'QVCT',
    description:
      'Agissez durablement sur le bien-être au travail, la prévention des risques psychosociaux et le climat social de votre organisation.',
    subCategories: [
      'Bien-être au travail',
      'Préserver la santé mentale',
      'Prévenir le harcèlement',
      'Structurer la santé & sécurité au travail',
    ],
  },
  {
    id: 'normes-iso',
    label: 'Normes ISO',
    shortLabel: 'Normes ISO',
    description:
      'Maîtrisez les référentiels ISO 9001, ISO 14001 et ISO 45001 pour piloter vos systèmes de management qualité, environnement et santé-sécurité.',
    subCategories: ['ISO'],
  },
  {
    id: 'rse',
    label: 'Responsabilité sociale des entreprises',
    shortLabel: 'RSE',
    description:
      'Structurez votre démarche RSE et engagez vos équipes dans la transition environnementale et sociale de votre entreprise.',
    subCategories: ['Environnement', 'Généralités RSE'],
  },
];

export const CHALLENGES: ChallengeItem[] = [
  {
    id: 'conformite-sst',
    index: '01',
    title: 'Conformité réglementaire Santé & Sécurité',
    subtitle: 'SST, CSE/CSSCT, habilitations électriques et sécurité incendie.',
    targetTheme: 'prevention-securite',
    targetMode: 'formation',
  },
  {
    id: 'rps',
    index: '02',
    title: 'Risques psychosociaux & Santé mentale',
    subtitle: 'Détecter les signaux faibles, prévenir le stress et former les secouristes PSSM.',
    targetTheme: 'qvct',
    targetMode: 'formation',
  },
  {
    id: 'management',
    index: '03',
    title: 'Management & Leadership',
    subtitle: 'Piloter les équipes, animer les réunions et conduire les entretiens.',
    targetTheme: 'management-organisation',
    targetMode: 'formation',
  },
  {
    id: 'qvct',
    index: '04',
    title: 'Qualité de Vie au Travail (QVCT)',
    subtitle: 'Prévention du harcèlement, dialogue social et équilibre collectif.',
    targetTheme: 'qvct',
    targetMode: 'formation',
  },
  {
    id: 'duerp',
    index: '05',
    title: 'DUERP & Gestion des risques',
    subtitle: 'Évaluation des risques professionnels et plan d’action PAPRIPACT.',
    targetTheme: 'prevention-securite',
    targetMode: 'conseil',
  },
  {
    id: 'iso',
    index: '06',
    title: 'Normes ISO 9001 / 14001 / 45001',
    subtitle: 'Audit interne, mise en conformité et pilotage QHSE.',
    targetTheme: 'normes-iso',
    targetMode: 'formation',
  },
  {
    id: 'efficacite',
    index: '07',
    title: 'Efficacité professionnelle',
    subtitle: 'Gestion du temps, communication assertive et transmission des savoirs.',
    targetTheme: 'management-organisation',
    targetMode: 'formation',
  },
  {
    id: 'rse',
    index: '08',
    title: 'RSE & Transition écologique',
    subtitle: 'Démarche ISO 26000, sobriété énergétique et mobilisation des équipes.',
    targetTheme: 'rse',
    targetMode: 'formation',
  },
];

export const FORMATIONS: FormationItem[] = [
  {
    id: 'stsm-pssm',
    title: 'STSM – Premiers Secours en Santé Mentale (PSSM)',
    themeId: 'qvct',
    subCategory: 'Préserver la santé mentale',
    duration: '2 jours (14h)',
    format: 'Présentiel · Intra & Inter',
    rating: 4.9,
    reviewCount: 84,
    featured: true,
    summary:
      'Acquérir les réflexes d’écoute active et d’orientation graduée pour repérer les troubles de santé mentale au travail et accompagner un collègue en situation critique.',
    objectives: [
      'Identifier les mécanismes des troubles psychiques et des risques psychosociaux',
      'Adopter une posture d’écoute sans jugement avec la juste distance professionnelle',
      'Appliquer un plan d’action gradué face aux situations d’urgence ou de détresse',
      'Préserver son propre équilibre psychologique en tant que secouriste interne',
    ],
    modules: [
      'Module 1 : Santé mentale au travail et facteurs de protection',
      'Module 2 : Repérage des signaux d’alerte (anxiété, épuisement, crise)',
      'Module 3 : Méthode d’intervention en 5 étapes et orientation vers les relais',
      'Module 4 : Mises en situation et préservation de soi',
    ],
    audience: 'Salariés volontaires, membres du CSE, managers, équipes RH.',
    certification: 'Attestation officielle de Secouriste en Santé Mentale · Kit pédagogique inclus',
    challengeIds: ['rps', 'qvct'],
  },
  {
    id: 'cse-cssct-initial',
    title: 'Formation Initiale CSE / CSSCT : Missions Santé, Sécurité et Conditions de Travail',
    themeId: 'prevention-securite',
    subCategory: 'CSE (comité social et économique)',
    duration: '5 jours (35h)',
    format: 'Présentiel · Intra & Inter',
    rating: 4.9,
    reviewCount: 112,
    featured: true,
    summary:
      'Formation obligatoire (article L2315-40 du Code du travail) permettant aux élus du CSE et de la CSSCT de maîtriser leurs prérogatives en prévention des risques professionnels.',
    objectives: [
      'Maîtriser le cadre juridique et les missions SSCT du CSE et de la CSSCT',
      'Savoir analyser un accident du travail (arbre des causes) et mener une inspection',
      'Contribuer activement à la mise à jour du DUERP et au suivi du PAPRIPACT',
      'Exercer le droit d’alerte en cas de danger grave et imminent',
    ],
    modules: [
      'Module 1 : Cadre réglementaire, fonctionnement et moyens des élus',
      'Module 2 : Évaluation des risques professionnels, DUERP et prévention primaire',
      'Module 3 : Visites d’inspection, enquêtes AT/MP et arbre des causes',
      'Module 4 : Prévention des RPS, du harcèlement et rôle consultatif',
    ],
    audience: 'Membres titulaires et suppléants du CSE, membres de la CSSCT (premier mandat).',
    certification: 'Enregistrement préfectoral DREETS · Attestation réglementaire SSCT',
    challengeIds: ['conformite-sst', 'duerp'],
  },
  {
    id: 'referent-harcelement',
    title: 'Référent Harcèlement Sexuel, Moral et Agissements Sexistes',
    themeId: 'qvct',
    subCategory: 'Prévenir le harcèlement',
    duration: '2 jours (14h)',
    format: 'Présentiel ou classe virtuelle',
    rating: 4.9,
    reviewCount: 76,
    featured: true,
    summary:
      'Outiller le référent CSE et le référent RH pour qualifier juridiquement les faits, mener une enquête interne impartiale et déployer une politique de tolérance zéro.',
    objectives: [
      'Distinguer juridiquement harcèlement moral, sexuel et agissements sexistes',
      'Connaître les obligations de l’employeur et le rôle précis du référent',
      'Conduire un entretien de recueil de parole et une enquête interne rigoureuse',
      'Mettre en place des actions de sensibilisation et de prévention durable',
    ],
    modules: [
      'Module 1 : Définitions légales, jurisprudence et impacts sur la santé',
      'Module 2 : Statut, confidentialité et légitimité du référent harcèlement',
      'Module 3 : Protocole de signalement et méthodologie d’enquête paritaire',
      'Module 4 : Plan de prévention et communication interne',
    ],
    audience: 'Référents CSE et RH obligatoires (entreprises de 11 à 250+ salariés), dirigeants.',
    certification: 'Attestation de compétence Référent Harcèlement · Boîte à outils incluse',
    challengeIds: ['qvct', 'conformite-sst'],
  },
  {
    id: 'sst-initial',
    title: 'Sauveteur Secouriste du Travail (SST) — Formation Initiale',
    themeId: 'prevention-securite',
    subCategory: 'Secourisme',
    duration: '2 jours (14h)',
    format: 'Présentiel · Intra & Inter',
    rating: 5.0,
    reviewCount: 164,
    featured: true,
    summary:
      'Former vos collaborateurs à porter secours efficacement face à une situation d’accident du travail tout en devenant acteurs de la prévention sur site.',
    objectives: [
      'Intervenir face à une situation d’accident : protéger, examiner, faire alerter, secourir',
      'Maîtriser les gestes d’urgence (hémorragie, étouffement, arrêt cardiaque, DAE)',
      'Repérer les situations dangereuses dans son environnement de travail',
      'Relayer l’information auprès de l’encadrement et du service HSE',
    ],
    modules: [
      'Module 1 : Le rôle du SST dans l’entreprise et chaîne de secours',
      'Module 2 : Protéger et examiner la victime · Alerter les secours',
      'Module 3 : Secourir — gestes pratiques et défibrillation automatisée',
      'Module 4 : Situations inhérentes aux risques spécifiques de l’entreprise',
    ],
    audience: 'Tout salarié souhaitant obtenir le certificat de Sauveteur Secouriste du Travail.',
    certification: 'Certificat SST délivré sous habilitation INRS (valable 24 mois)',
    challengeIds: ['conformite-sst'],
  },
  {
    id: 'rps-managers',
    title: 'Formation RPS Managers : Prévenir, Repérer et Agir au Quotidien',
    themeId: 'prevention-securite',
    subCategory: 'Risques Psychosociaux',
    duration: '1 jour (7h)',
    format: 'Présentiel ou distanciel synchrone',
    rating: 4.8,
    reviewCount: 68,
    featured: true,
    summary:
      'Donner aux managers de proximité les clés pour identifier les facteurs de risques psychosociaux, réguler la charge de travail et conduire des échanges apaisés.',
    objectives: [
      'Comprendre les 6 familles de facteurs de risques psychosociaux (rapport Gollac)',
      'Repérer précocement les signaux de surcharge, d’isolement ou de conflit',
      'Adapter son management pour prévenir l’épuisement et soutenir la motivation',
      'Orienter efficacement vers la médecine du travail, les RH ou le CSE',
    ],
    modules: [
      'Module 1 : Enjeux juridiques et humains des RPS pour l’encadrement',
      'Module 2 : Lecture des signaux faibles individuels et collectifs',
      'Module 3 : Entretiens managériaux de régulation et gestion des tensions',
      'Module 4 : Plan d’action managérial de prévention primaire',
    ],
    audience: 'Managers opérationnels, chefs d’équipe, directeurs de site, responsables RH.',
    certification: 'Attestation de fin de formation · Grille d’observation managériale',
    challengeIds: ['rps', 'management'],
  },
  {
    id: 'management-operationnel',
    title: 'Management Opérationnel : Fédérer et Piloter la Performance Durable',
    themeId: 'management-organisation',
    subCategory: 'Management',
    duration: '3 jours (21h)',
    format: 'Présentiel · Intra & Inter',
    rating: 4.9,
    reviewCount: 91,
    featured: true,
    summary:
      'Structurer sa posture de manager, fixer des objectifs clairs, déléguer avec méthode et développer l’autonomie ainsi que l’engagement de ses collaborateurs.',
    objectives: [
      'Asseoir sa légitimité managériale et adapter son style selon la maturité de l’équipe',
      'Fixer des objectifs mesurables et assurer un suivi constructif sans micro-management',
      'Maîtriser la délégation responsabilisante et les feedbacks de recadrage ou de valorisation',
      'Prévenir et résoudre les situations conflictuelles avec assertivité',
    ],
    modules: [
      'Module 1 : Posture du manager coach et diagnostic des styles de leadership',
      'Module 2 : Pilotage de la performance, délégation et priorisation',
      'Module 3 : Communication managériale, feedback DESC et gestion des tensions',
      'Module 4 : Accompagnement du changement et cohésion d’équipe',
    ],
    audience: 'Managers nouvellement nommés ou managers expérimentés souhaitant structurer leurs pratiques.',
    certification: 'Attestation de compétences managériales DIDAS & BROTHERS',
    challengeIds: ['management', 'efficacite'],
  },
  {
    id: 'formateur-sst',
    title: 'Formation de Formateur SST (FI Formateur SST)',
    themeId: 'prevention-securite',
    subCategory: 'Formations de formateur SST',
    duration: '8 jours (56h)',
    format: 'Présentiel',
    rating: 4.9,
    reviewCount: 34,
    featured: false,
    summary:
      'Devenir formateur certifié INRS capable de concevoir, animer et évaluer des sessions SST initiales et MAC SST en entreprise ou en organisme.',
    objectives: [
      'Maîtriser les guides techniques et pédagogiques SST de l’INRS',
      'Construire une progression pédagogique adaptée aux risques du secteur',
      'Évaluer les stagiaires selon les grilles certificatives officielles',
    ],
    modules: [
      'Module 1 : Dispositif SST, rôle du formateur et prévention en entreprise',
      'Module 2 : Ingénierie pédagogique et conduite de séquences pratiques',
      'Module 3 : Évaluations certificatives et gestion administrative FORPREV',
    ],
    audience: 'Préventeurs HSE, responsables sécurité, formateurs internes titulaires du SST à jour.',
    certification: 'Certificat de Formateur SST délivré sous habilitation INRS',
    challengeIds: ['conformite-sst'],
  },
  {
    id: 'habilitations-electriques',
    title: 'Habilitations Électriques (B0, H0, BS, BE Manœuvre, B1V, B2V, BR, BC)',
    themeId: 'prevention-securite',
    subCategory: 'Habilitations électriques',
    duration: '1 à 3 jours selon indice',
    format: 'Présentiel sur site ou plateau technique',
    rating: 4.8,
    reviewCount: 95,
    featured: false,
    summary:
      'Conformité norme NF C18-510 : former le personnel non électricien et électricien à travailler en sécurité au voisinage ou sur des installations électriques.',
    objectives: [
      'Identifier les dangers du courant électrique et les zones d’environnement',
      'Appliquer les prescriptions de sécurité de la norme NF C18-510',
      'Réaliser des manœuvres, consignations ou interventions selon le titre visé',
    ],
    modules: [
      'Module 1 : Grandeurs électriques, effets sur le corps humain et prévention',
      'Module 2 : Domaines de tension, EPI, EPC et procédures de consignation',
      'Module 3 : Épreuves théoriques et mises en situation pratiques sur armoire',
    ],
    audience: 'Personnel de maintenance, agents techniques, opérateurs de production, encadrement.',
    certification: 'Avis après formation pour délivrance du titre d’habilitation par l’employeur',
    challengeIds: ['conformite-sst'],
  },
  {
    id: 'incendie-manipulation-extincteurs',
    title: 'Sécurité Incendie : Équipier de Première Intervention (EPI) & Évacuation',
    themeId: 'prevention-securite',
    subCategory: 'Incendie',
    duration: '0,5 à 1 jour',
    format: 'Présentiel sur site avec bac à feu écologique',
    rating: 4.9,
    reviewCount: 118,
    featured: false,
    summary:
      'Savoir donner l’alerte, manipuler les moyens de première intervention et organiser l’évacuation des locaux en toute sécurité (guide-file et serre-file).',
    objectives: [
      'Comprendre le triangle du feu, les classes de feux et les agents extincteurs',
      'Manipuler en sécurité les différents extincteurs sur feux réels contrôlés',
      'Assurer les rôles de guide-file et serre-file lors d’une alarme incendie',
    ],
    modules: [
      'Module 1 : Théorie du feu, fumées et consignes de sécurité de l’établissement',
      'Module 2 : Procédure d’évacuation et gestion du point de rassemblement',
      'Module 3 : Exercices pratiques d’extinction sur générateur de flammes',
    ],
    audience: 'Tout collaborateur désigné EPI, guide-file ou serre-file.',
    certification: 'Attestation réglementaire de formation Sécurité Incendie (Art. R4227-39)',
    challengeIds: ['conformite-sst'],
  },
  {
    id: 'prap-gestes-postures',
    title: 'Acteur PRAP IBC & Prévention des Troubles Musculosquelettiques (TMS)',
    themeId: 'prevention-securite',
    subCategory: 'Risques physiques',
    duration: '2 jours (14h)',
    format: 'Présentiel · Intra-entreprise',
    rating: 4.8,
    reviewCount: 73,
    featured: false,
    summary:
      'Réduire les accidents liés à l’activité physique en formant les salariés à analyser leur poste de travail et à proposer des améliorations ergonomiques.',
    objectives: [
      'Comprendre le fonctionnement du corps humain et les atteintes liées aux TMS',
      'Observer et analyser sa situation de travail pour repérer les déterminants',
      'Adopter les principes de sécurité physique et d’économie d’effort',
    ],
    modules: [
      'Module 1 : Enjeux des TMS et risques liés à l’activité physique',
      'Module 2 : Anatomie, biomécanique et gestes économes en poste réel',
      'Module 3 : Propositions d’amélioration technique et organisationnelle',
    ],
    audience: 'Opérateurs industrie, bâtiment, logistique, commerce et secteur tertiaire.',
    certification: 'Certificat Acteur PRAP IBC délivré sous habilitation INRS',
    challengeIds: ['conformite-sst'],
  },
  {
    id: 'referent-securite-duerp',
    title: 'Référent Sécurité & Pilotage du DUERP (Document Unique)',
    themeId: 'prevention-securite',
    subCategory: 'Référent sécurité',
    duration: '2 jours (14h)',
    format: 'Présentiel ou mixte',
    rating: 4.9,
    reviewCount: 49,
    featured: false,
    summary:
      'Permettre au salarié désigné compétent (art. L4644-1) de structurer la démarche d’évaluation des risques, piloter le DUERP et animer le PAPRIPACT.',
    objectives: [
      'Maîtriser les obligations réglementaires de l’employeur et du référent sécurité',
      'Construire une méthodologie de cotation et de mise à jour du DUERP',
      'Déployer le plan d’action annuel (PAPRIPACT) avec le CSE et la médecine du travail',
    ],
    modules: [
      'Module 1 : Cadre légal du salarié compétent en santé et sécurité',
      'Module 2 : Cartographie des unités de travail et cotation des risques',
      'Module 3 : Suivi des plans d’action et culture sécurité participative',
    ],
    audience: 'Référents sécurité désignés, responsables QSE, dirigeants de PME/ETI.',
    certification: 'Attestation de compétence Référent Sécurité · Trame DUERP fournie',
    challengeIds: ['duerp', 'conformite-sst'],
  },
  {
    id: 'management-securite-encadrement',
    title: 'Management de la Sécurité pour l’Encadrement de Proximité',
    themeId: 'prevention-securite',
    subCategory: 'Management de la sécurité',
    duration: '1 jour (7h)',
    format: 'Présentiel',
    rating: 4.9,
    reviewCount: 58,
    featured: false,
    summary:
      'Passer d’une sécurité subie à une culture sécurité partagée grâce aux causeries sécurité, visites comportementales et recadrages constructifs.',
    objectives: [
      'Incarner l’exemplarité sécurité et comprendre le modèle de responsabilité partagée',
      'Animer des quarts d’heure sécurité courts et engageants sur le terrain',
      'Réagir efficacement face aux écarts de comportement sans braquer les équipes',
    ],
    modules: [
      'Module 1 : Responsabilité civile/pénale et facteurs humains des accidents',
      'Module 2 : Rituels de prévention : causeries et visites sécurité',
      'Module 3 : Feedback sécurité et ancrage des bonnes pratiques',
    ],
    audience: 'Chefs d’équipe, conducteurs de travaux, responsables d’atelier et de production.',
    certification: 'Attestation de formation Management de la Sécurité',
    challengeIds: ['conformite-sst', 'management'],
  },
  {
    id: 'animation-reunion-efficace',
    title: 'Animer des Réunions Efficaces et Décisionnelles',
    themeId: 'management-organisation',
    subCategory: 'Animation de réunion',
    duration: '1 jour (7h)',
    format: 'Présentiel ou classe virtuelle',
    rating: 4.8,
    reviewCount: 44,
    featured: false,
    summary:
      'Préparer, structurer et dynamiser vos réunions en présentiel ou hybrides pour réduire les pertes de temps et aboutir à des décisions claires.',
    objectives: [
      'Définir un ordre du jour orienté décisions et maîtriser le timing',
      'Utiliser des techniques d’animation participatives et gérer les personnalités difficiles',
      'Formaliser un compte-rendu actionnable avec suivi des engagements',
    ],
    modules: [
      'Module 1 : Préparation stratégique et choix du format de réunion',
      'Module 2 : Techniques de facilitation et régulation des échanges',
      'Module 3 : Clôture décisionnelle et suivi des plans d’action',
    ],
    audience: 'Managers, chefs de projet, coordinateurs, fonctions support.',
    certification: 'Attestation de formation DIDAS & BROTHERS',
    challengeIds: ['efficacite', 'management'],
  },
  {
    id: 'entretien-individuel-annuel',
    title: 'Conduire les Entretiens Annuels et Professionnels avec Impact',
    themeId: 'management-organisation',
    subCategory: 'Entretien individuel',
    duration: '1 jour (7h)',
    format: 'Présentiel ou classe virtuelle',
    rating: 4.9,
    reviewCount: 52,
    featured: false,
    summary:
      'Transformer l’entretien annuel et professionnel en levier d’engagement, d’évaluation objective et de développement des compétences.',
    objectives: [
      'Distinguer les objectifs et obligations légales des entretiens annuels et professionnels',
      'Préparer une grille d’évaluation factuelle exempte de biais cognitifs',
      'Formuler des objectifs SMART et coconstruire le plan de développement',
    ],
    modules: [
      'Module 1 : Cadre légal et préparation structurée de l’entretien',
      'Module 2 : Posture d’écoute, questionnement et gestion des désaccords',
      'Module 3 : Jeux de rôle et rédaction de la synthèse d’entretien',
    ],
    audience: 'Managers, responsables RH, dirigeants de PME.',
    certification: 'Attestation de formation · Kit grilles d’entretien',
    challengeIds: ['management', 'efficacite'],
  },
  {
    id: 'gestion-temps-priorites',
    title: 'Gestion du Temps, des Priorités et Charge Mentale',
    themeId: 'management-organisation',
    subCategory: 'Gestion du temps',
    duration: '1 jour (7h)',
    format: 'Présentiel ou classe virtuelle',
    rating: 4.8,
    reviewCount: 61,
    featured: false,
    summary:
      'Reprendre le contrôle de son agenda, arbitrer entre l’urgent et l’important, canaliser les interruptions et préserver son efficacité durable.',
    objectives: [
      'Auditer ses voleurs de temps et identifier ses rythmes de concentration',
      'Appliquer les matrices de priorisation (Eisenhower, Pareto, Timeboxing)',
      'Savoir dire non avec diplomatie et maîtriser la surcharge informationnelle',
    ],
    modules: [
      'Module 1 : Diagnostic personnel de gestion du temps',
      'Module 2 : Méthodes d’organisation et planification réaliste',
      'Module 3 : Communication assertive face aux urgences des autres',
    ],
    audience: 'Tout collaborateur, cadre, assistant(e) de direction ou manager.',
    certification: 'Attestation de formation DIDAS & BROTHERS',
    challengeIds: ['efficacite', 'qvct'],
  },
  {
    id: 'communication-professionnelle',
    title: 'Communication Professionnelle et Assertivité en Entreprise',
    themeId: 'management-organisation',
    subCategory: 'Communication professionnelle',
    duration: '2 jours (14h)',
    format: 'Présentiel · Intra & Inter',
    rating: 4.9,
    reviewCount: 47,
    featured: false,
    summary:
      'Développer une communication claire, constructive et empathique pour fluidifier les relations interservices et gérer les situations délicates.',
    objectives: [
      'Identifier son profil de communication et s’adapter à son interlocuteur',
      'Pratiquer l’écoute active et la Communication Non Violente (OSBD)',
      'Exprimer un désaccord ou une demande complexe sans agressivité ni passivité',
    ],
    modules: [
      'Module 1 : Mécanismes de la communication interpersonnelle',
      'Module 2 : Assertivité, écoute active et reformulation',
      'Module 3 : Mises en situation de désamorçage de tensions',
    ],
    audience: 'Managers, équipes projets, commerciaux, services clients et fonctions transverses.',
    certification: 'Attestation de formation DIDAS & BROTHERS',
    challengeIds: ['efficacite', 'qvct'],
  },
  {
    id: 'normes-iso-9001-45001',
    title: 'Maîtriser les Normes ISO 9001 (Qualité) & ISO 45001 (Santé-Sécurité) — Audit Interne',
    themeId: 'normes-iso',
    subCategory: 'ISO',
    duration: '3 jours (21h)',
    format: 'Présentiel ou mixte',
    rating: 4.9,
    reviewCount: 38,
    featured: false,
    summary:
      'Comprendre la structure HLS des normes ISO, déployer l’approche par les risques et réaliser des audits internes à forte valeur ajoutée.',
    objectives: [
      'Décrypter les exigences clés des normes ISO 9001 v2015 et ISO 45001 v2018',
      'Piloter les processus, indicateurs et plans d’actions d’amélioration continue',
      'Préparer, conduire et restituer un audit interne selon la norme ISO 19011',
    ],
    modules: [
      'Module 1 : Architecture HLS et principes du management QSE',
      'Module 2 : Exigences documentaires, approche risques et conformité',
      'Module 3 : Pratique de l’audit interne et rédaction des constats',
    ],
    audience: 'Responsables QHSE, auditeurs internes, pilotes de processus, dirigeants.',
    certification: 'Certificat d’Auditeur Interne QSE DIDAS & BROTHERS',
    challengeIds: ['iso'],
  },
  {
    id: 'rse-strategie-entreprise',
    title: 'Structurer et Déployer une Démarche RSE (ISO 26000) & Sobriété Environnementale',
    themeId: 'rse',
    subCategory: 'Généralités RSE',
    duration: '2 jours (14h)',
    format: 'Présentiel ou mixte',
    rating: 4.8,
    reviewCount: 29,
    featured: false,
    summary:
      'Traduire les 7 questions centrales de l’ISO 26000 en feuille de route concrète, mesurer vos impacts environnementaux et mobiliser vos parties prenantes.',
    objectives: [
      'Comprendre les enjeux réglementaires (CSRD, bilan carbone) et stratégiques de la RSE',
      'Réaliser un premier diagnostic de matérialité avec vos parties prenantes',
      'Définir des indicateurs RSE pragmatiques et embarquer les collaborateurs',
    ],
    modules: [
      'Module 1 : Fondamentaux de la RSE et référentiel ISO 26000',
      'Module 2 : Diagnostic des enjeux environnementaux, sociaux et éthiques',
      'Module 3 : Feuille de route RSE, gouvernance et communication responsable',
    ],
    audience: 'Dirigeants, responsables RSE/QSE, responsables RH et membres de CODIR.',
    certification: 'Attestation de compétence Pilotage RSE',
    challengeIds: ['rse'],
  },
];

export const CONSULTING_OFFERS: ConsultingOffer[] = [
  {
    id: 'conseil-duerp',
    index: '01',
    title: 'Audit & Élaboration du DUERP / PAPRIPACT',
    domain: 'Prévention des Risques Professionnels',
    summary:
      'Diagnostic exhaustif sur site par un consultant IPRP, cotation objective des risques par unité de travail et co-construction du programme annuel de prévention (PAPRIPACT).',
    deliverables: [
      'Document Unique d’Évaluation des Risques (DUERP) conforme Loi Santé au Travail',
      'Plan d’action hiérarchisé et budgété (PAPRIPACT)',
      'Restitution devant le CSE / CSSCT et accompagnement au suivi annuel',
    ],
    duration: 'Mission de 3 à 10 jours selon effectif',
    regulatoryRef: 'Articles R4121-1 à R4121-4 du Code du travail · IPRP enregistré DREETS',
  },
  {
    id: 'conseil-rps-qvct',
    index: '02',
    title: 'Diagnostic RPS & Démarche QVCT Structurée',
    domain: 'Santé Mentale & Climat Social',
    summary:
      'Accompagnement méthodologique reconnu CARSAT : enquête paritaire, entretiens collectifs, identification des facteurs de tension et accord ou plan d’action QVCT durable.',
    deliverables: [
      'Rapport de diagnostic RPS anonyme et cartographie des facteurs de risque',
      'Ateliers de co-construction avec direction, managers et représentants du personnel',
      'Dispositif de suivi d’indicateurs QVCT et formation des relais internes',
    ],
    duration: 'Accompagnement de 4 à 12 semaines',
    regulatoryRef: 'Référencement Consultants Prévention RPS CARSAT',
  },
  {
    id: 'conseil-iso',
    index: '03',
    title: 'Accompagnement Certification ISO 9001, 14001 & 45001',
    domain: 'Systèmes de Management QHSE',
    summary:
      'Déploiement opérationnel de votre système de management Qualité, Environnement ou Santé-Sécurité jusqu’à l’audit blanc et l’obtention de la certification tierce partie.',
    deliverables: [
      'Audit initial d’écart par rapport aux exigences de la norme visée',
      'Structuration des processus, indicateurs et revue de direction',
      'Audit blanc complet et levée des écarts avant audit de certification',
    ],
    duration: 'Accompagnement modulable de 3 à 9 mois',
    regulatoryRef: 'Référentiels ISO 9001 · ISO 14001 · ISO 45001 · ISO 19011',
  },
  {
    id: 'conseil-rse',
    index: '04',
    title: 'Stratégie RSE & Bilan Carbone Opérationnel',
    domain: 'Performance Durable & ESG',
    summary:
      'Structuration de votre politique de Responsabilité Sociétale (ISO 26000 / Lucie / Ecovadis) et feuille de route de décarbonation adaptée aux PME et ETI.',
    deliverables: [
      'Analyse de double matérialité et cartographie des parties prenantes',
      'Feuille de route RSE chiffrée à horizon 3 ans',
      'Préparation aux évaluations EcoVadis, B Corp ou exigences donneurs d’ordres',
    ],
    duration: 'Mission de 5 à 15 jours',
    regulatoryRef: 'Norme ISO 26000 · Directives CSRD & Transition écologique',
  },
];

export const ACCREDITATIONS: Accreditation[] = [
  {
    id: 'inrs',
    code: 'INRS',
    title: 'Habilitation INRS',
    authority: 'Institut National de Recherche et de Sécurité',
    description:
      'Le cabinet DIDAS & BROTHERS est habilité par l’INRS pour les formations de Sauveteur Secouriste du Travail (SST), d’Acteur PRAP (Prévention des Risques liés à l’Activité Physique) et les formations de Formateurs SST.',
    scope: 'SST · MAC SST · PRAP IBC · Formateur SST',
  },
  {
    id: 'dreets',
    code: 'DREETS',
    title: 'Ministère du Travail & IPRP',
    authority: 'Enregistrement préfectoral DREETS',
    description:
      'Enregistrement préfectoral officiel pour dispenser les formations obligatoires des membres du CSE et de la CSSCT (santé, sécurité et conditions de travail). Reconnu IPRP personne morale pour le conseil en prévention.',
    scope: 'CSE / CSSCT (L2315-40) · IPRP Santé & Sécurité · DUERP',
  },
  {
    id: 'carsat',
    code: 'CARSAT',
    title: 'Reconnaissance CARSAT',
    authority: 'Caisse d’Assurance Retraite et de la Santé au Travail',
    description:
      'Reconnu en qualité de « Consultants en prévention des Risques Psychosociaux ». Cette reconnaissance permet aux entreprises éligibles de mobiliser les dispositifs d’aides financières et subventions prévention.',
    scope: 'Diagnostic RPS · Subventions prévention PME',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Aurélie Blanchard',
    role: 'Responsable Formation & Gestion des Compétences',
    company: 'Groupe Industriel Atlantique',
    rating: 5,
    date: '14 octobre 2026',
    category: 'Prévention & Sécurité',
    quote:
      'L’équipe DIDAS & BROTHERS fait preuve d’une grande réactivité et d’une souplesse précieuse dans la planification de nos sessions SST et habilitations. Les intervenants maîtrisent parfaitement la réalité du terrain industriel.',
  },
  {
    id: 't2',
    author: 'Emmanuel Le Coz',
    role: 'Directeur Administratif et Financier',
    company: 'Menuiserie Bouvet',
    rating: 5,
    date: '02 novembre 2026',
    category: 'Management & Organisation',
    quote:
      'Un partenaire engagé et pragmatique. Nos managers de proximité ont immédiatement transposé les méthodes d’animation de causeries et d’entretiens individuels sur les lignes de production.',
  },
  {
    id: 't3',
    author: 'Christophe Lucazeau',
    role: 'Directeur d’Établissement',
    company: 'Résidence & Accompagnement Rochas',
    rating: 5,
    date: '28 octobre 2026',
    category: 'Incendie & DUERP',
    quote:
      'Avec un interlocuteur dédié qui connaît parfaitement nos contraintes médico-sociales, nous avons bâti un DUERP rigoureux et formé l’ensemble des équipes à la sécurité incendie et à l’évacuation en toute sérénité.',
  },
  {
    id: 't4',
    author: 'Marina Gry',
    role: 'Responsable RH France',
    company: 'Ziegler Logistique',
    rating: 5,
    date: '12 novembre 2026',
    category: 'CSE & Harcèlement',
    quote:
      'De la réponse aux obligations réglementaires du CSE jusqu’à la création de modules sur mesure Référent Harcèlement et RPS, leurs interventions apportent un gain mesurable en sécurité juridique et en qualité de vie au travail.',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'm1',
    initials: 'LD',
    name: 'Laurent Didas',
    role: 'Associé fondateur · Directeur Conseil & IPRP',
    specialty: 'Stratégie de prévention, DUERP & accompagnement de dirigeants',
    experience: '18 ans d’expérience en conseil QHSE et management industriel',
  },
  {
    id: 'm2',
    initials: 'SD',
    name: 'Samuel Didas',
    role: 'Associé · Directeur Pédagogique & Formateur',
    specialty: 'Management opérationnel, dialogue social CSE/CSSCT & PSSM',
    experience: '15 ans d’expérience en ingénierie pédagogique certifiée Qualiopi',
  },
  {
    id: 'm3',
    initials: 'CL',
    name: 'Claire Lemercier',
    role: 'Consultante Senior RPS & QVCT',
    specialty: 'Diagnostics psychosociaux CARSAT, médiation et prévention harcèlement',
    experience: 'Psychologue du travail · 12 ans d’intervention en ETI & secteur public',
  },
  {
    id: 'm4',
    initials: 'TM',
    name: 'Thomas Moreau',
    role: 'Responsable Pôle Sécurité & Habilitations',
    specialty: 'Formateur de formateurs SST INRS, PRAP, incendie & ISO 45001',
    experience: '14 ans d’expertise prévention terrain et audits conformité',
  },
];
