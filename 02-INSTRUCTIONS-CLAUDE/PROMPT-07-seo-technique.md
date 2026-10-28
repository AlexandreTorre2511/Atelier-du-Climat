# PROMPT 07 — Audit SEO technique complet

---

Phase 7 : audit technique. Avant de publier, on vérifie **toutes** les pages, une par une.

Passe en revue chaque fichier `.html` du site et produis-moi un tableau :

| Page | Title (nb car.) | Meta desc (nb car.) | Canonical | OG | JSON-LD | Un seul H1 | Alt images | Problème |
|---|---|---|---|---|---|---|---|---|

Puis corrige tout ce qui ne va pas :

### À vérifier absolument
- [ ] `<title>` unique sur chaque page, 55-60 caractères. **Aucun doublon entre deux pages.**
- [ ] `<meta description>` unique, 150-160 caractères
- [ ] `<link rel="canonical">` en URL absolue, correspondant à la vraie URL du fichier
- [ ] Balises `og:` complètes, avec une `og:image` qui existe vraiment
- [ ] JSON-LD `LocalBusiness` identique sur toutes les pages
- [ ] JSON-LD `FAQPage` sur les pages villes et offres — **texte identique à l'affichage**
- [ ] Un seul `<h1>` par page, avec le mot-clé
- [ ] Hiérarchie `h1 → h2 → h3` respectée, sans saut de niveau
- [ ] `alt` descriptif sur **toutes** les images
- [ ] `favicon` et `preconnect` Google Fonts présents
- [ ] `lang="fr"` sur `<html>`

### Liens
- [ ] **Aucun lien mort** : vérifie que chaque `href` pointe vers un fichier qui existe
- [ ] Aucun `href="#"` qui traîne (notamment les réseaux sociaux du footer)
- [ ] Maillage interne : chaque page ville renvoie vers les 3 offres ; chaque article
      renvoie vers au moins une offre et une ville ; la page d'accueil renvoie vers tout
- [ ] Les liens dans `/blog/` sont bien préfixés `../`

### Fichiers techniques
- [ ] `sitemap.xml` : toutes les pages présentes, aucune page fantôme, bon domaine partout
- [ ] `robots.txt` : `Allow: /` + l'URL du sitemap avec le bon domaine
- [ ] `PAGES` dans `nav.js` : toutes les pages, aucune URL cassée

### Performance
- [ ] Poids des images : **aucune image au-dessus de 300 Ko**. Liste-moi celles à compresser,
      avec la commande exacte pour le faire (`sips` sur Mac, ou conversion en WebP).
- [ ] `loading="lazy"` sur toutes les images **sauf** celle du hero
- [ ] `width` et `height` sur les images, pour éviter que la page saute au chargement

### Mobile
- [ ] Simule une largeur de 375 px : aucun débordement horizontal
- [ ] Menu burger fonctionnel sur toutes les pages
- [ ] Boutons d'au moins 44 px de haut, texte jamais sous 14 px

Donne-moi la liste de ce que tu as corrigé, et la liste de ce qui dépend de moi
(images à fournir, chiffres à confirmer).
