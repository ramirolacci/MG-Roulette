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
    /* Comentamos la animación de transición de GSAP para mayor fluidez en tablets lentas
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4 });

    return () => {
      gsap.fromTo(el, { opacity: 1, y: 0 }, { opacity: 0, y: -16, duration: 0.25 });
    };
    */
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
  const [isInitialized, setIsInitialized] = useState(() => window.location.hash === '#admin');
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

  const handleAdminBack = () => {
    window.location.hash = '';
    setPage('landing');
  };

  const handleUse = () => {
    // Intentar activar pantalla completa
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen failed: ${err.message}`);
      });
    }
    setIsInitialized(true);
  };

  const transitionKey = `${page}-${currentParticipant?.id ?? 'none'}`;

  // Pre-pantalla para tablet (recolectora de datos)
  if (!isInitialized) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6 relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-12 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between items-center w-full max-w-xl h-full min-h-[85vh] py-12 px-6 text-center">
          {/* Logo Section */}
          <div className="flex flex-col items-center mt-6">
            {/* Logo de Mi Gusto extra grande */}
            <div className="w-80 h-80 sm:w-[380px] sm:h-[380px] flex items-center justify-center">
              <img 
                src={new URL('/LOGOBOT.png', import.meta.url).href} 
                alt="Mi Gusto" 
                className="w-full h-full object-contain filter drop-shadow-[0_8px_32px_rgba(0,0,0,0.75)]" 
              />
            </div>
          </div>

          {/* Ruletita animada giratoria rediseñada (Estilo Premium Neon Gold) */}
          <div className="flex justify-center my-6 select-none pointer-events-none relative">
            {/* Indicador de ruleta superior (Flechita estática) */}
            <div className="absolute top-0 z-20 -mt-2">
              <div 
                className="w-4 h-5 bg-[#D4AF37] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" 
                style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} 
              />
            </div>

            <svg 
              className="w-32 h-32 animate-[spin_12s_linear_infinite] filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" 
              viewBox="0 0 100 100"
            >
              {/* Definición de degradado de oro local */}
              <defs>
                <linearGradient id="gold-metallic-roulette" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="30%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#C29724" />
                  <stop offset="100%" stopColor="#735205" />
                </linearGradient>
              </defs>

              {/* Anillo exterior punteado */}
              <circle cx="50" cy="50" r="46" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="42" fill="#111111" stroke="#D4AF37" strokeWidth="1" />
              
              {/* Rayos dorados de la ruleta */}
              {[...Array(12)].map((_, i) => {
                const angle = i * 30;
                return (
                  <line 
                    key={i}
                    x1="50" 
                    y1="50" 
                    x2={50 + 42 * Math.cos((angle * Math.PI) / 180)} 
                    y2={50 + 42 * Math.sin((angle * Math.PI) / 180)} 
                    stroke="#D4AF37" 
                    strokeWidth="0.75" 
                    opacity="0.6"
                  />
                );
              })}

              {/* Segmentos de arco de color en el borde */}
              {[...Array(12)].map((_, i) => {
                const angle = i * 30;
                const radStart = (angle * Math.PI) / 180;
                const radEnd = ((angle + 30) * Math.PI) / 180;
                const x1 = 50 + 38 * Math.cos(radStart);
                const y1 = 50 + 38 * Math.sin(radStart);
                const x2 = 50 + 38 * Math.cos(radEnd);
                const y2 = 50 + 38 * Math.sin(radEnd);
                return (
                  <path
                    key={i}
                    d={`M ${x1} ${y1} A 38 38 0 0 1 ${x2} ${y2}`}
                    fill="none"
                    stroke={i % 2 === 0 ? "#D4AF37" : "#FFFFFF"}
                    strokeWidth="3.5"
                    opacity="0.85"
                  />
                );
              })}

              {/* Centro dorado de la rueda */}
              <circle cx="50" cy="50" r="22" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="10" fill="url(#gold-metallic-roulette)" stroke="#503703" strokeWidth="1" />
              <circle cx="50" cy="50" r="3" fill="#ffffff" />
            </svg>
          </div>

          {/* Description Section */}
          <div className="space-y-6 max-w-md my-auto px-4 pb-12">
            <div className="space-y-2">
              <div className="text-white/40 font-bold uppercase tracking-wider text-sm sm:text-base">
                Acceso Exclusivo
              </div>
              <div className="text-gold font-black uppercase tracking-widest text-base sm:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                Reapertura Bella Vista
              </div>
            </div>
            <p className="text-white font-extrabold text-2xl sm:text-3xl leading-relaxed drop-shadow-md">
              Este formulario sirve para recolectar datos de clientes que jueguen con la ruleta.
            </p>
          </div>

          {/* Button Section */}
          <div className="w-full space-y-4 mb-8 pt-6">
            <button
              onClick={handleUse}
              className="w-full bg-gold hover:brightness-110 active:scale-95 text-black font-black text-2xl sm:text-3xl py-6 rounded-2xl shadow-2xl transition-all duration-200 border-b-4 border-[#a67c20] uppercase tracking-widest"
            >
              Usar
            </button>
            <p className="text-white/40 text-xs sm:text-sm font-medium">
              El sistema se iniciará en modo pantalla completa.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-white relative">
      {/* Fondo fijo (fixed) para evitar lag y repaints al abrir el teclado en tablets */}
      <div 
        className="fixed inset-0 z-0 bg-[#050505]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 min-h-screen w-full">
        <AnimatedPage keyValue={transitionKey}>
          {page === 'landing' && (
            <LandingPage onPlay={handlePlay} participants={participants} />
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
