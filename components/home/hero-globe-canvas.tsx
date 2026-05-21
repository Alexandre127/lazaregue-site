"use client";

import { useEffect, useRef } from "react";

const W = 360;
const H = 360;
const R = 155;
const cx = W / 2;
const cy = H / 2;

type Dot = { lat: number; lng: number };
type Connection = { a: Dot; b: Dot };

export function HeroGlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    let rot = 0;
    let frame = 0;

    const dots: Dot[] = [];
    for (let lat = -80; lat <= 80; lat += 11) {
      const r2 = Math.cos((lat * Math.PI) / 180);
      const count = Math.round(r2 * 30);
      for (let i = 0; i < count; i++) {
        dots.push({
          lat: (lat * Math.PI) / 180,
          lng: (i / count) * Math.PI * 2,
        });
      }
    }

    const hotspots: Dot[] = [
      { lat: 48.85, lng: 2.35 },
      { lat: 51.5, lng: -0.12 },
      { lat: 40.71, lng: -74.0 },
      { lat: 35.68, lng: 139.69 },
      { lat: 37.77, lng: -122.42 },
      { lat: 52.52, lng: 13.4 },
      { lat: 1.35, lng: 103.82 },
      { lat: -33.86, lng: 151.2 },
    ].map((h) => ({
      lat: (h.lat * Math.PI) / 180,
      lng: (h.lng * Math.PI) / 180,
    }));

    const connections: Connection[] = [];
    hotspots.forEach((a, i) => {
      const b = hotspots[(i + 1) % hotspots.length];
      const hotspotC = hotspots[(i + 3) % hotspots.length];
      connections.push({ a, b });
      connections.push({ a, b: hotspotC });
    });

    function project(lat: number, lng: number) {
      const x = R * Math.cos(lat) * Math.sin(lng + rot);
      const y = R * Math.sin(lat);
      const z = R * Math.cos(lat) * Math.cos(lng + rot);
      return { x: cx + x, y: cy - y, z, vis: z > -10 };
    }

    function drawGlobe() {
      ctx.clearRect(0, 0, W, H);

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(10,15,46,0.88)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(26,71,255,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, R * (0.32 + i * 0.22), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(26,71,255,${0.04 - i * 0.008})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let lng = 0; lng < 360; lng += 30) {
        const pts: { x: number; y: number }[] = [];
        for (let lat = -80; lat <= 80; lat += 3) {
          const p = project((lat * Math.PI) / 180, (lng * Math.PI) / 180);
          if (p.vis) pts.push(p);
        }
        if (pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (const p of pts) ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = "rgba(26,71,255,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let lat = -60; lat <= 60; lat += 30) {
        const pts: { x: number; y: number }[] = [];
        for (let lng = 0; lng <= 360; lng += 3) {
          const p = project((lat * Math.PI) / 180, (lng * Math.PI) / 180);
          if (p.vis) pts.push(p);
        }
        if (pts.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (const p of pts) ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = "rgba(26,71,255,0.07)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (const c of connections) {
        const a = project(c.a.lat, c.a.lng);
        const b = project(c.b.lat, c.b.lng);
        if (!a.vis || !b.vis) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(77,111,255,0.22)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (const d of dots) {
        const p = project(d.lat, d.lng);
        if (!p.vis) continue;
        const br = Math.max(0, p.z / R);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77,111,255,${br * 0.65 + 0.12})`;
        ctx.fill();
      }

      const t = Date.now() / 1000;
      for (let i = 0; i < hotspots.length; i++) {
        const h = hotspots[i];
        const p = project(h.lat, h.lng);
        if (!p.vis) continue;
        const pulse = Math.sin(t * 2 + i * 0.9) * 0.4 + 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,71,255,${pulse})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6 + pulse * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(26,71,255,${pulse * 0.28})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rot += 0.0028;
      frame = requestAnimationFrame(drawGlobe);
    }

    frame = requestAnimationFrame(drawGlobe);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="globe"
      width={W}
      height={H}
      aria-hidden
    />
  );
}
