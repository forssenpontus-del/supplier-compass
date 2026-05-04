// Rule-based vendor dataset.
// Each vendor is rated on 4 transparent components (0-100), each derived from
// concrete, documented rules — not opaque AI scoring.

export type Jurisdiction = "EU" | "EEA" | "UK" | "US" | "CN" | "Other";
export type RiskLevel = "Low" | "Medium" | "High";

export interface VendorComponents {
  /** Where customer data physically resides + legal control over that location */
  dataLocation: number;
  /** Independent security certifications & technical controls (ISO 27001, SOC2, encryption) */
  securityLevel: number;
  /** Documented incident response, breach disclosure, NIS2/DORA reporting maturity */
  incidentHandling: number;
  /** Ownership / parent company exposure to non-EU jurisdictions (CLOUD Act, FISA, PRC law) */
  ownership: number;
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  hq: string;
  jurisdiction: Jurisdiction;
  parent?: string;
  dataResidency: string[];
  certifications: string[];
  components: VendorComponents;
  /** Short human-readable explanation per component — drives transparency */
  rationale: {
    dataLocation: string;
    securityLevel: string;
    incidentHandling: string;
    ownership: string;
  };
  euAlternative?: string;
  description: string;
}

export const componentMeta = {
  dataLocation: {
    label: "Data location",
    description: "Var datan fysiskt lagras och vilken jurisdiktion som styr den.",
  },
  securityLevel: {
    label: "Security level",
    description: "Tekniska kontroller och oberoende certifieringar (ISO 27001, SOC2, kryptering).",
  },
  incidentHandling: {
    label: "Incident handling",
    description: "Mognad i incidenthantering och rapportering enligt NIS2/DORA.",
  },
  ownership: {
    label: "Ownership",
    description: "Moderbolagets jurisdiktion och exponering mot icke-EU-lagar (CLOUD Act, FISA, PRC).",
  },
} as const;

export type ComponentKey = keyof VendorComponents;

