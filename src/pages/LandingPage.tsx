import { MapPin, Star, Gift, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onPlay: () => void;
}

export default function LandingPage({ onPlay }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 flex flex-col items-center justify-between px-6 py-8 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-400 rounded-full opacity-10 animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-orange-300 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 -right-16 w-48 h-48 bg-red-300 rounded-full opacity-10" />
      </div>

      {/* Header */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
          <MapPin className="w-4 h-4" />
          <span>Bella Vista</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Logo & Hero */}
      <div className="flex flex-col items-center gap-6 z-10 text-center mt-4">
        {/* Logo placeholder */}
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-yellow-400">
            <div className="text-center">
              <div className="text-4xl">🥟</div>
              <div className="text-red-600 font-black text-sm leading-none mt-1">Mi Gusto</div>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-700 text-xs font-black px-2 py-1 rounded-full shadow-lg animate-bounce">
            NUEVO
          </div>
        </div>

        {/* Main heading */}
        <div className="space-y-2">
          <div className="text-white/90 text-lg font-semibold tracking-wide uppercase">
            ¡Gran Reapertura!
          </div>
          <h1 className="text-white font-black text-4xl md:text-5xl leading-tight drop-shadow-lg">
            Ganá premios en<br />
            <span className="text-yellow-300">Bella Vista</span>
          </h1>
          <p className="text-white/90 text-xl font-medium">
            con <span className="text-yellow-300 font-black">Mi Gusto</span> Empanadas
          </p>
        </div>

        {/* Prize icons */}
        <div className="grid grid-cols-3 gap-4 mt-2">
          {[
            { emoji: '🥟', label: 'Empanadas' },
            { emoji: '🎁', label: 'Premios' },
            { emoji: '💰', label: 'Descuentos' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3">
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-white text-xs font-semibold">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-white/85 text-base max-w-sm leading-relaxed">
          Completá el formulario, girá la ruleta y llevate un premio especial de nuestra reapertura en Bella Vista.
        </p>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center gap-4 z-10 w-full max-w-sm">
        <button
          onClick={onPlay}
          className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-red-700 font-black text-2xl py-5 px-8 rounded-2xl shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 border-b-4 border-yellow-600"
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
  );
}
