import React, { useRef, useEffect } from 'react';

const BotanicalSynapse = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;

        // --- 設定 ---
        let width = window.innerWidth;
        let height = window.innerHeight;
        const isMobile = width < 600;

        canvas.width = width;
        canvas.height = height;

        const CONFIG = {
            nodeCount: isMobile ? 30 : 50, // ノード数を少し減らして視認性向上 & 負荷軽減
            connectDist: isMobile ? 120 : 180,
            connectDistSq: (isMobile ? 120 : 180) ** 2,
            mouseRadiusSq: (isMobile ? 150 : 250) ** 2,

            friction: 0.98, wander: 0.005, repulseRadius: 60, repulseForce: 0.02,
            decay: 0.995, learn: 0.05, exciteDecay: 0.96,
            sigSpeed: 0.05, sigMaxGen: 4, refractory: 50, maxSigs: 40,
            colors: { base: [20, 25, 23], active: [52, 211, 153] } // シックな色合い (baseをグレー寄りの緑に)
        };

        const state = {
            nodes: [], edges: [], signals: [], pulses: [],
            mouse: { x: -999, y: -999 }, time: 0
        };

        const distSq = (p1, p2) => (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
        const rand = (min, max) => Math.random() * (max - min) + min;

        // Bezier Helper
        const getBezierPos = (t, p0, cp1, cp2, p3) => {
            const mt = 1 - t, mt2 = mt * mt, t2 = t * t;
            return {
                x: mt * mt2 * p0.x + 3 * mt2 * t * cp1.x + 3 * mt * t2 * cp2.x + t * t2 * p3.x,
                y: mt * mt2 * p0.y + 3 * mt2 * t * cp1.y + 3 * mt * t2 * cp2.y + t * t2 * p3.y
            };
        };

        class Node {
            constructor(x, y) {
                this.x = x; this.y = y;
                this.vx = rand(-0.1, 0.1); this.vy = rand(-0.1, 0.1);
                this.radius = this.baseR = rand(1, 3);
                this.excitation = 0;
                this.phase = rand(0, Math.PI * 2);
                this.sociability = Math.random() ** 2;
                this.wanderOff = rand(0, 1000);
                this.lastFire = -999;
            }

            update() {
                const t = state.time * 0.005 + this.wanderOff;
                this.vx += Math.cos(t) * CONFIG.wander;
                this.vy += Math.sin(t) * CONFIG.wander;

                const dSq = distSq(this, state.mouse);
                if (dSq < CONFIG.mouseRadiusSq) {
                    const f = 1 - (dSq / CONFIG.mouseRadiusSq);
                    this.excitation = Math.min(this.excitation + 0.05 * f, 1.0); // 興奮度アップ
                }

                this.x += this.vx; this.y += this.vy;
                this.vx *= CONFIG.friction; this.vy *= CONFIG.friction;
                this.excitation *= CONFIG.exciteDecay;

                if (this.x < -50) this.x = width + 50; else if (this.x > width + 50) this.x = -50;
                if (this.y < -50) this.y = height + 50; else if (this.y > height + 50) this.y = -50;

                this.phase += 0.015 + this.excitation * 0.05;
                this.radius = this.baseR + Math.sin(this.phase) * 0.5 + this.excitation * 3;
            }

            draw(ctx) {
                const { base, active } = CONFIG.colors;
                const e = this.excitation;
                const r = base[0] + (active[0] - base[0]) * e;
                const g = base[1] + (active[1] - base[1]) * e;
                const b = base[2] + (active[2] - base[2]) * e;

                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0, this.radius), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.3 + e * 0.7})`;
                ctx.fill();

                // Optimized Glow: Use concentric circles instead of expensive Radial Gradient
                if (e > 0.05) {
                    const glow = this.radius * 4 + e * 10;
                    // Outer faint glow
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, glow, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.05 * e})`; // Very faint
                    ctx.fill();

                    // Inner stronger glow
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, glow * 0.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${0.1 * e})`;
                    ctx.fill();
                }
            }

            fire() { if (state.time - this.lastFire > CONFIG.refractory) { this.excitation = 1.0; this.lastFire = state.time; return true; } return false; }
        }

        class Edge {
            constructor(a, b, weight = 0.05) {
                this.a = a; this.b = b;
                this.weight = weight;
                this.cpOffset = [rand(-1, 1), rand(-1, 1)];
                this.curveParams = null;
            }

            update() {
                if (distSq(this.a, this.b) < CONFIG.connectDistSq) {
                    this.weight += this.a.excitation * this.b.excitation * CONFIG.learn;
                }
                this.weight = Math.min(this.weight * CONFIG.decay, 1.0);
            }

            draw(ctx) {
                const dSq = distSq(this.a, this.b);
                if (this.weight < 0.05 || dSq > CONFIG.connectDistSq * 2.25) return;

                const d = Math.sqrt(dSq);
                const dx = this.b.x - this.a.x, dy = this.b.y - this.a.y;
                const angle = Math.atan2(dy, dx);
                const sway = Math.sin(state.time * 0.002 + this.a.x) * 0.2;

                const cp1 = { x: this.a.x + Math.cos(angle + this.cpOffset[0] + sway) * d * 0.33, y: this.a.y + Math.sin(angle + this.cpOffset[0] + sway) * d * 0.33 };
                const cp2 = { x: this.b.x + Math.cos(angle + Math.PI + this.cpOffset[1] + sway) * d * 0.33, y: this.b.y + Math.sin(angle + Math.PI + this.cpOffset[1] + sway) * d * 0.33 };

                this.curveParams = { p0: this.a, cp1, cp2, p3: this.b };

                ctx.beginPath();
                ctx.moveTo(this.a.x, this.a.y);
                ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, this.b.x, this.b.y);
                ctx.lineWidth = 0.5 + this.weight * 1.5;
                ctx.strokeStyle = this.weight > 0.4 ? `rgba(100, 116, 139,${this.weight * 0.4})` : `rgba(71, 85, 105,${this.weight * 0.2})`; // よりシックなグレー系の線
                ctx.stroke();
            }
            isDead() { return this.weight < 0.02 && distSq(this.a, this.b) > CONFIG.connectDistSq; }
        }

        class Signal {
            constructor(edge, from, gen = 0) {
                this.edge = edge; this.from = from;
                this.to = (edge.a === from) ? edge.b : edge.a;
                this.t = 0; this.gen = gen;
                this.speed = CONFIG.sigSpeed * (1 + edge.weight * 0.5);
            }
            update() {
                this.t += this.speed;
                if (this.t >= 1.0) {
                    this.edge.weight = Math.min(this.edge.weight + 0.1, 1.0);
                    return false;
                }
                return true;
            }
            draw(ctx) {
                if (!this.edge.curveParams) return;
                const p = getBezierPos(this.from === this.edge.b ? 1 - this.t : this.t, ...Object.values(this.edge.curveParams));
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(1, 2.5 - this.gen * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(160, 240, 160,${0.8 - this.gen * 0.15})`;
                ctx.fill();
            }
        }

        class Pulse {
            constructor(x, y) { this.x = x; this.y = y; this.r = 0; this.life = 1; }
            update() { this.r += 2; this.life -= 0.015; }
            draw(ctx) {
                if (this.life <= 0) return;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(100,200,120,${this.life * 0.2})`; ctx.stroke();
            }
        }

        const spawnSignal = (edge, from, gen) => {
            if (state.signals.length < CONFIG.maxSigs) state.signals.push(new Signal(edge, from, gen));
        };

        const updateState = () => {
            state.time++;
            for (let i = state.edges.length - 1; i >= 0; i--) { state.edges[i].update(); if (state.edges[i].isDead()) state.edges.splice(i, 1); }
            const len = state.nodes.length;
            for (let i = 0; i < len; i++) {
                const nA = state.nodes[i];
                if (Math.random() < nA.sociability + 0.05) {
                    const nB = state.nodes[(Math.random() * len) | 0];
                    if (nA !== nB && distSq(nA, nB) < CONFIG.connectDistSq * (0.64 + nA.sociability)) {
                        if (!state.edges.some(e => (e.a === nA && e.b === nB) || (e.a === nB && e.b === nA))) {
                            if (Math.random() < 0.015 * (nA.sociability * nB.sociability + 0.2)) state.edges.push(new Edge(nA, nB));
                        }
                    }
                }
                for (let j = i + 1; j < len; j++) {
                    const nB = state.nodes[j];
                    const dx = nB.x - nA.x;
                    const dy = nB.y - nA.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < CONFIG.repulseRadius ** 2 && d2 > 0.1) {
                        const d = Math.sqrt(d2);
                        const f = (CONFIG.repulseRadius - d) / CONFIG.repulseRadius * CONFIG.repulseForce;
                        const rx = (dx / d) * f;
                        const ry = (dy / d) * f;
                        nA.vx -= rx; nA.vy -= ry;
                        nB.vx += rx; nB.vy += ry;
                    }
                }
            }
        };

        const animate = () => {
            if (!canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
            updateState();
            state.edges.forEach(e => e.draw(ctx));
            state.nodes.forEach(n => { n.draw(ctx); n.update(); });
            ctx.globalCompositeOperation = 'lighter';
            for (let i = state.signals.length - 1; i >= 0; i--) {
                const sig = state.signals[i];
                if (sig.update()) {
                    sig.draw(ctx);
                } else {
                    const target = sig.to;
                    if (target.fire() && sig.gen < CONFIG.sigMaxGen) {
                        const connected = [];
                        for (let k = 0; k < state.edges.length; k++) {
                            const e = state.edges[k];
                            if ((e.a === target || e.b === target) && e !== sig.edge) connected.push(e);
                        }
                        if (connected.length > 0) {
                            connected.sort(() => 0.5 - Math.random());
                            const limit = Math.min(connected.length, 2);
                            for (let k = 0; k < limit; k++) {
                                if (Math.random() < connected[k].weight * 0.8) spawnSignal(connected[k], target, sig.gen + 1);
                            }
                        }
                    }
                    state.signals.splice(i, 1);
                }
            }
            for (let i = state.pulses.length - 1; i >= 0; i--) {
                state.pulses[i].update(); state.pulses[i].draw(ctx);
                if (state.pulses[i].life <= 0) state.pulses.splice(i, 1);
            }
            ctx.globalCompositeOperation = 'source-over';
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleInteraction = (x, y) => {
            state.mouse.x = x;
            state.mouse.y = y;
            let clicked = null;
            const clickSq = 30 * 30;
            for (let n of state.nodes) {
                if (distSq(n, { x, y }) < clickSq) {
                    clicked = n;
                    break;
                }
            }
            state.pulses.push(new Pulse(x, y));
            if (clicked) {
                if (clicked.fire()) {
                    let count = 0;
                    for (let e of state.edges) {
                        if (e.a === clicked || e.b === clicked) {
                            if (e.weight > 0.05) spawnSignal(e, clicked, 0);
                            count++;
                            if (count >= 3) break;
                        }
                    }
                }
            } else {
                const n = new Node(x, y);
                n.fire(); n.sociability = 1; state.nodes.push(n);
                if (state.nodes.length > (isMobile ? 70 : 120)) state.nodes.shift();
            }
        };

        const forceConnections = () => {
            const len = state.nodes.length;
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    const nA = state.nodes[i];
                    const nB = state.nodes[j];
                    const dSq = distSq(nA, nB);
                    if (dSq < CONFIG.connectDistSq) {
                        const d = Math.sqrt(dSq);
                        let prob = 0.1;
                        if (d < CONFIG.connectDist * 0.4) prob = 0.7;
                        else if (d < CONFIG.connectDist * 0.7) prob = 0.3;
                        if (Math.random() < prob) {
                            state.edges.push(new Edge(nA, nB, rand(0.3, 0.6)));
                        }
                    }
                }
            }
        };

        // Init
        for (let i = 0; i < CONFIG.nodeCount; i++) state.nodes.push(new Node(rand(0, width), rand(0, height)));
        forceConnections();
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        const handleMouseMove = e => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; };
        const handleMouseDown = e => handleInteraction(e.clientX, e.clientY);
        const handleTouchStart = e => {
            const t = e.touches[0];
            handleInteraction(t.clientX, t.clientY);
        };
        const handleTouchMove = e => {
            const t = e.touches[0];
            state.mouse.x = t.clientX; state.mouse.y = t.clientY;
        };
        const handleTouchEnd = () => { state.mouse.x = -999; state.mouse.y = -999; };

        // We bind events to window or canvas? 
        // Current code binds to window for full screen effect.
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto" />;
};

export default BotanicalSynapse;
