/* Ambient full-page layer of drifting PCB-component glyphs. Purely
   decorative — sits behind #root content at z-index 0, independent of
   the empty #hero-canvas stub. Skipped under prefers-reduced-motion and
   on narrow viewports where it would just cost battery for no visible
   payoff. */
function initFloatingBg() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 680) return;

  const svgNS = "http://www.w3.org/2000/svg";
  const layer = document.createElement("div");
  layer.id = "floating-bg";
  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    zIndex: "0",
    pointerEvents: "none",
    overflow: "hidden",
  });
  document.body.insertBefore(layer, document.body.firstChild);

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.style.position = "absolute";
  svg.style.inset = "0";
  layer.appendChild(svg);

  function el(tag: string, attrs: Record<string, string | number>) {
    const e = document.createElementNS(svgNS, tag);
    for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    return e;
  }

  function resistor(g: SVGGElement, s: number) {
    g.appendChild(
      el("line", {
        x1: -s * 1.6,
        y1: 0,
        x2: -s * 0.9,
        y2: 0,
        stroke: "currentColor",
        "stroke-width": 1.4,
      }),
    );
    g.appendChild(
      el("line", {
        x1: s * 0.9,
        y1: 0,
        x2: s * 1.6,
        y2: 0,
        stroke: "currentColor",
        "stroke-width": 1.4,
      }),
    );
    g.appendChild(
      el("rect", {
        x: -s * 0.9,
        y: -s * 0.42,
        width: s * 1.8,
        height: s * 0.84,
        rx: s * 0.12,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.4,
      }),
    );
    [-0.45, -0.1, 0.3].forEach((b) =>
      g.appendChild(
        el("line", {
          x1: s * b,
          y1: -s * 0.42,
          x2: s * b,
          y2: s * 0.42,
          stroke: "currentColor",
          "stroke-width": 1.6,
          opacity: 0.7,
        }),
      ),
    );
  }
  function capacitor(g: SVGGElement, s: number) {
    g.appendChild(
      el("line", {
        x1: -s * 1.5,
        y1: 0,
        x2: -s * 0.28,
        y2: 0,
        stroke: "currentColor",
        "stroke-width": 1.4,
      }),
    );
    g.appendChild(
      el("line", {
        x1: s * 0.28,
        y1: 0,
        x2: s * 1.5,
        y2: 0,
        stroke: "currentColor",
        "stroke-width": 1.4,
      }),
    );
    g.appendChild(
      el("line", {
        x1: -s * 0.28,
        y1: -s * 0.9,
        x2: -s * 0.28,
        y2: s * 0.9,
        stroke: "currentColor",
        "stroke-width": 1.6,
      }),
    );
    g.appendChild(
      el("path", {
        d: `M${s * 0.28},${-s * 0.9} q${s * 0.32},${s * 0.9} 0,${s * 1.8}`,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.6,
      }),
    );
  }
  function icChip(g: SVGGElement, s: number) {
    g.appendChild(
      el("rect", {
        x: -s,
        y: -s * 0.7,
        width: s * 2,
        height: s * 1.4,
        rx: s * 0.14,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.4,
      }),
    );
    for (let i = -1; i <= 1; i++) {
      g.appendChild(
        el("line", {
          x1: -s + i * s * 0.6,
          y1: -s * 0.7,
          x2: -s + i * s * 0.6,
          y2: -s * 0.95,
          stroke: "currentColor",
          "stroke-width": 1.2,
        }),
      );
      g.appendChild(
        el("line", {
          x1: -s + i * s * 0.6,
          y1: s * 0.7,
          x2: -s + i * s * 0.6,
          y2: s * 0.95,
          stroke: "currentColor",
          "stroke-width": 1.2,
        }),
      );
    }
    g.appendChild(
      el("circle", {
        cx: -s * 0.72,
        cy: -s * 0.42,
        r: s * 0.09,
        fill: "currentColor",
      }),
    );
  }
  function via(g: SVGGElement, s: number) {
    g.appendChild(
      el("circle", {
        cx: 0,
        cy: 0,
        r: s * 0.9,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.1,
        opacity: 0.55,
      }),
    );
    g.appendChild(
      el("circle", { cx: 0, cy: 0, r: s * 0.3, fill: "currentColor" }),
    );
  }
  function traceCorner(g: SVGGElement, s: number) {
    g.appendChild(
      el("path", {
        d: `M0,${s * 2} L0,0 L${s * 2},0`,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.4,
      }),
    );
    g.appendChild(
      el("circle", { cx: 0, cy: 0, r: s * 0.22, fill: "currentColor" }),
    );
  }
  function crosshair(g: SVGGElement, s: number) {
    g.appendChild(
      el("line", {
        x1: -s,
        y1: 0,
        x2: s,
        y2: 0,
        stroke: "currentColor",
        "stroke-width": 1.1,
      }),
    );
    g.appendChild(
      el("line", {
        x1: 0,
        y1: -s,
        x2: 0,
        y2: s,
        stroke: "currentColor",
        "stroke-width": 1.1,
      }),
    );
    g.appendChild(
      el("circle", {
        cx: 0,
        cy: 0,
        r: s * 0.34,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": 1.1,
      }),
    );
  }

  const kinds = [resistor, capacitor, icChip, via, traceCorner, crosshair];
  const W = window.innerWidth;
  const H = window.innerHeight;
  const COUNT = 16;

  interface Item {
    el: SVGGElement;
    x: number;
    y: number;
    rot: number;
    scale: number;
    vx: number;
    vy: number;
    vr: number;
    depth: number;
    phase: number;
    px: number;
    py: number;
  }
  const items: Item[] = [];

  for (let i = 0; i < COUNT; i++) {
    const g = el("g", {}) as SVGGElement;
    const kind = kinds[i % kinds.length];
    const x = Math.random() * W;
    const y = Math.random() * H;
    const rot = Math.random() * 360;
    const scale = 0.5 + Math.random() * 0.55;
    const size = 7 + Math.random() * 3.5;
    kind(g, size);
    g.setAttribute(
      "transform",
      `translate(${x},${y}) rotate(${rot}) scale(${scale})`,
    );
    const accentPick = i % 5 === 0;
    g.style.color = accentPick ? "var(--accent)" : "var(--ink-3)";
    g.style.opacity = (accentPick ? 0.22 : 0.14 + Math.random() * 0.1).toFixed(
      2,
    );
    svg.appendChild(g);
    items.push({
      el: g,
      x,
      y,
      rot,
      scale,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      vr: (Math.random() - 0.5) * 0.08,
      depth: 0.4 + Math.random() * 1.0,
      phase: Math.random() * Math.PI * 2,
      px: 0,
      py: 0,
    });
  }

  let mouseX = W / 2;
  let mouseY = H / 2;
  let hasMouse = false;
  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasMouse = true;
  });

  let t = 0;
  function tick() {
    requestAnimationFrame(tick);
    t += 0.006;
    for (const it of items) {
      it.x += it.vx;
      it.y += it.vy;
      it.rot += it.vr;
      if (it.x < -40) it.x = W + 40;
      if (it.x > W + 40) it.x = -40;
      if (it.y < -40) it.y = H + 40;
      if (it.y > H + 40) it.y = -40;

      const bob = Math.sin(t + it.phase) * 5 * it.depth;

      let ox = 0;
      let oy = 0;
      if (hasMouse) {
        const dx = it.x - mouseX;
        const dy = it.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const radius = 260;
        if (dist < radius) {
          const f = (1 - dist / radius) * 40 * it.depth;
          ox = -(dx / dist) * f;
          oy = -(dy / dist) * f;
        }
      }
      it.px += (ox - it.px) * 0.06;
      it.py += (oy - it.py) * 0.06;

      it.el.setAttribute(
        "transform",
        `translate(${it.x + it.px},${it.y + it.py + bob}) rotate(${it.rot}) scale(${it.scale})`,
      );
    }
  }
  tick();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFloatingBg);
} else {
  initFloatingBg();
}
