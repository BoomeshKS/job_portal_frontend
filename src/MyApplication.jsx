import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export default function MyApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetch(`${API_BASE}/my-applications/${userId}`)
            .then(res => res.json())
            .then(setApplications);
    }, [userId]);

    const username = localStorage.getItem('username');

    const Logout = () => {
        localStorage.removeItem('username');
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ✅ FULL-WIDTH NAVBAR */}
            <header className="border-b bg-white w-full">
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
                    <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                        <a href="/" className="hover:text-blue-700">Home</a>
                        <a href="/jobs" className="hover:text-blue-700">Jobs</a>
                        <a href="/my-applications" className="text-blue-700 font-semibold">
                            My Applications
                        </a>
                    </nav>

                    {username ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                Hello, {username}
                            </span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                                {username.charAt(0).toUpperCase()}
                            </div>
                            <button
                                onClick={Logout}
                                className="text-sm text-gray-600 hover:text-blue-700"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button className="text-blue-700 font-medium">
                            Login
                        </button>
                    )}
                </div>
            </header>

            {/* ✅ PAGE CONTENT (CONSTRAINED) */}
            <main className="max-w-5xl mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold mb-6">
                    My Applications
                </h2>

                {applications.length === 0 ? (
                    <p>No applications found.</p>
                ) : (
                    applications.map(app => (
                        <div
                            key={app.application_id}
                            className="border rounded-lg p-5 mb-4 bg-white"
                        >
                            <h3 className="font-semibold text-blue-700">
                                {app.job.title}
                            </h3>
                            <p className="text-sm">{app.job.company}</p>
                            <p className="text-xs text-gray-500">
                                {app.job.location}
                            </p>

                            <div className="mt-3 flex justify-between items-center">
                                <span className="text-sm font-medium">
                                    Status: {app.status}
                                </span>
                                <span className="text-xs text-gray-500">
                                    Applied on{" "}
                                    {new Date(app.applied_on).toDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
}
