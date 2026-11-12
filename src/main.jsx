import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, Phone, Snowflake, Thermometer, Wind, Wrench,
  Zap, ShieldCheck, Users, Settings, Award, MapPin, FileText, CalendarDays,
  Check, Star, Clock3, Menu, X, Play, Quote,
  ChevronDown, ClipboardCheck, BadgeCheck, Mail, Sparkles
} from "lucide-react";
import "./style.css";

const asset = (name) => import.meta.env.BASE_URL + name;

const TEL_AFFICHE = "07 66 84 68 56";
const TEL_LIEN = "tel:+33766846856";
const WHATSAPP_LIEN = "https://wa.me/33766846856?text=Bonjour%2C%20je%20vous%20contacte%20depuis%20votre%20site%20au%20sujet%20d%E2%80%99une%20climatisation.";
const EMAIL_CONTACT = "depannage06contact@gmail.com";
// Même adresse que le <link rel="preload"> d'index.html : ne pas la modifier séparément.
const heroImage = asset("hero-clim.jpg");
const services = [
  { icon: Snowflake, title: "Climatisation", kicker: "Enfin des nuits fraîches en été", text: "Installation, remplacement et mise en service de systèmes de climatisation réversible, adaptés à votre intérieur.", image: asset("photos/clim-maison.jpg"), points: ["Étude de la configuration de votre logement", "Sélection d’un équipement adapté", "Installation soignée et mise en service"] },
  { icon: Thermometer, title: "Pompes à chaleur", kicker: "Chauffer mieux, consommer moins", text: "Des solutions de chauffage et de rafraîchissement pensées pour votre confort et votre consommation.", image: asset("photos/pompe-a-chaleur.jpg"), points: ["Conseil selon vos besoins thermiques", "Équipements performants", "Accompagnement de votre projet"] },
  { icon: Wind, title: "Ventilation", kicker: "Respirer un air sain chez soi", text: "Des solutions de renouvellement d’air pour améliorer le confort de votre habitat ou de vos locaux professionnels.", image: asset("photos/clim-appartement.jpg"), points: ["Analyse de vos espaces", "Solution adaptée à votre activité", "Installation et réglages"] },
  { icon: Wrench, title: "Entretien & dépannage", kicker: "Une clim qui dure et reste efficace", text: "Un suivi régulier et une assistance pour maintenir les performances et la fiabilité de vos installations.", image: asset("photos/clim-local-pro.jpg"), points: ["Entretien des équipements", "Diagnostic de dysfonctionnement", "Conseils pour prolonger leur durée de vie"] }
];
// Packs à prix d'appel : les deux suivent le même gabarit (confort, silence, pilotage).
const packs = [
  { nom: "Pack Confort", marque: "Midea", logo: "packs/logo-midea.png", modele: "Midea Elegance", puissance: "2,5 kW", reference: "MSAGSAU-09HRDN8", prix: "1 290", photo: "packs/midea-elegance.jpg",
    atouts: ["Chauffe l’hiver, rafraîchit l’été", "Silencieux, jusqu’à 22 dB(A)¹", "Pilotage Wi-Fi depuis le téléphone"] },
  { nom: "Pack Performance", marque: "Daikin", logo: "packs/logo-daikin.png", modele: "Daikin Sensira", puissance: "2,5 kW", reference: "FTXC25E", prix: "1 990", photo: "packs/daikin-sensira.jpg", echelle: .88,
    atouts: ["Chauffe l’hiver, rafraîchit l’été", "Silencieux, jusqu’à 20 dB(A)¹", "Pilotage depuis le téléphone (Onecta)"] }
];
// Catalogue sans prix, groupé par fabricant. `unites` dessine le schéma ; `pack` relie une référence à son pack.
const catalogue = [
  { marque: "Midea", logo: "packs/logo-midea.png", photo: "packs/gamme-midea.jpg", texte: "De l’Elegance pour une pièce au Xtreme Pro pour trois pièces.", references: [
    { type: "Monosplit", detail: "2,5 kW · 9000 Btu", unites: 1, gamme: "Elegance", reference: "MSAGSAU-09HRDN8", options: ["Wi-Fi"], pack: "Pack Confort" },
    { type: "Monosplit", detail: "3,5 kW · 12000 Btu", unites: 1, gamme: "Evolution", reference: "MSAGXBU-12HRDN8", options: ["R-32", "Wi-Fi"] },
    { type: "Bi-split", detail: "2 unités 12000 Btu", unites: 2, gamme: "Xtreme Pro", reference: "Groupe M2OE-18HFN8-Q", options: ["R-32", "Wi-Fi"] },
    { type: "Tri-split", detail: "3 unités 12000 Btu", unites: 3, gamme: "Xtreme Pro", reference: "Groupe M3OA-27", options: ["R-32", "Wi-Fi"] }
  ] },
  { marque: "Daikin", logo: "packs/logo-daikin.png", photo: "packs/gamme-daikin.jpg", texte: "La gamme Sensira en monosplit, et les groupes multi-split jusqu’à trois pièces.", references: [
    { type: "Monosplit", detail: "2,5 kW · 9000 Btu", unites: 1, gamme: "Sensira", reference: "FTXC25E", options: ["R-32", "Wi-Fi"], pack: "Pack Performance" },
    { type: "Monosplit", detail: "3,5 kW · 12000 Btu", unites: 1, gamme: "Sensira", reference: "FTXC35E", options: ["R-32", "Wi-Fi"] },
    { type: "Bi-split", detail: "9000 + 9000 Btu", unites: 2, gamme: "Multi-split", reference: "Groupe 2AMXF40A", options: ["R-32", "Wi-Fi"] },
    { type: "Tri-split", detail: "9000 + 9000 + 12000 Btu", unites: 3, gamme: "Multi-split", reference: "Groupe 3AMXF52A", options: ["R-32", "Wi-Fi"] }
  ] }
];
const guideSplit = [
  [1, "Monosplit", "Une pièce : une unité intérieure reliée à son unité extérieure."],
  [2, "Bi-split", "Deux pièces sur un seul groupe extérieur, chacune réglée à sa température."],
  [3, "Tri-split", "Trois pièces, un seul groupe dehors : moins d’appareils en façade."]
];

