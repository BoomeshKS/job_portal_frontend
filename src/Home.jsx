// Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // Get user from localStorage
  const username = localStorage.getItem('username');
  const isLoggedIn = !!username;

  const handleLogout = () => {
    localStorage.removeItem('username');
    // Optional: remove token too if you use JWT
    // localStorage.removeItem('token');
    navigate('/'); // or '/login'
    // Optional: window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#0073b1]">
                JobPortal
              </span>
            </Link>

            {/* Auth section */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-6">
                  <span className="hidden sm:inline text-gray-700">
                    Welcome, <strong>{username}</strong>
                  </span>

                  <Link
                    to="/jobs"
                    className="px-5 py-2.5 bg-[#0073b1] hover:bg-[#005f8d] 
                             text-white rounded-md font-medium transition-colors"
                  >
                    Find Jobs
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-700 hover:text-[#0073b1] 
                             font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-[#0073b1] hover:text-[#005f8d] 
                             font-medium transition-colors"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-[#0073b1] hover:bg-[#005f8d] 
                             text-white rounded-md font-medium transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#0073b1] to-[#005f8d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Job Today
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Explore thousands of job opportunities from top companies across India
          </p>

          {isLoggedIn ? (
            <Link
              to="/jobs"
              className="inline-block px-10 py-4 bg-[#0073b1] hover:bg-orange-600 
                       text-white text-lg font-semibold rounded-lg shadow-lg 
                       transform hover:scale-105 transition-all duration-300"
            >
              Browse Latest Jobs →
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-10 py-4 bg-white text-[#0073b1] font-semibold 
                         rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-10 py-4 bg-[#0073b1] hover:bg-orange-600 
                         text-white font-semibold rounded-lg shadow-lg transition-colors"
              >
                Login to Apply
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats / Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#0073b1] mb-4">
                50K+
              </div>
              <p className="text-gray-600 text-lg">Live Jobs</p>
            </div>

            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#0073b1] mb-4">
                10K+
              </div>
              <p className="text-gray-600 text-lg">Companies</p>
            </div>

            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#0073b1] mb-4">
                2M+
              </div>
              <p className="text-gray-600 text-lg">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - minimal */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;