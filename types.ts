export enum TopicType {
  Person = 'Person',
  Place = 'Place',
  Event = 'Event',
  Object = 'Object'
}

export interface VocabularyItem {
  expression: string;
  explanation: string;
  example: string;
  replacement?: string;
}

export interface QnAItem {
  question: string;
  hints: string[];
  fullAnswer: string;
}

export interface ScaffoldingResponse {
  translation: string;
  highlightedContent: string; // The text with special markers for highlighting
  vocabulary: VocabularyItem[];
  clozeContent: string; // Text with [words] to be filled in
  mindmap: string; // Mermaid JS string
  questions: QnAItem[];
}

export interface UserInput {
  text: string;
  topicType: TopicType;
  targetScore: number;
}