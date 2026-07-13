import { MapPin, Star, Gift, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onPlay: () => void;
}

export default function LandingPage({ onPlay }: LandingPageProps) {
  const logoSrc = new URL('/LOGOBOT.png', import.meta.url).href;
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
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Bella Vista</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 text-center">
            <div className="relative">
              <div className="w-48 h-48 bg-black rounded-full shadow-2xl flex items-center justify-center border-4 border-gold p-3">
                <img src={logoSrc} alt="Mi Gusto" className="w-full h-full object-contain" />
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
              <p className="text-white/90 text-2xl md:text-3xl font-medium">
                con <span className="text-gold font-black">Mi Gusto</span> Empanadas
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-2 w-full">
              {[
                { emoji: '🥟', label: 'Empanadas' },
                { emoji: '🎁', label: 'Premios' },
                { emoji: '💰', label: 'Descuentos' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 bg-white/10 rounded-2xl px-6 py-5 w-full">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-white text-sm md:text-base font-semibold">{item.label}</span>
                </div>
              ))}
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
    </div>
  );
}
