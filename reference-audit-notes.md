# Reference audit notes

Sources inspected:
- https://crackthecampus.com/
- https://crackthecampus.com/institution
- https://crackthecampus.com/explore
- https://crackthecampus.com/pricing
- https://crackthecampus.com/signup
- https://crackthecampus.com/login
- https://crackthecampus.com/contest
- https://crackthecampus.com/download

Shared reference tokens:
- Main canvas: #0B0B0E; separators: #26262A; primary text: #F4F4F5/#FAFAFA; muted text/nav: #A1A1AA/#71717A; accent: #7C3AED; warm Contest accent: #FDE68A.
- Typeface: Golos Text (fallback stack); standard body 16px/24px, major section heading about 37.6px/43.24px at weight 600, hero support 18px/30.6px.
- Primary purple CTA: 48-55px depending route, #7C3AED, white semibold text, short filter/transform hover.
- Dual-core section actions: 46px, 14px/600, 4px corners; dark translucent outlined Explore button and purple filled Download button.

Trust marquee:
- Reference DOM section uses two `.trust-marquee-track` rows.
- First row: `trust-marquee-scroll`, 42s, linear, infinite, 0% -> -50%.
- Second row: `trust-marquee-scroll-reverse`, 52s, linear, infinite, -50% -> 0%.
- `.trust-marquee-zone:hover .trust-marquee-track, .trust-marquee-zone:hover .trust-marquee-track-reverse { animation-play-state: paused; }`
- Logo SVGs use grayscale(1), opacity .5; hover transitions 300ms to grayscale(0), opacity 1; logo frames are 56px tall and 112px wide at desktop.
- Mobile durations: 34s and 40s.

Dual-core media:
- Exact reference videos: https://static.corp.crackthecampus.com/landing_page_assets/Web-version.mp4 and https://static.corp.crackthecampus.com/landing_page_assets/Software.mp4
- Reference video presentation: 16:9, object-fit cover, object-position top, loop, muted, playsinline, viewport-controlled playback.


Ruby assistant measurements from https://crackthecampus.com/:
- Fixed wrapper uses right/bottom padding around 24px/20px; launcher is approximately 60–62px, violet #7C3AED, fully round, with violet ring/glow.
- Open panel is approximately 352px wide, #0B0B0E, 1px #26262A border, 18px radius, and shadow `0 24px 64px -12px rgba(0,0,0,.75)`.
- Header title is a 15px/600 `Ruby`; subtitle is 11px/400 `Crack The Campus · Assistant`, colored #A1A1AA.
- Initial message is: `Hi — I’m Ruby. Are you exploring Crack The Campus as an Institution or as a student?`
- Initial quick-choice buttons are 318px x 46px, #141418, 1px #26262A border, 14px radius, 13px/400 #E4E4E7 text: `I represent an institution` and `I am a student`.
- The route loading overlay is not part of the reference navbar interaction; navbar clicks use the same shared header treatment and immediate navigation.
