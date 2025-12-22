import '../styles/about.css';

export function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero section">
        <div className="container">
          <h1>About GeoGuard</h1>
          <p className="lead">
            
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>About GeoGuard</h2>
              <p>
                GeoGuard is an end-to-end geolocation security platform that enriches IPs and
                URLs using the IPStack API and presents human-friendly summaries (flags,
                coordinates, region metadata, connection and routing info) through a
                React+Vite frontend and a Python backend; the frontend is deployed on Vercel,
                server-side components run serverlessly or on dedicated hosts, and the stack
                includes caching, rate-limiting, and observability features for production use.
              </p>
            </div>
            <div className="mission-features">
              <div className="feature-item bubble">IPStack</div>
              <div className="feature-item bubble">Vercel</div>
              <div className="feature-item bubble">React+Vite</div>
              <div className="feature-item bubble">Python API</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section removed per request */}

      {/* Leadership Team section removed per request */}

      {/* Technology Stack Section */}
      <section className="tech-section section">
        <div className="container">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-content">
            <div className="tech-item">
              <h3>Frontend</h3>
              <p>
                React + TypeScript with Vite for fast development and production builds.
                The client calls backend REST endpoints to perform IP/URL lookups and renders
                visualizations (maps, charts with Chart.js, carousels with Swiper) and
                responsive UI elements.
              </p>
            </div>
            <div className="tech-item">
              <h3>Backend</h3>
              <p>
                Python-based REST API that integrates with the IPStack service to enrich
                addresses, normalizes responses (flags, coordinates, region metadata),
                and provides caching, rate-limiting and input validation. Backend endpoints
                return a concise JSON shape consumed by the frontend.
              </p>
            </div>
            <div className="tech-item">
              <h3>Infrastructure</h3>
              <p>
                Frontend is deployed on Vercel (builds, previews, CDN distribution); server
                components can run serverlessly on Vercel Functions or on dedicated hosts.
                Environment variables store API keys and CI pipelines enable automated
                testing and deployments.
              </p>
            </div>
            <div className="tech-item">
              <h3>Security & Observability</h3>
              <p>
                TLS/HTTPS, API key management, request validation and rate limiting are
                applied. Logging, error monitoring and metrics (Sentry/Prometheus-style
                tooling) support observability and production troubleshooting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section removed per request */}
    </div>
  );
}
