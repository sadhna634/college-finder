import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export default function CollegeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) fetchCollege();
  }, [id]);

  const fetchCollege = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/colleges/${id}/`);
      setCollege(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <Link href="/colleges" className="text-indigo-600 hover:text-indigo-800">Back to Colleges</Link>
        </div>
      </div>
    );
  }

  if (!college) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">🎓 CollegeFinder</Link>
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
        <Link href="/colleges" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">← Back to Colleges</Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-7xl">🎓</span>
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{college.name}</h1>
                <p className="text-gray-600 text-lg">📍 {college.city}, {college.state}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-yellow-500">⭐ {college.rating}</div>
                <p className="text-gray-500 text-sm">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Annual Fees</p>
            <p className="text-2xl font-bold text-indigo-600">₹{college.fees?.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Placement</p>
            <p className="text-2xl font-bold text-green-600">{college.placement_percentage}%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Avg Salary</p>
            <p className="text-2xl font-bold text-blue-600">₹{college.avg_salary?.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Established</p>
            <p className="text-2xl font-bold text-gray-900">{college.established_year}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            {['overview', 'courses', 'placements', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-medium capitalize ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About College</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{college.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li><span className="font-medium">Ownership:</span> {college.ownership}</li>
                      <li><span className="font-medium">Location:</span> {college.city}, {college.state}</li>
                      <li><span className="font-medium">Established:</span> {college.established_year}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Exams Accepted</h4>
                    <div className="flex flex-wrap gap-2">
                      {(college.exam_accepted || []).map((exam, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">{exam}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Courses Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(college.courses_offered || []).map((course, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="font-medium text-gray-900">{course}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'placements' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Placement Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <p className="text-gray-600 text-sm">Placement Percentage</p>
                    <p className="text-4xl font-bold text-green-600">{college.placement_percentage}%</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <p className="text-gray-600 text-sm">Average Salary</p>
                    <p className="text-4xl font-bold text-blue-600">₹{college.avg_salary?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Reviews</h3>
                {(college.reviews && college.reviews.length > 0) ? (
                  <div className="space-y-4">
                    {college.reviews.map((review, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-gray-900">{review.user}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}