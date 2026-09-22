'use client';

import { useState, useEffect } from 'react';

export default function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: progress === 100 ? 0 : 1,
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        pointerEvents: progress === 100 ? 'none' : 'auto'
      }}
    >
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid rgba(var(--accent-rgb), 0.2)',
            borderTopColor: 'var(--accent)',
            borderRightColor: 'var(--accent-soft)',
            animation: 'spinLoader 1s linear infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            fontSize: '1.5rem'
          }}
        >
          <i className="fas fa-brain"></i>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '2.5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--accent), var(--accent-soft), var(--teal))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}
      >
        {progress}%
      </div>

      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.85rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          fontWeight: 600
        }}
      >
        Initialising Neural Portfolio
      </div>

      <style jsx>{`
        @keyframes spinLoader {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
