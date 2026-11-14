// Paper lantern (chōchin) on a wooden wall bracket, drawn in SVG from Sanskriti's reference.
// Light mode = the lantern is unlit. Pull the tassel (drag it down, or tap / Enter / Space) and it lights up,
// and onToggle(true) tells the page to switch to dark mode. Pull again to turn it off.
//
//   const lantern = mountLantern(hostElement, { lit: false, bracket: true, sound: true, onToggle: (lit) => {} });
//   lantern.setLit(true | false)   lantern.destroy()

import { cordPull } from '../scene/scene-audio.js';

let count = 0;
const RED = '#cf5138', RED_D = '#a93a26', BRANCH = '#5b3a27';
const BODY = 'M116 174 C 50 205, 50 455, 116 490 L 264 490 C 330 455, 330 205, 264 174 Z';
const f = (n) => +n.toFixed(1);

const petal = (r) => `M0 0C${f(-r * .95)} ${f(-r * .35)} ${f(-r * .72)} ${f(-r * 1.05)} ${f(-r * .14)} ${f(-r * 1.02)}L0 ${f(-r * .9)}L${f(r * .14)} ${f(-r * 1.02)}C${f(r * .72)} ${f(-r * 1.05)} ${f(r * .95)} ${f(-r * .35)} 0 0Z`;

function blossom(x, y, r, rot) {
  let s = `<g transform="translate(${x} ${y}) rotate(${rot})">`;
  for (let i = 0; i < 5; i++) s += `<g transform="rotate(${i * 72})"><path d="${petal(r)}" fill="${RED}"/><path d="M0 ${f(-r * .3)}L0 ${f(-r * .7)}" stroke="${RED_D}" stroke-width=".9" opacity=".3"/></g>`;
  s += `<circle r="${f(r * .24)}" fill="#f4d9a8"/>`;
  for (let i = 0; i < 9; i++) {
    const a = (i * 40 + 15) * Math.PI / 180, l = r * .52, cx = f(Math.cos(a) * l), cy = f(Math.sin(a) * l);
    s += `<line x2="${cx}" y2="${cy}" stroke="${RED_D}" stroke-width=".7"/><circle cx="${cx}" cy="${cy}" r="1.1" fill="#f4d9a8"/>`;
  }
  return s + '</g>';
}

function bud(x, y, rot) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0L0-7" stroke="${BRANCH}" stroke-width="1.3"/>` +
    `<ellipse cy="-11" rx="4.2" ry="5.8" fill="${RED}"/><path d="M-3.4-7Q0-4.5 3.4-7" stroke="${BRANCH}" stroke-width="1.6" fill="none"/></g>`;
}

// seigaiha: rows of overlapping circles, each with concentric rings
function waves() {
  const R = 18; let s = '', row = 0;
  for (let y = 444; y <= 520; y += R * 0.5, row++) {
    for (let x = 46 - (row % 2) * R; x <= 350; x += 2 * R) {
      s += `<circle cx="${x}" cy="${y}" r="${R}" fill="#f2d6ae" stroke="${RED}" stroke-width="1.7"/>` +
        `<circle cx="${x}" cy="${y}" r="${R * .68}" fill="none" stroke="${RED}" stroke-width="1.7"/>` +
        `<circle cx="${x}" cy="${y}" r="${f(R * .4)}" fill="none" stroke="${RED}" stroke-width="1.7"/>` +
        `<circle cx="${x}" cy="${y}" r="${f(R * .14)}" fill="${RED}"/>`;
    }
  }
  return s;
}

function strands() {
  let s = '';
  for (let i = 0; i < 16; i++) {
    const x0 = 184 + i * 12 / 15, x1 = 175 + i * 30 / 15 + Math.sin(i * 2.3) * 1.5, y1 = 676 + Math.sin(i * 1.7) * 5;
    s += `<path d="M${f(x0)} 598Q${f(x0 + (x1 - x0) * .3)} 640 ${f(x1)} ${f(y1)}" stroke="${i % 3 === 1 ? '#a8341f' : '#c8452e'}" stroke-width="2.3" stroke-linecap="round" fill="none"/>`;
  }
  return s;
}

