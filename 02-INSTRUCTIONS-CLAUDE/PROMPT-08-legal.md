# PROMPT 08 — Pages légales (obligatoires en France)

---

Phase 8 : les pages légales. Ce ne sont pas des options :
l'absence de mentions légales sur un site professionnel est passible d'une amende
(art. 6-III de la loi LCEN n° 2004-575).

### 1. `site/mentions-legales.html`
À partir des informations de mon BRIEF :
- Dénomination sociale, forme juridique, capital social
- Adresse du siège social
- SIRET / RCS
- Numéro de TVA intracommunautaire (si assujetti)
- Nom du responsable de la publication
- Téléphone et email de contact
- Hébergeur : **Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA**
- Assurance professionnelle (nom de l'assureur, zone de couverture)
- Mention de propriété intellectuelle sur le contenu du site
- Médiateur de la consommation *(obligatoire pour toute activité avec des particuliers —
  si je n'en ai pas, dis-le-moi, c'est à souscrire)*

### 2. `site/politique-confidentialite.html` (RGPD)
- Quelles données sont collectées (celles du formulaire, précisément)
- Pourquoi (traiter la demande de {{MOT_CONVERSION}})
- Base légale du traitement (consentement / intérêt légitime)
- Combien de temps elles sont conservées (3 ans après le dernier contact est l'usage)
- Qui y a accès, et les sous-traitants réels : Netlify (hébergement),
  Resend (envoi d'email), Google Analytics (mesure d'audience)
- Les droits de la personne : accès, rectification, suppression, opposition, portabilité
- **Comment les exercer** : mon email de contact
- Le droit de réclamation auprès de la CNIL
- Les cookies utilisés et comment les refuser

### 3. Bandeau cookies
Il est déjà dans `popup.js`. **Mais attention :** si Google Analytics se charge avant que
le visiteur ait accepté, le bandeau ne sert à rien juridiquement.
Mets en place le comportement correct : GA4 ne se charge **qu'après** le clic sur « Accepter ».
Explique-moi en 3 lignes ce que tu as fait.

### ⚠️ Ce que tu ne dois pas faire
- Ne copie pas des mentions légales d'un autre site
- N'invente aucun numéro (SIRET, TVA, capital, police d'assurance).
  Si une information manque dans mon BRIEF : laisse `{{À COMPLÉTER}}` en évidence
  et mets-la dans la liste de ce que je dois te fournir.
- Ne me présente pas ces pages comme un conseil juridique. Pour une activité réglementée
  (santé, droit, finance, alimentaire, enfance…), dis-moi de les faire relire.
