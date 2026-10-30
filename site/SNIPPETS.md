# SNIPPETS — blocs de code à recopier tels quels

Tout ce qui est entre `{{ }}` est à remplacer par les valeurs du BRIEF.
Ces blocs sont le squelette technique du site : ils doivent être **identiques sur toutes les pages**.

---

## 1. Le `<head>` complet (à mettre sur CHAQUE page)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Google Analytics GA4 — décommenter dès que l'ID est créé -->
  <!--
  <script async src="https://www.googletagmanager.com/gtag/js?id={{GA4_ID}}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "{{GA4_ID}}");
  </script>
  -->

  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <!-- 55-60 caractères max, le mot-clé en premier -->
  <title>{{TITRE_PAGE}} | {{NOM_ENTREPRISE}}</title>
  <!-- 150-160 caractères, finir par un bénéfice concret -->
  <meta name="description" content="{{DESCRIPTION_PAGE}}"/>

  <meta property="og:title" content="{{TITRE_PAGE}}"/>
  <meta property="og:description" content="{{DESCRIPTION_PAGE}}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://{{DOMAINE}}/assets/img/{{IMAGE_PARTAGE}}"/>
  <meta property="og:url" content="https://{{DOMAINE}}/{{FICHIER}}"/>
  <meta property="og:site_name" content="{{NOM_ENTREPRISE}}"/>

  <link rel="canonical" href="https://{{DOMAINE}}/{{FICHIER}}"/>
  <link rel="icon" type="image/png" href="assets/img/logo-{{SLUG}}.png"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="stylesheet" href="assets/css/style.css"/>

  <!-- JSON-LD : voir snippet 2 -->
</head>
```

> Dans `/blog/`, tous les chemins relatifs prennent `../` (`../assets/css/style.css`).

---

## 2. JSON-LD LocalBusiness (à mettre sur CHAQUE page)

C'est **ce bloc** qui fait apparaître l'entreprise dans le pack local Google (la carte avec 3 résultats).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{{TYPE_SCHEMA}}",
  "name": "{{NOM_ENTREPRISE}}",
  "url": "https://{{DOMAINE}}",
  "telephone": "{{TEL_INTERNATIONAL}}",
  "email": "{{EMAIL_PRO}}",
  "image": "https://{{DOMAINE}}/assets/img/logo-{{SLUG}}.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{RUE}}",
    "addressLocality": "{{VILLE_PRINCIPALE}}",
    "postalCode": "{{CODE_POSTAL}}",
    "addressRegion": "{{REGION}}",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": {{LAT}}, "longitude": {{LON}} },
  "areaServed": { "@type": "State", "name": "{{DEPARTEMENT}}" },
  "priceRange": "{{FOURCHETTE_PRIX}}",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "{{HEURE_OUVERTURE}}",
    "closes": "{{HEURE_FERMETURE}}"
  }]
}
</script>
```

**`{{TYPE_SCHEMA}}` — choisir le type le plus précis** (`LocalBusiness` est le repli générique) :
`HVACBusiness` (clim/chauffage) · `Plumber` · `Electrician` · `RoofingContractor` · `HousePainter` ·
`GeneralContractor` (bâtiment) · `Locksmith` · `MovingCompany` · `AutoRepair` · `Dentist` ·
`HealthAndBeautyBusiness` · `HairSalon` · `DaySpa` · `Restaurant` · `Bakery` · `RealEstateAgent` ·
`Attorney` · `Accounting` · `InsuranceAgency` · `TravelAgency` · `ChildCare` · `Physiotherapy` ·
`VeterinaryCare` · `Photograph` · `SportsActivityLocation` · `Store`.
Liste complète : schema.org/LocalBusiness

**`geo`** : coordonnées trouvables en faisant clic droit → "Plus d'infos sur cet endroit" sur Google Maps.
**Sans adresse publique** (activité à domicile) : retirer `streetAddress`, garder ville + code postal.

---

## 3. JSON-LD FAQPage (uniquement sur les pages villes + pages offres)

