import React, { useState, useEffect } from 'react';
import { Gift, Star, TreePine } from 'lucide-react';
import FallingSnow from './FallingSnow';
import ParticleSystem from './ParticleSystem';
import { useTheme } from '../contexts/ThemeContext';

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const { theme, isTransitioning } = useTheme();

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

  return (
    <div className={`min-h-screen ${theme.background} flex items-center justify-center p-4 relative transition-all duration-500 ${isTransitioning ? 'opacity-75' : 'opacity-100'}`}>
      <FallingSnow />
      <ParticleSystem />
      <main 
        className={`${theme.cardBg} ${theme.cardShadow} rounded-3xl p-8 max-w-2xl w-full text-center relative z-20 transition-all duration-500 ${theme.cardBorder} border`}
        role="main"
        aria-label="Christmas countdown application"
      >
        <div className="flex justify-center mb-6" role="img" aria-label="Christmas decorations">
          <div className={`flex items-center space-x-4 ${theme.animation}`}>
            <TreePine className={`${theme.secondary} w-12 h-12 transition-colors duration-500`} aria-hidden="true" />
            <Star className={`${theme.accent} w-8 h-8 transition-colors duration-500`} aria-hidden="true" />
            <Gift className={`${theme.primary} w-10 h-10 transition-colors duration-500`} aria-hidden="true" />
          </div>
        </div>
        
        <h1 className={`text-4xl md:text-6xl font-bold ${theme.primary} mb-4 transition-colors duration-500`}>
          {isChristmas ? '🎄 Merry Christmas! 🎄' : 'Christmas Countdown'}
        </h1>
        
        {!isChristmas ? (
          <>
            <p className={`text-xl ${theme.text} mb-4 transition-colors duration-500`}>Time until Christmas Day</p>
            
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              role="timer"
              aria-live="polite"
              aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until Christmas`}
            >
              <div className={`bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${theme.cardBorder} border`} tabIndex="0">
                <div className={`text-3xl md:text-4xl font-bold ${theme.primary} transition-colors duration-500`} aria-label={`${timeLeft.days} days`}>
                  {timeLeft.days}
                </div>
                <div className={`text-sm ${theme.text} transition-colors duration-500`}>Days</div>
              </div>
              
              <div className={`bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${theme.cardBorder} border`} tabIndex="0">
                <div className={`text-3xl md:text-4xl font-bold ${theme.secondary} transition-colors duration-500`} aria-label={`${timeLeft.hours} hours`}>
                  {timeLeft.hours}
                </div>
                <div className={`text-sm ${theme.text} transition-colors duration-500`}>Hours</div>
              </div>
              
              <div className={`bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${theme.cardBorder} border`} tabIndex="0">
                <div className={`text-3xl md:text-4xl font-bold ${theme.primary} transition-colors duration-500`} aria-label={`${timeLeft.minutes} minutes`}>
                  {timeLeft.minutes}
                </div>
                <div className={`text-sm ${theme.text} transition-colors duration-500`}>Minutes</div>
              </div>
              
              <div className={`bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${theme.cardBorder} border`} tabIndex="0">
                <div className={`text-3xl md:text-4xl font-bold ${theme.secondary} transition-colors duration-500`} aria-label={`${timeLeft.seconds} seconds`}>
                  {timeLeft.seconds}
                </div>
                <div className={`text-sm ${theme.text} transition-colors duration-500`}>Seconds</div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-6xl mb-8" role="img" aria-label="Christmas celebration emojis">🎅🎁🎄</div>
        )}
        
        <div className={`text-lg ${theme.text} transition-colors duration-500`} aria-live="polite">
          {isChristmas 
            ? "Hope your day is filled with joy and wonder!"
            : "The most wonderful time of the year is almost here!"
          }
        </div>
      </main>
    </div>
  );
};

export default ChristmasCountdown;