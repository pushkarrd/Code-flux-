import React, {useState} from 'react'

export default function QuizModal({open, onClose}){
  const questions = [
    {q:'What is JSX?', opts:['A','B','C','D'], a:0, explain:'JSX is syntax.'},
    {q:'What renders UI?', opts:['A','B','C','D'], a:1, explain:'React renders UI.'},
    {q:'State or Props?', opts:['A','B','C','D'], a:2, explain:'State is local.'},
    {q:'Hook example?', opts:['A','B','C','D'], a:3, explain:'useState is a hook.'},
    {q:'What is VDOM?', opts:['A','B','C','D'], a:0, explain:'Virtual DOM explained.'}
  ]
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  function choose(i){
    setSelected(i)
    if(i === questions[idx].a) setScore(s => s+1)
    setTimeout(()=>{
      if(idx+1 < questions.length){
        setIdx(idx+1); setSelected(null)
      } else { setDone(true) }
    }, 900)
  }

  function restart(){ setIdx(0); setSelected(null); setScore(0); setDone(false) }

  if(!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-white rounded-md p-6">
        {!done ? (
          <div>
            <div className="text-sm text-slate-500">Question {idx+1}/{questions.length}</div>
            <h3 className="text-lg font-semibold mt-2">{questions[idx].q}</h3>
            <div className="mt-4 grid gap-3">
              {questions[idx].opts.map((o,i)=> (
                <button key={i} onClick={()=>choose(i)} className={`text-left p-3 rounded-md border ${selected===i? 'border-primary-500 bg-primary-50' : 'bg-slate-50'}`}>{String.fromCharCode(65+i)}. {o}</button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={onClose} className="text-sm text-slate-500">Close</button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Score: {Math.round((score/questions.length)*100)}%</h3>
            <div className="mt-4">
              <button onClick={restart} className="bg-primary-500 text-white px-4 py-2 rounded-md mr-2">Retake Quiz</button>
              <button onClick={onClose} className="px-4 py-2 rounded-md border">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
