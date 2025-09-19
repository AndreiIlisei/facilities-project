# Trackman Facilities – Frontend Challenge

A small React + TypeScript app for managing a list of golf facilities (create, edit, delete, set default).  
Built as part of the Trackman frontend developer interview process.

---

## 🚀 Features

- **Facilities List** – view all facilities in a responsive grid
- **Create / Edit / Delete** – manage facilities with validation and toasts
- **Default Facility Rules**
  - First facility is automatically default
  - Switching default overrides previous
  - Deleting default reassigns another automatically
- **Persistent Storage** – data stored in `localStorage`
- **Responsive UI** – SCSS Modules + BEM naming, accessible modal, sticky navbar
- **Fallback Image** – gracefully handles missing or broken image URLs
- **Developer Experience**
  - ESLint + Prettier + Husky pre-commit hooks
  - Conventional Commits enforced
  - Vite

---

## 🛠 Tech Stack

- **React + Vite + TypeScript**
- **SCSS Modules** (with BEM-style naming)
- **clsx** for conditional class handling
- **Vitest** for testing

---

## 📦 Getting Started

Clone the repo and install dependencies:

npm install

npm run dev

npm run tests

npm run build

npm run preview
