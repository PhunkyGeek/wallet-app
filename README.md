# Wallet App UI (Frontend Engineer Assessment)

A responsive wallet UI built from the provided Figma/screenshots with production-style structure, TypeScript, reusable components, and framework-portable patterns.

## ✅ Implemented (Required)

### Login
- Email + password fields
- Validation (email format, required, min password length)
- Password show/hide toggle
- “Remember me” checkbox
- Password strength indicator (Weak/Fair/Good/Strong)
- Loading state during mock authentication
- Navigates to dashboard on success

### Home / Dashboard
- Wallet balance with animated count-up
- Recent transfers strip
- Transactions list (10 mock transactions)
- Filter transactions: All / Sent / Received
- Search transactions (merchant + subtitle)
- Bottom navigation (as per design)
- Smooth page transitions (Framer Motion)

## Tech Stack
- React + TypeScript + Vite
- TailwindCSS (design tokens + responsive layout)
- Zustand (lightweight state)
- React Hook Form + Zod (validation)

## Setup

```bash
npm install
npm run dev
```

Build:
```bash
npm run build
npm run preview
```

## Design Tokens
Tokens live in `tailwind.config.ts`:
- `brand.*` (purple palette)
- `bg`, `line`, `muted`, `ink`
- `shadow-card`, `rounded-3xl/xl2` for consistent UI feel

## How to Port This to Another Framework

### Vue
- `components/ui/*` map directly to Vue SFC components (props + slots)
- Zustand store → Pinia store (same shape: `isAuthed`, `user`, `login`, `logout`)
- React Router → Vue Router (same `/` and `/home` routes)
- Form layer can stay Zod-based (`vee-validate` + zod resolver)

### Angular
- UI components become Angular components (InputComponent, ButtonComponent, etc.)
- Zustand store → Injectable AuthService with RxJS signals/subjects
- Router mapping remains identical
- Form logic ports to Reactive Forms + Zod-like custom validators

## Deployment (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing: create a `_redirects` file with:
  ```
  /* /index.html 200
  ```

## Notes / Trade-offs
- Icons are from `lucide-react` and simple logo badges are vector-ish placeholders to avoid external assets.
- Bottom nav is UI-complete; tabs are currently local-state (easy to expand into additional screens).

## Screenshots
Add your own screenshots/GIFs here after running locally.

