import { ArrowRight, ArrowUpRight, Check, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import SiteFooter from "../components/SiteFooter";

const partners = ["YALE", "MOODLE", "KHAN ACADEMY", "GOOGLE CLASSROOM", "METROPOLITAN UNIVERSITY", "HARBOR COLLEGE", "SUMMIT INSTITUTE", "PACIFIC UNIVERSITY", "NORTHFIELD COLLEGE", "MERIDIAN INSTITUTE", "STERLING UNIVERSITY", "BEACON COLLEGE", "COURSERA", "UDACITY", "IEEE", "RESEARCHGATE"];

function Brand() { return <a className="inst-brand exact-brand" href="/"><img className="exact-logo" src="/assets/lightlogo.png" alt="Crack The Campus" /></a>; }

function InstPill({ children, href, light = false }: { children: React.ReactNode; href: string; light?: boolean }) {
  return <a className={`inst-pill ${light ? "light" : ""}`} href={href}>{children}<ArrowUpRight size={16} /></a>;
}

const capabilityCards = [
  { number: "01", title: "Institutional Assessment Hosting", capability: "Colleges can upload their own internal tests onto your platform to acclimate students to a professional proctored environment.", outcome: "Every internal exam runs in a supervised environment consistent with what students will see in high-stakes hiring screens.", image: "/assets/institution/Manageexam.png" },
  { number: "02", title: "AI-Proctoring & Malpractice Detection", capability: "Real-time monitoring with behavioral analysis and screen-lock protocols.", outcome: "Ensure your students face real-world pressure in a controlled, safe environment so they never panic during actual hiring.", image: "/assets/institution/Malpractice.png" },
  { number: "03", title: "Pre-Built Assessment Library", capability: "Access thousands of industry-vetted questions to create standard-setting internal exams in minutes.", outcome: "Assemble standard-setting internal exams in less time, using questions that have already been professionally vetted.", image: "/assets/institution/Question-bank.png" },
];

const curriculumCards = [
  { title: "Curricular Integration (The Vault)", text: "Upload your institution's proprietary syllabus, lecture notes, and electives into a secure digital vault. The platform ingests PDFs, videos, and slide decks, then adapts to your teaching depth and style across both niche and core courses." },
  { title: "AI-Enhanced Tutoring", text: "24/7 intelligent support that guides students through college-provided content." },
  { title: "Elite Industry Upskilling", text: "Move beyond the syllabus with specialized tracks that meet global hiring standards." },
];

export default function Institution() {
  return <div className="institution-site">
    <div className="announcement"><span>Summer coupon — Get your discount now.</span><a href="/#pricing">Claim on pricing <ArrowUpRight size={12} /></a></div>
    <header className="inst-header"><div className="inst-header-inner"><Brand /><nav><a className="active" href="/institution">Institution</a><a href="/explore">Explore</a><a href="/pricing">Pricing</a><a href="/contest">Contest</a><a href="/download">Download</a></nav><div className="inst-header-actions"><a href="/signup">Signup</a><a href="#contact">Contact</a><a className="inst-login" href="/login">Login</a></div><a className="inst-mobile-home" href="/">Home</a></div></header>

    <main>
      <section className="inst-hero">
        <div className="inst-hero-image" /><div className="inst-hero-shade" />
        <div className="inst-hero-inner page-shell"><div className="inst-hero-copy"><p className="inst-eyebrow"><ShieldCheck size={14} /> FOR INSTITUTIONS</p><h1>Elevate Your Institution's <em>Placement Intelligence.</em></h1><p className="inst-hero-lede">Empower your faculty with industry-grade tools to upskill students, manage high-integrity assessments, and bridge the gap between curriculum and career.</p><div className="inst-actions"><InstPill href="/signup">Request Institutional Demo</InstPill><InstPill href="#institutional-trust" light>View institutional network</InstPill></div><blockquote>“Transforming academic potential into professional reality through AI-driven evaluation.”</blockquote></div></div>
      </section>

      <section className="institutional-trust page-shell" id="institutional-trust"><p className="section-kicker">PARTNERING WITH FORWARD-THINKING UNIVERSITIES.</p><div className="partner-marquee">{partners.map((partner, i) => <span key={`${partner}-${i}`}>{partner}</span>)}</div><p className="cohort-note"><span>1,300+</span> campus cohorts managed with enterprise reliability.</p></section>

      <section className="command-section page-shell" id="demo"><div className="inst-section-heading"><div><p className="section-kicker">UNIFIED COMMAND CENTER</p><h2>The <em>Management Suite</em></h2></div><p>Go beyond a basic admin view: one professional control layer for your entire campus placement program.</p></div><div className="command-grid"><div className="command-copy"><div className="command-feature"><span>01</span><div><h3>Multi-tier administration</h3><p>Unlimited admin accounts for faculty, HODs, and placement officers to collaborate seamlessly.</p></div></div><div className="command-feature"><span>02</span><div><h3>Centralized oversight</h3><p>A single dashboard to monitor student engagement, course progress, and readiness scores across all departments.</p></div></div><a className="inst-text-link" href="https://admin.crackthecampus.com/home">Open the admin suite <ArrowRight size={16} /></a></div><div className="dashboard-frame"><img src="/assets/institution/Home.png" alt="Management suite dashboard preview" /><span>FULLY CUSTOMIZABLE / MULTI-DEPARTMENTAL WHITE-LABEL SUPPORT</span></div></div></section>

      <section className="integrity-section"><div className="page-shell"><div className="inst-section-heading"><div><p className="section-kicker">INTEGRITY FIRST</p><h2>The <em>Integrity First</em><br />Assessment Engine</h2></div><p>Focus on proctoring technology to remove the fear of malpractice. Students train under real scrutiny so integrity becomes the default, not an afterthought.</p></div><div className="capability-grid">{capabilityCards.map(card => <article className="capability-card" key={card.number}><div className="capability-image"><img src={card.image} alt="" /><span>{card.number}</span></div><p className="capability-label">CAPABILITY</p><h3>{card.title}</h3><p>{card.capability}</p><p className="capability-label outcome-label">LEADERSHIP OUTCOME</p><p className="outcome">{card.outcome}</p></article>)}</div></div></section>

      <section className="academic-section page-shell"><div className="inst-section-heading"><div><p className="section-kicker">ACADEMIC EXCELLENCE</p><h2>Institutional Learning<br /><em>&amp; Curriculum Enrichment</em></h2></div><p>Seamlessly blend your academic curriculum with our AI-powered learning environment.</p></div><div className="curriculum-grid"><div className="vault-visual"><div className="vault-screen"><span>THE VAULT</span><strong>CURRICULUM<br />INTELLIGENCE</strong><div><Check size={13} /> PDF / VIDEO / SLIDE DECKS</div></div><span className="visual-caption">UPLOAD / INGEST / ENRICH</span></div><div className="curriculum-list">{curriculumCards.map((card, i) => <div className="curriculum-card" key={card.title}><span>0{i + 1}</span><div><h3>{card.title}</h3><p>{card.text}</p></div><ChevronRight size={18} /></div>)}</div></div></section>

      <section className="outcomes-section"><div className="page-shell"><div className="inst-section-heading"><div><p className="section-kicker">DATA &amp; OUTCOMES</p><h2>Deep Analytics &amp;<br /><em>Performance Reporting</em></h2></div><p>Make placement readiness visible. Give every department the data it needs to intervene early and celebrate progress.</p></div><div className="outcomes-grid"><div className="analytics-visual"><div className="analytics-bars"><span style={{ height: "44%" }} /><span style={{ height: "63%" }} /><span style={{ height: "78%" }} /><span style={{ height: "91%" }} /><span style={{ height: "100%" }} /></div><div className="analytics-line" /><small>STUDENT READINESS / PERFORMANCE TREND</small></div><div className="outcome-list"><div><strong>01</strong><h3>Granular Student Insights</h3><p>Download detailed performance reports for every individual or batch.</p></div><div><strong>02</strong><h3>Placement Readiness Mapping</h3><p>Identify high-performers and students who need intervention before hiring season begins.</p></div><div><strong>03</strong><h3>Industry Test Readiness</h3><p>Institutional assessments build confidence and familiarity with industry-style test environments.</p></div></div></div></div></section>

      <section className="scale-section page-shell"><p className="section-kicker">SCALE &amp; SECURITY</p><div className="scale-grid"><div><span className="scale-icon"><ShieldCheck size={20} /></span><small>ENTERPRISE SECURITY</small><h3>Enterprise-grade</h3><p>Industry-standard encryption &amp; proctoring integrity.</p></div><div><span className="scale-icon"><Sparkles size={20} /></span><small>INFINITE SCALE</small><h3>Infinite elasticity</h3><p>Engineered to support 100k+ concurrent users. 99.9% uptime SLA.</p></div><div><span className="scale-icon"><ArrowUpRight size={20} /></span><small>MODERN UNIVERSITY</small><h3>Institutional-grade integration</h3><p>Purpose-built for the modern university ecosystem.</p></div></div></section>
    </main>

    <SiteFooter />
  </div>;
}
