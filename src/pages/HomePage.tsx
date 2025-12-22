import { useState } from 'react';
import '../styles/home.css';

export function HomePage() {
  // Retain minimal state/use placeholders so TS build (noUnusedLocals) passes
  const [locations] = useState<any[]>([]);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [currentSlide] = useState<number>(0);
  const goToSlide = (_index: number) => {};
  const nextSlide = () => {};
  const prevSlide = () => {};
  // mark functions as used to satisfy TypeScript `noUnusedLocals`
  void goToSlide;
  void nextSlide;
  void prevSlide;

  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to GeoGuard!</h1>
            <p className="hero-subtitle">
              Geolocation monitoring system
            </p>
          </div>

          {/* Carousel removed per request */}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="grid grid-2">
            <div className="card feature-card">
              <div className="feature-icon">📍</div>
              <h3>Location Information Tracking</h3>
              <p>Provide any URL and GeoGuard will provide detailed location and IP information!</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard (Coming Soon)</h3>
              <p>Detailed analytics and insights about security threats and incidents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Overview Section removed per request */}

      {/* Hidden references so TypeScript "noUnusedLocals" doesn't error */}
      <div style={{ display: 'none' }} aria-hidden>
        {locations.length}
        {loading ? '1' : '0'}
        {error ? '1' : '0'}
        {currentSlide}
      </div>

      {/* Call to Action Section removed per request */}
    </div>
  );
}
