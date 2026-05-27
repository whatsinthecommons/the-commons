'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSubmitted(true)
      setLoading(false)
    }
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
          <span className="dateline">Wednesday, April 22, 2026</span>
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

      <div style={{maxWidth: '480px', margin: '64px auto', padding: '0 52px'}}>
        {!submitted ? (
          <div>
            <h2 style={{fontFamily: "'IM Fell English', serif", fontSize: '28px', fontWeight: 400, marginBottom: '12px'}}>
              Sign in
            </h2>
            <p style={{fontFamily: "'Spectral', serif", fontSize: '15px', lineHeight: 1.7, color: '#7A7268', marginBottom: '32px'}}>
              Enter your email and we&apos;ll send you a link to sign in. No password needed.
            </p>
            <div style={{marginBottom: '16px'}}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="your@email.com"
                style={{width: '100%', padding: '12px 16px', fontFamily: "'Spectral', serif", fontSize: '15px', border: '1px solid #CEC7B8', borderRadius: '5px', background: '#FAF6EF', outline: 'none', color: '#2A2520'}}
              />
            </div>
            {error && (
              <p style={{color: '#8B1A1A', fontSize: '13px', fontFamily: "'Spectral', serif", marginBottom: '12px'}}>{error}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{width: '100%', padding: '12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', background: '#2A2520', color: '#F2EDE3', border: 'none', borderRadius: '5px', cursor: 'pointer', opacity: loading ? 0.6 : 1}}
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
            <p style={{marginTop: '24px', fontSize: '13px', fontFamily: "'Spectral', serif", color: '#7A7268', textAlign: 'center'}}>
              New here? Signing in will create your account.
            </p>
          </div>
        ) : (
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontFamily: "'IM Fell English', serif", fontSize: '28px', fontWeight: 400, marginBottom: '16px'}}>
              Check your email
            </h2>
            <p style={{fontFamily: "'Spectral', serif", fontSize: '15px', lineHeight: 1.7, color: '#7A7268'}}>
              We sent a link to <strong style={{color: '#2A2520'}}>{email}</strong>. Click it to sign in.
            </p>
            <p style={{fontFamily: "'Spectral', serif", fontSize: '13px', color: '#7A7268', marginTop: '16px'}}>
              You can close this tab.
            </p>
          </div>
        )}
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