<<<<<<< HEAD
# Devioz • FICE + TACL (Frontend)

Frontend  estilo fintech para el proyecto:

**“Sistema de Identidad Financiera para la Gestión y Análisis del Perfil del Usuario en Devioz S.A.C.”**  
Módulos: **FICE (Identidad Financiera)** + **TACL (Trazabilidad/Auditoría/Integridad)**

## Stack
- React + TypeScript + Vite
- Tailwind (dark premium + glassmorphism)
- “shadcn/ui-like” (Radix + componentes UI internos en `src/components/ui`)
- Framer Motion
- React Router
- React Query
- Mock services (sin backend)

## Instalación
```bash
npm install
npm run dev
```

## Rutas
- `/login` – Login premium (mock token)
- `/dashboard` – Dashboard con widgets reordenables (drag & drop) + layout en localStorage
- `/fice/profile` – Perfil financiero (tabs: inputs, snapshots, compare)
- `/fice/inputs` – Inputs (tabla + filtros/paginación + modal agregar input)
- `/fice/snapshots` – Timeline snapshots + drawer con JSON
- `/tacl/audit` – Auditoría (tabla + drawer detalle)
- `/tacl/integrity` – Integridad (status + checks + “Ejecutar verificación”)
- `/admin/users` – Admin: usuarios (activar/bloquear)
- `/admin/sessions` – Admin: sesiones activas (cerrar)

## Roles demo
Usa estas cuentas (password: cualquier valor):
- **User**: `user@devioz.pe`

Además, en el Topbar hay un **selector de contexto** (demo) para cambiar rol sin reloguear.

## Mock de datos
Entidades:
- `users`
- `user_session`
- `financial_profile_input`
- `financial_identity`
- `financial_identity_snapshot`
- `audit_event`

Implementación: `src/services/mockDb.ts`

## Notas
- El sistema guarda:
  - `Sidebar` colapsada: localStorage
  - `Dashboard layout`: localStorage
- Animaciones: Framer Motion (`Dialog`, `Drawer`, `Dashboard widgets`, `AppShell`)

=======
# Devioz-fice-talc-front
>>>>>>> 3a25ccba1b889eff3d2d67d303c003629cfe6222
