import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { apiService } from '../services/api';
import '../styles/dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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

  // Prepare data for severity distribution pie chart (Chart.js Library #1)
  const severityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [
          incidents.filter((i) => i.severity === 'high').length,
          incidents.filter((i) => i.severity === 'medium').length,
          incidents.filter((i) => i.severity === 'low').length,
        ],
        backgroundColor: ['#e74c3c', '#f39c12', '#27ae60'],
        borderColor: ['#c0392b', '#d68910', '#1e8449'],
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for incident type bar chart (Chart.js Library #2)
  const incidentTypes = Array.from(new Set(incidents.map((i) => i.type)));
  const barData = {
    labels: incidentTypes,
    datasets: [
      {
        label: 'Incident Count',
        data: incidentTypes.map((type) => incidents.filter((i) => i.type === type).length),
        backgroundColor: 'rgba(102, 126, 234, 0.7)',
        borderColor: '#667eea',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

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

      {/* Statistics Cards */}
      {loading ? (
        <div className="loading">Loading dashboard data...</div>
      ) : error ? (
        <section className="section">
          <div className="container">
            <div className="error-message">{error}</div>
          </div>
        </section>
      ) : stats ? (
        <section className="stats-section section">
          <div className="container">
            <div className="grid grid-2">
              <div className="card stat-card stat-card-primary">
                <div className="stat-value">{stats.protectedLocations}</div>
                <div className="stat-label">Protected Locations</div>
                <div className="stat-icon">📍</div>
              </div>
              <div className="card stat-card stat-card-warning">
                <div className="stat-value">{stats.activeThreats}</div>
                <div className="stat-label">Active Threats</div>
                <div className="stat-icon">⚠️</div>
              </div>
              <div className="card stat-card stat-card-danger">
                <div className="stat-value">{stats.totalIncidents}</div>
                <div className="stat-label">Total Incidents</div>
                <div className="stat-icon">🚨</div>
              </div>
              <div className="card stat-card stat-card-success">
                <div className="stat-value">{stats.resolutionRate}%</div>
                <div className="stat-label">Resolution Rate</div>
                <div className="stat-icon">✅</div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Charts Section */}
      {!loading && incidents.length > 0 && (
        <section className="charts-section section">
          <div className="container">
            <h2 className="section-title">Security Analytics</h2>
            <div className="grid grid-2">
              {/* Severity Distribution Chart */}
              <div className="card chart-card">
                <h3>Incident Severity Distribution</h3>
                <div className="chart-container">
                  <Pie data={severityData} options={chartOptions} />
                </div>
              </div>

              {/* Incident Type Chart */}
              <div className="card chart-card">
                <h3>Incident Types</h3>
                <div className="chart-container">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Incidents Table */}
      {!loading && incidents.length > 0 && (
        <section className="incidents-section section">
          <div className="container">
            <h2 className="section-title">Recent Incidents</h2>
            <div className="table-responsive">
              <table className="incidents-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Severity</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((incident) => (
                    <tr key={incident.id} className={`severity-${incident.severity}`}>
                      <td>{incident.type}</td>
                      <td>{incident.location}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            incident.severity === 'high'
                              ? 'danger'
                              : incident.severity === 'medium'
                                ? 'warning'
                                : 'success'
                          }`}
                        >
                          {incident.severity.toUpperCase()}
                        </span>
                      </td>
                      <td>{incident.timestamp}</td>
                      <td>
                        <span className={`status status-${incident.status}`}>
                          {incident.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

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
