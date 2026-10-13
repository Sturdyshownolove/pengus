import React, { useEffect, useState } from 'react';

interface FlyingCoinsProps {
  active: boolean;
  onComplete?: () => void;
  count?: number;
}

interface Coin {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  rotation: number;
  scale: number;
}

export const FlyingCoins: React.FC<FlyingCoinsProps> = ({ active, onComplete, count = 12 }) => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    if (active) {
      const generated: Coin[] = Array.from({ length: count }).map((_, idx) => ({
        id: idx,
        startX: (Math.random() - 0.5) * 160,
        startY: Math.random() * 40,
        delay: idx * 0.05,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.5
      }));
      setCoins(generated);

      const timer = setTimeout(() => {
        setCoins([]);
        if (onComplete) onComplete();
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [active, count, onComplete]);

  if (!active || coins.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center">
      {coins.map(coin => (
        <div
          key={coin.id}
          className="absolute"
          style={{
            transform: `translate(${coin.startX}px, ${coin.startY}px) scale(${coin.scale})`,
            animation: `coinFly 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${coin.delay}s forwards`
          }}
        >
          {/* Golden Coin Graphic */}
          <div className="w-10 h-10 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 rounded-full border-2 border-yellow-100 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center text-xs font-black text-amber-950">
            ₺
          </div>
        </div>
      ))}
    </div>
  );
};
