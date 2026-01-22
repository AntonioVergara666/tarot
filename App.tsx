
import React, { useState, useEffect, useCallback } from 'react';
import { TAROT_DECK } from './constants';
import { DrawnCard, SpreadType, InterpretationResponse } from './types';
import Card from './components/Card';
import { interpretSpread } from './services/gemini';

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

    // Shuffle and pick cards
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count).map(card => ({
      card,
      isReversed: Math.random() > 0.7, // 30% chance for reversed
      isFlipped: false
    }));

    setDrawnCards(selected);
    setInterpretation(null);
    setError(null);
    setReadingStarted(true);
  };

  const handleFlip = (index: number) => {
    setDrawnCards(prev => prev.map((c, i) => i === index ? { ...c, isFlipped: true } : c));
  };

  const allFlipped = drawnCards.length > 0 && drawnCards.every(c => c.isFlipped);

  const getInterpretation = async () => {
    if (!allFlipped) return;
    setIsInterpreting(true);
    setError(null);
    try {
      const result = await interpretSpread(spreadType, drawnCards);
      setInterpretation(result);
    } catch (err: any) {
      setError(err.message || "An unexpected shadow clouded our vision.");
    } finally {
      setIsInterpreting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative pb-20">
      {/* Sparkles Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="sparkle absolute text-amber-300 opacity-0 text-xl"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >✧</div>
        ))}
      </div>

      {/* Header */}
      <header className="pt-10 pb-6 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-amber-500 tracking-widest drop-shadow-lg">
          CELESTIAL TAROT
        </h1>
        <p className="mt-2 text-blue-200/60 font-cinzel italic text-sm md:text-base">
          Unlock the secrets written in the stars
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 z-10">
        {!readingStarted ? (
          <div className="max-w-md w-full bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-amber-600/30 text-center shadow-2xl">
            <div className="text-amber-500 text-5xl mb-6">🔮</div>
            <h2 className="text-2xl font-cinzel mb-4">Choose Your Path</h2>
            <div className="space-y-4">
              {Object.values(SpreadType).map(type => (
                <button
                  key={type}
                  onClick={() => setSpreadType(type)}
                  className={`w-full py-3 px-6 rounded-lg font-cinzel border transition-all ${
                    spreadType === type 
                    ? 'bg-amber-600 border-amber-400 text-white' 
                    : 'bg-white/5 border-amber-600/30 text-amber-500 hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button 
              onClick={startReading}
              className="mt-8 w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl font-cinzel font-bold tracking-widest shadow-lg transform active:scale-95 transition-all"
            >
              DRAW CARDS
            </button>
          </div>
        ) : (
          <div className="w-full max-w-5xl flex flex-col items-center">
            
            {/* Cards Layout */}
            <div className={`flex flex-wrap justify-center gap-8 mb-12`}>
              {drawnCards.map((dc, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="mb-2 text-xs font-cinzel text-amber-400/60 uppercase tracking-widest">
                    {spreadType === SpreadType.TIMELINE ? (['Past', 'Present', 'Future'][i]) : 
                     spreadType === SpreadType.CROSSROADS ? (['Situation', 'Challenge'][i]) : 
                     'Spirit Message'}
                  </div>
                  <Card drawnCard={dc} onFlip={() => handleFlip(i)} index={i} />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center space-y-4">
              {allFlipped && !interpretation && !isInterpreting && (
                <button 
                  onClick={getInterpretation}
                  className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-cinzel font-bold tracking-widest shadow-xl transition-all animate-bounce"
                >
                  SEEK INTERPRETATION
                </button>
              )}

              {isInterpreting && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-cinzel text-amber-400 animate-pulse">Consulting the Oracles...</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-900/40 border border-red-500 rounded-lg text-red-200 font-cinzel text-sm">
                  {error}
                </div>
              )}

              <button 
                onClick={() => setReadingStarted(false)}
                className="text-amber-500/60 hover:text-amber-500 font-cinzel text-sm underline underline-offset-4"
              >
                Reset Reading
              </button>
            </div>

            {/* Interpretation Results */}
            {interpretation && (
              <div className="mt-12 w-full bg-black/50 backdrop-blur-xl rounded-3xl border border-amber-500/30 p-8 md:p-12 shadow-2xl animate-fade-in-up">
                <div className="max-w-3xl mx-auto space-y-12">
                  
                  <section>
                    <h3 className="text-3xl font-cinzel text-amber-500 mb-4 border-b border-amber-500/20 pb-2">The Celestial Summary</h3>
                    <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-cinzel first-letter:mr-2 first-letter:float-left first-letter:text-amber-400">
                      {interpretation.summary}
                    </p>
                  </section>

                  <section className="grid md:grid-cols-2 gap-8">
                    {drawnCards.map((dc, i) => {
                      const reading = interpretation.cardReadings.find(r => r.cardId === dc.card.id);
                      return (
                        <div key={i} className="bg-white/5 rounded-2xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-colors">
                          <h4 className="font-cinzel text-amber-400 text-lg mb-2">
                            {dc.card.name} <span className="text-[10px] opacity-50 ml-2">({dc.isReversed ? 'Reversed' : 'Upright'})</span>
                          </h4>
                          <p className="text-sm text-blue-100/80 italic mb-4">
                            "{dc.isReversed ? dc.card.meaning_rev : dc.card.meaning_up}"
                          </p>
                          <p className="text-sm leading-relaxed text-slate-300">
                            {reading?.insight || "Wisdom is unfolding..."}
                          </p>
                        </div>
                      );
                    })}
                  </section>

                  <section className="bg-amber-600/10 p-6 rounded-2xl border border-amber-500/40">
                    <h3 className="text-xl font-cinzel text-amber-500 mb-2">Final Guidance</h3>
                    <p className="italic text-amber-200/90 leading-relaxed">
                      {interpretation.advice}
                    </p>
                  </section>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-auto py-8 text-center text-amber-600/40 text-xs font-cinzel tracking-widest">
        &copy; 2024 CELESTIAL TAROT • SPIRITUAL INSIGHT POWERED BY GEMINI
      </footer>
    </div>
  );
};

export default App;
