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

const LIGHT_COLORS = ['#ff1a1a', '#00cc44', '#ffcc00', '#1a8cff', '#ff69b4', '#ff1a1a', '#00cc44', '#ffcc00', '#1a8cff', '#ff69b4', '#ff1a1a', '#00cc44', '#ffcc00', '#1a8cff', '#ff69b4'];

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

const Ornament = ({ theme, side }) => {
  const posClass = side.startsWith('left') ? (side === 'left' ? 'ornament-left' : 'ornament-left-inner') : (side === 'right' ? 'ornament' : 'ornament-right-inner');
  const colors = {
    'left': theme.gradientColors[2],
    'right': theme.gradientColors[0],
    'left-inner': theme.gradientColors[0],
    'right-inner': theme.gradientColors[2],
  };
  const sizes = {
    'left': 22,
    'right': 22,
    'left-inner': 16,
    'right-inner': 16,
  };
  return (
    <div className={posClass} aria-hidden="true">
      <div className="ornament-string" />
      <div className="ornament-cap" />
      <div
        className="ornament-ball"
        style={{ '--ornament-color': colors[side], '--ornament-size': `${sizes[side]}px` }}
      />
    </div>
  );
};

const Holly = ({ position }) => (
  <div className={`holly-corner holly-corner-${position}`} aria-hidden="true">
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      {/* Large holly leaves */}
      <ellipse cx="18" cy="36" rx="16" ry="7" fill="#15803d" transform="rotate(-30 18 36)" />
      <ellipse cx="36" cy="22" rx="16" ry="7" fill="#16a34a" transform="rotate(20 36 22)" />
      <ellipse cx="28" cy="44" rx="14" ry="6" fill="#166534" transform="rotate(-10 28 44)" />
      {/* Leaf veins */}
      <line x1="6" y1="32" x2="30" y2="40" stroke="#0f5c2e" strokeWidth="0.8" />
      <line x1="22" y1="18" x2="50" y2="26" stroke="#0f7a3a" strokeWidth="0.8" />
      <line x1="16" y1="40" x2="40" y2="48" stroke="#0f5c2e" strokeWidth="0.6" />
      {/* Berries cluster */}
      <circle cx="28" cy="28" r="4.5" fill="#dc2626" />
      <circle cx="34" cy="34" r="4.5" fill="#dc2626" />
      <circle cx="24" cy="34" r="3.5" fill="#b91c1c" />
      <circle cx="30" cy="22" r="3" fill="#ef4444" />
      <circle cx="36" cy="28" r="3" fill="#b91c1c" />
      {/* Berry highlights */}
      <circle cx="26.5" cy="26.5" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="32.5" cy="32.5" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="22.5" cy="32.5" r="1.2" fill="rgba(255,255,255,0.4)" />
      <circle cx="29" cy="21" r="1" fill="rgba(255,255,255,0.4)" />
    </svg>
  </div>
);

const Reindeer = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    {/* Body */}
    <ellipse cx="0" cy="0" rx="12" ry="6" fill="#5c3a1e" />
    {/* Head */}
    <ellipse cx="-14" cy="-3" rx="5" ry="4" fill="#6b4226" />
    {/* Antlers */}
    <path d="M-16,-7 L-20,-16 L-17,-12 L-22,-14" stroke="#3d2b1f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M-13,-7 L-10,-16 L-13,-12 L-8,-14" stroke="#3d2b1f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Legs */}
    <line x1="-5" y1="6" x2="-7" y2="14" stroke="#4a2a10" strokeWidth="1.5" />
    <line x1="5" y1="6" x2="3" y2="14" stroke="#4a2a10" strokeWidth="1.5" />
    <line x1="-2" y1="6" x2="-4" y2="13" stroke="#4a2a10" strokeWidth="1.5" />
    <line x1="8" y1="6" x2="6" y2="13" stroke="#4a2a10" strokeWidth="1.5" />
    {/* Eye */}
    <circle cx="-17" cy="-4" r="1" fill="#111" />
    {/* Nose */}
    <circle cx="-19" cy="-2" r="1.5" fill="#dc2626" />
    {/* Tail */}
    <path d="M12,0 Q16,-3 14,-6" stroke="#5c3a1e" strokeWidth="1" fill="none" />
  </g>
);

