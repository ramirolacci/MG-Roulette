import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AppPage, Participant, Prize } from './types';
import { useParticipants } from './hooks/useParticipants';
import { usePrizes } from './hooks/usePrizes';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
// import RoulettePage from './pages/RoulettePage';
import AdminPage from './pages/AdminPage';

function AnimatedPage({ children, keyValue }: { children: React.ReactNode; keyValue: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4 });

    return () => {
      gsap.fromTo(el, { opacity: 1, y: 0 }, { opacity: 0, y: -16, duration: 0.25 });
    };
  }, [keyValue]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {children}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<AppPage>(() =>
    window.location.hash === '#admin' ? 'admin' : 'landing'
  );
  const backgroundImage = new URL('/background-text.jpg', import.meta.url).href;
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  // const { prizes, loading: prizesLoading } = usePrizes();
  const { participants, addParticipant, exportCSV } = useParticipants();

  const handlePlay = () => setPage('form');

  const handleFormSubmit = (participant: Participant) => {
    addParticipant(participant);
    setCurrentParticipant(participant);
    // setPage('roulette');
    setPage('landing');
  };

  // const handlePrizeWon = (prize: Prize) => {
  //   if (currentParticipant) {
  //     updateParticipantPrize(currentParticipant.id, prize.id, prize.label);
  //   }
  // };

  // const handleRestart = () => {
  //   setCurrentParticipant(null);
  //   setPage('landing');
  //   window.scrollTo(0, 0);
  // };

  const handleAdminBack = () => {
    window.location.hash = '';
    setPage('landing');
  };

  const transitionKey = `${page}-${currentParticipant?.id ?? 'none'}`;

  // if (prizesLoading) {
  if (false) {
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
      className="h-screen w-full text-white"
      style={{
        backgroundColor: '#050505',
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="h-full w-full">
        <AnimatedPage keyValue={transitionKey}>
          {page === 'landing' && (
            <LandingPage onPlay={handlePlay} />
          )}
          {page === 'form' && (
            <FormPage
              onBack={() => setPage('landing')}
              onSubmit={handleFormSubmit}
            />
          )}
          {/* {page === 'roulette' && currentParticipant && (
            <RoulettePage
              prizes={prizes}
              participant={currentParticipant}
              onBack={() => setPage('form')}
              onPrizeWon={handlePrizeWon}
              onRestart={handleRestart}
            />
          )} */}
          {page === 'admin' && (
            <AdminPage
              participants={participants}
              onBack={handleAdminBack}
              onExportCSV={exportCSV}
            />
          )}
        </AnimatedPage>
      </div>
    </div>
  );
}
