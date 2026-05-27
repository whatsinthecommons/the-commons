'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function Profile() {
  const params = useParams()
  const username = params.username
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [username])

  async function loadProfile() {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (profileData) {
      setProfile(profileData)
      const { data: postsData } = await supabase
        .from('posts')
        .select('*')
        .eq('author', username)
        .order('created_at', { ascending: false })
      setPosts(postsData || [])
    }
    setLoading(false)
  }

  if (loading) return (
    <div style={{padding: '80px 52px', fontFamily: 'Spectral, serif', color: '#7A7268'}}>
      Loading...
    </div>
  )

  if (!profile) return (
    <div style={{padding: '80px 52px', fontFamily: 'Spectral, serif'}}>
      <Link href="/">← Back</Link>
      <p style={{marginTop: '24px', color: '#7A7268'}}>Profile not found.</p>
    </div>
  )

  const joinDate = new Date(profile.joined_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

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
        <span style={{opacity: 0.6, fontSize: '11px'}}>Member profile</span>
      </div>

      <div style={{maxWidth: '680px', margin: '0 auto', padding: '48px 52px 80px'}}>

        {/* PROFILE HEADER */}
        <Link href="/" style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7268', textDecoration: 'none', display: 'inline-block', marginBottom: '32px'}}>
          ← Today&apos;s three
        </Link>

        <div style={{borderBottom: '1px solid #DDD7CB', paddingBottom: '32px', marginBottom: '32px'}}>
          <h2 style={{fontFamily: "'IM Fell English', serif", fontSize: '36px', fontWeight: 400, marginBottom: '10px'}}>
            {profile.username}
          </h2>
          <div style={{display: 'flex', gap: '20px', fontFamily: "'Helvetica Neue', sans-serif", fontSize: '12px', color: '#7A7268', letterSpacing: '0.06em', marginBottom: '28px'}}>
            <span>Joined {joinDate}</span>
            <span>·</span>
            <span>{profile.days_active} days active</span>
            <span>·</span>
            <span>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
          </div>

          {/* SONG */}
          {profile.song_title && (
            <div style={{display: 'flex', alignItems: 'center', gap: '14px', background: '#FAF6EF', border: '1px solid #DDD7CB', borderRadius: '5px', padding: '12px 16px', maxWidth: '360px'}}>
              {profile.song_art_url && (
                <img src={profile.song_art_url} alt={profile.song_album} style={{width: '52px', height: '52px', borderRadius: '4px', flexShrink: 0}} />
              )}
              <div>
                <div style={{fontFamily: "'Spectral', serif", fontSize: '11px', color: '#7A7268', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px'}}>Their song</div>
                <div style={{fontFamily: "'IM Fell English', serif", fontSize: '16px', color: '#2A2520'}}>{profile.song_title}</div>
                <div style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', color: '#7A7268', marginTop: '2px'}}>{profile.song_artist}</div>
              </div>
            </div>
          )}
        </div>

        {/* POST HISTORY */}
        <div style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7A7268', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span>Contributions</span>
          <div style={{flex: 1, height: '1px', background: '#DDD7CB'}}></div>
        </div>

        {posts.length === 0 ? (
          <p style={{fontFamily: "'Spectral', serif", fontSize: '15px', color: '#7A7268', fontStyle: 'italic'}}>
            No posts yet.
          </p>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
            {posts.map((post, i) => (
              <div key={post.id} style={{padding: '20px 0', borderBottom: '1px solid #DDD7CB'}}>
                <div style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', color: '#7A7268', marginBottom: '8px', display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{background: '#E8E2D6', padding: '2px 8px', borderRadius: '3px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase'}}>
                    Thread #{post.thread_id}
                  </span>
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                </div>
                <p style={{fontFamily: "'Spectral', serif", fontSize: '14px', lineHeight: 1.75, color: '#2A2520'}}>{post.body}</p>
              </div>
            ))}
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