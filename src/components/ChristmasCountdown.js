import React, { useState, useEffect, useRef } from 'react';
import { Gift, Star, TreePine, Snowflake } from 'lucide-react';
import FallingSnow from './FallingSnow';
import ParticleSystem from './ParticleSystem';
import { useTheme } from '../contexts/ThemeContext';

const FESTIVE_QUOTES = [
  "The most wonderful time of the year is almost here!",
  "May your days be merry and bright.",
  "It's beginning to look a lot like Christmas...",
  "All hearts come home for Christmas.",
  "The magic of Christmas never ends.",
  "Peace on Earth, goodwill to all.",
  "Where there is love, there is Christmas.",
  "Christmas waves a magic wand over this world.",
];

const LIGHT_COLORS = ['#ff1a1a', '#00cc44', '#ffcc00', '#1a8cff', '#ff1a1a', '#00cc44', '#ffcc00', '#1a8cff', '#ff1a1a', '#00cc44', '#ffcc00'];

// Bulb positions along the sagging wire (x%, y in px from top)
const BULB_POSITIONS = LIGHT_COLORS.map((_, i) => {
  const t = i / (LIGHT_COLORS.length - 1);
  // Parabolic sag: deeper in the middle
  const sag = Math.sin(t * Math.PI) * 14;
  return { x: t * 100, y: 6 + sag };
});

const ChristmasLights = () => (
  <div className="christmas-lights" aria-hidden="true">
    {/* SVG wire that sags between endpoints */}
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 0,6 Q 25,20 50,20 Q 75,20 100,6"
        stroke="#444"
        strokeWidth="0.6"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
    {LIGHT_COLORS.map((color, i) => (
      <div
        key={i}
        className="light-bulb"
        style={{
          '--bulb-color': color,
          '--twinkle-duration': `${1.5 + Math.random() * 2}s`,
          '--twinkle-delay': `${Math.random() * 3}s`,
          left: `${BULB_POSITIONS[i].x}%`,
          top: `${BULB_POSITIONS[i].y}px`,
          transform: 'translateX(-50%)',
        }}
      />
    ))}
  </div>
);

const Ornament = ({ theme, side }) => (
  <div className={side === 'left' ? 'ornament-left' : 'ornament'} aria-hidden="true">
    <div className="ornament-string" />
    <div className="ornament-cap" />
    <div
      className="ornament-ball"
      style={{ '--ornament-color': side === 'left' ? theme.gradientColors[2] : theme.gradientColors[0] }}
    />
  </div>
);

const Holly = ({ position }) => (
  <div className={`holly-corner holly-corner-${position}`} aria-hidden="true">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* Holly leaves */}
      <ellipse cx="10" cy="18" rx="8" ry="4" fill="#15803d" transform="rotate(-30 10 18)" />
      <ellipse cx="18" cy="12" rx="8" ry="4" fill="#16a34a" transform="rotate(20 18 12)" />
      {/* Leaf veins */}
      <line x1="4" y1="16" x2="16" y2="20" stroke="#0f5c2e" strokeWidth="0.5" />
      <line x1="12" y1="10" x2="24" y2="14" stroke="#0f7a3a" strokeWidth="0.5" />
      {/* Berries */}
      <circle cx="14" cy="14" r="2.5" fill="#dc2626" />
      <circle cx="17" cy="17" r="2.5" fill="#dc2626" />
      <circle cx="12" cy="17" r="2" fill="#b91c1c" />
      {/* Berry highlights */}
      <circle cx="13.3" cy="13.3" r="0.8" fill="rgba(255,255,255,0.5)" />
      <circle cx="16.3" cy="16.3" r="0.8" fill="rgba(255,255,255,0.5)" />
    </svg>
  </div>
);

