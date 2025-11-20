import React, {useState} from 'react'

export default function StudyBuddy(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {from:'ai', text:'Hi! I can help explain this chapter.'}
  ])
  const [value, setValue] = useState('')

  function send(){
    if(!value) return
    setMessages(m=>[...m, {from:'user', text: value}])
    setValue('')
    // stubbed AI response
    setTimeout(()=> setMessages(m=>[...m, {from:'ai', text:'Here is a helpful explanation (stub).'}]), 900)
  }

  return (
    <>
      <button onClick={()=>setOpen(true)} className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-500 text-white shadow-lg flex items-center justify-center pulse">💬</button>

      {open && (
        <div className="fixed right-6 bottom-24 w-96 h-[600px] bg-white rounded-md shadow-lg z-50 flex flex-col">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div>
              <div className="font-semibold">AI Study Buddy</div>
              <div className="text-sm text-slate-500">Current Chapter</div>
            </div>
            <button onClick={()=>setOpen(false)} className="text-slate-500">✕</button>
          </div>

          <div className="p-4 flex-1 overflow-auto space-y-3">
            {messages.map((m,i)=> (
              <div key={i} className={m.from==='ai'? 'text-left text-sm text-slate-800 bg-slate-100 p-3 rounded-md inline-block' : 'text-right text-white bg-primary-500 p-3 rounded-md inline-block'}>{m.text}</div>
            ))}
          </div>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <textarea value={value} onChange={e=>setValue(e.target.value)} className="flex-1 border rounded-md p-2 h-12" />
              <button onClick={send} className="bg-primary-500 text-white px-4 rounded-md">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
