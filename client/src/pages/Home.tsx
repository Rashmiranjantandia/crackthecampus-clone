import { useEffect, useRef, useState } from "react";
import SiteFooter from "../components/SiteFooter";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Menu,
  Play,
  Sparkles,
  X,
} from "lucide-react";

const navItems = [
  { label: "Institution", href: "/institution" },
  { label: "Explore", href: "/explore" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contest", href: "/explore#sec-contests" },
  { label: "Download", href: "/download" },
];

const faqs = [
  {
    question: "What is Crack The Campus?",
    answer:
      "Crack The Campus (CTC) is India's campus-to-career platform that helps engineering students prepare for placements through AI-proctored assessments, structured coding and aptitude practice, skill courses, contests, a recruiter-trusted CTC Score, and job opportunities.",
  },
  {
    question: "Who is Crack The Campus for?",
    answer:
      "CTC is built for engineering students preparing for campus placements and internships, and for colleges that need secure assessments, student performance analytics, and placement-readiness tracking.",
  },
  {
    question: "What is the CTC Score?",
    answer:
      "The CTC Score is a composite placement-readiness credential. It reflects a student's skills, practice consistency, assessment performance, and verified proctored test results, helping recruiters quickly identify job-ready candidates.",
  },
  {
    question: "How does CTC help with campus placements?",
    answer:
      "Students practice aptitude, coding, and technical rounds through timed assessments that mirror real hiring patterns. Colleges can run secure proctored exams, track readiness dashboards, and students can build a CTC Score and apply to opportunities via Job Desk.",
  },
  {
    question: "Does Crack The Campus support aptitude and coding preparation?",
    answer:
      "Yes. The platform covers aptitude, coding, technical preparation, structured learning modules in Skill Center, live contests, archived practice, and AI-guided learning — not coding alone.",
  },
  {
    question: "How are assessments proctored?",
    answer:
      "High-stakes assessments run in the Crack The Campus desktop suite for Windows, macOS, and Linux with AI proctoring and integrity monitoring. It provides a secure, controlled environment similar to real company hiring tests.",
  },
  {
    question: "Is there a free plan on Crack The Campus?",
    answer:
      "Yes. CTC offers a free student plan with no time limit. Students can explore courses, practice, and use core features without a credit card. Paid plans unlock additional premium capabilities.",
  },
  {
    question: "Can colleges and institutions use CTC?",
    answer:
      "Yes. Institutions get an admin suite for assessment creation, batch management, AI-proctored exams, curriculum enrichment, placement analytics, and student engagement reporting.",
  },
];

const marqueeRowOne = [
  ["Google", "google"], ["Accenture", "accenture"], ["Tata Consultancy Services", "tata-consultancy-services"],
  ["Infosys", "infosys"], ["Wipro", "wipro"], ["Tata", "tata"], ["SAP", "sap"],
] as const;
const marqueeRowTwo = [
  ["Intel", "intel"], ["Meta", "meta"], ["NVIDIA", "nvidia"], ["Cisco", "cisco"], ["VMware", "vmware"],
  ["Dell", "dell"], ["HP", "hp"], ["Samsung", "samsung"], ["PayPal", "paypal"], ["Ericsson", "ericsson"],
] as const;

function CompanyMarquee({ logos, reverse = false }: { logos: readonly (readonly [string, string])[]; reverse?: boolean }) {
  const sequence = (copy: string) => (
    <div className="trust-marquee-sequence" key={copy} aria-hidden={copy === "duplicate"}>
      {logos.map(([name, file], index) => (
        <div className="marquee-logo" title={name} key={`${copy}-${file}-${index}`}>
          <img src={`/assets/marquee/${file}.svg`} alt={`${name} logo`} />
        </div>
      ))}
    </div>
  );
  return <div className={`trust-marquee-track${reverse ? " trust-marquee-track-reverse" : ""}`}>{sequence("primary")}{sequence("duplicate")}</div>;
}

function LogoMark() {
  return <a className="logo-lockup exact-logo-lockup" href="/" aria-label="Crack The Campus home"><img className="exact-logo" src="/assets/lightlogo.png" alt="Crack The Campus" /></a>;
}

function PillButton({
  children,
  href,
  variant = "violet",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "violet" | "outline" | "light";
}) {
  return (
    <a className={`pill-button ${variant}`} href={href}>
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={2.4} />
    </a>
  );
}

function CoreDemoVideo({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }, { threshold: 0.18 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video ref={videoRef} className="core-demo-video" loop muted playsInline preload="metadata" aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  const closeMenu = () => setMobileOpen(false);

  return (
    <div className="ctc-site" id="top">
      {announcementVisible && <div className="announcement">
        <span>Summer coupon</span><span className="announcement-dash">—</span><span className="announcement-copy">Get your discount now.</span>
        <a href="/pricing">Claim on pricing</a>
        <button className="announcement-close" type="button" aria-label="Dismiss promotion" onClick={() => setAnnouncementVisible(false)}><X size={16} /></button>
      </div>}

      <header className="site-header">
        <div className="header-inner">
          <LogoMark />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.label}>{item.label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-link signup-link" href="/signup">Signup</a>
            <a className="header-link contact-link" href="#contact">Contact</a>
            <a className="login-button" href="/login">Login</a>
          </div>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.label} onClick={closeMenu}>{item.label}</a>
            ))}
            <div className="mobile-nav-actions">
              <a href="/signup" onClick={closeMenu}>Signup</a>
              <a href="#contact" onClick={closeMenu}>Contact</a>
              <a className="login-button" href="/login" onClick={closeMenu}>Login</a>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image" role="img" aria-label="Student ready for a career opportunity" />
          <div className="hero-overlay" />
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-content page-shell">
            <div className="hero-copy">
              <p className="eyebrow violet-eyebrow"><span className="eyebrow-dot" /> THE CAMPUS-TO-CAREER OPERATING SYSTEM</p>
              <h1 id="hero-title">Your Fast Track to<br className="hero-break" /> <em>Top Placements.</em></h1>
              <p className="hero-description">Upskill with industry-expert courses and master Corporate Pathways built for your dream companies.</p>
              <p className="hero-note">Build a CTC Score that gets you noticed.</p>
              <div className="hero-actions">
                <PillButton href="/explore">Start Upskilling</PillButton>
                <PillButton href="/signup" variant="outline">Get Started</PillButton>
              </div>
            </div>
            <div className="hero-badge" aria-hidden="true">
              <div className="badge-ring"><span>01</span><span>CTC</span></div>
              <div className="badge-copy"><small>VERIFIED</small><strong>PLACEMENT<br />READINESS</strong></div>
            </div>
          </div>
          <a className="hero-scroll" href="#trust" aria-label="Scroll to trusted companies">
            <span>Scroll to explore</span><ArrowDownRight size={17} />
          </a>
        </section>

        <section className="trust-section page-shell" id="trust" aria-label="Companies hiring CTC candidates">
          <p className="section-kicker">EMPOWERING STUDENTS TO CRACK RECRUITMENT AT…</p>
          <div className="trust-marquee-zone">
            <div className="trust-marquee-fade trust-marquee-fade-left" aria-hidden="true" />
            <div className="trust-marquee-fade trust-marquee-fade-right" aria-hidden="true" />
            <div className="trust-marquee-stack">
              <CompanyMarquee logos={marqueeRowOne} />
              <CompanyMarquee logos={marqueeRowTwo} reverse />
            </div>
          </div>
        </section>

        <section className="dual-core-section page-shell" id="explore" aria-labelledby="dual-core-title">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">DUAL-CORE STRUCTURE</p>
              <h2 id="dual-core-title">One Ecosystem.<br /><em>Two Ways to Win.</em></h2>
            </div>
            <p className="section-intro">Start with open-access learning on the web, then prove your skills in a professional hiring environment.</p>
          </div>
          <div className="core-panels">
            <article className="core-panel web-panel">
              <div className="panel-topline"><span>01 · WEB</span><ArrowUpRight size={19} /></div>
              <div className="panel-visual web-visual">
                <CoreDemoVideo src="/assets/dual-core/Web-version.mp4" label="Crack The Campus web app, dashboard and learning" />
              </div>
              <div className="panel-content">
                <p className="panel-label">WEB APP: COURSES, PRACTICE, AND PATHWAYS IN THE BROWSER.</p>
                <h3>The Web Hub <span>(Learning &amp; Discovery)</span></h3>
                <h4>Your Daily Training Ground</h4>
                <p>Open access to prepare anytime, anywhere.</p>
                <ul>
                  <li><Check size={14} /> AI-Assisted Courses: interactive, industry-mapped modules.</li>
                  <li><Check size={14} /> Corporate Pathways for your dream jobs.</li>
                  <li><Check size={14} /> AI Resume Builder, ready in minutes.</li>
                  <li><Check size={14} /> Unlimited practice assessments.</li>
                </ul>
                <a className="text-link" href="/explore">Explore Courses &amp; Pathways <ArrowRight size={16} /></a>
              </div>
            </article>

            <article className="core-panel software-panel" id="download">
              <div className="panel-topline"><span>02 · SOFTWARE</span><ArrowUpRight size={19} /></div>
              <div className="panel-visual software-visual">
                <CoreDemoVideo src="/assets/dual-core/Software.mp4" label="Crack The Campus Pro-Suite, assessments and hiring tools" />
              </div>
              <div className="panel-content">
                <p className="panel-label">DESKTOP SUITE: ASSESSMENTS, CTC SCORE, AND RECRUITER-READY WORKFLOWS.</p>
                <h3>The Pro-Suite <span>(Performance &amp; Hiring)</span></h3>
                <h4>The Official Hiring Environment</h4>
                <p>The software that secures your placement.</p>
                <ul>
                  <li><Check size={14} /> Official Hiring Drives for top companies.</li>
                  <li><Check size={14} /> Simulated, proctored coding and interview setting.</li>
                  <li><Check size={14} /> High-stakes evaluation that generates your CTC Score.</li>
                  <li><Check size={14} /> Direct placement access through official test scores.</li>
                </ul>
                <a className="text-link" href="/download">Download Software Suite <ArrowRight size={16} /></a>
              </div>
            </article>
          </div>
        </section>

        <section className="contest-section" id="contest" aria-labelledby="contest-title">
          <div className="contest-inner page-shell">
            <div className="contest-copy">
              <p className="section-kicker">THE MONTHLY SPRINT</p>
              <h2 id="contest-title">The Monthly<br /><em>Performance Series.</em></h2>
              <p className="contest-lede">Test your growth, compete with your peers, and win rewards while you upskill.</p>
              <div className="contest-caption"><Sparkles size={16} /> MONTHLY CHALLENGES. REAL REWARDS.</div>
              <p>Every month, we launch a new Corporate Pathway contest. Master the specific tech stack, top the leaderboard, and claim your prize.</p>
              <a className="outline-link" href="/signup">Join the next contest <ArrowUpRight size={17} /></a>
            </div>
            <div className="contest-card">
              <div className="contest-card-head"><span>COMPLETED CHALLENGE:</span><span className="status-pill">CLOSED</span></div>
              <div className="contest-card-title"><small>CORPORATE PATHWAY</small><strong>CTC CONTEST</strong></div>
              <div className="contest-card-rule" />
              <div className="contest-details"><div><small>SERIES WINDOW</small><strong>Closed</strong></div><div><small>BOUNTIES</small><strong>Hardware &amp; scholarships</strong></div></div>
              <div className="leaderboard-title"><span>LEADERBOARD PREVIEW</span><span>PTS</span></div>
              <div className="leader-row"><span><b>01</b> PRI****YA</span><strong>8</strong></div>
              <div className="leader-row"><span><b>02</b> ARJ****AN</span><strong>7.8</strong></div>
              <div className="leader-row"><span><b>03</b> NEH****RI</span><strong>7.2</strong></div>
              <div className="contest-card-footer"><span>All deadlines UTC</span><ArrowUpRight size={16} /></div>
            </div>
          </div>
        </section>

        <section className="score-section page-shell" id="pricing" aria-labelledby="score-title">
          <div className="score-intro">
            <p className="section-kicker">THE WHY</p>
            <h2 id="score-title">Beyond the Resume:<br /><em>The CTC Score.</em></h2>
            <p>Give recruiters a defensible, institution-grade signal. Web Hub builds the foundation; Pro-Suite verifies performance, rolled into one credential.</p>
            <a className="text-link" href="/signup">Build your score <ArrowRight size={16} /></a>
          </div>
          <div className="score-map">
            <div className="score-map-lines" aria-hidden="true"><span /><span /><span /></div>
            <div className="score-node node-skills"><small>01</small><strong>Skills</strong><p>Capability signal mapped from your Web Hub profile, courses, and pathways.</p></div>
            <div className="score-node node-practice"><small>02</small><strong>Practice</strong><p>Consistency and reps recorded in the Web Hub: mocks, drills, and readiness.</p></div>
            <div className="score-node node-software"><small>03</small><strong>Software performance</strong><p>Proctored outcomes and high-stakes results from the Pro-Suite environment.</p></div>
            <div className="score-result"><span>CTC SCORE</span><strong>8.7</strong><small>0.0 — 10.0</small></div>
          </div>
          <p className="score-footnote">Web Hub contributes skills and practice telemetry. Pro-Suite supplies proctored software performance. Together they produce one verified credential recruiters can rely on.</p>
        </section>

        <section className="infrastructure-section" id="institution" aria-labelledby="infra-title">
          <div className="infra-topline page-shell"><p className="section-kicker">ENTERPRISE-GRADE INFRASTRUCTURE</p><span>FOR HIGH-STAKES PLACEMENTS / 2026</span></div>
          <div className="infra-content page-shell">
            <div><h2 id="infra-title">Built for the<br /><em>big moment.</em></h2><p>Powering 1,300+ large-scale candidate drives with 99.9% uptime and zero-latency proctoring.</p></div>
            <div className="infra-metrics"><div><strong>1,300<span>+</span></strong><small>Institutional Drives</small></div><div><strong>Zero-<br />Latency</strong><small>Proctoring Engine</small></div><div><strong>99.9<span>%</span></strong><small>Assessment Reliability</small></div></div>
          </div>
          <div className="infra-marquee" aria-hidden="true"><span>ENGINEERED FOR CONCURRENT PEAK LOADS &amp; GLOBAL INTEGRITY.</span><span>ENGINEERED FOR CONCURRENT PEAK LOADS &amp; GLOBAL INTEGRITY.</span></div>
        </section>

        <section className="faq-section page-shell" id="faq" aria-labelledby="faq-title">
          <div className="faq-intro"><p className="section-kicker">FAQ</p><h2 id="faq-title">Common questions<br /><em>about Crack The Campus</em></h2><p>Everything you need to know about the campus-to-career ecosystem.</p><a className="text-link" href="#contact">Still have a question? <ArrowRight size={16} /></a></div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={faq.question}>
                <button type="button" className="faq-question" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : index)}><span><b>{String(index + 1).padStart(2, "0")}</b>{faq.question}</span><ChevronDown size={19} /></button>
                <div className="faq-answer" hidden={!isOpen}><p>{faq.answer}</p></div>
              </div>;
            })}
          </div>
        </section>
      </main>

      <SiteFooter />

    </div>
  );
}
