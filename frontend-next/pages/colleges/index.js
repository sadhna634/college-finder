import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [minFees, setMinFees] = useState(0);
  const [maxFees, setMaxFees] = useState(500000);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [cities, setCities] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchColleges();
  }, [search, city, minFees, maxFees, minRating, page]);

  const fetchCities = async () => {
    try {
      const res = await axios.get(`${API_URL}/cities/`);
      setCities(res.data.cities || []);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        search,
        city,
        min_fees: minFees,
        max_fees: maxFees,
        min_rating: minRating,
        page,
        per_page: 12,
      });
      const res = await axios.get(`${API_URL}/colleges/?${params}`);
      setColleges(res.data.colleges || []);
      setPagination(res.data.pagination || { pages: 1, total: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCollegeSelection = (college) => {
    if (selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter(c => c.id !== college.id));
    } else if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCity('');
    setMinFees(0);
    setMaxFees(500000);
    setMinRating(0);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">🎓 CollegeFinder</Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link href="/colleges" className="text-indigo-600 px-3 py-2 rounded-md font-medium">Colleges</Link>
              <Link href="/compare" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Compare</Link>
              <Link href="/predictor" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Predictor</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">College Listing</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search College</label>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                value={city}
                onChange={(e) => { setCity(e.target.value); setPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Fees (₹)</label>
              <input
                type="number"
                value={maxFees}
                onChange={(e) => { setMaxFees(e.target.value); setPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => { setMinRating(e.target.value); setPage(1); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="0">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={clearFilters}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear Filters
            </button>
            <p className="text-gray-600">
              Showing {colleges.length} of {pagination.total} colleges
            </p>
          </div>
        </div>

        {/* Compare Selection Bar */}
        {selectedColleges.length > 0 && (
          <div className="bg-indigo-50 rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
            <div>
              <span className="text-indigo-800 font-medium">
                {selectedColleges.length} college(s) selected for comparison
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedColleges([])}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Clear
              </button>
              <Link
                href={`/compare?colleges=${selectedColleges.map(c => c.id).join(',')}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Compare Now
              </Link>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error: {error}</p>
            <button
              onClick={fetchColleges}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* College Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div
                key={college.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow ${
                  selectedColleges.find(c => c.id === college.id) ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">🎓</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{college.name}</h3>
                    <button
                      onClick={() => toggleCollegeSelection(college)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedColleges.find(c => c.id === college.id)
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {selectedColleges.find(c => c.id === college.id) ? '✓ Selected' : '+ Compare'}
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">📍 {college.city}, {college.state}</p>
                  <p className="text-gray-600 text-sm mb-4">📚 {college.course}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">Fees</p>
                      <p className="font-semibold text-gray-900">₹{college.fees?.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="font-semibold text-gray-900">⭐ {college.rating}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <p className="text-xs text-gray-500">Placement</p>
                      <p className="font-semibold text-gray-900">{college.placement_percentage}%</p>
                    </div>
                  </div>
                  
                  <Link
                    href={`/colleges/${college.id}`}
                    className="block mt-4 text-center py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && colleges.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No colleges found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage(Math.min(pagination.pages, page + 1))}
              disabled={page === pagination.pages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}