export interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  isAnswered: boolean;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  votes: number;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  isAccepted: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  reputation: number;
  role: 'guest' | 'user' | 'admin';
}