# 🚀 ArryZ Portfolio

A modern, high-performance, and conversion-focused personal portfolio website built with **Astro 6**, **React 19**, and **Tailwind CSS v4**.

This portfolio belongs to **Pamuda Jayathilaka (ArryZ)**, a 23-year-old self-taught full-stack developer and landing page specialist based in Sri Lanka.

---

## ✨ Features

- 🎭 **Interactive Dev Terminal:** An in-browser interactive command-line terminal widget on the Hero section responding to commands like `whoami`, `skills`, `alphago`, and `contact`.
- 🕒 **Live Sri Lanka Time Widget:** In the navigation bar, displays the current time in Colombo (Sri Lanka) and indicates real-time developer availability (active/sleeping) using timezone detection logic.
- 🌓 **Dynamic Theme Switching:** Sleek support for Light and Dark modes with persistent theme states stored in local storage.
- 🌟 **Ultra Premium Aesthetics:** Designed with advanced HSL-based color tokens, fluid gradients, glassmorphic navigation, neural background grids, and responsive layout scaling.
- 🛠 **Modular Architecture:** Powered by Astro's island architecture, allowing interactive React components to load and hydrate exactly when needed (`client:load`, `client:visible`).
- ⚡ **SEO & Performance Optimized:** Structurally clean semantic HTML, custom SEO hooks, dynamic metadata, and optimized WebP visual assets.

---

## 🛠 Tech Stack

- **Framework:** [Astro v6](https://astro.build/) (Static Site Generator & Islands Architecture)
- **UI Libraries:** [React v19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS (`index.css`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment & Hosting:** Optimized for Vercel/Netlify

---

## 📂 Directory Structure

```text
ArryZpf/
├── .astro/               # Astro cache and generated types
├── public/               # Static assets (fonts, icons, raw assets)
├── src/
│   ├── assets/           # Local media assets (images, vector graphics, icons)
│   │   ├── icons/        # Custom icons (e.g., flag SVGs)
│   │   └── images/       # Profile photos, logos, project screenshots
│   ├── components/       # Interactive React & Astro components
│   │   ├── Navbar.tsx           # Global navigation with Colombo time badge
│   │   ├── HeroSection.tsx      # Hero banner containing the interactive terminal
│   │   ├── BackgroundEffects.tsx# Ambient glow and mouse track effects
│   │   ├── ProjectsSection.tsx  # Interactive showcase of creations
│   │   ├── ContactSection.tsx   # Contact form with validation
│   │   └── ...                  # Story, Services, Skills, Footer
│   ├── layouts/          # Astro base templates
│   │   └── Layout.astro         # Main page wrapper with SEO meta headers
│   ├── pages/            # Router pages (Astro routing)
│   │   └── index.astro          # Landing page (Main entry point)
│   ├── types/            # TypeScript declaration files
│   ├── utils/            # Scroll utilities and helper scripts
│   └── index.css         # Global stylesheets & Tailwind CSS imports
├── astro.config.mjs      # Astro integration configurations
├── package.json          # Dependency list and dev scripts
├── tsconfig.json         # TypeScript configurations
└── vercel.json           # Vercel deployment configuration settings
```

---

## 🚀 Getting Started

To run the project locally, follow these steps:

### 1. Prerequisites

Make sure you have Node.js installed (v18.x or higher is recommended).

### 2. Install Dependencies

Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Run the Development Server

Start the local server. The app will be available at [http://localhost:3000/](http://localhost:3000/):

```bash
npm run dev
```

### 4. Build for Production

To create an optimized production build of the website:

```bash
npm run build
```

This compiles the static site and outputs it to the `dist/` directory.

### 5. Preview the Production Build

You can preview the built site locally using:

```bash
npm run preview
```

---

## 👤 About the Author

**Pamuda Jayathilaka (ArryZ)**
- 📍 Colombo, Sri Lanka
- ✉️ [arryz.buzinezz@gmail.com](mailto:arryz.buzinezz@gmail.com)
- 🧠 *Fun Fact:* DeepMind AlphaGo's famous "Move 37" against Lee Sedol in 2016 sparked his obsession with technology, launching his path as a self-taught engineer.

---

## 📄 License

This project is proprietary. All rights reserved by Pamuda Jayathilaka.
