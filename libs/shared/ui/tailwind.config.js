/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts,tsx,jsx,js}",
      "./src/**/*.stories.{ts,tsx,js,jsx}",
      // Include any apps that use this library
      "../../apps/**/*.{html,ts,tsx,jsx,js}",
    ],
    theme: {
      extend: {
        // Extend Tailwind to work well with Shoelace design tokens
        colors: {
          // Map Tailwind colors to Shoelace CSS custom properties
          primary: {
            50: 'rgb(var(--sl-color-primary-50) / <alpha-value>)',
            100: 'rgb(var(--sl-color-primary-100) / <alpha-value>)',
            200: 'rgb(var(--sl-color-primary-200) / <alpha-value>)',
            300: 'rgb(var(--sl-color-primary-300) / <alpha-value>)',
            400: 'rgb(var(--sl-color-primary-400) / <alpha-value>)',
            500: 'rgb(var(--sl-color-primary-500) / <alpha-value>)',
            600: 'rgb(var(--sl-color-primary-600) / <alpha-value>)',
            700: 'rgb(var(--sl-color-primary-700) / <alpha-value>)',
            800: 'rgb(var(--sl-color-primary-800) / <alpha-value>)',
            900: 'rgb(var(--sl-color-primary-900) / <alpha-value>)',
            950: 'rgb(var(--sl-color-primary-950) / <alpha-value>)',
          },
          success: {
            50: 'rgb(var(--sl-color-success-50) / <alpha-value>)',
            500: 'rgb(var(--sl-color-success-500) / <alpha-value>)',
            600: 'rgb(var(--sl-color-success-600) / <alpha-value>)',
          },
          warning: {
            50: 'rgb(var(--sl-color-warning-50) / <alpha-value>)',
            500: 'rgb(var(--sl-color-warning-500) / <alpha-value>)',
            600: 'rgb(var(--sl-color-warning-600) / <alpha-value>)',
          },
          danger: {
            50: 'rgb(var(--sl-color-danger-50) / <alpha-value>)',
            500: 'rgb(var(--sl-color-danger-500) / <alpha-value>)',
            600: 'rgb(var(--sl-color-danger-600) / <alpha-value>)',
          },
        },
        spacing: {
          // Map Shoelace spacing to Tailwind
          'sl-xs': 'var(--sl-spacing-x-small)',
          'sl-sm': 'var(--sl-spacing-small)',
          'sl-md': 'var(--sl-spacing-medium)',
          'sl-lg': 'var(--sl-spacing-large)',
          'sl-xl': 'var(--sl-spacing-x-large)',
        },
        borderRadius: {
          'sl-sm': 'var(--sl-border-radius-small)',
          'sl-md': 'var(--sl-border-radius-medium)',
          'sl-lg': 'var(--sl-border-radius-large)',
          'sl-pill': 'var(--sl-border-radius-pill)',
        },
      },
    },
    plugins: [
      '@tailwindcss/forms',
    ],
    // Prevent conflicts with Shoelace components
    corePlugins: {
      preflight: false, // Disable Tailwind's CSS reset to avoid conflicts with Shoelace
    },
  };
  