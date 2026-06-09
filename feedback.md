# ArryZ Portfolio — Professional Code Review

**Reviewer:** Senior Software Engineer (15+ years)
**Date:** June 9, 2026
**Codebase:** `arryz-portfolio` — Personal portfolio / landing page for ArryZ (Pamuda Jayathilaka)

---

## 1. Project Overview

### What It Does

This is a personal portfolio website for "ArryZ" (Pamuda Jayathilaka), a self-taught full-stack developer from Sri Lanka. The site showcases his story, services, skills, projects, and provides a contact form. It features dark/light theme toggling, interactive elements (a Go board simulator, an in-page terminal, code previews), a custom cursor effect, an HTML5 Canvas neural network particle background, and mobile-responsive carousels with touch swipe support.

### Architecture

The project uses **Astro** as the meta-framework with **React** as the interactive UI layer. Astro handles the static shell (HTML document, SEO meta tags, structured data), and the entire visible UI is rendered via a single React component tree hydrated with `client:load`. This means the entire page is a client-side React SPA embedded inside an Astro shell — Astro's server-rendering and island architecture benefits are **not being leveraged**.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Meta-framework | Astro 6.4.4 |
| UI Library | React 19.2.6 |
| Styling | Tailwind CSS 4.1.17 (Vite plugin) |
| Language | TypeScript 5.9.3 |
| Icons | Lucide React + custom inline SVGs |
| Utilities | clsx + tailwind-merge |
| Form Backend | Formspree (hosted) |
| Deployment | Vercel (with custom headers/redirects) |
| Sitemap | @astrojs/sitemap |
| Domain | arryz.dev |

### File Structure

```
src/
├── App.tsx              # Root React component (SPA entry)
├── index.css            # Global styles, animations, Tailwind config
├── assets/              # Images (webp), icons (SVG)
├── components/          # 12 React components
│   ├── BackgroundEffects.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── HeroBackground.tsx
│   ├── HeroSection.tsx
│   ├── ImageLightbox.tsx
│   ├── Navbar.tsx
│   ├── ProjectsSection.tsx
│   ├── ServicesSection.tsx
│   ├── SkillsSection.tsx
│   ├── StorySection.tsx
│   └── WhySection.tsx
├── layouts/
│   └── Layout.astro     # HTML document shell, SEO, fonts, schemas
├── pages/
│   ├── index.astro      # Main page (loads <App />)
│   └── 404.astro        # Not found page
├── types/
│   └── index.tsx        # SVG icon components (misnamed as "types")
└── utils/
    └── cn.ts            # clsx + tailwind-merge helper
```

---

## 2. Code Quality & Best Practices

### Strengths ✅

- **TypeScript Usage:** All components have typed props interfaces. Good use of `FormEvent`, `React.TouchEvent`, etc.
- **Accessibility:** Sections include `aria-label` attributes, buttons have `aria-label` for screen readers, the lightbox has `role="dialog"` and `aria-modal`.
- **Mobile-First Thinking:** Responsive classes throughout, touch swipe handlers, reduced animations on mobile, `prefers-reduced-motion` support.
- **SEO Foundation:** Open Graph tags, Twitter Card meta, JSON-LD structured data (Person + WebSite schemas), canonical URL, robots.txt, sitemap integration.
- **Performance Awareness:** DPR capping on mobile for Canvas, frame-skipping on mobile (30fps), `will-change` hints, `passive: true` scroll listeners, `requestAnimationFrame` throttling.
- **Security Headers:** Vercel config includes `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`.

### Issues ⚠️

- **Massive Component Files:** `StorySection.tsx` is 604 lines, `ProjectsSection.tsx` is 392 lines, `HeroSection.tsx` is 310 lines. These should be decomposed into smaller, focused sub-components.

- **Misnamed Directory:** `src/types/index.tsx` contains React SVG components, not TypeScript types. It should be named `src/components/icons/` or `src/components/SocialIcons.tsx`.

- **`cn()` Utility Unused:** The `cn()` function from `src/utils/cn.ts` (clsx + tailwind-merge) is imported nowhere in the codebase. Every component uses raw template literal string concatenation for conditional classes instead.