// Schéma d'installation : `unites` unités murales reliées à un seul groupe extérieur.
function SchemaSplit({ unites }) {
  const hauts = { 1: [21], 2: [12, 30], 3: [5, 21, 37] }[unites];
  return <svg className="cat-schema" viewBox="0 0 64 48" aria-hidden="true">
    {hauts.map(y => <g key={y}><rect x="3" y={y} width="20" height="7" rx="2"/><path d={`M23 ${y + 3.5}H33V24H43`}/></g>)}
    <rect x="43" y="15" width="18" height="18" rx="2.5"/><circle cx="52" cy="24" r="4.5"/>
  </svg>;
}
const reasons = [
  [Clock3, "Joignable 7j/7", "De 8h à 20h, week-end compris"],
  [Award, "Des marques fiables", "Daikin, Mitsubishi Electric, Atlantic"],
  [MapPin, "Une entreprise locale", "Nice et toute la Côte d’Azur"],
  [FileText, "Devis clair", "Le prix est fixé avant le début des travaux"]
];
const projects = [
  { title: "Climatisation maison individuelle", city: "Nice", image: asset("photos/clim-maison.jpg") },
  { title: "Pompe à chaleur", city: "Antibes", image: asset("photos/pompe-a-chaleur.jpg") },
  { title: "Climatisation appartement", city: "Cannes", image: asset("photos/clim-appartement.jpg") },
  { title: "Climatisation local professionnel", city: "Sophia Antipolis", image: asset("photos/clim-local-pro.jpg") }
];
const faqs = [
  ["Quel est le prix d’une installation de climatisation ?", "Le prix dépend notamment du type d’équipement, du nombre d’unités, de la configuration des lieux et des contraintes de pose. Après échange sur votre besoin, nous pouvons établir une proposition adaptée."],
  ["Faut-il entretenir régulièrement sa climatisation ?", "Oui. Un entretien régulier permet de préserver le bon fonctionnement de l’installation, son efficacité et la qualité de l’air. La fréquence et les opérations à prévoir dépendent de votre équipement et de son usage."],
  ["Combien de temps dure une installation ?", "La durée varie selon le nombre d’unités, l’accessibilité et les travaux nécessaires. Une estimation plus précise vous sera communiquée après étude de votre projet."],
  ["Intervenez-vous auprès des professionnels ?", "Oui, les projets des particuliers comme des professionnels sont concernés : logements, bureaux, commerces et autres locaux d’activité."],
  ["Dans quelles villes intervenez-vous ?", "Atelier du Climat intervient sur la Côte d’Azur. Contactez-nous pour confirmer la prise en charge de votre commune et les disponibilités."],
  ["Comment obtenir un devis ?", "Vous pouvez nous appeler ou remplir le formulaire de demande de devis. Nous reviendrons vers vous pour comprendre votre besoin et définir la suite à donner."]
];
const villes = [["Nice", "nice"], ["Cannes", "cannes"], ["Antibes", "antibes"], ["Cagnes-sur-Mer", "cagnes-sur-mer"], ["Grasse", "grasse"], ["Menton", "menton"], ["Monaco", "monaco"], ["Sophia Antipolis", "sophia-antipolis"]];
const nav = [["Accueil", "#accueil"], ["Prestations", "#prestations"], ["Nos offres", "#offres"], ["Réalisations", "#realisations"], ["À propos", "#apropos"], ["Contact", "#contact"]];

