/* ============================================================
   COMPTE À REBOURS D'OFFRE — Climatisation Khalil
   ------------------------------------------------------------
   À CHANGER : la date de fin ci-dessous (format ISO).
   RÈGLE D'HONNÊTETÉ : mettre une vraie date de fin, et tenir
   la promesse. Un compte à rebours qui se réinitialise tout
   seul à l'infini = pratique commerciale trompeuse (art. L121-2
   du Code de la consommation). Si vous n'avez pas de vraie
   offre limitée, supprimez ce fichier et la bannière promo.
   ============================================================ */

const PROMO_END = new Date('{{DATE_FIN_OFFRE}}T23:59:59').getTime(); // ex : 2026-12-31

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdowns() {
  const dist = PROMO_END - Date.now();

  // Pas de date de fin réelle, ou offre terminée → on retire les blocs promo.
  // Tant que {{DATE_FIN_OFFRE}} n'est pas renseignée, aucune offre ne s'affiche :
  // un compte à rebours sans échéance réelle est une pratique commerciale trompeuse.
  if (isNaN(PROMO_END) || dist <= 0) {
    document.querySelectorAll('.promo-banner, .promo-section, .promo-encart')
      .forEach(el => el.remove());
    return;
  }

  const days    = Math.floor(dist / 86400000);
  const hours   = Math.floor((dist % 86400000) / 3600000);
  const minutes = Math.floor((dist % 3600000) / 60000);
  const seconds = Math.floor((dist % 60000) / 1000);

  document.querySelectorAll('[data-cd-days]').forEach(el => el.textContent = pad(days));
  document.querySelectorAll('[data-cd-hours]').forEach(el => el.textContent = pad(hours));
  document.querySelectorAll('[data-cd-min]').forEach(el => el.textContent = pad(minutes));
  document.querySelectorAll('[data-cd-sec]').forEach(el => el.textContent = pad(seconds));
}

updateCountdowns();
setInterval(updateCountdowns, 1000);
