import React from 'react'

export default function Navbar(){
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold">AI-Powered Learning</div>
        <div className="text-sm text-slate-500">Personalized • Gamified • Collaborative</div>
      </div>
      <div className="flex items-center gap-4">
        <input placeholder="Search courses" className="border rounded-md px-3 py-2 text-sm w-72" />
        <div className="w-9 h-9 rounded-full bg-slate-200"></div>
      </div>
    </header>
  )
}
