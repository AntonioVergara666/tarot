
export enum Suit {
  MAJOR = 'Major Arcana',
  WANDS = 'Wands',
  CUPS = 'Cups',
  SWORDS = 'Swords',
  PENTACLES = 'Pentacles'
}

export interface TarotCardData {
  id: string;
  name: string;
  suit: Suit;
  meaning_up: string;
  meaning_rev: string;
  description: string;
}

export interface DrawnCard {
  card: TarotCardData;
  isReversed: boolean;
  isFlipped: boolean;
}

export enum SpreadType {
  DAILY = 'Daily Guidance (1 Card)',
  CROSSROADS = 'The Crossroads (2 Cards)',
  TIMELINE = 'Past, Present, Future (3 Cards)'
}

export interface InterpretationResponse {
  summary: string;
  advice: string;
  cardReadings: {
    cardId: string;
    insight: string;
  }[];
}
