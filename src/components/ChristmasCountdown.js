import React, { useState, useEffect } from 'react';
import { Gift, Star, TreePine } from 'lucide-react';

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-green-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <TreePine className="text-green-600 w-12 h-12" />
            <Star className="text-yellow-400 w-8 h-8" />
            <Gift className="text-red-600 w-10 h-10" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
          {isChristmas ? '🎄 Merry Christmas! 🎄' : 'Christmas Countdown'}
        </h1>
        
        {!isChristmas ? (
          <>
            <p className="text-xl text-gray-600 mb-8">Time until Christmas Day</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold text-red-600">
                  {timeLeft.days}
                </div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {timeLeft.hours}
                </div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold text-red-600">
                  {timeLeft.minutes}
                </div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold text-green-600">
                  {timeLeft.seconds}
                </div>
                <div className="text-sm text-gray-600">Seconds</div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-6xl mb-8">🎅🎁🎄</div>
        )}
        
        <div className="text-lg text-gray-600">
          {isChristmas 
            ? "Hope your day is filled with joy and wonder!"
            : "The most wonderful time of the year is almost here!"
          }
        </div>
      </div>
    </div>
  );
};

export default ChristmasCountdown;