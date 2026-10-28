# PROMPT 09 — Mise en ligne, puis trafic

---

Phase 9 : publication. Guide-moi pas à pas, en attendant ma confirmation
à chaque étape avant de passer à la suivante.

## A · Mise en ligne (jour 1)

**1. Dernière vérification** — relance l'audit du PROMPT 07 et confirme que tout est propre.

**2. Netlify** — explique-moi, clic par clic :
- créer un compte sur netlify.com
- « Add new site » → « Deploy manually » → glisser-déposer le dossier `site/`
- le site est en ligne sous une adresse en `.netlify.app`

**3. La clé Resend** (pour que le formulaire envoie des emails) :
- créer un compte sur resend.com
- y ajouter mon domaine et valider les enregistrements DNS qu'il demande
- récupérer la clé API
- dans Netlify : Site configuration → Environment variables → `RESEND_API_KEY`
- **redéployer** le site (la variable n'est prise en compte qu'au déploiement suivant)

**4. Mon nom de domaine** :
- Netlify → Domain management → Add custom domain
- les enregistrements DNS exacts à créer chez mon registrar (OVH, Ionos, Gandi…)
- activer le HTTPS (Let's Encrypt, gratuit, automatique)
- ⚠️ la propagation DNS prend de 1 à 24 h — c'est normal

**5. Test réel en ligne** : envoyer une vraie demande depuis le formulaire,
vérifier la réception de l'email, et le bouton « Répondre ».
**Ne passe pas à la suite avant que ce test soit concluant.**

## B · Être trouvé (semaine 1)

**6. Google Business Profile** — le levier n°1 en local, plus rapide que le site lui-même :
- créer la fiche sur business.google.com
- catégorie principale + catégories secondaires : conseille-moi les meilleures pour mon métier
- zone d'intervention, horaires, téléphone, lien vers le site
- 10 photos minimum
- la vérification (courrier ou vidéo) prend 1 à 2 semaines
- **demander des avis dès le premier client** : donne-moi un message type à envoyer

**7. Google Search Console** :
- ajouter la propriété, la vérifier (via le DNS Netlify)
- soumettre `sitemap.xml`
- demander l'indexation de la page d'accueil et des pages villes
- ⚠️ l'indexation complète prend de 1 à 4 semaines. C'est normal, ne pas s'inquiéter.

**8. Google Analytics GA4** :
- créer la propriété, récupérer l'ID `G-XXXXXXXXXX`
- l'insérer sur **toutes** les pages (fais-le en une commande, pas page par page)
- créer la conversion sur l'événement `generate_lead`

**9. Bing Webmaster Tools** — 5 minutes, import direct depuis Search Console.
Petit trafic, mais gratuit, et c'est ce que lit l'assistant de Windows.

## C · Amener du trafic payant (dès que les emails arrivent)

**10. Google Ads** — c'est ce qui donne des demandes en 48 h, là où le SEO met 3 mois :
- structure de compte à conseiller pour mon métier et mon budget
- campagne Search sur les mots-clés « {{métier}} + ville »
- **mots-clés négatifs dès le départ** : « gratuit », « emploi », « formation »,
  « salaire », « pas cher », « occasion », « bricolage », « tuto » + ceux propres à mon métier
- les extensions d'annonce (appel, lieu, liens annexes)
- l'import de la conversion `generate_lead` depuis GA4
- budget quotidien conseillé pour commencer

**11. Meta Pixel** (si je fais de la publicité Facebook/Instagram) :
créer le pixel, me donner le code, l'insérer sur toutes les pages,
configurer l'événement `Lead` sur l'envoi du formulaire.

## D · Après le lancement

**12. Donne-moi un plan de suivi tenable** :
- ce que je regarde chaque semaine (demandes reçues, position Google, dépense pub)
- ce que je regarde chaque mois (trafic par page, taux de conversion, coût par demande)
- un rythme de publication réaliste pour le blog
- les 3 premières choses à améliorer selon ce que montreront les chiffres

**13. Crée-moi un `JOURNAL.md`** à la racine du projet : ce qui a été fait,
les identifiants et emplacements des comptes (sans mots de passe),
les IDs (GA4, pixel, domaine), et ce qui reste à faire.
Ce fichier me servira à reprendre le projet dans six mois — ou à le faire reprendre
par quelqu'un d'autre.
