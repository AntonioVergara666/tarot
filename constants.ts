
import { TarotCardData, Suit } from './types';

export const TAROT_DECK: TarotCardData[] = [
  // Major Arcana
  { id: '0', name: 'The Fool', suit: Suit.MAJOR, meaning_up: 'New beginnings, innocence, spontaneity', meaning_rev: 'Recklessness, risk-taking, inconsideration', description: 'A youth stands on the edge of a precipice with a white dog.' },
  { id: '1', name: 'The Magician', suit: Suit.MAJOR, meaning_up: 'Manifestation, resourcefulness, power', meaning_rev: 'Manipulation, poor planning, untapped talents', description: 'A figure stands with one hand pointing to the sky and one to the earth.' },
  { id: '2', name: 'The High Priestess', suit: Suit.MAJOR, meaning_up: 'Intuition, sacred knowledge, divine feminine', meaning_rev: 'Secrets, disconnected from intuition, withdrawal', description: 'A woman sits between two pillars, B and J.' },
  { id: '3', name: 'The Empress', suit: Suit.MAJOR, meaning_up: 'Femininity, beauty, nature, nurturing', meaning_rev: 'Creative block, dependence on others', description: 'A queen sits in a lush garden with grain.' },
  { id: '4', name: 'The Emperor', suit: Suit.MAJOR, meaning_up: 'Authority, structure, a father figure', meaning_rev: 'Domination, excessive control, rigidity', description: 'An older king sits on a stone throne decorated with rams.' },
  { id: '5', name: 'The Hierophant', suit: Suit.MAJOR, meaning_up: 'Spiritual wisdom, religious beliefs, conformity', meaning_rev: 'Personal beliefs, freedom, challenging the status quo', description: 'A religious figure sits between two pillars, blessing two followers.' },
  { id: '6', name: 'The Lovers', suit: Suit.MAJOR, meaning_up: 'Love, harmony, relationships, values', meaning_rev: 'Self-love, disharmony, imbalance, misalignment', description: 'A man and woman stand beneath an angel.' },
  { id: '7', name: 'The Chariot', suit: Suit.MAJOR, meaning_up: 'Control, willpower, success, determination', meaning_rev: 'Self-discipline, opposition, lack of direction', description: 'A warrior in a chariot pulled by two sphinxes.' },
  { id: '8', name: 'Strength', suit: Suit.MAJOR, meaning_up: 'Strength, courage, persuasion, influence', meaning_rev: 'Self-doubt, low energy, raw emotion', description: 'A woman calmly closes the jaws of a lion.' },
  { id: '9', name: 'The Hermit', suit: Suit.MAJOR, meaning_up: 'Soul-searching, introspection, being alone', meaning_rev: 'Isolation, loneliness, withdrawal', description: 'An old man stands on a mountain peak holding a lantern.' },
  { id: '10', name: 'Wheel of Fortune', suit: Suit.MAJOR, meaning_up: 'Good luck, karma, life cycles, turning point', meaning_rev: 'Bad luck, resistance to change, breaking cycles', description: 'A celestial wheel with symbols of the zodiac and sphinx.' },
  { id: '11', name: 'Justice', suit: Suit.MAJOR, meaning_up: 'Justice, fairness, truth, cause and effect', meaning_rev: 'Unfairness, lack of accountability, dishonesty', description: 'A figure holds scales in one hand and a sword in the other.' },
  { id: '12', name: 'The Hanged Man', suit: Suit.MAJOR, meaning_up: 'Pause, surrender, letting go, new perspectives', meaning_rev: 'Delays, resistance, stalling, indecision', description: 'A man hangs upside down from a T-shaped cross.' },
  { id: '13', name: 'Death', suit: Suit.MAJOR, meaning_up: 'Endings, change, transformation, transition', meaning_rev: 'Resistance to change, personal purging, inner purging', description: 'A skeleton in black armor rides a white horse.' },
  { id: '14', name: 'Temperance', suit: Suit.MAJOR, meaning_up: 'Balance, moderation, patience, purpose', meaning_rev: 'Imbalance, excess, self-healing, re-alignment', description: 'An angel pours liquid between two cups.' },
  { id: '15', name: 'The Devil', suit: Suit.MAJOR, meaning_up: 'Shadow self, attachment, addiction, restriction', meaning_rev: 'Releasing limiting beliefs, exploring dark thoughts', description: 'A horned goat-man sits above two chained humans.' },
  { id: '16', name: 'The Tower', suit: Suit.MAJOR, meaning_up: 'Sudden change, upheaval, chaos, revelation', meaning_rev: 'Personal transformation, fear of change, averting disaster', description: 'A tower struck by lightning, people falling from it.' },
  { id: '17', name: 'The Star', suit: Suit.MAJOR, meaning_up: 'Hope, faith, purpose, renewal, spirituality', meaning_rev: 'Lack of faith, despair, self-trust, disconnection', description: 'A woman pours water into a pool and onto the land.' },
  { id: '18', name: 'The Moon', suit: Suit.MAJOR, meaning_up: 'Illusion, fear, anxiety, subconscious, intuition', meaning_rev: 'Release of fear, repressed emotion, inner confusion', description: 'A moon hangs above a landscape with a dog, wolf, and crayfish.' },
  { id: '19', name: 'The Sun', suit: Suit.MAJOR, meaning_up: 'Positivity, fun, warmth, success, vitality', meaning_rev: 'Inner child, feeling down, overly optimistic', description: 'A child rides a white horse under a bright sun.' },
  { id: '20', name: 'Judgement', suit: Suit.MAJOR, meaning_up: 'Judgement, rebirth, inner calling, absolution', meaning_rev: 'Self-doubt, inner critic, ignoring the call', description: 'An angel blows a trumpet while people rise from coffins.' },
  { id: '21', name: 'The World', suit: Suit.MAJOR, meaning_up: 'Completion, integration, accomplishment, travel', meaning_rev: 'Seeking closure, short-cuts, delays', description: 'A figure dances inside a wreath, surrounded by four creatures.' },
  // Minor Arcana - Selected Examples to keep the file size reasonable but represent the deck
  { id: 'w1', name: 'Ace of Wands', suit: Suit.WANDS, meaning_up: 'Inspiration, new opportunities, growth', meaning_rev: 'Emerging idea, lack of direction, distractions', description: 'A hand holding a sprouting wand.' },
  { id: 'c1', name: 'Ace of Cups', suit: Suit.CUPS, meaning_up: 'Love, new relationships, compassion', meaning_rev: 'Self-love, intuition, repressed emotions', description: 'A cup overflowing with five streams of water.' },
  { id: 's1', name: 'Ace of Swords', suit: Suit.SWORDS, meaning_up: 'Breakthroughs, new ideas, mental clarity', meaning_rev: 'Inner thoughts, clouded judgement, confusion', description: 'A hand holding a sword upright.' },
  { id: 'p1', name: 'Ace of Pentacles', suit: Suit.PENTACLES, meaning_up: 'A new financial opportunity, prosperity', meaning_rev: 'Lost opportunity, lack of planning', description: 'A hand holding a large gold coin.' },
  { id: 'w10', name: 'Ten of Wands', suit: Suit.WANDS, meaning_up: 'Burden, extra responsibility, hard work', meaning_rev: 'Doing it all, carrying the burden, delegating', description: 'A man carrying ten heavy wands.' },
  { id: 'c10', name: 'Ten of Cups', suit: Suit.CUPS, meaning_up: 'Divine love, blissful relationships, harmony', meaning_rev: 'Disconnected, struggling relationships', description: 'A family standing under a rainbow of cups.' },
  { id: 's10', name: 'Ten of Swords', suit: Suit.SWORDS, meaning_up: 'Painful endings, betrayal, rock bottom', meaning_rev: 'Recovery, regeneration, resisting the inevitable', description: 'A man lying face down with ten swords in his back.' },
  { id: 'p10', name: 'Ten of Pentacles', suit: Suit.PENTACLES, meaning_up: 'Wealth, financial security, family, long-term success', meaning_rev: 'The dark side of wealth, financial failure or loss', description: 'An old man, a couple, children, and dogs in a city.' },
  { id: 'wk', name: 'King of Wands', suit: Suit.WANDS, meaning_up: 'Natural-born leader, vision, entrepreneur', meaning_rev: 'Impulsiveness, haste, ruthless leader', description: 'A king sits on a throne decorated with salamanders.' },
  { id: 'ck', name: 'King of Cups', suit: Suit.CUPS, meaning_up: 'Emotional balance, compassion, diplomatic', meaning_rev: 'Self-compassion, inner feelings, moodiness', description: 'A king sits on a throne floating on the sea.' },
  { id: 'sk', name: 'King of Swords', suit: Suit.SWORDS, meaning_up: 'Mental clarity, intellectual power, authority', meaning_rev: 'Quiet power, inner truth, misuse of power', description: 'A king sits on a throne holding a sword upright.' },
  { id: 'pk', name: 'King of Pentacles', suit: Suit.PENTACLES, meaning_up: 'Wealth, business, leadership, abundance', meaning_rev: 'Obsessed with wealth, stubborn, rigid', description: 'A king sits on a throne decorated with bulls, in a garden.' }
];

// Note: In a production app, we would include all 78. 
// For this demo, we've included 22 Major Arcana and 12 representative Minor Arcana.