export const vendors: Vendor[] = [
  {
    id: "ovhcloud",
    name: "OVHcloud",
    category: "Cloud Infrastructure",
    hq: "Roubaix, France 🇫🇷",
    jurisdiction: "EU",
    parent: "OVH Groupe SAS (FR)",
    dataResidency: ["FR", "DE", "PL"],
    certifications: ["ISO 27001", "SecNumCloud", "HDS", "ISO 27701"],
    components: { dataLocation: 98, securityLevel: 92, incidentHandling: 88, ownership: 96 },
    rationale: {
      dataLocation: "Datacenter i FR/DE/PL, kunden väljer region. Ingen extraterritoriell åtkomst.",
      securityLevel: "SecNumCloud-certifierad — högsta franska statliga moln-standarden.",
      incidentHandling: "Publika incidentrapporter, NIS2-redo. Schemalagda postmortems.",
      ownership: "Fransk publik koncern. Helt under EU-lag.",
    },
    description: "Europas största molnleverantör, fullt under fransk lag.",
  },
  {
    id: "hetzner",
    name: "Hetzner",
    category: "Cloud Infrastructure",
    hq: "Gunzenhausen, Germany 🇩🇪",
    jurisdiction: "EU",
    parent: "Hetzner Online GmbH (DE)",
    dataResidency: ["DE", "FI"],
    certifications: ["ISO 27001"],
    components: { dataLocation: 96, securityLevel: 86, incidentHandling: 78, ownership: 96 },
    rationale: {
      dataLocation: "Endast DE och FI. Ingen replikering utanför EU.",
      securityLevel: "ISO 27001-certifierad. Standardkryptering, mindre certifieringsbredd.",
      incidentHandling: "Statussida och e-postnotis. Begränsad publik post-incident-rapport.",
      ownership: "Privatägt tyskt bolag. Ingen US/CN-exponering.",
    },
    description: "Tysk hosting, full GDPR-efterlevnad och stark prismodell.",
  },
  {
    id: "scaleway",
    name: "Scaleway",
    category: "Cloud Infrastructure",
    hq: "Paris, France 🇫🇷",
    jurisdiction: "EU",
    parent: "Iliad SA (FR)",
    dataResidency: ["FR", "NL", "PL"],
    certifications: ["ISO 27001", "HDS", "ISO 27017", "ISO 27018"],
    components: { dataLocation: 96, securityLevel: 90, incidentHandling: 86, ownership: 95 },
    rationale: {
      dataLocation: "EU-only regioner, ingen US-replikering.",
      securityLevel: "Bred ISO-stack inklusive HDS för hälsodata.",
      incidentHandling: "Publik statussida och NIS2-anpassade processer.",
      ownership: "Del av franska Iliad-koncernen, börsnoterad i Paris.",
    },
    description: "Fransk hyperscaler med suverän molnstrategi.",
  },
  {
    id: "ionos",
    name: "IONOS",
    category: "Cloud Infrastructure",
    hq: "Karlsruhe, Germany 🇩🇪",
    jurisdiction: "EU",
    parent: "United Internet AG (DE)",
    dataResidency: ["DE", "ES", "GB"],
    certifications: ["ISO 27001", "C5", "BSI"],
    components: { dataLocation: 92, securityLevel: 88, incidentHandling: 82, ownership: 94 },
    rationale: {
      dataLocation: "Primärt EU. UK-region används för UK-kunder.",
      securityLevel: "BSI C5 — tysk standard för molnsäkerhet.",
      incidentHandling: "Strukturerad NIS2-rapportering.",
      ownership: "Del av Gaia-X, tyskt moderbolag.",
    },
    description: "Tysk leverantör inom Gaia-X-initiativet.",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    category: "Cloud Infrastructure",
    hq: "Seattle, USA 🇺🇸",
    jurisdiction: "US",
    parent: "Amazon.com Inc. (US)",
    dataResidency: ["EU regioner tillgängliga"],
    certifications: ["ISO 27001", "SOC 2", "FedRAMP", "C5"],
    components: { dataLocation: 60, securityLevel: 95, incidentHandling: 90, ownership: 18 },
    rationale: {
      dataLocation: "EU-regioner finns men driften kan nås från US-personal.",
      securityLevel: "Marknadsledande certifieringsbredd och tekniska kontroller.",
      incidentHandling: "Mogen incident-process, men US-rättsligt obligatorisk tystnad kan gälla.",
      ownership: "US-moderbolag, omfattas av CLOUD Act och FISA 702.",
    },
    euAlternative: "OVHcloud, Scaleway",
    description: "Tekniskt stark men CLOUD Act-exponerad.",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "Cloud Infrastructure",
    hq: "Redmond, USA 🇺🇸",
    jurisdiction: "US",
    parent: "Microsoft Corp. (US)",
    dataResidency: ["EU Data Boundary"],
    certifications: ["ISO 27001", "SOC 2", "C5", "FedRAMP"],
    components: { dataLocation: 65, securityLevel: 94, incidentHandling: 88, ownership: 22 },
    rationale: {
      dataLocation: "EU Data Boundary minskar men eliminerar inte US-åtkomst.",
      securityLevel: "Mycket bred certifieringsportfölj.",
      incidentHandling: "Mogen rapportering via Service Health.",
      ownership: "US-moderbolag — CLOUD Act gäller.",
    },
    euAlternative: "IONOS, OVHcloud",
    description: "EU Data Boundary minskar men eliminerar inte risken.",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "Cloud Infrastructure",
    hq: "Mountain View, USA 🇺🇸",
    jurisdiction: "US",
    parent: "Alphabet Inc. (US)",
    dataResidency: ["EU regioner tillgängliga"],
    certifications: ["ISO 27001", "SOC 2", "C5"],
    components: { dataLocation: 58, securityLevel: 92, incidentHandling: 85, ownership: 16 },
    rationale: {
      dataLocation: "Multi-region som standard, US-replikering möjlig.",
      securityLevel: "Stark teknisk säkerhet och kryptering by default.",
      incidentHandling: "Publika postmortems, transparent statussida.",
      ownership: "Alphabet, omfattas av FISA 702 och CLOUD Act.",
    },
    euAlternative: "Scaleway, OVHcloud",
    description: "Underkastad FISA 702 och CLOUD Act.",
  },
  {
    id: "alibaba",
    name: "Alibaba Cloud",
    category: "Cloud Infrastructure",
    hq: "Hangzhou, China 🇨🇳",
    jurisdiction: "CN",
    parent: "Alibaba Group (CN)",
    dataResidency: ["CN", "EU"],
    certifications: ["ISO 27001"],
    components: { dataLocation: 40, securityLevel: 70, incidentHandling: 55, ownership: 8 },
    rationale: {
      dataLocation: "EU-region finns men data kan begäras av kinesiska myndigheter.",
      securityLevel: "Grundläggande certifieringar, mindre EU-anpassning.",
      incidentHandling: "Begränsad transparens kring incidenter.",
      ownership: "Kinesisk koncern, omfattas av PRC National Intelligence Law.",
    },
    euAlternative: "OVHcloud, Hetzner",
    description: "Hög risk under NIS2 pga kinesisk underrättelselag.",
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    category: "Productivity & Collaboration",
    hq: "Stuttgart, Germany 🇩🇪",
    jurisdiction: "EU",
    parent: "Nextcloud GmbH (DE)",
    dataResidency: ["Self-hosted", "DE"],
    certifications: ["ISO 27001 (provider-beroende)"],
    components: { dataLocation: 99, securityLevel: 88, incidentHandling: 84, ownership: 98 },
    rationale: {
      dataLocation: "Self-hosted eller EU-värdat. Ni kontrollerar var datan ligger.",
      securityLevel: "Open source — granskningsbar kod, E2E-kryptering.",
      incidentHandling: "CVE-process via Nextcloud Security.",
      ownership: "Tyskt bolag, ingen icke-EU-exponering.",
    },
    description: "Open source-alternativ till Microsoft 365 och Google Workspace.",
  },
  {
    id: "proton",
    name: "Proton",
    category: "Productivity & Collaboration",
    hq: "Geneva, Switzerland 🇨🇭",
    jurisdiction: "EEA",
    parent: "Proton AG (CH)",
    dataResidency: ["CH", "DE"],
    certifications: ["ISO 27001", "SOC 2"],
    components: { dataLocation: 92, securityLevel: 90, incidentHandling: 82, ownership: 90 },
    rationale: {
      dataLocation: "Schweiz + Tyskland. Schweiz har EU-likvärdig dataskyddsstatus.",
      securityLevel: "End-to-end-kryptering, oberoende säkerhetsrevisioner.",
      incidentHandling: "Publika incident-rapporter.",
      ownership: "Schweiziskt bolag (EEA-likvärdigt), ingen US/CN-koppling.",
    },
    description: "End-to-end-krypterad e-post, drive och kalender.",
  },
  {
    id: "m365",
    name: "Microsoft 365",
    category: "Productivity & Collaboration",
    hq: "Redmond, USA 🇺🇸",
    jurisdiction: "US",
    parent: "Microsoft Corp. (US)",
    dataResidency: ["EU available"],
    certifications: ["ISO 27001", "SOC 2", "C5"],
    components: { dataLocation: 60, securityLevel: 90, incidentHandling: 85, ownership: 20 },
    rationale: {
      dataLocation: "EU-tenant-options finns, men metadata och support kan röra US.",
      securityLevel: "Stark teknisk grund och certifieringsbredd.",
      incidentHandling: "Mogen rapportering via Message Center.",
      ownership: "US-moderbolag, kontroversiell efter Schrems II.",
    },
    euAlternative: "Nextcloud, OnlyOffice",
    description: "Dominant men CLOUD Act-exponerad.",
  },
  {
    id: "workspace",
    name: "Google Workspace",
    category: "Productivity & Collaboration",
    hq: "Mountain View, USA 🇺🇸",
    jurisdiction: "US",
    parent: "Alphabet Inc. (US)",
    dataResidency: ["EU available"],
    certifications: ["ISO 27001", "SOC 2"],
    components: { dataLocation: 55, securityLevel: 88, incidentHandling: 82, ownership: 15 },
    rationale: {
      dataLocation: "EU-regioner finns men ej för all metadata.",
      securityLevel: "Stark teknisk säkerhet.",
      incidentHandling: "Publik statussida.",
      ownership: "Alphabet — CLOUD Act + FISA 702.",
    },
    euAlternative: "Nextcloud, Proton",
    description: "Förbjuden i flera EU-skolor pga GDPR-frågor.",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    category: "AI & ML",
    hq: "Paris, France 🇫🇷",
    jurisdiction: "EU",
    parent: "Mistral AI SAS (FR)",
    dataResidency: ["FR", "EU"],
    certifications: ["ISO 27001 (pågående)"],
    components: { dataLocation: 95, securityLevel: 84, incidentHandling: 78, ownership: 94 },
    rationale: {
      dataLocation: "EU-värdade modeller och inferens.",
      securityLevel: "Open weights, granskningsbart. ISO-process pågår.",
      incidentHandling: "Strukturerad men ung process.",
      ownership: "Franskt bolag, EU-investerare.",
    },
    description: "Europeiskt AI-flaggskepp.",
  },
  {
    id: "aleph",
    name: "Aleph Alpha",
    category: "AI & ML",
    hq: "Heidelberg, Germany 🇩🇪",
    jurisdiction: "EU",
    parent: "Aleph Alpha GmbH (DE)",
    dataResidency: ["DE"],
    certifications: ["ISO 27001", "BSI C5"],
    components: { dataLocation: 96, securityLevel: 90, incidentHandling: 84, ownership: 95 },
    rationale: {
      dataLocation: "Endast Tyskland.",
      securityLevel: "BSI C5-certifierad — tysk statlig moln-standard.",
      incidentHandling: "Etablerad incidentprocess för statlig sektor.",
      ownership: "Tyskt bolag, statligt strategiskt.",
    },
    description: "Tyskt suveränt AI för stat och företag.",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "AI & ML",
    hq: "San Francisco, USA 🇺🇸",
    jurisdiction: "US",
    parent: "OpenAI LP (US)",
    dataResidency: ["US primärt"],
    certifications: ["SOC 2"],
    components: { dataLocation: 35, securityLevel: 78, incidentHandling: 65, ownership: 12 },
    rationale: {
      dataLocation: "Inferens primärt i US. EU-residency endast för enterprise.",
      securityLevel: "SOC 2 men begränsad EU-cert.",
      incidentHandling: "Italienska DPA bötfällde 2024 för bristande hantering.",
      ownership: "US-bolag, CLOUD Act gäller.",
    },
    euAlternative: "Mistral AI, Aleph Alpha",
    description: "Italienska DPA bötfällde 2024.",
  },
  {
    id: "gitlab",
    name: "GitLab (Self-managed EU)",
    category: "DevOps",
    hq: "USA (open source) 🇺🇸",
    jurisdiction: "EEA",
    parent: "GitLab Inc. (US) – self-host EU",
    dataResidency: ["Self-hosted"],
    certifications: ["ISO 27001 (self-host)", "SOC 2 (SaaS)"],
    components: { dataLocation: 90, securityLevel: 86, incidentHandling: 82, ownership: 70 },
    rationale: {
      dataLocation: "Self-hostad — ni väljer EU-infrastruktur.",
      securityLevel: "Granskningsbar kod, regelbundna säkerhetsuppdateringar.",
      incidentHandling: "Publik CVE-databas och postmortems.",
      ownership: "US-moderbolag men open source mildrar lock-in.",
    },
    description: "Self-hostad GitLab på EU-infra ger hög suveränitet.",
  },
  {
    id: "github",
    name: "GitHub (Microsoft)",
    category: "DevOps",
    hq: "San Francisco, USA 🇺🇸",
    jurisdiction: "US",
    parent: "Microsoft Corp. (US)",
    dataResidency: ["US"],
    certifications: ["ISO 27001", "SOC 2"],
    components: { dataLocation: 40, securityLevel: 88, incidentHandling: 86, ownership: 22 },
    rationale: {
      dataLocation: "All kod lagras på US-servrar.",
      securityLevel: "Bra tekniskt skydd och MFA-krav.",
      incidentHandling: "Mycket transparent statussida och postmortems.",
      ownership: "Microsoft — CLOUD Act.",
    },
    euAlternative: "GitLab self-hosted, Codeberg",
    description: "All kod lagras på US-servrar under CLOUD Act.",
  },
  {
    id: "qonto",
    name: "Qonto",
    category: "Fintech",
    hq: "Paris, France 🇫🇷",
    jurisdiction: "EU",
    parent: "Qonto SAS (FR)",
    dataResidency: ["FR", "EU"],
    certifications: ["ISO 27001", "PCI DSS", "DORA-redo"],
    components: { dataLocation: 96, securityLevel: 92, incidentHandling: 94, ownership: 95 },
    rationale: {
      dataLocation: "EU-only.",
      securityLevel: "Finanssektor-standard.",
      incidentHandling: "Full DORA-compliance, regulatorisk rapportering.",
      ownership: "EU-licensierad neobank, franskt bolag.",
    },
    description: "EU-licensierad neobank för företag. Full DORA-efterlevnad.",
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Fintech",
    hq: "San Francisco, USA 🇺🇸",
    jurisdiction: "US",
    parent: "Stripe Inc. (US)",
    dataResidency: ["EU available"],
    certifications: ["PCI DSS", "ISO 27001", "SOC 2"],
    components: { dataLocation: 65, securityLevel: 92, incidentHandling: 88, ownership: 28 },
    rationale: {
      dataLocation: "Irländskt EU-bolag hanterar EU-data men US-replikering finns.",
      securityLevel: "PCI DSS Level 1 — högsta för betalkort.",
      incidentHandling: "Mycket mogen process.",
      ownership: "Ägt av US-moderbolag, CLOUD Act gäller.",
    },
    euAlternative: "Mollie, Adyen",
    description: "Irländskt EU-bolag men ägt av US-moderbolag under CLOUD Act.",
  },
];

export const categories = Array.from(new Set(vendors.map((v) => v.category)));

export const componentKeys: ComponentKey[] = [
  "dataLocation",
  "securityLevel",
  "incidentHandling",
  "ownership",
];
