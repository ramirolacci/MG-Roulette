import { useState } from 'react';
import { AppPage, Participant, Prize } from './types';
import { useParticipants } from './hooks/useParticipants';
import { usePrizes } from './hooks/usePrizes';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import RoulettePage from './pages/RoulettePage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [page, setPage] = useState<AppPage>(() =>
    window.location.hash === '#admin' ? 'admin' : 'landing'
  );
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const { prizes, loading: prizesLoading } = usePrizes();
  const { participants, addParticipant, updateParticipantPrize, exportCSV } = useParticipants();

  const handlePlay = () => setPage('form');

  const handleFormSubmit = (participant: Participant) => {
    addParticipant(participant);
    setCurrentParticipant(participant);
    setPage('roulette');
  };

  const handlePrizeWon = (prize: Prize) => {
    if (currentParticipant) {
      updateParticipantPrize(currentParticipant.id, prize.id, prize.label);
    }
  };

  const handleRestart = () => {
    setCurrentParticipant(null);
    setPage('landing');
    window.scrollTo(0, 0);
  };

  const handleAdminBack = () => {
    window.location.hash = '';
    setPage('landing');
  };

  if (prizesLoading) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <div className="text-6xl animate-spin">🥟</div>
          <p className="font-bold text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      {page === 'landing' && (
        <LandingPage onPlay={handlePlay} />
      )}
      {page === 'form' && (
        <FormPage
          onBack={() => setPage('landing')}
          onSubmit={handleFormSubmit}
        />
      )}
      {page === 'roulette' && currentParticipant && (
        <RoulettePage
          prizes={prizes}
          participant={currentParticipant}
          onBack={() => setPage('form')}
          onPrizeWon={handlePrizeWon}
          onRestart={handleRestart}
        />
      )}
      {page === 'admin' && (
        <AdminPage
          participants={participants}
          onBack={handleAdminBack}
          onExportCSV={exportCSV}
        />
      )}
    </div>
  );
}
