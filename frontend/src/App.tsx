import { useEffect, useState } from 'react';
import { updateCountryStats, retrieveCountryStats } from './services/country-stats-api';
// import { startLoadTest } from './services/test';

interface Stats {
  [key: string]: number;
}

const App = () => {
  const [countryCode, setCountryCode] = useState<string>('');
  const [stats, setStats] = useState<Stats>({});
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  // Detect user's country
  useEffect(() => {
    document.title = "Website Visits Tracker";
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (data.country_code) {
          setCountryCode(data.country_code.toLowerCase());
        }
      })
      .catch(() => console.warn('Could not detect country'));
    // startLoadTest();
  }, []);

  // Send update request to API
  const handleUpdate = async () => {
    if (!countryCode.trim()) return;
    setLoadingUpdate(true);
    try {
      await updateCountryStats(countryCode.toLowerCase());
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        // Backend returned an error message
        alert(`Error: ${err.response.data.message}`);
      } else {
        // Network or Axios error
        alert(`Error: ${err}`);
      }
      console.error(err);
    } finally {
      setLoadingUpdate(false);
    }
  };

  // Fetch stats from API  
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const data = await retrieveCountryStats();
      setStats(data.stats);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch stats');
    } finally {
      setLoadingStats(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">🌍 Website Visits Tracker</h1>

        <div className="flex items-center justify-center gap-2 mb-6">
          <input
            type="text"
            value={countryCode.toUpperCase()}
            onChange={(e) => setCountryCode(e.target.value.toLowerCase())}
            maxLength={2}
            className="w-24 text-center text-white rounded-lg p-2 text-lg font-semibold uppercase focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={handleUpdate}
            disabled={loadingUpdate}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold transition-all"
          >
            {loadingUpdate ? 'Updating...' : 'Update'}
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-3 flex justify-between items-center">
          <span>📊 Stats</span>
          <button
            onClick={fetchStats}
            disabled={loadingStats}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 px-4 py-1 rounded-lg font-semibold text-sm transition-all"
          >
            {loadingStats ? 'Loading...' : 'Get Stats'}
          </button>
        </h2>
        <div className="bg-black/20 rounded-xl p-4 max-h-64 overflow-y-auto">
          {Object.entries(stats).length === 0 ? (
            <p>No data yet.</p>
          ) : (
            <ul className="space-y-1">
              {Object.entries(stats).sort(([, a], [, b]) => b - a).map(([code, count]) => (
                <li
                  key={code}
                  className="flex justify-between border-b border-white/10 pb-1"
                >
                  <span className="font-bold">{code.toUpperCase()}</span>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className="mt-8 text-white/70 text-sm">
        Made by Leonid Gerlovin
      </footer>
    </div>
  );
};

export default App;