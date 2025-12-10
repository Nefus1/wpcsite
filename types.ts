export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'Scale' | 'Briefcase' | 'Scroll' | 'Shield' | 'Users' | 'Building';
}

export interface Attorney {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  isStreaming?: boolean;
}

export enum Section {
  HOME = 'home',
  PRACTICE_AREAS = 'practice-areas',
  ATTORNEYS = 'attorneys',
  LOCATIONS = 'locations',
  CONTACT = 'contact'
}