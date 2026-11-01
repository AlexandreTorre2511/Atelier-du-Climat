// Mesure d'audience : Google Tag Manager + GA4, avec bandeau de consentement (CNIL).
// Chargé en synchrone dans le <head> de toutes les pages, avant tout autre script.
// Tant que GTM_ID est vide, rien n'est chargé et aucun bandeau n'apparaît.
(function () {
  var GTM_ID = "";
  var CLE = "adc_consent";
  var DUREE_CHOIX = 1000 * 60 * 60 * 24 * 182;   // le choix est redemandé après 6 mois
  var POLITIQUE = "politique-confidentialite.html";

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  function suivre(donnees) { dataLayer.push(donnees); }
  window.adcSuivre = suivre;

  // Clics vers un moyen de contact : téléphone, e-mail, WhatsApp, demande de devis.
  document.addEventListener("click", function (e) {
    var lien = e.target.closest && e.target.closest("a[href]");
    if (!lien) return;
    var href = lien.getAttribute("href") || "";
    var evenement = href.indexOf("tel:") === 0 ? "click_telephone"
      : href.indexOf("mailto:") === 0 ? "click_email"
      : href.indexOf("wa.me/") !== -1 ? "click_whatsapp"
      : /#(devis|contact)$/.test(href) ? "click_devis" : null;
    if (evenement) suivre({ event: evenement, link_url: href });
  });

  if (!GTM_ID) {
    var masque = document.createElement("style");
    masque.textContent = "[data-zone-cookies]{display:none}";   // pas de lien « Gérer mes cookies » sans cookies
    document.head.appendChild(masque);
    return;
  }

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
  gtag("set", "url_passthrough", false);
  gtag("set", "ads_data_redaction", true);

  function lireChoix() {
    try {
      var c = JSON.parse(localStorage.getItem(CLE) || "null");
      return c && Date.now() - c.date < DUREE_CHOIX ? c.choice : null;
    } catch (err) { return null; }
  }
  var choix = lireChoix();
  if (choix === "granted") gtag("consent", "update", { analytics_storage: "granted" });

  (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", GTM_ID);

  // Bandeau : « Accepter » et « Tout refuser » ont exactement le même poids visuel.
  var style = document.createElement("style");
  style.textContent =
    ".cookies{position:fixed;z-index:100;left:16px;right:16px;bottom:16px;max-width:560px;margin:0 auto;padding:20px 22px;background:#fff;color:#05254e;border:1px solid #e3ebf3;border-radius:14px;box-shadow:0 18px 50px #05254e2e;font:14px/1.55 'DM Sans',system-ui,sans-serif}" +
    ".cookies b{display:block;font:800 16px Manrope,'DM Sans',sans-serif;margin-bottom:6px}" +
    ".cookies p{margin:0 0 16px;color:#5a6f88}.cookies p a{color:#05254e;text-decoration:underline}" +
    ".cookies div{display:flex;gap:10px}.cookies button{flex:1;min-height:46px;border-radius:9px;border:1.5px solid #05254e;background:#fff;color:#05254e;font:700 14px 'DM Sans',sans-serif;cursor:pointer}" +
    ".cookies button:hover{background:#05254e;color:#fff}";
  document.head.appendChild(style);

  function enregistrer(valeur) {
    try { localStorage.setItem(CLE, JSON.stringify({ choice: valeur, date: Date.now() })); } catch (err) {}
    gtag("consent", "update", { analytics_storage: valeur });
    suivre({ event: "consent_update", consent: valeur });
    fermer();
  }
  function fermer() {
    var b = document.getElementById("cookies");
    if (b) b.remove();
  }
  function ouvrir() {
    if (document.getElementById("cookies")) return;
    var prefixe = location.pathname.indexOf("/blog/") !== -1 ? "../" : "";
    var b = document.createElement("div");
    b.id = "cookies";
    b.className = "cookies";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Cookies de mesure d'audience");
    b.innerHTML = "<b>Vos cookies, votre choix</b><p>Avec votre accord, nous utilisons Google Analytics pour savoir quelles pages sont consultées et améliorer le site. Aucune publicité, aucune revente. <a href=\"" + prefixe + POLITIQUE + "\">En savoir plus</a></p>" +
      "<div><button type=\"button\" data-refuser>Tout refuser</button><button type=\"button\" data-accepter>Accepter</button></div>";
    b.querySelector("[data-accepter]").onclick = function () { enregistrer("granted"); };
    b.querySelector("[data-refuser]").onclick = function () { enregistrer("denied"); };
    document.body.appendChild(b);
  }

  document.addEventListener("click", function (e) {
    if (!(e.target.closest && e.target.closest("[data-open-cookies]"))) return;
    e.preventDefault();
    ouvrir();
  });
  if (!choix) {
    if (document.body) ouvrir();
    else document.addEventListener("DOMContentLoaded", ouvrir);
  }
})();
