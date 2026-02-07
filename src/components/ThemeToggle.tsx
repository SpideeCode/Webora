import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { m } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full border border-black/10 dark:border-white/10 glass-morphism hover:border-black/30 dark:hover:border-white/30 transition-all group flex items-center justify-center dark:bg-white/5 bg-black/5"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors" />
            ) : (
                <Sun className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            )}
        </m.button>
    );
}
