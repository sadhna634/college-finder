import Link from 'next/link'

export default function Home() {
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
              <Link href="/" className="text-indigo-600 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link href="/colleges" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Colleges</Link>
              <Link href="/compare" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Compare</Link>
              <Link href="/predictor" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Predictor</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Find Your Perfect <span className="text-indigo-600">College</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Discover the best colleges in India based on your preferences. 
            Compare fees, placements, ratings, and make an informed decision.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/colleges" className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
              Browse Colleges
            </Link>
            <Link href="/predictor" className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition">
              College Predictor
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">Search colleges by name, location, course, or fees</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-lg font-semibold mb-2">Compare</h3>
              <p className="text-gray-600">Compare up to 3 colleges side by side</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold mb-2">Predictor</h3>
              <p className="text-gray-600">Get college predictions based on your rank</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">Detailed Info</h3>
              <p className="text-gray-600">View fees, placements, courses, and reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}