/* Capture d'email de la popup → envoi dans la boîte de l'entreprise.
   Appelée par assets/js/popup.js. Toute réponse autre que 200 fait
   afficher au visiteur un message d'échec avec le téléphone : on ne lui
   dit jamais « c'est noté » si rien n'est parti. */

const MAIL_FROM = process.env.MAIL_FROM || 'Climatisation Khalil <onboarding@resend.dev>';
const MAIL_TO = process.env.MAIL_TO || 'depannage06contact@gmail.com';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email;
  try {
    email = (JSON.parse(event.body).email || '').toString().trim();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Requête invalide' }) };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Adresse email invalide' }) };
  }

  if (!process.env.RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'RESEND_API_KEY absente' }) };
  }

  const safe = email.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const page = (event.headers.referer || 'inconnue').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
      <div style="background:#0D1F3C;padding:24px 32px;">
        <h1 style="color:#00AEEF;margin:0;font-size:22px;letter-spacing:-0.5px;">Climatisation Khalil</h1>
        <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px;">Demande d'estimation (popup)</p>
      </div>
      <div style="padding:32px;">
        <p style="font-size:15px;margin:0 0 20px;">Ce visiteur a laissé son email pour recevoir une estimation. Il attend une réponse sous 24&nbsp;h.</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr><td style="padding:12px 16px;background:#f4f6f8;font-weight:700;color:#0D1F3C;width:40%;">Email</td><td style="padding:12px 16px;background:#f4f6f8;"><a href="mailto:${safe}" style="color:#00AEEF;">${safe}</a></td></tr>
          <tr><td style="padding:12px 16px;font-weight:700;color:#0D1F3C;">Page d'origine</td><td style="padding:12px 16px;">${page}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#00AEEF;border-radius:8px;text-align:center;">
          <a href="mailto:${safe}" style="color:white;font-weight:700;font-size:15px;text-decoration:none;">Répondre maintenant</a>
        </div>
      </div>
      <div style="padding:16px 32px;background:#f4f6f8;text-align:center;font-size:12px;color:#999;">
        Climatisation Khalil — climatisationkhalil.fr
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        reply_to: email,
        subject: `Estimation demandée — ${safe}`,
        html
      })
    });

    if (!res.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: await res.text() }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
};
