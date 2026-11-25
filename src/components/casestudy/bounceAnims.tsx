"use client";

import Image from "next/image";
import { useState } from "react";
import {
  C,
  Caption,
  Cursor,
  FrameName,
  HQ,
  NoteCard,
  Pin,
  Screen,
  SectionBox,
  Spotlight,
  Stage,
  Tabs,
} from "./figmaStage";

// The Bounce case study's Figma-style before/after animations, built on the figmaStage kit.
// Each plays when scrolled into view and ends with a Replay button. Screens: public/assets/cases/bounce/v5/hq (3×).

const W = 860;

// box on a phone, from a rect in the screen's 440px-wide design space
const onPhone = (
  px: number,
  py: number,
  pw: number,
  r: [number, number, number, number],
) => {
  const s = pw / 440;
  return { x: px + r[0] * s, y: py + r[1] * s, w: r[2] * s, h: r[3] * s };
};
// box from fractions of a phone (for old screenshots)
const frac = (
  px: number,
  py: number,
  pw: number,
  ph: number,
  f: [number, number, number, number],
) => ({ x: px + f[0] * pw, y: py + f[1] * ph, w: f[2] * pw, h: f[3] * ph });

/* ---------------------------------------------------------------- Design decision #1 · scooter type */

// First idea is shown being used (cursor taps High speed, the licence sheet slides in), then each point
// gets one spotlight in turn (pin in the outer margin, the explanation in the caption bar). It ends on
// clean screens, with nothing left on top of them.
export function ScooterStory() {
  // layout: 24px stage margin; First idea (one phone, 40px gutters for the pins) and What shipped (two
  // phones 40px apart, centred), 16px apart; sections end 24px under the phones; caption 28px below
  const PH = { y: 132, w: 176 };
  const LEFT = { x: 24, y: 72, w: PH.w + 80 };
  const RIGHT = { x: 24 + LEFT.w + 16, y: 72, w: 860 - 48 - LEFT.w - 16 };
  const k = PH.w / 164; // screen heights below are at 164px wide
  const SEC_H = PH.y + 361 * k + 24 - 72;
  const H = 72 + SEC_H + 28 + 58 + 20;
  const P = { x: LEFT.x + 40, y: PH.y, w: PH.w, h: 361 * k }; // first idea: plan screen (crossfades to the sheet)
  const pairX = RIGHT.x + (RIGHT.w - (PH.w * 2 + 40)) / 2;
  const S = { x: pairX, y: PH.y, w: PH.w, h: 353 * k }; // shipped: choose scooter
  const Q = { x: pairX + PH.w + 40, y: PH.y, w: PH.w, h: 361 * k }; // shipped: plan screen with toggle
  const STEP = 1700;
  const T = { cursorIn: 500, click: 1600, sheet: 1800, problem: 4000, shipped: 4000 + 2 * STEP + 300 };
  const T2 = { newStart: T.shipped + 800, end: T.shipped + 800 + 3 * STEP + 300 };
  const toggleHigh = onPhone(P.x, P.y, P.w, [222, 125, 200, 62]);
  const PROBLEMS = [
    { area: onPhone(P.x, P.y, P.w, [16, 123, 408, 66]), text: "The catch: the licence rule stays hidden until you tap High speed." },
    { area: onPhone(P.x, P.y, P.w, [16, 205, 408, 520]), text: "And riders weigh a scooter and a plan at the same time, the load that made them drop off." },
  ];
  const SHIPPED = [
    { phone: S, right: false, area: onPhone(S.x, S.y, S.w, [76, 422, 324, 28]), text: "What shipped: scooter type is its own step, and High speed says Licence required: YES." },
    { phone: S, right: false, area: onPhone(S.x, S.y, S.w, [76, 613, 324, 28]), text: "Low speed sits right below with NO, so the difference is read, not discovered." },
    { phone: Q, right: true, area: onPhone(Q.x, Q.y, Q.w, [16, 123, 408, 66]), text: "The toggle stays on the plan screen for changing your mind: a tick for No licence, amber for Licence needed." },
  ];
  const focusAt = (t: number, start: number, n: number) =>
    t >= start && t < start + n * STEP ? Math.floor((t - start) / STEP) : -1;
  return (
    <Stage w={W} h={H} total={T2.end}>
      {(t, replay, done) => {
        const pF = focusAt(t, T.problem, PROBLEMS.length);
        const sF = focusAt(t, T2.newStart, SHIPPED.length);
        const tab = t < T.problem ? 0 : t < T.shipped ? 1 : 2;
        const caption = done
          ? "Fewer taps doesn't always mean better understanding."
          : pF >= 0
            ? PROBLEMS[pF].text
            : sF >= 0
              ? SHIPPED[sF].text
              : t < T.sheet
                ? "First idea: save a tap. Riders pick a speed right on the plan screen."
                : t < T.problem
                  ? "Tap High speed, and only then does a sheet explain the licence."
                  : "What shipped: decide the scooter first, then the plan.";
        return (
          <>
            <Tabs labels={["First idea", "The problem", "What shipped"]} active={tab} />
            <SectionBox x={LEFT.x} y={LEFT.y} w={LEFT.w} h={SEC_H} label="First idea · fewer taps" />
            <FrameName x={P.x} y={P.y - 20}>
              Select your plan
            </FrameName>
            <Screen
              {...P}
              srcs={["scooter-plan", "scooter-sheet"]}
              active={t >= T.sheet && t < T.problem ? 1 : 0}
              alt="First idea: speed toggle on the plan screen, licence sheet on tap"
              dim={t >= T.shipped && !done}
            />
            <Cursor
              x={t >= T.cursorIn + 300 ? toggleHigh.x + toggleHigh.w * 0.45 : P.x + P.w + 40}
              y={t >= T.cursorIn + 300 ? toggleHigh.y + toggleHigh.h * 0.4 : P.y + 260}
              show={t >= T.cursorIn && t < T.problem - 300}
              clicking={t >= T.click && t < T.click + 400}
            />
            {PROBLEMS.map((n, i) => (
              <span key={n.text}>
                <Spotlight phone={P} area={n.area} color={C.red} show={pF === i} />
                <Pin x={P.x - 13} y={n.area.y + Math.min(n.area.h, 60) / 2 - 12} n={i + 1} show={pF === i} color={C.red} />
              </span>
            ))}

            <SectionBox
              x={RIGHT.x}
              y={RIGHT.y}
              w={RIGHT.w}
              h={SEC_H}
              label="What shipped"
              after
              show={t >= T.shipped}
            />
            <FrameName x={S.x} y={S.y - 20} show={t >= T.shipped}>
              1 · Choose your scooter
            </FrameName>
            <FrameName x={Q.x} y={Q.y - 20} show={t >= T.shipped}>
              2 · Select your plan
            </FrameName>
            <Screen
              {...S}
              srcs={["scooter-type"]}
              alt="Shipped: choose the scooter type first, with the licence rule on each option"
              show={t >= T.shipped}
            />
            <Screen
              {...Q}
              srcs={["scooter-plan"]}
              alt="Shipped: the plan screen keeps the speed toggle"
              show={t >= T.shipped}
            />
            {SHIPPED.map((n, i) => (
              <span key={n.text}>
                <Spotlight phone={n.phone} area={n.area} color={C.green} show={sF === i} />
                <Pin
                  x={n.right ? n.phone.x + n.phone.w - 11 : n.phone.x - 13}
                  y={n.area.y + n.area.h / 2 - 12}
                  n={i + 1}
                  show={sF === i}
                  color={C.green}
                />
              </span>
            ))}
            <Caption
              step={pF >= 0 ? pF + 1 : sF >= 0 ? sF + 1 : tab + 1}
              color={pF >= 0 ? C.red : sF >= 0 ? C.green : undefined}
              text={caption}
              done={done}
              onReplay={replay}
            />
          </>
        );
      }}
    </Stage>
  );
}

