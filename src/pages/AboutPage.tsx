import '../styles/about.css';

export function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero section">
        <div className="container">
          <h1>About GeoGuard</h1>
          <p className="lead">
            Leading provider of geolocation-based security and monitoring solutions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At GeoGuard, we're committed to providing cutting-edge security solutions that help
                organizations protect their physical and digital assets. Our mission is to deliver
                real-time location intelligence and threat detection that empowers businesses to
                operate safely and securely.
              </p>
              <p>
                We believe that security should be accessible, intuitive, and effective. That's why
                we've built GeoGuard with the latest technologies and best practices in mind.
              </p>
            </div>
            <div className="mission-features">
              <div className="feature-item">
                <span className="feature-number">1000+</span>
                <span className="feature-label">Protected Locations</span>
              </div>
              <div className="feature-item">
                <span className="feature-number">50+</span>
                <span className="feature-label">Enterprise Clients</span>
              </div>
              <div className="feature-item">
                <span className="feature-number">99.9%</span>
                <span className="feature-label">Uptime</span>
              </div>
              <div className="feature-item">
                <span className="feature-number">24/7</span>
                <span className="feature-label">Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid grid-3">
            <div className="card value-card">
              <div className="value-icon">🔒</div>
              <h3>Security First</h3>
              <p>
                We prioritize security in every aspect of our operations, from data encryption
                to access controls.
              </p>
            </div>
            <div className="card value-card">
              <div className="value-icon">👥</div>
              <h3>Customer Focused</h3>
              <p>
                Your success is our success. We listen to your needs and continuously improve
                our solutions.
              </p>
            </div>
            <div className="card value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>
                We're constantly exploring new technologies to stay ahead of emerging threats
                and challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team section removed per request */}

      {/* Technology Stack Section */}
      <section className="tech-section section">
        <div className="container">
          <h2 className="section-title">Our Technology</h2>
          <div className="tech-content">
            <div className="tech-item">
              <h3>Frontend</h3>
              <p>React with TypeScript, Vite, Swiper for carousels, Chart.js for analytics</p>
            </div>
            <div className="tech-item">
              <h3>Backend</h3>
              <p>RESTful API with real-time data processing and advanced analytics</p>
            </div>
            <div className="tech-item">
              <h3>Infrastructure</h3>
              <p>Cloud-based architecture with 99.9% uptime guarantee and global CDN</p>
            </div>
            <div className="tech-item">
              <h3>Security</h3>
              <p>Military-grade encryption, regular security audits, and compliance certifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section removed per request */}
    </div>
  );
}
