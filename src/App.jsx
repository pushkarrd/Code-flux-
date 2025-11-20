import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CourseOverview from './pages/CourseOverview'
import ChapterDetail from './pages/ChapterDetail'
import Profile from './pages/Profile'
import Community from './pages/Community'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/course/:id" element={<CourseOverview/>} />
            <Route path="/course/:id/chapter/:cid" element={<ChapterDetail/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/community" element={<Community/>} />
            <Route path="/settings" element={<Settings/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
