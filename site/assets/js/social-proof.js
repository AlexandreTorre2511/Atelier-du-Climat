/* ============================================================
   CALCULATEUR DE PRIX + VILLE ROTATIVE — Atelier du Climat
   ------------------------------------------------------------
   CE FICHIER CONTIENT 3 MÉCANIQUES. Lire les avertissements.
   ============================================================ */


/* ─────────────────────────────────────────────────────────────
   1. CALCULATEUR DE PRIX  ← LE PLUS GROS LEVIER DE CONVERSION
   ─────────────────────────────────────────────────────────────
   Principe : UNE seule question, 3 réponses possibles, et le
   visiteur voit instantanément 3 prix. Il n'a rien à remplir,
   rien à envoyer. Il repart avec un ordre de prix en tête →
   il n'a plus besoin d'appeler 3 concurrents pour comparer.

   À ADAPTER : la question, les 3 options, et la grille de prix.
   Exemples de question selon le métier :
     - plombier      : "Quel type d'intervention ?"
     - paysagiste    : "Quelle surface de jardin ?"
     - photographe   : "Quel type de séance ?"
     - menuisier     : "Combien de fenêtres ?"
     - avocat        : "Quel type de dossier ?" (→ afficher des forfaits)

   RÈGLE : n'affichez QUE des prix que vous honorerez. Un prix
   d'appel que vous ne tenez jamais détruit la confiance au
   premier rendez-vous.
───────────────────────────────────────────────────────────── */

const CALC_PRICES = {
  // clé = nombre de pièces → prix affiché par gamme, pose comprise
  1: { offre1: 899,  offre2: 1199, offre3: 1699 },
  2: { offre1: 1999, offre2: 2699, offre3: 3599 },
  3: { offre1: 2999, offre2: 3799, offre3: 4999 },
};

const CALC_LABELS  = { 1: '1 pièce', 2: '2 pièces', 3: '3 pièces' };
const OFFRE_NAMES  = { offre1: 'One Clima', offre2: 'Bosch', offre3: 'Daikin' };
const OFFRE_SUBS   = { offre1: 'Formule essentielle', offre2: '', offre3: 'Formule premium' };

let calcChoice = null;

function calcSelect(step, value) {
  if (step !== 'choix') return;
  calcChoice = value;
  document.querySelectorAll('#calc-step1 .calc-opt').forEach(el => el.classList.remove('selected'));
  const sel = document.querySelector(`[data-choix="${value}"]`);
  if (sel) sel.classList.add('selected');
  setTimeout(showCalcResult, 400);
}

function showCalcResult() {
  const prices = CALC_PRICES[calcChoice];
  if (!prices) return;

  document.getElementById('calc-step1').classList.remove('active');
  const result = document.getElementById('calc-result');
  result.classList.add('active');
  document.querySelectorAll('.calc-progress__dot').forEach((d, i) => d.classList.toggle('active', i < 2));

  const card = (key, best) => `
    <div class="calc-result__card${best ? ' calc-result__card--best' : ''}">
      <div class="calc-result__brand">${OFFRE_NAMES[key]}</div>
      <div class="calc-result__price">${prices[key].toLocaleString('fr-FR')} €</div>
      ${best
        ? '<div class="calc-result__badge">Le + demandé</div>'
        : `<div class="calc-result__sub">${OFFRE_SUBS[key]}</div>`}
    </div>`;

  result.innerHTML = `
    <div class="calc-result__title">Votre projet <strong>${CALC_LABELS[calcChoice]}</strong> — estimation</div>
    <div class="calc-result__grid">
      ${card('offre1', false)}${card('offre2', true)}${card('offre3', false)}
    </div>
    <p style="font-size:12px;color:var(--text-muted);text-align:center;margin:14px 0 18px;">
      Estimation indicative. Prix définitif confirmé après devis gratuit.
    </p>
    <a href="contact.html" class="btn btn--primary" style="width:100%;display:block;text-align:center;padding:16px;">
      Obtenir mon devis gratuit
    </a>
    <button class="calc-reset" onclick="resetCalc()">← Recommencer</button>
  `;
}

function resetCalc() {
  calcChoice = null;
  document.getElementById('calc-step1').classList.add('active');
  document.getElementById('calc-result').classList.remove('active');
  document.querySelectorAll('#calc-step1 .calc-opt').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.calc-progress__dot').forEach((d, i) => d.classList.toggle('active', i === 0));
}


/* ─────────────────────────────────────────────────────────────
   2. NOTIFICATIONS DE PREUVE SOCIALE  ⚠️  DÉSACTIVÉ PAR DÉFAUT
   ─────────────────────────────────────────────────────────────
   Les petites bulles "Julien (Nice) vient de demander un devis".

   ⚠️  AVERTISSEMENT — À LIRE AVANT D'ACTIVER
   Si ces noms sont inventés, c'est une pratique commerciale
   trompeuse (art. L121-2 et L121-4 du Code de la consommation
   en France) : amende possible et, surtout, réputation grillée
   si un client s'en aperçoit.

   DEUX USAGES LÉGITIMES :
   a) Vous remplissez SP_LEADS avec de VRAIS clients récents
      (prénom + ville uniquement, avec leur accord — RGPD),
      et vous mettez à jour la liste régulièrement.
   b) Vous remplacez par des faits vérifiables et intemporels :
      "4,8/5 sur 36 avis Google", "Intervention sous 48h",
      "12 ans d'expérience". Même effet rassurant, zéro risque.

   Pour activer : passer SP_ENABLED à true ET remplir SP_LEADS
   avec du réel. Sinon, laisser false.
───────────────────────────────────────────────────────────── */

const SP_ENABLED = false;

const SP_LEADS = [
  // { name: 'Prénom réel', city: 'Ville', action: 'a fait appel à nous', ago: '2 jours' },
];

function initSocialProof() {
  if (!SP_ENABLED || !SP_LEADS.length) return;

  const el = document.createElement('div');
  el.className = 'sp-notif';
  el.innerHTML = `
    <div class="sp-notif__avatar" id="sp-avatar"></div>
    <div>
      <div class="sp-notif__text" id="sp-text"></div>
      <div class="sp-notif__time" id="sp-time"></div>
    </div>`;
  document.body.appendChild(el);

  let idx = 0;
  function show() {
    const lead = SP_LEADS[idx % SP_LEADS.length];
    idx++;
    document.getElementById('sp-avatar').textContent = lead.name[0] + lead.city[0];
    document.getElementById('sp-text').innerHTML = `<strong>${lead.name} (${lead.city})</strong> ${lead.action}`;
    document.getElementById('sp-time').textContent = `Il y a ${lead.ago}`;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 5000);
  }
  setTimeout(show, 8000);
  setInterval(show, 35000);
}


/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initSocialProof();
});
