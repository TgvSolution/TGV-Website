# ADR-0001 : Stack motion pour TGV-Website

**Date** : 2026-05-28
**Statut** : Proposé
**Décideur** : architect (validation propriétaire requise)

## Contexte

Le propriétaire du site `artifacts/tgv-website/` souhaite augmenter la richesse
visuelle du site (séquences de mouvement, scroll-telling, esthétique "tech moderne"
type Linear/Vercel/Stripe), tout en restant aligné avec la direction esthétique
"Dark Prestige — cinematic black/gold luxury IT consultancy" déjà actée
(cf. `replit.md`).

État existant :
- `framer-motion@^12.23.24` est déjà installé via catalog pnpm.
- Le site consomme déjà framer-motion (`useScroll`, `useTransform`, `useInView`,
  variants staggered) dans `src/pages/Home.tsx` et `src/components/ContactForm.tsx`.
- Les 4 mockups validés dans `artifacts/mockup-sandbox/` utilisent exclusivement
  framer-motion.
- Aucune autre lib motion n'est présente.
- Site mono-route (wouter, `<Route path="/">`), SPA, pas de SSR.

Contraintes :
- TypeScript strict.
- Pas de duplication de capabilities entre libs.
- Respect de `prefers-reduced-motion`.
- Budget bundle conservateur (site en prod).
- Cohérence avec la direction esthétique existante (luxe discret, pas portfolio créatif).

## Décision

Adopter une stack motion à **deux couches**, plus un composant Canvas custom :

1. **Couche principale — framer-motion v12** : tous les reveals au scroll, les
   micro-interactions (hover/tap), les `AnimatePresence`, les staggered grids,
   les parallax simples via `useScroll`/`useTransform`, et les count-ups.
2. **Couche scroll-telling avancé — GSAP 3.13+ ScrollTrigger** (imports modulaires,
   licence MIT depuis nov 2024) : strictement pour le pinning de section, le
   scrubbing multi-tween, et les séquences scroll-driven complexes. Wrapper React
   dédié (`useGsapScrollTrigger`) avec cleanup et `gsap.matchMedia()` pour
   reduced-motion + breakpoints.
3. **Background animé du hero — Canvas 2D vanilla** (`requestAnimationFrame`,
   ~50-80 particules dorées) : composant `<HeroBackdrop />` autonome, < 5 KB,
   désactivé sous `prefers-reduced-motion` et fallback gradient CSS sur mobile
   bas de gamme.

Wrapper global `<MotionConfig reducedMotion="user">` dans `App.tsx`.

## Options considérées

**A. framer-motion seul (status quo enrichi)**
- Avantages : zéro nouvelle dépendance, lib déjà maîtrisée, accessibilité par
  défaut. Suffit pour 80% des besoins identifiés.
- Inconvénients : `useScroll` ne gère pas le pinning de section ni les
  timelines scrub complexes. Limite l'ambition scroll-telling Phase 2.
- Rejetée car insuffisante pour les sections "Products" en pinning souhaitées.

**B. framer-motion + GSAP ScrollTrigger (retenue)**
- Avantages : chaque lib sur son terrain de force ; GSAP MIT depuis 2024 ;
  ~30 KB gzipped ajoutés ; compatible SPA sans friction ; types corrects ;
  `matchMedia` natif côté GSAP pour reduced-motion et breakpoints.
- Inconvénients : deux APIs d'animation à connaître pour l'équipe ; risque
  léger de mélange (à mitiger par règle "GSAP UNIQUEMENT pour scroll
  orchestration multi-tween, JAMAIS pour des reveals simples").

**C. framer-motion + R3F/Three.js + Spline/Lottie + Lenis (full stack moderne)**
- Avantages : tout le toolkit "wow factor" disponible.
- Inconvénients : ~600 KB+ bundle additionnel ; scroll-hijacking de Lenis
  contredit le principe de scroll natif (`modern-web-design` skill, Pitfall 6) ;
  aucun cas d'usage métier ne justifie la 3D WebGL aujourd'hui ; over-engineering ;
  risque d'incohérence esthétique (cursors custom, fonds 3D = code agence créative,
  pas luxe IT).
- Rejetée : ROI esthétique × effort technique défavorable.

## Conséquences

**Positives**
- Phase 1 livrable en 1 jour developer sans nouvelle dépendance.
- Phase 2 ajoute une seule nouvelle dépendance (`gsap`) — risque de dette
  technique très contrôlé.
- Architecture restable : si un jour la 3D devient justifiée (configurateur produit),
  R3F peut être ajouté ponctuellement sans remettre en cause le reste.
- Accessibilité gérée à deux endroits seulement (`MotionConfig` + `gsap.matchMedia`).

**Contraintes pour les autres agents**
- `developer` : la règle "GSAP uniquement pour pinning/scrub multi-tween, framer-motion
  pour tout le reste" doit être respectée. Créer le hook `useGsapScrollTrigger`
  avant toute utilisation directe de GSAP dans un composant.
- `developer` : tout nouveau composant qui anime DOIT respecter `prefers-reduced-motion`
  (framer-motion l'a par défaut via `MotionConfig`, GSAP nécessite `matchMedia`).
- `developer` : imports GSAP TOUJOURS modulaires (`import gsap from "gsap"` +
  `import { ScrollTrigger } from "gsap/ScrollTrigger"`), JAMAIS le bundle global.
- `code-reviewer` : refuser toute PR qui ajoute `react-spring`, `anime.js`,
  `motion-one`, AOS, Lenis, Locomotive, Barba sans nouvel ADR de révision.
- `devops` : surveiller le bundle size en CI après Phase 2 (cible : ne pas dépasser
  +50 KB gzipped vs baseline actuelle).

**Risques résiduels**
- Si l'équipe grandit et que GSAP est mal utilisé (timeline globales partagées,
  cleanup oublié), des fuites mémoire sont possibles. Le hook centralisé limite
  ce risque.
- Le Canvas 2D du hero ajoute un loop `requestAnimationFrame` permanent ; à
  pause-er via `IntersectionObserver` quand le hero sort du viewport.

**Réversibilité**
- Phase 1 : 100% réversible (modifications framer-motion uniquement).
- Phase 2 : retrait de GSAP possible en remplaçant les 2-3 sections par des
  reveals framer-motion plus simples (perte d'effet, pas de casse).
- Phase 3 : non engagée à ce stade.

## Suivi

- Re-validation de cet ADR après Phase 2 livrée (mesure Lighthouse mobile + CLS).
- Si Phase 3 est lancée, créer ADR-0002 pour formaliser le choix de Lottie/SVG
  morphing pour la signature au load.
