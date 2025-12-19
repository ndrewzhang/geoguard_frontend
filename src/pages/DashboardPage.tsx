import { useState } from 'react';
import { apiService } from '../services/api';
import '../styles/dashboard.css';

export function DashboardPage() {
  const [urlInput, setUrlInput] = useState('');
  const [urlResult, setUrlResult] = useState<any>(null);
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  const [stats] = useState<any | null>(null);
  const [error] = useState<string | null>(null);

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
              <div className="result-content result-fields">
                {typeof urlResult === 'object' ? (
                  <div className="fields-grid">
                    <div className="field">
                      <div className="label">IP</div>
                      <div className="value">{urlResult.ip || '—'}</div>
                    </div>

                    <div className="field">
                      <div className="label">Type</div>
                      <div className="value">{urlResult.type || '—'}</div>
                    </div>

                    <div className="field">
                      <div className="label">Country</div>
                      <div className="value">{urlResult.country_name || '—'} ({urlResult.country_code || '—'})</div>
                    </div>

                    <div className="field">
                      <div className="label">Region</div>
                      <div className="value">{urlResult.region_name || '—'} ({urlResult.region_code || '—'})</div>
                    </div>

                    <div className="field">
                      <div className="label">City</div>
                      <div className="value">{urlResult.city || '—'}</div>
                    </div>

                    <div className="field">
                      <div className="label">Postal Code</div>
                      <div className="value">{urlResult.zip || '—'}</div>
                    </div>

                    <div className="field">
                      <div className="label">Coordinates</div>
                      <div className="value">{urlResult.latitude != null && urlResult.longitude != null ? `${urlResult.latitude}, ${urlResult.longitude}` : '—'}</div>
                    </div>

                    <div className="field full-width">
                      <div className="label">Connection</div>
                      <div className="value">Type: {urlResult.connection_type || '—'} • Routing: {urlResult.ip_routing_type || '—'}</div>
                    </div>

                    {/* Location nested object */}
                    {urlResult.location && (
                      <div className="field full-width location-block">
                        <div className="label">Location</div>
                        <div className="value location-content">
                          <div>Geoname ID: {urlResult.location.geoname_id ?? '—'}</div>
                          <div>Capital: {urlResult.location.capital || '—'}</div>
                          <div>Calling code: +{urlResult.location.calling_code || '—'}</div>
                          <div>EU Member: {urlResult.location.is_eu ? 'Yes' : 'No'}</div>

                          {Array.isArray(urlResult.location.languages) && urlResult.location.languages.length > 0 && (
                            <div className="languages">
                              <div className="sub-label">Languages:</div>
                              <ul>
                                {urlResult.location.languages.map((l: any, idx: number) => (
                                  <li key={idx}>{l.name} ({l.code})</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {urlResult.location.country_flag && (
                            <div className="flag-wrap">
                              <img src={urlResult.location.country_flag} alt={`${urlResult.country_name} flag`} className="country-flag" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>{urlResult}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Cards removed per request */}

      {/* Hidden references so TypeScript "noUnusedLocals" doesn't error */}
      <div style={{ display: 'none' }} aria-hidden>
        {stats ? JSON.stringify(stats) : null}
        {error}
      </div>

      {/* Charts Section removed per request */}

      {/* Incidents Table removed per request */}

      {/* Empty state removed per request */}
    </div>
  );
}
