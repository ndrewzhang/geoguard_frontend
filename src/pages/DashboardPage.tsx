import { useState } from 'react';
import { apiService } from '../services/api';
import '../styles/dashboard.css';

export function DashboardPage() {
  const [urlInput, setUrlInput] = useState('');
  const [urlResult, setUrlResult] = useState<any>(null);
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

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

  return (
    <div className="dashboard-page">
      <section className="dashboard-header section">
        <div className="container">
          <h1>Security Dashboard</h1>
          <p>Real-time monitoring and analytics of your locations</p>
        </div>
      </section>

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
    </div>
  );
}
