import '../styles/home.css';

export function HomePage() {

  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to GeoGuard</h1>
            <p className="hero-subtitle">
              Real-time geolocation security and monitoring system
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
              <h3>Real-Time Location Tracking</h3>
              <p>Monitor multiple locations simultaneously with real-time updates and alerts.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Detailed analytics and insights about security threats and incidents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Overview Section removed per request */}

      {/* Call to Action Section removed per request */}
    </div>
  );
}
