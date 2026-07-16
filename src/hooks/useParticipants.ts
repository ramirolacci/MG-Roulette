import { useState, useCallback, useEffect } from 'react';
import { Participant } from '../types';
import { supabase } from '../utils/supabase';

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

  // Cargar participantes de Supabase al iniciar
  useEffect(() => {
    async function loadParticipants() {
      try {
        const { data, error } = await supabase
          .from('participants')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) {
          console.error('Error al cargar participantes de Supabase:', error.message);
          return;
        }

        if (data) {
          const mapped: Participant[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            neighborhood: item.neighborhood,
            acceptsMarketing: item.accepts_marketing,
            prizeId: item.prize_id,
            prizeLabel: item.prize_label,
            timestamp: item.timestamp || new Date().toISOString(),
          }));
          setParticipants(mapped);
          
          // Sincronizar localmente también
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        }
      } catch (err) {
        console.error('Error de red/servidor al cargar participantes:', err);
      }
    }

    loadParticipants();
  }, []);

  const addParticipant = useCallback(async (participant: Participant) => {
    // 1. Actualizar estado local inmediatamente para UX fluida
    setParticipants((prev) => {
      const updated = [...prev, participant];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // silent fallback
      }
      return updated;
    });

    // 2. Guardar en Supabase
    try {
      const { error } = await supabase.from('participants').insert([
        {
          id: participant.id,
          name: participant.name,
          email: participant.email,
          phone: participant.phone,
          neighborhood: participant.neighborhood,
          accepts_marketing: participant.acceptsMarketing,
          prize_id: participant.prizeId,
          prize_label: participant.prizeLabel,
          timestamp: participant.timestamp,
        },
      ]);

      if (error) {
        console.error('Error al insertar participante en Supabase:', error.message);
      }
    } catch (err) {
      console.error('Error de red al guardar participante:', err);
    }
  }, []);

  const updateParticipantPrize = useCallback(async (id: string, prizeId: number, prizeLabel: string) => {
    // 1. Actualizar local
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

    // 2. Actualizar en Supabase
    try {
      const { error } = await supabase
        .from('participants')
        .update({
          prize_id: prizeId,
          prize_label: prizeLabel,
        })
        .eq('id', id);

      if (error) {
        console.error('Error al actualizar premio en Supabase:', error.message);
      }
    } catch (err) {
      console.error('Error de red al actualizar premio:', err);
    }
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

