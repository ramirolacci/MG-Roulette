import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
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
  'Bella Vista', 'San Miguel', 'Palermo', 'Belgrano', 'Villa del Parque',
  'Flores', 'Caballito', 'Almagro', 'Balvanera', 'San Cristóbal',
  'Recoleta', 'San Telmo', 'Mataderos', 'Villa Urquiza', 'Otro',
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

    // TODO: POST participant to REST endpoint
    // await fetch('/api/participants', { method: 'POST', body: JSON.stringify(participant) });

    onSubmit(participant);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-white rounded-xl px-4 py-4 text-gray-800 text-lg border-2 outline-none transition-colors ${
      errors[field] && touched[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-200 focus:border-red-500'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-orange-500 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-8 pb-4">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <div>
          <h2 className="text-white font-black text-2xl">Tus datos</h2>
          <p className="text-white/80 text-sm">Paso 1 de 2</p>
        </div>
        {/* Logo */}
        <div className="ml-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-lg">🥟</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-2">
        <div className="w-full h-2 bg-white/20 rounded-full">
          <div className="h-2 bg-yellow-400 rounded-full w-1/2 transition-all duration-500" />
        </div>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 bg-gray-50 rounded-t-3xl mt-4 px-6 pt-8 pb-6 flex flex-col gap-5 overflow-y-auto"
      >
        <div className="text-center mb-2">
          <h3 className="text-gray-800 font-black text-xl">¡Completá tus datos y jugá!</h3>
          <p className="text-gray-500 text-sm mt-1">Todos los campos son obligatorios</p>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-gray-600 text-sm font-semibold flex items-center gap-1">
            <User className="w-4 h-4" /> Nombre completo
          </label>
          <input
            type="text"
            placeholder="Ej: María García"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={inputClass('name')}
            autoComplete="name"
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-gray-600 text-sm font-semibold flex items-center gap-1">
            <Mail className="w-4 h-4" /> Email
          </label>
          <input
            type="email"
            placeholder="Ej: maria@ejemplo.com"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={inputClass('email')}
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-gray-600 text-sm font-semibold flex items-center gap-1">
            <Phone className="w-4 h-4" /> Teléfono
          </label>
          <input
            type="tel"
            placeholder="Ej: 11 4567-8901"
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={inputClass('phone')}
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Neighborhood */}
        <div className="space-y-1">
          <label className="text-gray-600 text-sm font-semibold flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Barrio
          </label>
          <select
            value={form.neighborhood}
            onChange={(e) => handleChange('neighborhood', e.target.value)}
            onBlur={() => handleBlur('neighborhood')}
            className={`${inputClass('neighborhood')} cursor-pointer`}
          >
            <option value="">Seleccioná tu barrio</option>
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.neighborhood && touched.neighborhood && (
            <p className="text-red-500 text-sm">{errors.neighborhood}</p>
          )}
        </div>

        {/* Marketing checkbox */}
        <label className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-100 rounded-xl cursor-pointer hover:border-red-200 transition-colors">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={form.acceptsMarketing}
              onChange={(e) => handleChange('acceptsMarketing', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
              form.acceptsMarketing ? 'bg-red-600 border-red-600' : 'bg-white border-gray-300'
            }`}>
              {form.acceptsMarketing && (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-gray-600 text-sm leading-relaxed">
            Acepto recibir comunicaciones, promociones y novedades de{' '}
            <strong className="text-red-600">Mi Gusto</strong>. Podés darte de baja cuando quieras.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black text-xl py-5 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-3 border-b-4 border-red-800 mt-2"
        >
          ¡Girar la ruleta!
          <ChevronRight className="w-6 h-6" />
        </button>

        <p className="text-gray-400 text-xs text-center">
          Tus datos son confidenciales y no serán compartidos con terceros.
        </p>
      </form>
    </div>
  );
}
