import { MapPin, Star, Gift, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onPlay: () => void;
}

export default function LandingPage({ onPlay }: LandingPageProps) {
  const logoSrc = new URL('/LOGOBOT.png', import.meta.url).href;
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-12 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/4 right-8 w-52 h-52 rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-black/60 px-8 py-10 shadow-2xl backdrop-blur-xl">
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

          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <div className="w-44 h-44 bg-black rounded-full shadow-2xl flex items-center justify-center border-4 border-gold p-3">
                <img src={logoSrc} alt="Mi Gusto" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gold text-black text-xs font-black px-2 py-1 rounded-full shadow-lg animate-bounce">
                NUEVO
              </div>
            </div>

            <div className="space-y-2 w-full">
              <div className="text-white/90 text-lg font-semibold tracking-wide uppercase">
                ¡Gran Reapertura!
              </div>
              <h1 className="text-white font-black text-4xl md:text-5xl leading-tight drop-shadow-lg">
                Ganá premios en<br />
                <span className="text-gold">Bella Vista</span>
              </h1>
              <p className="text-white/90 text-xl font-medium">
                con <span className="text-gold font-black">Mi Gusto</span> Empanadas
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-2 w-full">
              {[
                { emoji: '🥟', label: 'Empanadas' },
                { emoji: '🎁', label: 'Premios' },
                { emoji: '💰', label: 'Descuentos' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 w-full">
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="text-white text-xs font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-white/80 text-base leading-relaxed">
              Completá el formulario, girá la ruleta y llevate un premio especial de nuestra reapertura en Bella Vista.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 w-full">
            <button
              onClick={onPlay}
              className="w-full bg-gold hover:brightness-110 active:scale-95 text-black font-black text-2xl py-5 px-8 rounded-2xl shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 border-b-4 border-[#a67c20]"
            >
              <Gift className="w-7 h-7" />
              ¡Jugar ahora!
            </button>

            <div className="flex items-center gap-1 text-white/70 text-xs text-center max-w-xs leading-relaxed">
              <span>
                Al participar aceptás los{' '}
                <button className="underline text-white/90 hover:text-white">
                  Términos y Condiciones
                </button>
                {' '}de la promoción. Válido solo en el evento de reapertura de Bella Vista.
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/50 text-xs animate-bounce mt-2">
              <ChevronDown className="w-4 h-4" />
              <span>Deslizá para participar</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
