import { useState, useEffect } from 'react';

function ServerStatus() {
  const [status, setStatus] = useState('Checking...');
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  const checkServer = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/health');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setStatus(`✅ ${data.status}`);
      setLastChecked(data.timestamp);
    } catch (error) {
      setStatus('❌ Server unreachable');
      setLastChecked(new Date().toISOString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkServer();
    const interval = setInterval(checkServer, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="server-status">
      <h3>Server Status</h3>
      <div className="status-info">
        <div className="status-indicator">
          <span className="status-text">{loading ? 'Checking...' : status}</span>
        </div>
        {lastChecked && (
          <p className="last-checked">
            Last checked: {new Date(lastChecked).toLocaleTimeString()}
          </p>
        )}
        <button 
          onClick={checkServer} 
          className="refresh-btn"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </div>
    </div>
  );
}

export default ServerStatus;