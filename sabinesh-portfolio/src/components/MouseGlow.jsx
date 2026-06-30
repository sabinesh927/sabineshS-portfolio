import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: pos.y - 200,
        left: pos.x - 200,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'top 0.1s, left 0.1s',
      }}
    />
  );
}
