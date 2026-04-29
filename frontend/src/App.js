import { useEffect, useState, useMemo } from "react";
import CollegeCard from "./components/CollegeCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const API_URL = "http://127.0.0.1:8000";

  // Extract unique cities for filter dropdown
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(colleges.map((c) => c.city))];
    return uniqueCities.sort();
  }, [colleges]);

  // Filter colleges based on search and city
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesSearch = college.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity
        ? college.city === selectedCity
        : true;
      return matchesSearch && matchesCity;
    });
  }, [colleges, searchTerm, selectedCity]);

  // Fetch colleges from API
  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/colleges/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setColleges(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching colleges:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 College Discovery Platform</h1>
        <p>Find your perfect college</p>
      </header>

      <main className="app-main">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          cities={cities}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading colleges...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">⚠️ Error: {error}</p>
            <button onClick={fetchColleges} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredColleges.length === 0 && (
          <div className="no-results">
            <p>No colleges found matching your criteria.</p>
          </div>
        )}

        {!loading && !error && filteredColleges.length > 0 && (
          <div className="colleges-grid">
            {filteredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )}

        {!loading && !error && (
          <p className="results-count">
            Showing {filteredColleges.length} of {colleges.length} colleges
          </p>
        )}
      </main>
    </div>
  );
}

export default App;