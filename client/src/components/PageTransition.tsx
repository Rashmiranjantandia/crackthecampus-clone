import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

/** Branded loading overlay — used as Suspense fallback and for slow navigations */
export function TransitionOverlay() {
  return (
    <div className="page-transition" role="status" aria-live="polite" aria-label="Loading page">
      <div className="transition-glow" />
      <div className="transition-mark" aria-hidden="true">
        <span>›</span>
        <strong>
          CRACK
          <br />
          <i>THE CAMPUS</i>
        </strong>
        <em>✦</em>
      </div>
      <p>
        Loading your next view<span>...</span>
      </p>
      <div className="transition-progress">
        <span />
      </div>
    </div>
  );
}

/** Threshold in ms — only show overlay if navigation takes longer than this */
const SHOW_OVERLAY_THRESHOLD_MS = 100;

export default function PageTransition() {
  const [location, navigate] = useLocation();
  const [loading, setLoading] = useState(false);
  const previous = useRef(location);
  const showTimer = useRef<number | undefined>(undefined);
  const hideTimer = useRef<number | undefined>(undefined);

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

    // Clear any pending timers from previous navigation
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);

    // Only show the overlay if the route change takes longer than the threshold.
    // This prevents the artificial 520ms delay for instant navigations (Issue E fix).
    showTimer.current = window.setTimeout(() => {
      setLoading(true);
      // Auto-hide after a maximum of 600ms in case the page never signals readiness
      hideTimer.current = window.setTimeout(() => setLoading(false), 600);
    }, SHOW_OVERLAY_THRESHOLD_MS);

    // If the component re-renders (page is ready) before the threshold, cancel the overlay
    return () => {
      if (showTimer.current) window.clearTimeout(showTimer.current);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      setLoading(false);
    };
  }, [location]);

  if (!loading) return null;
  return <TransitionOverlay />;
}
