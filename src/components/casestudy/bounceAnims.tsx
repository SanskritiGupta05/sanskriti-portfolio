"use client";

import Image from "next/image";
import {
  C,
  Caption,
  CommentCard,
  Cursor,
  FrameName,
  HQ,
  Highlight,
  Pin,
  Screen,
  SectionBox,
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

function Arrow({
  x,
  y,
  show,
  label,
}: {
  x: number;
  y: number;
  show: boolean;
  label: string;
}) {
  return (
    <div
      className={`absolute grid justify-items-center gap-1.5 transition-opacity duration-700 ${show ? "opacity-100" : "opacity-0"}`}
      style={{ left: x, top: y }}
    >
      <svg width="56" height="16" viewBox="0 0 56 16" aria-hidden="true">
        <path
          d="M2 8 H50 M42 2 L50 8 L42 14"
          fill="none"
          stroke={C.blue}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="70"
          strokeDashoffset={show ? 0 : 70}
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
      </svg>
      <span className="text-[10px] font-medium whitespace-nowrap text-[#0d99ff]">
        {label}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- Design decision #1 · scooter type */

export function ScooterStory() {
  const H = 640;
  const P = { x: 114, y: 132, w: 164, h: 361 }; // first idea: plan screen (crossfades to the sheet)
  const S = { x: 392, y: 132, w: 164, h: 353 }; // shipped: choose scooter
  const Q = { x: 580, y: 132, w: 164, h: 361 }; // shipped: plan screen with toggle
  const T = {
    cursorIn: 500,
    click: 1600,
    sheet: 1800,
    problem: 4000,
    shipped: 6600,
    licence: 7300,
    toggle: 9000,
    end: 10800,
  };
  const toggleHigh = onPhone(P.x, P.y, P.w, [222, 125, 200, 62]);
  return (
    <Stage w={W} h={H} total={T.end}>
      {(t, replay, done) => {
        const phase =
          t < T.sheet
            ? 0
            : t < T.problem
              ? 1
              : t < T.shipped
                ? 2
                : t < T.toggle
                  ? 3
                  : t < T.end
                    ? 4
                    : 5;
        const caption = [
          "First idea: save a tap. Riders pick a speed right on the plan screen.",
          "Tap High speed, and only then does a sheet explain the licence.",
          "The catch: the licence hides until you tap, and riders choose a scooter and a plan at the same time.",
          "What shipped: scooter type is its own step, with the licence rule on every option.",
          "The toggle stays on the plan screen, with a tick for No licence and an amber card for Licence needed.",
          "Fewer taps doesn't always mean better understanding.",
        ][phase];
        const tab = phase <= 1 ? 0 : phase === 2 ? 1 : 2;
        return (
          <>
            <Tabs
              labels={["First idea", "The problem", "What shipped"]}
              active={tab}
            />
            <SectionBox
              x={96}
              y={72}
              w={200}
              h={462}
              label="First idea · fewer taps"
            />
            <FrameName x={P.x} y={P.y - 20}>
              Select your plan
            </FrameName>
            <Screen
              x={P.x}
              y={P.y}
              w={P.w}
              h={P.h}
              srcs={["scooter-plan", "scooter-sheet"]}
              active={t >= T.sheet && t < T.problem ? 1 : 0}
              alt="First idea: speed toggle on the plan screen, licence sheet on tap"
              dim={t >= T.shipped}
            />
            <Cursor
              x={
                t >= T.cursorIn + 300
                  ? toggleHigh.x + toggleHigh.w * 0.45
                  : P.x + P.w + 40
              }
              y={
                t >= T.cursorIn + 300
                  ? toggleHigh.y + toggleHigh.h * 0.4
                  : P.y + 260
              }
              show={t >= T.cursorIn && t < T.problem}
              clicking={t >= T.click && t < T.click + 400}
            />
            <Highlight
              {...onPhone(P.x, P.y, P.w, [16, 123, 408, 66])}
              color={C.red}
              label="Licence hides until you tap"
              show={t >= T.problem && t < T.shipped}
            />
            <Highlight
              {...onPhone(P.x, P.y, P.w, [16, 205, 408, 520])}
              color={C.red}
              label="Scooter + plan at once"
              show={t >= T.problem + 500 && t < T.shipped}
              below
            />

            <Arrow x={304} y={300} show={t >= T.shipped} label="decide first" />
            <SectionBox
              x={372}
              y={72}
              w={392}
              h={462}
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
              x={S.x}
              y={S.y}
              w={S.w}
              h={S.h}
              srcs={["scooter-type"]}
              alt="Shipped: choose the scooter type first, with the licence rule on each option"
              show={t >= T.shipped}
            />
            <Screen
              x={Q.x}
              y={Q.y}
              w={Q.w}
              h={Q.h}
              srcs={["scooter-plan"]}
              alt="Shipped: the plan screen keeps the speed toggle"
              show={t >= T.shipped}
            />
            <Highlight
              {...onPhone(S.x, S.y, S.w, [70, 414, 330, 40])}
              color={C.green}
              label="Licence rule"
              show={t >= T.licence}
            />
            <Highlight
              {...onPhone(S.x, S.y, S.w, [70, 606, 330, 40])}
              color={C.green}
              label="on every option"
              show={t >= T.licence + 400}
            />
            <Highlight
              {...onPhone(Q.x, Q.y, Q.w, [16, 123, 408, 66])}
              color={C.green}
              label="Tick · amber card"
              show={t >= T.toggle}
            />
            <Caption
              step={tab + 1}
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

export function KycCardsStory() {
  const H = 620;
  const PW = 150;
  const xs = [150, 355, 560];
  const PY = 132;
  const BW = 240;
  const bx = [45, 310, 575];
  const BY = 178;
  const T = { light: 1800, lift: 4400, move: 4700, labels: 6400, end: 7200 };
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
            <Tabs
              labels={["The screens", "The card", "Up close"]}
              active={phase === 0 ? 0 : phase === 1 ? 1 : 2}
            />
            <SectionBox
              x={40}
              y={72}
              w={780}
              h={466}
              label="Home · KYC status"
              after
            />
            {CARDS.map((c, i) => {
              const sh = (PW * c.sh) / 150;
              const tray = onPhone(xs[i], PY, PW, [20, 384, 405, c.ch]);
              const bigH = (BW * c.cH) / c.cw;
              const moved = t >= T.move;
              return (
                <div key={c.key}>
                  <FrameName x={xs[i]} y={PY - 20} show={!lifted}>
                    {c.name}
                  </FrameName>
                  <Screen
                    x={xs[i]}
                    y={PY}
                    w={PW}
                    h={Math.min(sh, 392)}
                    srcs={[c.screen]}
                    alt={`Home with the KYC card: ${c.name}`}
                    show={!lifted}
                  />
                  <Highlight
                    {...tray}
                    color={C.green}
                    label="Account status"
                    show={t >= T.light + i * 500 && !lifted}
                  />
                  {/* the card, lifted out and enlarged */}
                  <div
                    className="absolute overflow-hidden rounded-[12px] bg-white shadow-[0_18px_40px_-18px_rgba(20,60,30,0.45),0_0_0_1px_rgba(0,0,0,0.06)]"
                    style={{
                      left: moved ? bx[i] : tray.x,
                      top: moved ? BY : tray.y,
                      width: moved ? BW : tray.w,
                      height: moved ? bigH : tray.h,
                      opacity: lifted ? 1 : 0,
                      transition: `left 800ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, top 800ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, width 800ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, height 800ms cubic-bezier(0.65,0,0.35,1) ${i * 120}ms, opacity 300ms ease`,
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
                    className={`absolute grid gap-0.5 transition-all duration-500 ${t >= T.labels + i * 150 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                    style={{ left: bx[i], top: BY + bigH + 12, width: BW }}
                  >
                    <span className="text-[13px] font-semibold text-[#1e1e1e]">
                      {c.name}
                    </span>
                    <span className="text-[12px] text-[#5c5c5c]">{c.note}</span>
                  </div>
                </div>
              );
            })}
            <Caption
              step={phase === 0 ? 1 : phase === 1 ? 2 : 3}
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

/* ---------------------------------------------------------------- Solution #3 · checkout */

export function CheckoutStory() {
  const H = 600;
  const A = { x: 58, y: 132, w: 150, h: 334 }; // old: plan list with Pay
  const B = { x: 226, y: 132, w: 150, h: 333 }; // old: countdown after paying
  const N1 = { x: 478, y: 132, w: 150, h: 326 }; // new: confirm and pay
  const N2 = { x: 646, y: 132, w: 150, h: 326 }; // new: payment successful
  const T = { bad: 1600, after: 4400, good: 5200, end: 7400 };
  return (
    <Stage w={W} h={H} total={T.end}>
      {(t, replay, done) => {
        const phase = t < T.bad ? 0 : t < T.after ? 1 : t < T.end ? 2 : 3;
        const caption = [
          "Before: riders paid straight from the plan list.",
          "Fees sat in small print, and after paying there was only a countdown.",
          "After: one short checkout lists every charge before paying.",
          "And the success screen shows exactly which hub to go to.",
        ][phase];
        return (
          <>
            <Tabs labels={["Before", "After"]} active={phase <= 1 ? 0 : 1} />
            <SectionBox
              x={40}
              y={72}
              w={354}
              h={420}
              label="Before · pay from the plan list"
            />
            <FrameName x={A.x} y={A.y - 20}>
              Plan list · Pay
            </FrameName>
            <FrameName x={B.x} y={B.y - 20}>
              After paying
            </FrameName>
            <Screen
              x={A.x}
              y={A.y}
              w={A.w}
              h={A.h}
              srcs={["old-plan-pay"]}
              alt="Old app: paying straight from the plan list"
              dim={t >= T.after}
            />
            <Screen
              x={B.x}
              y={B.y}
              w={B.w}
              h={B.h}
              srcs={["old-countdown"]}
              alt="Old app: a countdown after paying"
              dim={t >= T.after}
            />
            <Highlight
              {...frac(A.x, A.y, A.w, A.h, [0.03, 0.285, 0.94, 0.05])}
              color={C.red}
              label="Fees in small print"
              show={t >= T.bad && t < T.after}
            />
            <Highlight
              {...frac(A.x, A.y, A.w, A.h, [0.03, 0.92, 0.94, 0.055])}
              color={C.red}
              label="Pay from the list"
              show={t >= T.bad + 400 && t < T.after}
              below
            />
            <Highlight
              {...frac(B.x, B.y, B.w, B.h, [0.04, 0.14, 0.92, 0.12])}
              color={C.red}
              label="Just a timer"
              show={t >= T.bad + 800 && t < T.after}
            />

            <Arrow x={402} y={290} show={t >= T.after} label="merged" />
            <SectionBox
              x={460}
              y={72}
              w={354}
              h={420}
              label="After · confirm, then clear success"
              after
              show={t >= T.after}
            />
            <FrameName x={N1.x} y={N1.y - 20} show={t >= T.after}>
              Confirm and pay
            </FrameName>
            <FrameName x={N2.x} y={N2.y - 20} show={t >= T.after}>
              Payment successful
            </FrameName>
            <Screen
              x={N1.x}
              y={N1.y}
              w={N1.w}
              h={N1.h}
              srcs={["pay-confirm"]}
              alt="New: confirm and pay with every charge listed"
              show={t >= T.after}
            />
            <Screen
              x={N2.x}
              y={N2.y}
              w={N2.w}
              h={N2.h}
              srcs={["pay-success"]}
              alt="New: payment successful with the hub to visit"
              show={t >= T.after}
            />
            <Highlight
              {...onPhone(N1.x, N1.y, N1.w, [24, 458, 392, 334])}
              color={C.green}
              label="Every charge, listed"
              show={t >= T.good}
            />
            <Highlight
              {...onPhone(N2.x, N2.y, N2.w, [24, 394, 392, 257])}
              color={C.green}
              label="Which hub to go to"
              show={t >= T.good + 500}
            />
            <Caption
              step={phase <= 1 ? 1 : 2}
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
    r: [24, 874, 392, 56] as [number, number, number, number],
    title: "The total, in the button",
    sub: "Days and price, read back before paying.",
  },
];

export function PlansStory() {
  const H = 640;
  const O = { x: 44, y: 132, w: 170, h: 378 };
  const N = { x: 458, y: 132, w: 170, h: 371 };
  const T = {
    oldNotes: 800,
    after: 3000,
    newNotes: 3600,
    end: 3600 + 4 * 550 + 400,
  };
  return (
    <Stage w={W} h={H} total={T.end}>
      {(t, replay, done) => {
        const phase = t < T.after ? 0 : t < T.end ? 1 : 2;
        const caption = [
          "Before: near-identical boxes, four numbers each. This is where many riders left.",
          "After: one decision per screen, and one number per plan to compare.",
          "The fewer things you ask someone to weigh at once, the faster and surer they decide.",
        ][phase];
        return (
          <>
            <Tabs labels={["Before", "After"]} active={phase === 0 ? 0 : 1} />
            <SectionBox
              x={24}
              y={72}
              w={400}
              h={492}
              label="Before · old plans"
            />
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
              dim={t >= T.after}
            />
            {OLD_NOTES.map((n, i) => {
              const b = frac(O.x, O.y, O.w, O.h, n.f);
              const on = t >= T.oldNotes + i * 500 && t < T.after + 600;
              return (
                <Pin
                  key={n.title}
                  x={b.x + b.w - 14}
                  y={b.y - 6}
                  n={i + 1}
                  show={on}
                  color={C.red}
                />
              );
            })}
            <div
              className="absolute grid w-[184px] gap-2"
              style={{ left: 228, top: 132 }}
            >
              {OLD_NOTES.map((n, i) => (
                <CommentCard
                  key={n.title}
                  n={i + 1}
                  title={n.title}
                  sub={n.sub}
                  show={t >= T.oldNotes + i * 500}
                  color={C.red}
                />
              ))}
            </div>

            <SectionBox
              x={436}
              y={72}
              w={400}
              h={492}
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
              return (
                <Pin
                  key={n.title}
                  x={Math.min(b.x + b.w - 12, N.x + N.w - 14)}
                  y={b.y - 8}
                  n={i + 1}
                  show={t >= T.newNotes + i * 550}
                  color={C.green}
                />
              );
            })}
            <div
              className="absolute grid w-[184px] gap-2"
              style={{ left: 642, top: 132 }}
            >
              {NEW_NOTES.map((n, i) => (
                <CommentCard
                  key={n.title}
                  n={i + 1}
                  title={n.title}
                  sub={n.sub}
                  show={t >= T.newNotes + i * 550}
                  color={C.green}
                />
              ))}
            </div>
            <Caption
              step={phase === 0 ? 1 : 2}
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
