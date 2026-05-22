export type User = {
  id: string;
  nickname: string;
  ageRange: string;
  region: string;
  profileImage: string;
  mbti: string;
  hobbies: string[];
  intro: string;
  values: string[];
  marriageTimeline: string;
  verifiedFace: boolean;
};

export type VerifiableCredential = {
  id: string;
  type: "identity" | "education" | "employment" | "income" | "marital" | "verified_face";
  status: "verified" | "needs_refresh" | "private";
  level1Label: string;
  level2Label: string;
  level3Label: string;
  expiresInDays?: number;
};

export type DisclosurePolicy = {
  education: "level1" | "level2" | "level3" | "private";
  employment: "level1" | "level2" | "level3" | "private";
  income: "level1" | "level2" | "level3" | "private";
  marital: "level1" | "level2" | "level3" | "private";
  photo: "verified_only" | "profile_photo" | "private";
};

export type MatchCard = {
  id: string;
  nickname: string;
  ageRange: string;
  region: string;
  image: string;
  compatibilityKeywords: string[];
  level1Badges: string[];
  level2Info?: string[];
  level3Info?: string[];
  compatibilityScore?: number;
  liked?: boolean;
  superLiked?: boolean;
};

export type ChainLog = {
  id: string;
  eventType: "LEVEL_2_CONSENT" | "LEVEL_3_DISCLOSURE" | "ACCESS_REVOKED" | "VC_REFRESH";
  txHash: string;
  createdAt: string;
};

export type AppState = {
  isLoggedIn: boolean;
  did: string | null;
  myProfile: User | null;
  disclosurePolicy: DisclosurePolicy | null;
  interests: MatchCard[];
  appointments: { matchId: string; scheduledAt: string; place: string }[];
  chainLogs: ChainLog[];
};
