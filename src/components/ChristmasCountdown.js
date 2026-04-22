import React, { useState, useEffect } from 'react';
import { Gift, Star, TreePine, Snowflake } from 'lucide-react';
import FallingSnow from './FallingSnow';
import ParticleSystem from './ParticleSystem';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedNumber = ({ value, theme }) => (
  <span
    key={value}
    className="inline-block font-display font-black tabular-nums animate-slide-up"
  >
    {String(value).padStart(2, '0')}
  </span>
);

const TimeCard = ({ value, label, theme, delay }) => (
  <div
    className={`${theme.numberCardBg} backdrop-blur-sm rounded-2xl p-5 md:p-6
      hover:shadow-xl transition-all duration-300 transform hover:scale-105
      border border-white/20 animate-fade-in-up`}
    style={{ animationDelay: `${delay}s` }}
    tabIndex="0"
  >
    <div
      className={`text-5xl md:text-6xl font-display font-black ${theme.primary} transition-colors duration-500 overflow-hidden`}
      aria-label={`${value} ${label}`}
    >
      <AnimatedNumber value={value} theme={theme} />
    </div>
    <div className={`text-sm font-display font-medium uppercase tracking-widest mt-2 ${theme.text} transition-colors duration-500`}>
      {label}
    </div>
  </div>
);

const ColonSeparator = ({ theme }) => (
  <div className="hidden md:flex items-center justify-center animate-colon-pulse">
    <span className={`text-4xl font-bold ${theme.primary} opacity-60 transition-colors duration-500`}>:</span>
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
  const { theme, isTransitioning } = useTheme();

  useEffect(() => {
    setMounted(true);
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
        className={`${theme.cardBg} ${theme.cardShadow} rounded-3xl p-8 md:p-10 max-w-3xl w-full text-center relative z-20 transition-all duration-500 ${theme.cardBorder} border animate-pulse-glow`}
        style={{ '--glow-color': theme.glow }}
        role="main"
        aria-label="Christmas countdown application"
      >
        {/* Decorative icons */}
        <div
          className={`flex justify-center mb-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
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
          className={`text-4xl md:text-6xl font-christmas font-bold ${theme.primary} mb-2 transition-colors duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          {isChristmas ? 'Merry Christmas!' : 'Christmas Countdown'}
        </h1>

        {!isChristmas ? (
          <>
            <p
              className={`text-lg font-display ${theme.text} mb-2 transition-colors duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}
            >
              The most wonderful time of the year is almost here!
            </p>

            {/* Progress bar */}
            <div
              className={`max-w-xs mx-auto mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex justify-between text-xs mb-1">
                <span className={`${theme.text} font-display transition-colors duration-500`}>Last Christmas</span>
                <span className={`${theme.primary} font-display font-bold transition-colors duration-500`}>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
                <div
                  className="h-full rounded-full animate-progress-fill"
                  style={{
                    '--progress': `${progress}%`,
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${theme.gradientColors[0]}, ${theme.gradientColors[2]})`,
                  }}
                />
              </div>
            </div>

            {/* Countdown grid */}
            <div
              className="flex justify-center items-stretch gap-3 md:gap-4 mb-8 flex-wrap"
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
                <TimeCard value={timeLeft.seconds} label="Seconds" theme={theme} delay={0.75} />
              </div>
            </div>
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

        <div
          className={`text-lg font-display ${theme.text} transition-colors duration-500 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
          aria-live="polite"
        >
          {isChristmas
            ? "Hope your day is filled with joy and wonder!"
            : "Time until Christmas Day"
          }
        </div>
      </main>
    </div>
  );
};

export default ChristmasCountdown;
