# Bounce Daily · case study v3 (draft for review)

Written 2026-11-23 from the "Case study · context" page, the case study notes, the Page 1 flows and her revamped screens. Replaces the structure of web v2 (Figma 1287:2). Items marked **[confirm]** need a check before publishing.

---

## Why v2 is hard to read (senior review)

1. **No stated goal.** The page opens with "Aum's four concerns", which is the PM's list, not the problem we set out to solve. A reader never sees *what success meant*, so they can't judge the decisions.
2. **Too many frameworks at once.** Four concerns, seven decisions, a Venn, a three-question rule, a seven-stage lifecycle and a UX law on every decision. Each is fine alone; together the reader is holding six mental models.
3. **Headings don't carry the story.** Clever lines ("The app remembers, so the rider doesn't have to") read well but don't tell a skimmer what happened. A recruiter reading only headings should get the whole case.
4. **Decisions don't share a shape.** D3 and D5 show options and trade-offs; the others are mostly before/after. Senior work is judged on the trade-offs, so every decision needs them.
5. **Constraints are scattered.** KYC at pick-up, the licence rule, no research, 3 months, first designer, no system: these are what made the work hard, and they're spread across five sections.
6. **The ending is weak by structure, not by honesty.** "No numbers" is right, but it needs a frame: what success looks like, what was shipped, what we'd measure.

**Fix:** one goal, one principle, one structural change, five decisions with the same anatomy, then system, outcome, reflection. Headings state takeaways. Every section under ~80 words of body copy plus one visual.

---

## Page structure (about a 6-minute read)

| # | Section | Job | Visual |
|---|---|---|---|
| 0 | Hero | What, for whom, outcome in one line | Hero screens + meta row |
| 1 | TL;DR | Problem, what I did, result, in 3 lines | — |
| 2 | Context | The business and the rider's stakes | One rider-day line |
| 3 | The problem | One statement + evidence from the old app | Old journey strip (numbers) |
| 4 | Goals and constraints | What we were trying to achieve, and what we couldn't change | Two short lists |
| 5 | Approach | How I worked + the one principle | Principle card |
| 6 | The structural change | Effort-first → value-first journey | Old vs new flow map |
| 7 | Five key decisions | Same anatomy each time | Before/after + options table |
| 8 | Designing for every state | Edge cases + status on home | State grid |
| 9 | The UI layer | System, colour, illustrations | Components + illustrations |
| 10 | Outcome | Shipped, live, what I'd measure | Play Store badge + quote |
| 11 | Reflection | 2–3 learnings | Closing line |

Decision anatomy (sections 7.1–7.5): **The problem → What we considered → What we chose → Why → The trade-off.** One principle line at most, and only where it truly explains the choice.

---

## Copy

### 0 · Hero

**Bounce Daily**
**From a document wall to a rider journey.**
Redesigning an EV scooter rental app for delivery riders, so they can see what they're getting before the app asks anything of them.

Role: Product Designer (first UI designer on the app) · Team: Aum Vats, PM, via DreamLaunch · Timeline: 3 months, 2025 **[confirm months]** · Platform: Android & iOS rider app **[confirm]** · Status: Live on Google Play

### 1 · TL;DR

- **Problem:** riders had to get through 18 screens of forms and documents before they saw a single hub, scooter or price, and many left at the plan screen.
- **What I did:** reordered the journey so riders discover and choose first and verify just before paying, then redesigned every step for riders who read little.
- **Result:** shipped in 3 months and live on the Play Store; it became the baseline every designer after me works from.

### 2 · Context

Bounce Daily rents EV scooters by the day, week or month to delivery and gig riders in Bengaluru and Delhi NCR. For them the scooter is income: a sold-out hub, an expired plan or a failed payment is a day without earnings.

Many riders have low literacy and use the app outdoors, on budget phones, between deliveries. **[confirm "budget phones, outdoors" with Aum]**

### 3 · The problem

**The app asked for everything before it gave anything.**

A new rider went through 15 steps and 39 screens to book a scooter. The first 18 were forms, OTPs, documents, a selfie and a wait for approval, all before seeing a hub, a scooter or a price. Riders who got past that met plans laid out as near-identical boxes of four numbers each, and many left right there, at the moment of paying. After paying, the app showed a countdown and little else.

> Visual: old journey strip with three callouts: "18 screens before value", "Plans: 4 numbers per box", "After paying: a timer".

### 4 · Goals and constraints

**What we set out to achieve**
1. **Value before effort:** riders see hubs, scooters and prices before we ask for documents.
2. **Readable at a glance:** every screen understandable without reading a paragraph.
3. **One next step, always:** in every state, including the ones that go wrong.
4. **A foundation:** patterns and components the next designer can build on.

**What we couldn't change**
- **KYC is mandatory:** hub staff check it before handing over a scooter.
- **The licence rule:** high-speed scooters need a driving licence; low-speed don't (business rule; competitors do the same).
- **No research budget:** no interviews or analytics; just the live app, the PM and UX principles. Before the AI boom, so research was done by hand.
- **3 months, no design system:** I was the app's first UI designer.

### 5 · Approach

I walked the live app screen by screen as a rider would, mapped the full old journey, and worked through around 270 screen explorations with Aum on regular calls: I brought a direction, he pushed back, sometimes with his own version, and we settled on what a principle could defend. Aum picked references to learn from, Yulu first.

