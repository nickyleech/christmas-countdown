import React, { useState, useEffect } from 'react';
import { Gift, Star, TreePine } from 'lucide-react';
import FallingSnow from './FallingSnow';
import TimezoneSelector from './TimezoneSelector';
import AudioControls from './AudioControls';

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [selectedTimezone, setSelectedTimezone] = useState('local');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let christmas;
      
      if (selectedTimezone === 'local') {
        const currentYear = now.getFullYear();
        christmas = new Date(currentYear, 11, 25);
        
        if (now > christmas) {
          christmas = new Date(currentYear + 1, 11, 25);
        }
      } else {
        // For specific timezones, create Christmas date in that timezone
        const currentYear = now.getFullYear();
        const christmasUTC = new Date(Date.UTC(currentYear, 11, 25));
        
        if (selectedTimezone === 'UTC') {
          christmas = christmasUTC;
        } else {
          // Convert to specified timezone
          christmas = new Date(christmasUTC.toLocaleString('en-US', { timeZone: selectedTimezone }));
          christmas = new Date(christmas.getFullYear(), christmas.getMonth(), 25);
        }
        
        // Get current time in the selected timezone
        const nowInTimezone = selectedTimezone === 'UTC' 
          ? new Date(now.getTime() + (now.getTimezoneOffset() * 60000))
          : new Date(now.toLocaleString('en-US', { timeZone: selectedTimezone }));
        
        if (nowInTimezone > christmas) {
          if (selectedTimezone === 'UTC') {
            christmas = new Date(Date.UTC(currentYear + 1, 11, 25));
          } else {
            christmas = new Date(christmas.getFullYear() + 1, christmas.getMonth(), 25);
          }
        }
        
        // Calculate difference using timezone-adjusted times
        const difference = christmas - nowInTimezone;
        
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
        return;
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
  }, [selectedTimezone]);

  const isChristmas = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-green-700 flex items-center justify-center p-4 relative">
      <FallingSnow />
      <main 
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center relative z-20"
        role="main"
        aria-label="Christmas countdown application"
      >
        <div className="flex justify-center mb-6" role="img" aria-label="Christmas decorations">
          <div className="flex items-center space-x-4">
            <TreePine className="text-green-600 w-12 h-12" aria-hidden="true" />
            <Star className="text-yellow-400 w-8 h-8" aria-hidden="true" />
            <Gift className="text-red-600 w-10 h-10" aria-hidden="true" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
          {isChristmas ? '🎄 Merry Christmas! 🎄' : 'Christmas Countdown'}
        </h1>
        
        {!isChristmas ? (
          <>
            <p className="text-xl text-gray-600 mb-4">Time until Christmas Day</p>
            <TimezoneSelector 
              selectedTimezone={selectedTimezone}
              onTimezoneChange={setSelectedTimezone}
            />
            
            <AudioControls isChristmas={isChristmas} />
            
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              role="timer"
              aria-live="polite"
              aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until Christmas`}
            >
              <div className="bg-red-50 rounded-xl p-4" tabIndex="0">
                <div className="text-3xl md:text-4xl font-bold text-red-600" aria-label={`${timeLeft.days} days`}>
                  {timeLeft.days}
                </div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4" tabIndex="0">
                <div className="text-3xl md:text-4xl font-bold text-green-600" aria-label={`${timeLeft.hours} hours`}>
                  {timeLeft.hours}
                </div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-4" tabIndex="0">
                <div className="text-3xl md:text-4xl font-bold text-red-600" aria-label={`${timeLeft.minutes} minutes`}>
                  {timeLeft.minutes}
                </div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4" tabIndex="0">
                <div className="text-3xl md:text-4xl font-bold text-green-600" aria-label={`${timeLeft.seconds} seconds`}>
                  {timeLeft.seconds}
                </div>
                <div className="text-sm text-gray-600">Seconds</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <AudioControls isChristmas={isChristmas} />
            <div className="text-6xl mb-8" role="img" aria-label="Christmas celebration emojis">🎅🎁🎄</div>
          </>
        )}
        
        <div className="text-lg text-gray-600" aria-live="polite">
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