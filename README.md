# Mi Gusto — Ruleta de Reapertura Bella Vista

App web de marketing para el evento de reapertura de Mi Gusto en Bella Vista. Los participantes completan un formulario y giran una ruleta animada para ganar premios.

## Stack

- **React 18 + TypeScript** — UI y lógica
- **Vite** — bundler y dev server
- **Tailwind CSS** — estilos
- **Canvas API** — ruleta animada
- **localStorage** — persistencia offline

## Cómo correr

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`

## Build y deploy

```bash
# Build de producción
npm run build

# Preview local del build
npm run preview
```

### Deploy en Vercel

```bash
npm i -g vercel
vercel --prod
```

### Deploy en Netlify

Arrastrá la carpeta `dist/` al dashboard de Netlify, o:

```bash
npm i -g netlify-cli
netlify deploy --dir=dist --prod
```

## Configurar premios

Editá `public/prizes.json`. Cada premio tiene:

```json
{
  "id": 1,
  "label": "10% OFF",
  "description": "10% de descuento en tu próxima compra",
  "color": "#E53E3E",
  "textColor": "#FFFFFF",
  "probability": 0.25,
  "emoji": "🏷️"
}
```

La suma de todos los `probability` debe dar **1.0**.

## Panel admin

Accedé a `/#admin` en el navegador.

- Contraseña: `migusto2026`
- Ver todos los participantes y sus premios
- Buscar y ordenar
- Exportar CSV con todos los datos

## Estructura del proyecto

```
src/
├── components/
│   ├── Roulette.tsx       # Ruleta canvas animada
│   └── PrizeModal.tsx     # Modal con el premio ganado
├── pages/
│   ├── LandingPage.tsx    # Hero con CTA
│   ├── FormPage.tsx       # Formulario con validación
│   ├── RoulettePage.tsx   # Pantalla de la ruleta
│   └── AdminPage.tsx      # Panel de administración
├── hooks/
│   ├── useParticipants.ts # CRUD participantes + localStorage
│   └── usePrizes.ts       # Carga y lógica de premios
├── utils/
│   └── id.ts              # Generador de IDs únicos
├── types/
│   └── index.ts           # Tipos TypeScript compartidos
public/
├── prizes.json            # Configuración de premios
└── manifest.json          # PWA manifest
```

## Integrar con backend REST (TODO)

En `src/pages/FormPage.tsx`, línea con el comentario `TODO: POST participant`:

```ts
// Reemplazar localStorage con:
const res = await fetch('https://tu-api.com/api/participants', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(participant),
});
if (!res.ok) throw new Error('Error guardando participante');
```

En `src/hooks/useParticipants.ts`, reemplazar las llamadas a `localStorage` con llamadas a tu API.

## Funcionamiento offline

Los datos se guardan en `localStorage`. Si no hay conexión, la app sigue funcionando y los datos se preservan hasta que se restaure la conexión y se sincronicen.
