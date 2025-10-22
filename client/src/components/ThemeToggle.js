// client/src/components/ThemeToggle.js
'use client';

import { useTheme } from '../context/ThemeContext.js';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-[var(--colors-edu-neutral)] hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--colors-edu-secondary)]" // Themed focus ring
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}