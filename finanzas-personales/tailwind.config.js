/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        honeytheme: {
          "primary": "#f59e0b", // tono miel (amarillo-dorado)
          "secondary": "#fbbf24",
          "accent": "#fcd34d",
          "neutral": "#2b2b2b",
          "base-100": "#ffffff",
          "info": "#3b82f6",
          "success": "#10b981",
          "warning": "#facc15",
          "error": "#ef4444",
        },
      },
      "dark", "light"
    ],
  },
};