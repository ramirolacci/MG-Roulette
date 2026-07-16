import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react';
import { Participant } from '../types';
import { generateId } from '../utils/id';

interface FormPageProps {
  onBack: () => void;
  onSubmit: (participant: Participant) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  acceptsMarketing: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  neighborhood?: string;
}

const NEIGHBORHOODS = [
  'Bella Vista',
  'Villa Ballester',
  'Villa Bosch',
  'Villa Adelina',
  'Munro',
  'Villa Pueyrredón',
  'Belgrano',
  'Palermo',
  'Colegiales',
  'Núñez',
  'Saavedra',
  'Villa Devoto',
  'Villa Ortúzar',
  'Otro',
];

export default function FormPage({ onBack, onSubmit }: FormPageProps) {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    neighborhood: '',
    acceptsMarketing: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = (data: FormData): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim() || data.name.trim().length < 2) errs.name = 'Ingresá tu nombre completo';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Ingresá un email válido';
    if (!data.phone.trim() || !/^\+?[\d\s\-()]{8,}$/.test(data.phone)) errs.phone = 'Ingresá un teléfono válido';
    if (!data.neighborhood) errs.neighborhood = 'Seleccioná tu barrio';
    return errs;
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, neighborhood: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const participant: Participant = {
      id: generateId(),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      neighborhood: form.neighborhood,
      acceptsMarketing: form.acceptsMarketing,
      prizeId: null,
      prizeLabel: null,
      timestamp: new Date().toISOString(),
    };

    // Mostrar pantalla de éxito con tilde verde antes de redireccionar
    setShowSuccess(true);

    setTimeout(() => {
      onSubmit(participant);
    }, 1800);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-[#1b1b1b] rounded-xl px-4 py-4 text-white text-lg border-2 outline-none transition-colors ${
      errors[field] && touched[field]
        ? 'border-gold focus:border-gold'
        : 'border-white/10 focus:border-gold'
    }`;

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-6 relative">
        <div className="text-center space-y-6 max-w-sm w-full bg-[#111111] border border-white/10 p-8 rounded-[32px] shadow-2xl relative z-10">
          {/* Círculo con Tilde Verde */}
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border-4 border-green-500 mx-auto">
            <svg 
              className="w-10 h-10 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={4.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-white font-black text-2xl">¡Datos Enviados!</h2>
            <p className="text-gray-400 text-sm font-bold">
              Tu participación ha sido registrada correctamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
        {/* Header */}
        <div className="relative flex items-center gap-4 py-4">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors border border-white/10"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h2 className="text-white font-black text-2xl">Tus datos</h2>
          <p className="text-white/80 text-sm">Paso 1 de 2</p>
        </div>
        {/* Logo */}
        <div className="ml-auto w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-lg border border-white/10">
          <img src={new URL('/LOGOBOT.png', import.meta.url).href} alt="Mi Gusto" className="w-8 h-8 object-contain" />
        </div>
      </div>

        {/* Progress bar */}
        <div className="relative px-0 mb-4">
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-2 bg-gold rounded-full w-1/2 transition-all duration-500" />
          </div>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full mt-3 mb-4 bg-[#111111] border border-white/10 rounded-[32px] px-6 pt-8 pb-6 flex flex-col gap-6"
        >
        <div className="text-center mb-2 px-2 sm:px-0">
          <h3 className="text-white font-black text-2xl md:text-3xl">¡Completá tus datos y jugá!</h3>
          <p className="text-gray-400 text-sm md:text-base mt-1">Todos los campos son obligatorios</p>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-white text-base md:text-lg font-black flex items-center gap-2">
            <User className="w-5 h-5" /> Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ingresar nombre completo"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={inputClass('name')}
            autoComplete="name"
            required
          />
          {errors.name && touched.name && (
            <p className="text-gold text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-white text-base md:text-lg font-black flex items-center gap-2">
            <Mail className="w-5 h-5" /> Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Ingresar Email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={inputClass('email')}
            autoComplete="email"
            inputMode="email"
            required
          />
          {errors.email && touched.email && (
            <p className="text-gold text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-white text-base md:text-lg font-black flex items-center gap-2">
            <Phone className="w-5 h-5" /> Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="Ingresar numero de celular"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={inputClass('phone')}
            autoComplete="tel"
            inputMode="tel"
            required
          />
          {errors.phone && touched.phone && (
            <p className="text-gold text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Neighborhood */}
        <div className="space-y-1">
          <label className="text-white text-base md:text-lg font-black flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Barrio <span className="text-red-500">*</span>
          </label>
          <select
            value={form.neighborhood}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
            onBlur={() => handleBlur('neighborhood')}
            className={`${inputClass('neighborhood')} cursor-pointer`}
            required
          >
            <option value="">Seleccioná tu barrio</option>
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.neighborhood && touched.neighborhood && (
            <p className="text-gold text-sm">{errors.neighborhood}</p>
          )}
        </div>

        {/* Marketing checkbox */}
        <label className="flex items-start gap-3 p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-white/20 transition-colors">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={form.acceptsMarketing}
              onChange={(e) => handleChange('acceptsMarketing', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
              form.acceptsMarketing ? 'bg-gold border-gold' : 'bg-black border-white/20'
            }`}>
              {form.acceptsMarketing && (
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-gray-300 text-sm leading-relaxed">
            Acepto recibir comunicaciones, promociones y novedades de{' '}
            <strong className="text-gold">Mi Gusto</strong>. Podés darte de baja cuando quieras.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gold hover:brightness-110 active:scale-95 text-black font-black text-2xl md:text-3xl py-5 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-3 border-b-4 border-[#a67c20] mt-2"
        >
          ¡Enviar!
        </button>

        <p className="text-gray-400 text-xs text-center">
          Tus datos son confidenciales y no serán compartidos con terceros.
        </p>
      </form>
      </div>
    </div>
  );
}