/* ---------------------------------------------------------------- Design decision #4 · KYC status cards */

const CARDS = [
  {
    key: "review",
    screen: "kyc-home-review",
    card: "card-review",
    name: "In review",
    note: "Usually takes 2–4 hours",
    sh: 388,
    ch: 266,
    cw: 1215,
    cH: 799,
  },
  {
    key: "rejected",
    screen: "kyc-home-rejected",
    card: "card-rejected",
    name: "Not approved",
    note: "Says why, offers a re-upload",
    sh: 423,
    ch: 377,
    cw: 1215,
    cH: 1130,
  },
  {
    key: "approved",
    screen: "kyc-home-approved",
    card: "card-approved",
    name: "Approved",
    note: "One next step: start booking",
    sh: 389,
    ch: 276,
    cw: 1215,
    cH: 829,
  },
];

// The three home states, the Account status card spotlighted on each, then the cards lift off into a
// row, larger, each with its state and note above it (one shared line), centred in the section.
export function KycCardsStory() {
  // layout: 24px stage margin and section padding; phones centred in three equal columns; sections end
  // 24px under the tallest phone; caption 28px below
  const SEC = { x: 24, y: 72, w: 860 - 48 };
  const PW = 150;
  const PY = SEC.y + 60;
  const col = (SEC.w - 40) / 3;
  const xs = [0, 1, 2].map((i) => SEC.x + 20 + i * col + (col - PW) / 2);
  const phoneH = (c: (typeof CARDS)[number]) => Math.min((PW * c.sh) / 150, 392);
  const SEC_H = PY + Math.max(...CARDS.map(phoneH)) + 24 - SEC.y;
  const H = SEC.y + SEC_H + 28 + 58 + 20;
  const BW = (SEC.w - 48 - 2 * 24) / 3;
  const bx = [0, 1, 2].map((i) => SEC.x + 24 + i * (BW + 24));
  const bigH = (c: (typeof CARDS)[number]) => (BW * c.cH) / c.cw;
  const LABEL_H = 44;
  const block = LABEL_H + Math.max(...CARDS.map(bigH));
  const TOP = SEC.y + 40 + (SEC_H - 40 - block) / 2;
  const BY = TOP + LABEL_H;
  const T = { light: 1800, lift: 4400, move: 4700, labels: 5600, end: 6800 };
  return (
    <Stage w={W} h={H} total={T.end}>
      {(t, replay, done) => {
        const phase = t < T.light ? 0 : t < T.lift ? 1 : t < T.labels ? 2 : 3;
        const caption = [
          "After KYC is submitted, home shows where the rider stands, in three states.",
          "The hero is one card: Account status.",
          "Up close: one status, one line on what's happening, one action.",
          "A seven-step sign-up wall became a three-step checklist the rider can read at a glance.",
        ][phase];
        const lifted = t >= T.lift;
        return (
          <>
            <Tabs labels={["The screens", "The card", "Up close"]} active={phase === 0 ? 0 : phase === 1 ? 1 : 2} />
            <SectionBox x={SEC.x} y={SEC.y} w={SEC.w} h={SEC_H} label="Home · KYC status" after />
            {CARDS.map((c, i) => {
              const phone = { x: xs[i], y: PY, w: PW, h: phoneH(c) };
              const tray = onPhone(xs[i], PY, PW, [20, 384, 405, c.ch]);
              const moved = t >= T.move;
              const labelsIn = t >= T.labels + i * 150;
              return (
                <div key={c.key}>
                  <FrameName x={xs[i]} y={PY - 20} show={!lifted}>
                    {c.name}
                  </FrameName>
                  <Screen {...phone} srcs={[c.screen]} alt={`Home with the KYC card: ${c.name}`} show={!lifted} />
                  <Spotlight phone={phone} area={tray} color={C.green} show={t >= T.light + i * 300 && !lifted} />
                  {/* the card, lifted out and enlarged */}
                  <div
                    className="absolute overflow-hidden rounded-[12px] bg-white shadow-[0_18px_40px_-18px_rgba(20,60,30,0.45),0_0_0_1px_rgba(0,0,0,0.06)]"
                    style={{
                      left: moved ? bx[i] : tray.x,
                      top: moved ? BY : tray.y,
                      width: moved ? BW : tray.w,
                      height: moved ? bigH(c) : tray.h,
                      opacity: lifted ? 1 : 0,
                      transition: `left 900ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, top 900ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, width 900ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, height 900ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, opacity 300ms ease`,
                    }}
                  >
                    <Image
                      src={`${HQ}/${c.card}.webp`}
                      alt={`KYC card: ${c.name}`}
                      width={c.cw}
                      height={c.cH}
                      unoptimized
                      className="block h-full w-full object-cover object-top"
                    />
                  </div>
                  <div
                    className="absolute grid gap-0.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      left: bx[i],
                      top: TOP,
                      width: BW,
                      opacity: labelsIn ? 1 : 0,
                      transform: labelsIn ? "none" : "translateY(4px)",
                    }}
                  >
                    <span className="text-[13px] font-semibold text-[#1e1e1e]">{c.name}</span>
                    <span className="text-[12px] text-[#5c5c5c]">{c.note}</span>
                  </div>
                </div>
              );
            })}
            <Caption step={phase === 0 ? 1 : phase === 1 ? 2 : 3} text={caption} done={done} onReplay={replay} />
          </>
        );
      }}
    </Stage>
  );
}

