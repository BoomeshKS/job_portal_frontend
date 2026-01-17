import React from 'react'
import RegisterPage from './RegisterPage.jsx'
import './App.css'
import LoginPage from './LoginPage.jsx'
import JobListPage from './JobListPage.jsx'
import ApplyJobPage from './ApplyJobPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home.jsx'
import MyApplicationsPage from './MyApplication.jsx'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/apply/:jobId" element={<ApplyJobPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App