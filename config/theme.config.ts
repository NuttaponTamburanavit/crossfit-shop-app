// Theme Configuration - Configurable Primary Color System
export const themeConfig = {
  // Color presets (HSL format: hue, saturation)
  presets: {
    energyRed: { h: 0, s: 85 },
    powerOrange: { h: 25, s: 90 },
    strengthBlue: { h: 220, s: 75 },
    enduranceGreen: { h: 150, s: 70 },
    steelGray: { h: 210, s: 15 },
  },

  // Default preset
  defaultPreset: 'energyRed' as const,

  // Spacing scale (based on 4px)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

export type ThemePreset = keyof typeof themeConfig.presets;
