# Bounce Daily · case study v5 (Qmentis structure)

Written 2026-11-23. Structure follows sharpisingh.com/qmentis (her reference); facts come only from the Figma "Case study · context" page (1266:9945) and docs/bounce-daily-case-study-notes.md. Voice rule: decisions are hers; the product manager brought concerns and reviewed. Aum is named only in the header Team cell. Built in Figma as a new frame next to v4 on "Case study · web page".

## Hero
Tags: Shipped · Consumer app · Android. Title: Bounce Daily. Subtitle: From a document wall to a rider journey.
Facts grid: Company (DreamLaunch · Client: Bounce Daily) · Team (Aum Vats, PM @ Bounce Daily; my role: product designer, the app's first UI designer, dev handoffs) · Timeline (3 months, 2025) · Platform (Android rider app · Live on Google Play). Hero image.

## 01 Context
Headline: The app asked for everything before it gave anything.
Body: what Bounce Daily is; the PM's concerns (drop-off at plans, documents up front, a rider base that reads little); first UI designer, no system.
Big numbers (old app): 39 screens to book a scooter (15 steps) · 11 KYC screens before a rider saw a single scooter.

## 02 The challenge
Big headline: Everything visible, nothing overwhelming.
Body: low literacy, every detail wanted, one screen can't hold it all; Android first (affordable phones).
Constraints row: KYC is mandatory (hub staff check it) · Licence rule (high speed needs a licence; business rule) · No research budget, before the AI boom · 3 months, no design system.

## 03 The rider + how I worked
Rider card: delivery and gig riders, Bengaluru and Delhi NCR, income depends on the scooter, Android, reads little.
"At every stage, they ask": Where am I? What's happening? What do I do next?
How I worked: walked the live app by hand, ~270 explorations, regular calls with the PM, Yulu as reference.

## 04 Insight · the big move
Headline: Before touching a single screen, I changed the order. Old vs new journey diagram (existing figure).

## 05 The solution · one rider's journey
Solution #1 Find it (onboarding, location, map) · #2 Choose it (scooter type, plan) · #3 Book it (KYC + pay) · #4 Ride and renew (home card). Each: label, "verb: line" heading, 2 sentences, existing figure.

## 06 Design decisions (Qmentis cards: label, title, one-line principle, canvas, THE CALL bar)
1. Scooter type gets its own step · Fewer taps doesn't always mean better understanding. · Call: scooter type first, licence rule on every option; toggle stays on the plan screen.
2. Map first, nearest hub first · Riders think "where's the closest scooter", not hub names (Jakob's law). · Call: allow-location step with "Enter my area instead", map opens on the nearest hub, the same hub card returns after paying and on home.
3. KYC just before paying · When you ask matters as much as what you ask. · Call: three rounds (approve-then-pay, pay-first, hybrid); submit right before paying (~2 min), verify in the background, "Do KYC later".
4. KYC status on home, one next step · Visibility of system status. · Call: 7 sign-up steps became a 3-step checklist; pending / rejected (with reason) / approved cards.
5. Dues and renewals up front · Recognition over recall. · Call: plan ending / ended / KM low on home; Renew is primary unless KM is the problem; buttons never move; dues explained before paying.
6. No dead ends · Help users recover from errors. · Call: 8 scenarios, each an illustration plus one action.
More calls at a glance (small cards): Onboarding 7 form steps → 2 screens · Price per day (Hick's law) · Pay shows every charge, success shows the hub · Progress tracker only until the ride starts · Switch scooter entry on home, mid-rental only (low→high checks the licence, high→low no documents, swap at a hub) · One red action per screen (too much red, raised early, deferred, fixed in the system) · Design system: tokens, 16 text styles, 14 components.

## 07 Edge cases
8 scenario chips + errors figure + renewals figure.

## 08 The UI layer
Illustrations + loyalty tiers figure; red note.

## 09 Making it real
Dev handoff + flow map figure.

## 10 Learnings
Quote card (PM feedback, "Product Manager, Bounce Daily"). Benchmark line.
Two cards: Shipped (live on Play Store in 3 months) · After launch (noticeable improvements in onboarding and plan adoption; numbers confidential).
What I'm taking with me, 01–05: When you ask matters as much as what you ask · Fewer taps doesn't always mean better understanding · Riders who read little need a different form, not less · Push for launch data from day one · Make the case with screens, not arguments.
Closing thought.
