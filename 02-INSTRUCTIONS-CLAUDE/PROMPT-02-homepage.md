# PROMPT 02 — Page d'accueil

---

Phase 2 : la page d'accueil (`site/index.html`).

C'est la page la plus importante. Structure imposée, dans cet ordre exact
(chaque bloc répond à une question que le visiteur se pose, dans l'ordre où il se la pose) :

| # | Bloc | Question du visiteur |
|---|---|---|
| 1 | Bandeau promo + compte à rebours *(seulement si vraie offre limitée)* | « Il y a urgence ? » |
| 2 | Navbar : logo, menus déroulants, téléphone cliquable, bouton {{MOT_CONVERSION}} | « Je peux les joindre ? » |
| 3 | **Hero** : accroche en 2 lignes + sous-titre + 2 boutons, sur photo plein écran | « Je suis au bon endroit ? » |
| 4 | **Bandeau de chiffres** (4 chiffres animés) — uniquement du vérifiable | « Ils sont sérieux ? » |
| 5 | Bandeau ville rotative — « En ce moment à {{VILLE}}… » | « Ils viennent chez moi ? » |
| 6 | **Les 3 offres** en cartes, avec prix, celle du milieu mise en avant | « Combien ça coûte ? » |
| 7 | **Calculateur de prix** — 1 question, 3 prix instantanés | « Combien pour MOI ? » |
| 8 | **Pourquoi nous** — 4 à 6 arguments, en répondant aux objections du BRIEF | « Pourquoi eux ? » |
| 9 | **Le déroulé** en 4 étapes, de la demande à la réalisation | « Comment ça se passe ? » |
| 10 | **Réalisations** — 4 à 6 photos de vrais chantiers | « Ils savent faire ? » |
| 11 | **Zone couverte** — toutes les villes en pastilles cliquables vers les pages villes | « Ils couvrent ma ville ? » |
| 12 | **Avis clients** — uniquement de vrais avis du BRIEF | « D'autres leur ont fait confiance ? » |
| 13 | **Bandeau CTA** pleine largeur | « OK, je fais quoi ? » |
| 14 | Footer : 4 colonnes, tous les liens, réseaux sociaux, légal | |
| 15 | WhatsApp flottant + bandeau cookies + popup email (sortie de page) | |

Règles d'écriture pour cette page :
- L'accroche du hero parle du **résultat pour le client**, pas de l'entreprise.
  Format qui marche : un bénéfice + une levée d'objection. (Ex : « L'air frais, à prix juste. »)
- Pas de « Bienvenue sur notre site », pas de « Nous sommes une entreprise dynamique ».
- Chaque argument de la section « Pourquoi nous » doit démonter une objection réelle de mon BRIEF.
- Les 4 chiffres du bandeau : si je n'en ai pas 4 de vérifiables, mets-en 2 ou 3.
  **Ne gonfle rien.**

Technique :
- Le `<head>` complet selon `SNIPPETS.md` (snippet 1) + JSON-LD `LocalBusiness` (snippet 2)
- `.reveal` sur chaque section
- Les 3 premiers blocs du hero avec `.anim-fade-up` + `.anim-delay-1/2/3`
- Adapte `assets/js/social-proof.js` : ma question de calculateur, mes 3 options,
  mes 9 prix, mes villes
- Laisse `SP_ENABLED = false` (les fausses notifications) — on en reparlera

Quand c'est fini, ouvre la page dans mon navigateur et dis-moi **précisément quelles
photos il me manque**, avec le cadrage attendu pour chacune.
