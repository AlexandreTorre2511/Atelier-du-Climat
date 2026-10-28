# PROMPT 06 — Page contact + formulaire qui envoie vraiment

---

Phase 6 : la page contact et le circuit d'envoi des demandes.

C'est **le point de conversion du site**. Si le formulaire ne marche pas,
tout le reste n'a servi à rien.

### 1. `site/contact.html`

- Hero court : titre + « réponse sous {{DELAI_REPONSE}} »
- **Deux colonnes** :
  - à gauche, le formulaire
  - à droite, les moyens de contact directs : téléphone cliquable (gros, visible),
    WhatsApp, email, horaires, zone d'intervention
- Les champs du formulaire :
  - Prénom · Nom · Email · Téléphone · Ville *(tous obligatoires)*
  - 2 à 3 `<select>` propres à mon métier (type de projet, surface, urgence, budget…)
  - Message libre *(optionnel)*
  - Une phrase RGPD sous le bouton
- Un bloc de succès (`#form-success`) caché, affiché après l'envoi
- Une mini-FAQ en bas : 4 questions sur le déroulement (délais, déplacement,
  paiement, engagement)

**Règle sur le nombre de champs :** chaque champ obligatoire supplémentaire fait perdre
des demandes. Ne demande que ce dont j'ai réellement besoin pour rappeler et chiffrer.

### 2. L'envoi d'email

Utilise le snippet 4 de `SNIPPETS.md` pour le HTML et le JavaScript.
Adapte `site/netlify/functions/send-email.js` :
- les champs lus doivent correspondre **exactement** aux `name=` de mon formulaire
- l'email reçu doit être lisible en 5 secondes sur un téléphone : tableau, libellés
  en gras, mes couleurs, et un gros bouton « Répondre à {prénom} »
- `from` et `to` : mon email professionnel
- `reply_to` : l'email du prospect, pour pouvoir répondre d'un seul clic

### 3. Le tracking de conversion
Dans le `catch`/succès du formulaire, déclenche `gtag('event', 'generate_lead')`
(protégé par `if (window.gtag)`). C'est **cet événement** qui servira plus tard à mesurer
le coût par demande en publicité.

### 4. La popup email
Adapte `assets/js/popup.js` : mon texte, mon offre. Elle se déclenche à la sortie de page
et après 45 secondes, une seule fois par visiteur (mémorisé en `localStorage`).

### 5. Test obligatoire avant de continuer
Dis-moi **exactement** comment tester le formulaire en local et une fois en ligne,
et ce qu'il faut vérifier : email bien reçu, bon expéditeur, bouton « Répondre » qui
fonctionne, affichage du message de succès, et comportement en cas d'erreur réseau.
