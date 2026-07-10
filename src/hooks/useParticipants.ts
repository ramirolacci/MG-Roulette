import { useState, useCallback } from 'react';
import { Participant } from '../types';

const STORAGE_KEY = 'migusto_participants';

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addParticipant = useCallback((participant: Participant) => {
    setParticipants((prev) => {
      const updated = [...prev, participant];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage unavailable — data lives in memory only
      }
      return updated;
    });
  }, []);

  const updateParticipantPrize = useCallback((id: string, prizeId: number, prizeLabel: string) => {
    setParticipants((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, prizeId, prizeLabel } : p
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // silent
      }
      return updated;
    });
  }, []);

  const exportCSV = useCallback(() => {
    const headers = ['ID', 'Nombre', 'Email', 'Teléfono', 'Barrio', 'Acepta comunicaciones', 'Premio', 'Fecha'];
    const rows = participants.map((p) => [
      p.id,
      p.name,
      p.email,
      p.phone,
      p.neighborhood,
      p.acceptsMarketing ? 'Sí' : 'No',
      p.prizeLabel ?? 'Sin premio',
      p.timestamp,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `migusto-participantes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [participants]);

  return { participants, addParticipant, updateParticipantPrize, exportCSV };
}
