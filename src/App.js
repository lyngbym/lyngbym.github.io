import React, { useState, useEffect, useRef } from 'react';

// A simple SVG icon for a smartphone
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 opacity-80">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
    </svg>
);

// Apple and Android SVG icons
const AppleIcon = () => (
    <svg width="24" height="24" fill="currentColor" className="inline-block mr-2" viewBox="0 0 24 24">
        <path d="M16.365 1.43c0 1.14-.93 2.06-2.07 2.06-.02-1.18.95-2.06 2.07-2.06zm3.93 16.61c-.06-.12-4.19-1.62-4.25-6.42-.03-2.47 1.98-3.65 2.07-3.7-1.13-1.65-2.89-1.88-3.5-1.91-1.5-.15-2.93.88-3.7.88-.77 0-2.01-.86-3.31-.83-1.7.03-3.28.99-4.16 2.51-1.77 3.07-.45 7.62 1.26 10.12.84 1.22 1.84 2.59 3.16 2.54 1.27-.05 1.75-.82 3.29-.82 1.54 0 1.97.82 3.32.8 1.37-.02 2.23-1.24 3.06-2.47.6-.87.84-1.33 1.32-2.34zm-5.13-15.01c.04.04.08.08.12.13-.03.02-.07.04-.12.06-.04-.05-.08-.09-.12-.13.03-.02.07-.04.12-.06z"/>
    </svg>
);

const AndroidIcon = () => (
    <svg width="24" height="24" fill="currentColor" className="inline-block mr-2" viewBox="0 0 24 24">
        <path d="M17.6 9.48l1.43-2.48c.13-.23.05-.52-.18-.65-.23-.13-.52-.05-.65.18l-1.46 2.54c-1.01-.45-2.13-.7-3.34-.7s-2.33.25-3.34.7l-1.46-2.54c-.13-.23-.42-.31-.65-.18-.23.13-.31.42-.18.65l1.43 2.48C4.91 10.36 3 12.97 3 16v2.5c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5V16c0-2.21 1.79-4 4-4s4 1.79 4 4v2.5c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5V16c0-3.03-1.91-5.64-4.4-6.52zM7.5 13c-.83 0-1.5-.67-1.5-1.5S6.67 10 7.5 10s1.5.67 1.5 1.5S8.33 13 7.5 13zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 10 16.5 10s1.5.67 1.5 1.5S17.33 13 16.5 13z"/>
    </svg>
);

// Component for the animated gradient background
const AnimatedGradientBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
);

// High-performance Fireworks component using transform and opacity
const Fireworks = () => {
    // Increased counts for a more noticeable effect
    const numFireworks = 12; // Number of explosions
    const numSparks = 30; // Sparks per explosion
    const colors = ['#FFC700', '#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF'];

    return (
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
            {[...Array(numFireworks)].map((_, i) => {
                const fireworkStyle = {
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animation: `firework-show 2.5s ${i * 0.3}s ease-out infinite`,
                };
                return (
                    <div key={i} className="firework-explosion" style={fireworkStyle}>
                        {[...Array(numSparks)].map((_, j) => {
                            const angle = (j / numSparks) * 360;
                            const sparkStyle = {
                                '--angle': `${angle}deg`,
                                '--color': colors[Math.floor(Math.random() * colors.length)],
                            };
                            return <div key={j} className="spark" style={sparkStyle}></div>;
                        })}
                    </div>
                );
            })}
        </div>
    );
};

