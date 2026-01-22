
import React, { useState } from 'react';
import { TAROT_DECK } from './constants';
import { DrawnCard, SpreadType, InterpretationResponse } from './types';
import Card from './components/Card';
import { interpretSpread } from './services/gemini';

const Logo: React.FC = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center animate-float">
    {/* Mystic Sun/Moon SVG Logo */}
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="40" fill="url(#sunGrad)" />
      <g className="animate-spin-slow" style={{ transformOrigin: 'center' }}>
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d="M100,20 L110,50 L90,50 Z"
            fill="#d97706"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="10 5" />
      <path d="M100,70 A30,30 0 0,1 100,130 A30,30 0 0,0 100,70" fill="#05050a" opacity="0.8" />
    </svg>
    <div className="absolute text-amber-200 text-3xl font-cinzel">✧</div>
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
    let count = 1;
    if (spreadType === SpreadType.CROSSROADS) count = 2;
    if (spreadType === SpreadType.TIMELINE) count = 3;

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
    <div className="min-h-screen flex flex-col relative pb-20 overflow-hidden">
      {/* Mystical Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-900/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Sparkles Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(40)].map((_, i) => (
          <div 
            key={i}
            className="sparkle absolute text-amber-400/20 text-[8px]"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >✦</div>
        ))}
      </div>

      <header className="pt-20 pb-16 text-center z-20">
        <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-amber-500 tracking-[0.3em] drop-shadow-[0_0_20px_rgba(245,158,11,0.5)] uppercase">
          Celestial Tarot
        </h1>
        <div className="mt-8 flex items-center justify-center gap-8 opacity-40">
           <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-amber-500"></div>
           <p className="text-blue-100 font-cinzel italic text-xs tracking-[0.5em] uppercase">
             Woven in the loom of destiny
           </p>
           <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-amber-500"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 z-20 w-full max-w-7xl mx-auto">
        {!readingStarted ? (
          <div className="max-w-xl w-full bg-[#0a0a14]/60 backdrop-blur-2xl p-12 md:p-16 rounded-[3rem] border border-amber-500/10 text-center shadow-[0_0_80px_rgba(0,0,0,0.7)]">
            <div className="mb-12 flex justify-center">
               <Logo />
            </div>
            
            <h2 className="text-3xl font-cinzel text-amber-100 mb-10 tracking-widest uppercase border-b border-amber-500/10 pb-4 inline-block">Choose Your Spread</h2>
            
            <div className="grid gap-4 mb-12">
              {Object.values(SpreadType).map(type => (
                <button
                  key={type}
                  onClick={() => setSpreadType(type)}
                  className={`py-5 px-10 rounded-2xl font-cinzel text-sm border transition-all duration-500 flex items-center justify-between group overflow-hidden relative ${
                    spreadType === type 
                    ? 'bg-amber-600/90 border-amber-400 text-white shadow-xl scale-[1.02]' 
                    : 'bg-white/5 border-white/5 text-stone-400 hover:border-amber-500/30 hover:text-amber-100'
                  }`}
                >
                  <span className="tracking-[0.2em] relative z-10 uppercase font-bold">{type}</span>
                  <span className={`text-lg transition-all duration-500 ${spreadType === type ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90 group-hover:opacity-100 group-hover:rotate-0'}`}>✦</span>
                </button>
              ))}
            </div>

            <button 
              onClick={startReading}
              className="w-full py-6 bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white rounded-[2rem] font-cinzel font-bold tracking-[0.4em] shadow-2xl transform active:scale-[0.98] transition-all uppercase text-lg"
            >
              Draw Cards
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            
            <div className="flex flex-wrap justify-center gap-12 mb-24 min-h-[500px]">
              {drawnCards.map((dc, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="mb-6 text-[11px] font-cinzel text-amber-500/50 uppercase tracking-[0.6em] font-bold group-hover:text-amber-500 transition-colors">
                    {spreadType === SpreadType.TIMELINE ? (['The Past', 'The Present', 'The Future'][i]) : 
                     spreadType === SpreadType.CROSSROADS ? (['Your Path', 'The Challenge'][i]) : 
                     'Spirit Message'}
                  </div>
                  <Card drawnCard={dc} onFlip={() => handleFlip(i)} index={i} />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-10 min-h-[160px]">
              {allFlipped && !interpretation && !isInterpreting && (
                <button 
                  onClick={handleInterpret}
                  className="px-20 py-7 bg-white text-stone-950 rounded-full font-cinzel font-bold tracking-[0.4em] shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95 animate-pulse uppercase text-base"
                >
                  Reveal Wisdom
                </button>
              )}

              {isInterpreting && (
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 border-[3px] border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                  <p className="font-cinzel text-amber-400 text-xs tracking-[0.5em] uppercase animate-pulse">Consulting the Ancestors...</p>
                </div>
              )}

              {error && (
                <div className="px-10 py-5 bg-red-950/50 border border-red-800/40 rounded-3xl text-red-100 font-cinzel text-[11px] tracking-[0.3em] uppercase">
                  {error}
                </div>
              )}

              {!isInterpreting && (
                <button 
                  onClick={() => setReadingStarted(false)}
                  className="text-amber-500/30 hover:text-amber-500 font-cinzel text-[10px] uppercase tracking-[0.5em] transition-all border-b border-transparent hover:border-amber-500/50"
                >
                  New Reading
                </button>
              )}
            </div>

            {interpretation && (
              <div id="reading-results" className="mt-28 w-full bg-[#0a0a14]/90 backdrop-blur-3xl rounded-[4rem] border border-amber-500/10 p-12 md:p-24 shadow-[0_0_120px_rgba(0,0,0,0.8)] animate-fade-in relative">
                <div className="max-w-5xl mx-auto space-y-24">
                  
                  <header className="text-center space-y-10">
                    <div className="text-amber-500 text-4xl opacity-30 tracking-[1em]">✧✧✧</div>
                    <h3 className="text-5xl font-cinzel text-amber-500 tracking-[0.3em] uppercase drop-shadow-sm">The Oracle Speaks</h3>
                    <p className="text-3xl leading-relaxed text-stone-100 font-lora italic max-w-3xl mx-auto font-light border-x border-amber-500/10 px-10">
                      "{interpretation.summary}"
                    </p>
                  </header>

                  <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>

                  <section className="grid lg:grid-cols-2 gap-16">
                    {drawnCards.map((dc, i) => {
                      const reading = interpretation.cardReadings.find(r => r.cardId === dc.card.id);
                      return (
                        <div key={i} className="relative group">
                          <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/10 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                          <div className="relative bg-black/40 rounded-[3rem] p-12 border border-white/5 hover:border-amber-500/20 transition-all duration-700 flex flex-col h-full shadow-inner">
                            <div className="flex items-center gap-6 mb-8">
                               <div className="w-12 h-12 rounded-full bg-amber-950/50 border border-amber-500/30 flex items-center justify-center font-cinzel text-amber-500 text-sm shadow-lg">
                                 {i + 1}
                               </div>
                               <h4 className="font-cinzel text-amber-400 text-2xl tracking-widest uppercase">
                                 {dc.card.name}
                               </h4>
                            </div>
                            <p className="text-stone-200 font-lora leading-loose text-lg italic mb-8 border-l-4 border-amber-500/10 pl-8 py-2">
                              {reading?.insight || "Spirit is preparing your message..."}
                            </p>
                            <div className="mt-auto pt-8 flex items-center justify-between text-[11px] font-cinzel tracking-[0.3em] uppercase opacity-40">
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

                  <section className="relative bg-[#111] p-16 rounded-[4rem] border border-amber-500/10 text-center overflow-hidden shadow-2xl">
                    <div className="absolute -top-10 -right-10 text-[12rem] text-amber-500/5 font-cinzel pointer-events-none select-none">✦</div>
                    <h3 className="text-xs font-cinzel text-amber-500 mb-8 tracking-[0.8em] uppercase font-black">Celestial Counsel</h3>
                    <p className="text-stone-100 font-lora text-2xl leading-relaxed italic max-w-3xl mx-auto border-y border-amber-500/10 py-10">
                      {interpretation.advice}
                    </p>
                  </section>
                  
                  <div className="text-center pt-16">
                     <button 
                       onClick={() => {
                         setReadingStarted(false);
                         window.scrollTo({ top: 0, behavior: 'smooth' });
                       }}
                       className="text-amber-500/40 hover:text-amber-500 font-cinzel text-xs tracking-[0.5em] uppercase border border-amber-500/20 px-16 py-6 rounded-full hover:bg-amber-500/5 transition-all font-bold"
                     >
                       Close the Vision
                     </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-auto py-20 text-center z-20 opacity-30 group cursor-default">
        <div className="inline-flex items-center gap-12 transition-all group-hover:gap-16">
           <div className="h-px w-20 bg-amber-900"></div>
           <p className="text-amber-600 text-[10px] font-cinzel tracking-[0.8em] uppercase group-hover:text-amber-400 transition-colors">
             Celestial Tarot &bull; Insigh powered by Gemini
           </p>
           <div className="h-px w-20 bg-amber-900"></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
