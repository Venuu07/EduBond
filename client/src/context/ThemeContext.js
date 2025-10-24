// client/src/context/ThemeContext.js
'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Default to 'light', check localStorage, then system preference
    const [theme, setTheme] = useState('light');

    // Effect to read saved theme from localStorage or system pref on load
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
       console.log('ThemeContext: Initial theme set to:', initialTheme); // Log initial theme
        setTheme(initialTheme);
    }, []);

    // Effect to apply theme class to <html> and save to localStorage
    useEffect(() => {
        console.log('ThemeContext: Applying theme:', theme);
        const root = window.document.documentElement; // Get the <html> element
        if (theme === 'dark') {
            console.log('ThemeContext: Adding dark class to HTML');
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme); // Save preference
    }, [theme]);

const toggleTheme = () => {
    setTheme((prevTheme) => { // Use functional update
        const newTheme = prevTheme === 'light' ? 'dark' : 'light';
        console.log('ThemeContext: Toggling theme from', prevTheme, 'to', newTheme);
        return newTheme;
    });
};
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use the theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};