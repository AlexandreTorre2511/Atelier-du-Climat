/* Formulaire de devis de contact.html → boîte de l'entreprise via Resend.

   MAIL_FROM doit être une adresse sur un domaine vérifié dans Resend.
   Par défaut on utilise onboarding@resend.dev, qui fonctionne sans aucune
   configuration DNS mais n'envoie QUE vers l'adresse du compte Resend.
   Une fois climatisationkhalil.fr vérifié chez Resend, définir dans Netlify :
     MAIL_FROM = Climatisation Khalil <contact@climatisationkhalil.fr>
*/

const MAIL_FROM = process.env.MAIL_FROM || 'Climatisation Khalil <onboarding@resend.dev>';
const MAIL_TO = process.env.MAIL_TO || 'depannage06contact@gmail.com';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Requête invalide' };
  }

  const s = (v) => (v || '').toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const { prenom, nom, email, tel, ville } = data;
  const typeClient = data['type-client'];
  const { gamme, surface, message } = data;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;">
      <div style="background:#0D1F3C;padding:24px 32px;">
        <h1 style="color:#00AEEF;margin:0;font-size:22px;letter-spacing:-0.5px;">Climatisation Khalil</h1>
        <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px;">Nouvelle demande de devis</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr><td style="padding:12px 16px;background:#f4f6f8;font-weight:700;color:#0D1F3C;width:40%;border-radius:4px 0 0 4px;">Prénom</td><td style="padding:12px 16px;background:#f4f6f8;">${s(prenom)}</td></tr>
          <tr><td style="padding:12px 16px;font-weight:700;color:#0D1F3C;">Nom</td><td style="padding:12px 16px;">${s(nom)}</td></tr>
          <tr><td style="padding:12px 16px;background:#f4f6f8;font-weight:700;color:#0D1F3C;">Email</td><td style="padding:12px 16px;background:#f4f6f8;"><a href="mailto:${s(email)}" style="color:#00AEEF;">${s(email)}</a></td></tr>
          <tr><td style="padding:12px 16px;font-weight:700;color:#0D1F3C;">Téléphone</td><td style="padding:12px 16px;">${s(tel) || 'Non renseigné'}</td></tr>
          <tr><td style="padding:12px 16px;background:#f4f6f8;font-weight:700;color:#0D1F3C;">Ville</td><td style="padding:12px 16px;background:#f4f6f8;">${s(ville)}</td></tr>
          <tr><td style="padding:12px 16px;font-weight:700;color:#0D1F3C;">Logement</td><td style="padding:12px 16px;">${s(typeClient) || 'Non renseigné'}</td></tr>
          <tr><td style="padding:12px 16px;background:#f4f6f8;font-weight:700;color:#0D1F3C;">Gamme</td><td style="padding:12px 16px;background:#f4f6f8;">${s(gamme) || 'Non renseigné'}</td></tr>
          <tr><td style="padding:12px 16px;font-weight:700;color:#0D1F3C;">Surface</td><td style="padding:12px 16px;">${s(surface) || 'Non renseigné'}</td></tr>
          <tr><td style="padding:12px 16px;background:#f4f6f8;font-weight:700;color:#0D1F3C;vertical-align:top;">Message</td><td style="padding:12px 16px;background:#f4f6f8;">${s(message) || 'Aucun message'}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#00AEEF;border-radius:8px;text-align:center;">
          <a href="mailto:${s(email)}" style="color:white;font-weight:700;font-size:15px;text-decoration:none;">Répondre à ${s(prenom)}</a>
        </div>
      </div>
      <div style="padding:16px 32px;background:#f4f6f8;text-align:center;font-size:12px;color:#999;">
        Climatisation Khalil — climatisationkhalil.fr
      </div>
    </div>
  `;

  if (!process.env.RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'RESEND_API_KEY absente' }) };
  }

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
        subject: `Nouvelle demande — ${s(prenom)} ${s(nom)} — ${s(ville)}`,
        html
      })
    });

    if (!res.ok) {
      const err = await res.text();
      return { statusCode: 500, body: JSON.stringify({ error: err }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
