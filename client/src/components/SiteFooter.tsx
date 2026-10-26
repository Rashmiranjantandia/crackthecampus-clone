import { ArrowUpRight, MapPin } from "lucide-react";

export default function SiteFooter() {
  return <footer className="site-footer reference-footer" id="contact">
    <div className="footer-top page-shell">
      <div className="footer-brand"><a className="reference-logo" href="/" aria-label="Crack The Campus home"><img src="/assets/lightlogo.png" alt="Crack The Campus" /></a><p>Campus-to-career infrastructure: Web Hub training, Pro-Suite verification, recruiter-trusted scores.</p><div className="footer-socials"><a href="#instagram" aria-label="Instagram">◎</a><a href="#linkedin" aria-label="LinkedIn">in</a><a href="#x" aria-label="X">x</a></div></div>
      <div className="footer-column"><p className="footer-label">PRODUCT</p><a href="/explore">Explore courses</a><a href="/download">Download suite</a><a href="/pricing">Pricing</a><a href="#documentation">Documentation</a><a href="/institution">Institutions</a><a href="#faq">FAQ</a></div>
      <div className="footer-column footer-contact"><p className="footer-label">CONTACT</p><a className="footer-email" href="mailto:info@crackthecampus.com">info@crackthecampus.com</a><p>Partnerships, institutions, and press.</p><address><MapPin size={16} /> <span>Ground Floor, ThiDiff Tech Park<br />Metro Station - Patalamma Temple, near Singasandra<br />Aishwarya Crystal Layout, Singasandra<br />Bengaluru, Karnataka 560068</span></address><a className="map-link" href="https://maps.app.goo.gl/y6P9HgeWedwsfCiz9">Larger map <ArrowUpRight size={14} /></a></div>
      <div className="footer-map"><iframe title="ThiDiff Tech Park map" loading="lazy" src="https://maps.google.com/maps?q=ThiDiff%20Tech%20Park%2C%20Singasandra%2C%20Bengaluru%2C%20Karnataka%20560068%2C%20India&hl=en&z=15&ie=UTF8&output=embed" /></div>
    </div>
    <div className="footer-bottom page-shell"><span>© 2026 Crack The Campus. All rights reserved.</span><span className="footer-legal"><a href="#privacy">Privacy</a><a href="#terms">Terms</a></span></div>
  </footer>;
}