Fait gagner les "People Also Ask" et un bloc déroulant directement dans Google.
**Les questions/réponses du JSON-LD doivent être le texte EXACT visible sur la page.** Sinon : pénalité.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"{{QUESTION_1}}","acceptedAnswer":{"@type":"Answer","text":"{{REPONSE_1}}"}},
    {"@type":"Question","name":"{{QUESTION_2}}","acceptedAnswer":{"@type":"Answer","text":"{{REPONSE_2}}"}},
    {"@type":"Question","name":"{{QUESTION_3}}","acceptedAnswer":{"@type":"Answer","text":"{{REPONSE_3}}"}},
    {"@type":"Question","name":"{{QUESTION_4}}","acceptedAnswer":{"@type":"Answer","text":"{{REPONSE_4}}"}}
  ]
}
</script>
```

**Les 4 questions qui marchent dans TOUS les métiers** :
1. Combien coûte {{SERVICE}} à {{VILLE}} ? → donner une vraie fourchette de prix
2. Quel est le délai d'intervention à {{VILLE}} ? → donner un vrai délai
3. Intervenez-vous dans tous les quartiers de {{VILLE}} ? → citer 6-8 quartiers réels
4. *(une question technique propre au métier)* → réponse de 3-4 phrases

---

## 4. Formulaire de contact + envoi d'email

### Le HTML (dans `contact.html`)

```html
<form id="devis-form" onsubmit="handleDevisSubmit(event)">
  <div class="form-row">
    <div class="form-group">
      <label for="prenom">Prénom *</label>
      <input type="text" id="prenom" name="prenom" class="form-input" placeholder="Jean" required/>
    </div>
    <div class="form-group">
      <label for="nom">Nom *</label>
      <input type="text" id="nom" name="nom" class="form-input" placeholder="Dupont" required/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" class="form-input" required/>
    </div>
    <div class="form-group">
      <label for="tel">Téléphone *</label>
      <input type="tel" id="tel" name="tel" class="form-input" placeholder="06 XX XX XX XX" required/>
    </div>
  </div>
  <div class="form-group">
    <label for="ville">Ville *</label>
    <input type="text" id="ville" name="ville" class="form-input" required/>
  </div>
  <!-- 2 à 3 champs <select> propres au métier : type de projet, surface, urgence… -->
  <div class="form-group">
    <label for="message">Votre projet</label>
    <textarea id="message" name="message" class="form-textarea"></textarea>
  </div>
  <button type="submit" class="btn btn--primary form-submit">
    Envoyer ma demande de {{MOT_CONVERSION}}
  </button>
  <p style="font-size:12px;color:var(--text-muted);margin-top:12px;">
    Vos données servent uniquement à traiter votre demande. Aucune revente à des tiers.
  </p>
</form>

<div id="form-success" style="display:none;">
  <h3>Demande envoyée ✅</h3>
  <p>Nous vous répondons sous {{DELAI_REPONSE}}. À très vite.</p>
</div>
```

### Le JavaScript (en bas de `contact.html`)

```html
<script>
async function handleDevisSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('devis-form');
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.disabled = true;
  btn.textContent = 'Envoi en cours...';

  const data = {};
  new FormData(form).forEach((v, k) => data[k] = v);

  try {
    const res = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Erreur serveur');
    form.style.display = 'none';
    success.style.display = 'block';
    if (window.gtag) gtag('event', 'generate_lead');   // ← conversion trackée
  } catch {
    btn.disabled = false;
    btn.textContent = 'Envoyer ma demande de {{MOT_CONVERSION}}';
    alert('Une erreur est survenue. Appelez-nous au {{TEL_AFFICHE}} ou écrivez à {{EMAIL_PRO}}.');
  }
}
</script>
```

> Le fichier `netlify/functions/send-email.js` fait le reste (voir le dossier).
> Il lit les champs du formulaire, formate un email HTML lisible, et l'envoie via Resend.
> **Les noms des champs du formulaire doivent correspondre à ceux lus dans la fonction.**

---

## 5. Les scripts à charger en bas de page (avant `</body>`)

```html
<script src="assets/js/nav.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/popup.js"></script>
<script src="assets/js/promo.js"></script>        <!-- seulement si vraie offre limitée -->
<script src="assets/js/social-proof.js"></script> <!-- calculateur + ville rotative -->
```

---

## 6. sitemap.xml — modèle

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Pages principales -->
  <url><loc>https://{{DOMAINE}}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://{{DOMAINE}}/offre-1.html</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://{{DOMAINE}}/contact.html</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <!-- Pages villes : priority 0.9 pour la ville principale, 0.7-0.8 pour les autres -->
  <url><loc>https://{{DOMAINE}}/{{SLUG_METIER}}-{{SLUG_VILLE_1}}.html</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <!-- Blog -->
  <url><loc>https://{{DOMAINE}}/blog.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://{{DOMAINE}}/blog/mon-article.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <!-- Légal -->
  <url><loc>https://{{DOMAINE}}/mentions-legales.html</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>
```