function svgMarkup(id, bracket) {
  const ribs = Array.from({ length: 28 }, (_, i) => 185 + i * 11)
    .map((y) => `<path d="M50 ${y}Q190 ${y + 3} 330 ${y}" stroke="#b8763c" stroke-opacity=".32" stroke-width="1.1" fill="none"/>`).join('');
  const seams = [96, 140, 190, 240, 284]
    .map((x) => `<path d="M${x} 174Q${190 + (x - 190) * 1.28} 332 ${x} 490" stroke="#b8763c" stroke-opacity=".1" stroke-width="1" fill="none"/>`).join('');
  const art =
    // Fuji with a snow cap, its base hidden by the waves
    `<path d="M100 452L210 386Q230 370 250 386L330 448L330 520L100 520Z" fill="${RED}"/>` +
    `<path d="M196 394L210 386Q230 370 250 386L264 397L257 402L250 396L244 409L238 398L231 413L224 399L216 407L210 398L203 404Z" fill="#fbf1e2"/>` +
    waves() +
    // cherry branch with twigs, blossoms and buds
    `<path d="M48 370C90 340 122 312 160 290C196 270 228 250 266 228" stroke="${BRANCH}" stroke-width="4.2" fill="none" stroke-linecap="round"/>` +
    `<path d="M118 318Q116 296 122 278M162 289Q170 262 176 242M200 268Q212 262 222 266M236 248Q244 236 238 226M84 345Q76 338 74 330M98 334Q100 360 94 380" stroke="${BRANCH}" stroke-width="2.2" fill="none" stroke-linecap="round"/>` +
    bud(222, 266, 70) + bud(238, 226, -10) + bud(266, 228, 60) + bud(256, 236, 120) + bud(74, 330, -30) + bud(94, 380, 190) + bud(206, 258, 20) +
    blossom(178, 228, 19, 8) + blossom(121, 266, 20, -12) + blossom(150, 314, 16, 22);

  return `<svg class="ltn" viewBox="${bracket ? '0 12 384 688' : '0 40 400 660'}" xmlns="http://www.w3.org/2000/svg" aria-hidden="false">
  <defs>
    <clipPath id="${id}-body"><path d="${BODY}"/></clipPath>
    <radialGradient id="${id}-paper" cx=".5" cy=".45" r=".62"><stop offset="0" stop-color="#fdf0d8"/><stop offset="1" stop-color="#ecc795"/></radialGradient>
    <linearGradient id="${id}-shadeX" x1="0" x2="1"><stop offset="0" stop-color="#8a4f1e" stop-opacity=".42"/><stop offset=".26" stop-color="#8a4f1e" stop-opacity="0"/><stop offset=".7" stop-color="#8a4f1e" stop-opacity="0"/><stop offset="1" stop-color="#8a4f1e" stop-opacity=".38"/></linearGradient>
    <linearGradient id="${id}-shadeY" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8a4f1e" stop-opacity=".22"/><stop offset=".12" stop-color="#8a4f1e" stop-opacity="0"/><stop offset=".88" stop-color="#8a4f1e" stop-opacity="0"/><stop offset="1" stop-color="#8a4f1e" stop-opacity=".26"/></linearGradient>
    <radialGradient id="${id}-litMul" cx=".5" cy=".52" r=".62"><stop offset="0" stop-color="#fff6d8"/><stop offset=".5" stop-color="#ffcf7c"/><stop offset="1" stop-color="#df7f36"/></radialGradient>
    <radialGradient id="${id}-litScr" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#ffecb8" stop-opacity=".95"/><stop offset=".5" stop-color="#ffc878" stop-opacity=".35"/><stop offset="1" stop-color="#ffb45a" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-glow"><stop offset="0" stop-color="#ffb85c" stop-opacity=".55"/><stop offset=".4" stop-color="#ffa04a" stop-opacity=".2"/><stop offset="1" stop-color="#ff963c" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}-bronze" x1="0" x2="1"><stop offset="0" stop-color="#3b2412"/><stop offset=".18" stop-color="#8a5a2e"/><stop offset=".38" stop-color="#c08a52"/><stop offset=".58" stop-color="#7a4c26"/><stop offset="1" stop-color="#2e1d0e"/></linearGradient>
    <linearGradient id="${id}-beam" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#a46e40"/><stop offset=".55" stop-color="#7c4e2a"/><stop offset="1" stop-color="#55331a"/></linearGradient>
    <linearGradient id="${id}-post" x1="0" x2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset=".45" stop-color="#a46e40"/><stop offset="1" stop-color="#5a371c"/></linearGradient>
    <radialGradient id="${id}-bead" cx=".35" cy=".35"><stop offset="0" stop-color="#f0cc92"/><stop offset="1" stop-color="#a8743f"/></radialGradient>
  </defs>
  ${bracket ? `<g class="ltn-bracket">
    <path d="M118 12H384V44H118Z" fill="url(#${id}-beam)"/><rect x="118" y="12" width="9" height="32" fill="#4a2c16"/>
    <path d="M132 21Q220 18 340 23M140 31Q250 34 380 30M126 39Q210 37 300 40" stroke="#4a2a14" stroke-opacity=".38" fill="none"/>
    <rect x="346" y="12" width="38" height="160" fill="url(#${id}-post)"/><rect x="346" y="166" width="38" height="8" fill="#4a2c16"/>
    <path d="M356 48Q353 110 358 162M371 20Q374 92 369 162" stroke="#4a2a14" stroke-opacity=".35" fill="none"/>
    <rect x="180" y="42" width="20" height="6" rx="1.5" fill="url(#${id}-bronze)"/>
  </g>` : ''}
  <g class="ltn-swing">
    <ellipse class="ltn-lit" cx="190" cy="330" rx="235" ry="250" fill="url(#${id}-glow)"/>
    <g stroke-linecap="round" fill="none">
      <line x1="190" y1="46" x2="190" y2="59" stroke="#5a3a1f" stroke-width="4.5"/>
      <circle cx="190" cy="70" r="11" stroke="#6a4322" stroke-width="4.2"/><circle cx="190" cy="70" r="11" stroke="#c08a52" stroke-width="1.2" stroke-dasharray="9 60"/>
      <line x1="190" y1="81" x2="190" y2="113" stroke="#5a3a1f" stroke-width="3.6"/>
      <ellipse cx="190" cy="96" rx="4" ry="9" stroke="#7a4c26" stroke-width="2.6"/>
      <path d="M190 113C160 113 132 125 130 156M190 113C220 113 248 125 250 156" stroke="#5a3a1f" stroke-width="3.6"/>
      <path d="M190 113C164 114 138 126 133 150" stroke="#c08a52" stroke-width="1" opacity=".7"/>
    </g>
    <circle cx="130" cy="156" r="3.4" fill="#5a3a1f"/><circle cx="250" cy="156" r="3.4" fill="#5a3a1f"/>

    <g clip-path="url(#${id}-body)" style="isolation:isolate">
      <path d="${BODY}" fill="url(#${id}-paper)"/>
      ${seams}${ribs}
      <g opacity=".93">${art}</g>
      <rect x="40" y="170" width="300" height="324" fill="url(#${id}-shadeX)"/>
      <rect x="40" y="170" width="300" height="324" fill="url(#${id}-shadeY)"/>
      <g class="ltn-lit" style="mix-blend-mode:multiply"><rect x="40" y="170" width="300" height="324" fill="url(#${id}-litMul)"/></g>
      <g class="ltn-lit" style="mix-blend-mode:screen"><rect class="ltn-flame" x="40" y="170" width="300" height="324" fill="url(#${id}-litScr)"/></g>
    </g>

    <rect x="128" y="150" width="124" height="28" rx="3" fill="url(#${id}-bronze)"/>
    <rect x="128" y="150" width="124" height="2.5" fill="#e0ad72" opacity=".55"/><rect x="128" y="175" width="124" height="3" fill="#24160a" opacity=".5"/>
    <circle cx="137" cy="164" r="2.6" fill="#e3b47c"/><circle cx="243" cy="164" r="2.6" fill="#e3b47c"/>
    <rect x="128" y="484" width="124" height="28" rx="3" fill="url(#${id}-bronze)"/>
    <rect x="128" y="484" width="124" height="3" fill="#24160a" opacity=".5"/><rect x="128" y="509" width="124" height="2.5" fill="#e0ad72" opacity=".4"/>
    <circle cx="137" cy="498" r="2.6" fill="#e3b47c"/><circle cx="243" cy="498" r="2.6" fill="#e3b47c"/>
    <ellipse cx="190" cy="512" rx="56" ry="4.5" fill="#2a1a0e"/><ellipse class="ltn-lit" cx="190" cy="512" rx="56" ry="4.5" fill="#ffd58a"/>

    <line class="ltn-cordline" x1="190" y1="514" x2="190" y2="542" stroke="#b8402b" stroke-width="2.8"/>
    <g class="ltn-pull">
      <g class="ltn-cord" role="button" tabindex="0" aria-label="Pull the lantern cord" aria-pressed="false">
        <rect x="140" y="524" width="100" height="168" fill="transparent"/>
        <rect class="ltn-focus" x="152" y="530" width="76" height="156" rx="12" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/>
        <path d="M190 548C176 534 155 537 159 550C163 563 182 557 190 548ZM190 548C204 534 225 537 221 550C217 563 198 557 190 548Z" fill="none" stroke="#c4452f" stroke-width="3.4" stroke-linejoin="round"/>
        <path d="M190 552C182 560 176 566 180 570M190 552C198 560 204 566 200 570" fill="none" stroke="#c4452f" stroke-width="2.6" stroke-linecap="round"/>
        <rect x="183.5" y="541" width="13" height="15" rx="3.5" fill="#b13a26"/><path d="M184 546H196M184 551H196" stroke="#8e2c1c" stroke-width="1.2"/>
        <line x1="190" y1="556" x2="190" y2="568" stroke="#b8402b" stroke-width="2.6"/>
        <circle cx="190" cy="576" r="9" fill="url(#${id}-bead)"/>
        <g class="ltn-tassel">
          <rect x="184" y="584" width="12" height="11" rx="2.5" fill="#b13a26"/>
          ${strands()}
          <rect x="181.5" y="593" width="17" height="5" rx="1.5" fill="#8e2c1c"/>
        </g>
      </g>
    </g>
  </g>
</svg>`;
}

