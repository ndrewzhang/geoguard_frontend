import { useState, useEffect } from 'react';
// chart components removed per request
import { apiService } from '../services/api';
import '../styles/dashboard.css';


interface Statistics {
  totalIncidents: number;
  activeThreats: number;
  protectedLocations: number;
  resolutionRate: number;
}

interface IncidentData {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  location: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

export function DashboardPage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [urlResult, setUrlResult] = useState<any>(null);
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch 2: Get location statistics
        const statsData = await apiService.getLocationStats();
        setStats(statsData);

        // Fetch 3: Get security incidents
        const incidentsData = await apiService.getSecurityIncidents();
        setIncidents(incidentsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Using mock data.');
        // Use mock data for demo
        setStats({
          totalIncidents: 245,
          activeThreats: 12,
          protectedLocations: 89,
          resolutionRate: 94.5,
        });
        setIncidents([
          {
            id: '1',
            type: 'Intrusion Attempt',
            severity: 'high',
            location: 'North Building',
            timestamp: '2024-01-15 14:30',
            status: 'active',
          },
          {
            id: '2',
            type: 'Unauthorized Access',
            severity: 'medium',
            location: 'East Wing',
            timestamp: '2024-01-15 12:15',
            status: 'resolved',
          },
          {
            id: '3',
            type: 'Motion Detection',
            severity: 'low',
            location: 'South Gate',
            timestamp: '2024-01-15 10:45',
            status: 'resolved',
          },
          {
            id: '4',
            type: 'Perimeter Breach',
            severity: 'high',
            location: 'West Fence',
            timestamp: '2024-01-15 09:20',
            status: 'resolved',
          },
          {
            id: '5',
            type: 'Sensor Malfunction',
            severity: 'medium',
            location: 'Main Gate',
            timestamp: '2024-01-15 08:00',
            status: 'resolved',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle URL input submission
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    try {
      setUrlLoading(true);
      setUrlError(null);
      const result = await apiService.getUrlInfo(urlInput);
      setUrlResult(result);
    } catch (err: any) {
      console.error('Error fetching URL info:', err);
      setUrlError(err.message || 'Failed to fetch URL information');
      setUrlResult(null);
    } finally {
      setUrlLoading(false);
    }
  };

  // Charts removed per request

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <section className="dashboard-header section">
        <div className="container">
          <h1>Security Dashboard</h1>
          <p>Real-time monitoring and analytics of your locations</p>
        </div>
      </section>

      {/* URL Info Section */}
      <section className="url-search-section section">
        <div className="container">
          <h2 className="section-title">URL Information Lookup</h2>
          <form onSubmit={handleUrlSubmit} className="url-form">
            <div className="form-group">
              <label htmlFor="url-input">Enter URL:</label>
              <div className="url-input-group">
                <input
                  id="url-input"
                  type="text"
                  placeholder="e.g., amazon.com or https://example.com"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="url-input"
                />
                <button type="submit" className="btn btn-primary" disabled={urlLoading}>
                  {urlLoading ? 'Loading...' : 'Go'}
                </button>
              </div>
              {urlError && <p className="error-message">{urlError}</p>}
            </div>
          </form>

          {/* URL Result Display */}
          {urlResult && (
            <div className="url-result-card card">
              <h3>Results for: {urlInput}</h3>
              <div className="result-content">
                {typeof urlResult === 'object' ? (
                  <pre className="result-json">{JSON.stringify(urlResult, null, 2)}</pre>
                ) : (
                  <p>{urlResult}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Cards removed per request */}

      {/* Charts Section removed per request */}

      {/* Incidents Table removed per request */}

      {/* Empty State */}
      {!loading && incidents.length === 0 && (
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <p>No incident data available. Check API connection.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
