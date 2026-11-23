# Bounce Daily case study — working notes

Source of truth for the rewrite of `/work/bounce-daily`. Facts here come from Sanskriti or from the Figma files. Nothing goes on the page that isn't in this file.

## Goal
A short, decision-led case study: each key decision shows problem → options → choice → why (+ UX law where it genuinely applies) → impact. About a 5-minute read; the summary card at the top works on its own.

## Facts
- Product: Bounce Daily, EV scooter rental for delivery and gig riders (Bangalore, Delhi NCR).
- Context: worked through DreamLaunch. PM: Aum Vats. Scope: rider (user) app only, not admin.
- Inputs: old app screenshots plus her own walkthrough of the live old app; PM picked UI references, Yulu first (onboarding is close to Yulu's).
- Shipped: the revamp took 3 months (her confirmation, 2026-11-23) and is live on Play Store (`com.bouncedaily.app`, "Bounce Daily — EV Bike Rental"). Checked 2026-11-20: 4.8★, ~4.9K reviews, 1L+ downloads; listing claims 50,000+ riders. No pre-redesign rating known, so the rating is not credited to the redesign.
- Licence rule (high-speed needs a driving licence, low-speed doesn't) was the PM's business rule; competitors do the same. Present it as a constraint she designed around.
- Numbers in the old Figma draft (42% KYC abandonment, SUS 58→79, n=24, 12 weeks, dark mode) are NOT real. Never use them.
- Figma: personal file `eJ4fYjVQr9UC9cwEYrLDgP` (old vs new boards); shared file with Aum `z8dq27bSORUWXSJnSToYAV` (reference only, don't describe its "structured flow" process on the page).

## Countable, from the Figma files
- About 270 screen explorations in the shared UI workspace.
- 8 rider scenarios designed beyond the happy path: in-trip dues; damage dues + late fees; returning with no dues; plan expired; KM top-up; out of service area; no scooters at hub; no scooters in the city.
- Old app: about 9 document-upload screens during sign-up, before a rider sees any scooter (verify count before publishing).

## Decision: scooter type gets its own step (the disagreement with Aum)
- Sanskriti's proposal: drop the separate scooter screen. The plan screen already has a low/high-speed toggle; tapping high speed could show a sheet saying a licence is needed. Fewer taps.
- Aum's view: show the licence rule up front and have riders choose the scooter type first, as its own decision, so they're clear about what they picked before seeing plans.
- Outcome: separate scooter step kept. She agreed it made sense.
- Takeaway (her words): fewer clicks doesn't always mean better understanding, or better accessibility.
- Explorations: 5 scooter-card versions, 3 combined scooter + plan versions, 2 options for the switch-speed sheet.

## Core design challenge (from Sanskriti, 2026-11-21)
- Many riders aren't highly educated and want every piece of information easy to reach. The challenge: show everything they need without the UI looking complex, and without putting all the data on one screen, which overwhelms. This tension should run through the case study (a good candidate for the problem statement and the "challenges" section).
- She confirmed it was a major challenge and was kept in mind throughout. Placement on the page: (1) one line in the summary card; (2) its own short section right after "Who it's for": "Everything visible, nothing overwhelming"; (3) each decision card gets a one-line "For the rider" note showing how that decision served it (scooter step: Yes/No licence on each card; hubs: a map, not names to read; KYC: one status card with one next step; dead ends: an illustration plus one action; dues/renewals: status on home, not remembered dates; onboarding: pictures and real riders before any form).

## The brief: what Aum came with (from Sanskriti, 2026-11-23)
Why the old app needed an urgent revamp. These are the PM's concerns when he first brought the project to her.
1. **Riders with low literacy.** Many riders can't read much. Information has to be up front, but not overwhelming.
2. **Drop-off at plan selection.** Riders were leaving while choosing a plan because they couldn't understand or compare the plans.
3. **KYC before any look at the app.** The old app made riders finish KYC before they could see anything in it. We wanted riders to get a feel for the app first, so they could judge whether it was useful to them.
4. **Where KYC belongs.** KYC is a big part of the journey, and there were disagreements and agreements with Aum about where to place it: before onboarding, during onboarding, after onboarding, before choosing a hub, after choosing a plan, before payment, or after payment. (Outcome: see "Decision: when KYC happens" below.)
5. Other concerns: to confirm with Sanskriti. Candidates from the notes: unclear system states (countdown timer, failed-payment toast), dead ends (sold-out hub, out of area), and the overuse of red.
- No drop-off numbers are known. Describe drop-off as what the PM saw, never as a percentage.
- Wording on the page: "low literacy" or "not comfortable reading long text", not "illiterate".

## Page structure v2 (proposed 2026-11-23, UX-led)
Every decision answers: which concern from the brief it solves, where in the journey it happens and why there, what options we weighed, what we chose and why, and what it means for the rider.
1. Header and summary card: role, 3 months, shipped and live on Play Store, DreamLaunch with PM Aum Vats.
2. Who rides Bounce: delivery and gig riders whose income depends on the scooter; many have low literacy.
3. Why it needed a revamp: the brief's concerns, each shown with the old screen as evidence.
4. The principle: everything visible, nothing overwhelming (plus "Where am I? What's happening? What next?").
5. The big move: re-ordering the journey. Old: sign up → KYC wall → then the app. New: Discover → Choose → Verify → Pay → Ride → Manage → Renew. Value before effort.
6. Decisions, in journey order:
   - A look before the commitment (onboarding and a 2-screen sign-up) → concern 3
   - Map-first hubs (with the hub-merge transition) → concern 1
   - Scooter type as its own step (the disagreement with Aum) → concern 2
   - Plans you can compare (price per day, KM sheet, review) → concern 2
   - Where KYC goes (every placement weighed, three rounds, the hybrid) → concerns 3 and 4
   - Status, not memory (KYC status, dues, renewals, booking card on home) → concern 1
   - No dead ends → concern 5
7. The UI layer, kept short: calm visual language, illustrations, design system.
8. Outcome: shipped, the before → after table, what changed for riders.
9. What I learned and closing thought.

## Page assets (v2, 2026-11-23)
- The page uses only the old app screenshots and the revamped screens from Page 1 section "App flows · old journey → new journey" (1227:8313), exported at 1.5x into `public/assets/cases/bounce/v2/{old,new}/` (sizes in `src/components/casestudy/bounceScreens.ts`). The earlier Framer images (a.webp, hero.webp, d.webp …) are no longer used.
- Old sign-up count, from that board's numbering: steps 8–25, i.e. 18 screens (name and phone → wait for verification) before the first hub screen (26). This replaces the conflicting 7 / 9 / 11 figures above.

## Working with Aum
- Regular calls. Sanskriti brought her thinking for each flow, they brainstormed, Aum added his ideas, opinions and feedback, and she improved the flows from that. Sometimes he made his own versions too (the "Aum's version for reference" frames).

## More story (from Sanskriti, 2026-11-20)
- She was the app's first UI designer; before her there was no UI designer. Aum later told her she set the first benchmark / foundation for every designer who comes after.
- Done before the AI boom: only ChatGPT was available. Research was done by hand, and decisions were grounded in UX principles.
- She raised early on that the app overused red (primary buttons, headers, icons, card backgrounds), using colour psychology. Aum said to skip it for then and focus on UX and flows.
- The case study shows her refined version (calmer colour, consistent buttons and sheets). Her call: don't label it "refined"; present it as her designs. The live app may have changed since anyway (it's 2026).

## Lead decisions (agreed 2026-11-20)
1. Scooter type gets its own step (licence rule up front)
2. Map-first hub selection
3. KYC status on the home screen, with one next step
4. No dead ends (no scooters at a hub, wrong type, out of area)
5. Dues and renewals shown up front

## Case study assets (Figma)
Built in her file `eJ4fYjVQr9UC9cwEYrLDgP`, page "Case study — assets" (1115:7577), using the file's own Bounce text and colour styles and cloned screens (not screenshots).
- Doc components: `Doc/Tag` (1115:7579), `Doc/Point` (1115:7581).
- D01 · Scooter choice board (1115:7584): Option A "Fewer taps" (her proposal) vs Option B "Decide first" (shipped), pros/cons, law + learning.
- D02 · Map-first hubs (1118:7651): old hub list + detail → map with nearest hub card + nearby hubs. Law: Jakob's law.
- D03 · KYC status (1118:8388): old 7-step sign-up wall (details, reference, Aadhaar, licence, selfie, then a wait screen) → "Onboard in 3 steps" (plan, KYC, payment) + pending / rejected-with-reasons / approved cards on home. Law: Visibility of system status. Number: 7 steps → 3.
- D04 · No dead ends (1118:11688): old failed-payment toast + plan-ended timer → hub sold out → nearby hubs, outside service area → coming soon, payment failed → try again. Law: Help users recover from errors. Number: 8 scenarios.
- D05 · Dues and renewals (1118:12357): old countdown + bare dues list → plan expiring / expired / KM low on home + dues explained before paying. Law: Recognition over recall. Number: 4 plan states.
- D06 · Onboarding (1120:7935): old 3 slides + 7-step form → splash + 3 illustrated intro screens (scooter on map, rider testimonials, what's included) + sign-up in 2 screens (phone, OTP) + "Onboard in 3 steps" checklist. Law: Aesthetic-usability effect. Number: 7 form steps → 2 screens. Sanskriti is proud of this visual work; give it room on the page.
- D07 · Choose a plan (1120:9364): dense old plan cards → plans with price per day, KM sheet, review screen. Law: Hick's law.
- D08 · Pay (1120:10160): straight to payment gateway → price breakdown + Shield + referral, success screen with hub to visit. Law: Peak-end rule.
- D09 · Home (1120:10506): countdown timer → booking card that changes by stage (booked, picked up, riding). Law: Visibility of system status.
- V01 · Visual language (1120:13971): custom illustrations set + loyalty tiers (Start, Cruise, Power).
- Bottom sheets (not a case study decision, just cleanup): every sheet inside the screen copies on the assets page is full width with 20px left/right margins, top corners 24, close button 12 above, no grabber/dividers, red-outline secondary buttons. Original screens on Page 1 untouched. The S01 board was removed on her request.
- Page plan: D01–D05 are the key decisions; D06 onboarding gets its own showcase; D07–D09 + V01 form a shorter "more before and after / system" part.
- Before/after boards: grey "Old app" row, then red-outlined "Shipped" row, then a law + "what changed" footer. Boards are 1440 wide, laid out left to right at x = 0, 1600, 3200, 4800, 6400.

## Colour and component system (assets page)
- Applied to all screen copies on the assets page except onboarding (D06 stays visual-heavy), old-app screens and illustrations: one red primary button per screen; secondary buttons white + Neutral/300 border + dark text; red text/prices/tabs/chips/card headers → neutrals; status uses the file's Warning/Error/Success/Info tokens; buttons Large 50 / Small 40, radius 12.
- Softer pass (after her feedback that the first recolour wasn't aesthetic): dark borders and black chips/buttons were too harsh. Now: list backgrounds white, cards white with hairline Neutral/200 borders, selected card = Primary/Surface tint + red border (one soft accent), small in-card buttons and chips tonal Neutral/100, promo ribbons soft brand tint with Primary/Dark text, segmented tabs = light track with a white selected pill. Reference frame "Colour direction · current vs softer (reference)" (1131:11171) on the assets page.
- WanderList-inspired restyle (her reference: Figma c8UPv7DELt8ZjRwFCuraMk, page WanderList; soft shadows, grey trays, clean layouts): on all non-onboarding screen copies, header strips + white bodies became grey trays (Neutral/100, hairline Neutral/200, radius 18, 4 inside) holding white cards (radius 14, two-layer soft shadow); plan list is one tray of white cards; search fields and chips are grey pills; small in-card buttons are white and lifted with a soft shadow; the flat white bottom bar is replaced by a floating warm-dark pill nav (Bounce/Bottom nav 1136:11348, Active=Home/Referral/Profile) with a white fade behind it; on sheet screens the nav sits under the dimmed overlay. Status bar left as the existing iOS instance. Preview frame "Restyle preview · WanderList-inspired" (1136:11349). DS board has a new "Surfaces and navigation" panel.
- Exact WanderList tray spec (read at full depth, 2026-11-20): tray #f7f7f7 radius 18, padding 4, gap 10, no border; label row padding 8/12/0/12, 14px icon + 14 SemiBold; inner white card radius 16, 1px #ecebeb hairline OUTSIDE, one shadow 0/0/4 at 5%. Lesson: the first restyle guessed the inner card (two-layer shadow, no hairline) because only 3 levels were read; all 45 cards were corrected to the real spec. Mapped to Bounce tokens: Neutral/100 tray, Neutral/200 hairline.
- Components: Bounce/Price row (1142:11640; Value=Amount/Free/Discount; Label, Note, Show note, Show info, Value) and Bounce/Price breakdown (1142:11641; Title, Total, Show discounts), full auto layout, built from her own reworked version (1140:11790). Swapped into the D08 and restyle-preview pay screens.
- Measured red UI elements (text, fills, borders; illustrations and icons excluded) on 26 screens: 13.2 → 3.3 per screen (75% less). This compares her first handoff screens with the system version, so phrase it as a system rule ("a red budget of about 3 per screen"), not as a shipped before/after.
- DS · Colour and components board (1128:11128): red budget, colour roles (Doc/Swatch 1128:11111), Bounce/Button set (1128:11110: Primary/Secondary × Large/Small), Bounce/Status set (1128:11127), bottom sheet anatomy + 5 rules, "Learning from Zomato" panel (quote: "We overused red since it was our brand color." from "Developing the Zomato design system", uxdesign.cc).

## Reverted (2026-11-20, her call)
- All screen copies on the decision boards (D01–D05, D07–D09, V01) were replaced with fresh, unmodified clones of her original screens. The colour pass, bottom-sheet cleanup, trays, soft shadows, pills, floating nav and price-breakdown swap are gone from the boards. D06 onboarding and the old-app rows were never changed.
- Kept on the page but unused, for reference: DS · Colour and components board, Bounce/Button, Bounce/Status, Doc/Swatch, Bounce/Bottom nav, Bounce/Price row, Bounce/Price breakdown, and the two preview frames (including her own edited price breakdown, 1140:11790).
- So the "13.2 → 3.3 red per screen" figure no longer describes the boards; don't use it on the page unless the colour system is applied again.

## Editable full-size screens (Page 1)
- 2026-11-21: section "Case study screens (editable)" (1157:7577) on Page 1, right of "new bounce". Full-size copies (440 wide; onboarding 393, loyalty 360) of every Page 1 frame used on the assets-page boards, one labelled row per board (D01 A/B, D02–D05, D06 first impression + sign up, D07–D09, V01 loyalty + illustrations), 37 frames. Old-app screenshots not included. A screen used on two boards has a copy in each row. All refinements happen here, frame by frame, with her approval; the originals in "new bounce" stay untouched.
- Frame log: 1157:7579 (D01 Option A, Select Your Plan): plan list replaced by a clone of her list 1145:16849 (old list hidden, 1157:7605) with 30/14/7/3 days in the grey tray and 5 days (selected, red radio) in the pink promo tray. Km and totals are sample values from the per-day prices; real ones still needed.
- Same frame, second pass (approved "all recommended"): speed toggle hidden and replaced by a "Chosen scooter" summary tray (red scooter thumbnail, "High speed · 60 km/h", licence icon + "Driving licence needed", underlined "Change"), so the D01 licence rule isn't bypassed; header moved to y 68 and title in sentence case ("Select your plan"); one home indicator (extra one hidden); footer side padding 24 so the button matches the 392 content width; tax note as a 12px grey caption "Includes all taxes"; button reads "Continue with 5 days · ₹1,500 →"; black border removed from the "Need more KMs?" banner. Status bar instance unchanged (iPhone 13 style); only spacing below it was fixed.
- Third pass (her call: keep the toggle, improve its UI; swap the status bar): summary card removed; toggle restored and restyled as a grey track (#f7f7f7, radius 14, 4 inside) with two segments, each "Low speed / High speed" plus a licence icon line "25 km/h · No licence" / "60 km/h · Licence needed"; selected = white pill with soft shadow, dark SemiBold. Old toggle children are hidden inside the track. New local component "iOS/Status bar · iPhone 16 Pro Max" (1162:10965, 440x62, Dynamic Island) on the Components page, swapped in (iPhone 13 bar hidden); header at y 78, content at y 125.
- Toggle colours, superseded: her first pick "1+4", from preview 1164:11082 on Page 1): selected segment = Dark/Default pill with white title; licence line colour-coded: Low speed = green tick + "25 km/h · No licence" (Success/Default), High speed = ID-card icon + "60 km/h · Licence needed" in Warning/Light (#ffbf5d, readable on dark). Open point: when High speed is NOT selected (on grey), the amber needs a darker shade than Warning/Dark (#d98000 is ~3:1 for 12px text); when Low speed IS selected (on dark), its green should switch to Success/Light.
- Toggle colours, final (her pick: option 4 = 2 + 3): selected segment = Primary/Surface tint, 1.5 Primary/Brand border, title Primary/Dark; licence lines: green tick "25 km/h · No licence" (Success/Default), amber ID card "60 km/h · Licence needed" (Warning/Dark #d98000, as in the preview; ~3:1 contrast at 12px, a darker amber would read better).
- D01 Option A second screen (switch sheet), applied after demo 1169:10964: new frame 1170:10999 ("… · refined") placed where the old copy was (old copy 1157:7745 hidden). Background = the refined plan screen with Low speed selected in the toggle (the state before switching); sheet full width with top radius 24 and 20 side margins, close button 12 above; title "Switch to high speed?" 22 SemiBold centred; Specifications as her tray pattern with rows Driving licence = Needed (amber ID icon), Top speed = 60 km/h, Price = from ₹X a day; grey "Need help?"; buttons "Switch to high speed" (red) and "Keep low speed" (grey outline); one home indicator.
- D01 Option B, plan screen: new frame 1177:11013 = clone of the refined plan screen 1157:7579, with High speed selected in the toggle (the rider just chose it on the scooter screen); old copy 1157:8038 hidden. Note: 1157:7579 itself now shows Low speed selected (her edit), and its toggle frame is named "Frame 2147224146".
- Scooter choice demo built (1172:10988): fixes the bug where the Low speed card was tagged "License Required" while its row said NO; tray of two cards with radio, sentence-case titles, dark speeds, meaning-coloured licence lines, "from ₹X a day"; bigger scooter image; helper tip "No driving licence? Pick Low speed. You can switch later."; full-width "Continue with high speed →". Not yet applied to the D01 Option B scooter copy (1157:7949).

## Decision: when KYC happens (Plan → KYC → Pay) — discussed 2026-11-22
She had a similar discussion with Aum, and this order is what they agreed (confirmed 2026-11-23): KYC is submitted before paying; riders can skip it for now, but can't collect the scooter without verified KYC, so everyone completes it before pick-up. This is a strong candidate for a decision card ("problem → options → choice → why").

**Correction to the Framer draft:** its lifecycle (Discover → Choose → Pay → Verify → Ride → Manage → Renew) is outdated. Use Discover → Choose → Verify → Pay → Ride → Manage → Renew.

**How we got there (three rounds):**
1. First assumption (from the v1 "Onboard in 3 steps" checklist: plan → KYC → payment): KYC between plan and pay, with the rider waiting for approval before paying. Problems found on the flow map: the Review button said "Confirm and pay" but led to KYC; Verify identity said "Continue to payment" but led to a 2–4 hour wait; after approval the rider had to tap "Start booking" to get back to a plan they had already chosen, and the hub could sell out meanwhile.
2. She then proposed pay first, KYC after: payment books the scooter; KYC must be verified before pick-up because hub staff check it at the hub (this is what Aum described). Built: Payment successful → "Complete KYC"; home states "KYC needed" (can't collect yet), "KYC in review", "KYC not approved"; tracker Paid → KYC → Pick up → Ride.
3. She came back to KYC before payment, worried it would bring back the old KYC wall. Discussion settled on the **hybrid**.

**Options weighed:**
| Order | Friction before paying | Friction after paying |
|---|---|---|
| Pay → KYC | Lowest | Highest: riders who pay but never finish KYC need refunds; hub staff turn people away |
| KYC approved → Pay | Highest: a 2–4 hour wait between choosing and paying; plan/hub must be held | Lowest |
| **Hybrid: KYC submit → Pay** (chosen) | About 2 minutes of doing, no waiting | Low: rare re-uploads |
| KYC → Plan → Pay | Rider cleared first | Basically the old app's KYC wall |

**Why it isn't the old KYC wall:** the old app asked for 11 screens (Aadhaar, OTP, licence, selfie, plus a reference contact) right after sign-up, before the rider saw any hub, scooter or price. The new flow asks after hub, scooter and plan are chosen, and asks for less (Aadhaar + selfie; licence only for high speed).

**UX reasoning used:** value before effort (show hub, scooter, price first); commitment and consistency (after choosing a plan, riders are more likely to finish the next step); goal-gradient (a short "step 1 of 2" right before paying feels near the finish); don't make people wait mid-task (the real problem with "approve, then pay").

**Competitors:** not verified. General pattern only: two-wheeler rental apps in India usually let riders browse and choose first, and ask for documents before payment or at pick-up. Research specific apps (Yulu, Zypp, Royal Brothers, Vogo) before quoting anything on the page.

**Final flow (hybrid + escape hatch):**
Plan → KM → Review ("Continue to KYC", with "2 steps to book: ① KYC · ② Pay") → ① Verify identity (submit Aadhaar + selfie; "Submit and continue to pay") → ② Confirm and pay (chip "Step 2 of 2 · KYC submitted ✓") → Payment successful ("We're checking your KYC, usually 2–4 hours"; hub staff check it at pick-up) → Home · KYC in review → Home · ready to collect → pick up → ride.
- **"Do KYC later"**: a quiet link on Verify identity for riders in a hurry. They pay first, see "Payment successful · KYC skipped" (main button "Complete KYC"), and home shows "KYC needed: you can't collect yet" until it's done. Most riders take the default.
- Ways to keep the KYC step light: present it as one checkout ("2 steps to book"); Aadhaar via OTP/DigiLocker if Bounce supports it; KYC only once (returning riders skip it); save progress if they drop off.
- How to know it works: watch drop-off between Review and Pay after launch; if too many leave at KYC, make "Do KYC later" more prominent or flip the default.
- Checklist wording now: 1 Choose your plan · 2 Verify KYC and pay · 3 Collect your scooter.
- Open with Aum: refund policy if KYC can't be fixed after payment; is verification instant (Aadhaar OTP/DigiLocker) or manual (2–4 hours)? If instant, the order matters much less.

## Other flow decisions from the 2026-11-22 session
- **Switch scooter is mid-rental only.** Before paying, switching speed is just the plan-screen toggle and the "Switch to high speed?" sheet. Mid-rental, low → high checks only the driving licence (Aadhaar and selfie already verified), then the rider swaps at a hub; high → low needs no documents. Entry: a "Switch to high speed scooter" card under the booking card on Home while the rental is running (active, plan ending soon, low on KM); not shown when the plan has ended, the scooter is locked, or before pick-up. Open: price difference and unused KM when switching.
- **Booking card button rule:** Renew plan (left) and Top up KM (right) never move; only emphasis changes. Renew is primary by default (every rider renews; a plan ending locks the scooter); Top up becomes primary only when KM is the problem. Plan ended shows Renew alone.
- **Progress tracker** (Paid → KYC → Pick up → Ride) shows only until the ride starts; after that the card uses a status chip plus plan and KM tiles.
- **Allow location** screen added before Pick a hub (it powers distance and nearest-hub-first), with "Enter my area instead".
- **Nearest hub first:** hub cards show distance and a "Nearest" tag; the carousel starts at the nearest hub. The same hub card is reused on payment success and on home so riders recognise their hub.
- **Security deposit in 4 parts:** a v1 pay screen offered "Pay ₹250 in next 4 renewals · Security deposit in 4 EMIs"; revamped as a choice on Confirm and pay. Confirm this is a real offer and the amounts.
- **Booking details used across screens (sample values):** low speed scooter, 30 days, 4,000 km, RR Nagar Hub (0.8 km), plate KA 01 AV 2848, first payment ₹11,398 (plan ₹9,400 + deposit ₹999 + onboarding ₹999; Shield free), renewal ₹9,400. Fees and km figures are placeholders.

## Figma work from the 2026-11-21/22 sessions (for reference)
- Page 1 sections: "App flows · old journey → new journey" (overview, old journey as numbered screenshots, new journey by stage), "New app · flow map" (every new screen connected with arrows, branches and return paths), "Revamp · remaining screens" (the last v1 screens rebuilt with the new components).
- New page "Design system": the old variables and styles were deleted (her call) and replaced with v1 tokens (Primitives, Color, Spacing, Radius), 16 text styles, 2 shadows, 22 icons and 14 components (Button, Chip, Radio, Step, Progress bar, Icon tile, Input, List row, Card, Tray, Header, Bottom bar, Sheet, Slot). The screens are not linked to these components yet; she chose to skip that for now.


## Her own revamp of the editable screens (2026-11-23)
Sanskriti revamped the screens in "Case study screens (editable)" (1157:7577) herself with the new components. These refined frames are now the source for the case study:
- D01 A: 1157:7579 (plan), 1170:10999 (switch sheet). D01 B: 1157:7949 (scooter choice, not yet refined), 1177:11013 (plan).
- D02: 1180:22160 (960 wide, hub map + sold-out sheet), 1232:9713 "Allow location" (new screen: why location helps, nearest hub first, distance, only hubs with scooters; "Allow location access" / "Enter my area instead").
- D03: 1157:8883 (onboard in 3 steps), 1196:10983 / 1199:10994 / 1199:12410 (KYC pending, not approved with reason + "Re-upload Aadhaar", approved), each with an "Account status" tray and a Submitted → In review → Approved stepper.
- D04: 1157:12114, 1157:12365, 1206:10953. D05: 1201:10980, 1202:10991, 1203:10952, 1224:8316.
- D06: 1211:11170 (splash, "A · Pure"), 1157:19553 / 19777 / 19792, 1157:19956 / 20287 / 20612.
- D07: 1180:24391, 1209:10956, 1209:11281. D08: 1211:10955 (confirm and pay: "Your booking" tray with Change, Shield, referral, price breakdown, "Pay ₹11,398 →"), 1211:11051 (payment successful, "Your hub" card, "Go to home").
- D09: 1216:10982, 1216:12433, 1217:11030 ("Your booking" tray per stage, step chips Paid / KYC / Picked up / Riding).
- V01: loyalty 1222:11028, 1222:13223, 1222:15419, 1220:11016 (rewards trays with progress "Unlock at …"); illustrations 1157:31055.

## Facts added 2026-11-23
- Platform: **Android only** (3 months). Why Android first, in her words: many riders come from lower-income backgrounds, and Android phones are cheaper and what they already use.
- She did the developer handoffs herself.
- Post-launch feedback (product manager's testimonial, used on her site): the redesign unlocked several new product capabilities, with noticeable improvements in rider onboarding and plan adoption after launch; exact numbers withheld for business reasons. In the case study it's credited to "Product Manager, Bounce Daily" (no name).
- All revamped screens in "Case study screens (editable)" now use the local component "Android/Status bar" (1317:10868, Components page, Roboto, punch-hole camera); the iOS home-indicator lines were removed (iOS components). Same swap applied inside case study v4's screen copies.

## Still open
- Timeline: the revamp took 3 months. Exact start and end months still to confirm (old screenshots are May 2025; workspace labels say Dec 2025). The Framer draft and the interview-prep guide say 2 months, and the prep guide calls it "not shipped"; both are wrong.
- Any feedback after launch from Aum or the team.
- KYC: refund policy if KYC fails after payment; instant vs manual verification (see the KYC decision above).
- Switch scooter: price difference and unused KM.
- Security deposit in 4 parts: real offer or not.
