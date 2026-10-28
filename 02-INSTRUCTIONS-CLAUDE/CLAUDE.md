# CLAUDE.md — Règles du projet

> Ce fichier doit être placé **à la racine du dossier du projet**.
> Claude Code le lit automatiquement à chaque session : les règles ci-dessous
> s'appliquent sans avoir à les répéter.

---

## Le projet

Site vitrine local pour **{{NOM_ENTREPRISE}}**, {{METIER}} à {{VILLE_PRINCIPALE}}.
Objectif unique : **faire entrer des demandes de {{MOT_CONVERSION}}** depuis Google
(recherche locale) et depuis la publicité.

Ce n'est pas un site de présentation. C'est une machine à leads.
Chaque page a une seule mission : amener le visiteur à remplir le formulaire,
appeler, ou écrire sur WhatsApp.

## Stack — à ne pas changer

- **HTML statique** — un fichier `.html` par page, pas de framework, pas de build
- **CSS unique** — `assets/css/style.css`, variables CSS dans `:root`
- **JS vanilla** — `assets/js/*.js`, aucune dépendance npm
- **Netlify** — hébergement + Netlify Functions pour l'envoi d'email
- **Resend** — envoi des emails de formulaire

**Pourquoi ce choix :** site instantané (aucun JS de framework à charger),
indexation Google immédiate, zéro maintenance, zéro coût, et surtout : chaque page
est un fichier lisible et modifiable à la main pendant des années. Pas de dette technique.

❌ Ne jamais proposer React, Next.js, Vue, Tailwind, WordPress, un CMS ou un bundler.
❌ Ne jamais installer de dépendance npm.
❌ Ne jamais mettre de CSS dans les fichiers HTML (sauf micro-ajustement ponctuel inline).

## Règles de contenu — NON NÉGOCIABLES

Avant d'écrire **le moindre chiffre, délai, certification ou avis client**, appliquer ce test :

1. **Est-ce dans le BRIEF ?** Si non → ne pas l'écrire. Demander.
2. **Le client peut-il le prouver si on lui demande ?** Si non → ne pas l'écrire.
3. **Est-ce que je l'ai inventé parce que « ça sonne bien » ?** → le supprimer.

Concrètement, **interdit** sauf si fourni explicitement dans le BRIEF :
- un nombre de clients, de chantiers, d'années d'expérience
- une note ou un nombre d'avis
- « N°1 », « le meilleur », « leader », « certifié » , « agréé »
- un avis client (même « inspiré » d'un vrai)
- un délai d'intervention ou une garantie
- un logo de marque ou de label

**À la place d'un chiffre inventé**, écrire un bénéfice qualitatif vrai :
« Devis clair, sans surprise » plutôt que « 500 clients satisfaits ».

Si une information manque pour écrire une section : **laisser `{{À COMPLÉTER : …}}` bien visible
dans le HTML et le signaler à la fin**, plutôt que de combler avec du plausible.

## Règles SEO — appliquées sur CHAQUE page

Une page = un mot-clé principal = une intention de recherche. Jamais deux.

Sur chaque page, sans exception :
- `<title>` 55-60 caractères, mot-clé en premier
- `<meta name="description">` 150-160 caractères, finit par un bénéfice
- `<link rel="canonical">` avec l'URL absolue de la page
- balises `og:` (title, description, image, url, type, site_name)
- JSON-LD `LocalBusiness` (identique partout, voir `SNIPPETS.md`)
- **un seul `<h1>`**, contenant le mot-clé
- `alt` descriptif sur chaque image (pas « image1 »)
- nom de fichier en minuscules, avec des tirets, sans accent

Sur les pages villes et les pages offres, **en plus** : JSON-LD `FAQPage`,
dont les questions/réponses sont **exactement** le texte affiché sur la page.

Après chaque page créée, mettre à jour **les deux** :
1. `sitemap.xml` → une nouvelle ligne `<url>`
2. `assets/js/nav.js` → une nouvelle entrée dans le tableau `PAGES`

## Règles de conversion — sur chaque page

- Un bouton d'action **visible sans scroller** (dans le hero)
- Le téléphone **cliquable** (`tel:`) dans la navbar, en permanence
- Le bouton WhatsApp flottant présent partout
- Un bandeau d'appel à l'action **avant le footer**, sur toutes les pages
- Les prix affichés le plus tôt possible (c'est la 1ʳᵉ question du visiteur)
- Jamais plus de 2 scrolls sans un point de contact possible
- Mobile d'abord : 70-80 % du trafic local vient du téléphone

## Règles de code

- Classes CSS : convention BEM (`.bloc__element--variante`), comme l'existant
- Réutiliser **les classes qui existent déjà** dans `style.css` avant d'en créer
- Ajouter `.reveal` sur chaque bloc de contenu (apparition au scroll)
- Les couleurs passent **toujours** par les variables (`var(--brand)`), jamais en dur
- Dans `/blog/`, tous les chemins relatifs prennent `../`
- Pas de commentaire qui décrit l'évidence ; un commentaire pour les blocs à personnaliser

## Méthode de travail

1. **Une phase à la fois.** Finir, montrer, attendre la validation, passer à la suite.
2. **Jamais de refonte spontanée** d'une page déjà validée.
3. À la fin de chaque phase : dire en 3 lignes ce qui a été fait, ce qui reste à fournir
   (photos, chiffres, textes manquants), et quelle est la phase suivante.
4. Si une décision change la structure du site → poser la question avant d'agir.
5. Avant de déclarer une page terminée, vérifier dans le fichier : un seul `<h1>`,
   canonical présent, JSON-LD valide, tous les liens pointent vers des fichiers existants.

## Variables du projet

À remplir une fois, au démarrage, et à utiliser partout ensuite :

```
NOM_ENTREPRISE   =
METIER           =
MOT_CONVERSION   =   (devis / rendez-vous / consultation / réservation / estimation)
DOMAINE          =
EMAIL_PRO        =
TEL_AFFICHE      =
TEL_INTERNATIONAL=
WHATSAPP         =
VILLE_PRINCIPALE =
VILLES           =
DEPARTEMENT      =
COULEUR_FONCEE   =
COULEUR_ACCENT   =
TYPE_SCHEMA      =
DELAI_REPONSE    =
GA4_ID           =
```
