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

  // Form submit → boîte de l'entreprise via Netlify Function
  const form = document.getElementById('popup-form');
  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailVal = form.querySelector('input[type="email"]').value.trim();
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.textContent;
    btn.textContent = 'Envoi...';
    btn.disabled = true;

    let sent = false;
    try {
      const res = await fetch('/.netlify/functions/add-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal }),
      });
      sent = res.ok;
    } catch (_) { sent = false; }

    // Jamais de « c'est noté » si rien n'est parti : on renvoie le visiteur
    // vers un canal qui marche plutôt que de perdre la demande en silence.
    if (!sent) {
      btn.textContent = label;
      btn.disabled = false;
      let err = form.querySelector('.email-popup__error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'email-popup__error';
        err.style.cssText = 'margin-top:12px;font-size:14px;line-height:1.5;color:#b91c1c;';
        form.appendChild(err);
      }
      err.innerHTML = 'L\'envoi a échoué. Appelez-nous au '
        + '<a href="tel:+33766846856" style="color:#b91c1c;font-weight:700;">07 66 84 68 56</a>'
        + ' ou écrivez sur <a href="https://wa.me/33766846856" target="_blank" rel="noopener" style="color:#b91c1c;font-weight:700;">WhatsApp</a>.';
      return;
    }

    localStorage.setItem('brand_popup', '1');
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
