export interface TokenProject {
  id: string;
  name: string;
  ticker: string;
  mission: string;
  industry: string;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  logoEmoji: string;
  mascot: string;
  communityGoals: string;
  maxSupply: number;
  circulatingSupply: number;
  allocationCommunity: number;
  allocationDevelopment: number;
  allocationTreasury: number;
  allocationEcosystem: number;
  brandingGuidelines: string;
  whitepaperIntro: string;
  whitepaperProblem: string;
  whitepaperSolution: string;
  whitepaperTokenomics: string;
  whitepaperGovernance: string;
  whitepaperRisks: string;
  governanceVotingRules: {
    quorum: number; // e.g. 10 for 10%
    duration: number; // in days
    minProposalPower: number; // minimum token balance
  };
  roadmapPhases: {
    phase: number;
    title: string;
    tasks: string[];
  }[];
  communityChannels: {
    name: string;
    description: string;
    roleRequired: string;
  }[];
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  unlockedModules: number[]; // e.g. [1, 2, 3, 4]
  completedQuizzes: string[]; // Quiz IDs
  unlockedBadges: string[]; // Badge IDs
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonModule {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  emoji: string;
  sections: {
    title: string;
    content: string;
    interactiveType?: "animation" | "diagram" | "calculator";
  }[];
  quiz: QuizQuestion[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface Message {
  role: "user" | "model";
  text: string;
}