const SantaSleigh = () => (
  <div className="santa-sleigh" aria-hidden="true">
    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      {/* Reindeer silhouettes */}
      <g fill="#3a2518" opacity="0.9">
        {/* Lead reindeer */}
        <ellipse cx="20" cy="28" rx="8" ry="5" />
        <circle cx="14" cy="22" r="4" />
        <line x1="12" y1="18" x2="9" y2="12" stroke="#3a2518" strokeWidth="1.5" />
        <line x1="9" y1="12" x2="7" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="9" y1="12" x2="11" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="16" y1="18" x2="14" y2="12" stroke="#3a2518" strokeWidth="1.5" />
        <line x1="14" y1="12" x2="12" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="14" y1="12" x2="16" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="18" y1="33" x2="17" y2="40" stroke="#3a2518" strokeWidth="1.2" />
        <line x1="22" y1="33" x2="23" y2="40" stroke="#3a2518" strokeWidth="1.2" />
        {/* Second reindeer */}
        <ellipse cx="42" cy="28" rx="8" ry="5" />
        <circle cx="36" cy="22" r="4" />
        <line x1="34" y1="18" x2="31" y2="12" stroke="#3a2518" strokeWidth="1.5" />
        <line x1="31" y1="12" x2="29" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="31" y1="12" x2="33" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="38" y1="18" x2="36" y2="12" stroke="#3a2518" strokeWidth="1.5" />
        <line x1="36" y1="12" x2="34" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="36" y1="12" x2="38" y2="10" stroke="#3a2518" strokeWidth="1" />
        <line x1="40" y1="33" x2="39" y2="40" stroke="#3a2518" strokeWidth="1.2" />
        <line x1="44" y1="33" x2="45" y2="40" stroke="#3a2518" strokeWidth="1.2" />
        {/* Rudolph nose */}
        <circle cx="11" cy="23" r="1.5" fill="#ef4444" />
      </g>
      {/* Reins */}
      <path d="M 28,26 L 50,26 Q 60,24 70,28" stroke="#8B7355" strokeWidth="0.8" fill="none" />
      {/* Sleigh */}
      <g>
        <path d="M 65,20 L 95,20 Q 100,20 100,25 L 100,35 Q 100,38 97,38 L 60,38 Q 55,38 58,32 Z" fill="#dc2626" />
        <path d="M 55,38 Q 50,42 55,44 L 105,44 Q 110,44 108,40 L 105,38" stroke="#8B0000" strokeWidth="2" fill="none" />
        <path d="M 65,20 L 95,20 Q 100,20 100,22 L 100,24 L 63,24 Z" fill="#b91c1c" />
      </g>
      {/* Santa */}
      <g>
        {/* Body */}
        <ellipse cx="82" cy="28" rx="10" ry="9" fill="#dc2626" />
        {/* Belt */}
        <rect x="72" y="32" width="20" height="3" fill="#1a1a1a" rx="1" />
        <rect x="80" y="31" width="4" height="5" fill="#fbbf24" rx="0.5" />
        {/* Head */}
        <circle cx="82" cy="15" r="7" fill="#fcd9b6" />
        {/* Hat */}
        <path d="M 75,15 Q 75,6 82,4 Q 89,6 89,15 Z" fill="#dc2626" />
        <rect x="73" y="14" width="18" height="3" fill="white" rx="1.5" />
        <circle cx="82" cy="3" r="2.5" fill="white" />
        {/* Beard */}
        <ellipse cx="82" cy="20" rx="5" ry="4" fill="white" />
        {/* Eyes */}
        <circle cx="80" cy="14" r="0.8" fill="#1a1a1a" />
        <circle cx="84" cy="14" r="0.8" fill="#1a1a1a" />
      </g>
      {/* Gift bag */}
      <rect x="92" y="22" width="6" height="8" fill="#15803d" rx="1" />
      <line x1="95" y1="22" x2="95" y2="30" stroke="#fbbf24" strokeWidth="0.8" />
      <line x1="92" y1="26" x2="98" y2="26" stroke="#fbbf24" strokeWidth="0.8" />
    </svg>
  </div>
);

const AnimatedNumber = ({ value, theme }) => (
  <span
    key={value}
    className="inline-block font-display font-black tabular-nums animate-slide-up gradient-text"
    style={{ backgroundImage: theme.numberGradient }}
  >
    {String(value).padStart(2, '0')}
  </span>
);

