# Atelier du Climat — V2

Site vitrine React + Vite pour Atelier du Climat. Cette V2 renforce l’expérience avec une navigation plus interactive, une présentation détaillée des prestations, une section savoir-faire, un parcours client en cinq étapes, une FAQ et une fin de page orientée prise de contact.

## Démarrer en local

Prérequis : Node.js 20 ou supérieur.

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit le projet et tente de le publier automatiquement à chaque push sur `main`.

**Activation initiale requise :** ouvrir [Settings → Pages](https://github.com/AlexandreTorre2511/Atelier-du-Climat/settings/pages), puis choisir **GitHub Actions** comme source dans *Build and deployment*. L'intégration GitHub peut pousser le code et lancer les builds, mais ne dispose pas de l'autorisation nécessaire pour activer elle-même Pages sur ce dépôt.

- Actions : https://github.com/AlexandreTorre2511/Atelier-du-Climat/actions
- Site en ligne : https://atelierduclimat06.fr/ (hébergé sur Netlify)

## Avant publication commerciale

- Remplacer le numéro de démonstration `06 12 34 56 78` et confirmer l'adresse e-mail.
- Vérifier les marques et références de produits avec les modèles réellement proposés.
- Les témoignages sont des emplacements de démonstration : ajouter uniquement des avis authentiques et autorisés.
- Les visuels des projets sont des images d'illustration, pas un portfolio de chantiers réalisés. Remplacer par des photos de réalisations réelles.
- Le formulaire est une interface front-end de démonstration. Il doit être relié à une boîte mail, une API ou un CRM pour recevoir réellement les demandes.
- Ajouter les mentions légales, la politique de confidentialité et les informations d'entreprise exactes.

## Structure

- `src/main.jsx` : composants React, interactions, sections et formulaire.
- `src/style.css` : identité visuelle, responsive design et animations.
- `public/logo.svg` : logo vectoriel.
- `index.html` : document HTML et métadonnées SEO / partage.
- `.github/workflows/deploy.yml` : build et déploiement GitHub Pages.
