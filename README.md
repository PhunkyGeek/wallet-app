# Wallet App UI — Frontend Engineer Assessment

This project is a responsive wallet application built from Figma designs to simulate a modern fintech user experience. It includes authentication, transactions, payments, and transfer flows, with a strong focus on design fidelity, usability, and scalability.

I designed and implemented this application to demonstrate component-driven architecture, a consistent design system, and a framework-agnostic structure that can be easily ported to other frontend frameworks.

---

## Project Overview

The application replicates a mobile banking experience while remaining fully responsive across mobile, tablet, and desktop screens.

It includes:

* Authentication and onboarding flows
* Wallet dashboard and card management
* Bill payments and transfers
* Profile and settings
* Dark and light mode support
* Reusable design system components

---

## Features Implemented

### Authentication Flow

* Splash screen
* Mobile number login
* Password login
* Create account screen
* Forgot password (email and mobile)
* OTP verification with success state

### Wallet & Cards

* Home dashboard with balance and transaction history
* Stacked cards interface
* Responsive bottom navigation

### Payments & Transfers

* Bill payment flow
* Secure payment confirmation step
* Payment success screen
* Transfer flow (contact selection → amount → secure payment → failure screen)

### More & Settings

* Grouped actions menu
* Profile settings
* Dark and light theme toggle

### Design System

* Reusable input components
* Validation states (focus, error, success)
* Phone input with country selector and flags
* Consistent spacing, typography, and color tokens

### UX Enhancements

* Pixel-accurate Figma translation
* Hidden scrollbars with smooth scrolling
* Mobile-first layout with centered desktop framing
* Native app-like experience across devices

---

## Tech Stack

* React + TypeScript
* Vite (development and build tooling)
* Tailwind CSS (design tokens and styling)
* React Router (navigation)
* Zustand / Context API (state management)
* react-phone-number-input + libphonenumber-js (phone formatting & validation)

---

## Setup & Installation

### Clone repository

```bash
git clone <repo-url>
cd wallet-app
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Framework Choice & Reasoning

### React

I chose React for its component-based architecture, scalability, and extensive ecosystem. It allows reusable UI construction and flexible integration with validation and state management libraries.

### TypeScript

Type safety improves reliability, maintainability, and developer experience, especially in larger applications.

### Tailwind CSS

Tailwind enables design-token-driven styling, ensures visual consistency, and accelerates UI development.

### Vite

Vite provides a fast development server, efficient builds, and minimal configuration overhead.

---

## Design Decisions & Trade-offs

### Component-driven architecture

I built reusable components to ensure consistency and maintainability across screens.

### Mobile-first layout

The UI prioritizes mobile usability while scaling gracefully to larger viewports.

### Fixed-height app frame

A fixed viewport height creates a native mobile-app feel on desktop devices.

### Hidden scrollbars

Scrollbars are hidden for visual cleanliness while maintaining usability and smooth scrolling.

---

## Mobile Login Input — Design Trade-offs

Creating the mobile login input required balancing UX fidelity with customization flexibility.

### Approach used

I implemented a custom country selector using `react-phone-number-input` with a fully customized country component to match the design:

* flag
* country code
* custom caret icon
* input field

### Why not use react-international-phone

While react-international-phone provides built-in formatting and flags, its internal structure made pixel-perfect customization difficult.

### Benefits of the chosen approach

* full control over layout and styling
* easier integration of custom icons and spacing
* accurate visual match to the design guide
* still retains libphonenumber-js validation and formatting

### Trade-offs

* required building a custom searchable dropdown
* additional implementation complexity
* manual flag asset handling

This trade-off improved design fidelity and long-term maintainability.

---

## Portability to Other Frameworks

The architecture is framework-agnostic and can be ported easily:

| React           | Vue             | Angular            |
| --------------- | --------------- | ------------------ |
| Components      | SFC components  | Angular components |
| Zustand/Context | Pinia           | Services           |
| React Router    | Vue Router      | Angular Router     |
| Hooks           | Composition API | RxJS               |

Porting steps:

1. Move UI components.
2. Re-create routing.
3. Replace state management.
4. Reuse design tokens and styles.

---

## Challenges & Solutions

### Pixel-perfect UI implementation

I created reusable design tokens and inspected spacing from Figma to maintain consistency.

### Custom mobile phone input

I implemented a custom searchable country selector with formatting support to achieve full UI control.

### Native mobile feel on desktop

I implemented a fixed-height app frame with centered responsive layout.

### Input validation consistency

I created reusable input components with unified validation states.

### Scroll behavior and hidden scrollbars

I implemented cross-browser scrollbar hiding with smooth touch scrolling.

---

## Screenshots

Follow link below to view screenshots:

https://www.notion.so/ronaldshakur/wallet-app-ui-screenshots-1da4bf4f8aaf802cb61df93928dc28be?source=copy_link

---

## Dark & Light Mode

The application supports theme switching from Profile Settings with persistence using local storage and system preference detection.

---

## Future Improvements

* Add micro-interactions and motion polish
* Implement biometric authentication
* Add spending analytics charts
* Improve accessibility (ARIA & keyboard navigation)
* Add unit and integration tests

---

## Author

Ronald Abel-Obi