/* ---------------------------------------------------------------- Solution #3 · checkout */

// Same language as PlansStory: one note at a time (spotlight on the phone, pin in the outer margin,
// its card lit), a clean ending, and hover a card to bring its spotlight back. Each section holds two
// phones, so the notes sit in a row under them.
type CheckoutNote = { phone: 0 | 1; area: (p: { x: number; y: number; w: number; h: number }) => { x: number; y: number; w: number; h: number }; title: string; sub: string };
const CHECKOUT_OLD: CheckoutNote[] = [
  {
    phone: 0,
    area: (p) => frac(p.x, p.y, p.w, p.h, [0.03, 0.285, 0.94, 0.05]),
    title: "Fees in small print",
    sub: "Onboarding fee and extra charge, above the plans.",
  },
  {
    phone: 0,
    area: (p) => frac(p.x, p.y, p.w, p.h, [0.03, 0.92, 0.94, 0.055]),
    title: "Pay from the list",
    sub: "No step to check what you're paying for.",
  },
  {
    phone: 1,
    area: (p) => frac(p.x, p.y, p.w, p.h, [0.04, 0.14, 0.92, 0.12]),
    title: "Then, just a timer",
    sub: "A countdown after paying, and no next step.",
  },
];
const CHECKOUT_NEW: CheckoutNote[] = [
  {
    phone: 0,
    area: (p) => onPhone(p.x, p.y, p.w, [24, 458, 392, 334]),
    title: "Every charge, listed",
    sub: "Rent, deposit, fees and Shield, then the total.",
  },
  {
    phone: 0,
    area: (p) => onPhone(p.x, p.y, p.w, [24, 842, 392, 50]),
    title: "The total, in the button",
    sub: "Pay ₹11,398: no surprise at the gateway.",
  },
  {
    phone: 1,
    area: (p) => onPhone(p.x, p.y, p.w, [24, 394, 392, 257]),
    title: "Which hub to go to",
    sub: "The hub card, with distance and directions.",
  },
];

