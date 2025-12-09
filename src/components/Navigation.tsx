import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="nav-brand">
            🛡️ GeoGuard
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${isActive('/')}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about')}`}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
