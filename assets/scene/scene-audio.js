// Sound for the Fuji scenes, made with Web Audio (no audio files).
//   chime()          wind bells: a few soft bell strikes on a pentatonic scale
//   setAmbient(on)   a gentle breeze with occasional birdsong, like Mythili's "park sound"
//   setNightSound(on) birdsong becomes crickets at night
// Browsers only allow sound after the visitor clicks or taps, so call these from a click handler.

let ctx = null, master = null, ambient = null, isNight = false;

function audio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function chime() {
  try {
    const a = audio(), now = a.currentTime;
    const notes = [659.3, 783.99, 880, 987.77, 1174.66, 1318.51]; // E5 G5 A5 B5 D6 E6
    for (let n = 0; n < 4; n++) {
      const f = notes[(Math.random() * notes.length) | 0], t0 = now + n * (0.09 + Math.random() * 0.12);
      [[1, 0.2], [2.76, 0.06], [5.4, 0.025]].forEach(([mult, amp]) => {
        const o = a.createOscillator(), g = a.createGain();
        o.type = 'sine'; o.frequency.value = f * mult;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(amp, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.4 / mult);
        o.connect(g).connect(master); o.start(t0); o.stop(t0 + 2.6);
      });
    }
  } catch { /* no audio */ }
}

// a short sparrow chirp: two quick rising-falling whistles
export function chirp(pan = 0) {
  try {
    const a = audio(), t0 = a.currentTime + Math.random() * 0.05;
    const p = a.createStereoPanner ? a.createStereoPanner() : null; if (p) { p.pan.value = pan; p.connect(master); }
    for (let k = 0; k < 2 + ((Math.random() * 2) | 0); k++) {
      const o = a.createOscillator(), g = a.createGain(), t = t0 + k * 0.11, base = 2600 + Math.random() * 900;
      o.type = 'sine';
      o.frequency.setValueAtTime(base, t); o.frequency.exponentialRampToValueAtTime(base * 1.45, t + 0.04); o.frequency.exponentialRampToValueAtTime(base * 0.9, t + 0.08);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      o.connect(g).connect(p || master); o.start(t); o.stop(t + 0.1);
    }
  } catch { /* no audio */ }
}

export function setAmbient(on) {
  try {
    if (on && !ambient) {
      const a = audio();
      // breeze: filtered noise with a slow swell
      const len = a.sampleRate * 2, buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const src = a.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520;
      const g = a.createGain(); g.gain.value = 0.035;
      const lfo = a.createOscillator(), lfoGain = a.createGain(); lfo.frequency.value = 0.08; lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain).connect(g.gain); src.connect(lp).connect(g).connect(master); src.start(); lfo.start();
      // birdsong every few seconds
      // birdsong by day, crickets by night
      const timer = setInterval(() => { if (isNight) { if (Math.random() < 0.8) cricket(Math.random() * 1.6 - 0.8); } else if (Math.random() < 0.6) chirp(Math.random() * 1.6 - 0.8); }, 2600);
      ambient = { src, lfo, timer };
    } else if (!on && ambient) {
      ambient.src.stop(); ambient.lfo.stop(); clearInterval(ambient.timer); ambient = null;
    }
  } catch { /* no audio */ }
}

export const ambientOn = () => !!ambient;
// switch the ambience between day (birdsong) and night (crickets)
export function setNightSound(on) { isNight = !!on; }

// a cricket: a high tone pulsed in quick bursts of three or four chirps
export function cricket(pan = 0) {
  try {
    const a = audio(), p = a.createStereoPanner ? a.createStereoPanner() : null; if (p) { p.pan.value = pan; p.connect(master); }
    const f0 = 4300 + Math.random() * 600, t0 = a.currentTime + Math.random() * 0.2;
    for (let c = 0; c < 2 + ((Math.random() * 2) | 0); c++) {
      const tc = t0 + c * 0.42;
      for (let k = 0; k < 4; k++) {
        const t = tc + k * 0.045, o = a.createOscillator(), g = a.createGain();
        o.type = 'sine'; o.frequency.value = f0;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.022, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
        o.connect(g).connect(p || master); o.start(t); o.stop(t + 0.04);
      }
    }
  } catch { /* no audio */ }
}

// suzu: the bright, jingly shrine bell that hangs from a torii (many high partials, a fast shimmer)
export function suzu() {
  try {
    const a = audio(), now = a.currentTime;
    for (let n = 0; n < 7; n++) {
      const t0 = now + n * 0.045 + Math.random() * 0.03, f = 2400 + Math.random() * 1800;
      [[1, 0.06], [1.51, 0.03], [2.3, 0.015]].forEach(([mult, amp]) => {
        const o = a.createOscillator(), g = a.createGain();
        o.type = 'triangle'; o.frequency.value = f * mult;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(amp, t0 + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5 + Math.random() * 0.4);
        o.connect(g).connect(master); o.start(t0); o.stop(t0 + 1);
      });
    }
  } catch { /* no audio */ }
}

function noiseBurst(dur, type, freq, q, peak) {
  const a = audio(), t0 = a.currentTime;
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource(); src.buffer = buf;
  const f = a.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = a.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(peak, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f).connect(g).connect(master); src.start(t0); src.stop(t0 + dur);
}
// leaves rustling when a cherry tree is shaken
export function rustle() { try { noiseBurst(0.6, 'bandpass', 2600, 0.8, 0.08); } catch { /* no audio */ } }
// a small splash when a fish jumps
export function splash() { try { noiseBurst(0.35, 'lowpass', 1400, 0.7, 0.12); } catch { /* no audio */ } }

// bonshō: the deep temple bell. A low strike with inharmonic partials, slow beating and a long tail.
export function templeBell() {
  try {
    const a = audio(), t0 = a.currentTime + 0.02, base = 98;
    [[1, 0.28, 7], [2.0, 0.12, 5], [2.76, 0.09, 4.5], [4.07, 0.05, 3], [5.4, 0.03, 2.2], [0.5, 0.1, 8]].forEach(([mult, amp, dur]) => {
      [0, 0.6].forEach((detune) => { // two slightly detuned copies give the slow "wah-wah" beating of a big bell
        const o = a.createOscillator(), g = a.createGain();
        o.type = 'sine'; o.frequency.value = base * mult + detune;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(amp * 0.6, t0 + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(master); o.start(t0); o.stop(t0 + dur + 0.1);
      });
    });
    noiseBurst(0.12, 'lowpass', 600, 0.7, 0.05); // the wooden striker's thud
  } catch { /* no audio */ }
}

// the lantern's pull cord: a soft click, then a small rising (on) or falling (off) tone
export function cordPull(on) {
  try {
    noiseBurst(0.05, 'highpass', 3200, 0.7, 0.1);
    const a = audio(), t0 = a.currentTime + 0.05, o = a.createOscillator(), g = a.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(on ? 440 : 330, t0); o.frequency.exponentialRampToValueAtTime(on ? 660 : 220, t0 + 0.14);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.06, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
    o.connect(g).connect(master); o.start(t0); o.stop(t0 + 0.4);
  } catch { /* no audio */ }
}

// a hand clap (kashiwade), as visitors do at a shrine
export function clap() { try { noiseBurst(0.09, 'bandpass', 1800, 1.4, 0.22); } catch { /* no audio */ } }
