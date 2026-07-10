import { useState } from 'react';
import { ArrowLeft, Download, Users, Trophy, Mail, Phone, MapPin, Lock, Eye, EyeOff } from 'lucide-react';
import { Participant } from '../types';

const ADMIN_PASSWORD = 'migusto2026';

interface AdminPageProps {
  participants: Participant[];
  onBack: () => void;
  onExportCSV: () => void;
}

export default function AdminPage({ participants, onBack, onExportCSV }: AdminPageProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof Participant>('timestamp');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta. Intentá de nuevo.');
    }
  };

  const toggleSort = (field: keyof Participant) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filtered = participants
    .filter((p) =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = String(a[sortField] ?? '');
      const bv = String(b[sortField] ?? '');
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const stats = {
    total: participants.length,
    withPrize: participants.filter((p) => p.prizeLabel && p.prizeLabel !== 'Sin premio').length,
    marketing: participants.filter((p) => p.acceptsMarketing).length,
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-white font-black text-2xl">Panel Admin</h1>
            <p className="text-gray-400 text-sm">Mi Gusto — Reapertura Bella Vista</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Contraseña de administrador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-4 pr-12 text-base outline-none border-2 border-gray-600 focus:border-red-500 transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-lg py-4 rounded-xl transition-colors"
            >
              Ingresar
            </button>
          </form>

          <button
            onClick={onBack}
            className="w-full text-gray-500 hover:text-gray-300 text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center gap-4 shadow-lg">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-black text-lg">Panel Admin — Mi Gusto</h1>
          <p className="text-gray-400 text-xs">Reapertura Bella Vista</p>
        </div>
        <button
          onClick={onExportCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4">
        {[
          { icon: Users, label: 'Participantes', value: stats.total, color: 'bg-blue-500' },
          { icon: Trophy, label: 'Con premio', value: stats.withPrize, color: 'bg-green-500' },
          { icon: Mail, label: 'Con marketing', value: stats.marketing, color: 'bg-red-500' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-black text-gray-800">{value}</div>
            <div className="text-gray-500 text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="px-6 pb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, email o barrio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-xl px-4 py-3 text-gray-700 border-2 border-gray-200 focus:border-red-400 outline-none transition-colors text-sm"
        />
      </div>

      {/* Table */}
      <div className="flex-1 px-6 pb-6 overflow-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Sin participantes aún</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {[
                      { key: 'name', label: 'Nombre', icon: Users },
                      { key: 'email', label: 'Email', icon: Mail },
                      { key: 'phone', label: 'Teléfono', icon: Phone },
                      { key: 'neighborhood', label: 'Barrio', icon: MapPin },
                      { key: 'prizeLabel', label: 'Premio', icon: Trophy },
                      { key: 'timestamp', label: 'Fecha', icon: null },
                    ].map(({ key, label, icon: Icon }) => (
                      <th
                        key={key}
                        className="px-4 py-3 text-left text-gray-500 font-semibold uppercase text-xs tracking-wider cursor-pointer hover:text-gray-700 whitespace-nowrap"
                        onClick={() => toggleSort(key as keyof Participant)}
                      >
                        <span className="flex items-center gap-1">
                          {Icon && <Icon className="w-3 h-3" />}
                          {label}
                          {sortField === key && (
                            <span className="text-red-500">{sortDir === 'asc' ? '↑' : '↓'}</span>
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{p.name}</td>
                      <td className="px-4 py-3 text-gray-600">{p.email}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{p.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{p.neighborhood}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                            p.prizeLabel && p.prizeLabel !== 'Sin premio'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {p.prizeLabel ?? '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {new Date(p.timestamp).toLocaleString('es-AR', {
                          day: '2-digit', month: '2-digit', year: '2-digit',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-100 text-gray-400 text-xs">
              Mostrando {filtered.length} de {participants.length} participantes
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
