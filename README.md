# ATELIER DU CLIMAT — site vitrine

Climatisation • Pompes à chaleur • Ventilation — Alpes-Maritimes.

Site vitrine statique : HTML, CSS et JavaScript sans framework ni dépendance.
Les pages sont dans [`site/`](site/).

## Aperçu en ligne — Cloudflare Pages

L'aperçu est publié par **Cloudflare Pages**, qui accepte les dépôts privés
sans frais et republie à chaque push sur `main`.

Adresse une fois le projet créé : `https://atelier-du-climat.pages.dev`

### Création du projet, une seule fois

Dans le tableau de bord Cloudflare, *Workers & Pages → Create → Pages →
Connect to Git*, choisir ce dépôt, puis :

| Réglage | Valeur |
|---|---|
| Nom du projet | `atelier-du-climat` — doit être identique au `name` de [`wrangler.toml`](wrangler.toml) |
| Branche de production | `main` |
| Preset de framework | *None* |
| Commande de build | `exit 0` — rien à construire |
| Dossier de sortie | `site` |

[`wrangler.toml`](wrangler.toml) reprend ces réglages et les versionne.
Dès qu'il existe, Cloudflare s'y fie et ignore ce qui est saisi dans
l'interface : les deux doivent donc rester cohérents, le nom du projet
en particulier.

Chaque branche autre que `main` reçoit sa propre adresse de prévisualisation,
pratique pour faire relire un changement avant de le fusionner.

### GitHub Pages, en veille

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) sait aussi
publier le site, à l'adresse `https://alexandretorre2511.github.io/Atelier-du-Climat/`.

Il reste **en sommeil tant que le dépôt est privé** : GitHub Pages ne publie
les dépôts privés que sur les offres payantes, et un workflow qui s'exécuterait
quand même enverrait un mail d'échec à chaque push. Le travail est donc ignoré,
pas échoué.

Il se déclenchera de lui-même si le dépôt passe en public — il faudra alors
choisir **Source : GitHub Actions** dans *Settings → Pages*. On peut aussi le
lancer à la main depuis l'onglet *Actions*, auquel cas la condition est
contournée.

### Ce qui ne marche pas sur cet aperçu

Les formulaires reposent sur des fonctions Netlify, absentes de Cloudflare
Pages. Le formulaire de contact et la fenêtre d'estimation affichent donc
leur message de repli, avec le téléphone et WhatsApp. C'est le comportement
voulu : aucune demande n'est perdue en silence.

Tout le reste — navigation, estimateur de budget, galerie, pages villes,
blog — fonctionne à l'identique.

## Voir le site en local

Depuis la racine du dépôt :

```bash
cd site && python3 -m http.server 8788
```

Puis ouvrir http://127.0.0.1:8788.

## Mise en production

L'hébergement de production est Netlify, configuré par
[`netlify.toml`](netlify.toml) : il publie `site/` et les fonctions d'envoi
d'email de `site/netlify/functions/`.

Deux variables d'environnement sont à définir dans Netlify :

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | **Obligatoire.** Sans elle, aucune demande de devis n'est envoyée. |
| `MAIL_FROM` | Expéditeur, sur un domaine vérifié chez Resend. À défaut, l'adresse de test `onboarding@resend.dev` est utilisée. |

La mesure d'audience passe par Cloudflare Web Analytics : coller le token
dans `CF_ANALYTICS_TOKEN`, en haut de
[`site/assets/js/main.js`](site/assets/js/main.js). Tant qu'il est vide,
rien n'est chargé et rien n'est mesuré.

## Règles du projet

Les contraintes de contenu, de SEO et de code sont dans
[`CLAUDE.md`](CLAUDE.md). La principale : **ne rien écrire qui ne puisse
être prouvé** — pas de chiffre, de délai, de certification ni d'avis client
inventé.