const teintes = ["#d32f2f", "#e8761a", "#3b9be6", "#1f86ea", "#087df0"];   // du chaud au froid
const etapes = [
  [Phone, 32, "Premier échange", "Vous nous présentez votre besoin et vos attentes."],
  [ClipboardCheck, 29, "Étude du projet", "Nous étudions vos espaces et les solutions possibles."],
  [FileText, 27, "Devis clair", "Le prix est fixé avant le début des travaux."],
  [Wrench, 24, "Installation", "La pose est réalisée avec soin et méthode."],
  [Check, 22, "Mise en service", "Nous vérifions tout et vous expliquons l’utilisation."]
];

// Le déroulé se lit comme un thermostat : la température baisse à mesure que l'on fait défiler la section.
function Deroule() {
  const section = useRef(null);
  const [avance, setAvance] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setAvance(1); return; }
    const mesurer = () => {
      const r = section.current.getBoundingClientRect();
      setAvance(Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / Math.max(r.height * 0.75, innerHeight * 0.55))));
    };
    mesurer();
    addEventListener("scroll", mesurer, { passive: true });
    addEventListener("resize", mesurer);
    return () => { removeEventListener("scroll", mesurer); removeEventListener("resize", mesurer); };
  }, []);
  const temperature = Math.round(32 - 10 * avance);
  return <section className="process section" ref={section} style={{"--avance": avance}}>
    <div className="section-heading"><h2>Simple, du premier appel à la mise en route</h2><p>Suivez le thermomètre : de la canicule à la bonne température, en cinq étapes.</p></div>
    <div className="deroule">
      <div className="deroule-piste" aria-hidden="true"><div className="deroule-remplissage"/><div className="deroule-curseur" style={{background: teintes[Math.round(avance * 4)]}}>{temperature}°C</div></div>
      <ol className="deroule-etapes">{etapes.map(([Icon, degres, titre, texte], i) => <li key={titre} className={avance >= i / 4 - 0.02 ? "active" : ""} style={{"--teinte": teintes[i]}}><span className="deroule-point"><Icon/></span><span className="deroule-temp">{degres}°C</span><h3>{titre}</h3><p>{texte}</p></li>)}</ol>
    </div>
  </section>;
}

// Apparition au défilement : la classe est posée ici pour ne rien masquer si le JS ne tourne pas.
// Tout ce qui est passé au-dessus du bas de l'écran apparaît, même après un saut d'ancre.
function useApparitions() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let enAttente = [...document.querySelectorAll(".section-heading, .section-top, .service-explorer, .packs-titre, .pack, .cat-guide, .cat-onglets, .technician-photo, .technician-copy, .trust-card, .reason, .deroule, .project-card, .faq-heading, .faq-list, .contact-hero-content, .footer-main > div")];
    enAttente.forEach(el => {
      const rang = [...el.parentElement.children].indexOf(el);
      el.style.setProperty("--delai", `${Math.min(rang, 5) * 70}ms`);
      el.classList.add("apparition");
    });
    let image = 0;
    const verifier = () => {
      image = 0;
      const seuil = innerHeight * 0.92;
      enAttente = enAttente.filter(el => {
        if (el.getBoundingClientRect().top > seuil) return true;
        el.classList.add("visible");
        return false;
      });
      if (!enAttente.length) removeEventListener("scroll", planifier);
    };
    const planifier = () => { if (!image) image = requestAnimationFrame(verifier); };
    addEventListener("scroll", planifier, { passive: true });
    addEventListener("resize", planifier);
    verifier();
    return () => { removeEventListener("scroll", planifier); removeEventListener("resize", planifier); cancelAnimationFrame(image); };
  }, []);
}

