
import React from 'react';
import { DrawnCard, Suit } from '../types';

interface CardProps {
  drawnCard: DrawnCard;
  onFlip: () => void;
  index: number;
}

const SuitIcon: React.FC<{ cardId: string; suit: Suit }> = ({ cardId, suit }) => {
  // Major Arcana special handling
  if (suit === Suit.MAJOR) {
    const majorIcons: Record<string, string> = {
      '0': '✨', '1': '🧙', '2': '🌑', '3': '👑', '4': '🏛️', '5': '🕍', '6': '🕊️', '7': '⚔️',
      '8': '🦁', '9': '🏮', '10': '☸️', '11': '⚖️', '12': '⚓', '13': '💀', '14': '🕊️',
      '15': '🔥', '16': '⚡', '17': '⭐', '18': '🌙', '19': '☀️', '20': '🎺', '21': '🌍'
    };
    return <span className="text-6xl drop-shadow-md">{majorIcons[cardId] || '🧿'}</span>;
  }

  // High quality SVG icons for Minor Arcana
  switch (suit) {
    case Suit.WANDS:
      return (
        <svg viewBox="0 0 24 24" className="w-20 h-20 fill-amber-700/70">
          <path d="M13,3L11,5L16,10L18,8M5,11L3,13L8,18L10,16M19,3L16,6L18,8L21,5M3,19L5,21L8,18L6,16"/>
        </svg>
      );
    case Suit.CUPS:
      return (
        <svg viewBox="0 0 24 24" className="w-20 h-20 fill-blue-500/70">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6V18M6,12H18"/>
        </svg>
      );
    case Suit.SWORDS:
      return (
        <svg viewBox="0 0 24 24" className="w-20 h-20 fill-slate-500/70">
          <path d="M21,3L18,6L13,11L11,13L8,16L6,18L3,21L4,22L7,19L9,17L12,14L14,12L19,7L22,4L21,3M14,6L12,8L15,11L17,9L14,6"/>
        </svg>
      );
    case Suit.PENTACLES:
      return (
        <svg viewBox="0 0 24 24" className="w-20 h-20 fill-yellow-600/70">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4L14,8L19,9L16,13L17,18L12,16L7,18L8,13L5,9L10,8L12,4Z"/>
        </svg>
      );
    default:
      return <span className="text-6xl">🔮</span>;
  }
};

const Card: React.FC<CardProps> = ({ drawnCard, onFlip, index }) => {
  const { card, isReversed, isFlipped } = drawnCard;

  return (
    <div 
      className="relative w-56 h-96 perspective-1000 cursor-pointer group select-none animate-draw"
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={() => !isFlipped && onFlip()}
    >
      <div className={`card-inner relative w-full h-full transform-style-3d transition-transform duration-700 ${isFlipped ? 'card-flipped' : ''}`}>
        
        {/* CARD BACK */}
        <div className="card-back absolute inset-0 w-full h-full rounded-2xl border-[4px] border-amber-600/40 bg-[#121225] flex flex-col items-center justify-center overflow-hidden z-20 backface-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent"></div>
          
          <div className="w-36 h-36 rounded-full border border-amber-500/20 flex items-center justify-center p-3">
            <div className="w-full h-full rounded-full border-2 border-amber-500/40 flex items-center justify-center relative">
               <div className="absolute inset-0 animate-spin-slow border-t-2 border-amber-500/50 rounded-full"></div>
               <span className="text-amber-500 text-5xl drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]">✦</span>
            </div>
          </div>
          
          <div className="mt-10 text-amber-600/40 font-cinzel text-[10px] tracking-[0.4em] uppercase">Click to Reveal</div>
        </div>

        {/* CARD FRONT */}
        <div className="card-front absolute inset-0 w-full h-full rounded-2xl border-[4px] border-amber-500 bg-[#fdfaf5] flex flex-col shadow-2xl overflow-hidden z-10 backface-hidden rotate-y-180">
          {/* Decorative frame */}
          <div className="absolute inset-2 border border-amber-200/50 rounded-xl pointer-events-none"></div>
          
          <div className={`flex-grow flex flex-col items-center justify-between p-6 transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}>
            
            <header className="w-full text-stone-800 font-cinzel font-bold text-center text-sm uppercase tracking-widest border-b-2 border-amber-100 pb-3">
              {card.name}
            </header>
            
            <div className="flex-grow flex flex-col items-center justify-center py-6 text-center">
               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-amber-500/5 blur-2xl rounded-full scale-150"></div>
                  <SuitIcon cardId={card.id} suit={card.suit} />
               </div>
               <p className="text-stone-500 text-xs font-lora italic px-4 leading-relaxed">
                 {card.description}
               </p>
            </div>

            <footer className="w-full flex flex-col items-center gap-3">
              <div className="w-full h-px bg-amber-100"></div>
              <div className={`text-[10px] font-cinzel font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase ${isReversed ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'}`}>
                {isReversed ? 'Reversed' : 'Upright'}
              </div>
            </footer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
