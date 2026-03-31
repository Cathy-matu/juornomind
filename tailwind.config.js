/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        teal: {
          50: '#E1F5EE',
          100: '#9FE1CB',
          200: '#5DCAA5',
          400: '#1D9E75',
          600: '#0F6E56',
          800: '#085041',
        },
        green: {
          50: '#EAF3DE',
          100: '#C0DD97',
          600: '#3B6D11',
          800: '#27500A',
        },
        amber: {
          50: '#FAEEDA',
          100: '#FAC775',
          400: '#BA7517',
          600: '#854F0B',
        },
        coral: {
          50: '#FAECE7',
          100: '#F5C4B3',
          400: '#D85A30',
          600: '#993C1D',
        },
        gray: {
          50: '#F1EFE8',
          100: '#D3D1C7',
          400: '#888780',
          600: '#5F5E5A',
        },
      },
    },
  },
  plugins: [],
}