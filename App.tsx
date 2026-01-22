
import React, { useState } from 'react';
import { TAROT_DECK } from './constants';
import { DrawnCard, SpreadType, InterpretationResponse } from './types';
import Card from './components/Card';
import { interpretSpread } from './services/gemini';

const Logo: React.FC = () => (
  <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center animate-float z-30">
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer rays */}
      <g className="animate-spin-slow" style={{ transformOrigin: 'center' }}>
        {[...Array(16)].map((_, i) => (
          <path
            key={i}
            d="M100,10 L115,60 L85,60 Z"
            fill="#d97706"
            transform={`rotate(${i * 22.5} 100 100)`}
            className="opacity-80"
          />
        ))}
      </g>
      
      {/* Main sun circle */}
      <circle cx="100" cy="100" r="45" fill="url(#sunGrad)" filter="url(#glow)" />
      
      {/* Mystical details */}
      <circle cx="100" cy="100" r="65" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="15 8" opacity="0.6" />
      <circle cx="100" cy="100" r="75" fill="none" stroke="#d97706" strokeWidth="0.5" opacity="0.4" />
      
      {/* Inner Crescent */}
      <path d="M100,70 A30,30 0 0,1 100,130 A25,25 0 0,0 100,70" fill="#1a1a2e" />
    </svg>
    <div className="absolute text-white text-4xl font-cinzel drop-shadow-lg select-none">✧</div>
  </div>
);