const TimeCard = ({ value, label, theme, delay, isSeconds }) => {
  const [pop, setPop] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (isSeconds && value !== prevValue.current) {
      setPop(true);
      const timer = setTimeout(() => setPop(false), 300);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value, isSeconds]);

  return (
    <div
      className={`${theme.numberCardBg} backdrop-blur-sm rounded-2xl p-5 md:p-6
        hover:shadow-xl transition-all duration-300 transform hover:scale-105
        border border-white/20 animate-fade-in-up card-inner-glow
        ${pop ? 'animate-tick-pop' : ''}`}
      style={{ animationDelay: pop ? '0s' : `${delay}s` }}
      tabIndex="0"
    >
      <div
        className="text-5xl md:text-6xl font-display font-black transition-colors duration-500 overflow-hidden"
        aria-label={`${value} ${label}`}
      >
        <AnimatedNumber value={value} theme={theme} />
      </div>
      <div className={`text-xs font-display font-semibold uppercase tracking-[0.2em] mt-2 ${theme.text} transition-colors duration-500`}>
        {label}
      </div>
    </div>
  );
};

const ColonSeparator = ({ theme }) => (
  <div className="hidden md:flex items-center justify-center animate-colon-pulse">
    <span className={`text-4xl font-bold ${theme.primary} opacity-60 transition-colors duration-500`}>:</span>
  </div>
);

