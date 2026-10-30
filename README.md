# Site Climatisation — Alpes-Maritimes

Site vitrine statique : HTML, CSS et JavaScript sans framework ni dépendance.
Les pages sont dans [`site/`](site/).

## Aperçu en ligne

**https://alexandretorre2511.github.io/Climatisation/**

Publié automatiquement par GitHub Pages à chaque push sur `main`
(workflow : [`.github/workflows/pages.yml`](.github/workflows/pages.yml)).
L'avancement de la publication se suit dans l'onglet **Actions** du dépôt.

> **À activer une seule fois** : dans *Settings → Pages*, choisir
> **Source : GitHub Actions**. Sans cela le workflow échoue au dernier pas.

### Ce qui ne marche pas sur cet aperçu

Les formulaires reposent sur des fonctions Netlify, qui n'existent pas sur
GitHub Pages. Le formulaire de contact et la fenêtre d'estimation affichent
donc leur message de repli, avec le téléphone et WhatsApp. C'est le
comportement attendu : aucune demande n'est perdue en silence.

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
[`netlify.toml`](netlify.toml) : il publie `site/` et les fonctions
d'envoi d'email de `site/netlify/functions/`.

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
