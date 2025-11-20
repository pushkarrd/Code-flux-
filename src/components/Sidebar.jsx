import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CreateCourseModal from './CreateCourseModal'

export default function Sidebar(){
  const [showModal, setShowModal] = useState(false)

  return (
    <aside className="w-60 h-screen bg-white border-r" style={{width:240}}>
      <div className="p-6 flex flex-col h-full">
        <div className="mb-8">
          <div className="text-2xl font-bold text-primary-600">CodeFlux</div>
          <div className="text-sm text-slate-500">AI Learning</div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li><NavLink to="/" className={({isActive})=> isActive? 'font-semibold text-primary-600' : 'text-slate-700'}>Dashboard</NavLink></li>
            <li><NavLink to="/my-learning" className="text-slate-700">My Learning</NavLink></li>
            <li><NavLink to="/explore" className="text-slate-700">Explore</NavLink></li>
            <li><NavLink to="/profile" className={({isActive})=> isActive? 'font-semibold text-primary-600' : 'text-slate-700'}>Profile</NavLink></li>
            <li><NavLink to="/settings" className="text-slate-700">Settings</NavLink></li>
            <li><NavLink to="/community" className={({isActive})=> isActive? 'font-semibold text-primary-600' : 'text-slate-700'}>Community</NavLink></li>
          </ul>
        </nav>

        <div className="mt-4">
          <button onClick={() => setShowModal(true)} className="w-full bg-primary-500 text-white rounded-md py-2 hover:bg-primary-600 transition">Create New Course</button>
        </div>

        <div className="mt-auto text-sm text-slate-500">Signed in as <strong>Jane</strong></div>
      </div>

      {showModal && <CreateCourseModal onClose={() => setShowModal(false)} />}
    </aside>
  )
}
