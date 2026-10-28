/* Climatisation Khalil — Email Popup + Cookie Banner */

// ── Cookie Banner ──
(function() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('brand_cookies')) { banner.remove(); return; }
  setTimeout(() => banner.classList.add('show'), 1500);
  document.getElementById('cookie-accept') && document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('brand_cookies', '1');
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 600);
  });
  document.getElementById('cookie-decline') && document.getElementById('cookie-decline').addEventListener('click', () => {
    localStorage.setItem('brand_cookies', '0');
    banner.classList.remove('show');
    setTimeout(() => banner.remove(), 600);
  });
})();

// ── Email Popup ──
(function() {
  const popup = document.getElementById('email-popup');
  if (!popup) return;
  if (localStorage.getItem('brand_popup')) return;

  let shown = false;
  const show = () => {
    if (shown) return;
    shown = true;
    popup.classList.add('show');
  };

  // Exit intent
  document.addEventListener('mouseleave', (e) => { if (e.clientY < 20) show(); });

  // Timer fallback (45s)
  setTimeout(show, 45000);

  // Close
  const closeBtn = popup.querySelector('.email-popup__close');
  const overlay = popup.querySelector('.email-popup__overlay');
  const close = () => {
    popup.classList.remove('show');
    localStorage.setItem('brand_popup', '1');
  };
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);

  // Form submit → Brevo via Netlify Function
  const form = document.getElementById('popup-form');
  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailVal = form.querySelector('input[type="email"]').value.trim();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '...';
    btn.disabled = true;

    try {
      await fetch('/.netlify/functions/add-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal }),
      });
    } catch (_) { /* silently continue even if offline */ }

    // Thank you state
    const body = popup.querySelector('.email-popup__body');
    body.innerHTML = `
      <div style="text-align:center;padding:28px 0 20px;">
        <div style="font-size:48px;margin-bottom:16px;">🎉</div>
        <p style="font-family:var(--font-head);font-size:22px;font-weight:800;color:var(--brand-dark);margin-bottom:10px;letter-spacing:-0.02em;">C'est noté !</p>
        <p style="color:var(--text-dim);font-size:15px;line-height:1.6;">Vous recevrez votre estimation personnalisée sous 24h.<br>À très vite sur la Côte d'Azur 🌊</p>
      </div>`;
    setTimeout(close, 3000);
  });
})();

// ── Contact Form ──
(function() {
  const form = document.getElementById('devis-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {};
    new FormData(form).forEach((v, k) => data[k] = v);
    // Store lead
    const leads = JSON.parse(localStorage.getItem('brand_leads') || '[]');
    leads.push({ ...data, date: new Date().toISOString(), source: 'form' });
    localStorage.setItem('brand_leads', JSON.stringify(leads));
    // Success state
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Demande envoyée !';
    btn.style.background = '#15803d';
    btn.disabled = true;
    form.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(i => i.disabled = true);
  });
})();
