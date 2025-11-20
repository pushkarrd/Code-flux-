import React from 'react'
import CreateCourseModal from '../components/CreateCourseModal'

export default function Dashboard(){
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back 👋</h1>
          <p className="text-slate-500">Continue your learning journey</p>
        </div>
        <CreateCourseModal />
      </div>

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

    </div>
  )
}
