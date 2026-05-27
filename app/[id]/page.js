'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

const threadData = {
  '01': {
    num: '01',
    type: 'Legislation',
    colorClass: 'c1',
    headline: 'The Clean Water Restoration Act, Section 4(b)',
    desc: 'Introduced March 2026. Currently in committee. Affects municipal water standards across 34 states.',
    sourceLabel: 'Read the source · S. 1847 · 119th Congress',
    sourceRef: 'S. 1847 · 119th Congress · Section 4(b) · Full Text',
    sourceText: '"No municipality with a population exceeding 50,000 persons shall discharge treated effluent into any navigable waters of the United States unless such discharge meets the revised threshold standards set forth herein. Said standards shall supersede all prior municipal discharge agreements entered into before the effective date of this Act, notwithstanding any provisions to the contrary in existing consent decrees or state-level compacts..."',
    voices: 84,
    branches: 3,
    opened: '9:14 am',
    posts: [
      { id: 1, author: 'coldfront_k', days: 204, time: '9:21 am', body: ['The preemption clause in paragraph three is doing a lot of work here and I don\'t think most people are going to notice it. "Notwithstanding any provisions to the contrary in existing consent decrees" — that\'s not a technical clarification. That\'s the federal government voiding agreements that municipalities spent years negotiating with the EPA under the previous administration.', 'Whether that\'s good or bad depends entirely on how you feel about those original agreements, but let\'s at least be honest about what\'s happening.'], duel: { with: 'august_wren', count: 38 } },
      { id: 2, author: 'pellucid_one', days: 511, time: '9:34 am', body: ['Worth noting that most of those consent decrees were themselves overrides of earlier state standards. The legal history here goes back to the \'72 Clean Water Act and there have been about six rounds of federal-state preemption arguments since then. This isn\'t new territory, it just looks new if you came in recently.'] },
      { id: 3, author: 'wren_august', days: 88, time: '9:41 am', body: ['I\'m less interested in the legal history than in the 180-day implementation timeline. That\'s not enough time. A city like Pittsburgh or Cleveland would need at minimum 18 months to retrofit the relevant infrastructure to meet these standards. The bill is technically correct and practically unworkable at the same time.'] },
      { id: 4, author: 'maria_undine', days: 143, time: '10:02 am', body: ['The infrastructure argument gets made every single time there\'s an environmental regulation and it\'s always true and it\'s always used as a reason to do nothing. At some point someone has to set a deadline that makes people uncomfortable or nothing changes.'], discussion: { with: 'pellucid_one', count: 9 } },
      { id: 5, author: 'coldfront_k', days: 204, time: '10:09 am', body: ['That\'s fair but it matters who bears the cost of the discomfort. A city that can\'t afford rapid compliance doesn\'t get a waiver, it gets fines, which come out of the same municipal budget that would have funded the infrastructure upgrades. You can believe the goal is right and still think the mechanism is punishing the wrong people.'] },
      { id: 6, author: 'the_groundskeeper', days: 29, time: '10:33 am', body: ['First post here. I work in municipal water management in Ohio. The 180-day figure isn\'t arbitrary — it matches the federal fiscal cycle for infrastructure grants, which means compliant municipalities can apply for funding in the next round. The timeline is tight but it\'s designed around available money, not just a political number.', 'Whether the grant amounts are adequate is a separate question and the answer is probably no.'] },
      { id: 7, author: 'pellucid_one', days: 511, time: '10:47 am', body: ['That context is genuinely useful, thank you. Changes my read of the 180-day provision significantly. The question of grant adequacy feels like the real fight then — the mechanism might be sound and the funding might be insufficient, which is a much more tractable problem to argue about than the bill itself.'] },
      { id: 8, author: 'wren_august', days: 88, time: '11:14 am', body: ['Agreed that the_groundskeeper\'s point reframes things. Though I\'d push back slightly — even if the grant mechanism is sound, the 180-day window means municipalities that are slower to file or less administratively resourced will miss the first funding cycle. Which is often exactly the municipalities that can least afford to.'] },
    ]
  },
  '02': {
    num: '02',
    type: 'Photograph',
    colorClass: 'c2',
    headline: 'The last operator of a hand-pulled cable ferry',
    desc: 'The ferry ran for 91 years. He retired two weeks after this was taken.',
    sourceLabel: 'View photograph · James Karales · 1974',
    sourceRef: 'James Karales · Bingen, Washington · 1974',
    sourceText: 'The Bingen-White Salmon ferry was one of the last hand-pulled cable ferries in the United States. It operated across the Columbia River for 91 years before closing. The operator, whose name was never recorded in the photo\'s caption, retired shortly after this image was taken.',
    voices: 41,
    branches: 1,
    opened: '9:14 am',
    posts: [
      { id: 1, author: 'mira_sol', days: 178, time: '9:19 am', body: ['There\'s something about his hands in this photo. You can tell exactly how many years he\'s been doing this just from the way he\'s holding the cable. That kind of knowledge doesn\'t transfer — it just ends.'] },
      { id: 2, author: 'the_janitor', days: 392, time: '9:31 am', body: ['The Columbia River in 1974 was already a very different river than it had been. The dams changed everything — the salmon runs, the current, the whole character of the crossing. I wonder if he felt that.'], discussion: { with: 'mira_sol', count: 14 } },
      { id: 3, author: 'august_wren', days: 88, time: '9:48 am', body: ['What strikes me is that nobody recorded his name. The ferry gets a name, the river gets a name, the year gets recorded. The person operating it for 91 years of institutional memory just gets "the operator."'] },
      { id: 4, author: 'coldfront_k', days: 204, time: '10:04 am', body: ['There\'s a whole genre of this kind of photo — the last of something, always elegiac, always slightly exploitative. I don\'t mean that as a criticism of Karales specifically. But the framing does something to the subject. It turns a person into a symbol of ending.'] },
      { id: 5, author: 'pellucid_one', days: 511, time: '10:22 am', body: ['The Karales archive is interesting because he spent so much of his career photographing labor and civil rights. This one feels different — quieter. Like he wasn\'t trying to make a statement, just witness something before it was gone.'] },
      { id: 6, author: 'mira_sol', days: 178, time: '10:41 am', body: ['That\'s what I keep coming back to. There\'s no pathos being manufactured here. He just looks like a man doing his job on an ordinary day, which happens to be one of his last days doing it. That ordinariness is what makes it land.'] },
    ]
  },
  '03': {
    num: '03',
    type: 'Essay',
    colorClass: 'c3',
    headline: '"On the Etiquette of Disagreeing With Someone Smarter Than You"',
    desc: 'The Antioch Review, 1962. Rediscovered last month. Somehow more relevant now.',
    sourceLabel: 'Read the essay · The Antioch Review · 1962',
    sourceRef: 'The Antioch Review · 1962 · Full Text',
    sourceText: '"The disagreement that does no damage to a friendship is the one conducted as though the other person might, in fact, be right. This is not the same as believing they are right, nor as pretending to believe it. It is a quality of attention — a willingness to hold your own position loosely enough that an argument can actually move through it, rather than simply bouncing off a surface you\'ve already decided is load-bearing..."',
    voices: 57,
    branches: 2,
    opened: '9:14 am',
    posts: [
      { id: 1, author: 'pellucid_one', days: 511, time: '9:17 am', body: ['"Hold your position loosely enough that an argument can move through it" is one of the better descriptions of good faith I\'ve read. Most people treat their positions like structural walls. The essay is right that this is the problem.'] },
      { id: 2, author: 'maria_undine', days: 143, time: '9:29 am', body: ['The framing of the title bugs me a little. "Someone smarter than you" assumes the disagreement is between people of unequal intelligence, which is rarely how disagreements actually work. Usually it\'s two people of roughly equal intelligence who have access to different information or different values. That\'s a different problem.'] },
      { id: 3, author: 'coldfront_k', days: 204, time: '9:44 am', body: ['I read the title as being about perceived intelligence rather than actual intelligence — the situation where you\'re disagreeing with someone whose expertise you respect. That\'s a real and distinct social dynamic. You have to hold two things at once: my reasoning might be sound, and they might know something I don\'t.'] },
      { id: 4, author: 'the_groundskeeper', days: 29, time: '10:01 am', body: ['What the essay doesn\'t address is asymmetric stakes. The etiquette it describes works fine in philosophical conversation. It breaks down when one person has much more to lose from being wrong than the other. Equanimity about being wrong is a lot easier when being wrong doesn\'t cost you anything.'] },
      { id: 5, author: 'pellucid_one', days: 511, time: '10:18 am', body: ['That\'s fair but I think the essay is specifically about intellectual disagreement, not material disagreement. It\'s not trying to describe how to argue about something where you have skin in the game. That\'s a different essay.'] },
      { id: 6, author: 'wren_august', days: 88, time: '10:35 am', body: ['The 1962 date matters more than I initially thought. This was written during a period when public intellectual culture genuinely valued a certain kind of adversarial dialogue — the kind where you were expected to steelman the other position before attacking it. That culture is largely gone. The essay reads as a description of a lost practice as much as a prescription.'] },
      { id: 7, author: 'maria_undine', days: 143, time: '10:52 am', body: ['Or maybe the culture isn\'t gone, it just moved. Academic philosophy still works roughly this way. Some corners of the internet do too — less visibly. The essay might be describing something that was always a minority practice, not a mainstream one that was lost.'] },
    ]
  }
}

