// Hub list + hub detail (old app) → one "Pick a hub near you" screen.
// Plain DOM + Web Animations, transforms and opacity only. Ported from explorations/hub-merge.
// mountHubMerge(stage) builds into a 980×640 stage and returns { play, showEnd, destroy }.

const DIR = "/assets/cases/bounce/hub-merge/";
const S = 0.6;
const IMG = {
    list: { src: DIR + "old-list@2x.webp", w: 430, h: 956 },
    detail: { src: DIR + "old-detail@2x.webp", w: 430, h: 956 },
    hub: { src: DIR + "new-hub@2x.webp", w: 440, h: 956 },
};
const TOP = 40;
const PHONE = { list: { x: 0, y: TOP }, detail: { x: 300, y: TOP }, hub: { x: 700, y: TOP } };
const CENTER_X = (980 - IMG.hub.w * S) / 2;
const PIECES = [
    { label: "Map", from: ["list", [0, 108, 430, 260]], to: [0, 62, 440, 470] },
    { label: "Hub photo", from: ["detail", [165, 113, 100, 177]], to: [60, 563, 123, 93] },
    { label: "Hub name", from: ["list", [121, 504, 68, 22]], to: [195, 564, 113, 23] },
    { label: "Address", from: ["detail", [17, 364, 370, 70]], to: [195, 616, 183, 17] },
    {
        label: "Scooters",
        from: ["list", [121, 532, 88, 20]],
        to: [60, 668, 110, 29],
        tagRight: true,
    },
    { label: "Available bike", from: ["detail", [16, 509, 399, 94]], to: [60, 668, 110, 29] },
];
// rect = dashed ring (x, y, w, h, radius in new-screen px); the line leaves from its edge
const CALLOUTS = [
    {
        side: "left",
        kind: "ux",
        rect: [-10, -10, 460, 976, 47],
        anchorY: 70,
        title: "One screen, not two",
        sub: "Hub list and hub detail are now one screen. No more going back and forth.",
    },
    {
        side: "right",
        kind: "ux",
        rect: [300, 239, 27, 36, 7],
        title: "Battery stations on the map",
        sub: "Riders also see where to swap batteries, not just where hubs are.",
    },
    {
        side: "left",
        kind: "ux",
        rect: [205, 301, 50, 50, 25],
        title: "Map first",
        sub: "Hubs around the rider, instead of a list of names to read.",
    },
    {
        side: "right",
        kind: "ux",
        rect: [319, 562, 59, 26, 13],
        title: "Nearest hub first",
        sub: "Distance and a Nearest tag, up front.",
    },
    {
        side: "left",
        kind: "ui",
        rect: [44, 548, 350, 254, 16],
        anchorY: 560,
        parts: [
            [57, 560, 129, 99],
            [191, 561, 124, 28],
            [191, 591, 180, 66],
        ],
        title: "Clear card hierarchy",
        sub: "Photo, then name, then distance, address and hours. The eye knows where to start.",
    },
    {
        side: "right",
        kind: "ui",
        rect: [56, 665, 272, 36, 18],
        zoom: [52, 662, 280, 42],
        title: "Scooters + batteries as chips",
        sub: "Both counts read at a glance, side by side.",
    },
    {
        side: "left",
        kind: "ux",
        rect: [55, 723, 108, 30, 8],
        title: "Call the hub in one tap",
        sub: "The hub's number is on the card, so riders can check before they travel.",
    },
    {
        side: "right",
        kind: "ux",
        rect: [20, 860, 400, 58, 17],
        title: "The CTA confirms your hub",
        sub: "“Pick scooter at RR Nagar” names the selected hub and invites the rider on.",
    },
];
const EASE = "cubic-bezier(.22,1,.36,1)";
const EASE_IO = "cubic-bezier(.65,0,.35,1)";
const SVG = "http://www.w3.org/2000/svg";

