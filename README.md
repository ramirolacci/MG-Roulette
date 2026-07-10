# Mi Gusto — Ruleta de Reapertura Bella Vista

App web de marketing para el evento de reapertura de Mi Gusto en Bella Vista. Los participantes completan un formulario y giran una ruleta animada para ganar premios.

## Stack

- **React 18 + TypeScript** — UI y lógica
- **Vite** — bundler y dev server
- **Tailwind CSS** — estilos
- **Canvas API** — ruleta animada
- **localStorage** — persistencia offline

## Funcionamiento offline

Los datos se guardan en `localStorage`. Si no hay conexión, la app sigue funcionando y los datos se preservan hasta que se restaure la conexión y se sincronicen.