export function CheckoutStory() {
  // layout: 24px stage margin, two 398px sections 16px apart; in each, two 168px phones 16px apart,
  // centred, with 23px outer margins for the pins; the notes row (full inner width) sits 16px under the phones.
  const PH = { y: 132, w: 168, gap: 16 };
  const k = PH.w / 150; // screen heights below are at 150px wide
  const NOTES_Y = PH.y + 334 * k + 16;
  // h: the notes row is 129px tall (measured at this width), plus 24px of padding
  const SEC = { y: 72, h: NOTES_Y + 129 + 24 - 72, w: 398, left: 24, right: 24 + 398 + 16 };
  const inset = (SEC.w - (PH.w * 2 + PH.gap)) / 2;
  const phones = (left: number, hs: [number, number]) =>
    [0, 1].map((i) => ({ x: left + inset + i * (PH.w + PH.gap), y: PH.y, w: PH.w, h: hs[i] * k }));
  const OLD = phones(SEC.left, [334, 333]);
  const NEW = phones(SEC.right, [326, 326]);
  const H = SEC.y + SEC.h + 28 + 58 + 20;
  const STEP = 1600;
  const T = {
    oldStart: 700,
    oldEnd: 700 + CHECKOUT_OLD.length * STEP,
    after: 700 + CHECKOUT_OLD.length * STEP + 300,
    newStart: 700 + CHECKOUT_OLD.length * STEP + 1100,
    newEnd: 700 + CHECKOUT_OLD.length * STEP + 1100 + CHECKOUT_NEW.length * STEP,
    end: 700 + CHECKOUT_OLD.length * STEP + 1100 + CHECKOUT_NEW.length * STEP + 300,
  };
  const [hover, setHover] = useState<{ side: "old" | "new"; i: number } | null>(null);
  const focusAt = (t: number, start: number, end: number) =>
    t >= start && t < end ? Math.floor((t - start) / STEP) : -1;
  return (
    <Stage w={W} h={H} total={T.end}>
      {(t, replay, done) => {
        const phase = t < T.after ? 0 : t < T.end ? 1 : 2;
        const caption = [
          "Before: riders paid straight from the plan list, then only got a countdown.",
          "After: one short checkout lists every charge, and success says where to go.",
          "Paying is the moment riders remember. Now nothing about it is a surprise, before or after.",
        ][phase];
        const focus = { old: focusAt(t, T.oldStart, T.oldEnd), new: focusAt(t, T.newStart, T.newEnd) };
        const lit = (side: "old" | "new", i: number) =>
          focus[side] === i || (done && hover?.side === side && hover.i === i);
        const cardState = (side: "old" | "new", i: number, start: number) => {
          if (t < start + i * STEP) return "hidden" as const;
          if (lit(side, i)) return "active" as const;
          return done ? ("rest" as const) : ("read" as const);
        };
        const bind = (side: "old" | "new", i: number) =>
          done ? { onFocus: () => setHover({ side, i }), onBlur: () => setHover(null) } : {};
        const side = (
          key: "old" | "new",
          notes: CheckoutNote[],
          ph: { x: number; y: number; w: number; h: number }[],
          color: string,
          left: number,
          start: number,
        ) => (
          <>
            {notes.map((n, i) => {
              const p = ph[n.phone];
              const b = n.area(p);
              const on = lit(key, i);
              // pins wait in the outer margin: left of the first phone, right of the second
              const pinX = n.phone === 0 ? p.x - 13 : p.x + p.w - 11;
              return (
                <span key={n.title}>
                  <Spotlight phone={p} area={b} color={color} show={on} />
                  <Pin x={pinX} y={b.y + b.h / 2 - 12} n={i + 1} show={on} color={color} />
                </span>
              );
            })}
            <div
              className="absolute grid grid-cols-3 gap-2"
              style={{ left: left + 20, top: NOTES_Y, width: SEC.w - 40 }}
            >
              {notes.map((n, i) => (
                <NoteCard
                  key={n.title}
                  n={i + 1}
                  title={n.title}
                  sub={n.sub}
                  color={color}
                  compact
                  state={cardState(key, i, start)}
                  {...bind(key, i)}
                />
              ))}
            </div>
          </>
        );
        return (
          <>
            <Tabs labels={["Before", "After"]} active={phase === 0 ? 0 : 1} />
            <span
              className={`absolute top-[26px] right-6 text-[11px] text-[#8c8c8c] transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}
            >
              Hover a note to find it on the screen
            </span>

            <SectionBox x={SEC.left} y={SEC.y} w={SEC.w} h={SEC.h} label="Before · pay from the plan list" />
            <FrameName x={OLD[0].x} y={PH.y - 20}>
              Plan list · Pay
            </FrameName>
            <FrameName x={OLD[1].x} y={PH.y - 20}>
              After paying
            </FrameName>
            <Screen
              {...OLD[0]}
              srcs={["old-plan-pay"]}
              alt="Old app: paying straight from the plan list"
              dim={t >= T.after && !done}
            />
            <Screen
              {...OLD[1]}
              srcs={["old-countdown"]}
              alt="Old app: a countdown after paying"
              dim={t >= T.after && !done}
            />
            {side("old", CHECKOUT_OLD, OLD, C.red, SEC.left, T.oldStart)}

            <SectionBox
              x={SEC.right}
              y={SEC.y}
              w={SEC.w}
              h={SEC.h}
              label="After · confirm, then a clear success"
              after
              show={t >= T.after}
            />
            <FrameName x={NEW[0].x} y={PH.y - 20} show={t >= T.after}>
              Confirm and pay
            </FrameName>
            <FrameName x={NEW[1].x} y={PH.y - 20} show={t >= T.after}>
              Payment successful
            </FrameName>
            <Screen
              {...NEW[0]}
              srcs={["pay-confirm"]}
              alt="New: confirm and pay with every charge listed"
              show={t >= T.after}
            />
            <Screen
              {...NEW[1]}
              srcs={["pay-success"]}
              alt="New: payment successful with the hub to visit"
              show={t >= T.after}
            />
            {side("new", CHECKOUT_NEW, NEW, C.green, SEC.right, T.newStart)}

            <Caption step={phase === 0 ? 1 : 2} text={caption} done={done} onReplay={replay} />
          </>
        );
      }}
    </Stage>
  );
}

/* ---------------------------------------------------------------- Solution #2 · choose a plan */

const OLD_NOTES = [
  {
    f: [0.03, 0.335, 0.94, 0.17] as [number, number, number, number],
    title: "Four numbers per plan",
    sub: "Price, deposit, per-km and a km limit, in every box.",
  },
  {
    f: [0.03, 0.515, 0.94, 0.165] as [number, number, number, number],
    title: "Boxes look the same",
    sub: "Comparing meant remembering eight numbers.",
  },
  {
    f: [0.03, 0.285, 0.94, 0.045] as [number, number, number, number],
    title: "Fees in small print",
    sub: "Onboarding fee and extra charge sat above the plans.",
  },
];
const NEW_NOTES = [
  {
    r: [312, 222, 100, 34] as [number, number, number, number],
    title: "One price per day",
    sub: "The one number to compare.",
  },
  {
    r: [70, 279, 122, 30] as [number, number, number, number],
    title: "Savings as a chip",
    sub: "“₹50 less every day”, no maths needed.",
  },
  {
    r: [16, 123, 408, 66] as [number, number, number, number],
    title: "Speed and licence up top",
    sub: "Tick for no licence, amber card if one is needed.",
  },
  {
    r: [27, 865, 386, 48] as [number, number, number, number],
    title: "The total, in the button",
    sub: "Days and price, read back before paying.",
  },
];

// One note at a time: a spotlight dims the rest of the phone and rings the area, its pin waits in the
// margin (never on the content) and its card lights up; then it hands over to the next note. At the end
// every spotlight clears so both screens can be read as they are, and hovering a card brings its spotlight back.
export function PlansStory() {
  const H = 640;
  // layout: 24px stage margin, two 398px sections 16px apart, 20px inner padding; in each, the phone
  // (170) then the notes column (172), 16px apart. Sections end 24px under the phones, and the caption
  // bar sits 32px below them.
  const SEC = { y: 72, h: 462, w: 398, left: 24, right: 24 + 398 + 16 };
  const O = { x: SEC.left + 20, y: 132, w: 170, h: 378 };
  const N = { x: SEC.right + 20, y: 132, w: 170, h: 371 };
  const NOTES_W = 172;
  const STEP = 1600;
  const T = {
    oldStart: 700,
    oldEnd: 700 + OLD_NOTES.length * STEP,
    after: 700 + OLD_NOTES.length * STEP + 300,
    newStart: 700 + OLD_NOTES.length * STEP + 1100,
    newEnd: 700 + OLD_NOTES.length * STEP + 1100 + NEW_NOTES.length * STEP,
    end: 700 + OLD_NOTES.length * STEP + 1100 + NEW_NOTES.length * STEP + 300,
  };
  const [hover, setHover] = useState<{ side: "old" | "new"; i: number } | null>(null);
  const focusAt = (t: number, start: number, end: number) =>
    t >= start && t < end ? Math.floor((t - start) / STEP) : -1;
  return (
    <Stage w={W} h={H} total={T.end}>
      {(t, replay, done) => {
        const phase = t < T.after ? 0 : t < T.end ? 1 : 2;
        const caption = [
          "Before: near-identical boxes, four numbers each. This is where many riders left.",
          "After: one decision per screen, and one number per plan to compare.",
          "The fewer things you ask someone to weigh at once, the faster and surer they decide.",
        ][phase];
        const oldFocus = focusAt(t, T.oldStart, T.oldEnd);
        const newFocus = focusAt(t, T.newStart, T.newEnd);
        const lit = (side: "old" | "new", i: number) =>
          (side === "old" ? oldFocus : newFocus) === i ||
          (done && hover?.side === side && hover.i === i);
        const cardState = (side: "old" | "new", i: number, start: number) => {
          if (t < start + i * STEP) return "hidden" as const;
          if (done) return lit(side, i) ? ("active" as const) : ("rest" as const);
          return lit(side, i) ? ("active" as const) : ("read" as const);
        };
        const bind = (side: "old" | "new", i: number) =>
          done
            ? { onFocus: () => setHover({ side, i }), onBlur: () => setHover(null) }
            : {};
        return (
          <>
            <Tabs labels={["Before", "After"]} active={phase === 0 ? 0 : 1} />
            <span
              className={`absolute top-[26px] right-6 text-[11px] text-[#8c8c8c] transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}
            >
              Hover a note to find it on the screen
            </span>

            <SectionBox x={SEC.left} y={SEC.y} w={SEC.w} h={SEC.h} label="Before · old plans" />
            <FrameName x={O.x} y={O.y - 20}>
              Old app · Plans
            </FrameName>
            <Screen
              x={O.x}
              y={O.y}
              w={O.w}
              h={O.h}
              srcs={["old-plan-pay"]}
              alt="Old plans: near-identical boxes of four numbers"
              dim={t >= T.after && !done}
            />
            {OLD_NOTES.map((n, i) => {
              const b = frac(O.x, O.y, O.w, O.h, n.f);
              const on = lit("old", i);
              return (
                <span key={n.title}>
                  <Spotlight phone={O} area={b} color={C.red} show={on} />
                  <Pin x={O.x - 13} y={b.y + b.h / 2 - 12} n={i + 1} show={on} color={C.red} />
                </span>
              );
            })}
            <div className="absolute grid gap-2" style={{ left: O.x + O.w + 16, top: O.y, width: NOTES_W }}>
              {OLD_NOTES.map((n, i) => (
                <NoteCard
                  key={n.title}
                  n={i + 1}
                  title={n.title}
                  sub={n.sub}
                  color={C.red}
                  state={cardState("old", i, T.oldStart)}
                  {...bind("old", i)}
                />
              ))}
            </div>

            <SectionBox
              x={SEC.right}
              y={SEC.y}
              w={SEC.w}
              h={SEC.h}
              label="After · select your plan"
              after
              show={t >= T.after}
            />
            <FrameName x={N.x} y={N.y - 20} show={t >= T.after}>
              Select your plan
            </FrameName>
            <Screen
              x={N.x}
              y={N.y}
              w={N.w}
              h={N.h}
              srcs={["scooter-plan"]}
              alt="New plans: each plan leads with its price per day"
              show={t >= T.after}
            />
            {NEW_NOTES.map((n, i) => {
              const b = onPhone(N.x, N.y, N.w, n.r);
              const on = lit("new", i);
              return (
                <span key={n.title}>
                  <Spotlight phone={N} area={b} color={C.green} show={on} />
                  <Pin x={N.x - 13} y={b.y + b.h / 2 - 12} n={i + 1} show={on} color={C.green} />
                </span>
              );
            })}
            <div className="absolute grid gap-2" style={{ left: N.x + N.w + 16, top: N.y, width: NOTES_W }}>
              {NEW_NOTES.map((n, i) => (
                <NoteCard
                  key={n.title}
                  n={i + 1}
                  title={n.title}
                  sub={n.sub}
                  color={C.green}
                  state={cardState("new", i, T.newStart)}
                  {...bind("new", i)}
                />
              ))}
            </div>
            <Caption step={phase === 0 ? 1 : 2} text={caption} done={done} onReplay={replay} />
          </>
        );
      }}
    </Stage>
  );
}

/* ---------------------------------------------------------------- Solution #4 · ride and renew */

// Spotlights walk the old countdown, then the booking card on each of the three home states. For the
// finale the phones step back and the three booking cards lift off their screens into a row, larger,
// each with its state and what it asks of the rider: the card is the thing that changed.
const RIDE_OLD = [
  {
    f: [0.04, 0.14, 0.92, 0.12] as [number, number, number, number],
    text: "Before: after paying, riders got a countdown and nothing else to go on.",
  },
  {
    f: [0.03, 0.33, 0.94, 0.6] as [number, number, number, number],
    text: "Below it, the plans they had just paid for, offered all over again.",
  },
];
// booking card bounds in the 660px-wide home screenshots (x, y, w, h), and its height there
const RIDE_NEW = [
  {
    src: "home-collect",
    card: "booking-collect",
    h: 1875,
    rect: [30, 576, 608, 548],
    state: "Ready to collect",
    sub: "The hub, how far it is, and the way there.",
    text: "Ready to collect: the hub, how far it is, and the way there.",
  },
  {
    src: "home-ride",
    card: "booking-ride",
    h: 1802,
    rect: [30, 576, 608, 470],
    state: "Ready to ride",
    sub: "One clear next step: Start ride.",
    text: "Ready to ride: one clear next step, Start ride.",
  },
  {
    src: "home-active",
    card: "booking-active",
    h: 1818,
    rect: [30, 576, 608, 488],
    state: "Riding",
    sub: "Days and km left, with Renew a tap away.",
    text: "Riding: days and km left, with Renew and Top up a tap away.",
  },
];

export function RideStory() {
  // layout: 24px stage margin; a narrow Before section (one phone) and a wide After section (three
  // phones), 16px apart, 24px padding; sections end 24px under the tallest phone; caption 28px below
  const PH = { y: 132, w: 160 };
  const BEFORE = { x: 24, y: 72, w: 198 };
  const AFTER = { x: 24 + 198 + 16, y: 72, w: 860 - 48 - 198 - 16 };
  const phoneH = (h: number) => (PH.w * h) / 660;
  const SEC_H = PH.y + phoneH(1875) + 24 - 72;
  const H = 72 + SEC_H + 28 + 58 + 20;
  const OLD = { x: BEFORE.x + (BEFORE.w - PH.w) / 2, y: PH.y, w: PH.w, h: (333 * PH.w) / 150 };
  const gap = (AFTER.w - 40 - PH.w * 3) / 2;
  const NEW = RIDE_NEW.map((s, i) => ({ x: AFTER.x + 20 + i * (PH.w + gap), y: PH.y, w: PH.w, h: phoneH(s.h) }));
  const area = (i: number) => {
    const k = PH.w / 660;
    const [x, y, w, h] = RIDE_NEW[i].rect;
    return { x: NEW[i].x + x * k, y: NEW[i].y + y * k, w: w * k, h: h * k };
  };
  // finale: three cards in a row, centred in the section area
  const CW = (860 - 48 - 48) / 3;
  const ch = (i: number) => (CW * RIDE_NEW[i].rect[3]) / RIDE_NEW[i].rect[2];
  const maxCh = Math.max(...RIDE_NEW.map((_, i) => ch(i)));
  const blockH = 22 + 10 + maxCh + 14 + 34;
  const top = 72 + (SEC_H - blockH) / 2;
  const target = (i: number) => ({ x: 24 + i * (CW + 24), y: top + 32, w: CW, h: ch(i) });

  const STEP = 1700;
  const T = {
    oldStart: 600,
    oldEnd: 600 + RIDE_OLD.length * STEP,
    after: 600 + RIDE_OLD.length * STEP + 300,
    newStart: 600 + RIDE_OLD.length * STEP + 1000,
    newEnd: 600 + RIDE_OLD.length * STEP + 1000 + RIDE_NEW.length * STEP,
    lift: 600 + RIDE_OLD.length * STEP + 1000 + RIDE_NEW.length * STEP + 300,
  };
  const END = T.lift + 100 + 2 * 120 + 900 + 600;
  const focusAt = (t: number, start: number, end: number) =>
    t >= start && t < end ? Math.floor((t - start) / STEP) : -1;
  return (
    <Stage w={W} h={H} total={END}>
      {(t, replay, done) => {
        const oldF = focusAt(t, T.oldStart, T.oldEnd);
        const newF = focusAt(t, T.newStart, T.newEnd);
        const lifting = t >= T.lift;
        const phase = lifting ? 2 : t < T.after ? 0 : 1;
        const caption =
          oldF >= 0
            ? RIDE_OLD[oldF].text
            : newF >= 0
              ? RIDE_NEW[newF].text
              : lifting
                ? "One booking card on home changes with the rider's stage, and always shows one next step."
                : t < T.after
                  ? "Before: the old app after paying."
                  : "After: home, with one booking card that follows the rider.";
        return (
          <>
            <Tabs labels={["Before", "After", "The booking card"]} active={phase} />

            <SectionBox x={BEFORE.x} y={BEFORE.y} w={BEFORE.w} h={SEC_H} label="Before" show={!lifting} />
            <FrameName x={OLD.x} y={PH.y - 20} show={!lifting}>
              Old app · Countdown
            </FrameName>
            <Screen
              {...OLD}
              srcs={["old-countdown"]}
              alt="Old app: a countdown after paying"
              dim={t >= T.after && !lifting}
              show={!lifting}
            />
            {RIDE_OLD.map((n, i) => {
              const b = frac(OLD.x, OLD.y, OLD.w, OLD.h, n.f);
              return (
                <span key={n.text}>
                  <Spotlight phone={OLD} area={b} color={C.red} show={oldF === i} />
                  <Pin x={OLD.x - 13} y={b.y + b.h / 2 - 12} n={i + 1} show={oldF === i} color={C.red} />
                </span>
              );
            })}

            <SectionBox
              x={AFTER.x}
              y={AFTER.y}
              w={AFTER.w}
              h={SEC_H}
              label="After"
              after
              show={t >= T.after && !lifting}
            />
            {RIDE_NEW.map((s, i) => (
              <span key={s.src}>
                <FrameName x={NEW[i].x} y={PH.y - 20} show={t >= T.after && !lifting}>
                  {s.state}
                </FrameName>
                <Screen
                  {...NEW[i]}
                  srcs={[s.src]}
                  alt={`New home: ${s.state.toLowerCase()}`}
                  show={t >= T.after && !lifting}
                />
                <Spotlight phone={NEW[i]} area={area(i)} color={C.green} show={newF === i} />
                <Pin
                  x={NEW[i].x - 13}
                  y={area(i).y + area(i).h / 2 - 12}
                  n={i + 1}
                  show={newF === i}
                  color={C.green}
                />
              </span>
            ))}

            {/* finale: each booking card lifts off its phone and settles into the row */}
            {RIDE_NEW.map((s, i) => {
              const from = area(i);
              const to = target(i);
              const moved = t >= T.lift + 100 + i * 120;
              const r = moved ? to : from;
              const labelsIn = t >= T.lift + 100 + i * 120 + 700;
              return (
                <span key={s.card}>
                  <span
                    className="absolute rounded-md px-2 py-[3px] text-[11px] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      left: to.x,
                      top: to.y - 32,
                      background: C.green,
                      opacity: labelsIn ? 1 : 0,
                      transform: labelsIn ? "none" : "translateY(4px)",
                    }}
                  >
                    {s.state}
                  </span>
                  <Image
                    src={`${HQ}/${s.card}.png`}
                    alt={lifting ? `The booking card: ${s.state.toLowerCase()}` : ""}
                    width={608}
                    height={s.rect[3]}
                    unoptimized
                    className="absolute block rounded-[12px] bg-white"
                    style={{
                      left: r.x,
                      top: r.y,
                      width: r.w,
                      height: r.h,
                      opacity: lifting ? 1 : 0,
                      boxShadow: moved
                        ? "0 18px 40px -16px rgba(30,30,30,0.35), 0 0 0 1px rgba(0,0,0,0.06)"
                        : "0 0 0 0 rgba(0,0,0,0)",
                      transition: moved
                        ? "left 900ms cubic-bezier(0.22,1,0.36,1), top 900ms cubic-bezier(0.22,1,0.36,1), width 900ms cubic-bezier(0.22,1,0.36,1), height 900ms cubic-bezier(0.22,1,0.36,1), box-shadow 900ms ease"
                        : "none",
                    }}
                  />
                  <span
                    className="absolute text-[12px] leading-[17px] text-[#5c5c5c] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      left: to.x,
                      top: top + 32 + maxCh + 14,
                      width: to.w,
                      opacity: labelsIn ? 1 : 0,
                      transform: labelsIn ? "none" : "translateY(4px)",
                    }}
                  >
                    {s.sub}
                  </span>
                </span>
              );
            })}

            <Caption
              step={oldF >= 0 ? oldF + 1 : newF >= 0 ? newF + 1 : phase + 1}
              color={oldF >= 0 ? C.red : newF >= 0 ? C.green : undefined}
              text={caption}
              done={done}
              onReplay={replay}
            />
          </>
        );
      }}
    </Stage>
  );
}