**One principle for every screen: everything visible, nothing overwhelming.**
Riders want every detail but won't read for it. So each screen shows only what that step needs, as a map, a picture, a chip or a number, and answers three questions: where am I, what's happening, what do I do next.

### 6 · The structural change

**Before changing a single screen, I changed the order.**

Old: Sign up → Details and documents → Wait → Find a hub → Choose a plan → Pay
New: Discover → Choose → Verify → Pay → Ride → Manage → Renew

Riders now see what they're getting first, and the effort comes only once they've chosen something worth finishing. Every decision below follows from this.

> Visual: Page 1 "App flows · old journey → new journey", simplified to two rows.

### 7 · Five key decisions

#### 7.1 · Riders find hubs on a map, not in a list

- **Problem:** hubs were a list of names and addresses; riders had to work out distance themselves, then open a second screen for details.
- **Considered:** a better list with distances; a map-first screen.
- **Chose:** map-first, opening on the nearest hub, with distance and scooters available on the card. An "Allow location" screen explains why, with "Enter my area instead".
- **Why:** riders use map apps all day; location is the decision (Jakob's law).
- **Trade-off:** depends on location permission, hence the explained ask and the manual fallback.

#### 7.2 · Scooter type is its own step (I argued against it)

- **Problem:** the licence rule had to be impossible to miss.
- **Considered:** *mine:* no extra screen, a speed toggle on the plan screen with a licence sheet on tap; *Aum's:* choose the scooter type first, licence rule on each card.
- **Chose:** Aum's. The toggle stays on the plan screen for riders who change their mind.
- **Why:** choosing a scooter and choosing a plan are two decisions; mixing them was the same load that made riders drop off at plans.
- **Trade-off:** one extra screen. What I took from it: fewer taps doesn't always mean better understanding.

#### 7.3 · Plans compare on one number

- **Problem:** four numbers per plan in identical boxes; comparing meant reading and remembering.
- **Considered:** a comparison table; one decision per screen.
- **Chose:** scooter → plan → kilometres → review. Every plan leads with its price per day.
- **Why:** fewer options per screen, faster decisions (Hick's law); a review step means nobody pays for something they didn't pick.
- **Trade-off:** more screens in the flow, each lighter.

#### 7.4 · KYC moves to just before paying

- **Problem:** KYC can't be removed, but where it sits decides who makes it through.
- **Considered:** during sign-up (the old app); before choosing a hub; approved before paying (hours of waiting, hub can sell out); after paying (refunds, riders turned away at pick-up); submitted right before paying.
- **Chose:** submitted right before paying, about two minutes, verified in the background, presented as "2 steps to book". Asks for less than before: Aadhaar and a selfie, licence only for high speed. A quiet "Do KYC later" for riders in a hurry.
- **Why:** riders have already chosen, so they're motivated to finish; a short "step 1 of 2" feels like the finish line (goal-gradient effect).
- **Trade-off:** riders who skip KYC can pay but can't collect until it's done; home tells them so. Took three rounds with Aum to settle.

#### 7.5 · Home shows where the rider stands

- **Problem:** after paying, the old app showed a countdown; when it hit zero it said time had run out.
- **Considered:** notifications only; a status card on home.
- **Chose:** one booking card that changes with the stage (KYC in review, ready to collect, riding, plan ending, plan ended), always with one next step. Renew and Top up never swap places; Renew leads unless kilometres are the problem.
- **Why:** visibility of system status; the app remembers so the rider doesn't have to.
- **Trade-off:** more states to design and build, and every one needed copy and an action.

### 8 · Designing for every state

**The unhappy paths got as much design as the happy one.**
Eight scenarios beyond the happy path: sold-out hub, city not served, payment failed, KYC not approved, plan ending and ended, kilometres low and used up, dues before a new trip. Each has an illustration and one clear way forward; in the old app most ended in a toast.

> Visual: 2×4 grid of state screens.

### 9 · The UI layer

**A calmer, reusable UI.**
Built a small system as I went: tokens, 16 text styles and 14 components **[confirm counts against the Design system page]**, so a pattern learned once works everywhere. Custom illustrations carry availability, verification and service states so riders don't rely on text. I flagged early that red was everywhere; Aum asked to park it until the flows were right, and the system now keeps one red action per screen.

> Visual: components strip + illustration set + loyalty tiers.

### 10 · Outcome

**Shipped in 3 months, live on Google Play.**
I don't have before-and-after numbers, and I won't invent them. What I'd measure first: drop-off between plan review and payment (where the KYC decision lives), share of riders verified before pick-up, and support calls about booking status.

> "You've set the first benchmark for every designer who works on this app after you." **[confirm exact wording with Aum, or paraphrase]**

### 11 · Reflection

- **When you ask matters as much as what you ask.** KYC asked for the same documents before and after; moving it turned a wall into a last step.
- **Design for the person, not the persona.** A rider who reads little doesn't need less information, they need it in a form they can take in at a glance.
- **Next time:** push for launch data from day one, settle the KYC open questions (refunds, instant vs manual verification) earlier, and make the colour case with screens side by side, not an argument.

---

## Open items before publishing
- Exact start and end months.
- Platform (Android only or both).
- "Budget phones, outdoors" as a rider fact.
- Design system counts (text styles, components).
- Aum's quote: exact words or paraphrase.
- Sample values in screens (₹X, ₹999 fees, ₹11,398) labelled or replaced.
- "18 screens before a hub" vs the context page's "11 KYC screens before a scooter": pick one definition and use it everywhere.
