import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export default function Compare() {
  const router = useRouter();
  const { query } = router;
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.colleges) fetchColleges();
    else setLoading(false);
  }, [query.colleges]);

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    try {
      const collegeIds = query.colleges.split(',');
      const promises = collegeIds.map(id => axios.get(`${API_URL}/colleges/${id}/`));
      const results = await Promise.all(promises);
      setColleges(results.map(res => res.data));
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

  if (colleges.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">🎓 CollegeFinder</Link>
              <div className="flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Home</Link>
                <Link href="/colleges" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Colleges</Link>
                <Link href="/compare" className="text-indigo-600 px-3 py-2 rounded-md font-medium">Compare</Link>
                <Link href="/predictor" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Predictor</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-gray-600 text-lg mb-4">No colleges selected for comparison.</p>
          <Link href="/colleges" className="text-indigo-600 hover:text-indigo-800 font-medium">Browse Colleges to Compare →</Link>
        </div>
      </div>
    );
  }

  const comparisonFields = [
    { label: 'Fees (Annual)', key: 'fees', format: (v) => `₹${v?.toLocaleString()}` },
    { label: 'Rating', key: 'rating', format: (v) => `${v} ⭐` },
    { label: 'Placement %', key: 'placement_percentage', format: (v) => `${v}%` },
    { label: 'Avg Salary', key: 'avg_salary', format: (v) => `₹${v?.toLocaleString()}` },
    { label: 'City', key: 'city', format: (v) => v },
    { label: 'State', key: 'state', format: (v) => v },
    { label: 'Ownership', key: 'ownership', format: (v) => v },
    { label: 'Established', key: 'established_year', format: (v) => v },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">🎓 CollegeFinder</Link>
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link href="/colleges" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Colleges</Link>
              <Link href="/compare" className="text-indigo-600 px-3 py-2 rounded-md font-medium">Compare</Link>
              <Link href="/predictor" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Predictor</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Compare Colleges</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                  {colleges.map((college) => (
                    <th key={college.id} className="px-6 py-4 text-left text-white font-semibold">{college.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonFields.map((field, idx) => (
                  <tr key={field.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-gray-900 font-medium">{field.label}</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="px-6 py-4 text-gray-600">{field.format(college[field.key])}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">Courses</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="px-6 py-4 text-gray-600">
                      {(college.courses_offered || []).slice(0, 3).join(', ')}
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-gray-900 font-medium">Action</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="px-6 py-4">
                      <Link href={`/colleges/${college.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">View Details →</Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/colleges" className="text-indigo-600 hover:text-indigo-800 font-medium">← Select More Colleges to Compare</Link>
        </div>
      </div>
    </div>
  );
}