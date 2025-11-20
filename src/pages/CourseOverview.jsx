import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChapterCard = ({i, title}) => (
  <div className="flex items-center gap-4 p-4 rounded-md bg-gradient-to-r from-violet-500 to-purple-500 text-white">
    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">{i}</div>
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm opacity-80">8-12 min</div>
    </div>
  </div>
)

export default function CourseOverview(){
  const navigate = useNavigate()
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold">React Native Mastery</h1>
        <p className="text-slate-500 mt-2">Build native apps using React Native with guided projects and AI support.</p>

        <div className="flex gap-4 mt-6">
          <div className="card flex-1">
            <div className="text-sm text-slate-500">Duration</div>
            <div className="mt-2 font-semibold">12 hours</div>
          </div>
          <div className="card w-40">
            <div className="text-sm text-slate-500">Chapters</div>
            <div className="mt-2 font-semibold">9</div>
          </div>
          <div className="card w-40">
            <div className="text-sm text-slate-500">Difficulty</div>
            <div className="mt-2 font-semibold">Intermediate</div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">Chapters</h3>
          <div className="space-y-3">
            {["What is React Native?","Why React Native?","Setup & Tooling","Core Components","Navigation","State Management","Styling","Deployment","Next Steps"].map((t, i)=> (
              <div key={i} onClick={() => navigate(`/course/1/chapter/${i+1}`)} className="cursor-pointer">
                <ChapterCard i={i+1} title={t} />
              </div>
            ))}
          </div>
        </div>

      </div>

      <aside className="col-span-1">
        <div className="card">
          <div className="h-40 bg-gradient-to-br from-indigo-400 to-pink-300 rounded-md mb-4"></div>
          <button className="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-md py-3">🎬 Generate Content</button>
        </div>
      </aside>

    </div>
  )
}
