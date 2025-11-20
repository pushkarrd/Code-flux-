import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext({ user: null, loading: true })

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    try {
      const unsub = onAuthStateChanged(auth, (u)=>{
        setUser(u)
        setLoading(false)
      })
      return unsub
    } catch (err) {
      // Firebase not initialized; use dummy user for demo/development
      console.warn('Using dummy authentication for development')
      setUser({ 
        uid: 'demo-user-12345', 
        email: 'demo@codeflux.dev',
        displayName: 'Demo User'
      })
      setLoading(false)
    }
  },[])

  return (
    <AuthContext.Provider value={{user, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