const SantaSleigh = () => (
  <div className="santa-sleigh" aria-hidden="true">
    <svg viewBox="0 0 520 120" width="520" height="120" xmlns="http://www.w3.org/2000/svg" className="santa-sleigh-svg">
      {/* 9 Reindeer in V-formation, facing left */}
      {/* Lead reindeer (Rudolph) */}
      <Reindeer x={45} y={45} />
      {/* Row 2 */}
      <Reindeer x={85} y={32} />
      <Reindeer x={85} y={58} />
      {/* Row 3 */}
      <Reindeer x={125} y={25} />
      <Reindeer x={125} y={65} />
      {/* Row 4 */}
      <Reindeer x={165} y={30} />
      <Reindeer x={165} y={60} />
      {/* Row 5 */}
      <Reindeer x={205} y={35} />
      <Reindeer x={205} y={55} />
      {/* Reins connecting to sleigh */}
      <path d="M215,40 Q260,42 280,48" stroke="#8B6914" strokeWidth="1.2" fill="none" />
      <path d="M215,55 Q260,52 280,50" stroke="#8B6914" strokeWidth="1.2" fill="none" />
      {/* Sleigh body */}
      <path d="M280,35 L310,30 Q340,28 350,35 L360,42 Q365,50 360,55 L350,60 Q330,68 290,68 L270,65 Q260,60 265,50 Z" fill="#b91c1c" />
      <path d="M265,50 Q260,60 270,65 L290,68 Q270,72 260,75 Q250,78 255,72 Q258,68 260,62 Z" fill="#991b1b" />
      {/* Sleigh runner */}
      <path d="M260,75 Q280,70 360,62 Q380,60 385,65 Q388,68 380,70 Q340,75 260,80 Q250,82 248,78 Q246,75 255,75 Z" fill="#1a1a1a" stroke="#333" strokeWidth="0.5" />
      {/* Runner curl */}
      <path d="M385,65 Q392,58 398,60 Q402,62 396,68 Q390,72 385,70" fill="#1a1a1a" />
      {/* Santa body */}
      <ellipse cx="320" cy="38" rx="18" ry="15" fill="#dc2626" />
      {/* Santa head */}
      <circle cx="310" cy="22" r="10" fill="#fcd5b0" />
      {/* Santa hat */}
      <path d="M300,22 Q305,8 320,5 Q325,4 322,10 Q318,16 315,20" fill="#dc2626" />
      <circle cx="322" cy="5" r="3" fill="white" />
      <path d="M298,22 Q305,20 318,20" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Santa beard */}
      <path d="M302,26 Q305,34 310,32 Q315,34 318,26" fill="white" />
      {/* Santa belt */}
      <rect x="310" y="42" width="20" height="4" rx="1" fill="#1a1a1a" />
      <rect x="318" y="41" width="6" height="6" rx="1" fill="#fbbf24" />
      {/* Gift bag */}
      <path d="M340,25 Q350,20 355,28 L358,45 Q355,52 345,50 L338,42 Z" fill="#15803d" />
      <path d="M342,30 L355,35" stroke="#fbbf24" strokeWidth="1.5" />
      <path d="M345,25 L352,42" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Santa arm waving */}
      <path d="M305,32 Q295,28 290,20" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="289" cy="18" r="3" fill="#fcd5b0" />
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

      {/* Floating decorations - maxed out */}
      {mounted && (
        <>
          <div className="absolute top-[10%] left-[6%] z-20 opacity-50 animate-float pointer-events-none" style={{ animationDelay: '0s', animationDuration: '4s' }}>
            <Snowflake className={`w-10 h-10 md:w-14 md:h-14 ${theme.accent} animate-spin-slow transition-colors duration-500`} />
          </div>
          <div className="absolute top-[15%] right-[8%] z-20 opacity-40 animate-float pointer-events-none" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
            <Star className={`w-9 h-9 md:w-12 md:h-12 ${theme.accent} transition-colors duration-500`} />
          </div>
          <div className="absolute bottom-[12%] left-[10%] z-20 opacity-40 animate-float pointer-events-none" style={{ animationDelay: '0.8s', animationDuration: '5s' }}>
            <Gift className={`w-9 h-9 md:w-12 md:h-12 ${theme.primary} transition-colors duration-500`} />
          </div>
          <div className="absolute bottom-[18%] right-[6%] z-20 opacity-45 animate-float pointer-events-none" style={{ animationDelay: '2s', animationDuration: '4.5s' }}>
            <TreePine className={`w-12 h-12 md:w-16 md:h-16 ${theme.secondary} transition-colors duration-500`} />
          </div>
          <div className="absolute top-[40%] left-[3%] z-20 opacity-30 animate-float pointer-events-none" style={{ animationDelay: '0.5s', animationDuration: '6s' }}>
            <Star className={`w-6 h-6 md:w-8 md:h-8 ${theme.primary} animate-spin-slow transition-colors duration-500`} />
          </div>
          <div className="absolute top-[35%] right-[4%] z-20 opacity-25 animate-float pointer-events-none" style={{ animationDelay: '3s', animationDuration: '5.5s' }}>
            <Snowflake className={`w-7 h-7 md:w-10 md:h-10 ${theme.accent} animate-spin-slow transition-colors duration-500`} />
          </div>
          <div className="absolute bottom-[35%] left-[5%] z-20 opacity-25 animate-float pointer-events-none" style={{ animationDelay: '1s', animationDuration: '4.2s' }}>
            <TreePine className={`w-8 h-8 md:w-10 md:h-10 ${theme.secondary} transition-colors duration-500`} />
          </div>
          <div className="absolute bottom-[40%] right-[5%] z-20 opacity-30 animate-float pointer-events-none" style={{ animationDelay: '2.5s', animationDuration: '3.8s' }}>
            <Gift className={`w-7 h-7 md:w-9 md:h-9 ${theme.primary} transition-colors duration-500`} />
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
        <Ornament theme={theme} side="right-inner" />
        <Ornament theme={theme} side="left-inner" />

        {/* Holly decorations - all 4 corners */}
        <Holly position="tl" />
        <Holly position="tr" />
        <Holly position="bl" />
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
