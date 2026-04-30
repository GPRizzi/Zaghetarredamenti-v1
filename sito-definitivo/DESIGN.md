---
version: alpha
name: Zaghet Arredamenti
description: |
  Azienda artigianale di arredamento su misura dal 1961, Orsago (TV).
  Il design si ispira al bigliettino da visita: sfondo scuro con pattern geometrico di linee metalliche incrociate.
  Estetica **luxury-artigianale**: il rigore del design italiano incontra il calore del legno e della tradizione.
  Canvas base **charcoal scuro** (#1A1A1A) con superfici bianche per il contenuto editoriale.
  L'unico colore accento e **Rosso Zaghet** (#C8102E) — usato con parsimonia su CTA, separatori e dettagli.
  Tipografia display **Sora** (geometrica, moderna) + body **DM Sans** (calda, leggibile).
  Il pattern geometrico (linee incrociate a 6 angoli) e la firma visiva dell'azienda, derivata dalla facciata del negozio.
  Ogni superficie deve comunicare: artigianalita, precisione, eleganza senza ostentazione.

colors:
  primary: "#C8102E"
  primary-dark: "#9E0C24"
  primary-soft: "rgba(200,16,46,0.08)"
  ink: "#FFFFFF"
  body: "#7A7A7A"
  body-strong: "#4A4A4A"
  body-on-light: "#2B2B2B"
  muted: "#999999"
  hairline: "#383838"
  hairline-on-light: "#EDEDED"
  canvas: "#1A1A1A"
  canvas-elevated: "#2B2B2B"
  canvas-light: "#FFFFFF"
  surface-warm: "#FAFAF8"
  surface-soft: "#F6F6F4"
  on-primary: "#FFFFFF"
  on-dark: "#FFFFFF"
  on-light: "#2B2B2B"

typography:
  display-hero:
    fontFamily: "'Sora', sans-serif"
    fontSize: "clamp(40px, 8vw, 72px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  display-xl:
    fontFamily: "'Sora', sans-serif"
    fontSize: "clamp(32px, 6vw, 56px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-lg:
    fontFamily: "'Sora', sans-serif"
    fontSize: "clamp(28px, 5vw, 44px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  section-tag:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.2em"
    textTransform: uppercase
    color: "{colors.primary}"
  body-lg:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 17px
    fontWeight: 300
    lineHeight: 1.8
    letterSpacing: 0
  body-md:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.75
  nav-link:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 13px
    fontWeight: 500
    letterSpacing: "0.06em"
    textTransform: uppercase
  button:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 13px
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: uppercase

spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  xxl: 100px
  section: 120px

rounded:
  sm: 12px
  md: 20px
  lg: 28px
  full: 9999px

visual-signatures:
  geometric-pattern: |
    Linee metalliche incrociate generate via JS Canvas.
    6 gruppi angolari (10deg, -12deg, 63deg, -60deg, 40deg, -38deg).
    3 spessori (thin, med, thick). Seeded random per determinismo.
    Usato su: hero (sfondo scuro con linee chiare), promise-bar, CTA, page-hero.
  wavy-edges: |
    Divisori SVG con curve di Bezier singole.
    Separano le sezioni con eleganza organica.
    viewBox 0 0 1440 30, responsive (30px → 40px → 50px).
  parallax-dividers: |
    Immagini full-width con position:fixed + clip-path:inset(0).
    Overlay scuro rgba(26,26,26,0.55). Funziona su iOS.
  scroll-reveal: |
    Elementi appaiono con translateY(32px) → 0, opacity 0 → 1.
    Staggered con delay incrementale. Anche reveal-left/right.

design-principles:
  - "Artigianalita visibile: ogni dettaglio deve sembrare fatto a mano con cura"
  - "Rosso come accento, mai come dominante: e il filo rosso che lega tutto"
  - "Spazio generoso: il vuoto comunica lusso e respiro"
  - "Fotografia protagonista: le immagini dei mobili devono dominare"
  - "Pattern geometrico come firma: lega il digitale alla facciata fisica"
  - "Nessun dato inventato: tutto cio che non e verificato va come [da confermare]"
---
