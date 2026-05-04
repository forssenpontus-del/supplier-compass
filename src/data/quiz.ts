import type { Weights } from "@/lib/scoring";
import { defaultWeights } from "@/lib/scoring";

export interface QuizOption {
  label: string;
  /** How this answer nudges the four component weights (additive). */
  nudge: Partial<Weights>;
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
    question: "Vilken sektor verkar er organisation inom?",
    description: "Sektorn avgör vilka komponenter som väger tyngst.",
    options: [
      { label: "Finans / försäkring", nudge: { incidentHandling: 15, ownership: 10 } },
      { label: "Hälso- och sjukvård", nudge: { dataLocation: 15, securityLevel: 10 } },
      { label: "Energi / kritisk infrastruktur", nudge: { incidentHandling: 15, ownership: 10 } },
      { label: "Offentlig sektor", nudge: { ownership: 20, dataLocation: 10 } },
      { label: "Tech / SaaS", nudge: { securityLevel: 10, dataLocation: 5 } },
      { label: "Annat / generellt företag", nudge: {} },
    ],
  },
  {
    id: "data",
    question: "Vilken typ av data hanterar ni främst?",
    description: "Känslig data kräver striktare jurisdiktionskrav.",
    options: [
      { label: "Personuppgifter (kunder, anställda)", nudge: { dataLocation: 10, ownership: 5 } },
      { label: "Hälso- eller biometrisk data", nudge: { dataLocation: 15, securityLevel: 10 } },
      { label: "Finansiell data / transaktioner", nudge: { incidentHandling: 10, securityLevel: 10 } },
      { label: "Affärshemligheter / IP", nudge: { ownership: 15, securityLevel: 5 } },
      { label: "Publik / icke-känslig data", nudge: { dataLocation: -5, ownership: -5 } },
    ],
  },
  {
    id: "sovereignty",
    question: "Hur viktig är digital suveränitet?",
    description: "Suveränitet = oberoende från icke-EU-jurisdiktioner som CLOUD Act eller FISA 702.",
    options: [
      { label: "Kritiskt — endast EU-bolag accepteras", nudge: { ownership: 25, dataLocation: 10 } },
      { label: "Mycket viktigt — föredrar starkt EU", nudge: { ownership: 15, dataLocation: 5 } },
      { label: "Önskvärt men förhandlingsbart", nudge: { ownership: 5 } },
      { label: "Inte en faktor", nudge: { ownership: -10 } },
    ],
  },
  {
    id: "residency",
    question: "Var måste er data fysiskt lagras?",
    description: "Data residency påverkar GDPR-efterlevnad och tredjelandsöverföringar.",
    options: [
      { label: "Endast inom Sverige / Norden", nudge: { dataLocation: 20 } },
      { label: "Inom EU/EES", nudge: { dataLocation: 15 } },
      { label: "EU eller likvärdigt skydd (CH, UK)", nudge: { dataLocation: 8 } },
      { label: "Globalt — spelar mindre roll", nudge: { dataLocation: -10 } },
    ],
  },
  {
    id: "nis2",
    question: "Omfattas ni av NIS2-direktivet?",
    description: "NIS2 träder i full kraft och omfattar tusentals fler företag än NIS1.",
    options: [
      { label: "Ja — väsentlig entitet", nudge: { incidentHandling: 20, securityLevel: 10 } },
      { label: "Ja — viktig entitet", nudge: { incidentHandling: 15, securityLevel: 5 } },
      { label: "Osäker — vill säkra mig", nudge: { incidentHandling: 8 } },
      { label: "Nej, inte berörda", nudge: { incidentHandling: -8 } },
    ],
  },
  {
    id: "risk",
    question: "Vilken är er risktolerans för leverantörsberoende?",
    description: "Lock-in mot icke-EU-leverantörer är en strategisk risk.",
    options: [
      { label: "Mycket låg — diversifiering är ett krav", nudge: { ownership: 15, securityLevel: 5 } },
      { label: "Låg — undvik enskilda hyperscalers", nudge: { ownership: 10 } },
      { label: "Medel — balansera kostnad och risk", nudge: {} },
      { label: "Hög — pris och funktion väger tyngst", nudge: { ownership: -10 } },
    ],
  },
];

export type Answers = Record<string, number>; // questionId -> option index

/** Convert quiz answers into weights by adding nudges to defaults, clamping >= 0. */
export function weightsFromAnswers(answers: Answers): Weights {
  const w: Weights = { ...defaultWeights };
  quizQuestions.forEach((q) => {
    const idx = answers[q.id];
    if (idx === undefined) return;
    const nudge = q.options[idx]?.nudge ?? {};
    (Object.keys(nudge) as (keyof Weights)[]).forEach((k) => {
      w[k] = Math.max(0, w[k] + (nudge[k] ?? 0));
    });
  });
  return w;
}
