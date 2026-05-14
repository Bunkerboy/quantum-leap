# Quantum Leap — quantum-leap.be

## Over dit project

Statische website voor Quantum Leap, digitaal agency in Hasselt. Gehost op Vercel. Geen build tool, geen framework — puur HTML + CSS.

## Structuur

```
/
├── index.html                    ← Homepage (inline CSS)
├── style.css                     ← Gedeelde CSS voor alle subpagina's
├── vercel.json                   ← Redirects + headers
├── TEMPLATE-problem-solver.html  ← Template voor problem-solver posts
├── webdesign-hasselt/index.html  ← Dienstenpagina
├── seo-hasselt/index.html
├── wordpress-hasselt/index.html
├── ai-toepassingen/index.html
├── hosting/index.html
├── grafisch-ontwerp/index.html
├── email-marketing/index.html
├── blog/index.html               ← Blog overzicht (listing)
├── blog/[slug]/index.html        ← Individuele blogposts
├── portfolio/index.html
├── cases/index.html
└── contact/index.html
```

## Huisstijl

- **Achtergrond:** donker navy (#0a0a20 → #10102e → #181848)
- **Groene accent:** #22c55e (primair), #4ade80 (licht)
- **Paarse accent:** #a78bfa (secundair, decoratief)
- **Tekst:** #e4e4f0, muted: rgba(228,228,240,.5)
- **Fonts:** Outfit (body), Bebas Neue (display/cijfers), JetBrains Mono (labels/code)
- **Decoratie:** gradient orbs, dot grids, watermark tekst, groene glow op buttons

## CSS variabelen

```css
--n1:#0a0a20  --n2:#10102e  --n3:#181848  --n4:#222260
--g:#22c55e   --gl:#4ade80  --gd:#16a34a
--pp:#a78bfa  --ppl:#c4b5fd
--tx:#e4e4f0  --txm:rgba(228,228,240,.5)
--bd:rgba(255,255,255,.06)
--f:'Outfit'  --fd:'Bebas Neue'  --fm:'JetBrains Mono'
```

## Navigatie (kopieer exact)

```html
<nav><a href="/" class="nl"><img src="https://quantum-leap.be/wp-content/uploads/2014/02/quantumleaplogosite.png" alt="Quantum Leap"/></a><ul class="nk"><li><a href="/webdesign-hasselt/">Webdesign</a></li><li><a href="/seo-hasselt/">SEO</a></li><li><a href="/ai-toepassingen/">AI</a></li><li><a href="/portfolio/">Portfolio</a></li><li><a href="/cases/">Cases</a></li><li><a href="/blog/">Blog</a></li></ul><a href="/contact/" class="nc">Contacteer ons</a></nav>
```

## Footer (kopieer exact)

```html
<footer><div class="fi"><div class="fc"><img src="https://quantum-leap.be/wp-content/uploads/2014/02/quantumleaplogosite.png" alt="Quantum Leap" style="height:28px;margin-bottom:.6rem;opacity:.7"/><p>Uw internetidentiteit laten werken voor u.</p></div><div class="fc"><h4>Diensten</h4><a href="/webdesign-hasselt/">Webdesign Hasselt</a><a href="/seo-hasselt/">SEO Hasselt</a><a href="/wordpress-hasselt/">WordPress</a><a href="/hosting/">Hosting</a></div><div class="fc"><h4>Info</h4><a href="/blog/">Blog</a><a href="/portfolio/">Portfolio</a><a href="/cases/">Case studies</a><a href="/contact/">Contact</a></div></div><div class="fb"><span>© 2026 Quantum Leap — Hasselt</span><span>FB · LI</span></div></footer>
```

## Problem Solver posts

Problem-solver blogposts gebruiken een specifiek format met deze CSS-klassen (staan in style.css):

### Quick Fix Box (bovenaan elke post)

```html
<div class="fix-hero">
  <div class="fix-problem">
    <div class="icon">🔴</div>
    <div>
      <h2>Het probleem in één zin</h2>
      <p>Wanneer dit voorkomt</p>
    </div>
  </div>
  <div class="fix-grid">
    <div class="fix-cause">
      <span class="fix-label">// Oorzaak</span>
      <p>Wat het veroorzaakt</p>
    </div>
    <div class="fix-solution">
      <span class="fix-label">// Oplossing</span>
      <p>De snelle fix. Gebruik <code>code</code> voor commando's.</p>
    </div>
  </div>
  <div class="fix-footer">
    <span class="fix-time">⏱ Zelf opgelost in ~X minuten</span>
    <a href="/contact/" class="fix-cta">Geen zin? Wij fixen het voor €XX →</a>
  </div>
</div>
```

### Stappen

```html
<div class="fix-steps">
  <div class="fix-step">
    <div class="fix-step-num">1</div>
    <div>
      <h3>Stap titel</h3>
      <p>Instructie. <code>commando</code></p>
    </div>
  </div>
  <!-- meer stappen -->
</div>
```

### Waarschuwing (optioneel)

```html
<div class="fix-warning">
  <span>⚠️</span>
  <p><strong>Let op:</strong> Waarschuwingstekst.</p>
</div>
```

### Volledige pagina-structuur

Elke problem-solver post volgt dit stramien:

1. `<head>` met title, meta description, canonical, OG tags, Article schema, fonts, `/style.css`
2. Nav (exact zoals hierboven)
3. `page-hero` met watermark "FIX", orbs, breadcrumb, `<p class="lb">`, `<h1>`, datum
4. `fix-hero` box (probleem/oorzaak/oplossing)
5. `fix-steps` (stap-voor-stap)
6. `fix-warning` (optioneel)
7. "Wanneer professional inschakelen" sectie
8. `cta-inline` met link naar /contact/
9. `related` cards (3 gerelateerde guides/diensten)
10. Author box (Kristof Loyens)
11. "Terug naar blog" link
12. Footer (exact zoals hierboven)

### Na het aanmaken van een post: update blog/index.html

Voeg een nieuw `<a class="blog-list-item">` blok toe **bovenaan** de `<div class="blog-list">` in `blog/index.html`.

Format:
```html
<a href="/blog/[SLUG]/" class="blog-list-item">
  <div class="blog-list-img" style="background:linear-gradient(135deg,var(--n3),var(--n2));display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.3rem"><span style="font-size:2.2rem">[EMOJI]</span><span style="font-family:var(--fm);font-size:.6rem;color:var(--txm)">[KORT LABEL]</span></div>
  <div class="blog-list-body"><span class="b-cat">[CATEGORIE]</span><h3>[TITEL]</h3><p>[KORTE BESCHRIJVING]</p><span class="meta">[DATUM] — Kristof Loyens · Nieuw</span></div>
</a>
```

## Interne links

Gebruik altijd relevante interne links in de content:
- /webdesign-hasselt/ — webdesign gerelateerd
- /seo-hasselt/ — SEO gerelateerd
- /wordpress-hasselt/ — WordPress gerelateerd
- /hosting/ — hosting/server gerelateerd
- /ai-toepassingen/ — AI gerelateerd
- /blog/http-error-500/ — server errors
- /blog/wordpress-website-sneller-maken/ — performance
- /blog/wordpress-wit-scherm/ — WordPress problemen
- /contact/ — CTA's

Link style: `<a href="/pad/" style="color:var(--g)">linktekst</a>`

## GDPR/Security regels

NOOIT in blogposts of cases:
- Echte GTM container IDs
- Plugin-namen of theme-namen van klanten
- Database-details of bestandsgrootten van klant-data
- Server environment variables
- Bestandspaden met versienummers
- Ad-netwerk namen van klanten
- IP-adressen of credentials

Gebruik generieke termen: "een plugin-conflict", "het advertentienetwerk", "render-blocking scripts".

## Taal

Schrijf in het Nederlands (Belgisch). Toon: professioneel maar toegankelijk, concreet, geen wollige intro's. De oplossing moet in de eerste 10 seconden zichtbaar zijn.
