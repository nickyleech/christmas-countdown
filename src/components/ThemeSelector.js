import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Palette, Check } from 'lucide-react';

const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId) => {
    changeTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white/95 text-gray-700 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
        aria-label="Open theme selector"
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Themes</span>
      </button>

      {/* Theme Selector Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Theme Grid */}
          <div className="absolute top-12 right-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6 min-w-80 max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Choose Your Theme
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.values(themes).map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`
                    relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105
                    ${currentTheme === theme.id 
                      ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/25' 
                      : 'hover:shadow-lg'
                    }
                  `}
                >
                  {/* Theme Preview */}
                  <div className={`
                    h-20 ${theme.background} relative overflow-hidden
                  `}>
                    {/* Mini snow effect */}
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/60 rounded-full animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Mini countdown preview */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`
                        ${theme.cardBg} rounded-lg px-2 py-1 text-xs font-bold ${theme.primary}
                        shadow-sm
                      `}>
                        25
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {currentTheme === theme.id && (
                      <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div className="p-3 bg-white">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {theme.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {theme.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;