- **Inconsistent Dark Mode Approach:** The codebase mixes three different dark mode strategies simultaneously:
  1. `isDark` prop threaded through every component with ternary expressions
  2. Tailwind's `dark:` variant classes (e.g., `dark:text-cyan-400`)
  3. Manual `document.documentElement.classList.add("dark")` in `App.tsx`

  This creates confusion — some elements use `isDark ? "..." : "..."` while adjacent elements use `dark:` prefixes. Pick one pattern and be consistent.

- **Excessive Prop Drilling:** `isDark` is passed through every single component (8+ levels). This is a textbook case for React Context:

  ```tsx
  // Current: prop drilled everywhere
  <StorySection isDark={isDark} />
  <ServicesSection isDark={isDark} setContactMessage={...} scrollTo={...} />
  
  // Better: ThemeContext
  const { isDark } = useTheme();
  ```

- **No Error Boundaries:** Zero React error boundaries. If any component throws during render, the entire page goes blank with no fallback.

- **Hardcoded Color Values:** Colors like `#030712`, `#0D1B2A`, `#2563EB`, `#63B3ED`, `#7C3AED` are repeated across dozens of files. These should be centralized as CSS custom properties or Tailwind theme tokens.

- **Inline Styles:** Several components use inline `style={{}}` for dynamic values where CSS custom properties or Tailwind's arbitrary value syntax would be cleaner and more maintainable.

- **Extra Blank Lines in `types/index.tsx`:** The file ends with 4 unnecessary blank lines (lines 30-33).

---

## 3. Bugs & Logic Errors

### 🐛 BUG: Dual "Online/Offline" Status Logic With Different Thresholds

`App.tsx` (line 49) defines awake hours as **8 AM – 11 PM** (Asia/Colombo):
```tsx
setIsAwake(colomboHour >= 8 && colomboHour < 23);
```

`HeroSection.tsx` (line 33) uses a completely different range — **6 AM – 10 PM** (local browser time, NOT Colombo time):
```tsx
setIsOnline(hour >= 6 && hour < 22);
```

These are two different clocks, two different timezones, and two different thresholds showing conflicting online/offline status simultaneously. A visitor in New York could see "Available Now" in the navbar while the hero portrait says "OFFLINE (Sleeping)".

**Fix:** Remove the duplicate logic in `HeroSection.tsx` and pass `isAwake` from `App.tsx` as a prop instead.

### 🐛 BUG: Terminal Log List Uses Array Index as Key

In `HeroSection.tsx` (line 242):
```tsx
{terminalLogs.map((log, index) => (
  <div key={index} ...>
```

Since logs are prepended via `[...prev, "> " + cmd, response]`, using `index` as key causes React to incorrectly reconcile DOM nodes when new entries are added. While not visually broken due to the append-only pattern, it's technically incorrect and may cause issues with animations or transitions.

**Fix:** Use a unique ID generator (e.g., `crypto.randomUUID()`) or a counter ref.

### 🐛 BUG: `useEffect` in `ImageLightbox.tsx` Has Stale Closure

Line 67-68:
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    ...
    handleNext(); // References handleNext from stale closure
    handlePrev();
  };
  ...
}, [currentIndex, images.length]);
```

`handleNext` and `handlePrev` are defined outside the effect but reference `currentIndex` and `images.length`. While the dependency array includes `currentIndex`, the `handleNext`/`handlePrev` functions themselves are recreated each render but the effect captures stale versions. This can work in practice due to the dependency array, but it's fragile — if these functions gain additional dependencies in the future, the closure will silently break.

**Fix:** Move the navigation logic inline within the effect, or use `useCallback` for `handleNext`/`handlePrev` and include them in the dependency array.

### 🐛 BUG: Navbar Desktop Links Use `<a href="#section">` While `scrollTo()` Is Also Available

Desktop nav links (line 50-55) use raw `<a href="#story">` anchor links, but mobile links use `onClick={() => setMobileMenuOpen(false)}` with the same `<a href>` approach. Meanwhile, the `scrollTo` prop (which calls `element.scrollIntoView({ behavior: "smooth" })`) is only used internally by `handleNavClick`.

The `handleNavClick` function (line 18-21) is **never actually called** in the component's JSX. It's dead code:
```tsx
const handleNavClick = (id: string) => {
  scrollTo(id);          // This smooth-scroll function
  setMobileMenuOpen(false);
};
// ^ Never referenced in JSX
```

The mobile nav items directly use `onClick={() => setMobileMenuOpen(false)}` and rely on the browser's `<a href="#section">` for navigation, bypassing the smooth scroll entirely.

### 🐛 BUG: Auto-Slide Timer Resets on Every User Interaction

In `ServicesSection.tsx`, `ProjectsSection.tsx`, and `WhySection.tsx`, the auto-slide `useEffect` has `activeSlide` in its dependency array:

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setActiveSlide((prev) => (prev + 1) % 3);
  }, 5000);
  return () => clearInterval(timer);
}, [activeSlide]); // <— restarts timer on every slide change
```