/* ---------------------------------------------------------------- Design decision #5 · dues and renewals */

// Four home moments, each a bottom sheet. Spotlights walk the sheets one by one; for the finale the
// phones step back and the four sheets lift off into a row, larger, with their state and note above.
// Screens and sheets: exported from the Figma frames at 1320px wide (v5/hq renew-*, sheet-*); the three
// home sheets are cropped below their floating close button, so all four start clean.
const RENEW = [
  { screen: "renew-ending", sheet: "sheet-ending", sh: 3636, sw: 1326, shh: 1434, top: 249.32, h: 163.86, state: "Plan ending", note: "20 hours ahead, with the best plan.", text: "Plan ending: a sheet on home, 20 hours ahead, with the best plan to renew." },
  { screen: "renew-ended", sheet: "sheet-ended", sh: 3447, sw: 1326, shh: 1410, top: 230.84, h: 160.86, state: "Plan ended", note: "Scooter locked; Renew is the one action.", text: "Plan ended: the scooter is locked, and Renew is the one action." },
  { screen: "renew-km", sheet: "sheet-km", sh: 3636, sw: 1326, shh: 1410, top: 252.32, h: 160.86, state: "KM low", note: "A quick top-up; unused km roll over.", text: "KM low: a quick top-up, and any km left over roll on." },
  { screen: "renew-dues", sheet: "sheet-dues", sh: 2868, sw: 1334, shh: 2241, top: 72.8, h: 253.11, state: "Dues explained", note: "Every charge itemised before paying.", text: "Dues explained: every charge itemised and explained before the next trip." },
];

