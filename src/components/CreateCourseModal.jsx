import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { generateCourse } from '../lib/gemini'

export default function CreateCourseModal({onClose}){
  const [open, setOpen] = useState(true)
  const [name, setName] = useState('')
  const [chapters, setChapters] = useState(7)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      // Use local Gemini stub to generate course client-side.
      const data = await generateCourse({ title: name, chaptersCount: chapters })
      // `generateCourse` returns course object; navigate to a placeholder overview.
      // For now we navigate to a sample course id. You can extend this to store courses in Firestore.
      navigate('/course/1')

      setOpen(false)
      if(onClose) onClose()
    }catch(err){
      console.error(err)
      alert('Error generating course')
    }finally{
      setLoading(false)
    }
  }

  function closeModal(){
    setOpen(false)
    if(onClose) onClose()
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={submit} className="w-full max-w-lg bg-white rounded-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Course</h3>
              <button type="button" onClick={closeModal} className="text-slate-500">✕</button>
            </div>

            <label className="block mb-2 text-sm">Course Name *</label>
            <input required maxLength={100} value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded-md p-2 mb-3" />

            <label className="block mb-2 text-sm">Course Description</label>
            <textarea maxLength={500} className="w-full border rounded-md p-2 mb-3" />

            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-sm">No. of Chapters</label>
                <input type="number" min={3} max={15} value={chapters} onChange={e=>setChapters(Number(e.target.value))} className="border rounded-md p-2 w-32" />
              </div>
              <div>
                <label className="block text-sm">Include Video</label>
                <input type="checkbox" defaultChecked className="mt-2" />
              </div>
              <div>
                <label className="block text-sm">Difficulty</label>
                <select className="border rounded-md p-2 mt-1">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <button disabled={loading} className="w-full bg-primary-500 text-white py-3 rounded-md">{loading? 'Generating...' : '✨ Generate Course'}</button>
          </form>
        </div>
      )}
    </>
  )
}
