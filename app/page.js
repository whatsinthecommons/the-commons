'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'


export default function Home() {
  const [branchesOpen, setBranchesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [timer, setTimer] = useState('')
  const [currentUsername, setCurrentUsername] = useState(null)

  useEffect(() => {
    function updateTimer() {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight - now
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimer('Resets in ' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'))
    }
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
  supabase.auth.getSession().then(async ({ data: { session } }) => {
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single()
      if (profile) setCurrentUsername(profile.username)
    }
  })
}, [])

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
  {currentUsername ? (
    <Link href={`/user/${currentUsername}`} style={{fontWeight: 500, color: 'var(--ink)', textDecoration: 'none'}}>{currentUsername}</Link>
  ) : (
    <>
      <Link href="/login" style={{color: 'var(--muted)', textDecoration: 'none'}}>Sign In</Link>
      <Link href="/login" style={{fontWeight: 500, color: 'var(--ink)', textDecoration: 'none'}}>Join</Link>
    </>
  )}
</nav>
        </div>
        <div className="masthead">
          <h1>The Commons</h1>
          <div className="masthead-rule"></div>
          <div className="masthead-quote-wrap">
            <span className="masthead-quote">&ldquo;The question is not what you look at, but what you see.&rdquo;</span>
            <span className="masthead-attribution">— Henry David Thoreau</span>
          </div>
        </div>
      </header>

      <div className="curator-strip">
        <span className="dim">Today curated by <strong>margarethe_v</strong> &nbsp;·&nbsp; Days active: 312 &nbsp;·&nbsp; Member since Jan 2024</span>
        <span style={{fontWeight: '500'}}>{timer}</span>
      </div>

      <main>
        <div className="section-label">Today</div>

        <div className="cards">

          <Link href="/01" className="card c1" style={{textDecoration:'none',color:'inherit'}}>
            <div className="card-flag">
              <span className="card-num">01</span>
              <span className="card-type">Legislation</span>
            </div>
            <div className="doc-media">
              <div className="doc-ref">S. 1847 &nbsp;·&nbsp; 119th Congress &nbsp;·&nbsp; Full Text</div>
              <div className="doc-excerpt">&ldquo;...No municipality with a population exceeding 50,000 shall discharge treated effluent into navigable waters unless such discharge meets the revised threshold standards set forth in Section 4(b)...&rdquo;</div>
            </div>
            <div className="card-body">
              <div className="card-headline">The Clean Water Restoration Act, Section 4(b)</div>
              <div className="card-desc">Introduced March 2026. Currently in committee. Affects municipal water standards across 34 states.</div>
              <div className="card-footer">
                <div className="post-count"><strong>84</strong> voices</div>
              </div>
            </div>
          </Link>

          <Link href="/02" className="card c2" style={{textDecoration:'none',color:'inherit'}}>
            <div className="card-flag">
              <span className="card-num">02</span>
              <span className="card-type">Photograph</span>
            </div>
            <div className="photo-media">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Biharwe_landscape.jpg/1280px-Biharwe_landscape.jpg" alt="Ferry operator, Bingen WA, 1974" />
              <div className="photo-caption">James Karales &nbsp;·&nbsp; Bingen, Washington &nbsp;·&nbsp; 1974</div>
            </div>
            <div className="card-body">
              <div className="card-headline">The last operator of a hand-pulled cable ferry</div>
              <div className="card-desc">The ferry ran for 91 years. He retired two weeks after this was taken.</div>
              <div className="card-footer">
                <div className="post-count"><strong>41</strong> voices</div>
              </div>
            </div>
          </Link>

          <Link href="/03" className="card c3" style={{textDecoration:'none',color:'inherit'}}>
            <div className="card-flag">
              <span className="card-num">03</span>
              <span className="card-type">Essay</span>
            </div>
            <div className="quote-media">
              <blockquote>&ldquo;The disagreement that does no damage to a friendship is the one conducted as though the other person might, in fact, be right.&rdquo;</blockquote>
            </div>
            <div className="card-body">
              <div className="card-headline">&ldquo;On the Etiquette of Disagreeing With Someone Smarter Than You&rdquo;</div>
              <div className="card-desc">The Antioch Review, 1962. Rediscovered last month. Somehow more relevant now.</div>
              <div className="card-footer">
                <div className="post-count"><strong>57</strong> voices</div>
              </div>
            </div>
          </Link>

        </div>

        <div className="bottom-bar">
          <button
            className={`toggle-btn ${branchesOpen ? 'active' : ''}`}
            onClick={() => setBranchesOpen(!branchesOpen)}
          >
            Active branches &nbsp;<span className="arrow">▼</span>
          </button>
          <button
            className={`toggle-btn ${aboutOpen ? 'active' : ''}`}
            onClick={() => setAboutOpen(!aboutOpen)}
          >
            What is this? &nbsp;<span className="arrow">▼</span>
          </button>
        </div>

        <div className={`collapsible ${branchesOpen ? 'open' : ''}`}>
          <div className="activity-strip">
            <div className="activity-header">Live now — ongoing duels &amp; discussions</div>
            <div className="branches">
              <div className="branch-item">
                <span className="branch-slot bs1">#1</span>
                <span className="branch-tag">Duel</span>
                <span className="branch-participants">coldfront_k vs. august_wren</span>
                <span className="branch-excerpt">&nbsp;·&nbsp; &ldquo;The preemption clause makes your reading impossible on its face...&rdquo;</span>
                <span className="branch-count"><strong>38</strong> exchanges</span>
              </div>
              <div className="branch-item">
                <span className="branch-slot bs2">#2</span>
                <span className="branch-tag">Discussion</span>
                <span className="branch-participants">mira_sol + the_janitor</span>
                <span className="branch-excerpt">&nbsp;·&nbsp; &ldquo;I keep coming back to what his hands look like in the photo...&rdquo;</span>
                <span className="branch-count"><strong>14</strong> exchanges</span>
              </div>
              <div className="branch-item">
                <span className="branch-slot bs3">#3</span>
                <span className="branch-tag">Duel</span>
                <span className="branch-participants">3 vs. pellucid_one</span>
                <span className="branch-excerpt">&nbsp;·&nbsp; &ldquo;You&apos;re confusing deference with cowardice, which is the entire point of the essay&rdquo;</span>
                <span className="branch-count"><strong>22</strong> exchanges</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`collapsible ${aboutOpen ? 'open' : ''}`}>
          <div className="about-panel">
            <div className="about-block">
              <h3>What this is</h3>
              <p>Three pieces of media, chosen together, every day. Everyone sees the same things. Threads open for 24 hours, then lock and become part of the archive.</p>
            </div>
            <div className="about-block">
              <h3>How it works</h3>
              <p>Dive into a thread, read before you speak, add your voice. Challenge a specific post to open a branch — a duel or a discussion — that others can follow.</p>
            </div>
            <div className="about-block">
              <h3>Who&apos;s here</h3>
              <p>Pseudonymous regulars. Rotating guest curators. No follower counts, no algorithms. Just people thinking about the same things at the same time.</p>
            </div>
          </div>
        </div>

      </main>

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