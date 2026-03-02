'use client';

import { useEffect, useRef } from 'react';

export default function DataFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    type RGB = [number, number, number];

    const SOURCES = [
      { yFrac: 0.28, rgb: [64,  200, 245] as RGB, label: 'RESEARCHERS'  },
      { yFrac: 0.50, rgb: [140, 90,  255] as RGB, label: 'INDUSTRY'     },
      { yFrac: 0.72, rgb: [240, 168, 40]  as RGB, label: 'INSTITUTIONS' },
    ];

    const NODE_TYPES = [
      { rgb: [64,  200, 245] as RGB },
      { rgb: [140, 90,  255] as RGB },
      { rgb: [240, 168, 40]  as RGB },
    ];

    function toRgba(rgb: RGB, a: number) {
      return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${+a.toFixed(3)})`;
    }

    const CFG = {
      nodeCount:          20,
      nodeTopFrac:        0.07,
      nodeBottomFrac:     0.93,
      nodeXFrac:          0.42,
      sourceXFrac:        0.055,
      particlesPerSource: 6,
    };

    let W = 0, H = 0;
    let nodes:           Node[]           = [];
    let inputParticles:  InputParticle[]  = [];
    let outputParticles: OutputParticle[] = [];

    function bezierPt(
      x0: number, y0: number,
      cx1: number, cy1: number,
      cx2: number, cy2: number,
      x1: number,  y1: number,
      t: number
    ): [number, number] {
      const m = 1 - t;
      return [
        m*m*m*x0 + 3*m*m*t*cx1 + 3*m*t*t*cx2 + t*t*t*x1,
        m*m*m*y0 + 3*m*m*t*cy1 + 3*m*t*t*cy2 + t*t*t*y1,
      ];
    }

    function ctrlPts(sx: number, sy: number, nx: number, ny: number): [number, number, number, number] {
      const d = nx - sx;
      return [sx + d * 0.42, sy, nx - d * 0.20, ny];
    }

    class Node {
      yFrac:    number;
      typeIndex: number;
      oscPhase: number;
      oscAmpX:  number;
      oscAmpY:  number;
      oscSpeed: number;
      baseR:    number;
      glow:     number;
      _ts:      number;

      constructor(index: number) {
        const span     = CFG.nodeBottomFrac - CFG.nodeTopFrac;
        this.yFrac     = CFG.nodeTopFrac + (index / (CFG.nodeCount - 1)) * span;
        this.typeIndex = index % NODE_TYPES.length;
        this.oscPhase  = Math.random() * Math.PI * 2;
        this.oscAmpX   = 1.2 + Math.random() * 0.8;
        this.oscAmpY   = 0.8 + Math.random() * 1.0;
        this.oscSpeed  = 0.0006 + Math.random() * 0.0004;
        this.baseR     = 3.8 + Math.random() * 1.4;
        this.glow      = 0;
        this._ts       = 0;
      }

      get cx() { return W * CFG.nodeXFrac; }
      get cy() { return H * this.yFrac; }
      get x()  { return this.cx + Math.sin(this._ts * this.oscSpeed + this.oscPhase) * this.oscAmpX; }
      get y()  { return this.cy + Math.cos(this._ts * this.oscSpeed * 0.75 + this.oscPhase) * this.oscAmpY; }

      activate() { this.glow = 1.0; }

      tick(ts: number) {
        this._ts = ts;
        this.glow = Math.max(0, this.glow - 0.018);
      }

      draw() {
        const { rgb } = NODE_TYPES[this.typeIndex];
        const nx = this.x, ny = this.y, r = this.baseR;

        if (this.glow > 0) {
          const hr = r * (5 + this.glow * 8);
          const g  = ctx.createRadialGradient(nx, ny, r, nx, ny, hr);
          g.addColorStop(0, toRgba(rgb, this.glow * 0.65));
          g.addColorStop(1, toRgba(rgb, 0));
          ctx.beginPath(); ctx.arc(nx, ny, hr, 0, Math.PI * 2);
          ctx.fillStyle = g; ctx.fill();
        }

        const ag = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 5);
        ag.addColorStop(0, toRgba(rgb, 0.20));
        ag.addColorStop(1, toRgba(rgb, 0));
        ctx.beginPath(); ctx.arc(nx, ny, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = ag; ctx.fill();

        ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2);
        ctx.fillStyle = toRgba(rgb, 0.90); ctx.fill();

        ctx.beginPath(); ctx.arc(nx, ny, r * 0.36, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.60)'; ctx.fill();
      }
    }

    class InputParticle {
      srcIdx:  number;
      t:       number;
      nodeIdx: number;
      speed:   number;

      constructor(srcIdx: number) {
        this.srcIdx  = srcIdx;
        this.t       = Math.random();
        this.nodeIdx = (Math.random() * CFG.nodeCount) | 0;
        this.speed   = 0.0022 + Math.random() * 0.0018;
      }

      reset() {
        this.t       = 0;
        this.speed   = 0.0022 + Math.random() * 0.0018;
        this.nodeIdx = (Math.random() * CFG.nodeCount) | 0;
      }

      tick() {
        this.t += this.speed;
        if (this.t >= 1.0) {
          nodes[this.nodeIdx].activate();
          const burst = 2 + Math.floor(Math.random() * 3);
          for (let k = 0; k < burst; k++) {
            outputParticles.push(new OutputParticle(this.nodeIdx));
          }
          this.reset();
        }
      }

      draw() {
        const src  = SOURCES[this.srcIdx];
        const node = nodes[this.nodeIdx];
        const sx   = W * CFG.sourceXFrac;
        const sy   = H * src.yFrac;
        const nx   = node.x, ny = node.y;
        const [cp1x, cp1y, cp2x, cp2y] = ctrlPts(sx, sy, nx, ny);
        const [px, py] = bezierPt(sx, sy, cp1x, cp1y, cp2x, cp2y, nx, ny, this.t);

        const g = ctx.createRadialGradient(px, py, 0, px, py, 5);
        g.addColorStop(0, toRgba(src.rgb, 0.55));
        g.addColorStop(1, toRgba(src.rgb, 0));
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();

        ctx.beginPath(); ctx.arc(px, py, 1.25, 0, Math.PI * 2);
        ctx.fillStyle = toRgba(src.rgb, 0.95); ctx.fill();

        ctx.beginPath(); ctx.arc(px, py, 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill();
      }
    }

    class OutputParticle {
      x: number; y: number;
      vx: number; vy: number;
      rgb: RGB;
      alpha: number;
      r: number;

      constructor(nodeIdx: number) {
        const node  = nodes[nodeIdx];
        this.x      = node.x;
        this.y      = node.y;
        this.vx     = 7.0 + Math.random() * 5.0;
        this.vy     = (Math.random() - 0.5) * 0.35;
        this.rgb    = [...NODE_TYPES[node.typeIndex].rgb] as RGB;
        this.alpha  = 0.88;
        this.r      = 1.6 + Math.random() * 0.9;
      }

      get alive() { return this.x < W + 30 && this.alpha > 0.01; }

      tick() {
        this.x     += this.vx;
        this.y     += this.vy;
        this.alpha -= 0.006;
      }

      draw() {
        for (let i = 3; i >= 1; i--) {
          const tx = this.x - i * this.vx * 1.9;
          const ta = this.alpha * (1 - i * 0.30);
          ctx.beginPath(); ctx.arc(tx, this.y, this.r * (1 - i * 0.18), 0, Math.PI * 2);
          ctx.fillStyle = toRgba(this.rgb, ta * 0.55); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = toRgba(this.rgb, this.alpha); ctx.fill();
      }
    }

    function drawBg() {
      const g = ctx.createRadialGradient(W * 0.45, H * 0.50, 0, W * 0.45, H * 0.50, Math.max(W, H) * 0.85);
      g.addColorStop(0,    '#0b1a2e');
      g.addColorStop(0.38, '#060e1c');
      g.addColorStop(1,    '#020810');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    function drawFanCurves() {
      SOURCES.forEach(src => {
        const sx = W * CFG.sourceXFrac, sy = H * src.yFrac;
        nodes.forEach(node => {
          const nx = node.x, ny = node.y;
          const [cp1x, cp1y, cp2x, cp2y] = ctrlPts(sx, sy, nx, ny);
          const lg = ctx.createLinearGradient(sx, sy, nx, ny);
          lg.addColorStop(0,    toRgba(src.rgb, 0.22));
          lg.addColorStop(0.55, toRgba(src.rgb, 0.09));
          lg.addColorStop(1,    toRgba(src.rgb, 0.02));
          ctx.beginPath(); ctx.moveTo(sx, sy);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nx, ny);
          ctx.strokeStyle = lg; ctx.lineWidth = 0.70; ctx.stroke();
        });
      });
    }

    function drawOutputStreams() {
      nodes.forEach(node => {
        const { rgb } = NODE_TYPES[node.typeIndex];
        const lg = ctx.createLinearGradient(node.x, 0, W, 0);
        lg.addColorStop(0,    toRgba(rgb, 0.12));
        lg.addColorStop(0.25, toRgba(rgb, 0.08));
        lg.addColorStop(1,    toRgba(rgb, 0.01));
        ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(W, node.y);
        ctx.strokeStyle = lg; ctx.lineWidth = 0.45; ctx.stroke();
      });
    }

    function drawSources() {
      SOURCES.forEach(src => {
        const sx = W * CFG.sourceXFrac, sy = H * src.yFrac;
        const { rgb } = src;

        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 20);
        g.addColorStop(0, toRgba(rgb, 0.32));
        g.addColorStop(1, toRgba(rgb, 0));
        ctx.beginPath(); ctx.arc(sx, sy, 20, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();

        ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fillStyle = toRgba(rgb, 0.92); ctx.fill();

        ctx.beginPath(); ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.72)'; ctx.fill();

        ctx.font      = '9.5px "Courier New", monospace';
        ctx.fillStyle = toRgba(rgb, 0.48);
        ctx.textAlign = 'right';
        ctx.fillText(src.label, sx - 16, sy + 3.5);
      });
    }

    let animId: number;

    function frame(ts: number) {
      animId = requestAnimationFrame(frame);
      drawBg();
      drawFanCurves();
      drawOutputStreams();
      drawSources();
      for (const n of nodes)          { n.tick(ts); n.draw(); }
      for (const p of inputParticles) { p.tick();   p.draw(); }
      outputParticles = outputParticles.filter(p => p.alive);
      for (const p of outputParticles) { p.tick(); p.draw(); }
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function buildScene() {
      nodes = Array.from({ length: CFG.nodeCount }, (_, i) => new Node(i));
      inputParticles = [];
      SOURCES.forEach((_, si) => {
        for (let i = 0; i < CFG.particlesPerSource; i++) {
          inputParticles.push(new InputParticle(si));
        }
      });
      outputParticles = [];
    }

    function handleResize() { resize(); buildScene(); }

    resize();
    buildScene();
    animId = requestAnimationFrame(frame);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg" />;
}
