export interface Prize {
  id: number;
  label: string;
  description: string;
  color: string;
  textColor: string;
  probability: number;
  emoji: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  acceptsMarketing: boolean;
  prizeId: number | null;
  prizeLabel: string | null;
  timestamp: string;
}

export type AppPage = 'landing' | 'form' | 'roulette' | 'result' | 'admin';
