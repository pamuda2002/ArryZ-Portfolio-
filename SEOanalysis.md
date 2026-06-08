# SEO Audit Report — ArryZ Portfolio
*Audited by Antigravity (Claude Opus 4.6) | Astro SSG | June 8, 2026*

---

## Overall Summary

This Astro SSG portfolio has **solid foundational meta tag coverage** — title, description, Open Graph, and Twitter Card tags are all present in the base layout with dynamic props support. However, **critical infrastructure is missing**: there is no `robots.txt`, no sitemap generation, no JSON-LD structured data, and no `vercel.json` deployment configuration. The single biggest SEO problem is that the entire site body is rendered inside a `client:only="react"` island, meaning **Google receives an empty `<body>` on first crawl** — all headings, text content, links, and semantic structure are invisible to search engine crawlers.

**Top 2 strengths:** Well-structured Open Graph + Twitter Card meta tags; Google Fonts loaded correctly with `preconnect` and `display=swap`.

**Top 2 critical gaps:** Client-side-only rendering makes all content invisible to crawlers; complete absence of robots.txt, sitemap, and structured data.

---

## Score Overview

| # | Area | Status | Priority | Notes |
|---|------|--------|----------|-------|
| 1 | Head & meta tags | ⚠️ Partial | High | Good tags present, but canonical is hardcoded & title inconsistent between source/build |
| 2 | JSON-LD schema | ❌ Missing | High | Zero structured data anywhere in the project |
| 3 | Heading hierarchy | ❌ Missing | High | All headings inside `client:only` React — invisible to crawlers |
| 4 | Semantic HTML | ❌ Missing | High | No `<main>`, no `<article>`, no `<nav>` in Astro-rendered HTML; all in CSR |
| 5 | Image SEO | ⚠️ Partial | Medium | Alt text present but no width/height attrs, no lazy loading on main images |
| 6 | Performance | ⚠️ Partial | Medium | Google Fonts well-configured; but no preloads, no compressHTML, heavy JS bundle |
| 7 | Astro-specific | ❌ Missing | Critical | No `site` property, no sitemap integration, no 404 page, no trailingSlash config |
| 8 | Open Graph | ⚠️ Partial | Medium | All tags present, but `og:image` file doesn't exist in `/public` |
| 9 | Robots & sitemap | ❌ Missing | Critical | Neither robots.txt nor sitemap exists |
| 10 | Crawlability | ❌ Missing | Critical | `client:only` renders empty body for crawlers — all internal links invisible |
| 11 | Portfolio SEO | ⚠️ Partial | Medium | Developer name present; no LinkedIn, no about page, no per-project pages |
| 12 | Vercel config | ❌ Missing | Low | No vercel.json exists |

---

## Detailed Findings

---

### 1. Head & Meta Tags

**Files:** [Layout.astro](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro), [index.astro](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/pages/index.astro)

**Current state:**

The base layout accepts dynamic `title` and `description` via props with sensible defaults:

```astro
// Layout.astro lines 2-10
interface Props {
  title?: string;
  description?: string;
}

const {
  title = "ArryZ | Full-Stack Developer",
  description = "Self-taught full-stack developer from Sri Lanka...",
} = Astro.props;
```

Present tags (lines 19-27):
- ✅ `<meta charset="UTF-8">` — line 19
- ✅ `<meta name="viewport">` — line 20
- ✅ `<title>` — line 23, dynamic via props
- ✅ `<meta name="description">` — line 24, dynamic via props
- ✅ `<meta name="author">` — line 25
- ✅ `<meta name="robots" content="index, follow">` — line 26
- ⚠️ `<link rel="canonical" href={siteUrl}>` — line 27

**Issues:**

1. **Canonical URL is hardcoded** (line 27): `href={siteUrl}` always resolves to `https://arryz.dev` regardless of the current page. If additional pages are added, every page will claim to be the canonical for the homepage. Should use `Astro.url.href` or construct a dynamic canonical.

