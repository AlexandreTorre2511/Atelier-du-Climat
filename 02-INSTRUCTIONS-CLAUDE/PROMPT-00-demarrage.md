# PROMPT 00 — Démarrage

> **Avant de coller ce prompt :**
> 1. Crée un dossier pour le projet (ex : `~/Desktop/site-mon-entreprise/`)
> 2. Copie dedans : `CLAUDE.md`, le dossier `03-TEMPLATE-CODE/` (renomme-le en `site/`),
>    et ton `BRIEF-A-REMPLIR.md` rempli
> 3. Ouvre un terminal dans ce dossier et lance `claude`
> 4. Colle le texte ci-dessous

---

Je veux construire un site vitrine local pour mon entreprise, destiné à générer des
demandes de {{MOT_CONVERSION}} depuis Google et depuis la publicité.

Lis d'abord ces trois fichiers, dans cet ordre :
1. `CLAUDE.md` — les règles du projet, à respecter du début à la fin
2. `BRIEF-A-REMPLIR.md` — toutes les informations sur mon entreprise
3. `site/SNIPPETS.md` — les blocs de code techniques à réutiliser tels quels

Le dossier `site/` contient déjà le design system (CSS), les scripts JS, la fonction
d'envoi d'email et le `robots.txt`. **Ne les réécris pas depuis zéro** : tu les adaptes.

Ensuite, fais exactement ceci, dans cet ordre :

**1. Remplis les variables du projet** (section « Variables du projet » de `CLAUDE.md`)
à partir du BRIEF, et montre-moi le tableau rempli pour que je valide.

**2. Liste-moi les informations manquantes ou douteuses.** Tout ce que j'ai laissé vide,
tout ce que j'ai marqué `JE NE SAIS PAS`, et tout ce qui te paraît invérifiable.
Pose-moi les questions. **Ne comble rien tout seul.**

**3. Propose-moi l'architecture complète du site** sous forme de tableau :

| Fichier | Mot-clé principal visé | Intention de recherche | Rôle dans le tunnel |
|---|---|---|---|

Elle doit comprendre :
- 1 page d'accueil
- 3 pages d'offres (une par gamme)
- 1 page par ville où j'interviens réellement
- 1 page « réalisations »
- 1 à 2 pages d'autorité propres à mon métier (certifications, réglementation,
  aides financières, garanties… ce qui fait sens dans MON secteur)
- 1 page blog + une liste de 10 à 12 articles répondant à de vraies questions
  que mes clients posent
- 1 page contact
- mentions légales + politique de confidentialité

**4. Dis-moi quelles photos je dois te fournir**, et pour chacune : où elle ira,
et quel format/cadrage prévoir.

**Ne code encore rien.** On valide l'architecture d'abord.
