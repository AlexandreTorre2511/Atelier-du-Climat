import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, Phone, Snowflake, Thermometer, Wind, Wrench,
  Zap, ShieldCheck, Users, Settings, Award, MapPin, FileText, CalendarDays,
  Check, Star, Clock3, Menu, X, ChevronLeft, ChevronRight, Play, Quote,
  ChevronDown, ClipboardCheck, BadgeCheck, Mail, Sparkles
} from "lucide-react";
import "./style.css";

const asset = (name) => import.meta.env.BASE_URL + name;

// Clé d'accès Web3Forms. Tant qu'elle est vide, le formulaire le dit au
// visiteur et lui donne le téléphone : il ne feint jamais un envoi réussi.
// À obtenir sur https://web3forms.com (gratuit, la clé arrive par e-mail).
const FORM_KEY = "";
const TEL_AFFICHE = "07 66 84 68 56";
const TEL_LIEN = "tel:+33766846856";
const EMAIL_CONTACT = "depannage06contact@gmail.com";
const heroImage = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90";
const services = [
  { icon: Snowflake, title: "Climatisation", kicker: "Un confort idéal en toute saison", text: "Installation, remplacement et mise en service de systèmes de climatisation réversible, adaptés à votre intérieur.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", points: ["Étude de la configuration de votre logement", "Sélection d’un équipement adapté", "Installation soignée et mise en service"] },
  { icon: Thermometer, title: "Pompes à chaleur", kicker: "Mieux maîtriser votre énergie", text: "Des solutions de chauffage et de rafraîchissement pensées pour votre confort et votre consommation.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85", points: ["Conseil selon vos besoins thermiques", "Équipements performants", "Accompagnement de votre projet"] },
  { icon: Wind, title: "Ventilation", kicker: "Un air intérieur plus sain", text: "Des solutions de renouvellement d’air pour améliorer le confort de votre habitat ou de vos locaux professionnels.", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85", points: ["Analyse de vos espaces", "Solution adaptée à votre activité", "Installation et réglages"] },
  { icon: Wrench, title: "Entretien & dépannage", kicker: "Préserver vos équipements", text: "Un suivi régulier et une assistance pour maintenir les performances et la fiabilité de vos installations.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85", points: ["Entretien des équipements", "Diagnostic de dysfonctionnement", "Conseils pour prolonger leur durée de vie"] }
];
const offers = [
  { tag: "CONFORT AU QUOTIDIEN", name: "Daikin Perfera", power: "3,5 kW", price: "Sur devis", brand: "DAIKIN", kind: "Climatisation", bullets: ["Performance énergétique", "Fonctionnement silencieux", "Pilotage à distance selon modèle", "Pour pièces de vie et chambres"] },
  { tag: "DESIGN & PERFORMANCE", name: "Mitsubishi Electric MSZ-LN", power: "3,5 kW", price: "Sur devis", brand: "MITSUBISHI", kind: "Design", bullets: ["Finitions premium", "Technologies de filtration selon modèle", "Contrôle connecté selon configuration", "Confort été comme hiver"] },
  { tag: "SOLUTION ACCESSIBLE", name: "Atlantic Takao", power: "3,5 kW", price: "Sur devis", brand: "ATLANTIC", kind: "Fiable", bullets: ["Solution résidentielle", "Confort thermique au quotidien", "Utilisation simple", "Étude selon votre logement"] },
  { tag: "ÉLÉGANCE", name: "Daikin Stylish", power: "3,5 kW", price: "Sur devis", brand: "DAIKIN", kind: "Design", bullets: ["Format compact", "Design contemporain", "Régulation intelligente selon modèle", "Confort personnalisé"] }
];
const reasons = [
  [Settings, "Expertise technique", "Des conseils et une installation adaptés à votre projet"],
  [Award, "Matériel sélectionné", "Des équipements de marques reconnues"],
  [MapPin, "Ancrage local", "Un service de proximité sur la Côte d’Azur"],
  [FileText, "Devis détaillé", "Une proposition claire avant toute intervention"]
];
const projects = [
  { title: "Climatisation maison individuelle", city: "Nice", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=850&q=85" },
  { title: "Pompe à chaleur", city: "Antibes", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=850&q=85" },
  { title: "Climatisation appartement", city: "Cannes", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=850&q=85" },
  { title: "Climatisation local professionnel", city: "Sophia Antipolis", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=850&q=85" }
];
const faqs = [
  ["Quel est le prix d’une installation de climatisation ?", "Le prix dépend notamment du type d’équipement, du nombre d’unités, de la configuration des lieux et des contraintes de pose. Après échange sur votre besoin, nous pouvons établir une proposition adaptée."],
  ["Faut-il entretenir régulièrement sa climatisation ?", "Oui. Un entretien régulier permet de préserver le bon fonctionnement de l’installation, son efficacité et la qualité de l’air. La fréquence et les opérations à prévoir dépendent de votre équipement et de son usage."],
  ["Combien de temps dure une installation ?", "La durée varie selon le nombre d’unités, l’accessibilité et les travaux nécessaires. Une estimation plus précise vous sera communiquée après étude de votre projet."],
  ["Intervenez-vous auprès des professionnels ?", "Oui, les projets des particuliers comme des professionnels sont concernés : logements, bureaux, commerces et autres locaux d’activité."],
  ["Dans quelles villes intervenez-vous ?", "Atelier du Climat intervient sur la Côte d’Azur. Contactez-nous pour confirmer la prise en charge de votre commune et les disponibilités."],
  ["Comment obtenir un devis ?", "Vous pouvez nous appeler ou remplir le formulaire de demande de devis. Nous reviendrons vers vous pour comprendre votre besoin et définir la suite à donner."]
];
const nav = [["Accueil", "#accueil"], ["Prestations", "#prestations"], ["Nos offres", "#offres"], ["Réalisations", "#realisations"], ["À propos", "#apropos"], ["Contact", "#contact"]];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [offerIndex, setOfferIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [etatEnvoi, setEtatEnvoi] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const visibleOffers = [0, 1, 2].map(i => offers[(offerIndex + i) % offers.length]);
  const openQuote = () => { setEtatEnvoi(null); setModal(true); };
  const envoyerDemande = async (e) => {
    e.preventDefault();
    const champs = Object.fromEntries(new FormData(e.currentTarget));
    if (champs.botcheck) return;                  // piège à robots
    if (!FORM_KEY) { setEtatEnvoi("nonconfigure"); return; }
    setEtatEnvoi("envoi");
    try {
      const reponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `Demande de devis - ${champs.nom || "site"}`,
          ...champs
        })
      });
      const resultat = await reponse.json().catch(() => ({}));
      setEtatEnvoi(reponse.ok && resultat.success ? "ok" : "echec");
    } catch {
      setEtatEnvoi("echec");
    }
  };

  return <>
    <header className="header">
      <a className="brand" href="#accueil" aria-label="Atelier du Climat - accueil"><img src={asset("logo.png")} alt="Atelier du Climat" width="900" height="335" /></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav open" : "nav"}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <a className="phone" href="tel:+33766846856"><span className="phone-icon"><Phone size={19}/></span><span><b>07 66 84 68 56</b><small>Lun - Sam : 8h - 19h</small></span></a>
      <button className="btn btn-primary header-cta" onClick={openQuote}>Demander un devis <ArrowRight size={17}/></button>
    </header>

    <main>
      <section className="hero" id="accueil">
        <div className="hero-image" style={{backgroundImage: "url(" + heroImage + ")"}} />
        <div className="hero-fade" />
        <div className="hero-content">
          <span className="eyebrow pill">VOTRE CONFORT, NOTRE EXPERTISE</span>
          <h1><span>Des solutions de</span> <span>climatisation adaptées</span> <span>à <em>votre quotidien</em></span></h1>
          <p>Installation, remplacement, entretien et dépannage de climatisation, pompes à chaleur et ventilation sur la Côte d’Azur.</p>
          <div className="hero-actions"><a className="btn btn-primary" href={TEL_LIEN}><Phone size={18}/> Appeler le {TEL_AFFICHE}</a><a className="btn btn-outline" href="#prestations">Découvrir nos solutions</a></div>
          <div className="hero-benefits">
            <div><span className="round-icon"><Zap/></span><span><b>Conseil personnalisé</b><small>Une solution adaptée à vos besoins</small></span></div>
            <div><span className="round-icon"><ShieldCheck/></span><span><b>Travail soigné</b><small>Des équipements sélectionnés</small></span></div>
            <div><span className="round-icon"><Users/></span><span><b>Particuliers & pros</b><small>Logements et locaux professionnels</small></span></div>
          </div>
        </div>
        <div className="rating-card"><b>Votre confort, notre priorité</b><small>Un accompagnement de proximité</small></div>
      </section>

      <section className="service-section section" id="prestations">
        <div className="section-heading"><h2>La bonne solution pour votre confort</h2><p>De l’étude de votre besoin à la mise en service, nous vous accompagnons à chaque étape.</p></div>
        <div className="service-explorer">
          <div className="service-tabs">{services.map(({icon: Icon, title, kicker}, i) => <button className={activeService === i ? "service-tab active" : "service-tab"} key={title} onClick={() => setActiveService(i)}><span className="service-icon"><Icon size={25}/></span><span><b>{title}</b><small>{kicker}</small></span><ArrowUpRight className="tab-arrow" size={18}/></button>)}</div>
          <div className="service-feature" key={activeService}>
            <img src={services[activeService].image} alt={services[activeService].title}/>
            <div className="service-feature-overlay"/>
            <div className="service-feature-copy"><h3>{services[activeService].title}</h3><p>{services[activeService].text}</p><ul>{services[activeService].points.map(point => <li key={point}><Check size={16}/>{point}</li>)}</ul><a className="btn btn-primary" href={TEL_LIEN}><Phone size={17}/> En parler au {TEL_AFFICHE}</a></div>
          </div>
        </div>
      </section>

      <section className="offers-section section" id="offres">
        <div className="section-top"><div><h2>Des équipements performants<br/>pour chaque intérieur</h2><p className="section-subtitle">Une sélection de marques reconnues, avec un dimensionnement adapté à votre projet.</p></div><div className="carousel-controls"><a href={TEL_LIEN}><Phone size={15}/> Conseil au {TEL_AFFICHE} <ArrowRight size={16}/></a><button onClick={() => setOfferIndex((offerIndex + offers.length - 1) % offers.length)} aria-label="Offres précédentes"><ChevronLeft/></button><button onClick={() => setOfferIndex((offerIndex + 1) % offers.length)} aria-label="Offres suivantes"><ChevronRight/></button></div></div>
        <div className="offer-grid">{visibleOffers.map(offer => <article className="offer-card" key={offer.name}><span className="offer-tag">{offer.tag}</span><div className="product-visual"><div className="aircon-unit"><span/><i/><b/></div></div><div className="offer-title"><div><h3>{offer.name}</h3><b>{offer.power}</b></div><span className="brand-word">{offer.brand}</span></div><div className="chips"><span>{offer.kind}</span><span>Confort thermique</span><span>Sur étude</span></div><div className="price-row"><div><strong>{offer.price}</strong><p>Installation selon configuration</p></div><button className="btn btn-primary btn-small" onClick={openQuote}>En savoir plus <ArrowRight size={15}/></button></div><ul>{offer.bullets.map(b => <li key={b}><Check size={15}/>{b}</li>)}</ul></article>)}</div>
        <p className="offer-note">Les équipements présentés sont des exemples de solutions. Le choix définitif et le tarif sont établis selon votre projet et la configuration des lieux.</p>
      </section>

      <section className="technician-section">
        <div className="technician-photo"><img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=90" alt="Intervention technique et savoir-faire professionnel"/></div>
        <div className="technician-copy"><h2>Le confort thermique, avec un vrai savoir-faire humain.</h2><p>Chaque logement et chaque local a ses particularités. C’est pourquoi nous prenons le temps de comprendre votre besoin, de vous conseiller et de vous orienter vers une solution cohérente.</p><div className="tech-points"><div><Check/>Une étude adaptée à vos espaces</div><div><Check/>Des explications claires à chaque étape</div><div><Check/>Une installation pensée dans le détail</div></div><button className="btn btn-primary" onClick={openQuote}>Échanger sur mon projet <ArrowRight size={17}/></button></div>
      </section>

      <section className="trust-section" id="apropos"><div className="trust-inner"><div className="trust-card"><span className="eyebrow pill">POURQUOI NOUS CHOISIR</span><h2>Un partenaire de confiance pour votre confort thermique</h2><p>Nous vous accompagnons de la sélection de votre équipement jusqu’à la mise en service, avec un suivi personnalisé et des installations réalisées avec soin.</p><a className="btn btn-light" href={TEL_LIEN}><Phone size={16}/> Nous appeler <ArrowRight size={16}/></a></div><div className="reason-grid">{reasons.map(([Icon, title, text]) => <div className="reason" key={title}><span className="round-icon"><Icon/></span><span><b>{title}</b><small>{text}</small></span></div>)}</div></div></section>

      <section className="process section"><div className="section-heading"><h2>Un accompagnement simple et transparent</h2><p>Vous savez où vous allez, de votre premier contact à la mise en service.</p></div><div className="steps steps-five">{[[Phone,"01","Premier échange","Vous nous présentez votre besoin et vos attentes."],[ClipboardCheck,"02","Étude du projet","Nous étudions vos espaces et les solutions possibles."],[FileText,"03","Devis détaillé","Vous recevez une proposition claire et personnalisée."],[Wrench,"04","Installation","La pose est réalisée avec soin et méthode."],[Check,"05","Mise en service","Nous vérifions l’installation et vous expliquons son fonctionnement."]].map(([Icon, n, title, text], i) => <div className="step" key={n}><div className="step-icon"><Icon/></div><span className="step-number">{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>


      <section className="projects section" id="realisations"><div className="section-top"><div><h2>Des projets qui prennent forme</h2><p className="section-subtitle">Quelques exemples de projets et d’environnements à équiper.</p></div><a href={TEL_LIEN}><Phone size={15}/> Présenter mon projet <ArrowRight size={16}/></a></div><div className="project-grid">{projects.map(p => <article className="project-card" key={p.title}><img src={p.image} alt={p.title}/><div><b>{p.title}</b><span>{p.city}</span></div></article>)}</div></section>


      <section className="faq-section section" id="faq"><div className="faq-heading"><h2>Vous avez des questions ?</h2><p>Les réponses aux questions les plus fréquentes avant de lancer votre projet.</p><a className="btn btn-outline" href={TEL_LIEN}><Phone size={16}/> Poser votre question</a></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={activeFaq === i ? "faq-item open" : "faq-item"} key={q}><button onClick={() => setActiveFaq(activeFaq === i ? -1 : i)}><span className="faq-index">0{i+1}</span><b>{q}</b><ChevronDown size={19}/></button>{activeFaq === i && <p>{a}</p>}</div>)}</div></section>

      <section className="contact-hero" id="contact"><div className="contact-hero-bg"/><div className="contact-hero-content"><h2>Et si on améliorait<br/>votre confort ?</h2><p>Parlons de votre installation, de votre rénovation ou de votre besoin d’entretien. Nous sommes à votre écoute.</p><div className="contact-actions"><a className="btn btn-primary" href={TEL_LIEN}><Phone size={17}/> Appeler le {TEL_AFFICHE}</a><button className="btn btn-glass" onClick={openQuote}>Demander un devis gratuit <ArrowRight/></button></div></div></section>
    </main>
    <a className="call-bar" href={TEL_LIEN}><Phone size={18}/> Appeler le {TEL_AFFICHE}</a>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><img src={asset("logo-blanc.png")} alt="Atelier du Climat" width="900" height="335"/><p>Votre spécialiste climatisation, pompes à chaleur et ventilation sur la Côte d’Azur.</p></div><div><b>Navigation</b>{nav.map(([n, h]) => <a key={h} href={h}>{n}</a>)}</div><div><b>Nos prestations</b>{services.map(s => <a key={s.title} href="#prestations">{s.title}</a>)}</div><div><b>Contact</b><a href="tel:+33766846856">07 66 84 68 56</a><a href="mailto:depannage06contact@gmail.com">depannage06contact@gmail.com</a><span>Nice · Alpes-Maritimes</span><span>Lun - Sam : 8h - 19h</span></div></div><div className="footer-bottom"><span>© 2026 Atelier du Climat. Tous droits réservés.</span><span><a href={asset("mentions-legales.html")}>Mentions légales</a> · <a href={asset("politique-confidentialite.html")}>Politique de confidentialité</a></span></div></footer>

    {modal && <div className="modal-backdrop" onMouseDown={e => {if (e.target === e.currentTarget) setModal(false)}}><div className="quote-modal"><button className="modal-close" onClick={() => setModal(false)} aria-label="Fermer"><X/></button>{etatEnvoi === "ok" ? <div className="success"><span className="success-icon"><Check/></span><h2>Merci pour votre demande !</h2><p>Nous revenons vers vous rapidement. Pour une demande urgente, appelez-nous au <a href={TEL_LIEN}>{TEL_AFFICHE}</a>.</p><button className="btn btn-primary" onClick={() => setModal(false)}>Fermer</button></div> : etatEnvoi === "echec" || etatEnvoi === "nonconfigure" ? <div className="success"><span className="success-icon"><Phone/></span><h2>Contactez-nous directement</h2><p>Votre demande n'a pas pu être transmise. Appelez-nous au <a href={TEL_LIEN}>{TEL_AFFICHE}</a> ou écrivez à <a href={`mailto:${EMAIL_CONTACT}`}>{EMAIL_CONTACT}</a>.</p><button className="btn btn-primary" onClick={() => setEtatEnvoi(null)}>Réessayer</button></div> : <><span className="eyebrow">DEVIS GRATUIT &amp; SANS ENGAGEMENT</span><h2>Parlons de votre projet</h2><p>Quelques informations pour mieux vous accompagner.</p><form onSubmit={envoyerDemande}><input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{display:"none"}} aria-hidden="true"/><div className="form-row"><label>Nom et prénom<input required name="nom" placeholder="Votre nom"/></label><label>Téléphone<input required name="telephone" type="tel" placeholder="06 00 00 00 00"/></label></div><label>Adresse e-mail<input required name="email" type="email" placeholder="vous@exemple.fr"/></label><label>Votre besoin<select name="prestation" defaultValue=""><option value="" disabled>Sélectionnez une prestation</option><option>Installation climatisation</option><option>Pompe à chaleur</option><option>Ventilation</option><option>Entretien / dépannage</option><option>Autre demande</option></select></label><label>Votre message<textarea name="message" rows="3" placeholder="Décrivez-nous votre projet…"/></label><button className="btn btn-primary form-submit" type="submit" disabled={etatEnvoi === "envoi"}>{etatEnvoi === "envoi" ? "Envoi en cours…" : <>Envoyer ma demande <ArrowRight/></>}</button><small className="form-legal">En envoyant ce formulaire, vous acceptez d’être recontacté au sujet de votre demande.</small></form></>}</div></div>}
  </>;
}
createRoot(document.getElementById("root")).render(<App/>);