// This component manages a single instance of the Fireworks animation for the queue
const FireworkInstance = ({ onComplete }) => {
    useEffect(() => {
        // Each instance lasts for 3 seconds
        const timer = setTimeout(onComplete, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return <Fireworks />;
};


// Keyframes for animations, including the new performant fireworks
const Animations = () => (
    <style>{`
      @keyframes fadeIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
      @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
      .animate-blob { animation: blob 7s infinite; }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }
      @keyframes flip { 0% { transform: rotateX(0deg); } 50% { transform: rotateX(90deg); opacity: 0.5; } 100% { transform: rotateX(0deg); } }
      .animate-flip { animation: flip 0.6s ease-in-out; }
      
      /* New, performant fireworks animation */
      @keyframes firework-explode {
        from {
          transform: rotate(var(--angle)) translateY(0) scale(1);
          opacity: 1;
        }
        to {
          /* Increased travel distance for a bigger explosion */
          transform: rotate(var(--angle)) translateY(150px) scale(0);
          opacity: 0;
        }
      }
      
      @keyframes firework-show {
        0%, 100% { opacity: 0; }
        5%, 95% { opacity: 1; }
      }

      .firework-explosion {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
      }
      
      .spark {
        position: absolute;
        left: 0;
        top: 0;
        width: 4px; /* Slightly larger sparks */
        height: 4px;
        border-radius: 50%;
        background-color: var(--color);
        /* Animate only transform and opacity for performance, increased duration */
        animation: firework-explode 2s ease-out forwards;
      }
    `}</style>
);

// Main App Component
const App = () => {
    // --- CONFIGURATION ---
    const APPLE_DATE_STRING = '2025-09-09T10:00:00-07:00'; // 10am PST
    const ANDROID_DATE_STRING = '2025-08-20T10:00:00-07:00'; // 10am PST

    // Platform state: 'apple' or 'android'
    const [platform, setPlatform] = useState('apple');
    const [theme, setTheme] = useState('light');
    const [targetDate, setTargetDate] = useState(new Date(APPLE_DATE_STRING));
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date(APPLE_DATE_STRING)));
    const [cardStyle, setCardStyle] = useState({});
    
    const [manualFireworks, setManualFireworks] = useState([]);
    const [showAutomaticFireworks, setShowAutomaticFireworks] = useState(false);
    
    const [finalMessage, setFinalMessage] = useState('');
    const [isPostAnimation, setIsPostAnimation] = useState(false);
    const mainRef = useRef(null);

    // Function to calculate time left
    function calculateTimeLeft(target) {
        const difference = +new Date(target) - +new Date();
        return {
            total: difference,
            days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
            hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
            minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
            seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
        };
    }

    // Update targetDate and reset countdown when platform changes
    useEffect(() => {
        const dateStr = platform === 'apple' ? APPLE_DATE_STRING : ANDROID_DATE_STRING;
        const newDate = new Date(dateStr);
        setTargetDate(newDate);
        setTimeLeft(calculateTimeLeft(newDate));
        setFinalMessage('');
        setIsPostAnimation(false);
        setShowAutomaticFireworks(false);
        setManualFireworks([]); // <-- Reset manual fireworks on platform change
    }, [platform]);

    // Effect to load the Inter font from Google Fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        document.body.style.fontFamily = "'Inter', sans-serif";
    }, []);

    // Effect for the parallax card tilt (disabled on touch devices)
    useEffect(() => {
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;
        const handleMouseMove = (e) => {
            if (!mainRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;
            setCardStyle({ transform: `rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(10px)`, transition: 'transform 0.1s ease-out' });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Effect to update countdown every second
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);
        return () => clearTimeout(timer);
    }, [targetDate, timeLeft]);
    
    // Effect to handle expiration logic
    const isFinished = timeLeft.total <= 0;
    useEffect(() => {
        if (isFinished && !finalMessage) { // Run only once when finished
            setShowAutomaticFireworks(true);
            const twoHours = 2 * 60 * 60 * 1000;
            const timeSince = Math.abs(timeLeft.total);
            
            if (timeSince < twoHours) {
                setFinalMessage("Event in progress");
            } else {
                setFinalMessage("The event has expired");
            }

            const fireworksTimer = setTimeout(() => {
                setShowAutomaticFireworks(false);
                setIsPostAnimation(true);
            }, 5000); // Show fireworks for 5 seconds

            return () => clearTimeout(fireworksTimer);
        }
    }, [isFinished, timeLeft.total, finalMessage]);


    // Effect to apply the theme class
    useEffect(() => {
        document.body.className = theme;
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    
    // Adds a new firework instance to the queue
    const triggerManualFireworks = () => {
        setManualFireworks(current => [...current, Date.now()]);
    };

    const TimeUnit = ({ value, label }) => {
        const prevValueRef = useRef();
        const [isFlipping, setIsFlipping] = useState(false);
        useEffect(() => {
            if (prevValueRef.current !== undefined && prevValueRef.current !== value) {
                setIsFlipping(true);
                const timer = setTimeout(() => setIsFlipping(false), 600);
                return () => clearTimeout(timer);
            }
            prevValueRef.current = value;
        }, [value]);
        return (
            <div className="flex flex-col items-center w-1/4">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center" style={{ perspective: '1000px' }}>
                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl sm:rounded-2xl shadow-inner"></div>
                    <span className={`relative text-3xl sm:text-5xl font-black text-gray-800 dark:text-white transition-colors duration-300 ${isFlipping ? 'animate-flip' : ''}`}>
                        {String(value).padStart(2, '0')}
                    </span>
                </div>
                <div className="mt-2 sm:mt-3 text-[10px] sm:text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">{label}</div>
            </div>
        );
    };

    const themeClasses = theme === 'dark' ? 'dark bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800';

    // Platform tab buttons
    const platformTabs = (
        <div className="flex justify-center gap-4 mb-6">
            <button
                className={`flex items-center px-4 py-2 rounded-full font-bold transition-all duration-200 border-2 ${
                    platform === 'apple'
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-lg'
                        : 'bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                }`}
                onClick={() => setPlatform('apple')}
            >
                <AppleIcon />
                Apple
            </button>
            <button
                className={`flex items-center px-4 py-2 rounded-full font-bold transition-all duration-200 border-2 ${
                    platform === 'android'
                        ? 'bg-green-600 text-white border-green-600 shadow-lg'
                        : 'bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                }`}
                onClick={() => setPlatform('android')}
            >
                <AndroidIcon />
                Android
            </button>
        </div>
    );

    // Platform-specific title/subtitle
    const platformTitle = platform === 'apple' ? 'iPhone 17 Launch' : 'Android Pixel 10 Launch';
    const platformSubtitle = platform === 'apple'
        ? 'Countdown to the big announcement'
        : 'Countdown to the Android flagship reveal';

    return (
        <>
            <Animations />
            <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans transition-colors duration-500 ${themeClasses}`}>
                <AnimatedGradientBackground />
                <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
                    <button onClick={triggerManualFireworks} className="p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-110" aria-label="Toggle fireworks">
                        🎆
                    </button>
                    <button onClick={toggleTheme} className="p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-110" aria-label="Toggle theme">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                <main ref={mainRef} style={{ ...cardStyle, transformStyle: 'preserve-3d' }} className="relative w-full max-w-3xl mx-auto p-4 sm:p-8 bg-white/60 dark:bg-black/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 animate-fadeIn">
                    {platformTabs}
                    {showAutomaticFireworks && <Fireworks />}
                    {manualFireworks.map(id => (
                        <FireworkInstance key={id} onComplete={() => {
                            setManualFireworks(current => current.filter(fwId => fwId !== id));
                        }} />
                    ))}
                    <div className="relative z-0">
                        <div className="text-center">
                            <PhoneIcon />
                            <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{platformTitle}</h1>
                            <p className="text-base sm:text-lg opacity-80">{platformSubtitle}</p>
                        </div>

                        {isFinished ? (
                            <div className="text-center my-6 sm:my-10 h-24 sm:h-32 flex items-center justify-center">
                                {isPostAnimation && (
                                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white animate-fadeIn">
                                        {finalMessage}
                                    </h2>
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-around my-6 sm:my-10">
                                <TimeUnit value={timeLeft.days} label="Days" />
                                <TimeUnit value={timeLeft.hours} label="Hours" />
                                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                                <TimeUnit value={timeLeft.seconds} label="Seconds" />
                            </div>
                        )}

                        <div className="text-center opacity-60 text-sm mt-6">
                            <p>{targetDate.toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default App;
