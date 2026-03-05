export interface SuggestionPayload {
  name: string;
  email: string;
  projectType: string;
  title: string;
  details: string;
}

export interface FeedbackEntry {
  _id: string;
  userId: string | null;
  name: string;
  rating: number;
  message: string;
  location?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface FeedbackPayload {
  name: string;
  email: string;
  rating: number;
  message: string;
  location?: string;
  avatarUrl?: string;
}