const Divider = ({ theme }) => (
  <div className="flex items-center gap-3 my-6 mx-auto max-w-md">
    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.gradientColors[0]}40, transparent)` }} />
    <Snowflake className={`w-4 h-4 ${theme.accent} animate-spin-slow opacity-50 transition-colors duration-500`} />
    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.gradientColors[2]}40, transparent)` }} />
  </div>
);

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteKey, setQuoteKey] = useState(0);
  const { theme, isTransitioning } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotate quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FESTIVE_QUOTES.length);
      setQuoteKey((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let christmas = new Date(currentYear, 11, 25);

      if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25);
      }

      const difference = christmas - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const isChristmas = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  // Calculate progress toward Christmas
  const getProgress = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25);
    let lastChristmas = new Date(currentYear - 1, 11, 25);

    if (now > christmas) {
      lastChristmas = christmas;
      christmas = new Date(currentYear + 1, 11, 25);
    }

    const totalDays = (christmas - lastChristmas) / (1000 * 60 * 60 * 24);
    const elapsed = (now - lastChristmas) / (1000 * 60 * 60 * 24);
    return Math.min(100, Math.round((elapsed / totalDays) * 100));
  };

  const progress = getProgress();

  // Animated gradient background style
  const bgStyle = {
    background: `linear-gradient(135deg, ${theme.gradientColors[0]}, ${theme.gradientColors[1]}, ${theme.gradientColors[2]}, ${theme.gradientColors[1]})`,
    backgroundSize: '300% 300%',
    animation: 'gradientShift 8s ease infinite',
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative transition-opacity duration-500 ${isTransitioning ? 'opacity-75' : 'opacity-100'}`}
      style={bgStyle}
    >
      <FallingSnow />
      <ParticleSystem />
      <SantaSleigh />

      {/* Floating decorations */}
      {mounted && (
        <>
          <div className="absolute top-[12%] left-[8%] z-20 opacity-40 animate-float pointer-events-none" style={{ animationDelay: '0s', animationDuration: '4s' }}>
            <Snowflake className={`w-8 h-8 md:w-10 md:h-10 ${theme.accent} animate-spin-slow transition-colors duration-500`} />
          </div>
          <div className="absolute top-[18%] right-[10%] z-20 opacity-30 animate-float pointer-events-none" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
            <Star className={`w-7 h-7 md:w-9 md:h-9 ${theme.accent} transition-colors duration-500`} />
          </div>
          <div className="absolute bottom-[15%] left-[12%] z-20 opacity-30 animate-float pointer-events-none" style={{ animationDelay: '0.8s', animationDuration: '5s' }}>
            <Gift className={`w-7 h-7 md:w-8 md:h-8 ${theme.primary} transition-colors duration-500`} />
          </div>
          <div className="absolute bottom-[20%] right-[8%] z-20 opacity-35 animate-float pointer-events-none" style={{ animationDelay: '2s', animationDuration: '4.5s' }}>
            <TreePine className={`w-9 h-9 md:w-11 md:h-11 ${theme.secondary} transition-colors duration-500`} />
          </div>
        </>
      )}

      <main
        className={`${theme.cardBg} ${theme.cardShadow} rounded-3xl p-8 md:p-10 max-w-3xl w-full text-center relative z-20 transition-all duration-500 ${theme.cardBorder} border animate-pulse-glow overflow-visible`}
        style={{ '--glow-color': theme.glow }}
        role="main"
        aria-label="Christmas countdown application"
      >
        {/* Christmas lights with sagging wire */}
        <ChristmasLights />

        {/* Swinging ornaments */}
        <Ornament theme={theme} side="right" />
        <Ornament theme={theme} side="left" />

        {/* Holly decorations */}
        <Holly position="tl" />
        <Holly position="br" />

        {/* Decorative icons */}
        <div
          className={`flex justify-center mb-4 mt-2 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
          role="img"
          aria-label="Christmas decorations"
        >
          <div className="flex items-center space-x-4">
            <TreePine className={`${theme.secondary} w-10 h-10 md:w-12 md:h-12 transition-colors duration-500 animate-float`} style={{ animationDelay: '0s' }} aria-hidden="true" />
            <Star className={`${theme.accent} w-7 h-7 md:w-8 md:h-8 transition-colors duration-500 animate-spin-slow`} aria-hidden="true" />
            <Gift className={`${theme.primary} w-9 h-9 md:w-10 md:h-10 transition-colors duration-500 animate-float`} style={{ animationDelay: '1s' }} aria-hidden="true" />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl md:text-6xl font-christmas font-bold mb-1 transition-colors duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <span className="gradient-text" style={{ backgroundImage: theme.numberGradient }}>
            {isChristmas ? 'Merry Christmas!' : 'Christmas Countdown'}
          </span>
        </h1>

        {!isChristmas ? (
          <>
            <p
              className={`text-base font-display italic ${theme.text} mb-0 transition-colors duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}
            >
              <span key={quoteKey} className="inline-block animate-quote-fade-in">
                &ldquo;{FESTIVE_QUOTES[quoteIndex]}&rdquo;
              </span>
            </p>

            {/* Progress bar */}
            <div
              className={`max-w-xs mx-auto mb-2 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              <Divider theme={theme} />
              <div className="flex justify-between text-xs mb-1">
                <span className={`${theme.text} font-display transition-colors duration-500`}>Dec 25</span>
                <span className="font-display font-bold transition-colors duration-500">
                  <span className="gradient-text" style={{ backgroundImage: theme.numberGradient }}>{progress}%</span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full rounded-full animate-progress-fill candy-cane-bar"
                  style={{
                    '--progress': `${progress}%`,
                    width: `${progress}%`,
                    background: theme.numberGradient,
                  }}
                />
              </div>
            </div>

            <Divider theme={theme} />

            {/* Countdown grid */}
            <div
              className="flex justify-center items-stretch gap-3 md:gap-4 mb-6 flex-wrap"
              role="timer"
              aria-live="polite"
              aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until Christmas`}
            >
              <div className="w-[calc(50%-0.5rem)] md:w-auto md:flex-1">
                <TimeCard value={timeLeft.days} label="Days" theme={theme} delay={0.3} />
              </div>
              <ColonSeparator theme={theme} />
              <div className="w-[calc(50%-0.5rem)] md:w-auto md:flex-1">
                <TimeCard value={timeLeft.hours} label="Hours" theme={theme} delay={0.45} />
              </div>
              <ColonSeparator theme={theme} />
              <div className="w-[calc(50%-0.5rem)] md:w-auto md:flex-1">
                <TimeCard value={timeLeft.minutes} label="Minutes" theme={theme} delay={0.6} />
              </div>
              <ColonSeparator theme={theme} />
              <div className="w-[calc(50%-0.5rem)] md:w-auto md:flex-1">
                <TimeCard value={timeLeft.seconds} label="Seconds" theme={theme} delay={0.75} isSeconds />
              </div>
            </div>

            <p
              className={`text-sm font-display ${theme.text} opacity-60 transition-colors duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.9s' }}
            >
              Time until Christmas Day
            </p>
          </>
        ) : (
          <div
            className={`text-6xl mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
            role="img"
            aria-label="Christmas celebration emojis"
          >
            🎅🎁🎄
          </div>
        )}

        {isChristmas && (
          <div
            className={`text-lg font-display ${theme.text} transition-colors duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.8s' }}
            aria-live="polite"
          >
            Hope your day is filled with joy and wonder!
          </div>
        )}
      </main>
    </div>
  );
};

export default ChristmasCountdown;
