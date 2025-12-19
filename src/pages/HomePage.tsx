import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import '../styles/home.css';

interface LocationImage {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

export function HomePage() {
  const [images, setImages] = useState<LocationImage[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch 1: Get locations
        const locationsData = await apiService.getLocations();
        setLocations(locationsData);

        // Fetch location images for carousel
        const imagesData = await apiService.getLocationImages();
        setImages(imagesData);
      } catch (err) {
        console.error('Error fetching home page data:', err);
        setError('Failed to load data. Please check the API connection.');
        // Set mock data for demo purposes
        setImages([
          {
            id: '1',
            title: 'Secure Zone 1',
            imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
            description: 'Advanced security monitoring system',
          },
          {
            id: '2',
            title: 'Secure Zone 2',
            imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f9?w=800&h=400&fit=crop',
            description: 'Real-time threat detection',
          },
          {
            id: '3',
            title: 'Secure Zone 3',
            imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
            description: 'Comprehensive location protection',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

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

          {/* Carousel - Custom Implementation with Swiper-like functionality */}
          <div className="carousel-container">
            {loading ? (
              <div className="loading">Loading carousel...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : images.length > 0 ? (
              <div className="location-carousel">
                <div className="carousel-wrapper">
                  <div className="carousel-slide">
                    <img src={images[currentSlide].imageUrl} alt={images[currentSlide].title} />
                    <div className="slide-content">
                      <h3>{images[currentSlide].title}</h3>
                      <p>{images[currentSlide].description}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button className="carousel-button carousel-button-prev" onClick={prevSlide}>
                  ❮
                </button>
                <button className="carousel-button carousel-button-next" onClick={nextSlide}>
                  ❯
                </button>

                {/* Pagination Dots */}
                <div className="carousel-pagination">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="grid grid-3">
            <div className="card feature-card">
              <div className="feature-icon">📍</div>
              <h3>Real-Time Location Tracking</h3>
              <p>Monitor multiple locations simultaneously with real-time updates and alerts.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Advanced Security</h3>
              <p>State-of-the-art encryption and security protocols to protect your data.</p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics Dashboard</h3>
              <p>Detailed analytics and insights about security threats and incidents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Overview Section */}
      <section className="locations-section section">
        <div className="container">
          <h2 className="section-title">Protected Locations</h2>
          {locations.length === 0 ? (
            <div className="empty-state">
              <p>No locations available. Check API connection.</p>
            </div>
          ) : (
            <div className="grid grid-2">
              {locations.slice(0, 6).map((location: any) => (
                <div key={location.id} className="card location-card">
                  <h3>{location.name}</h3>
                  <p>{location.description}</p>
                  <div className="location-meta">
                    <span>📍 {location.city}</span>
                    <span>Status: {location.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section section">
        <div className="container text-center">
          <h2>Ready to Secure Your Locations?</h2>
          <p>Join thousands of organizations protecting their assets with GeoGuard.</p>
          <button className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}
