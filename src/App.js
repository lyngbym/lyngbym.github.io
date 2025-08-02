import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
    // State for theme (light/dark)
    const [theme, setTheme] = useState('light');
    // State for time remaining
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Effect to update countdown every second
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    // Effect to apply the theme class to the body
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    }, [theme]);

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Function to calculate time left until the target date
    function calculateTimeLeft() {
        const difference = +new Date('2025-09-09T12:00:00-07:00') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    }

    // Component to render each time unit
    const TimeUnit = ({ value, label }) => (
        <div className="flex flex-col items-center mx-2 sm:mx-4">
            <div className={`text-4xl sm:text-6xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{value}</div>
            <div className={`text-sm sm:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
        </div>
    );

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme === 'dark' ? 'bg-gray-800 text-yellow-300 focus:ring-yellow-400' : 'bg-gray-200 text-gray-800 focus:ring-gray-500'}`}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>

            <div className="text-center">
                <h1 className={`text-3xl sm:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>iPhone 17 Launch</h1>
                <p className={`text-lg sm:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Countdown to the big announcement</p>
            </div>

            <div className="flex justify-center my-8">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>

            <div className={`text-center mt-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                <p>September 9th, 2025 at 12:00 PM PST</p>
            </div>
        </div>
    );
};

export default App;
