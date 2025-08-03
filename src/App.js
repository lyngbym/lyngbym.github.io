import React, { useState, useEffect, useRef } from 'react';

// A simple SVG icon for a smartphone
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 opacity-80">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
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

// Keyframes for animations, keeping the component self-contained
const Animations = () => (
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
      }
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }
      @keyframes flip {
        0% { transform: rotateX(0deg); }
        50% { transform: rotateX(90deg); opacity: 0.5; }
        100% { transform: rotateX(0deg); }
      }
      .animate-flip {
        animation: flip 0.6s ease-in-out;
      }
    `}</style>
);

// Main App Component
const App = () => {
    const [theme, setTheme] = useState('light');
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [cardStyle, setCardStyle] = useState({});
    const mainRef = useRef(null);

    // Effect to load the Inter font from Google Fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        document.body.style.fontFamily = "'Inter', sans-serif";
    }, []);

    // Effect for the parallax card tilt
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!mainRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;
            setCardStyle({
                transform: `rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(10px)`,
                transition: 'transform 0.1s ease-out'
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Effect to update countdown every second
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    // Effect to apply the theme class to the body
    useEffect(() => {
        document.body.className = theme;
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    function calculateTimeLeft() {
        const difference = +new Date('2025-09-09T12:00:00-07:00') - +new Date();
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

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
            <div className="flex flex-col items-center mx-2 sm:mx-3">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center" style={{ perspective: '1000px' }}>
                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-2xl shadow-inner"></div>
                    <span className={`relative text-4xl sm:text-6xl font-black text-gray-800 dark:text-white transition-colors duration-300 ${isFlipping ? 'animate-flip' : ''}`}>
                        {String(value).padStart(2, '0')}
                    </span>
                </div>
                <div className="mt-4 text-sm sm:text-base font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">{label}</div>
            </div>
        );
    };

    const themeClasses = theme === 'dark' ? 'dark bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800';

    return (
        <>
            <Animations />
            <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans transition-colors duration-500 ${themeClasses}`}>
                <AnimatedGradientBackground />
                <div className="absolute top-5 right-5 z-10">
                    <button onClick={toggleTheme} className="p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-110" aria-label="Toggle theme">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                <main ref={mainRef} style={{ ...cardStyle, transformStyle: 'preserve-3d' }} className="w-full max-w-3xl mx-auto p-6 sm:p-10 bg-white/60 dark:bg-black/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 animate-fadeIn">
                    <div className="text-center">
                        <PhoneIcon />
                        <h1 className="text-3xl sm:text-5xl font-bold mb-2">iPhone 17 Launch</h1>
                        <p className="text-lg sm:text-xl opacity-80">Countdown to the big announcement</p>
                    </div>

                    <div className="flex justify-center my-8 sm:my-12">
                        <TimeUnit value={timeLeft.days || 0} label="Days" />
                        <TimeUnit value={timeLeft.hours || 0} label="Hours" />
                        <TimeUnit value={timeLeft.minutes || 0} label="Minutes" />
                        <TimeUnit value={timeLeft.seconds || 0} label="Seconds" />
                    </div>

                    <div className="text-center opacity-60">
                        <p>September 9th, 2025 at 12:00 PM PST</p>
                    </div>
                </main>
            </div>
        </>
    );
};

export default App;
