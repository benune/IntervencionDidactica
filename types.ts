export type Tab = 'vision' | 'ruta' | 'recursos';

export type FilterType = 'jornada' | 'evaluacion' | 'taller' | 'lectura';

export interface VisionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Session {
  week: number;
  sessionInWeek: number;
  day: string;
  date: string;
  content: string;
  strategy: string[];
  resources: string[];
  evaluationStrategy: string;
  evaluationInstrument: string;
  value: string;
}

export interface LearningUnit {
  id: number;
  title: string;
  duration: string;
  purpose: string;
  content: string[];
  sessions: Session[];
}

export interface Resource {
  reference: string;
  url: string | null;
}
