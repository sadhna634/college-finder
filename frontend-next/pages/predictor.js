import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export default function Predictor() {
  const [exam, setExam] = useState('JEE');
  const [rank, setRank] = useState('');
  const [predictedColleges, setPredictedColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const exams = [
    { value: 'JEE', label: 'JEE Main' },
    { value: 'JEE Advanced', label: 'JEE Advanced' },
    { value: 'GATE', label: 'GATE' },
    { value: 'COMEDK', label: 'COMEDK' },
    { value: 'MET', label: 'MET' },
    { value: 'VITEEE', label: 'VITEEE' },
    { value: 'SRMJEEE', label: 'SRMJEEE' },
    { value: 'LPUNEST', label: 'LPUNEST' },
  ];

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!rank || rank <= 0) {
      setError('Please enter a valid rank');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const res = await axios.post(`${API_URL}/predict/`, {
        exam,
        rank: parseInt(rank),
      });
      setPredictedColleges(res.data.predicted_colleges || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRankCategory = () => {
    const r = parseInt(rank);
    if (r <= 5000) return { label: 'Top Rank', color: 'bg-green-100 text-green-800', icon: '🏆' };
    if (r <= 15000) return { label: 'Good Rank', color: 'bg-blue-100 text-blue-800', icon: '🎯' };
    if (r <= 35000) return { label: 'Average Rank', color: 'bg-yellow-100 text-yellow-800', icon: '📊' };
    if (r <= 75000) return { label: 'Below Average', color: 'bg-orange-100 text-orange-800', icon: '📈' };
    return { label: 'Higher Rank', color: 'bg-red-100 text-red-800', icon: '🎓' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">🎓 CollegeFinder</Link>
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link href="/colleges" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Colleges</Link>
              <Link href="/compare" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Compare</Link>
              <Link href="/predictor" className="text-indigo-600 px-3 py-2 rounded-md font-medium">Predictor</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">🧠 College Predictor</h1>

        {/* Predictor Form */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Details</h2>
          <form onSubmit={handlePredict}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Exam</label>
                <select
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {exams.map((e) => (
                    <option key={e.value} value={e.value}>{e.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rank</label>
                <input
                  type="number"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="Enter your rank"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? 'Predicting...' : 'Get Predictions'}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {hasSearched && !loading && (
          <div>
            {predictedColleges.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Predicted Colleges for Rank {rank}
                  </h2>
                  {rank && (
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getRankCategory().color}`}>
                      {getRankCategory().icon} {getRankCategory().label}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {predictedColleges.map((college, idx) => (
                    <div
                      key={college.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative">
                        <span className="text-5xl">🎓</span>
                        <span className="absolute top-2 left-2 bg-white text-indigo-600 px-2 py-1 rounded-full text-sm font-bold">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{college.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">📍 {college.city}, {college.state}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                          <div className="bg-gray-50 rounded p-2">
                            <p className="text-gray-500">Fees</p>
                            <p className="font-semibold">₹{college.fees?.toLocaleString()}</p>
                          </div>
                          <div className="bg-gray-50 rounded p-2">
                            <p className="text-gray-500">Placement</p>
                            <p className="font-semibold">{college.placement_percentage}%</p>
                          </div>
                        </div>
                        
                        <Link
                          href={`/colleges/${college.id}`}
                          className="block text-center py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">No colleges found for this rank range.</p>
              </div>
            )}
          </div>
        )}

        {/* How it Works */}
        {!hasSearched && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Select Exam</h3>
                <p className="text-gray-600 text-sm">Choose the entrance exam you appeared for</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔢</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Enter Rank</h3>
                <p className="text-gray-600 text-sm">Input your exam rank to get predictions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Get Colleges</h3>
                <p className="text-gray-600 text-sm">View colleges that match your rank</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}