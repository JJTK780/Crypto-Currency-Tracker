import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>('system');
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

    // Get system preference
    const getSystemTheme = (): ResolvedTheme => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    };

    // Calculate resolved theme based on current theme setting
    const calculateResolvedTheme = (currentTheme: ThemeMode): ResolvedTheme => {
        if (currentTheme === 'system') {
            return getSystemTheme();
        }
        return currentTheme;
    };

    // Load theme preference from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference') as ThemeMode;
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            setThemeState(savedTheme);
            setResolvedTheme(calculateResolvedTheme(savedTheme));
        } else {
            // Check old darkMode setting for migration
            const oldDarkMode = localStorage.getItem('darkMode');
            if (oldDarkMode === 'true') {
                setThemeState('dark');
                setResolvedTheme('dark');
                localStorage.setItem('themePreference', 'dark');
                localStorage.removeItem('darkMode');
            } else if (oldDarkMode === 'false') {
                setThemeState('light');
                setResolvedTheme('light');
                localStorage.setItem('themePreference', 'light');
                localStorage.removeItem('darkMode');
            } else {
                setResolvedTheme(getSystemTheme());
            }
        }
    }, []);

    // Listen for system theme changes when in system mode
    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setResolvedTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Apply theme class to document
    useEffect(() => {
        const root = document.documentElement;
        if (resolvedTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [resolvedTheme]);

    const setTheme = (newTheme: ThemeMode) => {
        setThemeState(newTheme);
        setResolvedTheme(calculateResolvedTheme(newTheme));
        localStorage.setItem('themePreference', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
