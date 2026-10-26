import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

function TransitionMark() { return <div className="transition-mark" aria-hidden="true"><span>›</span><strong>CRACK<br /><i>THE CAMPUS</i></strong><em>✦</em></div>; }

export default function PageTransition() {
  const [location, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const previous = useRef(location);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;
      let url: URL;
      try { url = new URL(href, window.location.href); } catch { return; }
      if (url.origin !== window.location.origin) return;
      const next = `${url.pathname}${url.search}${url.hash}`;
      if (next === `${window.location.pathname}${window.location.search}${window.location.hash}`) return;
      event.preventDefault();
      navigate(next);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [navigate]);

  useEffect(() => {
    if (previous.current === location) return;
    previous.current = location;
    setLoading(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLoading(false), 520);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [location]);

  if (!loading) return null;
  return <div className="page-transition" role="status" aria-live="polite" aria-label="Loading page"><div className="transition-glow" /><TransitionMark /><p>Loading your next view<span>...</span></p><div className="transition-progress"><span /></div></div>;
}
