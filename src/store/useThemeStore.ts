import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themeConfig, ThemePreset } from '@/../../config/theme.config';

interface ThemeState {
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
  getColors: () => { h: number; s: number };
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      preset: themeConfig.defaultPreset,
      
      setPreset: (preset: ThemePreset) => {
        set({ preset });
        // Update CSS variables
        if (typeof window !== 'undefined') {
          const colors = themeConfig.presets[preset];
          document.documentElement.style.setProperty('--primary-h', String(colors.h));
          document.documentElement.style.setProperty('--primary-s', `${colors.s}%`);
        }
      },
      
      getColors: () => {
        const { preset } = get();
        return themeConfig.presets[preset];
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
