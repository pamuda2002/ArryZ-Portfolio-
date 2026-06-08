# SEO Changes Log — ArryZ Portfolio

All changes implemented on June 8, 2026 based on the SEOanalysis.md audit report.

---

## Files Modified

### 1. `src/pages/index.astro`
**FIX 1 — CRITICAL: Switch client:only to client:load**
- Changed `<App client:only="react" />` → `<App client:load />`
- This enables SSR (server-side rendering), meaning Google's crawler now sees all HTML content, headings, links, and semantic structure on first crawl instead of an empty `<body>`

### 2. `astro.config.mjs`
**FIX 2 — Astro configuration**
- Added `site: "https://arryz.dev"` (required for sitemap generation and canonical URLs)
- Added `compressHTML: true` (smaller HTML output)
- Added `trailingSlash: "never"` (clean URL structure)
- Added `@astrojs/sitemap` integration (auto-generates sitemap at build)
- Installed `@astrojs/sitemap` package

### 3. `src/layouts/Layout.astro`
**FIX 3 — Meta tags, canonical, Open Graph**
- **3a.** Fixed canonical URL: `href={siteUrl}` → `href={Astro.url.href}` (dynamic per-page)
- **3b.** Trimmed default description to 134 characters (was ~195, exceeding 160-char SERP limit)
- **3c.** Updated default title to include both names: `"ArryZ | Full-Stack Developer — Pamuda Jayathilaka"`
- **3d.** Fixed `og:url` to use `Astro.url.href` instead of hardcoded URL
- **3e.** Added `og:image:width`, `og:image:height`, and `og:image:alt` meta tags
- **3f.** Added `<link rel="preload" as="image" href="/src/assets/images/arryz.webp" />` for LCP

**FIX 4 — JSON-LD Person & WebSite Schema**
- Added complete `Person` schema (name, alternateName, url, jobTitle, email, nationality, knowsAbout, sameAs)
- Added `WebSite` schema (name, url, description, author)

### 4. `public/robots.txt` (NEW)
**FIX 5 — Created robots.txt**
- Allow all crawlers, sitemap directive pointing to `https://arryz.dev/sitemap-index.xml`

### 5. `src/pages/404.astro` (NEW)
**FIX 6 — Created 404 page**
- Functional 404 page with Layout wrapper, heading, and back link

### 6. `vercel.json` (NEW)
**FIX 7 — Vercel deployment configuration**
- Cache headers: `/_astro/*` assets get `max-age=31536000, immutable`
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`
- Redirect: `www.arryz.dev` → `arryz.dev` (permanent)

### 7. `src/components/Navbar.tsx`
**FIX 8 — Navbar SEO improvements**
- **8a.** Logo import was already `.webp` — confirmed
- **8b.** Added `width={40} height={40}` to logo `<img>`
- **8c.** Changed all desktop nav `<button>` → `<a href="#section">` (6 items)
- **8c.** Changed all mobile nav `<button>` → `<a href="#section">` (6 items)
- **8c.** Changed "Hire Me" CTA buttons to `<a href="#contact">`
- **8c.** Changed logo clickable div to `<a href="#hero">`
- **8d.** Added `aria-expanded={mobileMenuOpen}` and `aria-controls="mobile-menu"` to mobile toggle
- **8d.** Added `id="mobile-menu"` to mobile drawer container
- Added `width={20} height={14}` to all Sri Lanka flag images (2 instances)

### 8. `src/App.tsx`
**FIX 9 — Replace root div with main**
- Changed `<div className="...">` → `<main className="...">`
- Changed closing `</div>` → `</main>`

### 9. Section Components (FIX 10 — aria-labels)
**All section `<section>` elements now have `aria-label` attributes:**
- `HeroSection.tsx`: `aria-label="Hero — ArryZ introduction"`
- `StorySection.tsx`: `aria-label="My origin story"`
- `ServicesSection.tsx`: `aria-label="Services offered"`
- `SkillsSection.tsx`: `aria-label="Technologies and skills"`
- `ProjectsSection.tsx`: `aria-label="Personal projects"`
- `WhySection.tsx`: `aria-label="Why work with ArryZ"`
- `ContactSection.tsx`: `aria-label="Contact and hire"`

### 10. `src/components/ProjectsSection.tsx`
**FIX 11a — Project card div → article**
- Changed all project card wrapper `<div>` → `<article>` (desktop + mobile, 2×3 = 6 tags total)

**FIX 11b — Placeholder GitHub URLs**
- Added `// TODO: replace with real repo URL` comment to all 3 placeholder URLs (lines 50, 81, 100)

**FIX 13 — Lazy loading on project images**
- Added `loading="lazy"` to all project preview images (desktop + mobile)
- Added `width={640} height={360}` to all project preview images

**FIX 15 — Styled div heading**
- Changed "CRAFTED PROJECTS" `<div>` → `<span>` (eyebrow label above `<h2>`)

### 11. `src/components/HeroSection.tsx`
**FIX 12a — Hero portrait alt text**
- Changed `alt="ArryZ"` → `alt="Pamuda Jayathilaka (ArryZ) — Full-Stack Developer from Sri Lanka"`

**FIX 12b — Hero portrait dimensions**
- Added `width={380} height={507}` to hero portrait image

**FIX 12c — Confirmed: hero image does NOT have `loading="lazy"` ✅**

**FIX 16 — H1 content**
- Letters are rendered as real `<span>` elements inside the `<h1>` — crawlable ✅
- Added `aria-label="ArryZ — Full-Stack Developer"` to `<h1>` for extra clarity

### 12. `src/components/SkillsSection.tsx`
**FIX 14a — Heading hierarchy**
- Changed `<h4>` → `<h3>` (was skipping `<h3>` level between `<h2>` and `<h4>`)

**FIX 14b — Styled div heading**
- Changed "MY TOOLBOX" `<div>` → `<span>` (eyebrow label above `<h2>`)

### 13. `src/components/ImageLightbox.tsx`
**FIX 13 — Lazy loading on lightbox images**
- Added `loading="lazy"` to main lightbox image
- Added `width={1200} height={800}` to main lightbox image
- Thumbnails already had `loading="lazy"` ✅

### 14. `src/index.css`
**FIX 17 — Uncommented prefers-reduced-motion**
- Uncommented the `@media (prefers-reduced-motion: reduce)` media query (was lines 316–324)

---

## Build Verification

- ✅ `npm run build` completed with 0 errors
- ✅ `dist/sitemap-index.xml` generated (180 bytes)
- ✅ `dist/index.html` contains real server-rendered HTML (headings, nav links, sections, forms, etc.)
- ✅ 2 pages built: `/index.html` and `/404.html`

---

## TODO Items (Manual Completion Required)

1. **Create `og-image.png`** — The file `public/og-image.png` (1200×630px) still does not exist. Create a branded social preview image and place it in `/public/og-image.png`.

2. **Replace placeholder GitHub URLs** — Three projects have `githubUrl: "https://github.com"` (marked with TODO comments). Replace with actual repository URLs:
   - Elotefruit (line 50)
   - Austin Plumbing (line 81)
   - Letter Leap (line 100)

3. **Verify hero image preload path** — The preload tag uses `/src/assets/images/arryz.webp`. After build, verify this resolves correctly on the deployed site (Astro may transform the path via the Vite plugin).

4. **Test social sharing** — After deploying, test the OG tags by pasting the URL into:
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Discord / Slack preview

5. **Submit sitemap to Google Search Console** — After deploying, submit `https://arryz.dev/sitemap-index.xml` in Google Search Console.
