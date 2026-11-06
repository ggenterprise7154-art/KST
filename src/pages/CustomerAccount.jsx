import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CustomerAccount() {
  const [email, setEmail] = useState('onewithgod7154@gmail.com')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('signin') // signin or signup

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleAuth = async () => {
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Account created! Check your email to confirm.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (user) {
    return (
      <div style={{padding: '40px', maxWidth: '400px', margin: '0 auto'}}>
        <h2>Welcome</h2>
        <p>{user.email}</p>
        <button onClick={handleSignOut} style={{padding: '10px 20px', marginTop: '20px'}}>
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div style={{padding: '40px', maxWidth: '400px', margin: '0 auto'}}>
      <h2>{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        style={{width: '100%', padding: '10px', margin: '10px 0'}}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)}
        style={{width: '100%', padding: '10px', margin: '10px 0'}}
      />
      <button onClick={handleAuth} disabled={loading} style={{width: '100%', padding: '12px', marginTop: '10px', background: '#000', color: '#fff'}}>
        {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
      </button>
      <p style={{marginTop: '20px', textAlign: 'center'}}>
        {mode === 'signin' ? (
          <>No account? <span onClick={() => setMode('signup')} style={{color: 'blue', cursor: 'pointer'}}>Create one</span></>
        ) : (
          <>Have account? <span onClick={() => setMode('signin')} style={{color: 'blue', cursor: 'pointer'}}>Sign In</span></>
        )}
      </p>
    </div>
  )
}
