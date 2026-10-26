import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Search, SlidersHorizontal } from "lucide-react";
import SiteFooter from "../components/SiteFooter";

const assessments = [
  ["Grid Challenge Practice", "Practice arena"],
  ["Testing-Grid Challenge Practice", "Practice arena"],
  ["Cognitive Challenges - Capgemini", "Practice arena"],
  ["Motion Challenges - Capgemini", "Practice arena"],
  ["Capgemini Game-Based Aptitude", "Campus arena"],
  ["Capgemini diagnostic assessment - Non IT", "Campus arena"],
];
const skills = [
  ["PYTHON", "Python", "Python is a high-level, general-purpose programming language that is popular for its readability and simplicity."],
  ["JAVA", "Java", "Java is a high-level, class-based, object-oriented programming language and computing platform."],
  ["C++", "C++", "C++ is a general-purpose, high-level programming language developed as an extension of the C language."],
  ["APTITUDE AND LOGICAL REASONING", "Aptitude and Logical Reasoning", "Learn and practice aptitude and logical reasoning questions related to trains, speed, distance, and time."],
  ["C PROGRAMMING", "C Programming", "C is a powerful, general-purpose, and procedural programming language developed at Bell Laboratories."],
  ["JAVASCRIPT", "JavaScript", "JavaScript is a lightweight, interpreted, text-based scripting language used to create dynamic interfaces."],
];
const prepDeck = ["Oracle", "LTI Mindtree", "Wipro", "Capgemini", "Infosys", "HCL", "Microsoft"];

function ExploreBrand() { return <a className="explore-brand exact-brand" href="/"><img className="exact-logo" src="/assets/lightlogo.png" alt="Crack The Campus" /></a>; }

export default function Explore() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredAssessments = useMemo(() => assessments.filter(([title, type]) => !query || `${title} ${type}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="explore-site">
    <div className="announcement"><span>Summer coupon — Get your discount now.</span><a href="/#pricing">Claim on pricing <ArrowUpRight size={12} /></a></div>
    <header className="explore-header"><div className="explore-header-inner"><ExploreBrand /><nav><a href="/institution">Institution</a><a className="active" href="/explore">Explore</a><a href="/pricing">Pricing</a><a href="/contest">Contest</a><a href="/download">Download</a></nav><div className="explore-actions"><a href="/signup">Signup</a><a href="#contact">Contact</a><a className="explore-login" href="/login">Login</a></div></div></header>
    <main className="explore-main page-shell">
      <section className="explore-intro"><p className="section-kicker">PUBLIC EXPLORE</p><h1>Gateway to <em>Placement Readiness.</em></h1><p>A real-time window into the CTC ecosystem. Browse verified assessments, industry-grade courses, and live career opportunities. Sign in to track your performance.</p></section>
      <section className="explore-toolbar"><label className="explore-search"><Search size={17} /><input type="search" placeholder="Search assessments, courses, contests, roles…" value={query} onChange={e => setQuery(e.target.value)} /></label><div className="explore-filters">{["All", "Practice & skills", "Contests", "Jobs"].map(item => <button type="button" className={filter === item ? "selected" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><button className="filter-mobile" type="button"><SlidersHorizontal size={16} /> Filters</button></section>

      {(filter === "All" || filter === "Practice & skills") && <section className="explore-section"><div className="explore-section-heading"><div><p className="section-kicker">RANKED ASSESSMENTS</p><h2>Latest assessments</h2></div><span>VERIFIED / CTC SCORE ELIGIBLE</span></div><div className="assessment-grid">{filteredAssessments.map(([title, type], i) => <button className="assessment-card" type="button" key={title}><div className="assessment-top"><span className="rank-badge">♜ RANKED</span><small>#{i + 1} latest</small></div><h3>{title}</h3><p className="card-type">{type}</p><div className="assessment-meta"><span>Time limit: Timed in app</span><span><Check size={12} /> Verified CTC score eligible</span></div><div className="card-open">Open <ArrowUpRight size={14} /></div></button>)}</div>{filteredAssessments.length === 0 && <p className="empty-state">No assessments match your search.</p>}</section>}

      {(filter === "All" || filter === "Practice & skills") && <section className="explore-section skill-section"><div className="explore-section-heading"><div><p className="section-kicker">SKILL CENTER</p><h2>Build your foundation.</h2></div><span>INDUSTRY-MAPPED / SELF-PACED</span></div><div className="skill-grid">{skills.map(([label, title, text], i) => <button className="skill-card" type="button" key={title}><div className={`skill-art art-${i}`}><span>{label}</span><strong>{i < 3 ? "{ }" : "01"}</strong></div><div className="skill-card-content"><span>BEGINNER</span><h3>{title}</h3><p>CTC Skill Track</p><small>Syllabus preview: {text}…</small><ArrowUpRight size={16} /></div></button>)}</div></section>}

      {(filter === "All" || filter === "Contests") && <section className="explore-section contest-explore" id="sec-contests"><div className="explore-section-heading"><div><p className="section-kicker">CONTESTS</p><h2>Pressure-test your skills.</h2></div><span>MONTHLY PERFORMANCE SERIES</span></div><div className="no-contests"><div className="no-contests-mark">✦</div><h3>No upcoming contests right now.</h3><p>Check back soon for a new corporate pathway challenge, leaderboard, and rewards.</p><a href="/contest">See the latest challenge <ArrowRight size={16} /></a></div></section>}

      {(filter === "All" || filter === "Jobs") && <section className="explore-section prep-section"><div className="explore-section-heading"><div><p className="section-kicker">PREP DECK</p><h2>Train for the companies ahead.</h2></div><span>REAL HIRING PATTERNS / PRACTICE</span></div><div className="prep-grid">{prepDeck.map((company, i) => <button type="button" className="prep-card" key={company}><span className={`company-mark company-${i}`}>{company.slice(0, 1)}</span><strong>{company}</strong><span className="prep-action">Start practicing <ArrowUpRight size={14} /></span></button>)}</div><div className="roles-empty"><span>ACTIVE JOB OPENINGS</span><p>No roles match your search.</p></div></section>}
      <section className="explore-pricing"><p>Prefer the full experience?</p><a href="/#pricing">View pricing <ArrowRight size={16} /></a></section>
    </main>
    <SiteFooter />
  </div>;
}
