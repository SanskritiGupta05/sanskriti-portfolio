import { K } from "./Icons";
import PixelEdge from "./PixelEdge";

function frond(cx: number, cy: number, n: number, len: number) {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = ((-160 + i * (140 / (n - 1))) * Math.PI) / 180;
    const ex = cx + Math.cos(a) * len;
    const ey = cy + Math.sin(a) * len;
    out.push(`M${cx} ${cy} Q${(cx + ex) / 2} ${(cy + ey) / 2 - 14} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
    for (let k = 0.3; k < 1; k += 0.14) {
      const px = cx + (ex - cx) * k;
      const py = cy + (ey - cy) * k - 8 * Math.sin(k * 3.14);
      out.push(
        `M${px.toFixed(1)} ${py.toFixed(1)} l${(Math.cos(a + 0.9) * 7).toFixed(1)} ${(Math.sin(a + 0.9) * 7).toFixed(1)} M${px.toFixed(1)} ${py.toFixed(1)} l${(Math.cos(a - 0.9) * 7).toFixed(1)} ${(Math.sin(a - 0.9) * 7).toFixed(1)}`,
      );
    }
  }
  return out.join(" ");
}

const TILES = (() => {
  const d: string[] = [];
  for (let y = 28; y <= 62; y += 8) {
    const inset = (62 - y) * 0.55;
    for (let x = 48 + inset; x < 332 - inset; x += 10) d.push(`M${x.toFixed(1)} ${y} q5 -6 10 0`);
  }
  return d.join(" ");
})();

function door(x0: number) {
  return (
    <g key={x0}>
      <rect x={x0} y="306" width="80" height="164" className="f-white s-ink" strokeWidth="1.4" />
      <path d={`M${x0} 347 H${x0 + 80} M${x0} 388 H${x0 + 80} M${x0} 429 H${x0 + 80} M${x0 + 40} 306 V470`} className="s-ink" />
      <rect x={x0 + 6} y="436" width="28" height="28" className="f-line" />
      <rect x={x0 + 46} y="436" width="28" height="28" className="f-line" />
    </g>
  );
}

/** Original line-art ramen shop. Steam rises and the noren sways on hover. */
function RamenShop() {
  return (
    <svg className="shop" style={{ filter: "url(#ink-rough)" }} viewBox="0 0 390 500" role="img" aria-label="Line illustration of a small ramen shop">
      <path d="M362 60 V482" className="s-ink2" strokeWidth="8" />
      <path d="M346 92 H380 M350 120 H378" className="s-ink" strokeWidth="2" />
      <circle cx="362" cy="140" r="7" className="f-ink" />
      <path d="M362 96 Q378 110 390 104 M362 124 Q380 140 390 132 M330 150 Q346 160 362 150" className="s-ink" fill="none" />
      <path d="M50 20 H330 L352 70 H28 Z" className="f-line s-ink" strokeWidth="1.6" />
      <path d={TILES} className="s-ink" fill="none" />
      <rect x="22" y="68" width="336" height="8" className="f-ink" />
      <rect x="50" y="76" width="18" height="400" className="f-ink3 s-ink" strokeWidth="1.2" />
      <rect x="312" y="76" width="18" height="400" className="f-ink3 s-ink" strokeWidth="1.2" />
      <rect x="72" y="84" width="236" height="48" className="f-white s-ink" strokeWidth="1.4" />
      <text x="190" y="119" textAnchor="middle" className="shop-sign f-ink">
        ラーメン
      </text>
      <rect x="68" y="138" width="244" height="124" className="f-paper s-ink" strokeWidth="1.2" />
      <rect x="120" y="150" width="130" height="70" className="f-white s-ink" strokeWidth="1.2" />
      <path d={Array.from({ length: 7 }, (_, i) => `M${120 + (i + 1) * 16.25} 150 V220`).join(" ") + " M120 167.5 H250 M120 185 H250 M120 202.5 H250"} className="s-ink" strokeWidth="0.9" />
      <rect x="108" y="226" width="154" height="28" fill="none" className="s-ink" strokeWidth="1.2" />
      <path d={Array.from({ length: 16 }, (_, i) => `M${110 + i * 10} 228 V252`).join(" ")} className="s-ink" strokeWidth="0.9" />
      <g className="shop-sign-hang">
        <path d="M34 150 V140 M82 150 V140" className="s-ink" />
        <rect x="22" y="150" width="72" height="82" fill="#3A3A3A" className="s-ink" strokeWidth="1.4" />
        <path d="M40 192 H76 Q74 214 58 216 Q42 214 40 192 Z" fill="#B8322A" />
        <path d="M46 186 L64 162 M52 188 L70 164" stroke="#F5F2EC" strokeWidth="1.6" />
      </g>
      <rect x="262" y="126" width="62" height="140" fill="#B8322A" className="s-ink" strokeWidth="1.4" />
      <text x="293" y="186" textAnchor="middle" className="shop-banner">
        麺
      </text>
      <text x="293" y="220" textAnchor="middle" className="shop-banner">
        処
      </text>
      <g className="noren">
        <rect x="58" y="270" width="270" height="22" fill="#3A3A3A" className="s-ink" strokeWidth="1.2" />
        <text x="193" y="285" textAnchor="middle" className="shop-welcome">
          いらっしゃいませ
        </text>
      </g>
      <rect x="58" y="292" width="270" height="10" className="f-ink" />
      <rect x="68" y="302" width="244" height="170" className="f-white s-ink" strokeWidth="1.2" />
      {door(70)}
      {door(230)}
      <rect x="150" y="306" width="80" height="164" className="f-line" />
      <path d="M162 318 H218 M166 328 H214 M170 338 H210" className="s-ink" />
      <path d="M180 346 H200 Q198 356 190 357 Q182 356 180 346 Z" fill="#B8322A" />
      <rect x="152" y="384" width="76" height="8" className="f-ink" />
      {[172, 208].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="412" rx="10" ry="3" className="f-ink" />
          <path d={`M${x - 6} 414 L${x - 9} 468 M${x + 6} 414 L${x + 9} 468 M${x - 7} 444 H${x + 7}`} className="s-ink" strokeWidth="1.6" />
        </g>
      ))}
      <rect x="36" y="472" width="312" height="10" className="f-ink3 s-ink" />
      <path d="M300 482 L308 418 H340 L348 482" fill="#B8322A" className="s-ink" strokeWidth="1.4" />
      <path d="M312 446 H336 Q334 462 324 463 Q314 462 312 446 Z" fill="#FFFFFF" />
      <g className="steam">
        <path d="M318 410 q-5 -8 0 -16 q5 -8 0 -16" className="s-ink2" strokeWidth="1.2" fill="none" />
        <path d="M330 410 q-5 -8 0 -16 q5 -8 0 -16" className="s-ink2" strokeWidth="1.2" fill="none" />
      </g>
      <path d={frond(30, 440, 7, 46)} className="s-ink" strokeWidth="1" fill="none" />
      <path d="M14 446 H46 L42 480 H18 Z" fill="#B8322A" className="s-ink" strokeWidth="1.2" />
      <path d={frond(372, 456, 5, 28)} className="s-ink" strokeWidth="1" fill="none" />
      <path d="M360 460 H384 L381 482 H363 Z" fill="#B8322A" className="s-ink" strokeWidth="1.2" />
      <path d="M0 482 H390" className="s-ink" strokeWidth="1.4" />
    </svg>
  );
}

export default function WhyJapan() {
  return (
    <section className="band band-warm" id="why">
      <PixelEdge seed={13} side="top" />
      <div className="col why">
        <RamenShop />
        <div className="why-story">
          <p className="why-kicker">
            <span className="seal brush">和</span>
            <span className="mono">wa — why Japanese design</span>
          </p>
          <h2 className="min why-title">
            Small spaces,
            <br />
            big ideas.
          </h2>
          <p className="glow-line">
            Japanese design taught me to take{" "}
            <K icon="tangle" glow="#3A4F8C">
              complex
            </K>{" "}
            problems and turn them into{" "}
            <K icon="enso" glow="#D9472B" after=",">
              simple
            </K>{" "}
            quietly clever solutions.
          </p>
          <p className="glow-line">
            It started with YouTube videos of{" "}
            <K icon="house" glow="#6A8D3A">
              tiny Japanese homes
            </K>{" "}
            — small rooms where nothing is wasted and every inch works twice.
          </p>
          <p className="glow-line">
            But first came{" "}
            <K icon="sparkle" glow="#D9A21B" after=".">
              anime
            </K>{" "}
            I’ve watched it since childhood, and the freedom of expression it gives creators still goes beyond my imagination.
          </p>
          <p className="glow-line">
            Today I follow{" "}
            <K icon="eye" glow="#3A4F8C">
              Japanese designers
            </K>{" "}
            whose creativity I keep aspiring to. The fascination never wore off.
          </p>
          <a className="pill-btn dark" href="#">
            <span>Why I love Japanese design</span>
            <span className="pill-seal">→</span>
          </a>
          <p className="mono why-note">a 4-minute read · with tiny-house diagrams</p>
        </div>
      </div>
      <PixelEdge seed={17} side="bottom" />
    </section>
  );
}
