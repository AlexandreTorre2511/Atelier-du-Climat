# PROMPT 04 — Les pages villes (le moteur du référencement local)

---

Phase 4 : une page par ville.

**C'est le mécanisme qui amène le trafic gratuit.** Les gens ne cherchent pas
« {{METIER}} » tout seul — ils cherchent « {{METIER}} + leur ville ». Une page dédiée par
ville, c'est une chance de sortir en première page sur chacune de ces recherches,
là où les concurrents n'ont qu'une seule page générique.

Nomme les fichiers : `{{slug-metier}}-{{slug-ville}}.html`
(ex : `plombier-nice.html`, `photographe-mariage-cannes.html`)

Structure de chaque page ville :

1. **Hero ville** : `<h1>` = `{{Métier}} à {{Ville}}` + 1 phrase + 2 boutons
2. **Bandeau de chiffres** (les mêmes que la page d'accueil)
3. **« Votre {{métier}} à {{Ville}} »** — 2 à 3 paragraphes **vraiment spécifiques à cette ville**
4. **Les 3 offres**, en version courte, avec liens vers les pages offres
5. **« Pourquoi nous choisir à {{Ville}} »** — 4 arguments
6. **Quartiers desservis** — 6 à 10 quartiers **réels**, en pastilles `.zone-tag`
7. **FAQ — 4 questions** avec le nom de la ville dedans + JSON-LD `FAQPage`
8. **Bandeau CTA** + footer

### ⚠️ La règle qui décide de tout : le contenu local réel

Google détecte et déclasse les pages dupliquées où seul le nom de la ville change.
**Chaque page ville doit contenir au moins 250 mots qu'on ne trouve sur aucune autre page.**

Pour chaque ville, écris du contenu ancré dans la réalité locale :
- les quartiers réels (va les vérifier)
- le type de bâti dominant (centre ancien, résidences récentes, villas, immeubles haussmanniens…)
- les contraintes propres au lieu (copropriétés, secteur sauvegardé, accès difficile,
  stationnement, zone classée, climat, altitude…)
- les délais ou tarifs spécifiques si l'éloignement les change
- le temps de trajet depuis ma base

**Si tu ne sais pas** quels sont les quartiers ou les spécificités d'une ville :
demande-les-moi, ou fais une recherche web. Ne produis jamais 8 pages interchangeables —
ce serait pire que de n'en faire qu'une.

Commence par **une seule ville**, montre-la-moi, je valide le modèle, puis tu fais les autres.

À la fin : `sitemap.xml` (priority 0.9 pour la ville principale, 0.7-0.8 pour les autres)
et le tableau `PAGES` de `nav.js`.