function App() {
  useApparitions();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [etatEnvoi, setEtatEnvoi] = useState(null);
  const [produit, setProduit] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [marqueActive, setMarqueActive] = useState(0);
  // `choix` préremplit le devis (pack ou ligne du catalogue) ; les autres boutons l'effacent.
  const openQuote = (suivi = true, choix = null) => { setProduit(choix); setEtatEnvoi(null); setModal(true); if (suivi) window.adcSuivre?.({ event: "click_devis", ...(choix && { produit: choix }) }); };
  const demanderPrix = (choix) => openQuote(true, choix);
  useEffect(() => { if (location.hash === "#devis") openQuote(false); }, []);   // lien « Demander un devis » des pages villes
  const envoyerDemande = async (e) => {
    e.preventDefault();
    const champs = Object.fromEntries(new FormData(e.currentTarget));
    if (champs.botcheck) return;                  // piège à robots
    setEtatEnvoi("envoi");
    try {
      // Netlify Forms : le formulaire « devis » est déclaré en HTML statique dans index.html.
      const reponse = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "devis", ...champs }).toString()
      });
      const envoye = reponse.ok;
      if (envoye) window.adcSuivre?.({ event: "generate_lead", form_name: "devis" });
      setEtatEnvoi(envoye ? "ok" : "echec");
    } catch {
      setEtatEnvoi("echec");
    }
  };

  return <>
    <header className="header">
      <a className="brand" href="#accueil" aria-label="Atelier du Climat - accueil"><img src={asset("logo.png")} alt="Atelier du Climat" width="480" height="179" fetchpriority="high" /></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav open" : "nav"}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <a className="phone" href="tel:+33766846856"><span className="phone-icon"><Phone size={19}/></span><span><b>07 66 84 68 56</b><small>7j/7 · 8h - 20h</small></span></a>
      <button className="btn btn-primary header-cta" onClick={openQuote}>Demander un devis <ArrowRight size={17}/></button>
    </header>

    <main>
      <section className="hero" id="accueil">
        <div className="hero-image" style={{backgroundImage: "url(" + heroImage + ")"}} />
        <div className="hero-fade" />
        <div className="hero-content">
          <span className="eyebrow pill">VIVEZ MIEUX, À LA BONNE TEMPÉRATURE</span>
          <h1><span>Climatisation</span> <span>et pompe à chaleur</span> <span>sur la <em>Côte d’Azur</em></span></h1>
          <p>Installation, entretien et dépannage de climatisation, pompes à chaleur et ventilation sur toute la Côte d’Azur. Nous vous répondons 7j/7, de 8h à 20h.</p>
          <div className="hero-actions"><a className="btn btn-primary" href={TEL_LIEN}><Phone size={18}/> Appeler le {TEL_AFFICHE}</a><a className="btn btn-outline" href="#prestations">Découvrir nos prestations</a></div>
          <div className="hero-benefits">
            <div><span className="round-icon"><Clock3/></span><span><b>Joignable 7j/7</b><small>De 8h à 20h, même le dimanche</small></span></div>
            <div><span className="round-icon"><ShieldCheck/></span><span><b>Des marques sûres</b><small>Daikin, Mitsubishi Electric, Atlantic</small></span></div>
            <div><span className="round-icon"><Users/></span><span><b>Particuliers & pros</b><small>Maison, appartement, bureau, commerce</small></span></div>
          </div>
        </div>
        <div className="rating-card"><b>Une question ? Appelez-nous.</b><small>7j/7, de 8h à 20h</small></div>
      </section>

      <section className="packs" id="offres" style={{"--fond-packs": `url(${asset("packs/fond-salon.jpg")})`}}>
        <div className="packs-titre"><h2>Nos packs climatisation</h2><span className="tricolore" aria-hidden="true"><i/><i/><i/></span><p>Deux solutions fiables et performantes, installées par nos équipes.</p><a href={TEL_LIEN}>Une question ? {TEL_AFFICHE}</a></div>
        <div className="packs-panneaux">{packs.map(p => <article className="pack" key={p.nom}>
          <div className="pack-vitrine"><img src={asset(p.photo)} alt={`Climatiseur mural ${p.modele}`} style={p.echelle && {scale: String(p.echelle)}} width="1000" height="500" loading="lazy" decoding="async"/></div>
          <img className="pack-logo" src={asset(p.logo)} alt={p.marque} height="30" loading="lazy" decoding="async"/>
          <h3>{p.nom}</h3>
          <p className="pack-modele">{p.modele} · {p.puissance}</p>
          <ul className="pack-atouts" role="list">{p.atouts.map(a => <li key={a}>{a}</li>)}</ul>
          <details className="pack-inclus"><summary>Ce qui est inclus <ChevronDown size={14}/></summary><p>Unité intérieure {p.reference}, unité extérieure, télécommande, pose par nos équipes.</p></details>
          <div className="pack-achat"><small>À partir de</small><p className="pack-prix">{p.prix} €<span>TTC*</span></p><button className="pack-bouton" onClick={() => demanderPrix(`${p.nom} · ${p.modele} ${p.puissance} (${p.reference})`)}>Demander un devis</button></div>
        </article>)}</div>
        <p className="packs-renvoi">* Autres modèles disponibles sur catalogue. Prix TTC, pose incluse, selon faisabilité technique et configuration du logement. Détails et conditions sur devis. ¹ Niveaux sonores minimaux annoncés par les fabricants pour les gammes Elegance et Sensira.</p>
      </section>

      <section className="catalogue" id="catalogue">
        <h2>Notre catalogue climatisation</h2>
        <span className="tricolore" aria-hidden="true"><i/><i/><i/></span>
        <p className="catalogue-intro">Retrouvez nos références par fabricant et demandez un prix pour le modèle souhaité.</p>
        <div className="cat-guide">{guideSplit.map(([unites, titre, texte]) => <div key={titre}><SchemaSplit unites={unites}/><span><b>{titre}</b><p>{texte}</p></span></div>)}</div>
        <div className="cat-onglets" role="tablist">{catalogue.map((m, i) => <button key={m.marque} role="tab" aria-selected={marqueActive === i} onClick={() => setMarqueActive(i)}><img src={asset(m.logo)} alt={m.marque} height="28" decoding="async"/><small>{m.references.length} références</small></button>)}</div>
        {catalogue.map((m, i) => <div className={marqueActive === i ? "cat-marque active" : "cat-marque"} key={m.marque}>
          <button className="cat-accordeon" aria-expanded={marqueActive === i} onClick={() => setMarqueActive(marqueActive === i ? -1 : i)}><span><img src={asset(m.logo)} alt={m.marque} height="24" loading="lazy" decoding="async"/><small>{m.references.length} références</small></span><ChevronDown size={20}/></button>
          <div className="cat-corps">
          <aside className="cat-fiche"><div className="cat-fiche-photo"><img src={asset(m.photo)} alt={`Gamme de climatiseurs ${m.marque}`} loading="lazy" decoding="async"/></div><img className="cat-fiche-logo" src={asset(m.logo)} alt="" height="26" loading="lazy" decoding="async"/><p>{m.texte}</p></aside>
          <ul className="cat-refs" role="list">{m.references.map(r => <li key={r.reference}>
            <SchemaSplit unites={r.unites}/>
            <span className="cat-type"><b>{r.type}</b><span>{r.detail}</span></span>
            <span className="cat-ref"><b>{r.gamme}</b><span>{r.reference}</span>{r.pack && <em>Disponible en {r.pack}</em>}</span>
            <span className="cat-options">{r.options.map(o => <span key={o}>{o}</span>)}</span>
            <button onClick={() => demanderPrix(`${m.marque} ${r.gamme} ${r.type.toLowerCase()} ${r.detail} (${r.reference})`)}>Demander un prix</button>
          </li>)}</ul>
          </div>
        </div>)}
      </section>

      <section className="service-section section" id="prestations">
        <div className="section-heading"><h2>Du frais, du chaud, de l’air pur.</h2><p>Nous étudions, installons et entretenons. Un seul numéro pour tout.</p></div>
        <div className="service-explorer">
          <div className="service-tabs">{services.map(({icon: Icon, title, kicker}, i) => <button className={activeService === i ? "service-tab active" : "service-tab"} key={title} onClick={() => setActiveService(i)}><span className="service-icon"><Icon size={25}/></span><span><b>{title}</b><small>{kicker}</small></span><ArrowUpRight className="tab-arrow" size={18}/></button>)}</div>
          <div className="service-feature" key={activeService}>
            <img src={services[activeService].image} alt={services[activeService].title} loading="lazy" decoding="async"/>
            <div className="service-feature-overlay"/>
            <div className="service-feature-copy"><h3>{services[activeService].title}</h3><p>{services[activeService].text}</p><ul role="list">{services[activeService].points.map(point => <li key={point}>{point}</li>)}</ul><a className="btn btn-primary" href={TEL_LIEN}><Phone size={17}/> En parler au {TEL_AFFICHE}</a></div>
          </div>
        </div>
      </section>


      <section className="technician-section">
        <div className="technician-photo"><img src={heroImage} alt="Salon climatisé avec une unité murale" loading="lazy" decoding="async"/></div>
        <div className="technician-copy"><h2>Chaque intérieur est différent. Votre clim aussi.</h2><p>Avant de vous proposer un appareil, nous étudions votre logement : la surface, l’exposition, l’emplacement des unités. Vous obtenez une installation pensée pour chez vous, pas un modèle standard.</p><ul className="tech-points" role="list"><li>Une étude adaptée à vos espaces</li><li>Des explications claires à chaque étape</li><li>Une installation pensée dans le détail</li></ul><button className="btn btn-primary" onClick={openQuote}>Échanger sur mon projet <ArrowRight size={17}/></button></div>
      </section>

      <section className="trust-section" id="apropos"><div className="trust-inner"><div className="trust-card"><h2>Pourquoi nous appeler</h2><span className="tricolore" aria-hidden="true"><i/><i/><i/></span><p>Un interlocuteur joignable 7j/7, un devis clair avant toute intervention, et des marques qui ont fait leurs preuves.</p><a className="btn btn-light" href={TEL_LIEN}><Phone size={16}/> Nous appeler <ArrowRight size={16}/></a></div><div className="reason-grid">{reasons.map(([Icon, title, text]) => <div className="reason" key={title}><span className="round-icon"><Icon/></span><span><b>{title}</b><small>{text}</small></span></div>)}</div></div></section>

      <Deroule/>


      <section className="projects section" id="realisations"><div className="section-top"><div><h2>Des projets qui prennent forme</h2><p className="section-subtitle">Quelques exemples de projets et d’environnements à équiper.</p></div><a href={TEL_LIEN}><Phone size={15}/> Présenter mon projet <ArrowRight size={16}/></a></div><div className="project-grid">{projects.map(p => <article className="project-card" key={p.title}><img src={p.image} alt={p.title} loading="lazy" decoding="async" width="500" height="333"/><div><b>{p.title}</b><span>{p.city}</span></div></article>)}</div></section>


      <section className="faq-section section" id="faq"><div className="faq-heading"><h2>Les questions que vous nous posez souvent</h2><p>Tout ce qu’il faut savoir avant de lancer votre projet.</p><a className="btn btn-outline" href={TEL_LIEN}><Phone size={16}/> Poser votre question</a></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={activeFaq === i ? "faq-item open" : "faq-item"} key={q}><button onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}><span className="faq-index">0{i+1}</span><b>{q}</b><ChevronDown size={19}/></button>{activeFaq === i && <p>{a}</p>}</div>)}</div></section>

      <section className="contact-hero" id="contact"><img className="contact-hero-img" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=65" alt="" loading="lazy" decoding="async"/><div className="contact-hero-bg"/><div className="contact-hero-content"><h2>Vivez mieux,<br/>à la bonne température.</h2><span className="tricolore" aria-hidden="true"><i/><i/><i/></span><p>Un projet de clim, une panne, un entretien ? Appelez-nous 7j/7 de 8h à 20h, ou demandez votre devis gratuit en ligne.</p><div className="contact-actions"><a className="btn btn-primary" href={TEL_LIEN}><Phone size={17}/> Appeler le {TEL_AFFICHE}</a><button className="btn btn-glass" onClick={openQuote}>Demander un devis gratuit <ArrowRight/></button></div></div></section>
    </main>
    <a className="call-bar" href={TEL_LIEN}><Phone size={18}/> Appeler le {TEL_AFFICHE}</a>
    <a className="wa" href={WHATSAPP_LIEN} target="_blank" rel="noopener" aria-label="Nous écrire sur WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><img src={asset("logo-blanc.png")} alt="Atelier du Climat" width="420" height="156" loading="lazy" decoding="async"/><p>Votre spécialiste climatisation, pompes à chaleur et ventilation sur la Côte d’Azur.</p></div><div><b>Navigation</b>{nav.map(([n, h]) => <a key={h} href={h}>{n}</a>)}<a href={asset("blog.html")}>Blog</a></div><div><b>Nos prestations</b>{services.map(s => <a key={s.title} href="#prestations">{s.title}</a>)}</div><div><b>Villes</b>{villes.map(([nom, slug]) => <a key={slug} href={asset(`climatisation-${slug}.html`)}>Climatisation {nom}</a>)}</div><div><b>Contact</b><a href="tel:+33766846856">07 66 84 68 56</a><a href="mailto:depannage06contact@gmail.com">depannage06contact@gmail.com</a><span>Nice · Alpes-Maritimes</span><span>7j/7 · 8h - 20h</span></div></div><div className="footer-bottom"><span>© 2026 Atelier du Climat. Tous droits réservés.</span><span className="drapeau-mention"><span className="drapeau" aria-hidden="true"><i/><i/><i/></span>Entreprise française, basée à Nice</span><span><a href={asset("mentions-legales.html")}>Mentions légales</a> · <a href={asset("politique-confidentialite.html")}>Politique de confidentialité</a><span data-zone-cookies> · <a href="#" data-open-cookies>Gérer mes cookies</a></span></span></div></footer>

    {modal && <div className="modal-backdrop" onMouseDown={e => {if (e.target === e.currentTarget) setModal(false)}}><div className="quote-modal"><button className="modal-close" onClick={() => setModal(false)} aria-label="Fermer"><X/></button>{etatEnvoi === "ok" ? <div className="success"><span className="success-icon"><Check/></span><h2>Merci pour votre demande !</h2><p>Nous revenons vers vous rapidement. Pour une demande urgente, appelez-nous au <a href={TEL_LIEN}>{TEL_AFFICHE}</a>.</p><button className="btn btn-primary" onClick={() => setModal(false)}>Fermer</button></div> : etatEnvoi === "echec" || <><span className="eyebrow">DEVIS GRATUIT &amp; SANS ENGAGEMENT</span><h2>Parlons de votre projet</h2><p>Quelques informations pour mieux vous accompagner.</p><form onSubmit={envoyerDemande}><input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{display:"none"}} aria-hidden="true"/><div className="form-row"><label>Nom et prénom<input required name="nom" placeholder="Votre nom"/></label><label>Téléphone<input required name="telephone" type="tel" placeholder="06 00 00 00 00"/></label></div><label>Adresse e-mail<input required name="email" type="email" placeholder="vous@exemple.fr"/></label>{produit && <><p className="form-produit">Votre demande concerne <b>{produit}</b></p><input type="hidden" name="modele" value={produit}/></>}<label>Votre besoin<select name="prestation" defaultValue={produit ? "Installation climatisation" : ""}><option value="" disabled>Sélectionnez une prestation</option><option>Installation climatisation</option><option>Pompe à chaleur</option><option>Ventilation</option><option>Entretien / dépannage</option><option>Autre demande</option></select></label><label>Votre message<textarea name="message" rows="3" placeholder="Décrivez-nous votre projet…"/></label><button className="btn btn-primary form-submit" type="submit" disabled={etatEnvoi === "envoi"}>{etatEnvoi === "envoi" ? "Envoi en cours…" : <>Envoyer ma demande <ArrowRight/></>}</button><small className="form-legal">En envoyant ce formulaire, vous acceptez d’être recontacté au sujet de votre demande.</small></form></>}</div></div>}
  </>;
}
createRoot(document.getElementById("root")).render(<App/>);
