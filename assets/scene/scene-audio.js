// Sound for the Fuji scenes, made with Web Audio (no audio files).
//   chime()          wind bells: a few soft bell strikes on a pentatonic scale
//   setAmbient(on)   a gentle breeze with occasional birdsong, like Mythili's "park sound"
// Browsers only allow sound after the visitor clicks or taps, so call these from a click handler.

let ctx = null, master = null, ambient = null;

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
      const timer = setInterval(() => { if (Math.random() < 0.6) chirp(Math.random() * 1.6 - 0.8); }, 2600);
      ambient = { src, lfo, timer };
    } else if (!on && ambient) {
      ambient.src.stop(); ambient.lfo.stop(); clearInterval(ambient.timer); ambient = null;
    }
  } catch { /* no audio */ }
}

export const ambientOn = () => !!ambient;

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
