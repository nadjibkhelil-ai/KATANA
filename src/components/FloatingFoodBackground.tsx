'use client';

import { useEffect, useState } from 'react';

interface FloatingFoodItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const foodEmojis = [
  // Burgers
  { emoji: '🍔', weight: 3 },
  // French fries
  { emoji: '🍟', weight: 2 },
  // Mac and cheese (using bowl)
  { emoji: '🧀', weight: 2 },
  // Coca cola / drinks
  { emoji: '🥤', weight: 2 },
  { emoji: '🧃', weight: 1 },
  // Hot peppers
  { emoji: '🌶️', weight: 2 },
  // Hot sauce
  { emoji: '🔥', weight: 1 },
  // Additional food items
  { emoji: '🍗', weight: 1 },
  { emoji: '🥓', weight: 1 },
  { emoji: '🍕', weight: 1 },
];

function getRandomPosition() {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
  };
}

function getRandomSize() {
  // Random size between 30px and 80px
  return 30 + Math.random() * 50;
}

function getRandomDuration() {
  // Random duration between 18s and 30s
  return 18 + Math.random() * 12;
}

function getRandomDelay() {
  // Random delay between -15s and 0s
  return -Math.random() * 15;
}

function getWeightedRandomEmoji(): string {
  const totalWeight = foodEmojis.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of foodEmojis) {
    random -= item.weight;
    if (random <= 0) {
      return item.emoji;
    }
  }
  
  return foodEmojis[0].emoji;
}

export default function FloatingFoodBackground() {
  const [foods, setFoods] = useState<FloatingFoodItem[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Generate floating food items
    const foodCount = 15;
    const newFoods: FloatingFoodItem[] = [];
    
    for (let i = 0; i < foodCount; i++) {
      const pos = getRandomPosition();
      newFoods.push({
        id: i,
        emoji: getWeightedRandomEmoji(),
        x: pos.x,
        y: pos.y,
        size: getRandomSize(),
        duration: getRandomDuration(),
        delay: getRandomDelay(),
      });
    }
    
    setFoods(newFoods);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  if (reducedMotion) {
    return (
      <div className="floating-food-bg" aria-hidden="true">
        <div className="warm-overlay" />
      </div>
    );
  }

  return (
    <div className="floating-food-bg" aria-hidden="true">
      {/* Warm overlay */}
      <div className="warm-overlay" />
      
      {/* Floating food items */}
      {foods.map((food) => (
        <div
          key={food.id}
          className="floating-food"
          style={{
            left: `${food.x}%`,
            top: `${food.y}%`,
            fontSize: `${food.size}px`,
            animationDuration: `${food.duration}s`,
            animationDelay: `${food.delay}s`,
          }}
        >
          {food.emoji}
        </div>
      ))}
      
      {/* Steam effects - positioned near some food items */}
      {foods.slice(0, 4).map((food, index) => (
        <div
          key={`steam-${food.id}`}
          className="steam-effect"
          style={{
            left: `${food.x + 2}%`,
            top: `${food.y - 5}%`,
            animationDelay: `${index * 0.75}s`,
          }}
        />
      ))}
      
      {/* Bubble effects - positioned near drink items */}
      {foods
        .filter((food) => food.emoji === '🥤' || food.emoji === '🧃')
        .map((food, index) => (
          <div
            key={`bubble-${food.id}`}
            className="bubble-effect"
            style={{
              left: `${food.x + 1}%`,
              top: `${food.y - 3}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          />
        ))}
    </div>
  );
}