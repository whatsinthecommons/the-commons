'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Onboarding() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [songQuery, setSongQuery] = useState('')
  const [songResults, setSongResults] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login')
      else {
        setUser(user)
        // Check if already has profile
        supabase.from('profiles').select('*').eq('id', user.id).single()
          .then(({ data }) => {
            if (data) router.push('/')
          })
      }
    })
  }, [])

  async function searchSongs() {
    if (!songQuery.trim()) return
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(songQuery)}&media=music&limit=6`)
    const data = await res.json()
    setSongResults(data.results)
  }

  async function handleSubmit() {
    if (!username.trim()) return
    setLoading(true)
    setError('')

    const { error } = await supabase.from('profiles').insert({
      id: user.id,
      username: username.trim(),
      song_title: selectedSong?.trackName || null,
      song_artist: selectedSong?.artistName || null,
      song_album: selectedSong?.collectionName || null,
      song_art_url: selectedSong?.artworkUrl100?.replace('100x100', '300x300') || null,
    })

    if (error) {
      setError(error.message.includes('unique') ? 'That username is taken.' : error.message)
      setLoading(false)
    } else {
      router.push('/')
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
        <span style={{opacity: 0.6, fontSize: '11px'}}>Set up your profile</span>
      </div>

      <div style={{maxWidth: '520px', margin: '64px auto', padding: '0 52px'}}>

        {step === 1 && (
          <div>
            <h2 style={{fontFamily: "'IM Fell English', serif", fontSize: '28px', fontWeight: 400, marginBottom: '12px'}}>
              Choose your name
            </h2>
            <p style={{fontFamily: "'Spectral', serif", fontSize: '15px', lineHeight: 1.7, color: '#7A7268', marginBottom: '16px'}}>
              This is how you&apos;ll appear in every conversation on The Commons.
            </p>
            <div style={{background: '#F3EBE7', border: '1px solid #C4A090', borderRadius: '5px', padding: '12px 16px', marginBottom: '32px'}}>
              <p style={{fontFamily: "'Spectral', serif", fontSize: '14px', lineHeight: 1.6, color: '#6B3A2A'}}>
                <strong>Choose carefully.</strong> Your username is permanent and cannot be changed. It will be attached to everything you say, now and in the future.
              </p>
            </div>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
              placeholder="your_name"
              style={{width: '100%', padding: '12px 16px', fontFamily: "'Spectral', serif", fontSize: '15px', border: '1px solid #CEC7B8', borderRadius: '5px', background: '#FAF6EF', outline: 'none', color: '#2A2520', marginBottom: '16px'}}
            />
            <button
              onClick={() => username.trim() && setStep(2)}
              style={{width: '100%', padding: '12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', background: '#2A2520', color: '#F2EDE3', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{fontFamily: "'IM Fell English', serif", fontSize: '28px', fontWeight: 400, marginBottom: '12px'}}>
              Pick a song
            </h2>
            <p style={{fontFamily: "'Spectral', serif", fontSize: '15px', lineHeight: 1.7, color: '#7A7268', marginBottom: '32px'}}>
              One song that says something about you. It&apos;ll live on your profile.
            </p>

            <div style={{display: 'flex', gap: '8px', marginBottom: '20px'}}>
              <input
                type="text"
                value={songQuery}
                onChange={e => setSongQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && searchSongs()}
                placeholder="Search for a song..."
                style={{flex: 1, padding: '12px 16px', fontFamily: "'Spectral', serif", fontSize: '15px', border: '1px solid #CEC7B8', borderRadius: '5px', background: '#FAF6EF', outline: 'none', color: '#2A2520'}}
              />
              <button
                onClick={searchSongs}
                style={{padding: '12px 20px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', background: '#2A2520', color: '#F2EDE3', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
              >
                Search
              </button>
            </div>

            {songResults.length > 0 && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px'}}>
                {songResults.map(song => (
                  <div
                    key={song.trackId}
                    onClick={() => setSelectedSong(song)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 14px', border: `1px solid ${selectedSong?.trackId === song.trackId ? '#2A2520' : '#CEC7B8'}`,
                      borderRadius: '5px', cursor: 'pointer', background: selectedSong?.trackId === song.trackId ? '#F0EBE0' : '#FAF6EF',
                      transition: 'all 0.15s'
                    }}
                  >
                    <img src={song.artworkUrl100} alt={song.collectionName} style={{width: '44px', height: '44px', borderRadius: '3px'}} />
                    <div>
                      <div style={{fontFamily: "'Spectral', serif", fontSize: '14px', color: '#2A2520', fontWeight: 500}}>{song.trackName}</div>
                      <div style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', color: '#7A7268', marginTop: '2px'}}>{song.artistName} · {song.collectionName}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedSong && (
              <div style={{padding: '12px 16px', background: '#E8E2D6', borderRadius: '5px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
                <img src={selectedSong.artworkUrl100} alt={selectedSong.collectionName} style={{width: '40px', height: '40px', borderRadius: '3px'}} />
                <div>
                  <div style={{fontFamily: "'Spectral', serif", fontSize: '13px', color: '#2A2520'}}>Selected: <strong>{selectedSong.trackName}</strong></div>
                  <div style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', color: '#7A7268'}}>{selectedSong.artistName}</div>
                </div>
              </div>
            )}

            {error && (
              <p style={{color: '#8B1A1A', fontSize: '13px', fontFamily: "'Spectral', serif", marginBottom: '12px'}}>{error}</p>
            )}

            <div style={{display: 'flex', gap: '10px'}}>
              <button
                onClick={() => setStep(1)}
                style={{flex: 1, padding: '12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', color: '#7A7268', border: '1px solid #CEC7B8', borderRadius: '5px', cursor: 'pointer'}}
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{flex: 2, padding: '12px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', background: '#2A2520', color: '#F2EDE3', border: 'none', borderRadius: '5px', cursor: 'pointer', opacity: loading ? 0.6 : 1}}
              >
                {loading ? 'Saving...' : 'Enter the Commons →'}
              </button>
            </div>
            <p
              onClick={handleSubmit}
              style={{textAlign: 'center', marginTop: '16px', fontSize: '13px', fontFamily: "'Spectral', serif", color: '#7A7268', cursor: 'pointer', textDecoration: 'underline'}}
            >
              Skip for now
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