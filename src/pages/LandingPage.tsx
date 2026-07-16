import { useState } from 'react';
import { MapPin, Star, Gift, ChevronDown, Maximize2, Users, X, Search, Phone } from 'lucide-react';
import { Participant } from '../types';

interface LandingPageProps {
  onPlay: () => void;
  participants: Participant[];
}

export default function LandingPage({ onPlay, participants }: LandingPageProps) {
  const logoSrc = new URL('/LOGOBOT.png', import.meta.url).href;
  const [showClients, setShowClients] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error al intentar poner pantalla completa: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm) ||
    p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-12 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/4 right-8 w-52 h-52 rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-2 py-2">
        <div className="flex h-full w-full max-w-none flex-col justify-between rounded-[32px] border border-white/10 bg-black/10 px-6 py-8 shadow-2xl">
          <div className="flex w-full items-center justify-between text-white/80 text-sm font-medium mb-8">
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleFullscreen} 
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-white/80 hover:text-white"
                title="Pantalla completa"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Esquinas externas */}
                  <path d="M7 2h15v15" />
                  <path d="M17 22H2V7" />
                  {/* Flechas de expansión */}
                  <path d="M13 11l8-8M21 8V3h-5" />
                  <path d="M11 13l-8 8M3 16v5h5" />
                </svg>
              </button>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                <MapPin className="w-5 h-5 text-gold" />
                <span className="text-white font-extrabold text-base md:text-lg">Bella Vista</span>
              </div>
              <button 
                onClick={() => setShowClients(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold hover:brightness-110 active:scale-95 text-black font-black text-sm transition-all duration-150 shadow-md"
              >
                <Users className="w-4.5 h-4.5" />
                Clientes
              </button>
            </div>
            {/* Las 3 estrellas argentinas con estilo mundialista de la imagen */}
            <div className="flex items-center gap-1 mr-1">
              {/* Definiciones de degradado de oro 3D de alta definición */}
              <svg className="absolute w-0 h-0">
                <defs>
                  <linearGradient id="gold-metallic-3d" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="25%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="75%" stopColor="#C29724" />
                    <stop offset="100%" stopColor="#735205" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Estrella izquierda: inclinada hacia la izquierda */}
              <svg 
                className="-rotate-[15deg] transform transition-transform duration-300 hover:scale-115 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" 
                style={{ width: '22px', height: '22px' }}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"
                  fill="url(#gold-metallic-3d)"
                  stroke="#503703"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Estrella central: más grande y erguida */}
              <svg 
                className="transform transition-transform duration-300 hover:scale-115 filter drop-shadow-[0_3px_8px_rgba(255,215,0,0.5)]" 
                style={{ width: '30px', height: '30px' }}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"
                  fill="url(#gold-metallic-3d)"
                  stroke="#503703"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Estrella derecha: inclinada hacia la derecha */}
              <svg 
                className="rotate-[15deg] transform transition-transform duration-300 hover:scale-115 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" 
                style={{ width: '22px', height: '22px' }}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"
                  fill="url(#gold-metallic-3d)"
                  stroke="#503703"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 text-center">
            <div className="relative">
              <div className="w-48 h-48 bg-black rounded-full shadow-2xl flex items-center justify-center border-4 border-gold p-3">
                <img src={logoSrc} alt="Mi Gusto" className="w-full h-full object-contain" loading="eager" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gold text-black text-xs font-black px-2 py-1 rounded-full shadow-lg animate-bounce">
                NUEVO
              </div>
            </div>

            <div className="space-y-3 w-full px-2 md:px-0">
              <div className="text-white/90 text-lg md:text-xl font-semibold tracking-wide uppercase">
                ¡Gran Reapertura!
              </div>
              <h1 className="text-white font-black text-5xl md:text-6xl leading-tight drop-shadow-lg">
                Ganá premios en<br />
                <span className="text-gold">Bella Vista</span>
              </h1>
            </div>

            {/* Tragamonedas de premios */}
            <div className="w-full flex flex-col items-center gap-3 mt-4">
              <div className="text-gold font-black text-base md:text-lg tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <Gift className="w-5 h-5" /> Premios
              </div>
              <div className="grid grid-cols-3 gap-4 md:gap-6 w-full px-2 max-w-2xl">
                {[
                  {
                    items: [
                      { emoji: '🥟', label: 'Empanadas' },
                      { emoji: '🎁', label: 'Regalos' },
                      { emoji: '💰', label: 'Descuentos' },
                    ],
                    speedClass: 'animate-reel-slow'
                  },
                  {
                    items: [
                      { emoji: '🎁', label: 'Regalos' },
                      { emoji: '💰', label: 'Descuentos' },
                      { emoji: '🥟', label: 'Empanadas' },
                    ],
                    speedClass: 'animate-reel-medium'
                  },
                  {
                    items: [
                      { emoji: '💰', label: 'Descuentos' },
                      { emoji: '🥟', label: 'Empanadas' },
                      { emoji: '🎁', label: 'Regalos' },
                    ],
                    speedClass: 'animate-reel-fast'
                  }
                ].map((reel, rIdx) => {
                  const doubleItems = [...reel.items, ...reel.items];
                  return (
                    <div 
                      key={rIdx} 
                      className="h-36 overflow-hidden relative bg-gradient-to-b from-black/80 via-white/5 to-black/80 rounded-2xl border-2 border-white/20 flex flex-col shadow-2xl shadow-black/60"
                    >
                      {/* Efecto de cristal / slot machine */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 pointer-events-none z-10" />
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-gold/35 pointer-events-none z-10" />
                      <div className={`${reel.speedClass} flex flex-col w-full`}>
                        {doubleItems.map((item, iIdx) => (
                          <div 
                            key={iIdx} 
                            className="h-36 flex flex-col items-center justify-center flex-shrink-0"
                          >
                            <span className="text-5xl md:text-6xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">{item.emoji}</span>
                            <span className="text-white text-xs md:text-sm font-black mt-3.5 uppercase tracking-widest">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 w-full pt-6">
            <button
              onClick={onPlay}
              className="w-full bg-gold hover:brightness-110 active:scale-95 text-black font-black text-2xl py-5 rounded-2xl shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 border-b-4 border-[#a67c20]"
            >
              <Gift className="w-7 h-7" />
              ¡Empezar ahora!
            </button>

            <div className="flex items-center gap-2 text-white/70 text-base max-w-3xl text-center leading-relaxed">
              <span>
                Completá el formulario y llevate un premio especial de nuestra reapertura en Bella Vista.
              </span>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-center text-white/60 text-sm md:text-base leading-relaxed">
            <p>
              Al participar aceptás los <button className="underline text-white/90 hover:text-white">Términos y Condiciones</button> de la promoción.
            </p>
            <p className="mt-3">
              Válido solo en el evento de reapertura de Bella Vista.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Clientes (Panel Simple para Marketing) */}
      {showClients && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-start justify-center p-4 pt-10 md:pt-16 overflow-y-auto">
          <div className="bg-[#111111] border border-white/10 rounded-[32px] w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Cabecera */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-white font-black text-xl">Lista de Clientes</h2>
                  <p className="text-gray-400 text-xs">Total: {participants.length} registrados</p>
                </div>
              </div>
              <button 
                onClick={() => setShowClients(false)}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Buscador */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar por nombre, celular o barrio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white placeholder-gray-500 w-full text-base outline-none"
              />
            </div>

            {/* Listado */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {filteredParticipants.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No se encontraron clientes.
                </div>
              ) : (
                filteredParticipants.map((client) => (
                  <div 
                    key={client.id}
                    className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-black text-lg">{client.name}</span>
                        <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full text-gray-300 font-medium">
                          {client.neighborhood}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                        <span>{client.email}</span>
                        <a 
                          href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-green-400 hover:text-green-300 font-medium"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {client.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start md:self-auto text-right">
                      <div>
                        <div className="text-xs text-gray-500">
                          {new Date(client.timestamp).toLocaleString('es-AR', {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                        {client.prizeLabel && (
                          <div className="text-gold font-bold text-sm mt-0.5">
                            🎁 {client.prizeLabel}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