2. **Title inconsistency between source and build**: The Layout default is `"ArryZ | Full-Stack Developer"` (line 8), but the built `dist/index.html` contains `"ArryZ | Full-Stack Developer &amp; Landing Page Specialist"`. This suggests the title was changed at some point. The current source title at **30 characters** is well under the 60-char limit but could be more keyword-rich.

3. **Description length**: The default description is ~195 characters — exceeds the recommended 140-160 character range and will be truncated in SERPs.

4. **Homepage doesn't pass custom props** ([index.astro](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/pages/index.astro) line 6-8):
   ```astro
   <Layout>
     <App client:only="react" />
   </Layout>
   ```
   No `title` or `description` is passed, so defaults are used. This works for a single-page site but shows the architecture isn't utilizing per-page SEO overrides.

5. **No `<html lang>` dynamic handling** — hardcoded to `en` which is correct for an English site.

**Impact:** The hardcoded canonical won't cause immediate problems on a single-page site, but will create canonicalization issues the moment additional pages (blog, individual projects) are added. The over-long description means Google will truncate it and may auto-generate a snippet instead.

---

### 2. JSON-LD Structured Data

**Files examined:** All `.astro` and `.tsx` files in `src/`

**Current state:** There is **zero JSON-LD structured data** anywhere in the project. No `<script type="application/ld+json">` tags exist in any file.

**Issues:**

1. **No `Person` schema** — For a developer portfolio, a Person schema is critical. Missing fields: `name`, `url`, `jobTitle`, `sameAs` (GitHub, Instagram, X/Twitter), `image`, `email`, `knowsAbout`.

2. **No `WebSite` schema** — No SearchAction, no site name definition for Google's Knowledge Panel.

3. **No `CreativeWork` or `SoftwareApplication` schema** — Projects like Elotefruit, Austin Plumbing, and Letter Leap would benefit from structured CreativeWork markup.

4. **No `LocalBusiness` or `ProfessionalService` schema** — Ironic given the developer sells SEO services and landing pages. A ProfessionalService schema would help establish E-E-A-T.

5. **No `BreadcrumbList`** — Not applicable for a single-page site but would be needed when scaling.

**Impact:** Without structured data, Google has no rich snippet eligibility. No knowledge panel, no enhanced search appearance, no sitelinks search box. For a developer who advertises SEO expertise, this is a credibility gap.

---

### 3. Heading Hierarchy

**Files:** [HeroSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/HeroSection.tsx), [StorySection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/StorySection.tsx), [ServicesSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ServicesSection.tsx), [SkillsSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/SkillsSection.tsx), [ProjectsSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx), [WhySection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/WhySection.tsx), [ContactSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ContactSection.tsx)

**Current state:**

