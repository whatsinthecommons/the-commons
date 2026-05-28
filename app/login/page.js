'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function Login() {
  const [loading, setLoading] = useState(false)

  async function handleGoogle() {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <>
      <header>
        <div className="header-top">
          <nav className="header-nav">
            <a href="#">Archive</a>
            <a href="#">About</a>
            <a href="#">Curate</a>
          </nav>
          <span className="dateline">{new Date().toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</span>
          <nav className="header-nav">
            <Link href="/">Home</Link>
          </nav>
        </div>
        <div className="masthead">
          <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <h1>The Commons</h1>
          </Link>
          <div className="masthead-rule"></div>
          <div className="masthead-quote-wrap">
            <span className="masthead-quote">&ldquo;The question is not what you look at, but what you see.&rdquo;</span>
            <span className="masthead-attribution">— Henry David Thoreau</span>
          </div>
        </div>
      </header>

      <div className="curator-strip" style={{justifyContent: 'center'}}>
        <span style={{opacity: 0.6, fontSize: '11px'}}>Join the conversation</span>
      </div>

      <div style={{maxWidth: '480px', margin: '80px auto', padding: '0 52px', textAlign: 'center'}}>
        <h2 style={{fontFamily: "'IM Fell English', serif", fontSize: '32px', fontWeight: 400, marginBottom: '12px'}}>
          Sign in
        </h2>
        <p style={{fontFamily: "'Spectral', serif", fontSize: '15px', lineHeight: 1.7, color: '#7A7268', marginBottom: '40px'}}>
          Join the conversation. One account, every day.
        </p>

        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            width: '100%', padding: '14px 24px',
            background: '#FAF6EF', border: '1px solid #CEC7B8', borderRadius: '5px',
            cursor: 'pointer', transition: 'all 0.15s',
            fontFamily: "'Helvetica Neue', sans-serif", fontSize: '13px',
            letterSpacing: '0.06em', color: '#2A2520',
            opacity: loading ? 0.6 : 1
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Redirecting...' : 'Continue with Google'}
        </button>

        <p style={{marginTop: '24px', fontSize: '12px', fontFamily: "'Spectral', serif", color: '#7A7268', fontStyle: 'italic'}}>
          New here? Signing in will create your account.
        </p>
      </div>

      <footer>
        <div>The Commons &nbsp;·&nbsp; Est. 2026</div>
        <div className="footer-links">
          <a href="#">Archive</a>
          <a href="#">Guidelines</a>
          <a href="#">Become a Curator</a>
        </div>
      </footer>
    </>
  )
}