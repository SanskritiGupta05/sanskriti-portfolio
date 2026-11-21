# Bounce Daily case study — working notes

Source of truth for the rewrite of `/work/bounce-daily`. Facts here come from Sanskriti or from the Figma files. Nothing goes on the page that isn't in this file.

## Goal
A short, decision-led case study: each key decision shows problem → options → choice → why (+ UX law where it genuinely applies) → impact. About a 5-minute read; the summary card at the top works on its own.

## Facts
- Product: Bounce Daily, EV scooter rental for delivery and gig riders (Bangalore, Delhi NCR).
- Context: worked through DreamLaunch. PM: Aum Vats. Scope: rider (user) app only, not admin.
- Inputs: old app screenshots plus her own walkthrough of the live old app; PM picked UI references, Yulu first (onboarding is close to Yulu's).
- Live on Play Store (`com.bouncedaily.app`, "Bounce Daily — EV Bike Rental"). Checked 2026-11-20: 4.8★, ~4.9K reviews, 1L+ downloads; listing claims 50,000+ riders. No pre-redesign rating known, so the rating is not credited to the redesign.
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

## Still open
- Timeline: old screenshots are May 2025; workspace labels say Dec 2025. Need real start and end months.
- Any feedback after launch from Aum or the team.
