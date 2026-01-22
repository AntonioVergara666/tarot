
import React from 'react';
import { DrawnCard, Suit } from '../types';

interface CardProps {
  drawnCard: DrawnCard;
  onFlip: () => void;
  index: number;
}

const SuitIcon: React.FC<{ cardId: string; suit: Suit }> = ({ cardId, suit }) => {
  if (suit === Suit.MAJOR) {
    const majorIcons: Record<string, string> = {
      '0': '✨', '1': '🧙', '2': '🌑', '3': '🌿', '4': '🏰', '5': '🕍', '6': '💞', '7': '⚔️',
      '8': '🦁', '9': '🏮', '10': '☸️', '11': '⚖️', '12': '⚓', '13': '💀', '14': '🕊️',
      '15': '🔥', '16': '⚡', '17': '⭐', '18': '🌙', '19': '☀️', '20': '🎺', '21': '🌍'
    };
    return <span className="text-6xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]">{majorIcons[cardId] || '🧿'}</span>;
  }

  switch (suit) {
    case Suit.WANDS:
      return (
        <svg viewBox="0 0 24 24" className="w-24 h-24 fill-amber-700/80 drop-shadow-sm">
          <path d="M13.5,1.5L14.7,2.7L4.2,13.2L3,12L13.5,1.5M17,4.5L18.2,5.7L15.7,8.2L14.5,7L17,4.5M21,8.5L22.2,9.7L19.7,12.2L18.5,11L21,8.5M2.5,21.5L1.3,20.3L11.8,9.8L13,11L2.5,21.5Z" />
        </svg>
      );
    case Suit.CUPS:
      return (
        <svg viewBox="0 0 24 24" className="w-24 h-24 fill-blue-600/80 drop-shadow-sm">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6V18M6,12H18"/>
        </svg>
      );
    case Suit.SWORDS:
      return (
        <svg viewBox="0 0 24 24" className="w-24 h-24 fill-slate-500/80 drop-shadow-sm">
          <path d="M21,3L18,6L13,11L11,13L8,16L6,18L3,21L4,22L7,19L9,17L12,14L14,12L19,7L22,4L21,3M14,6L12,8L15,11L17,9L14,6"/>
        </svg>
      );
    case Suit.PENTACLES:
      return (
        <svg viewBox="0 0 24 24" className="w-24 h-24 fill-yellow-600/80 drop-shadow-sm">
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
      className="relative w-64 h-[400px] perspective-1000 cursor-pointer group select-none animate-draw"
      style={{ animationDelay: `${index * 150}ms` }}
      onClick={() => !isFlipped && onFlip()}
    >
      <div className={`card-inner relative w-full h-full transform-style-3d transition-transform duration-700 ${isFlipped ? 'card-flipped' : ''}`}>
        
        {/* CARD BACK */}
        <div className="card-back absolute inset-0 w-full h-full rounded-[1.5rem] border-[4px] border-amber-600/30 bg-[#0f0f1f] flex flex-col items-center justify-center overflow-hidden z-20 backface-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent"></div>
          
          <div className="w-40 h-40 rounded-full border-2 border-amber-500/20 flex items-center justify-center p-4">
            <div className="w-full h-full rounded-full border-2 border-amber-500/50 flex items-center justify-center relative">
               <div className="absolute inset-0 animate-spin-slow border-t-2 border-amber-400/60 rounded-full"></div>
               <span className="text-amber-500 text-5xl drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]">✦</span>
            </div>
          </div>
          
          <div className="mt-12 text-amber-500/40 font-cinzel text-[10px] tracking-[0.5em] uppercase font-bold">Touch to Reveal</div>
        </div>

        {/* CARD FRONT */}
        <div className="card-front absolute inset-0 w-full h-full rounded-[1.5rem] border-[4px] border-amber-500 bg-[#fffdfa] flex flex-col shadow-2xl overflow-hidden z-10 backface-hidden rotate-y-180">
          <div className="absolute inset-2 border border-amber-200/40 rounded-xl pointer-events-none"></div>
          
          <div className={`flex-grow flex flex-col items-center justify-between p-6 transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}>
            
            <header className="w-full text-stone-900 font-cinzel font-bold text-center text-sm uppercase tracking-[0.2em] border-b-2 border-amber-100/60 pb-4">
              {card.name}
            </header>
            
            <div className="flex-grow flex flex-col items-center justify-center py-6 text-center">
               <div className="relative mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full scale-[2]"></div>
                  <SuitIcon cardId={card.id} suit={card.suit} />
               </div>
               <p className="text-stone-600 text-[11px] font-lora italic px-6 leading-relaxed">
                 {card.description}
               </p>
            </div>

            <footer className="w-full flex flex-col items-center gap-3">
              <div className="w-full h-px bg-amber-200/40"></div>
              <div className={`text-[10px] font-cinzel font-bold tracking-[0.3em] px-5 py-2 rounded-full uppercase ${isReversed ? 'text-red-700 bg-red-50' : 'text-amber-700 bg-amber-50'}`}>
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
