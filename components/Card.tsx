
import React from 'react';
import { DrawnCard } from '../types';

interface CardProps {
  drawnCard: DrawnCard;
  onFlip: () => void;
  index: number;
}

const Card: React.FC<CardProps> = ({ drawnCard, onFlip, index }) => {
  const { card, isReversed, isFlipped } = drawnCard;

  return (
    <div 
      className="relative w-48 h-80 perspective-1000 cursor-pointer group"
      onClick={onFlip}
    >
      <div className={`card-inner relative w-full h-full duration-700 ${isFlipped ? 'card-flipped' : ''}`}>
        
        {/* Card Back */}
        <div className="card-back absolute w-full h-full rounded-xl border-4 border-amber-600/30 bg-[#1a1a2e] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-50"></div>
          {/* Celestial Pattern */}
          <div className="z-10 w-32 h-32 rounded-full border border-amber-400/20 flex items-center justify-center">
             <div className="w-24 h-24 rounded-full border-2 border-amber-400/40 animate-pulse flex items-center justify-center">
                <div className="text-amber-500 text-4xl">✧</div>
             </div>
          </div>
          <div className="mt-4 text-amber-600/50 font-cinzel text-xs tracking-widest uppercase">Tap to Reveal</div>
        </div>

        {/* Card Front */}
        <div className={`card-front absolute w-full h-full rounded-xl border-4 border-amber-500 bg-slate-100 flex flex-col p-4 shadow-2xl ${isReversed ? 'rotate-180' : ''}`}>
          <div className="flex-grow flex flex-col items-center justify-between">
            <div className="text-slate-800 font-cinzel font-bold text-center text-sm uppercase tracking-tighter">
              {card.name}
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center py-4 space-y-4">
               {/* Abstract Symbolic Representation since no images are generated */}
               <div className="w-24 h-24 rounded-full bg-slate-200 border-2 border-amber-200 flex items-center justify-center text-5xl">
                 {card.suit === 'Major Arcana' ? '❂' : 
                  card.suit === 'Wands' ? '🪄' : 
                  card.suit === 'Cups' ? '🍷' : 
                  card.suit === 'Swords' ? '🗡️' : '🪙'}
               </div>
               <div className="text-slate-600 text-[10px] text-center italic px-2">
                 {card.description}
               </div>
            </div>

            <div className="w-full h-px bg-slate-300"></div>
            
            <div className="mt-2 text-center">
              <span className="text-xs font-cinzel font-semibold text-amber-700">
                {isReversed ? 'REVERSED' : 'UPRIGHT'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