export default function Thread() {
  const params = useParams()
  const id = params.id
  const thread = threadData[id]

  const [timer, setTimer] = useState('')
  const [mediaOpen, setMediaOpen] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [cooldown, setCooldown] = useState(272)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [dbPosts, setDbPosts] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUsername, setCurrentUsername] = useState('Guest_User')

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
    if (cooldown <= 0) return
    const interval = setInterval(() => setCooldown(c => c - 1), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
  loadPosts()
}, [id])

  useEffect(() => {
  supabase.auth.getSession().then(async ({ data: { session } }) => {
    if (session?.user) {
      setCurrentUser(session.user)
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single()
      if (profile) setCurrentUsername(profile.username)
    }
  })
}, [])

async function submitPost() {
  if (!replyText.trim()) return
  const { data, error } = await supabase
    .from('posts')
    .insert({ thread_id: id, author: currentUsername, body: replyText.trim() })
    .select()
  if (!error) {
    setReplyText('')
    setOverlayOpen(false)
    loadPosts()
  }
}

async function loadPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('thread_id', id)
    .order('created_at', { ascending: true })
  if (data) setDbPosts(data)
}

  function formatCooldown() {
    if (cooldown <= 0) return 'Ready to post'
    const m = Math.floor(cooldown / 60)
    const s = cooldown % 60
    return 'You can post again in ' + m + ':' + String(s).padStart(2, '0')
  }

  if (!thread) return (
    <div style={{padding: '80px 52px', fontFamily: 'Spectral, serif'}}>
      <Link href="/">← Back to today</Link>
      <p style={{marginTop: '24px'}}>Thread not found.</p>
    </div>
  )

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
            {currentUser ? (
              <Link href={`/user/${currentUsername}`} style={{fontWeight: 500, color: 'var(--ink)'}}>{currentUsername}</Link>
            ) : (
              <>
                <Link href="/login">Sign In</Link>
                <Link href="/login">Join</Link>
              </>
            )}
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

      <div className="curator-strip">
        <span className="dim">Today curated by <strong>margarethe_v</strong> &nbsp;·&nbsp; Days active: 312 &nbsp;·&nbsp; Member since Jan 2024</span>
        <span style={{fontWeight: '500'}}>{timer}</span>
      </div>

      <div className="thread-header">
        <Link href="/" className="back-link">← Today&apos;s three</Link>
        <div>
          <div className={`thread-flag ${thread.colorClass}`}>
            <span className="thread-num">{thread.num}</span>
            <span className="thread-type">{thread.type}</span>
          </div>
        </div>
        <div className="thread-headline">{thread.headline}</div>
        <div className="thread-desc">{thread.desc}</div>

        <div className="media-preview">
          <button
            className={`media-toggle ${thread.colorClass} ${mediaOpen ? 'open' : ''}`}
            onClick={() => setMediaOpen(!mediaOpen)}
          >
            <span>{thread.sourceLabel}</span>
            <span className="arr">▼</span>
          </button>
          <div style={{padding: '0 18px'}}>
            <div className={`media-content ${thread.colorClass} ${mediaOpen ? 'visible' : ''}`}>
              <div className="doc-ref-sm">{thread.sourceRef}</div>
              {thread.sourceText}
            </div>
          </div>
        </div>

        <div className="thread-stats">
          <span><strong>{thread.voices}</strong> voices</span>
          <span><strong>{thread.branches}</strong> active branches</span>
          <span>Opened <strong>{thread.opened}</strong></span>
          <div className="extend-vote">
            <span>8 hrs 22 min remaining</span>
            <button className="vote-btn">Vote to extend</button>
          </div>
        </div>
      </div>

      <div className="posts-wrap">
        <div className="posts-well">
          {thread.posts.map((post) => (
  <div className="post" key={post.id}>
    <span className="post-num">#{post.id}</span>
    <div className="post-meta">
      <span className="post-author">{post.author}</span>
      <span className="post-dot">·</span>
      <span className="post-stats">{post.days} days active</span>
      <span className="post-time">{post.time}</span>
    </div>
    <div className="post-body">
      {post.body.map((p, j) => <p key={j}>{p}</p>)}
    </div>
    {(post.duel || post.discussion) && (
      <div className="post-branches">
        {post.duel && (
          <a className="branch-chip duel-chip" href="#">
            <span className="btype">⚔ Duel</span>
            <span>{post.duel.with}</span>
            <span className="post-dot">·</span>
            <span className="bcount">{post.duel.count}</span> exchanges
          </a>
        )}
        {post.discussion && (
          <a className="branch-chip" href="#">
            <span className="btype">Discussion</span>
            <span>+ {post.discussion.with}</span>
            <span className="post-dot">·</span>
            <span className="bcount">{post.discussion.count}</span> exchanges
          </a>
        )}
      </div>
    )}
  </div>
))}
{dbPosts.map((post, i) => (
  <div className="post" key={post.id}>
    <span className="post-num">#{thread.posts.length + i + 1}</span>
    <div className="post-meta">
      <span className="post-author">{post.author}</span>
      <span className="post-dot">·</span>
      <span className="post-stats">New member</span>
      <span className="post-time">{new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    </div>
    <div className="post-body">
      <p>{post.body}</p>
    </div>
  </div>
))}
        </div>
      </div>

      <div style={{height: '120px'}} />

      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '800px', padding: '0 52px', zIndex: 100
      }}>
        <div className="float-c-bar" onClick={() => setOverlayOpen(true)}>
          <span style={{fontFamily: "'IM Fell English', serif", fontStyle: 'italic', fontSize: '16px', color: '#7A7268'}}>
            What do you want to say?
          </span>
          <span style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2A2520'}}>
            Speak →
          </span>
        </div>
      </div>

      {overlayOpen && (
        <div
          style={{position: 'fixed', inset: 0, background: 'rgba(42,37,32,0.25)', zIndex: 300, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}
          onClick={e => { if (e.target === e.currentTarget) setOverlayOpen(false) }}
        >
          <div style={{width: '100%', maxWidth: '800px', margin: '0 auto', background: '#F2EDE3', borderRadius: '5px 5px 0 0', padding: '28px 32px', boxShadow: '0 -8px 32px rgba(42,37,32,0.15)'}}>
            <div style={{fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Helvetica Neue', sans-serif", color: '#7A7268', marginBottom: '14px'}}>
              Add your voice
            </div>
            <textarea
              autoFocus
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="What do you want to say?"
              style={{width: '100%', minHeight: '120px', padding: '16px', fontFamily: "'Spectral', serif", fontSize: '15px', lineHeight: 1.7, border: '1px solid #CEC7B8', borderRadius: '5px', background: '#FAF6EF', resize: 'none', outline: 'none', color: '#2A2520'}}
            />
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px'}}>
              <span style={{fontSize: '11px', fontFamily: "'Helvetica Neue', sans-serif", color: '#7A7268'}}>{formatCooldown()}</span>
              <div style={{display: 'flex', gap: '10px'}}>
                <button
                  onClick={() => setOverlayOpen(false)}
                  style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: '1px solid #CEC7B8', padding: '8px 18px', cursor: 'pointer', borderRadius: '3px', color: '#7A7268'}}
                >
                  Cancel
                </button>
                <button
                  onClick={submitPost}
                  style={{fontFamily: "'Helvetica Neue', sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', background: '#2A2520', color: '#F2EDE3', border: 'none', padding: '8px 22px', cursor: 'pointer', borderRadius: '3px'}}
                >
                  Speak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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