Heading structure (from React components):
- **`<h1>`**: One instance in [HeroSection.tsx line 101](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/HeroSection.tsx#L101) — renders "ArryZ" letter by letter
- **`<h2>`**: Used correctly for section titles:
  - HeroSection line 125: "I Build Web Experiences That Actually Work."
  - StorySection line 139: "My Origin Story"
  - ServicesSection line 97: "High-Value Services Designed To Turn Visitors Into Clients"
  - SkillsSection line 46: "Technologies I Have Mastered"
  - ProjectsSection line 179: "Personal Projects — Real Code, Real Craft."
  - WhySection line 90: "Unconventional Path. Unmatched Focus."
  - ContactSection line 70: "Have a project? Let's build something worth finding."
- **`<h3>`**: Used for sub-items within sections (service cards, project titles, story chapter headings)
- **`<h4>`**: Used in SkillsSection line 153 and ContactSection line 196

**Issues:**

1. **🚨 CRITICAL: All headings are inside `client:only="react"`** — The `<App client:only="react" />` directive in [index.astro line 7](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/pages/index.astro#L7) means **zero headings are server-rendered**. Google's crawler sees an empty `<body>` with only an `<astro-island>` shell. The entire heading hierarchy is invisible to search engines.

2. **`<h1>` content is just "ArryZ"** — The h1 ([HeroSection.tsx line 101-121](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/HeroSection.tsx#L101-L121)) only displays the brand name. It does not state what the person does. A better h1 would be "ArryZ — Full-Stack Developer & Landing Page Specialist" or similar.

3. **Heading level skip**: [SkillsSection.tsx line 153](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/SkillsSection.tsx#L153) uses `<h4>` directly under `<h2>` (line 46) without an intervening `<h3>`.

4. **Styled `<div>` used as headings**: Several section labels use `<div>` or `<span>` with styled text instead of heading tags — e.g., "CRAFTED PROJECTS" in [ProjectsSection.tsx line 176-178](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx#L176-L178), "MY TOOLBOX" in [SkillsSection.tsx line 43-45](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/SkillsSection.tsx#L43-L45).

**Impact:** Because `client:only` prevents SSR, Google sees **no headings at all**. This is the single most damaging SEO issue in the entire project. Even if the heading hierarchy were perfect, crawlers can't parse it.

---

### 4. Semantic HTML

**Files:** [Layout.astro](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro), [App.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/App.tsx), [Navbar.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx), [Footer.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Footer.tsx)

**Current state:**

The Astro layout ([Layout.astro lines 62-64](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro#L62-L64)):
```html
<body>
  <slot />
</body>
```

No `<main>`, `<header>`, `<footer>`, or `<nav>` exists in the Astro template. These elements **do** exist inside the React components:

- ✅ `<header>` — [Navbar.tsx line 23](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx#L23)
- ✅ `<nav>` — [Navbar.tsx line 46](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx#L46)
- ✅ `<footer>` — [Footer.tsx line 10](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Footer.tsx#L10)
- ✅ `<section>` — Used correctly in every section component with `id` attributes
- ❌ **No `<main>` element** — The root `<div>` in [App.tsx line 125](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/App.tsx#L125) wraps everything in a generic `<div>` instead of `<main>`
- ❌ **No `<article>` tags** — Project cards in [ProjectsSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx) use `<div>` instead of `<article>`

**Issues:**

1. **🚨 CRITICAL (same as heading issue): All semantic HTML is inside `client:only`** — crawlers see none of it. The SSR output is literally `<body><astro-island ...></astro-island></body>`.

2. **No `<main>` landmark** — The App component wraps content in a `<div>`, not `<main>`. Screen readers and crawlers cannot identify the primary content region.

3. **No `aria-labelledby` on sections** — While `<section>` tags have `id` attributes, none have `aria-label` or `aria-labelledby` (except carousel indicator buttons which have `aria-label`).

4. **Project cards are `<div>`, not `<article>`** — [ProjectsSection.tsx lines 193-256](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx#L193-L256) renders project cards as generic divs.

5. **No skip navigation link** — No "Skip to main content" link exists anywhere for keyboard/screen-reader users.

6. **Navigation uses `<button>` elements instead of `<a>` links** — [Navbar.tsx lines 47-52](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx#L47-L52) uses `<button onClick={scrollTo}>` for navigation. These are not crawlable links — search engines cannot follow button click handlers.

7. **Mobile menu toggle button lacks `aria-expanded`** — [Navbar.tsx line 88-93](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx#L88-L93) toggles menu visibility but doesn't communicate state to assistive technology.

**Impact:** Even if content were SSR'd, the lack of `<main>`, `<article>`, and proper link elements means crawlers cannot properly understand page structure or follow internal navigation paths.

---

### 5. Image SEO & Performance

**Files:** [HeroSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/HeroSection.tsx), [ProjectsSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx), [Navbar.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx), [ImageLightbox.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ImageLightbox.tsx)

**Current state:**

Image inventory:
| Location | File | Alt text | width/height | loading | Format |
|----------|------|----------|-------------|---------|--------|
| HeroSection L201-205 | `arryz.webp` / `arryz_light.webp` | `alt="ArryZ"` | ❌ Missing | ❌ None | ✅ WebP |
| Navbar L34-38 | `Logo.png` | `alt="ArryZ Logo"` | ❌ Missing | ❌ None | ⚠️ PNG (85KB) |
| Navbar L61 | `Sri_Lanka_flag.svg` | `alt="Sri Lanka Flag"` | ❌ Missing | ❌ None | ✅ SVG |
| ProjectsSection L203-206 | project previews | ✅ Dynamic alt | ❌ Missing | ❌ None | ✅ WebP |
| ProjectsSection L283-286 | project previews (mobile) | ✅ Dynamic alt | ❌ Missing | ❌ None | ✅ WebP |
| ImageLightbox L198-204 | project screenshots | ✅ Dynamic alt | ❌ Missing | ❌ None | ✅ WebP |
| ImageLightbox L245-249 | thumbnails | ✅ Dynamic alt | ❌ Missing | ✅ `loading="lazy"` | ✅ WebP |

**Issues:**

1. **No `width` and `height` attributes on any `<img>` tag** — All images rely on CSS (`w-full h-full object-cover`) for sizing. Without explicit width/height, the browser cannot calculate aspect ratio before load, causing **CLS (Cumulative Layout Shift)** violations.

2. **Hero image `alt="ArryZ"` is too generic** — [HeroSection.tsx line 204](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/HeroSection.tsx#L204). Should be descriptive, e.g., `"Pamuda Jayathilaka (ArryZ) — Full-Stack Developer from Sri Lanka"`.

3. **No `loading="lazy"` on any below-fold images** — Project preview images, flag icons, and lightbox images (except thumbnails) have no lazy loading. Only the lightbox thumbnails ([ImageLightbox.tsx line 249](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ImageLightbox.tsx#L249)) use `loading="lazy"`.

4. **Hero/above-fold image correctly has no lazy loading** — ✅ This is correct behaviour.

5. **Astro's `<Image>` component is not used** — The project uses raw `<img>` tags everywhere. `@astrojs/image` is not installed (checked `package.json`). However, since all content is `client:only`, Astro's Image component can't be used in React components anyway.

6. **Logo.png is 85KB** — [Logo.png](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/assets/images/Logo.png) at 85KB is large for a navbar logo. Should be converted to WebP or SVG.

7. **Image formats are generally good** — Portrait photos use `.webp` format. Project screenshots all use `.webp`. Only the logo uses PNG.

**Impact:** Missing `width`/`height` causes CLS spikes. Missing `loading="lazy"` on below-fold images means the browser downloads all project preview images immediately, slowing initial page load (LCP). The oversized PNG logo adds unnecessary weight to every page load.

---

### 6. Performance & Core Web Vitals

**Files:** [Layout.astro](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro), [astro.config.mjs](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/astro.config.mjs), [index.css](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/index.css), [package.json](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/package.json)

**Current state:**

**Font loading (lines 49-55 of Layout.astro):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="...&display=swap" rel="stylesheet" />
```
- ✅ Correct `preconnect` for both Google Fonts origins
- ✅ `display=swap` is specified in the Google Fonts URL
- ✅ Three fonts loaded (Syne, Figtree, JetBrains Mono)

**Issues:**

1. **`compressHTML` is not enabled** — [astro.config.mjs](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/astro.config.mjs) has no `compressHTML: true` setting. The built HTML retains extra whitespace.

2. **No `<link rel="preload">` for critical assets** — No preloading for the hero image (`arryz.webp`), the logo, or the primary font (Figtree). The hero image is render-blocking for LCP.

3. **Google Fonts stylesheet is render-blocking** — The `<link rel="stylesheet">` for Google Fonts ([Layout.astro line 52-55](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro#L52-L55)) blocks rendering. Should use `media="print" onload="this.media='all'"` pattern or `rel="preload"` with `as="style"`.

4. **`client:only="react"` forces a massive client-side JS bundle** — [index.astro line 7](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/pages/index.astro#L7). The entire application (12 components, React 19, all animations) is downloaded and executed before any content appears. This destroys:
   - **FCP (First Contentful Paint)**: User sees nothing until JS bundle downloads, parses, and renders
   - **LCP (Largest Contentful Paint)**: Hero image can't load until React mounts
   - **TBT (Total Blocking Time)**: Heavy JS execution blocks the main thread

5. **`prefers-reduced-motion` is commented out** — [index.css lines 316-324](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/index.css#L316-L324):
   ```css
   /* Respect prefers-reduced-motion accessibility setting
   @media (prefers-reduced-motion: reduce) {
     ...
   }
   */
   ```
   This is a CWV and accessibility issue — users who prefer reduced motion still get all animations.

6. **Heavy canvas animation on hero** — [HeroBackground.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/HeroBackground.tsx) runs a requestAnimationFrame particle simulation. While mobile optimizations exist (frame skipping, reduced particle count), this still consumes significant GPU/CPU resources.

7. **No `output: 'static'` explicitly set** — [astro.config.mjs](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/astro.config.mjs) doesn't explicitly set `output: 'static'`. While this is the default, it should be explicit for clarity.

8. **No `site` property** in astro.config.mjs — Required for sitemap generation and canonical URL resolution.

**Impact:** The `client:only` pattern means the entire site's Time to Interactive depends on JavaScript download + parse + execution. On slow 3G connections, users may see a blank page for 5-10+ seconds. Google's CWV scores will be very poor, directly affecting search ranking.

---

### 7. Astro-Specific SEO Features

**File:** [astro.config.mjs](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/astro.config.mjs), [package.json](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/package.json)

**Current state:**

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [react()],
  vite: { ... },
});
```

**Issues:**

1. **❌ No `site` property** — Required for sitemap generation, canonical URLs, and OG URLs. Should be `site: "https://arryz.dev"`.

2. **❌ `@astrojs/sitemap` is not installed** — Not in `package.json` dependencies. No sitemap will be generated at build time.

3. **❌ No `trailingSlash` configuration** — Not set in astro.config. Should be explicitly set to `"never"` for a clean URL structure.

4. **❌ No custom 404 page** — No `src/pages/404.astro` exists. Users hitting dead URLs get the default Astro 404 or a server error.

5. **❌ `compressHTML` is not enabled** — Should be set to `true` for smaller HTML output.

6. **❌ No content collections** — Projects are hardcoded in [ProjectsSection.tsx lines 22-103](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx#L22-L103) as a JavaScript array. No frontmatter-based content system is used. This makes SEO metadata per-project impossible.

7. **⚠️ `output` is not explicitly set** — Defaults to `'static'` which is correct, but should be explicit.

8. **⚠️ Only one page** (`index.astro`) — The entire portfolio is a single page with no routing. While this is a design choice, it limits SEO potential significantly (no per-project pages to rank for specific keywords).

**Impact:** Without the `site` property, Astro cannot generate sitemaps or resolve absolute URLs. The lack of a 404 page means lost traffic from any mistyped or broken inbound links.

---

### 8. Open Graph & Twitter Card

**File:** [Layout.astro lines 29-44](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro#L29-L44)

**Current state:**

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={siteUrl} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:site_name" content="ArryZ Portfolio" />
<meta property="og:locale" content="en_US" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content={siteUrl} />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
<meta name="twitter:creator" content="@psjayathilaka" />
```

**What's good:**
- ✅ All required OG tags present
- ✅ `og:type` set to "website"
- ✅ `og:locale` specified
- ✅ `og:site_name` specified
- ✅ `twitter:card` set to `summary_large_image`
- ✅ `twitter:creator` specified
- ✅ Title and description are dynamic (from props)

**Issues:**

1. **⚠️ `og:image` points to a non-existent file** — [Layout.astro line 13](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro#L13): `const ogImage = \`${siteUrl}/og-image.png\``. The `/public` directory contains only `favicon.ico` — **there is no `og-image.png` file**. When shared on social media, no preview image will appear.

2. **⚠️ `og:url` is hardcoded** — [Layout.astro line 31](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/layouts/Layout.astro#L31): Always `https://arryz.dev`. Should use `Astro.url.href` for dynamic per-page URLs.

3. **Missing `og:image:width` and `og:image:height`** — Even when the image is added, specifying dimensions (`1200` × `630`) helps social platforms render previews faster.

4. **Missing `og:image:alt`** — Accessibility best practice for social media previews.

**Impact:** Social sharing (LinkedIn, Twitter, Discord, Slack) will show **no preview image**, dramatically reducing click-through rates on shared links. This is easily the most user-visible SEO deficiency.

---

### 9. Robots.txt & Sitemap

**Files checked:** `/public/robots.txt` (does not exist), `/dist/sitemap-index.xml` (does not exist), `/public/sitemap.xml` (does not exist)

**Current state:**

- ❌ **No `robots.txt`** exists in the `public/` directory
- ❌ **No `sitemap.xml`** exists anywhere
- ❌ **`@astrojs/sitemap` is not installed** in `package.json`
- ❌ **No `site` property** in `astro.config.mjs` (required for sitemap generation)

**Issues:**

1. Without `robots.txt`, search engines use default crawl behaviour, which is fine, but there's no explicit sitemap directive to guide them.

2. Without a sitemap, the only way Google discovers pages is through links. With a single-page site this is less critical, but the sitemap is still needed for:
   - Declaring the canonical URL
   - Providing `lastmod` dates
   - Signalling page priority

3. No `Sitemap:` directive means Google Search Console will show a missing sitemap warning.

**Impact:** Google may still index the site via other discovery methods, but you're missing an easy signal to help search engines understand your site structure. This becomes critical when pages are added.

---

### 10. Crawlability & Internal Links

**Files:** [index.astro](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/pages/index.astro), [App.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/App.tsx), [Navbar.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx), [ProjectsSection.tsx](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx)

**Current state:**

**🚨 CRITICAL ARCHITECTURAL PROBLEM:**

[index.astro line 7](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/pages/index.astro#L7):
```astro
<App client:only="react" />
```

The `client:only="react"` directive means:
- **Zero HTML is server-rendered for the component and its children**
- The built `dist/index.html` body contains only: `<astro-island ...></astro-island>` — completely empty
- **Google's crawler sees NO text content, NO links, NO headings, NO images**
- The entire portfolio content only appears after JavaScript downloads and executes

**Issues:**

1. **All internal navigation uses JavaScript `onClick` handlers, not `<a>` tags** — [Navbar.tsx lines 47-52](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx#L47-L52) uses `<button onClick={() => handleNavClick("story")}>` instead of `<a href="#story">`. Crawlers cannot follow these.

2. **External links exist but are inside client-only React** — GitHub links ([ContactSection.tsx line 122](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ContactSection.tsx#L122): `https://github.com/pamuda2002`), social links, and email links all exist as `<a>` tags but are not crawlable because they're inside `client:only`.

3. **Project GitHub URLs are placeholders** — [ProjectsSection.tsx lines 50, 82, 100](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx#L50): `githubUrl: "https://github.com"` — all three projects link to the GitHub homepage, not actual repositories.

4. **No individual project pages** — All projects are displayed on the homepage only. There are no separate `/projects/elotefruit` or similar URLs to rank independently.

5. **Footer "Scroll to Top" is a `<button>`, not an `<a>` link** — [Footer.tsx line 27-33](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Footer.tsx#L27-L33).

**Impact:** This is **the most critical SEO issue**. Google cannot index ANY content on this website. The site effectively doesn't exist in Google's index beyond the `<head>` meta tags. To fix this, the application must either:
- Switch from `client:only="react"` to `client:load` (enables SSR + hydration)
- Or pre-render critical content in Astro templates and only hydrate interactive parts

---

### 11. Portfolio-Specific SEO

**Files:** All component files

**Current state:**

| Criterion | Status | Details |
|-----------|--------|---------|
| Developer name in `<h1>` or `<title>` | ⚠️ | "ArryZ" in h1 (not real name); real name "Pamuda Jayathilaka" only in Navbar subtext, meta author, and Footer |
| Primary skill/role in hero | ✅ | "Full-Stack Developer", "High Conversion Landing Page Specialist", "I Build Web Experiences That Actually Work" — all present |
| Per-project page titles | ❌ | No individual project pages exist |
| Technology keywords in descriptions | ✅ | React, TypeScript, Next.js, PostgreSQL, Tailwind, Python, Node.js — naturally present in project descriptions and skills section |
| About/Bio page | ⚠️ | No separate about page, but StorySection functions as a bio |
| GitHub URL in HTML | ✅ | `https://github.com/pamuda2002` in [ContactSection.tsx line 122](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ContactSection.tsx#L122) |
| LinkedIn URL | ❌ | No LinkedIn profile linked anywhere — critical omission |
| Email `mailto:` link | ✅ | `mailto:arryz.buzinezz@gmail.com` in [ContactSection.tsx line 169](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ContactSection.tsx#L169) |
| Contact section | ✅ | Full contact form with Formspree integration, plus WhatsApp, email, social links |

**Issues:**

1. **No LinkedIn profile** — A critical professional network for developers is completely absent. GitHub, Instagram, X/Twitter, and WhatsApp are present but no LinkedIn.

2. **Real name not prominent** — "Pamuda Jayathilaka" appears in small text in the Navbar ([line 41](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Navbar.tsx#L41)), Footer ([line 18](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/Footer.tsx#L18)), and meta author — but never in a heading or the `<title>`. For name-based search queries (people googling your name), this weakens discoverability.

3. **No dedicated about page** — The StorySection covers bio content but isn't a standalone, indexable page.

4. **GitHub project links are placeholders** — All three project `githubUrl` values are just `"https://github.com"` ([ProjectsSection.tsx lines 50, 82, 100](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/components/ProjectsSection.tsx#L50)), not actual repository URLs. This hurts credibility and wastes a chance for relevant outbound links.

**Impact:** Moderate. The content quality is good with natural keyword usage, but the missing LinkedIn, placeholder GitHub links, and lack of per-project pages significantly limit the site's ability to rank for specific project or skill-based queries.

---

### 12. Vercel Deployment Configuration

**Files checked:** Root directory scan

**Current state:**

- ❌ **No `vercel.json` exists** — Checked root directory listing
- ❌ **No `netlify.toml` exists**
- ❌ **No `.htaccess` exists**
- ❌ **No `_headers` file exists**

**Issues:**

1. **No cache headers** for static assets — Without `vercel.json`, immutable assets in `/_astro/*` are served with default cache headers instead of `max-age=31536000, immutable`.

2. **No www → non-www redirect** — Could lead to duplicate content issues if both `www.arryz.dev` and `arryz.dev` serve the same content.

3. **No custom 404 configuration** — Combined with no `404.astro` page, broken URLs show the default Vercel 404.

4. **No security headers** — Missing `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Content-Security-Policy`.

5. **No trailing slash redirect** — Without `trailingSlash` in Astro config and no Vercel redirects, both `/` and trailing-slash variants may exist.

**Impact:** Low immediate SEO impact, but cache headers significantly affect repeat-visit performance and Core Web Vitals. Security headers are a Google ranking signal via HTTPS best practices.

---

## Critical Issues (Fix Immediately)

1. **🚨 Switch from `client:only="react"` to SSR** — The entire site content is invisible to search engine crawlers. Change `<App client:only="react" />` to `<App client:load />` in [index.astro line 7](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/pages/index.astro#L7), or refactor critical content (headings, text, links) into Astro templates and only hydrate interactive widgets.

2. **🚨 Create `og-image.png`** — The referenced OG image at `https://arryz.dev/og-image.png` does not exist. Create a 1200×630px image and place it in `/public/og-image.png`.

3. **🚨 Add `site` property to `astro.config.mjs`** — Add `site: "https://arryz.dev"` to the Astro config. This unlocks sitemap generation, proper canonical URL resolution, and absolute URL construction.

4. **🚨 Install `@astrojs/sitemap` and create `robots.txt`** — These are baseline requirements for any production website.

5. **🚨 Add JSON-LD `Person` schema** — As a developer selling SEO services, the absence of structured data undermines credibility. At minimum, add Person schema with `name`, `jobTitle`, `url`, `sameAs`, and `email`.

---

## Quick Wins (Under 30 Minutes Each)

1. **Create `public/robots.txt`** — 2 minutes:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://arryz.dev/sitemap-index.xml
   ```

2. **Add `site` and `compressHTML` to astro.config.mjs** — 1 minute:
   ```js
   site: "https://arryz.dev",
   compressHTML: true,
   ```

3. **Install sitemap integration** — 5 minutes:
   ```bash
   npm install @astrojs/sitemap
   ```
   Then add `sitemap()` to the `integrations` array.

4. **Fix canonical URL to be dynamic** — 2 minutes:
   Change `<link rel="canonical" href={siteUrl} />` to `<link rel="canonical" href={Astro.url.href} />` in Layout.astro.

5. **Add `width` and `height` to hero image** — 5 minutes:
   Add explicit dimensions to prevent CLS.

6. **Create `public/og-image.png`** — 15 minutes:
   Design a 1200×630 branded social preview image.

7. **Fix GitHub project URLs** — 2 minutes:
   Replace placeholder `"https://github.com"` with actual repository URLs in ProjectsSection.tsx.

8. **Add LinkedIn social link** — 5 minutes:
   Add a LinkedIn icon and URL to the contact section.

9. **Uncomment `prefers-reduced-motion` CSS** — 1 minute:
   Remove the comment wrapping in [index.css lines 316-324](file:///e:/Academic/project/2026/Side%20Projects/ArryZpf/src/index.css#L316-L324).

10. **Trim meta description** to 155 characters — 2 minutes.

---

## What Is Already Good

- ✅ **Google Fonts setup is textbook** — `preconnect` to both origins, `display=swap` in the URL, modern variable-weight fonts (Figtree, Syne, JetBrains Mono)
- ✅ **Open Graph and Twitter Card tag coverage** — All required tags present with dynamic title/description props
- ✅ **Image format selection** — WebP used for photos, SVG for icons; modern and efficient
- ✅ **Meta robots correctly set to `index, follow`** — No accidental noindex
- ✅ **`aria-label` usage on icon-only buttons** — Social links, theme toggle, lightbox controls all have labels
- ✅ **Mobile performance optimizations in CSS and canvas** — Reduced blur, frame skipping, lower particle counts on mobile
- ✅ **Form accessibility** — Labels on all inputs, required attributes, disabled states
- ✅ **HTML `lang="en"` attribute** set correctly on `<html>` tag
- ✅ **Semantic `<header>`, `<nav>`, `<footer>`, `<section>` tags** exist in the React components (just need SSR to make them crawlable)

---

## Recommended Implementation Order

1. **Switch `client:only` to `client:load` (or refactor to Astro SSR)** — This single change fixes crawlability, heading hierarchy, semantic HTML, and internal link discoverability simultaneously. It is the highest-impact fix.

2. **Add `site` property and install `@astrojs/sitemap`** — Enables sitemap generation and proper canonical URLs.

3. **Create `robots.txt` in `/public`** — Takes 2 minutes and establishes the crawl contract.

4. **Create `og-image.png` (1200×630)** — Fixes broken social sharing previews.

5. **Add JSON-LD Person schema** — Establishes structured data foundation for rich results.

6. **Enable `compressHTML`** — Free performance improvement.

7. **Fix canonical URL to be dynamic** — Prevents future canonicalization issues.

8. **Add `width`/`height` to images and `loading="lazy"` to below-fold images** — Improves CLS and LCP scores.

9. **Replace `<button>` navigation with `<a href="#section">` links** — Makes internal navigation crawlable.

10. **Add LinkedIn link and fix placeholder GitHub URLs** — Improves professional credibility signals.

11. **Create `404.astro` page** — Catches lost visitors and maintains SEO equity.

12. **Add `vercel.json` with cache headers and security headers** — Performance and security hardening.

13. **Create individual project pages** — Long-term: enable each project to rank independently for specific keywords.

14. **Uncomment `prefers-reduced-motion`** — Accessibility and CWV improvement.

---

*End of audit. All findings are grounded in the actual source code examined. No changes were made to any files.*
