# JournoMind Connect Frontend

A React + Vite web application providing psychosocial support for journalists across East Africa.

## Features

- 🧠 Mental health assessments and check-ins
- 💬 Anonymous chat with trauma specialists
- 📚 Resource library with coping techniques
- 🚨 Crisis support hotlines and immediate interventions
- 🎨 Responsive mobile-first design
- ♿ Accessible UI with ARIA labels and semantic HTML

## Prerequisites

- Node.js 18.0+ and npm 9.0+

## Setup

### 1. Install dependencies:
```bash
npm install
```

### 2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and set your backend API URL (default: http://localhost:8000)
```

### 3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ErrorBoundary.jsx
│   ├── NavItem.jsx
│   └── Toast.jsx
├── screens/            # Page components
│   ├── Home.jsx
│   ├── Chat.jsx
│   ├── Assessment.jsx
│   ├── Experts.jsx
│   ├── Resources.jsx
│   ├── Crisis.jsx
│   ├── Splash.jsx
│   └── Onboarding.jsx
├── App.jsx            # Main app component with routing
└── main.jsx           # Entry point
```

## Key Technologies

- **React 19** - UI framework
- **Vite 8** - Build tool with fast HMR
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

## Environment Variables

Required variables in `.env`:
- `VITE_API_URL` - Backend API base URL (default: http://localhost:8000)

## Code Quality

Run linter:
```bash
npm run lint
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security Notes

- Never commit `.env` files with real credentials
- Use `.env.example` as a safe template
- Always validate API responses before displaying to users
- The app uses HTTPS in production (enforce with HSTS headers)
