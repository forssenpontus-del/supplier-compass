export interface QuizOption {
  label: string;
  /** Weight multipliers per dimension (0-2). 1 = neutral. */
  weights: {
    sovereignty?: number;
    gdpr?: number;
    nis2?: number;
    dora?: number;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  description: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "industry",
    question: "Vilken sektor verkar din organisation inom?",
    description: "Sektorn avgör vilka regelverk som väger tyngst.",
    options: [
      { label: "Finans / försäkring", weights: { dora: 2, nis2: 1.4, sovereignty: 1.2 } },
      { label: "Hälso- och sjukvård", weights: { gdpr: 1.8, nis2: 1.6, sovereignty: 1.3 } },
      { label: "Energi / kritisk infrastruktur", weights: { nis2: 2, sovereignty: 1.6, gdpr: 1 } },
      { label: "Offentlig sektor", weights: { sovereignty: 2, gdpr: 1.6, nis2: 1.3 } },
      { label: "Tech / SaaS", weights: { gdpr: 1.4, nis2: 1.2, sovereignty: 1.2 } },
      { label: "Annat / generellt företag", weights: { gdpr: 1.2, sovereignty: 1, nis2: 1, dora: 1 } },
    ],
  },
  {
    id: "data",
    question: "Vilken typ av data hanterar ni främst?",
    description: "Känslig data kräver striktare jurisdiktionskrav.",
    options: [
      { label: "Personuppgifter (kunder, anställda)", weights: { gdpr: 1.8, sovereignty: 1.4 } },
      { label: "Hälso- eller biometrisk data", weights: { gdpr: 2, sovereignty: 1.6, nis2: 1.2 } },
      { label: "Finansiell data / transaktioner", weights: { dora: 1.8, gdpr: 1.4, sovereignty: 1.2 } },
      { label: "Affärshemligheter / IP", weights: { sovereignty: 1.8, nis2: 1.4 } },
      { label: "Publik / icke-känslig data", weights: { gdpr: 0.8, sovereignty: 0.7 } },
    ],
  },
  {
    id: "sovereignty",
    question: "Hur viktig är digital suveränitet?",
    description: "Suveränitet = oberoende från icke-EU-jurisdiktioner som CLOUD Act eller FISA 702.",
    options: [
      { label: "Kritiskt — endast EU-bolag accepteras", weights: { sovereignty: 2 } },
      { label: "Mycket viktigt — föredrar starkt EU", weights: { sovereignty: 1.6 } },
      { label: "Önskvärt men förhandlingsbart", weights: { sovereignty: 1.1 } },
      { label: "Inte en faktor", weights: { sovereignty: 0.5 } },
    ],
  },
  {
    id: "residency",
    question: "Var måste er data fysiskt lagras?",
    description: "Data residency påverkar GDPR-efterlevnad och tredjelandsöverföringar.",
    options: [
      { label: "Endast inom Sverige / Norden", weights: { sovereignty: 1.8, gdpr: 1.5 } },
      { label: "Inom EU/EES", weights: { sovereignty: 1.5, gdpr: 1.4 } },
      { label: "EU eller likvärdigt skydd (CH, UK)", weights: { sovereignty: 1.2, gdpr: 1.2 } },
      { label: "Globalt — spelar mindre roll", weights: { sovereignty: 0.6 } },
    ],
  },
  {
    id: "nis2",
    question: "Omfattas ni av NIS2-direktivet?",
    description: "NIS2 träder i full kraft 2025 och omfattar tusentals fler företag än NIS1.",
    options: [
      { label: "Ja — väsentlig entitet", weights: { nis2: 2, sovereignty: 1.3 } },
      { label: "Ja — viktig entitet", weights: { nis2: 1.7, sovereignty: 1.2 } },
      { label: "Osäker — vill säkra mig", weights: { nis2: 1.4 } },
      { label: "Nej, inte berörda", weights: { nis2: 0.7 } },
    ],
  },
  {
    id: "risk",
    question: "Vilken är er risktolerans för leverantörsberoende?",
    description: "Lock-in mot icke-EU-leverantörer är en strategisk risk.",
    options: [
      { label: "Mycket låg — diversifiering är ett krav", weights: { sovereignty: 1.7, nis2: 1.3 } },
      { label: "Låg — undvik enskilda hyperscalers", weights: { sovereignty: 1.4 } },
      { label: "Medel — balansera kostnad och risk", weights: { sovereignty: 1 } },
      { label: "Hög — pris och funktion väger tyngst", weights: { sovereignty: 0.6 } },
    ],
  },
];

export type Answers = Record<string, number>; // questionId -> option index
