/* ============================================================
   FORMULAIRE DE DEVIS — page d'accueil
   Envoie vers la même fonction Netlify que le formulaire de la
   page Contact. Le visiteur ne voit « demande envoyée » que si le
   serveur a bien répondu : jamais de faux message de succès.
   ============================================================ */

(function () {
  const form = document.getElementById('devis-form');
  if (!form) return;

  const succes = document.getElementById('devis-success');
  const bouton = form.querySelector('button[type="submit"]');

  const REGLES = {
    prenom:     { test: v => v.trim().length >= 2,  msg: 'Indiquez votre prénom.' },
    nom:        { test: v => v.trim().length >= 2,  msg: 'Indiquez votre nom.' },
    tel:        { test: v => v.replace(/[\s.\-()]/g, '').match(/^(\+?\d{9,15})$/),
                  msg: 'Numéro de téléphone invalide.' },
    email:      { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
                  msg: 'Adresse email invalide.' },
    ville:      { test: v => v.trim().length >= 2,  msg: 'Indiquez votre ville.' },
    prestation: { test: v => v !== '',              msg: 'Choisissez une prestation.' },
  };

  function messageErreur(champ) {
    let p = champ.parentElement.querySelector('.form-erreur');
    if (!p) {
      p = document.createElement('span');
      p.className = 'form-erreur';
      champ.parentElement.appendChild(p);
    }
    return p;
  }

  function valider(champ) {
    const regle = REGLES[champ.name];
    if (!regle) return true;
    const ok = !!regle.test(champ.value);
    champ.setAttribute('aria-invalid', String(!ok));
    const p = messageErreur(champ);
    p.textContent = ok ? '' : regle.msg;
    return ok;
  }

  // On ne signale une erreur qu'une fois le champ quitté : corriger
  // quelqu'un pendant qu'il tape est désagréable.
  form.querySelectorAll('input, select, textarea').forEach(champ => {
    champ.addEventListener('blur', () => { if (champ.value) valider(champ); });
    champ.addEventListener('input', () => {
      if (champ.getAttribute('aria-invalid') === 'true') valider(champ);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const champs = [...form.querySelectorAll('input, select, textarea')]
      .filter(c => REGLES[c.name]);
    const invalides = champs.filter(c => !valider(c));
    if (invalides.length) {
      invalides[0].focus();
      return;
    }

    // Champ leurre : seul un robot le remplit. On fait comme si tout
    // s'était bien passé, sans rien envoyer.
    if (form.elements.societe.value) { form.hidden = true; succes.classList.add('show'); return; }

    const libelle = bouton.textContent;
    bouton.disabled = true;
    bouton.textContent = 'Envoi en cours…';

    const data = {
      prenom: form.elements.prenom.value.trim(),
      nom: form.elements.nom.value.trim(),
      email: form.elements.email.value.trim(),
      tel: form.elements.tel.value.trim(),
      ville: form.elements.ville.value.trim(),
      'type-client': '',
      gamme: form.elements.prestation.value,
      surface: '',
      message: form.elements.message.value.trim(),
    };

    try {
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Réponse ' + res.status);
      form.hidden = true;
      succes.classList.add('show');
      succes.focus?.();
    } catch {
      bouton.disabled = false;
      bouton.textContent = libelle;
      const p = messageErreur(bouton.parentElement);
      p.textContent = "L'envoi a échoué. Appelez-nous au 07 66 84 68 56 ou écrivez à depannage06contact@gmail.com.";
    }
  });
})();