**Règle : une page créée = une ligne ajoutée au sitemap + une ligne ajoutée à `PAGES` dans `nav.js`.**

---

## 7. Classes CSS disponibles (`assets/css/style.css`)

| Classe | Rôle |
|---|---|
| `.container` / `.container--wide` | Largeur max 1200 / 1400 px |
| `.section` | Bloc avec 100px de padding vertical |
| `.section--gray` / `--brand-dark` / `--dark` | Fonds alternés (gris / couleur foncée / très foncé) |
| `.section__head.center` + `.label` + `.section__title` + `.section__sub` | En-tête de section |
| `.btn` + `.btn--primary` / `--outline` / `--white` / `--outline-white` | Boutons |
| `.hero` `.hero__bg` `.hero__title` `.hero__sub` `.hero__actions` `.hero__tag` | Bloc d'accroche |
| `.stats` `.stats__grid` `.stats__num[data-count]` | Bandeau de chiffres animés |
| `.pack-card` / `.pack-card--featured` | Cartes d'offres (la "featured" est mise en avant) |
| `.calc-wrap` `.calc-opt[data-choix]` `.calc-result__*` | Calculateur de prix |
| `.review-card` | Carte d'avis client |
| `.zone-tag` | Pastille de ville/quartier |
| `.product-layout` `.product-tabs` `.tab-btn[data-tab]` `.tab-panel[data-panel]` | Page offre avec onglets |
| `.article-body` `.article-meta` `.article-img` `.article-cta-box` `.article-related` | Article de blog |
| `.cta-banner` | Bandeau d'appel à l'action pleine largeur |
| `.footer` `.footer__grid` `.footer__col` | Pied de page |
| `.whatsapp-float` | Bouton WhatsApp flottant |
| `.reveal` | Apparition au scroll (ajouter sur chaque bloc) |
| `.anim-fade-up` + `.anim-delay-1/2/3` | Apparition en cascade (hero) |

**Variables de couleur** (dans `:root`, les 6 seules à changer) :
`--brand-dark`, `--brand-darker`, `--brand`, `--brand-light`, `--brand-dim`, `--brand-glow`
**Polices** : `--font-head` (titres) et `--font-body` (texte) — à changer dans le `@import` en haut du CSS.

---

## Avis clients — gabarit prêt à remplir

La section Avis est volontairement absente de la page d'accueil : aucun avis
vérifié n'est disponible aujourd'hui. Ne pas publier de témoignage inventé,
même « inspiré » d'un vrai — un prospect vérifie une fiche Google en dix
secondes.

**Pour publier de vrais avis**, coller le bloc ci-dessous dans `index.html`
à l'emplacement du commentaire `<!-- AVIS CLIENTS`, en remplaçant les
`{{ }}`. N'inclure que des avis dont l'auteur a donné son accord.

```html
<section class="section section--sand">
  <div class="container">
    <div class="section__head reveal">
      <span class="label">Avis clients</span>
      <h2 class="section__title">Ils nous font confiance</h2>
    </div>
    <div class="avis-grid reveal">
      <figure class="avis">
        <div class="avis__note" aria-label="{{NOTE}} étoiles sur 5">{{ÉTOILES}}</div>
        <blockquote><p>{{TEXTE DE L'AVIS, MOT POUR MOT}}</p></blockquote>
        <figcaption><b>{{PRÉNOM + INITIALE}}</b><span>{{VILLE}} — {{MOIS ANNÉE}}</span></figcaption>
      </figure>
      <!-- répéter -->
    </div>
  </div>
</section>
```

Le CSS `.avis-grid`, `.avis`, `.avis__note` est déjà dans `style.css`.

**Si une fiche Google existe**, ajouter aussi la note globale dans le hero
(`.hero__note`) — mais uniquement la note réellement affichée sur la fiche,
et le nombre réel d'avis.