const CSS = `
.ltn{display:block;width:100%;height:auto;overflow:visible;-webkit-tap-highlight-color:transparent;user-select:none}
.ltn .ltn-lit{opacity:0;transition:opacity .45s ease}
.ltn.is-lit .ltn-lit{opacity:1;animation:ltn-ignite .9s ease-out}
@keyframes ltn-ignite{0%{opacity:0}12%{opacity:.7}22%{opacity:.15}40%{opacity:.95}52%{opacity:.5}100%{opacity:1}}
.ltn .ltn-bracket{transition:filter .7s ease}
.ltn.is-lit .ltn-bracket{filter:brightness(.72) saturate(.9)}
.ltn .ltn-cord{cursor:grab;outline:none;touch-action:none}
.ltn .ltn-cord:active{cursor:grabbing}
.ltn .ltn-focus{opacity:0}
.ltn .ltn-cord:focus-visible .ltn-focus{opacity:.6}
`;

export function mountLantern(host, { lit = false, bracket = true, sound = true, onToggle } = {}) {
  if (!document.getElementById('ltn-css')) {
    const st = document.createElement('style'); st.id = 'ltn-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  const id = 'ltn' + (++count);
  host.innerHTML = svgMarkup(id, bracket);
  const svg = host.querySelector('svg');
  const swing = svg.querySelector('.ltn-swing'), pull = svg.querySelector('.ltn-pull'), cord = svg.querySelector('.ltn-cord');
  const cordLine = svg.querySelector('.ltn-cordline'), tassel = svg.querySelector('.ltn-tassel'), flame = svg.querySelector('.ltn-flame');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let a = 0, va = 0, p = 0, vp = 0, tz = 0, vtz = 0;
  let dragging = false, startY = 0, startT = 0, pulled = false, raf = 0, last = performance.now();

  function apply(on, fromUser) {
    lit = on;
    svg.classList.toggle('is-lit', lit);
    cord.setAttribute('aria-pressed', String(lit));
    cord.setAttribute('aria-label', lit ? 'Pull the lantern cord to turn the light off' : 'Pull the lantern cord to turn the light on');
    if (fromUser) {
      if (sound) cordPull(lit);
      va += lit ? 0.35 : -0.35;  // the pull sets the lantern swinging
      onToggle?.(lit);
    }
  }
  apply(lit, false);

  const toSvgY = (clientY) => clientY * (svg.viewBox.baseVal.height / svg.getBoundingClientRect().height);

  function down(e) {
    dragging = true; pulled = false; startY = toSvgY(e.clientY); startT = performance.now();
    cord.setPointerCapture?.(e.pointerId); e.preventDefault();
  }
  function move(e) {
    if (!dragging) return;
    const d = toSvgY(e.clientY) - startY;
    p = d > 0 ? 58 * (1 - Math.exp(-d / 46)) : Math.max(-4, d * 0.2); // stretchy, with resistance
    vp = 0;
    if (!pulled && p > 26) { pulled = true; apply(!lit, true); }    // switch the moment the cord gives
  }
  function up() {
    if (!dragging) return;
    dragging = false;
    if (!pulled && p < 6 && performance.now() - startT < 400) tap(); // a tap is a quick pull
  }
  function tap() { vp = 9; vtz += 2.5; apply(!lit, true); }
  function key(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } }
  function hover() { if (!dragging) { vtz += 0.8; va += 0.04; } }

  cord.addEventListener('pointerdown', down);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  cord.addEventListener('keydown', key);
  cord.addEventListener('pointerenter', hover);

  function frame(now) {
    const dt = Math.min(2.5, (now - last) / 16.67); last = now;
    const breeze = reduce ? 0 : Math.sin(now / 1900) * 0.7 + Math.sin(now / 3100 + 1) * 0.45;   // degrees
    va += (-(a - breeze) * 0.012 - va * 0.035) * dt; a += va * dt;                               // the lantern swings slowly
    if (!dragging) { vp += (-p * 0.16 - vp * 0.2) * dt; p += vp * dt; }                          // the cord springs back
    vtz += (-(tz + a * 1.4) * 0.09 - vtz * 0.12 + (dragging ? 0 : -vp * 0.05)) * dt; tz += vtz * dt; // the tassel trails behind
    if (reduce) { a = 0; tz = 0; }
    swing.setAttribute('transform', `rotate(${f(a)} 190 46)`);
    pull.setAttribute('transform', `translate(0 ${f(p)})`);
    cordLine.setAttribute('y2', f(542 + p));
    tassel.setAttribute('transform', `rotate(${f(Math.max(-14, Math.min(14, tz)))} 190 588)`);
    if (lit && !reduce) flame.setAttribute('opacity', f(0.86 + Math.sin(now / 130) * 0.05 + Math.sin(now / 47) * 0.04 + (Math.random() - 0.5) * 0.05));
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    setLit: (on) => apply(!!on, false),
    get lit() { return lit; },
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      host.innerHTML = '';
    },
  };
}
