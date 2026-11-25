export const BOUNCE = {
    name: "Bounce Daily",
    title: "Redesigning the rider experience, from finding a scooter to staying on the road.",
    intro: "A 2-month redesign of the Bounce Daily rider app, making critical journeys clearer for the delivery and gig workers who depend on them every day.",
    meta: [
        { k: "My role", v: "Product Designer" },
        { k: "Duration", v: "2 months" },
        { k: "Scope", v: "End-to-end redesign" },
    ],
    hero: "/assets/cases/bounce/hero.webp",
    facts: [
        {
            q: "What is it?",
            a: "Bounce Daily is a scooter subscription platform that gives riders flexible access to two-wheelers.",
        },
        {
            q: "Who's it for?",
            a: "Primarily delivery and gig workers who rely on a scooter to earn their daily income.",
        },
    ],
    quote: "A scooter isn't just a vehicle when your income depends on it.",
    overview: [
        "For many riders, an unavailable scooter, an expired plan or a failed payment doesn't just mean a frustrating app experience, it can interrupt their workday.",
        "That changed how I approached the redesign. The goal wasn't simply to make the app look better. It was to make every critical action easier to understand, complete and recover from.",
    ],
    inherited: {
        title: "The product worked. But the experience had grown fragmented.",
        body: "As the product expanded, new flows and states had been added over time. Individually, many of them worked. Together, they made the rider experience harder to navigate.",
        img: "/assets/cases/bounce/a.webp",
    },
    lifecycleIntro:
        "I stopped looking at the app as a collection of features. And started looking at it as a rider lifecycle.",
    lifecycle: [
        { stage: "Discover", q: "Where can I find a scooter?" },
        { stage: "Choose", q: "Which scooter and plan works for me?" },
        { stage: "Pay", q: "What exactly am I paying for?" },
        { stage: "Verify", q: "Can I start riding?" },
        { stage: "Ride", q: "What is my current plan status?" },
        { stage: "Manage", q: "Do I need to take action?" },
        { stage: "Renew", q: "How do I stay on the road?" },
    ],
    principle: {
        lead: "Each stage needed to answer three questions:",
        qs: ["Where am I?", "What is happening?", "What should I do next?"],
    },
    chapter: {
        no: "02",
        name: "Hub discovery",
        title: "From browsing hub names to finding the closest available scooter.",
        body: "The old experience was organised around the system's understanding of locations: a list of hubs. But riders don't think in hub names. They think, “Where is the closest scooter I can pick up?”",
        shift: "If location drives the decision, the map should drive the experience.",
        before: "/assets/cases/bounce/b.webp",
        after: "/assets/cases/bounce/c.webp",
    },
    principleNote: "Don't make users remember information they can compare.",
};
