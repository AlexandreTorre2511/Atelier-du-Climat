# Audit du template — 28 octobre 2026

État du dossier `site/` avant remplissage du brief. Deux parties : ce que j'ai
corrigé, et ce qui attend une décision de ta part.

---

## 1. Corrigé

### Le calculateur de prix ne répondait à aucun clic

`index.html` appelait `calcSelect('pieces', n)`, alors que la fonction dans
`assets/js/social-proof.js` commence par `if (step !== 'choix') return;`.
Les trois boutons ne déclenchaient rien. L'état « sélectionné » cherchait en plus
`[data-choix]` quand le HTML écrivait `data-pieces`.

Corrigé dans `site/index.html:402-412`. Vérifié dans le navigateur : au clic sur
« 2 pièces », les trois prix s'affichent avec le badge « Le + demandé ».

### Un remplacer-tout du kit avait écrasé des vraies valeurs

Le kit a remplacé `06` (le département) par `{{DEPARTEMENT_NUM}}` partout, y
compris là où `06` n'était pas un département. 11 occurrences réparées :

| Où | Avant | Rétabli |
|---|---|---|
| Path SVG icône TikTok (5 fichiers) | `.{{DEPARTEMENT_NUM}}-3.57`, `-1.{{DEPARTEMENT_NUM}}.1-1.79` | `.06-3.57`, `-1.06.1-1.79` |
| Path SVG icône wifi, `offre-template.html:110` | `011.{{DEPARTEMENT_NUM}} 0z` | `011.06 0z` |
| Ombre CSS (4 fichiers) | `rgba(0,0,0,0.{{DEPARTEMENT_NUM}})` | `rgba(0,0,0,0.06)` |
| Placeholder du champ téléphone, `contact.html:313` | `{{DEPARTEMENT_NUM}} XX XX XX XX` | `06 XX XX XX XX` |

Sans ça, les icônes se seraient déformées et l'ombre aurait disparu pour tout
département autre que le 06.

### `sitemap.xml` n'existait pas

`robots.txt` l'annonce pourtant (`Sitemap: https://{{DOMAINE}}/sitemap.xml`) :
les robots tombaient sur un 404. Créé avec les 4 pages indexables qui existent
aujourd'hui. À compléter d'une ligne `<url>` par page offre, ville et article.

### Le modèle d'article de blog n'avait pas de canonical

Ajouté, plus `og:type`, `og:image`, `og:url` et `og:site_name`
(`site/blog/article-comparatif-template.html`). Le `{{SLUG_ARTICLE}}` est à
changer à chaque duplication, en même temps que le nom du fichier.

---

## 2. Vérifié, rien à faire

- **JSON-LD** : `{{LAT}}` et `{{LON}}` ne sont pas entre guillemets, donc le bloc
  ne se parse pas en JSON pour l'instant. C'est normal — ce sont des nombres une
  fois remplacés. Pas un défaut.
- **Pages légales sans canonical ni og** : `mentions-legales.html` et
  `politique-confidentialite.html` portent `<meta name="robots" content="noindex">`.
  Le kit les a volontairement sorties de l'index ; elles n'ont pas besoin de ces
  balises, malgré la règle « sur chaque page, sans exception » du CLAUDE.md.
- **Scripts de preuve sociale** : les notifications « X vient de demander un
  devis » sont désactivées par défaut, `SHOW_OLD_PRICE = false`, et le compte à
  rebours se supprime vraiment à l'échéance. Le kit est propre là-dessus.

---

## 3. À décider — affirmations invérifiables dans le template

Tout ce qui suit est du contenu d'exemple d'une entreprise de climatisation.
Chaque ligne est soit **vraie chez toi** (tu me le confirmes, je la garde), soit
**à supprimer**. Rien ne peut rester par défaut.

### Chiffres présentés comme des faits

| Affirmation | Où |
|---|---|
| « 500+ Installations réalisées » | `index.html:166` |
| « 100% Clients satisfaits » | `index.html:177` |
| « Plus de 300 familles nous font confiance » + 5 étoiles | `blog.html:394` |
| « N°1 de la {{Service}} sur la {{ZONE}} » | `index.html:140` |
| « Leader mondial n°1 » | `blog/article-comparatif-template.html:132` |

### Neuf avis clients inventés

`index.html` contient 9 cartes d'avis avec prénom, ville et 5 étoiles. Six
affichent **« — Google »** comme source. Si ces avis ne sont pas sur ta fiche
Google, c'est le point le plus risqué du site : un prospect peut vérifier en
dix secondes.

Il me faut soit de vrais avis (prénom, ville, texte, avec leur accord), soit je
supprime le bloc.

### Délais et garanties

62 occurrences de « 24h » ou « 48h » dans les pages : « Réponse sous 24h
garantie », « Installation en 48h », « Pose en 24h ». Plus les garanties
annoncées : 2 ans, 3 ans, 5 ans (`index.html:239`, `:289`, `:338`).

Ce sont des engagements contractuels. Je ne garde que ceux que tu tiens vraiment.

### Certifications

`page-autorite-template.html` est entièrement bâtie sur RGE, attestation F-Gaz,
Qualibat, Qualit'EnR, CAPEB. « Techniciens certifiés » revient aussi dans
`index.html:451`, `ville-template.html:157` et `:219`.

Si tu n'as pas ces qualifications, cette page est à refaire sur un autre sujet
d'autorité de ton métier (aides, normes, garanties légales…).

### Offre de lancement et compte à rebours

`index.html:356` annonce « Offre de lancement — 2 semaines seulement » et
« Jusqu'à 1 000 € d'économie ». `promo.js` attend une vraie date de fin dans
`{{DATE_FIN_OFFRE}}` — tant qu'elle est vide, le bandeau affiche « NaN » en haut
de page.

Soit tu as une offre réelle avec une date réelle, soit je supprime le bandeau,
la section et le script.

---

## 4. Reste à faire, hors contenu

- **3 liens morts** dans `blog.html` et le modèle d'article :
  `blog/mono-split-ou-bi-split.html`, `blog/gaz-r32-refrigerant-avenir.html`.
  Ils pointent vers des articles climatisation qui n'existent pas. Ils
  disparaîtront quand on écrira tes vrais articles.
- **20 images manquantes**, dont `daikin-modele-1---clean.png`,
  `bosch-modele-1---clean.png`, `oneclima-modele-4---clean.png`. Des noms de
  marques : à remplacer par tes photos, sauf si tu distribues réellement ces
  marques.
- **Titres et meta descriptions hors gabarit** : le CLAUDE.md demande 55-60
  caractères pour les `<title>` et 150-160 pour les descriptions. Aujourd'hui on
  est à 87 et 90 caractères sur l'accueil et les pages villes. La longueur
  bougera au remplacement des variables — à revérifier à ce moment-là.
- **`nav.js`** référence `offre-1.html`, `offre-2.html`, `offre-3.html` et les
  pages villes, qui n'existent pas encore. Normal : elles naissent de la
  duplication des modèles.
