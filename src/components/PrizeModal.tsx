import { X, PartyPopper } from 'lucide-react';
import { Prize } from '../types';

interface PrizeModalProps {
  prize: Prize;
  participantName: string;
  onClose: () => void;
}

export default function PrizeModal({ prize, participantName, onClose }: PrizeModalProps) {
  const isWinner = prize.label !== 'Sin premio';

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
      >
        {/* Header with prize color */}
        <div
          className="px-6 pt-8 pb-6 text-center relative"
          style={{ background: `linear-gradient(135deg, ${prize.color}, ${prize.color}cc)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="text-6xl mb-3 animate-bounce">{prize.emoji}</div>
          <div className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">
            {isWinner ? '¡Felicitaciones!' : '¡Gracias por participar!'}
          </div>
          <h2
            className="font-black text-3xl text-white drop-shadow-lg"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            {prize.label}
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6 text-center space-y-4">
          <div className="space-y-1">
            <p className="text-gray-500 text-sm">Para</p>
            <p className="text-gray-800 font-bold text-lg">{participantName}</p>
          </div>

          {isWinner ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-green-700 font-medium text-sm leading-relaxed">
                  {prize.description}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-xl p-3">
                <PartyPopper className="w-5 h-5 text-gold flex-shrink-0" />
                <p className="text-gold text-xs font-medium text-left">
                  Mostrá esta pantalla en caja para canjear tu premio. Válido solo en este evento.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                No te desanimés. ¡Seguí visitando Mi Gusto y aprovechá nuestras promociones diarias!
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95"
            style={{
              background: prize.color,
              color: prize.textColor,
              boxShadow: `0 4px 0 ${prize.color}88`,
            }}
          >
            {isWinner ? '¡Canjear premio!' : 'Cerrar'}
          </button>

          <p className="text-gray-400 text-xs">
            Válido hasta agotar stock. Solo en el evento de reapertura.
          </p>
        </div>
      </div>
    </div>
  );
}
