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
  const backgroundImage = new URL('/background-text.jpg', import.meta.url).href;
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
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center text-white space-y-4">
          <div className="text-6xl animate-spin">🥟</div>
          <p className="font-bold text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full text-white"
      style={{
        backgroundColor: '#050505',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full min-h-screen">
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
    </div>
  );
}
