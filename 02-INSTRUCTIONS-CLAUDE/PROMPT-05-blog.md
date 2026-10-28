# PROMPT 05 — Blog et pages d'autorité

---

Phase 5 : le blog + les pages d'autorité.

À quoi ça sert concrètement : capter les gens **avant** qu'ils cherchent une entreprise.
Celui qui tape « combien coûte X » n'est pas encore prêt à acheter — mais il le sera dans
deux semaines, et il se souviendra du site qui lui a répondu clairement et gratuitement.

### 1. `blog.html`
Page liste : une carte par article (image, titre, 2 lignes de résumé, date, lien).

### 2. Les articles → dans `site/blog/`
10 à 12 articles. **Chaque article répond à UNE question réelle que mes clients posent.**

Les 6 angles qui fonctionnent dans tous les métiers :
1. **Prix** — « Combien coûte {{service}} en {{année}} ? » → l'article le plus lu, toujours
2. **Comparatif** — « {{Option A}} ou {{Option B}} : lequel choisir ? »
3. **Guide d'achat** — « Comment choisir son {{produit/prestataire}} »
4. **Réglementation** — normes, obligations, autorisations, droits
5. **Erreurs** — « Les 5 erreurs à éviter quand on {{action}} »
6. **Local** — « {{Sujet}} à {{Ville}} : ce qu'il faut savoir »

Structure d'article :
- `.article-body` avec `.article-meta` (date + temps de lecture)
- Une image en haut (`.article-img`)
- **1 200 à 1 800 mots**, découpés en `<h2>` tous les 200-300 mots
- Un tableau comparatif ou une liste de prix quand le sujet le permet
- **Un `.article-cta-box` au milieu de l'article** — pas seulement à la fin
- `.article-related` en bas : 3 autres articles
- Des liens vers les pages offres et les pages villes dans le corps du texte
- ⚠️ Chemins en `../` (`../assets/css/style.css`)

### 3. Les pages d'autorité (1 à 2, à la racine)
Pages qui prouvent le sérieux et captent des recherches à forte intention.
Choisis ce qui a du sens dans MON métier, par exemple :
- certifications / qualifications / diplômes du secteur
- aides financières, subventions, crédits d'impôt disponibles
- réglementation et normes en vigueur
- garanties et assurances

### Règles d'écriture
- Le ton d'un professionnel qui explique, pas d'un commercial qui vend
- **Des chiffres précis uniquement s'ils sont vérifiables.** Pour les prix, utilise les
  miens. Pour une donnée réglementaire, cite la source (article de loi, texte officiel)
  et vérifie qu'elle est à jour — sinon ne la mets pas.
- Un article qui donne une vraie réponse utile vaut mieux que trois articles creux

Écris **un seul article d'abord**, montre-le-moi, je valide le format, puis tu fais la suite.

À la fin : `sitemap.xml` + tableau `PAGES` de `nav.js` pour chaque article.
