import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import CreateCourseModal from '../components/CreateCourseModal'

export default function Dashboard(){
  const { user, loading } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSignInPrompt, setShowSignInPrompt] = useState(false)

  const handleCreateCourse = () => {
    if (!user || user.email === 'demo@codeflux.dev') {
      setShowSignInPrompt(true)
    } else {
      setShowCreateModal(true)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back 👋</h1>
          <p className="text-slate-500">Continue your learning journey</p>
        </div>
        <button 
          onClick={handleCreateCourse}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          + Create Course
        </button>
      </div>

      {/* Sign In Prompt Modal */}
      {showSignInPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔐</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In Required</h2>
              <p className="text-slate-600">You need to sign in to create courses.</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-sm text-slate-600 text-center">
                Sign in with your account to unlock course creation, save your progress, and join the community!
              </p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => {
                  alert('Google Sign-In feature coming soon!')
                  setShowSignInPrompt(false)
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 transition font-semibold text-slate-900"
              >
                <span>🔵</span> Sign in with Google
              </button>
              <button 
                onClick={() => {
                  alert('Email Sign-In feature coming soon!')
                  setShowSignInPrompt(false)
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 transition font-semibold text-slate-900"
              >
                <span>✉️</span> Sign in with Email
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <button 
                onClick={() => setShowSignInPrompt(false)}
                className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="grid grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm text-slate-500">Current Streak</h3>
          <div className="mt-3 text-2xl font-semibold flex items-center gap-2">
            <span className="text-orange-500">🔥</span> <span>5</span>
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm text-slate-500">Total XP</h3>
          <div className="mt-3 text-2xl font-semibold">1,240</div>
        </div>
        <div className="card">
          <h3 className="text-sm text-slate-500">Courses In Progress</h3>
          <div className="mt-3 text-2xl font-semibold">3</div>
        </div>
        <div className="card">
          <h3 className="text-sm text-slate-500">Completion Rate</h3>
          <div className="mt-3 text-2xl font-semibold">72%</div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <div className="w-64 card shrink-0">
            <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600 rounded-md mb-4"></div>
            <h3 className="font-semibold">Intro to React</h3>
            <div className="mt-2 text-sm text-slate-500">Chapter 3 of 7</div>
          </div>
          <div className="w-64 card shrink-0">
            <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-md mb-4"></div>
            <h3 className="font-semibold">Data Science Basics</h3>
            <div className="mt-2 text-sm text-slate-500">Chapter 1 of 10</div>
          </div>
        </div>
      </section>

      {/* Create Course Modal */}
      {showCreateModal && <CreateCourseModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}