Every time the slide changes (including user taps), the interval is torn down and recreated. This means:
1. If a user manually clicks a slide indicator, the 5-second timer resets (arguably desired).
2. When the auto-slide fires, it triggers itself — the interval is recreated after every auto-advance, which is unnecessary overhead.

**Fix:** Remove `activeSlide` from the dependency array. The `setActiveSlide((prev) => ...)` functional updater already reads the latest state.

### 🐛 BUG: Missing `og-image.png` in Public Directory

`Layout.astro` references `/og-image.png`:
```astro
const ogImage = `${siteUrl}/og-image.png`;
```

But `public/` only contains `favicon.ico` and `robots.txt`. No `og-image.png` exists. Social media previews will show a broken image.

### 🐛 BUG: JSON-LD `image` Points to Source Path

In `Layout.astro` (line 73):
```json
"image": "https://arryz.dev/src/assets/images/arryz.webp"
```

The `/src/assets/images/arryz.webp` path is a source-level path that may not be served at that URL in production (Astro processes and hashes asset paths). This should point to a file in `public/` or use Astro's built asset URL.

### 🐛 BUG: Project GitHub URLs Are Placeholder `https://github.com`

In `ProjectsSection.tsx`, all three projects have:
```tsx
githubUrl: "https://github.com", // TODO: replace with real repo URL
```

These link to GitHub's homepage, not actual repositories. Users clicking "Source Code" will land on github.com.

---

## 4. Security Vulnerabilities

### 🔴 HIGH: Formspree Endpoint ID Exposed in Client-Side Code

`ContactSection.tsx` (line 29):
```tsx
const response = await fetch("https://formspree.io/f/mvznargg", { ... });
```

The Formspree form ID `mvznargg` is hardcoded in client-side JavaScript. While Formspree is designed for client-side use, the endpoint is vulnerable to:
- **Spam abuse** — bots can POST directly to the endpoint without visiting the site.
- **Formspree has built-in spam protection, but:**
  - No CAPTCHA or honeypot field is implemented.
  - No rate limiting on the client side.

