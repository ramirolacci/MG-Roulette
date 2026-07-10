import { useState, useEffect } from 'react';
import { Prize } from '../types';

export function usePrizes() {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(new URL('/prizes.json', import.meta.url).href)
      .then((r) => r.json())
      .then((data: Prize[]) => {
        setPrizes(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback inline prizes if fetch fails (offline)
        setPrizes([
          { id: 1, label: '10% OFF', description: '10% de descuento', color: '#E53E3E', textColor: '#FFFFFF', probability: 0.3, emoji: '🏷️' },
          { id: 2, label: '20% OFF', description: '20% de descuento', color: '#DD6B20', textColor: '#FFFFFF', probability: 0.15, emoji: '💰' },
          { id: 3, label: 'Empanada gratis', description: 'Una empanada gratis', color: '#38A169', textColor: '#FFFFFF', probability: 0.15, emoji: '🥟' },
          { id: 4, label: 'Bebida gratis', description: 'Una bebida gratis', color: '#3182CE', textColor: '#FFFFFF', probability: 0.10, emoji: '🥤' },
          { id: 5, label: 'Postre gratis', description: 'Un postre gratis', color: '#D53F8C', textColor: '#FFFFFF', probability: 0.10, emoji: '🍮' },
          { id: 6, label: '2x1 Empanadas', description: 'Comprás una, llevás dos', color: '#805AD5', textColor: '#FFFFFF', probability: 0.05, emoji: '🎉' },
          { id: 7, label: 'Sin premio', description: '¡Seguí participando!', color: '#718096', textColor: '#FFFFFF', probability: 0.10, emoji: '😅' },
          { id: 8, label: 'Snack gratis', description: 'Un snack gratis', color: '#D69E2E', textColor: '#FFFFFF', probability: 0.05, emoji: '🥙' },
        ]);
        setLoading(false);
      });
  }, []);

  const spinPrize = (prizeList: Prize[]): Prize => {
    const rand = Math.random();
    let cumulative = 0;
    for (const prize of prizeList) {
      cumulative += prize.probability;
      if (rand <= cumulative) return prize;
    }
    return prizeList[prizeList.length - 1];
  };

  return { prizes, loading, spinPrize };
}
