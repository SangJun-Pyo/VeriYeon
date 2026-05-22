import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, User, DisclosurePolicy, MatchCard, ChainLog } from '../types';

type AppStore = AppState & {
  login: (did: string) => void;
  logout: () => void;
  setProfile: (profile: User) => void;
  setDisclosurePolicy: (policy: DisclosurePolicy) => void;
  addInterest: (card: MatchCard) => void;
  removeInterest: (cardId: string) => void;
  addAppointment: (appointment: { matchId: string; scheduledAt: string; place: string }) => void;
  addChainLog: (log: ChainLog) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      did: null,
      myProfile: null,
      disclosurePolicy: null,
      interests: [],
      appointments: [],
      chainLogs: [],

      login: (did) => set({ isLoggedIn: true, did }),
      logout: () => set({ isLoggedIn: false, did: null, myProfile: null }),
      setProfile: (profile) => set({ myProfile: profile }),
      setDisclosurePolicy: (policy) => set({ disclosurePolicy: policy }),
      addInterest: (card) =>
        set((state) => ({
          interests: state.interests.some((c) => c.id === card.id)
            ? state.interests
            : [...state.interests, card],
        })),
      removeInterest: (cardId) =>
        set((state) => ({
          interests: state.interests.filter((c) => c.id !== cardId),
        })),
      addAppointment: (appointment) =>
        set((state) => ({ appointments: [...state.appointments, appointment] })),
      addChainLog: (log) =>
        set((state) => ({ chainLogs: [log, ...state.chainLogs] })),
    }),
    {
      name: 'veriyeon-store',
    }
  )
);