export function RenewStory() {
  // layout: 24px stage margin and section padding; four phones centred in equal columns; section ends
  // 24px under the tallest phone; caption 28px below
  const SEC = { x: 24, y: 72, w: 860 - 48 };
  const PW = 150;
  const PY = SEC.y + 60;
  const col = (SEC.w - 40) / 4;
  const phones = RENEW.map((r, i) => ({ x: SEC.x + 20 + i * col + (col - PW) / 2, y: PY, w: PW, h: (PW * r.sh) / 1320 }));
  const SEC_H = PY + Math.max(...phones.map((p) => p.h)) + 24 - SEC.y;
  const H = SEC.y + SEC_H + 28 + 58 + 20;
  const sheetOn = (i: number) => ({ x: phones[i].x, y: PY + RENEW[i].top, w: PW, h: RENEW[i].h });
  // finale: four sheets in a row, centred in the section, labels on one line above
  const BW = (SEC.w - 48 - 3 * 20) / 4;
  const bh = (i: number) => (BW * RENEW[i].shh) / RENEW[i].sw;
  const LABEL_H = 58; // state + a two-line note, with 10px before the sheet
  const TOP = SEC.y + 40 + (SEC_H - 40 - (LABEL_H + Math.max(...RENEW.map((_, i) => bh(i))))) / 2;
  const target = (i: number) => ({ x: SEC.x + 24 + i * (BW + 20), y: TOP + LABEL_H, w: BW, h: bh(i) });

  const STEP = 1700;
  const T = { start: 700, lift: 700 + RENEW.length * STEP + 300 };
  const END = T.lift + 100 + 3 * 120 + 900 + 600;
  return (
    <Stage w={W} h={H} total={END}>
      {(t, replay, done) => {
        const focus = t >= T.start && t < T.start + RENEW.length * STEP ? Math.floor((t - T.start) / STEP) : -1;
        const lifting = t >= T.lift;
        const phase = lifting ? 1 : 0;
        const caption =
          focus >= 0
            ? RENEW[focus].text
            : lifting
              ? "The app remembers, so the rider doesn't have to: each moment arrives as one sheet with one next step."
              : "Home, before things run out.";
        return (
          <>
            <Tabs labels={["On home", "The sheets"]} active={phase} />
            <SectionBox x={SEC.x} y={SEC.y} w={SEC.w} h={SEC_H} label="Home · before things run out" after show={!lifting} />
            <SectionBox x={SEC.x} y={SEC.y} w={SEC.w} h={SEC_H} label="Up close · the sheets" after show={lifting} />
            {RENEW.map((r, i) => {
              const p = phones[i];
              const s = sheetOn(i);
              const to = target(i);
              const moved = t >= T.lift + 100 + i * 120;
              const rr = moved ? to : s;
              const labelsIn = t >= T.lift + 100 + i * 120 + 700;
              return (
                <span key={r.screen}>
                  <FrameName x={p.x} y={PY - 20} show={!lifting}>
                    {r.state}
                  </FrameName>
                  <Screen {...p} srcs={[r.screen]} alt={`Home: ${r.state.toLowerCase()}`} show={!lifting} />
                  <Spotlight phone={p} area={s} color={C.green} show={focus === i} />
                  <Pin x={p.x - 13} y={s.y + 14} n={i + 1} show={focus === i} color={C.green} />
                  <div
                    className="absolute grid gap-0.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ left: to.x, top: TOP, width: to.w, opacity: labelsIn ? 1 : 0, transform: labelsIn ? "none" : "translateY(4px)" }}
                  >
                    <span className="text-[13px] font-semibold text-[#1e1e1e]">{r.state}</span>
                    <span className="text-[11.5px] leading-[15px] text-[#5c5c5c]">{r.note}</span>
                  </div>
                  <Image
                    src={`${HQ}/${r.sheet}.webp`}
                    alt={lifting ? `${r.state}: the bottom sheet` : ""}
                    width={r.sw}
                    height={r.shh}
                    unoptimized
                    className="absolute block rounded-[12px]"
                    style={{
                      left: rr.x,
                      top: rr.y,
                      width: rr.w,
                      height: rr.h,
                      opacity: lifting ? 1 : 0,
                      boxShadow: moved ? "0 18px 40px -16px rgba(30,30,30,0.35)" : "none",
                      transition: moved
                        ? "left 900ms cubic-bezier(0.22,1,0.36,1), top 900ms cubic-bezier(0.22,1,0.36,1), width 900ms cubic-bezier(0.22,1,0.36,1), height 900ms cubic-bezier(0.22,1,0.36,1), box-shadow 900ms ease"
                        : "none",
                    }}
                  />
                </span>
              );
            })}
            <Caption
              step={focus >= 0 ? focus + 1 : phase + 1}
              color={focus >= 0 ? C.green : undefined}
              text={caption}
              done={done}
              onReplay={replay}
            />
          </>
        );
      }}
    </Stage>
  );
}
