import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  classic: {
    id: 'classic',
    name: 'Classic Christmas',
    description: 'Traditional red and green with falling snow',
    background: 'bg-gradient-to-br from-red-600 via-red-700 to-green-700',
    gradientColors: ['#dc2626', '#b91c1c', '#15803d'],
    cardBg: 'bg-white/85 backdrop-blur-xl',
    cardBorder: 'border-white/30',
    cardShadow: 'shadow-2xl shadow-red-900/20',
    numberCardBg: 'bg-white/60',
    primary: 'text-red-600',
    secondary: 'text-green-600',
    accent: 'text-yellow-400',
    text: 'text-gray-600',
    glow: 'rgba(220, 38, 38, 0.3)',
    snow: {
      color: 'rgba(255, 255, 255, 0.8)',
      count: 150,
      speed: 1
    },
    particles: null,
    animation: 'animate-pulse'
  },
  winter: {
    id: 'winter',
    name: 'Winter Wonderland',
    description: 'Cool blues and whites with enhanced snow',
    background: 'bg-gradient-to-br from-blue-600 via-blue-800 to-indigo-900',
    gradientColors: ['#2563eb', '#1e40af', '#312e81'],
    cardBg: 'bg-white/90 backdrop-blur-xl',
    cardBorder: 'border-white/30',
    cardShadow: 'shadow-2xl shadow-blue-900/30',
    numberCardBg: 'bg-blue-50/60',
    primary: 'text-blue-600',
    secondary: 'text-indigo-600',
    accent: 'text-cyan-400',
    text: 'text-slate-600',
    glow: 'rgba(59, 130, 246, 0.3)',
    snow: {
      color: 'rgba(200, 230, 255, 0.9)',
      count: 200,
      speed: 0.8
    },
    particles: {
      type: 'stars',
      count: 50,
      color: 'rgba(255, 255, 255, 0.6)'
    },
    animation: 'animate-bounce'
  },
  golden: {
    id: 'golden',
    name: 'Golden Elegance',
    description: 'Luxury gold and deep red theme',
    background: 'bg-gradient-to-br from-amber-600 via-orange-700 to-red-800',
    gradientColors: ['#d97706', '#c2410c', '#991b1b'],
    cardBg: 'bg-gradient-to-br from-amber-50/90 to-orange-50/90 backdrop-blur-xl',
    cardBorder: 'border-amber-200/40',
    cardShadow: 'shadow-2xl shadow-amber-900/40',
    numberCardBg: 'bg-amber-50/60',
    primary: 'text-amber-700',
    secondary: 'text-orange-700',
    accent: 'text-yellow-500',
    text: 'text-amber-800',
    glow: 'rgba(245, 158, 11, 0.4)',
    snow: {
      color: 'rgba(255, 215, 0, 0.7)',
      count: 100,
      speed: 1.2
    },
    particles: {
      type: 'sparkles',
      count: 30,
      color: 'rgba(255, 215, 0, 0.8)'
    },
    animation: 'animate-ping'
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic Minimal',
    description: 'Clean minimalist design',
    background: 'bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300',
    gradientColors: ['#f1f5f9', '#e5e7eb', '#cbd5e1'],
    cardBg: 'bg-white/90 backdrop-blur-xl',
    cardBorder: 'border-slate-200/50',
    cardShadow: 'shadow-xl shadow-slate-900/10',
    numberCardBg: 'bg-slate-50/60',
    primary: 'text-slate-700',
    secondary: 'text-gray-600',
    accent: 'text-red-500',
    text: 'text-slate-600',
    glow: 'rgba(100, 116, 139, 0.15)',
    snow: {
      color: 'rgba(100, 116, 139, 0.3)',
      count: 75,
      speed: 0.6
    },
    particles: null,
    animation: 'animate-none'
  },
  dark: {
    id: 'dark',
    name: 'Dark Christmas',
    description: 'Dark mode with neon accents',
    background: 'bg-gradient-to-br from-slate-900 via-gray-900 to-black',
    gradientColors: ['#0f172a', '#111827', '#000000'],
    cardBg: 'bg-slate-800/80 backdrop-blur-xl',
    cardBorder: 'border-slate-700/50',
    cardShadow: 'shadow-2xl shadow-green-500/20',
    numberCardBg: 'bg-slate-700/50',
    primary: 'text-green-400',
    secondary: 'text-red-400',
    accent: 'text-yellow-400',
    text: 'text-slate-300',
    glow: 'rgba(34, 197, 94, 0.3)',
    snow: {
      color: 'rgba(34, 197, 94, 0.4)',
      count: 120,
      speed: 1.1
    },
    particles: {
      type: 'neon',
      count: 40,
      color: 'rgba(34, 197, 94, 0.6)'
    },
    animation: 'animate-pulse'
  },
  retro: {
    id: 'retro',
    name: 'Retro Vintage',
    description: '80s Christmas vibes with gradients',
    background: 'bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700',
    gradientColors: ['#ec4899', '#9333ea', '#4338ca'],
    cardBg: 'bg-gradient-to-br from-pink-50/90 to-purple-50/90 backdrop-blur-xl',
    cardBorder: 'border-pink-200/40',
    cardShadow: 'shadow-2xl shadow-purple-900/40',
    numberCardBg: 'bg-pink-50/50',
    primary: 'text-pink-600',
    secondary: 'text-purple-600',
    accent: 'text-yellow-400',
    text: 'text-purple-800',
    glow: 'rgba(236, 72, 153, 0.3)',
    snow: {
      color: 'rgba(255, 20, 147, 0.6)',
      count: 80,
      speed: 1.5
    },
    particles: {
      type: 'retro',
      count: 25,
      color: 'rgba(255, 20, 147, 0.7)'
    },
    animation: 'animate-spin'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('classic');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('christmas-countdown-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('christmas-countdown-theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeId) => {
    if (themeId === currentTheme) return;

    setIsTransitioning(true);

    // Add a small delay for smooth transition
    setTimeout(() => {
      setCurrentTheme(themeId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 150);
  };

  const theme = themes[currentTheme];

  const value = {
    currentTheme,
    theme,
    themes,
    changeTheme,
    isTransitioning
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
