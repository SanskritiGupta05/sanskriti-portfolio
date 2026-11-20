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

## Still open
- Timeline: old screenshots are May 2025; workspace labels say Dec 2025. Need real start and end months.
- How the work with Aum ran day to day (his rough "Aum's version" frames → her designs?).
- Any feedback after launch from Aum or the team.
- Which 3–4 decisions lead the page (candidates: scooter-type step, KYC status on home, no dead ends, dues and renewals up front, map-first hubs).
