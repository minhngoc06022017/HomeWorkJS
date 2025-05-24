const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d6efd',
        secondary: '#6c757d',
        success: '#198754',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#0dcaf0',
        light: '#f8f9fa',
        dark: '#212529',
      },
    },
  },
  plugins: [
    require("tw-elements/plugin.cjs"),
    
    // Custom button components (btn, btn-primary, etc.)
    plugin(function({ addComponents, theme }) {
      const colors = theme('colors');
      const buttonColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
      const buttons = {
        '.btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          display: 'inline-block',
          textAlign: 'center',
          textDecoration: 'none',
          lineHeight: '1.5',
          transition: 'all 0.2s ease-in-out',
        },
      };

      buttonColors.forEach(color => {
        buttons[`.btn-${color}`] = {
          backgroundColor: colors[color],
          color: ['light', 'warning', 'info'].includes(color) ? 'black' : 'white',
          '&:hover': {
            backgroundColor: getHoverColor(color),
          },
        };
        buttons[`.btn-outline-${color}`] = {
          backgroundColor: 'transparent',
          color: colors[color],
          border: `1px solid ${colors[color]}`,
          '&:hover': {
            backgroundColor: colors[color],
            color: ['light', 'warning', 'info'].includes(color) ? 'black' : 'white',
          },
        };
      });

      addComponents(buttons);

      function getHoverColor(color) {
        const hoverMap = {
          primary: '#0b5ed7',
          secondary: '#5c636a',
          success: '#157347',
          danger: '#bb2d3b',
          warning: '#ffca2c',
          info: '#31d2f2',
          light: '#e2e6ea',
          dark: '#1c1f23',
        };
        return hoverMap[color] || colors[color];
      }
    }),

    // Custom utilities: bg-*, text-*, border-*
    plugin(function({ addUtilities, theme }) {
      const colors = theme('colors');
      const colorKeys = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

      const newUtilities = {};

      colorKeys.forEach(key => {
        newUtilities[`.bg-${key}`] = { backgroundColor: colors[key] };
        newUtilities[`.text-${key}`] = { color: colors[key] };
        newUtilities[`.border-${key}`] = { borderColor: colors[key] };
      });

      addUtilities(newUtilities, ['responsive', 'hover']);
    })
  ],
  darkMode: 'class',
};

