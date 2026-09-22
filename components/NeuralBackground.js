'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates tracking
    const mouse = { x: -1000, y: -1000, radius: 220 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color palettes for particles
    const colors = [
      'rgba(108, 99, 255, ', // Electric Indigo
      'rgba(255, 75, 139, ', // Neon Pink
      'rgba(67, 206, 162, ', // Mint Cyan
      'rgba(157, 78, 221, '  // Vibrant Purple
    ];

    // Particle nodes array
    const particleCount = Math.min(Math.floor((width * height) / 14000), 90);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.2,
        color: colorBase,
        baseAlpha: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        angle: Math.random() * Math.PI * 2
      });
    }

    // Floating ambient background mesh Orbs
    const orbs = [
      { x: width * 0.15, y: height * 0.25, radius: 220, color: 'rgba(108, 99, 255, 0.08)', vx: 0.2, vy: 0.3 },
      { x: width * 0.85, y: height * 0.45, radius: 260, color: 'rgba(255, 75, 139, 0.06)', vx: -0.2, vy: 0.2 },
      { x: width * 0.5, y: height * 0.8, radius: 200, color: 'rgba(67, 206, 162, 0.07)', vx: 0.15, vy: -0.25 }
    ];

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating background glowing mesh Orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        const orbGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        orbGrad.addColorStop(0, orb.color);
        orbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse interactive radial light flare
      if (mouse.x > 0 && mouse.y > 0) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.6
        );
        glowGradient.addColorStop(0, 'rgba(108, 99, 255, 0.12)');
        glowGradient.addColorStop(0.4, 'rgba(255, 75, 139, 0.05)');
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.pulseSpeed;
        p.x += p.vx + Math.cos(p.angle) * 0.15;
        p.y += p.vy + Math.sin(p.angle) * 0.15;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse proximity interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alphaMultiplier = 1;
        let scaleMultiplier = 1;

        if (dist < mouse.radius) {
          const factor = 1 - dist / mouse.radius;
          alphaMultiplier = 1 + factor * 2;
          scaleMultiplier = 1 + factor * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * scaleMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(p.baseAlpha * alphaMultiplier, 0.9)})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color.includes('108')
          ? '#6c63ff'
          : p.color.includes('255')
          ? '#ff4b8b'
          : '#43cea2';
        ctx.fill();

        // Connect node lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ndx = p.x - p2.x;
          const ndy = p.y - p2.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (nDist < 140) {
            const lineAlpha = (1 - nDist / 140) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.9
      }}
    />
  );
}