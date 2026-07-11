import { useState, useEffect } from 'react';

function ServerStatus() {
  const [status, setStatus] = useState('Checking...');
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  const checkServer = async () => {
    try {
      setLoading(true);
      const response = await fetch('/.well-known/health');
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      setStatus(`✅ ${data.status} (v${data.apiVersion})`);
      setLastChecked(data.datetime);
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
          <span className="status-text">
            {loading ? (
              <>
                <span style={{ display: 'inline-block', animation: 'pulse 1.5s infinite' }}>
                  🔄
                </span> Checking server status...
              </>
            ) : (
              <>
                <span style={{ display: 'inline-block', animation: 'bounce 2s infinite', marginRight: '8px' }}>
                  {status.includes('✅') ? '✅' : '❌'}
                </span>
                {status}
              </>
            )}
          </span>
        </div>
        {lastChecked && (
          <p className="last-checked">
            ⏰ Last checked: {new Date(lastChecked).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </p>
        )}
        <button 
          onClick={checkServer} 
          className="refresh-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
                🔄
              </span>
              Refreshing...
            </>
          ) : (
            '🔄 Refresh Status'
          )}
        </button>
      </div>
    </div>
  );
}

export default ServerStatus;