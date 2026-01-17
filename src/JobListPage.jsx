import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const Logout = () => {
    localStorage.removeItem("username");
    window.location.href = "/";
  };

    const fetchJobsFromAPI = async () => {
    if (!keywords.trim()) {
        alert("Please enter job keywords");
        return;
    }

    if (loading) return; // prevent double click

    setLoading(true);
    setJobs([]); // clear old results immediately

    // 🚀 fire-and-forget (DO NOT await)
    fetch(`${API_BASE}/fetch-jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords }),
    });

    pollForJobs(); // start polling
    };

    const pollForJobs = () => {
        let attempts = 0;

        const interval = setInterval(async () => {
            attempts++;

            try {
            const res = await fetch(`${API_BASE}/jobs`);
            const data = await res.json();

            if (data.length > 0 || attempts >= 6) {
                setJobs(data);
                setLoading(false);
                clearInterval(interval);
            }
            } catch (err) {
            console.error(err);
            setLoading(false);
            clearInterval(interval);
            }
        }, 1500);
    };



  useEffect(() => {
    fetch(`${API_BASE}/jobs`)
      .then((res) => res.json())
      .then(setJobs)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-blue-700">Home</a>
            <a href="/jobs" className="text-blue-600 font-semibold">Jobs</a>
            <a href="/my-applications" className="hover:text-blue-700">My Applications</a>
          </nav>

          {username ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hello, {username}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                {username.charAt(0).toUpperCase()}
              </div>
              <button onClick={Logout} className="text-sm text-gray-600 hover:text-blue-700">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={Logout}>Login</button>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto w-full max-w-7xl px-6 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Recommended Jobs</h2>
          <p className="mt-1 text-sm text-gray-500">
            Jobs based on your profile and preferences
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Search jobs (e.g. Django developer)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600"
          />

          <button
            onClick={fetchJobsFromAPI}
            disabled={loading}
            className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search Jobs"}
          </button>
        </div>

        {/* JOB LIST */}
        <div className="space-y-4">
          {loading && <SkeletonLoader />}

          {!loading && jobs.length === 0 && (
            <p>No jobs found. Try searching!</p>
          )}

          {!loading &&
            jobs.map((job) => (
              <div key={job.id} className="rounded-lg border bg-white p-5 hover:shadow-md">
                <h3 className="text-lg font-semibold text-blue-700">{job.title}</h3>
                <p className="text-sm text-gray-700">{job.company}</p>
                <p className="text-xs text-gray-500">{job.location}</p>

                <div className="mt-4 flex justify-end">
                  <NavLink
                    to={`/apply/${job.id}`}
                    className="text-sm font-medium text-blue-700 hover:underline"
                  >
                    View Details →
                  </NavLink>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-white text-center text-sm text-gray-500 py-6">
        © 2026 JobPortal.com
      </footer>
    </div>
  );
}

/* 🔵 Skeleton Loader */
function SkeletonLoader() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-lg border bg-white p-5">
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 w-1/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-1/5 bg-gray-200 rounded"></div>
        </div>
      ))}
    </>
  );
}
