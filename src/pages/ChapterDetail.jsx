import React, {useState} from 'react'
import StudyBuddy from '../components/StudyBuddy'
import QuizModal from '../components/QuizModal'

export default function ChapterDetail(){
  const [watched, setWatched] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <div className="aspect-video bg-black rounded-md mb-4"></div>
        <h2 className="text-2xl font-semibold">What is React Native?</h2>
        <p className="text-slate-600 mt-2">This chapter introduces React Native fundamentals.</p>

        <div className="mt-4">
          <h4 className="font-semibold">Key Learning Points</h4>
          <ul className="list-disc ml-5 mt-2 text-slate-600">
            <li>JSX & components</li>
            <li>Platform-specific APIs</li>
            <li>Navigation basics</li>
          </ul>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={() => setWatched(true)} className={`py-3 px-5 rounded-md ${watched ? 'bg-green-500 text-white' : 'bg-slate-100'}`}>Mark as Complete</button>
          <button onClick={() => setQuizOpen(true)} disabled={!watched} className={`py-3 px-5 rounded-md ${watched ? 'bg-primary-500 text-white' : 'bg-slate-200 text-slate-400'}`}>Take Quiz</button>
        </div>
      </div>

      <aside className="col-span-4">
        <div className="card text-center">
          <div className="text-sm text-slate-500">Course Progress</div>
          <div className="mt-3 text-3xl font-semibold">42%</div>
        </div>

        <div className="card mt-4">
          <h4 className="font-semibold">Chapters</h4>
          <ol className="mt-3 space-y-2">
            {Array.from({length:9}).map((_,i)=> (
              <li key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-sm">{i+1}</div>
                  <div className="text-sm">Chapter {i+1}</div>
                </div>
                <div className="text-sm text-slate-400">{i<3 ? 'Completed' : 'Locked'}</div>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <StudyBuddy />
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  )
}