**Recommendation:** Add a honeypot field (hidden input that bots fill but humans don't) and/or integrate reCAPTCHA with Formspree's built-in support.

### 🟡 MEDIUM: Phone Number and Personal Email Hardcoded

`ContactSection.tsx` exposes:
- WhatsApp number: `+94 76 808 9712` (line 174)
- Email: `arryz.buzinezz@gmail.com` (line 170)

These are in client-side source code and easily scraped. For a portfolio this is expected, but be aware these are permanently indexed by web scrapers.

### 🟡 MEDIUM: Secret Discount Code Exposed in Terminal

`HeroSection.tsx` (line 52):
```tsx
response = "Email arryz.buzinezz@gmail.com or submit the form below. Secret discount activated: 'BUILTDIFFERENT2026AZ' for 10% off design work.";
```

The "secret" discount code `BUILTDIFFERENT2026AZ` is in plain text in the JavaScript bundle. Anyone viewing source or using DevTools can find it. If this code is meant to be a discovery reward, that's fine — but calling it "secret" is misleading.

### 🟢 LOW: No Content Security Policy (CSP) Header

The `vercel.json` security headers are good but don't include a `Content-Security-Policy` header. Without CSP, the site is more vulnerable to XSS attacks (though with a static portfolio the risk is low).

### 🟢 LOW: `X-XSS-Protection` Is Deprecated

The header `X-XSS-Protection: 1; mode=block` is set in `vercel.json`, but this header is deprecated and no longer supported by modern browsers. Chrome removed its XSS Auditor in 2019. It should be replaced with a proper CSP header.

---

## 5. Performance Issues

### 🔴 HIGH: Entire App Rendered Client-Side (Defeats Astro's Purpose)

`index.astro`:
```astro
<App client:load />
```

This hydrates the **entire** React component tree immediately on page load. Every section — Hero, Story, Services, Skills, Projects, Why, Contact, Footer — is loaded, parsed, and rendered as a single monolithic React bundle before the user sees anything interactive. This is essentially a Create React App inside Astro.

**Impact:**
- Large JavaScript bundle shipped to the client
- No progressive hydration
- No streaming or partial rendering
- Time to Interactive (TTI) is delayed

**Fix:** Break the page into separate Astro components where possible. Use `client:visible` for below-the-fold sections (Services, Skills, Projects, Contact) so they only hydrate when scrolled into view. Static content (story text, footer) can be rendered as pure Astro/HTML.

### 🔴 HIGH: Canvas Particle System Runs Continuously

`HeroBackground.tsx` runs a `requestAnimationFrame` loop **indefinitely** — even when the hero section is scrolled out of view. On desktop, this means 65 particles with O(n²) distance calculations, line drawing, and fill operations are running at 60fps even when the user is reading the Contact section.

**Fix:** Use an `IntersectionObserver` to pause the animation loop when the hero section is not visible.

### 🟡 MEDIUM: Preload Path Points to Source Asset

`Layout.astro` (line 53):
```html
<link rel="preload" as="image" href="/src/assets/images/arryz.webp" />
```

This preloads a source-level path. After Astro builds, images in `src/assets/` are processed and output with hashed filenames to `/_astro/`. The preload is likely a no-op in production (fetching a non-existent path).

### 🟡 MEDIUM: `mousemove` Event Triggers React State Update on Every Pixel

`App.tsx` (line 81):
```tsx
const handleMouseMove = (e: MouseEvent) => {
  setMousePos({ x: e.clientX, y: e.clientY });
};
```

Every single pixel of mouse movement triggers a `setState`, which schedules a React re-render of the `App` component and all its children (the entire page). While React batches updates, this is still excessive.

**Fix:** Use a `useRef` for the mouse position (as `HeroBackground.tsx` already does correctly) and update the cursor DOM element directly via `style`, bypassing React's render cycle entirely.

### 🟡 MEDIUM: `scrollPercent` State Causes Re-Renders

`App.tsx` (lines 63-66):
```tsx
setScrollPercent((window.scrollY / scrollHeight) * 100);
```

This triggers a re-render of the entire component tree on every scroll frame. The scroll progress bar only needs a width style update.

**Fix:** Use a ref and directly update the progress bar DOM element's `style.width`.

### 🟡 MEDIUM: CSS `@import` Inside `<style is:global>`

`Layout.astro` (line 107):
```html
<style is:global>
  @import "../index.css";
</style>
```

Using `@import` inside a `<style>` tag is a render-blocking operation that creates a waterfall — the browser must fetch and parse the imported CSS before rendering continues. Astro should handle this via its built-in CSS bundling instead.

### 🟡 MEDIUM: Google Fonts Loaded via Render-Blocking `<link>`

Three Google Font families (Syne, Figtree, JetBrains Mono) are loaded via a blocking `<link rel="stylesheet">`. The fonts load all weights (300-900) for Figtree and JetBrains Mono, but the site only uses a subset. This increases initial load time.

**Fix:** Add `&display=swap` (already present), but also subset the weights. Consider self-hosting the fonts for better performance and privacy.

### 🟢 LOW: Duplicate Mobile Detection

Mobile detection is performed in three places:
1. `App.tsx` line 77: `window.matchMedia('(hover: none)').matches || 'ontouchstart' in window`
2. `HeroBackground.tsx` line 4: Same check, extracted as `isMobileDevice()`
3. `HeroBackground.tsx` line 80: Called again inside `useEffect`

**Fix:** Centralize mobile detection in a shared hook: `useMobileDetect()`.

---

## 6. Unnecessary / Dead Code

### Dead Code

| Location | Code | Issue |
|----------|------|-------|
| `Navbar.tsx` L18-21 | `handleNavClick()` | Function defined but never called in JSX |
| `App.tsx` L20 | `hoveringInteractive` state | Passed to `BackgroundEffects` but only used for cursor styling; the state updates trigger re-renders of the entire tree for a cursor effect |
| `App.tsx` L19-20 | `mousePos` + `hoveringInteractive` | These drive cursor effects that should use refs, not state |
| `utils/cn.ts` | `cn()` function | Imported nowhere — the entire file is unused |
| `HeroSection.tsx` L6 | `import { Globe }` | Imported from lucide-react but never used in the component |
| `types/index.tsx` L30-33 | Blank lines | 4 trailing blank lines |

### Redundant Code (DRY Violations)

- **Touch Swipe Logic:** The exact same touch swipe handler pattern (`handleTouchStart`, `handleTouchMove`, `handleTouchEnd`, `minSwipeDistance = 50`) is copy-pasted verbatim in:
  - `ServicesSection.tsx` (lines 13-38)
  - `ProjectsSection.tsx` (lines 127-151)
  - `WhySection.tsx` (lines 11-36)
  - `ImageLightbox.tsx` (lines 98-121)

  This should be extracted into a `useSwipe()` custom hook.

- **Auto-Slide Timer Logic:** The same `useEffect` with `setInterval` and `% count` modulo logic is duplicated in `ServicesSection`, `ProjectsSection`, and `WhySection`. Extract into a `useAutoSlide(count, intervalMs)` hook.

- **Mobile Carousel Pattern:** The entire mobile carousel structure (flex container + `translateX` + indicator dots) is duplicated 3 times. Create a reusable `<MobileCarousel>` component.

- **Glass Card Classes:** `glass-card-dark` / `glass-card-light` are toggled via `isDark ? "glass-card-dark" : "glass-card-light"` in multiple places. A single `glass-card` class with dark-mode variants would be cleaner.

---

## 7. Suggested Improvements

### Architecture

1. **Leverage Astro Islands:** Break the monolithic `<App client:load />` into independent Astro islands. Static content (story text, skill badges, footer) can be rendered as pure HTML. Only interactive widgets (terminal, Go board, contact form, carousels) need `client:visible` or `client:load`.

2. **Introduce React Context for Theme:** Replace `isDark` prop drilling with a `ThemeProvider` context. Every component currently receives `isDark` — this is unsustainable if the component tree grows.

3. **Create a Design Token System:** Centralize all colors (`#030712`, `#0D1B2A`, `#2563EB`, etc.) into Tailwind theme extensions or CSS custom properties. Currently, changing the primary blue requires find-and-replace across 12+ files.

4. **Add Error Boundaries:** Wrap major sections in `<ErrorBoundary>` components so a crash in one section doesn't blank the entire page.

### Component Structure

5. **Decompose Large Components:** `StorySection.tsx` (604 lines) should be split into:
   - `StoryChapterSelector.tsx`
   - `StoryChapterContent.tsx` (with sub-components for each chapter)
   - `GoBoardSimulator.tsx`
   - `PodcastRadio.tsx`
   - `CodePreview.tsx`
   - `ConversionComparison.tsx`

6. **Extract Reusable Hooks:**
   - `useSwipe(onLeft, onRight)` — shared touch swipe logic
   - `useAutoSlide(count, intervalMs)` — carousel auto-advance
   - `useMobileDetect()` — mobile device detection
   - `useIntersectionObserver()` — for lazy animation triggers

7. **Extract Reusable Components:**
   - `<MobileCarousel items={} renderItem={} />` — reuse across Services, Projects, Why
   - `<SectionHeader title={} subtitle={} />` — consistent section headers
   - `<GlassCard isDark={} children={} />` — glass card wrapper

### Quality of Life

8. **Add a Linter & Formatter:** No `.eslintrc`, `.prettierrc`, or similar config files exist. Add ESLint with the `typescript-eslint` plugin and Prettier for consistent formatting.

9. **Add Unit Tests:** There are zero tests. At minimum, add tests for:
   - Terminal command logic (`runTerminalCommand`)
   - Go board game logic (`handleGoBoardClick`)
   - Contact form validation
   - Theme toggle behavior

10. **Add `loading="lazy"` Consistently:** Some images have `loading="lazy"`, but the hero portrait images don't (they shouldn't — they're above the fold). Project screenshot images in the lightbox should all be lazy-loaded (they are ✅).

11. **Replace `alert()` With Toast Notifications:** `ContactSection.tsx` uses `alert()` for validation and error messages (lines 23, 47, 50). Native alerts block the UI thread and look unprofessional. Use a toast/notification component instead.

12. **Add Scroll-to-Top on Route Change:** If the 404 page is ever navigated to, there's no scroll restoration.

13. **Use Semantic `<nav>` for Footer Links:** The footer doesn't wrap its content in a `<nav>` element.

14. **404 Page Styling:** The 404 page uses inline `style=""` attributes and doesn't match the portfolio's design system. It should use Tailwind classes and match the dark theme.

---

## 8. Dependency Review

### Current Dependencies

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| `astro` | ^6.4.4 | ✅ Current | Latest major |
| `@astrojs/react` | ^5.0.7 | ✅ Current | Compatible with Astro 6 |
| `@astrojs/sitemap` | ^3.7.3 | ✅ Current | |
| `react` | 19.2.6 | ✅ Current | React 19 pinned |
| `react-dom` | 19.2.6 | ✅ Current | Matches React |
| `lucide-react` | ^1.17.0 | ✅ Current | |
| `clsx` | 2.1.1 | ⚠️ Unused | `cn()` utility is never called |
| `tailwind-merge` | 3.4.0 | ⚠️ Unused | `cn()` utility is never called |
| `tailwindcss` | 4.1.17 | ✅ Current | Tailwind v4 |
| `@tailwindcss/vite` | 4.1.17 | ✅ Current | Matches Tailwind |
| `typescript` | 5.9.3 | ✅ Current | |
| `@types/node` | 22.19.17 | ✅ Current | |
| `@types/react` | ^19.2.7 | ✅ Current | |
| `@types/react-dom` | ^19.2.3 | ✅ Current | |

### Issues

- **`clsx` and `tailwind-merge` are installed but unused.** The `cn()` utility in `src/utils/cn.ts` wraps them, but nothing imports `cn()`. Either start using `cn()` consistently across all components (recommended — it would clean up the messy ternary class strings), or remove both packages and the utility file.

- **No lock file integrity check:** No `npm audit` or vulnerability scanning is configured in CI/CD.

- **No Prettier/ESLint as dev dependencies:** The project has no code quality tooling installed.

### Missing Dependencies (Recommended)

- `eslint` + `@typescript-eslint/*` — static analysis
- `prettier` — code formatting
- `@astrojs/check` — Astro-specific diagnostics
- A toast/notification library (or build a custom one) to replace `alert()`

---

## 9. Overall Score & Summary

## Score: 6.2 / 10

### Honest Assessment

This is a **visually impressive** portfolio with clear creative ambition and strong design instincts. The interactive elements (Canvas particle network, Go board, terminal simulator) show genuine engineering curiosity. The SEO foundation is above average for a portfolio site, and the mobile optimizations demonstrate real-world performance awareness.

However, the codebase has **significant architectural and maintainability problems** that would fail a professional production review:

1. **Astro is used as a dumb HTML shell** — the entire React tree is hydrated with `client:load`, completely negating Astro's core value proposition (islands, partial hydration, zero-JS static content). This is the single biggest architectural mistake.

2. **The component structure doesn't scale.** Massive 600-line components, copy-pasted carousel/swipe logic in 4 places, prop drilling through 8+ components, and inconsistent dark mode approaches make this codebase difficult to maintain or extend.

3. **Real bugs exist** — conflicting online/offline status, missing OG image, placeholder GitHub URLs, stale closures, and dead code paths that indicate incomplete refactoring.

### Top 3 Priorities to Fix

| Priority | Issue | Impact |
|----------|-------|--------|
| **1** | **Break the monolithic `<App client:load />`** into proper Astro islands with `client:visible` for below-the-fold sections | Dramatically reduces JS bundle size, improves TTI, and actually uses Astro for what it's designed for |
| **2** | **Fix the conflicting online/offline status bug** and the missing `og-image.png` | These are user-facing bugs visible to every visitor and every social media share |
| **3** | **Extract duplicated code into hooks and reusable components** (`useSwipe`, `useAutoSlide`, `<MobileCarousel>`, ThemeContext) | Eliminates ~200 lines of copy-pasted code and makes the codebase maintainable |

---

*Review complete. Overall, a solid foundation with creative flair that needs architectural maturity and cleanup before it's truly production-grade.*