const App: React.FC = () => {
  const [readingStarted, setReadingStarted] = useState(false);
  const [spreadType, setSpreadType] = useState<SpreadType>(SpreadType.DAILY);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [interpretation, setInterpretation] = useState<InterpretationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startReading = () => {
    const count = spreadType === SpreadType.CROSSROADS ? 2 : spreadType === SpreadType.TIMELINE ? 3 : 1;
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count).map(card => ({
      card,
      isReversed: Math.random() > 0.65,
      isFlipped: false
    }));

    setDrawnCards(selected);
    setInterpretation(null);
    setError(null);
    setReadingStarted(true);
  };

  const handleFlip = (index: number) => {
    setDrawnCards(prev => {
      const next = [...prev];
      next[index] = { ...next[index], isFlipped: true };
      return next;
    });
  };

  const allFlipped = drawnCards.length > 0 && drawnCards.every(c => c.isFlipped);

  const handleInterpret = async () => {
    if (!allFlipped || isInterpreting) return;
    setIsInterpreting(true);
    setError(null);
    try {
      const result = await interpretSpread(spreadType, drawnCards);
      setInterpretation(result);
      setTimeout(() => {
        document.getElementById('reading-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setError(err.message || "The celestial whispers were unclear.");
    } finally {
      setIsInterpreting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative pb-20 overflow-hidden animate-fade-in">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-900/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="sparkle absolute text-amber-200/40 text-[10px]"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >✦</div>
        ))}
      </div>

      <header className="pt-16 pb-12 text-center z-20">
        <h1 className="text-4xl md:text-7xl font-cinzel font-bold text-amber-500 tracking-[0.3em] drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] uppercase">
          Celestial Tarot
        </h1>
        <div className="mt-6 flex items-center justify-center gap-6 opacity-60">
           <div className="h-[2px] w-12 md:w-20 bg-gradient-to-r from-transparent to-amber-500"></div>
           <p className="text-blue-100 font-cinzel italic text-[10px] md:text-xs tracking-[0.4em] uppercase">
             Mirror of the Divine
           </p>
           <div className="h-[2px] w-12 md:w-20 bg-gradient-to-l from-transparent to-amber-500"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 z-20 w-full max-w-7xl mx-auto">
        {!readingStarted ? (
          <div className="max-w-xl w-full bg-[#0d0d1f]/80 backdrop-blur-3xl p-10 md:p-16 rounded-[3rem] border border-amber-500/20 text-center shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-t-amber-500/30">
            <div className="mb-10 flex justify-center">
               <Logo />
            </div>
            
            <h2 className="text-2xl font-cinzel text-amber-100 mb-8 tracking-widest uppercase">Select Your Path</h2>
            
            <div className="grid gap-3 mb-10">
              {Object.values(SpreadType).map(type => (
                <button
                  key={type}
                  onClick={() => setSpreadType(type)}
                  className={`py-4 px-8 rounded-2xl font-cinzel text-xs border transition-all duration-300 flex items-center justify-between group ${
                    spreadType === type 
                    ? 'bg-amber-600 border-amber-400 text-white shadow-[0_0_25px_rgba(217,119,6,0.3)] scale-[1.03]' 
                    : 'bg-white/5 border-white/5 text-stone-400 hover:border-amber-500/40 hover:text-amber-100 hover:bg-white/10'
                  }`}
                >
                  <span className="tracking-[0.2em] uppercase font-semibold">{type}</span>
                  <span className={`transition-all duration-300 ${spreadType === type ? 'opacity-100 scale-110' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'}`}>✦</span>
                </button>
              ))}
            </div>

            <button 
              onClick={startReading}
              className="w-full py-5 bg-gradient-to-br from-amber-400 to-amber-700 hover:from-amber-300 hover:to-amber-600 text-white rounded-[1.5rem] font-cinzel font-bold tracking-[0.4em] shadow-2xl transform active:scale-[0.97] transition-all uppercase text-lg"
            >
              Cast the Cards
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            
            <div className="flex flex-wrap justify-center gap-10 md:gap-14 mb-20 min-h-[500px]">
              {drawnCards.map((dc, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="mb-4 text-[11px] font-cinzel text-amber-400/50 uppercase tracking-[0.5em] font-bold group-hover:text-amber-400 transition-colors">
                    {spreadType === SpreadType.TIMELINE ? (['The Past', 'The Present', 'The Future'][i]) : 
                     spreadType === SpreadType.CROSSROADS ? (['The Situation', 'The Challenge'][i]) : 
                     'The Oracle Message'}
                  </div>
                  <Card drawnCard={dc} onFlip={() => handleFlip(i)} index={i} />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-10 min-h-[160px]">
              {allFlipped && !interpretation && !isInterpreting && (
                <button 
                  onClick={handleInterpret}
                  className="px-16 py-6 bg-white text-stone-900 rounded-full font-cinzel font-bold tracking-[0.3em] shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95 animate-pulse uppercase text-sm border-2 border-amber-200"
                >
                  Deep Interpretation
                </button>
              )}

              {isInterpreting && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-14 h-14 border-[3px] border-amber-500/20 border-t-amber-400 rounded-full animate-spin"></div>
                  <p className="font-cinzel text-amber-400 text-[10px] tracking-[0.5em] uppercase animate-pulse">Whispers of the Eternal...</p>
                </div>
              )}

              {error && (
                <div className="px-8 py-4 bg-red-950/60 border border-red-800/40 rounded-3xl text-red-100 font-cinzel text-[10px] tracking-widest uppercase">
                  {error}
                </div>
              )}

              {!isInterpreting && (
                <button 
                  onClick={() => setReadingStarted(false)}
                  className="text-amber-500/40 hover:text-amber-500 font-cinzel text-[10px] uppercase tracking-[0.5em] transition-all border-b border-transparent hover:border-amber-500/50"
                >
                  New Reading
                </button>
              )}
            </div>

            {interpretation && (
              <div id="reading-results" className="mt-28 w-full bg-[#050510]/95 backdrop-blur-3xl rounded-[3rem] border border-amber-500/20 p-8 md:p-20 shadow-[0_50px_150px_rgba(0,0,0,0.9)] animate-draw relative z-30">
                <div className="max-w-5xl mx-auto space-y-20">
                  
                  <header className="text-center space-y-8">
                    <div className="text-amber-500 text-3xl opacity-30 tracking-[0.8em]">✦✦✦</div>
                    <h3 className="text-4xl md:text-5xl font-cinzel text-amber-400 tracking-[0.2em] uppercase">The Revelation</h3>
                    <p className="text-2xl md:text-3xl leading-relaxed text-stone-100 font-lora italic max-w-3xl mx-auto font-light border-y border-amber-500/10 py-10">
                      "{interpretation.summary}"
                    </p>
                  </header>

                  <section className="grid lg:grid-cols-2 gap-12">
                    {drawnCards.map((dc, i) => {
                      const reading = interpretation.cardReadings.find(r => r.cardId === dc.card.id);
                      return (
                        <div key={i} className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/10 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                          <div className="relative bg-[#111125]/80 rounded-[2.5rem] p-10 border border-white/5 hover:border-amber-500/30 transition-all duration-500 flex flex-col h-full shadow-2xl">
                            <div className="flex items-center gap-5 mb-6">
                               <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center font-cinzel text-amber-500 text-sm">
                                 {i + 1}
                               </div>
                               <h4 className="font-cinzel text-amber-300 text-xl tracking-widest uppercase">
                                 {dc.card.name}
                               </h4>
                            </div>
                            <p className="text-stone-200 font-lora leading-loose text-base italic mb-8 border-l-2 border-amber-500/20 pl-6 py-1">
                              {reading?.insight || "Wisdom is being gathered..."}
                            </p>
                            <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-cinzel tracking-widest uppercase opacity-40">
                               <span className="font-bold">Position {i + 1}</span>
                               <span className={`font-bold ${dc.isReversed ? 'text-red-400' : 'text-green-400'}`}>
                                 {dc.isReversed ? 'Reversed' : 'Upright'}
                               </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </section>

                  <section className="relative bg-gradient-to-br from-stone-900 to-black p-12 md:p-16 rounded-[3rem] border border-amber-500/20 text-center overflow-hidden shadow-inner">
                    <div className="absolute -top-10 -right-10 text-[10rem] text-amber-500/5 font-cinzel pointer-events-none select-none">✧</div>
                    <h3 className="text-[10px] font-cinzel text-amber-500 mb-8 tracking-[0.6em] uppercase font-bold">Divine Counsel</h3>
                    <p className="text-stone-100 font-lora text-xl md:text-2xl leading-relaxed italic max-w-3xl mx-auto">
                      {interpretation.advice}
                    </p>
                  </section>
                  
                  <div className="text-center pt-10">
                     <button 
                       onClick={() => {
                         setReadingStarted(false);
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                       }}
                       className="text-amber-500/40 hover:text-amber-500 font-cinzel text-xs tracking-[0.4em] uppercase border border-amber-500/20 px-12 py-5 rounded-full hover:bg-amber-500/5 transition-all font-semibold"
                     >
                       Close Vision
                     </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-auto py-16 text-center z-20 opacity-30 group cursor-default">
        <div className="inline-flex items-center gap-10">
           <div className="h-px w-16 bg-amber-900"></div>
           <p className="text-amber-600 text-[9px] font-cinzel tracking-[0.6em] uppercase group-hover:text-amber-400 transition-colors">
             Celestial Tarot &bull; Powered by Gemini
           </p>
           <div className="h-px w-16 bg-amber-900"></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
