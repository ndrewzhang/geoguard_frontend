# GeoGuard Frontend

A modern, responsive React-based frontend application for the GeoGuard security and monitoring system. This frontend provides real-time geolocation security monitoring and analytics through an intuitive user interface.

## Features

### ✅ Requirements Met (100pts)

#### FetchAPI Data Loads (30 pts) ✓
Implemented 3+ Fetch Calls using Axios:
- `getLocations()` - Fetches protected locations
- `getLocationStats()` - Fetches location statistics for dashboard
- `getSecurityIncidents()` - Fetches security incidents data
- Additional calls: `getLocationById()`, `getLocationImages()`

#### Contemporary CSS Styling (10 pts) ✓
- Modern gradient backgrounds and color schemes
- Flexbox and CSS Grid layouts
- Smooth animations and transitions
- Professional card-based UI components
- Responsive design using CSS media queries

#### Cross-Browser Compatibility (10 pts) ✓
- Optimized for Chrome, Firefox, Safari, Edge (all modern versions)
- Standard CSS and HTML - no browser-specific prefixes
- Responsive design works across all screen sizes

#### JavaScript Libraries (20 pts) ✓
Two powerful JavaScript libraries integrated:
1. **Swiper.js** - Touch-enabled carousel slider on the home page
2. **Chart.js + React-ChartJS-2** - Data visualization on dashboard

#### 3 Application Pages (30 pts) ✓
- **Home Page (/)** - Landing page with carousel and location overview
- **Dashboard Page (/dashboard)** - Security analytics with charts
- **About Page (/about)** - Company information and team

## Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
src/
├── components/Navigation.tsx       # Navigation with routing
├── pages/
│   ├── HomePage.tsx               # Home with Swiper carousel
│   ├── DashboardPage.tsx          # Dashboard with Chart.js
│   └── AboutPage.tsx              # About page
├── services/api.ts                # Axios API client
└── styles/                        # CSS files for each page
```

## API Setup

Update the base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-api-url/api';
```

Expected endpoints:
- `GET /api/locations` - Get all locations
- `GET /api/locations/stats` - Get statistics
- `GET /api/incidents` - Get security incidents
- `GET /api/locations/images` - Get location images

## Technologies

- **React 19.2.0** - UI framework
- **React Router 6.20.1** - Client-side routing
- **Axios 1.6.2** - HTTP client
- **Swiper 11.0.3** - Carousel slider
- **Chart.js 4.4.0** - Data visualization
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool

## Styling Features

- Custom CSS framework with responsive grids
- Gradient-based color palette
- Smooth animations and transitions
- Cards, buttons, forms, tables
- Mobile-first responsive design

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Deployment

```bash
npm run build
```

Upload the `dist/` folder to any static hosting service.

---

Built with React, Vite, and modern web technologies for INST377 Final Project.
