import React from 'react'

export default function Profile(){
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <div className="w-28 h-28 rounded-full bg-slate-200"></div>
        <div>
          <h2 className="text-2xl font-semibold">Jane Doe</h2>
          <div className="text-slate-500">jane@example.com • Member since Jan 2025</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="text-sm text-slate-500">Total Courses</div>
          <div className="mt-2 font-semibold">8</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Completed</div>
          <div className="mt-2 font-semibold">3</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Streak</div>
          <div className="mt-2 font-semibold">5</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">XP</div>
          <div className="mt-2 font-semibold">1240</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-3">Achievements</h3>
      <div className="grid grid-cols-6 gap-4">
        {['🎓','📖','✅','🔥','⭐','📚'].map((a,i)=> (
          <div key={i} className="p-4 bg-white rounded-md shadow-sm text-center">{a}</div>
        ))}
      </div>
    </div>
  )
}