const box = (k, r) => ({
    left: PHONE[k].x + r[0] * S,
    top: PHONE[k].y + r[1] * S,
    width: r[2] * S,
    height: r[3] * S,
});
function bg(img, r) {
    const sx = r[2] === img.w ? 0 : (r[0] / (img.w - r[2])) * 100;
    const sy = r[3] === img.h ? 0 : (r[1] / (img.h - r[3])) * 100;
    return `url(${img.src}) ${sx}% ${sy}% / ${(img.w / r[2]) * 100}% ${(img.h / r[3]) * 100}%`;
}
const px = (o) =>
    Object.fromEntries(
        Object.entries(o).map(([k, v]) => [k, typeof v === "number" ? v + "px" : v]),
    );
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const anim = (n, frames, o) =>
    n.animate(frames, Object.assign({ fill: "forwards", easing: EASE }, o));
const fadeTo = (n, to, duration, delay = 0) =>
    anim(n, [{ opacity: getComputedStyle(n).opacity }, { opacity: to }], { duration, delay });

export function mountHubMerge(stage) {
    let N = {};
    let run = 0;
    const el = (cls, style = {}, html = "") => {
        const d = document.createElement("div");
        d.className = cls;
        Object.assign(d.style, px(style));
        d.innerHTML = html;
        stage.appendChild(d);
        return d;
    };

    function build() {
        stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
        stage.innerHTML = "";
        N = { caps: {}, phones: {} };
        N.caps.list = el("hm-cap", { left: 0 }, `<i class="hm-stamp hm-before">Old UI</i>Hub list`);
        N.caps.detail = el(
            "hm-cap",
            { left: 300 },
            `<i class="hm-stamp hm-before">Old UI</i>Hub detail`,
        );
        N.caps.hub = el(
            "hm-cap",
            { left: 700 },
            `<i class="hm-stamp hm-after">After revamp</i>Pick a hub near you`,
        );
        N.arrow = el("hm-arrow", {}, "→");
        for (const k of ["list", "detail", "hub"])
            N.phones[k] = el(
                "hm-phone",
                { left: PHONE[k].x, top: PHONE[k].y, width: IMG[k].w * S, height: IMG[k].h * S },
                `<img src="${IMG[k].src}" alt="">`,
            );
        N.phones.hub.style.opacity = 0;
        N.ghost = el("hm-phone hm-ghost", {
            left: PHONE.hub.x,
            top: PHONE.hub.y,
            width: IMG.hub.w * S,
            height: IMG.hub.h * S,
        });
        N.hl = [];
        N.tags = [];
        N.pieces = [];
        PIECES.forEach((pc) => {
            const [k, r] = pc.from;
            const a = box(k, r);
            const b = box("hub", pc.to);
            N.hl.push(
                el("hm-hl", {
                    left: a.left - 3,
                    top: a.top - 3,
                    width: a.width + 6,
                    height: a.height + 6,
                }),
            );
            N.tags.push(
                pc.tagRight
                    ? el(
                          "hm-tag hm-right",
                          { left: a.left + a.width + 8, top: a.top - 1 },
                          pc.label,
                      )
                    : el("hm-tag", { left: a.left - 3, top: a.top - 3 }, pc.label),
            );
            const p = el(
                "hm-piece",
                b,
                `<div class="hm-layer" style="background:${bg(IMG[k], r)}"></div><div class="hm-layer" style="background:${bg(IMG.hub, pc.to)};opacity:0"></div>`,
            );
            p._start = `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
            p.style.transform = p._start;
            N.pieces.push(p);
        });
        N.svg = document.createElementNS(SVG, "svg");
        N.svg.setAttribute("class", "hm-lines");
        stage.appendChild(N.svg);
        const mk = (tag, attrs) => {
            const n = document.createElementNS(SVG, tag);
            for (const k in attrs) n.setAttribute(k, attrs[k]);
            N.svg.appendChild(n);
            return n;
        };
        const sx = (x) => CENTER_X + x * S;
        const sy = (y) => TOP + y * S;
        N.callouts = CALLOUTS.map((c) => {
            const color = c.kind === "ux" ? "#D42B31" : "#2F5BD3";
            const left = c.side === "left";
            const [x, y, w, h, r] = c.rect;
            const startX = sx(left ? x : x + w) + (left ? -6 : 6);
            const lineY = sy(c.anchorY ?? y + h / 2);
            const labX = left ? CENTER_X - 30 - 236 : CENTER_X + IMG.hub.w * S + 30;
            const endX = left ? CENTER_X - 24 : CENTER_X + IMG.hub.w * S + 24;
            const quiet = w > 200 && !c.parts;
            const shapes = [
                mk("rect", {
                    x: sx(x),
                    y: sy(y),
                    width: w * S,
                    height: h * S,
                    rx: r * S,
                    fill: "none",
                    stroke: color,
                    "stroke-width": 1.3,
                    "stroke-dasharray": "4 3",
                    "stroke-opacity": quiet ? 0.55 : 1,
                }),
            ];
            (c.parts || []).forEach(([qx, qy, qw, qh]) =>
                shapes.push(
                    mk("rect", {
                        x: sx(qx),
                        y: sy(qy),
                        width: qw * S,
                        height: qh * S,
                        rx: 4,
                        fill: "none",
                        stroke: color,
                        "stroke-width": 1,
                        "stroke-dasharray": "2 3",
                    }),
                ),
            );
            shapes.forEach((n) => (n.style.opacity = 0));
            const len = Math.abs(endX - startX);
            const path = mk("path", {
                d: `M ${startX} ${lineY} L ${endX} ${lineY}`,
                stroke: color,
                "stroke-width": 1,
                "stroke-opacity": 0.8,
                fill: "none",
            });
            path.style.strokeDasharray = len;
            path.style.strokeDashoffset = len;
            const dot = mk("circle", {
                cx: startX,
                cy: lineY,
                r: 3.2,
                fill: color,
                stroke: "#fff",
                "stroke-width": 1.5,
            });
            dot.style.opacity = 0;
            const pill = `<i class="hm-kind hm-${c.kind}">${c.kind.toUpperCase()}</i>`;
            let zoom = "";
            if (c.zoom) {
                const zh = (236 * c.zoom[3]) / c.zoom[2];
                zoom = `<div class="hm-zoom" style="width:236px;height:${zh}px;background:${bg(IMG.hub, c.zoom)}"></div>`;
            }
            const lab = el(
                "hm-callout hm-" + c.side,
                { left: labX, top: lineY - 10 },
                `<b>${left ? c.title + pill : pill + c.title}</b><span>${c.sub}</span>${zoom}`,
            );
            return { path, dot, lab, len, shapes, side: c.side };
        });
    }

    function showEnd() {
        run++;
        build();
        for (const k of ["list", "detail"]) {
            N.phones[k].style.opacity = 0;
            N.caps[k].style.opacity = 0;
        }
        N.arrow.style.opacity = 0;
        N.ghost.style.opacity = 0;
        N.phones.hub.style.opacity = 1;
        N.phones.hub.style.transform = `translateX(${CENTER_X - PHONE.hub.x}px)`;
        N.caps.hub.style.transform = `translateX(${CENTER_X - PHONE.hub.x}px)`;
        N.callouts.forEach((c) => {
            c.path.style.strokeDashoffset = 0;
            c.dot.style.opacity = 1;
            c.lab.style.opacity = 1;
            c.shapes.forEach((n) => (n.style.opacity = 1));
        });
    }

    async function play() {
        const r = ++run;
        build();
        const ok = () => r === run;
        await wait(400);
        if (!ok()) return;
        // 1 · point at what carries over
        N.hl.forEach((h, i) => fadeTo(h, 1, 350, i * 80));
        N.tags.forEach((t, i) => fadeTo(t, 1, 350, i * 80));
        await wait(1300);
        if (!ok()) return;
        // 2 · lift the pieces, old screens recede
        N.hl.forEach((h) => fadeTo(h, 0, 300));
        N.tags.forEach((t) => fadeTo(t, 0, 300));
        N.pieces.forEach((p) =>
            anim(
                p,
                [
                    { opacity: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
                    { opacity: 1, boxShadow: "0 8px 22px rgba(0,0,0,.16)" },
                ],
                { duration: 350 },
            ),
        );
        fadeTo(N.phones.list, 0.22, 600);
        fadeTo(N.phones.detail, 0.22, 600);
        await wait(380);
        if (!ok()) return;
        // 3 · glide and turn into the new version on the way
        N.pieces.forEach((p, i) => {
            const delay = i * 90;
            anim(p, [{ transform: p._start }, { transform: "none" }], { duration: 1250, delay });
            anim(p.children[1], [{ opacity: 0 }, { opacity: 1 }], {
                duration: 700,
                delay: delay + 300,
                easing: "ease-in-out",
            });
            anim(p.children[0], [{ opacity: 1 }, { opacity: 0 }], {
                duration: 700,
                delay: delay + 450,
                easing: "ease-in-out",
            });
        });
        await wait(1250 + 90 * 5);
        if (!ok()) return;
        // 4 · the new screen settles underneath
        fadeTo(N.ghost, 0, 500);
        fadeTo(N.phones.hub, 1, 500);
        N.pieces.forEach((p) =>
            anim(
                p,
                [
                    { opacity: 1, boxShadow: "0 8px 22px rgba(0,0,0,.16)" },
                    { opacity: 0, boxShadow: "0 0 0 rgba(0,0,0,0)" },
                ],
                { duration: 500, delay: 150 },
            ),
        );
        // 5 · pause on the result
        await wait(1550);
        if (!ok()) return;
        // 6 · old screens leave, the new one moves to the centre
        for (const k of ["list", "detail"]) {
            anim(
                N.phones[k],
                [
                    { opacity: 0.22, transform: "translateX(0)" },
                    { opacity: 0, transform: "translateX(-24px)" },
                ],
                { duration: 500, easing: EASE_IO },
            );
            fadeTo(N.caps[k], 0, 400);
        }
        fadeTo(N.arrow, 0, 300);
        const dx = CENTER_X - PHONE.hub.x;
        anim(N.phones.hub, [{ transform: "translateX(0)" }, { transform: `translateX(${dx}px)` }], {
            duration: 900,
            delay: 150,
            easing: EASE_IO,
        });
        anim(N.caps.hub, [{ transform: "translateX(0)" }, { transform: `translateX(${dx}px)` }], {
            duration: 900,
            delay: 150,
            easing: EASE_IO,
        });
        await wait(1150);
        if (!ok()) return;
        // 7 · point out what's better
        N.callouts.forEach((c, i) => {
            const d = i * 260;
            c.shapes.forEach((n) =>
                anim(n, [{ opacity: 0 }, { opacity: 1 }], { duration: 350, delay: d }),
            );
            anim(c.dot, [{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: d + 150 });
            anim(c.path, [{ strokeDashoffset: c.len }, { strokeDashoffset: 0 }], {
                duration: 450,
                delay: d + 80,
            });
            anim(
                c.lab,
                [
                    { opacity: 0, transform: `translateX(${c.side === "left" ? 8 : -8}px)` },
                    { opacity: 1, transform: "translateX(0)" },
                ],
                { duration: 450, delay: d + 300 },
            );
        });
    }

    build();
    return {
        play,
        showEnd,
        preload: () =>
            Promise.all(
                Object.values(IMG).map(
                    (i) =>
                        new Promise((r) => {
                            const im = new Image();
                            im.onload = im.onerror = r;
                            im.src = i.src;
                        }),
                ),
            ),
        destroy: () => {
            run++;
            stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
            stage.innerHTML = "";
        },
    };
}
