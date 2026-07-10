import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Prize, Participant } from '../types';
import Roulette from '../components/Roulette';
import PrizeModal from '../components/PrizeModal';

interface RoulettePageProps {
  prizes: Prize[];
  participant: Participant;
  onBack: () => void;
  onPrizeWon: (prize: Prize) => void;
  onRestart: () => void;
}

type SpinState = 'idle' | 'spinning' | 'done';

export default function RoulettePage({ prizes, participant, onBack, onPrizeWon, onRestart }: RoulettePageProps) {
  const [spinState, setSpinState] = useState<SpinState>('idle');
  const [targetIndex, setTargetIndex] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [showModal, setShowModal] = useState(false);

  const spinPrize = (): Prize => {
    const rand = Math.random();
    let cumulative = 0;
    for (const prize of prizes) {
      cumulative += prize.probability;
      if (rand <= cumulative) return prize;
    }
    return prizes[prizes.length - 1];
  };

  const handleSpin = () => {
    if (spinState !== 'idle') return;
    const prize = spinPrize();
    const idx = prizes.findIndex((p) => p.id === prize.id);
    setTargetIndex(idx >= 0 ? idx : 0);
    setWonPrize(prize);
    setSpinState('spinning');
  };

  const handleSpinEnd = () => {
    setSpinState('done');
    setTimeout(() => setShowModal(true), 600);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (wonPrize) onPrizeWon(wonPrize);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />
      {/* Header */}
      <div className="relative flex items-center gap-4 px-6 pt-8 pb-4">
        {spinState === 'idle' && (
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/10"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        )}
        <div>
          <h2 className="text-white font-black text-2xl">¡La ruleta!</h2>
          <p className="text-white/80 text-sm">Hola, {participant.name.split(' ')[0]} — Paso 2 de 2</p>
        </div>
        <div className="ml-auto w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-lg border border-white/10">
          <img src={new URL('/LOGOBOT.png', import.meta.url).href} alt="Mi Gusto" className="w-8 h-8 object-contain" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative px-6 mb-2">
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-2 bg-gold rounded-full w-full transition-all duration-500" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-between px-6 py-6 gap-6">
        {/* Roulette */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="relative w-full max-w-[380px] aspect-square">
            {prizes.length > 0 && (
              <Roulette
                prizes={prizes}
                targetIndex={targetIndex}
                spinning={spinState === 'spinning'}
                onSpinEnd={handleSpinEnd}
              />
            )}
          </div>
        </div>

        {/* Prizes preview strip */}
        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 pb-2" style={{ width: 'max-content' }}>
            {prizes.map((prize) => (
              <div
                key={prize.id}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-white text-xs font-semibold flex-shrink-0"
                style={{ background: prize.color + 'dd' }}
              >
                <span className="text-base">{prize.emoji}</span>
                <span className="whitespace-nowrap max-w-[72px] text-center leading-tight">{prize.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="w-full space-y-3">
          {spinState === 'idle' && (
            <button
              onClick={handleSpin}
              className="w-full bg-gold hover:brightness-110 active:scale-95 text-black font-black text-2xl py-5 rounded-2xl shadow-2xl transition-all duration-200 border-b-4 border-[#a67c20] flex items-center justify-center gap-3"
            >
              🎰 ¡GIRAR!
            </button>
          )}

          {spinState === 'spinning' && (
            <div className="w-full bg-white/20 text-white font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-3 animate-pulse">
              ⏳ Girando...
            </div>
          )}

          {spinState === 'done' && (
            <div className="space-y-3">
              <div className="w-full bg-green-500 text-white font-black text-xl py-4 rounded-2xl flex items-center justify-center gap-2">
                🎉 ¡Premio listo!
              </div>
              <button
                onClick={onRestart}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-bold text-base py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Nueva participación
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Prize modal */}
      {showModal && wonPrize && (
        <PrizeModal
          prize={wonPrize}
          participantName={participant.name}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
