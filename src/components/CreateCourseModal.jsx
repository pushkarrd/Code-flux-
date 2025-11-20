import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { signInWithGoogle } from '../lib/firebase'
import { generateCourse } from '../lib/gemini'

export default function CreateCourseModal({onClose, isGuest}){
  const [open, setOpen] = useState(true)
  const [name, setName] = useState('')
  const [chapters, setChapters] = useState(7)
  const [loading, setLoading] = useState(false)
  const [signingIn, setSigningIn] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const isSignedIn = user && user.email !== 'demo@codeflux.dev'

  async function submit(e){
    e.preventDefault()
    
    if (!isSignedIn) {
      alert('Please sign in to generate courses')
      return
    }

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

  const handleSignIn = async () => {
    setSigningIn(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign-in error:', error)
      alert('Sign-in failed. Please try again.')
    } finally {
      setSigningIn(false)
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

            {isGuest && !isSignedIn && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 mb-3">
                  <strong>⚠️ Guest Mode:</strong> You can fill out the form, but you need to sign in to generate the course using AI.
                </p>
                <button 
                  type="button"
                  onClick={handleSignIn}
                  disabled={signingIn}
                  className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                >
                  {signingIn ? '🔵 Signing In...' : '🔵 Sign in with Google to Generate'}
                </button>
              </div>
            )}

            <label className="block mb-2 text-sm">Course Name *</label>
            <input required maxLength={100} value={name} onChange={e=>setName(e.target.value)} className="w-full border rounded-md p-2 mb-3" disabled={isGuest && !isSignedIn} />

            <label className="block mb-2 text-sm">Course Description</label>
            <textarea maxLength={500} className="w-full border rounded-md p-2 mb-3" disabled={isGuest && !isSignedIn} />

            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-sm">No. of Chapters</label>
                <input type="number" min={3} max={15} value={chapters} onChange={e=>setChapters(Number(e.target.value))} className="border rounded-md p-2 w-32" disabled={isGuest && !isSignedIn} />
              </div>
              <div>
                <label className="block text-sm">Include Video</label>
                <input type="checkbox" defaultChecked className="mt-2" disabled={isGuest && !isSignedIn} />
              </div>
              <div>
                <label className="block text-sm">Difficulty</label>
                <select className="border rounded-md p-2 mt-1" disabled={isGuest && !isSignedIn}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || (isGuest && !isSignedIn)} 
              className={`w-full py-3 rounded-md font-semibold ${
                isGuest && !isSignedIn 
                  ? 'bg-slate-300 text-slate-600 cursor-not-allowed' 
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              }`}
            >
              {loading ? '⏳ Generating...' : '✨ Generate Course'}
            </button>

            {isGuest && !isSignedIn && (
              <p className="text-xs text-slate-600 text-center mt-3">
                Sign in with Google to generate courses
              </p>
            )}
          </form>
        </div>
      )}
    </>
  )
}
