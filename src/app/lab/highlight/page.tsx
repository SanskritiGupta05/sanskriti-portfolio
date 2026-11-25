import type { ReactNode } from "react";

import { Mark } from "@/components/casestudy/Mark";

function Section({
    title,
    quote,
    children,
}: {
    title: string;
    quote: string;
    children: ReactNode;
}) {
    return (
        <section className="grid gap-6">
            <h2 className="font-serif text-h2m text-head md:text-h2">{title}</h2>
            <p className="border-l-2 border-[#c8553b] pl-5 font-serif text-2xl text-head italic">
                {quote}
            </p>
            {children}
        </section>
    );
}

function P({ children }: { children: ReactNode }) {
    return <p className="printed max-w-[64ch] text-pretty">{children}</p>;
}

export default function HighlightLab() {
    return (
        <main className="mx-auto w-full max-w-[874px] px-6 pt-16 pb-[60vh]">
            <span className="label">Lab · scroll highlights</span>
            <p className="mt-3 max-w-[60ch] text-sm text-muted-foreground">
                Scroll slowly. Key phrases get a hand-drawn scribble while they&apos;re in the
                middle of the screen (circles for numbers, highlights for the lines that hurt,
                swooshes for facts, one spark), and the scribbles fade once they scroll away.
            </p>

            <div className="mt-[40vh] grid gap-28">
                <Section
                    title="Overview"
                    quote="“A scooter isn't just a vehicle when your income depends on it.”"
                >
                    <P>
                        Bounce Daily rents EV scooters by the day, week or month to delivery and gig
                        riders in <Mark type="swoosh">Bengaluru and Delhi NCR</Mark>. A rider picks
                        a hub, chooses a scooter and a plan, gets verified, pays, and rides to work
                        every day. For them, a sold-out hub or an expired plan isn&apos;t an
                        inconvenience.{" "}
                        <Mark type="highlight" order={1}>
                            It&apos;s a day without earnings.
                        </Mark>
                    </P>
                    <P>
                        I was{" "}
                        <Mark type="swoosh">
                            <Mark type="spark" order={1}>
                                the app&apos;s first UI designer
                            </Mark>
                        </Mark>
                        . Before me there was{" "}
                        <Mark type="highlight" order={1}>
                            no designer, no system and no shared way of doing things
                        </Mark>
                        . I redesigned the Android rider app end to end{" "}
                        <Mark type="circle" order={2}>
                            over 3 months
                        </Mark>
                        , working{" "}
                        <Mark type="swoosh" order={3}>
                            through DreamLaunch with the product manager
                        </Mark>
                        .
                    </P>
                </Section>

                <Section
                    title="Problem"
                    quote="An app that asked for everything before it gave anything."
                >
                    <P>
                        When the product manager brought me the project, the app did its job on
                        paper. Riders could sign up, find a hub and pay. But they were leaving, and
                        he came with the business concerns behind it:{" "}
                        <Mark type="highlight">riders dropping off at plans</Mark>, documents
                        demanded up front, and a rider base that reads little.
                    </P>
                    <P>
                        Going through it myself made the reasons obvious. A new rider went through{" "}
                        <Mark type="circle">15 steps and 39 screens</Mark> to book a scooter. The
                        first 18 were forms, OTPs, documents, a selfie and a wait for approval, all{" "}
                        <Mark type="swoosh" order={1}>
                            before seeing a hub, a scooter or a price
                        </Mark>
                        . Nobody had shown them anything worth finishing yet.
                    </P>
                    <P>
                        Riders who made it through met plans laid out as{" "}
                        <Mark type="box">near-identical boxes of four numbers</Mark> each, and after
                        paying, the app showed a countdown and little else. When it hit zero, it
                        simply said{" "}
                        <Mark type="highlight" order={1}>
                            time had run out
                        </Mark>
                        .
                    </P>
                </Section>

                <Section
                    title="How I worked"
                    quote="No research team. Just the old app, walked screen by screen, and a lot of UX principles."
                >
                    <P>
                        I want to be honest about how this project ran.{" "}
                        <Mark type="swoosh">I didn&apos;t run user interviews</Mark>, and this was{" "}
                        <Mark type="highlight" order={1}>
                            before the AI boom
                        </Mark>
                        , so there was no shortcut for research. What I had was the live app. I took
                        screenshots, then went through every flow myself, the way a rider would, and
                        mapped the whole old journey end to end.
                    </P>
                    <P>
                        From there I explored <Mark type="circle">around 270 screens</Mark>. I
                        reviewed directions with the product manager on regular calls, and kept only
                        what I could defend with{" "}
                        <Mark type="swoosh" order={1}>
                            a principle I could explain in a sentence
                        </Mark>
                        .
                    </P>
                </Section>
            </div>
        </main>
    );
}
