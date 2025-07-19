import { useState, useRef, useEffect } from 'react';

function App() {
  // # STATE MANAGEMENT
  // Newsletter form state for hero section
  const [emailHero, setEmailHero] = useState('');
  const [newsletterStatusHero, setNewsletterStatusHero] = useState(null);
  // Newsletter form state for CTA section  
  const [emailCTA, setEmailCTA] = useState('');
  const [newsletterStatusCTA, setNewsletterStatusCTA] = useState(null);
  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);
  // Scroll animation state for CTA section
  const [ctaVisible, setCtaVisible] = useState(false);
  const ctaRef = useRef(null);

  // # SCROLL ANIMATION EFFECT
  // Handles fade-in animation for CTA section when scrolling into view
  useEffect(() => {
    const handleScroll = () => {
      if (ctaRef.current) {
        const rect = ctaRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setCtaVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // # FORM HANDLERS
  // Handles newsletter submission for hero section
  const handleNewsletterSubmitHero = async (e) => {
    e.preventDefault();
    setNewsletterStatusHero('loading');
    try {
      const res = await fetch('https://kieuai-api.onrender.com/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailHero }),
      });
      const data = await res.json();
      setNewsletterStatusHero(data.message || 'Signed up successfully!');
      setEmailHero('');
    } catch {
      setNewsletterStatusHero('An error occurred, please try again.');
    }
  };

  // Handles newsletter submission for CTA section
  const handleNewsletterSubmitCTA = async (e) => {
    e.preventDefault();
    setNewsletterStatusCTA('loading');
    try {
      const res = await fetch('https://kieuai-api.onrender.com/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailCTA }),
      });
      const data = await res.json();
      setNewsletterStatusCTA(data.message || 'Signed up successfully!');
      setEmailCTA('');
    } catch {
      setNewsletterStatusCTA('An error occurred, please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-dark-purple)] flex flex-col scroll-smooth">
      {/* # HEADER NAVIGATION */}
      <header className="w-full flex items-center justify-between px-4 py-4 max-w-7xl mx-auto relative">
        {/* Logo section with gradient icon */}
        <div className="flex items-center gap-3">
          <span className="material-icons text-3xl" style={{
            background: 'linear-gradient(90deg, #b39ddb 0%, #d1b3ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}>spa</span>
          <span className="text-2xl font-bold text-white">Kieu AI</span>
        </div>
        {/* Desktop navigation links */}
        <nav className="hidden md:flex gap-12 text-base font-medium">
          <a href="#features" className="text-gray-200 hover:text-[var(--color-lilac-400)] transition">Features</a>
          <a href="#cta" className="text-gray-200 hover:text-[var(--color-lilac-400)] transition">Get Started</a>
        </nav>
        {/* Mobile hamburger menu button */}
        <button className="md:hidden flex items-center justify-center p-2 rounded" style={{ background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)' }} onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="32" height="32" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        {/* Mobile menu overlay with sliding drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-40">
            {/* Backdrop for mobile menu */}
            <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setMenuOpen(false)}></div>
            {/* Sliding drawer menu */}
            <div className="fixed top-0 left-0 h-full w-64" style={{ background: '#12131c', boxShadow: '0 0 24px 0 rgba(0,0,0,0.2)' }}>
              <div className="flex flex-col h-full">
                {/* Mobile menu header with logo and close button */}
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-2xl font-bold text-white">Kieu AI</span>
                  <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="ml-2 rounded" style={{ background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)' }}>
                    <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
                  </button>
                </div>
                {/* Mobile menu navigation links */}
                <nav className="flex flex-col gap-6 px-6 py-8">
                  <a href="#features" className="text-lg text-gray-200 hover:text-[var(--color-lilac-400)] transition" onClick={() => setMenuOpen(false)}>Features</a>
                  <a href="#cta" className="text-lg text-gray-200 hover:text-[var(--color-lilac-400)] transition" onClick={() => setMenuOpen(false)}>Get Started</a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* # HERO SECTION */}
      <section className="flex-1 flex items-center justify-center w-full pb-8">
        <div className="w-full max-w-7xl px-4 flex flex-col md:flex-row items-center gap-16 mx-auto">
          {/* Left column: Headline, subheadline, and newsletter form */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-start justify-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[var(--color-lilac-400)] to-[var(--color-lilac-500)] bg-clip-text text-transparent">Speak Vietnamese</span>
              <span className="text-white"> with Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
            Stuck finding the right words? Get instant help with pronunciation and grammar.
            </p>
            {/* Hero newsletter signup form */}
            <form className="flex flex-col sm:flex-row gap-3 mb-3 w-full" onSubmit={handleNewsletterSubmitHero}>
              <input
                type="email"
                placeholder="Enter your email for early access"
                value={emailHero}
                onChange={e => setEmailHero(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg border border-[#7e57c2] bg-[#ebecf2] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-lilac-400)] shadow"
              />
              <button type="submit" className="px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 hover:brightness-110 duration-200"
                style={{ background: 'var(--color-lilac-500)', color: 'white' }}
              >Get Started</button>
            </form>
            {/* Form submission status message */}
            {newsletterStatusHero && (
              <div style={{ background: '#23263a', borderRadius: '0.5rem', padding: '0.5rem 1rem', marginBottom: '0.5rem', color: newsletterStatusHero === 'loading' ? 'var(--color-lilac-400)' : newsletterStatusHero.includes('successfully') ? '#4ade80' : '#f87171' }}>
                {newsletterStatusHero === 'loading' ? 'Sending...' : newsletterStatusHero}
              </div>
            )}
            {/* Privacy notice */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
              <span className="material-icons text-base">lock</span>
              Your email is secure. We don't share your information.
            </div>
          </div>
          {/* Right column: Interactive app preview chat box */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div
              className="transition-transform duration-500"
              style={{
                perspective: '1200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 3D rotating chat interface */}
              <div
                className="rounded-3xl p-8 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--color-lilac-700), var(--color-lilac-400))',
                  transform: 'rotateY(-12deg) rotateX(6deg)',
                  transition: 'transform 0.5s cubic-bezier(.25,.8,.25,1)',
                  willChange: 'transform',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(-12deg) rotateX(6deg)'}
              >
                <div className="flex flex-col gap-3">
                  {/* Chat header with app name and status */}
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span className="material-icons text-3xl" style={{
                      background: 'linear-gradient(90deg, #b39ddb 0%, #d1b3ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}>spa</span>
                    Kieu AI
                    <span className="ml-auto text-xs text-gray-200">Now</span>
                  </div>
                  {/* AI message bubble */}
                  <div className="bg-[#23263a] rounded-lg p-3 text-gray-200 text-base self-start mb-2 max-w-[80%]">
                    Xin chào! Hãy nói "Tôi muốn học tiếng Việt"
                    <div className="text-xs text-gray-400 mt-1">Hello! Please say "I want to learn Vietnamese"</div>
                  </div>
                  {/* User message bubble */}
                  <div className="flex flex-col items-end mb-2 max-w-[80%] self-end">
                    <div className="bg-[#35384a] rounded-lg p-3 text-white text-base relative">
                      <span className="absolute left-3 top-2 text-xs text-gray-400 font-normal">You said:</span>
                      <span className="block mt-5">"Tôi muốn học tiếng Việt"</span>
                    </div>
                  </div>
                  {/* AI response bubble */}
                  <div className="bg-transparent border border-[var(--color-lilac-400)] rounded-lg p-3 text-gray-300 text-base self-start mt-2 max-w-[80%]">
                    Great! Let's try something more challenging...
                  </div>
                </div>
                {/* Microphone button */}
                <button className="mx-auto mt-6 rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg transition transform hover:scale-110 hover:brightness-110 duration-200"
                  style={{ background: 'var(--color-lilac-500)', color: 'white' }}>
                  <span className="material-icons">mic</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* # FEATURES SECTION */}
      <section id="features" className="py-24 w-full" style={{ background: 'var(--color-mid-purple)' }}>
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-14">Here's what makes us different</h2>
          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Grammar Correction feature card */}
            <div className="rounded-2xl shadow-lg p-8 flex flex-col items-start border-2 border-[#7e57c2] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ede7f6 0%, #e3e0f7 100%)' }}>
              <span className="material-icons text-3xl mb-4" style={{
                background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>record_voice_over</span>
              <span className="text-xl font-bold text-black mb-2">Grammar Correction</span>
              <span className="text-gray-600">Instant feedback on your Vietnamese mistakes. No more wondering if you're saying it right.</span>
            </div>
            {/* Learn Anytime feature card */}
            <div className="rounded-2xl shadow-lg p-8 flex flex-col items-start border-2 border-[#7e57c2] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ede7f6 0%, #e3e0f7 100%)' }}>
              <span className="material-icons text-3xl mb-4" style={{
                background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>event_available</span>
              <span className="text-xl font-bold text-black mb-2">Learn Anytime, Anywhere</span>
              <span className="text-gray-600">Practice anytime. Your AI tutor is always on and ready when you are.</span>
            </div>
            {/* Real Conversations feature card */}
            <div className="rounded-2xl shadow-lg p-8 flex flex-col items-start border-2 border-[#7e57c2] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ede7f6 0%, #e3e0f7 100%)' }}>
              <span className="material-icons text-3xl mb-4" style={{
                background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>forum</span>
              <span className="text-xl font-bold text-black mb-2">Real Conversations</span>
              <span className="text-gray-600">Speak how you actually talk. Build confidence through real, everyday dialogue.</span>
            </div>
            {/* Roleplays feature card */}
            <div className="rounded-2xl shadow-lg p-8 flex flex-col items-start border-2 border-[#7e57c2] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ede7f6 0%, #e3e0f7 100%)' }}>
              <span className="material-icons text-3xl mb-4" style={{
                background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>theater_comedy</span>
              <span className="text-xl font-bold text-black mb-2">Real-World Roleplays</span>
              <span className="text-gray-600">Still defaulting to "con"? Practice useful situations: Ordering food, chatting with family, or meeting new people.</span>
            </div>
            {/* Structured Lessons feature card */}
            <div className="rounded-2xl shadow-lg p-8 flex flex-col items-start border-2 border-[#7e57c2] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ede7f6 0%, #e3e0f7 100%)' }}>
              <span className="material-icons text-3xl mb-4" style={{
                background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>menu_book</span>
              <span className="text-xl font-bold text-black mb-2">Structured Lessons</span>
              <span className="text-gray-600">Follow a clear, step-by-step path from understanding to speaking with confidence.</span>
            </div>
            {/* Vocabulary Tools feature card */}
            <div className="rounded-2xl shadow-lg p-8 flex flex-col items-start border-2 border-[#7e57c2] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #ede7f6 0%, #e3e0f7 100%)' }}>
              <span className="material-icons text-3xl mb-4" style={{
                background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>translate</span>
              <span className="text-xl font-bold text-black mb-2">Vocabulary Tools</span>
              <span className="text-gray-600">Learn words you'll use with family and friends. Built-in flashcards reinforce what sticks.</span>
            </div>
          </div>
        </div>
      </section>

      {/* # Newsletter */}
      <section id="cta" className="py-24 w-full" style={{ background: 'var(--color-mid-purple)' }}>
        <div
          ref={ctaRef}
          className={`w-full max-w-3xl px-4 mx-auto text-center transition-all duration-1000 ease-in-out ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Ready to start speaking?</h2>
          {/* CTA card with newsletter form */}
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center border-2 border-[#7e57c2]" style={{ background: 'linear-gradient(135deg, #ede7f6 0%, #e3e0f7 100%)' }}>
            <p className="text-lg text-black mb-6">Be among the first to try our AI Vietnamese tutor. Join the waitlist.</p>
            {/* CTA newsletter signup form */}
            <form className="flex flex-col sm:flex-row gap-3 mb-4 w-full justify-center" onSubmit={handleNewsletterSubmitCTA}>
              <input
                type="email"
                placeholder="Enter your email for early access"
                value={emailCTA}
                onChange={e => setEmailCTA(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg border border-[#7e57c2] bg-[#ebecf2] text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-lilac-400)] shadow"
              />
              <button type="submit" className="px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 hover:brightness-110 duration-200"
                style={{ background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)', color: 'white' }}
              >Get Early Access</button>
            </form>
            {/* CTA form submission status message */}
            {newsletterStatusCTA && (
              <div style={{ background: '#23263a', borderRadius: '0.5rem', padding: '0.5rem 1rem', marginBottom: '0.5rem', color: newsletterStatusCTA === 'loading' ? 'var(--color-lilac-400)' : newsletterStatusCTA.includes('successfully') ? '#4ade80' : '#f87171' }}>
                {newsletterStatusCTA === 'loading' ? 'Sending...' : newsletterStatusCTA}
              </div>
            )}
            {/* Benefits list with gradient checkmarks */}
            <div className="flex flex-wrap gap-4 justify-center text-sm text-black mb-4">
              <span><span style={{background: 'linear-gradient(90deg, #5e35b1 0%, #7e57c2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>✔</span> Early access to all features</span>
              <span><span style={{background: 'linear-gradient(90deg, #5e35b1 0%, #7e57c2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>✔</span> Exclusive beta tester benefits</span>
              <span><span style={{background: 'linear-gradient(90deg, #5e35b1 0%, #7e57c2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent'}}>✔</span> Influence future development</span>
            </div>
          </div>
        </div>
      </section>

      {/* # FAQ SECTION */}
      <section className="py-24 w-full" style={{ background: 'var(--color-dark-purple)' }}>
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-14">Frequently Asked Questions</h2>
          {/* FAQ cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ card 1: Free tier */}
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border-2 border-[#5e35b1] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #7e57c2 0%, #9575cd 100%)' }}>
              <strong className="text-white text-lg">Is Kieu AI free?</strong>
              <p className="text-gray-300 mt-2">Yes, you can try it for free with basic features.</p>
            </div>
            {/* FAQ card 2: Pronunciation */}
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border-2 border-[#5e35b1] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #7e57c2 0%, #9575cd 100%)' }}>
              <strong className="text-white text-lg">How can I improve my pronunciation?</strong>
              <p className="text-gray-300 mt-2">Kieu AI provides instant pronunciation feedback and correction tips.</p>
            </div>
            {/* FAQ card 3: Beginners */}
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border-2 border-[#5e35b1] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #7e57c2 0%, #9575cd 100%)' }}>
              <strong className="text-white text-lg">Is it suitable for beginners?</strong>
              <p className="text-gray-300 mt-2">Absolutely! Kieu AI has a learning path for every level.</p>
            </div>
            {/* FAQ card 4: App download */}
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border-2 border-[#5e35b1] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #7e57c2 0%, #9575cd 100%)' }}>
              <strong className="text-white text-lg">Do I need to download an app?</strong>
              <p className="text-gray-300 mt-2">No, you can learn directly on the website anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* # FOOTER */}
      <footer className="w-full py-10 px-4" style={{ background: 'var(--color-dark-purple)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Footer logo */}
          <div className="flex items-center gap-2 text-white text-lg font-bold">
            <span className="material-icons text-2xl" style={{ color: 'var(--color-lilac-400)' }}>spa</span>
            Kieu AI
          </div>
          {/* Footer navigation links */}
          <nav className="flex flex-row flex-nowrap gap-3 justify-center items-center text-xs text-white overflow-x-auto">
            <a href="#features" className="text-white hover:text-[var(--color-lilac-400)] transition whitespace-nowrap">Features</a>
            <a href="#cta" className="text-white hover:text-[var(--color-lilac-400)] transition whitespace-nowrap">Get Started</a>
            <a href="#" className="text-white hover:text-[var(--color-lilac-400)] transition whitespace-nowrap">Privacy Policy</a>
            <a href="#" className="text-white hover:text-[var(--color-lilac-400)] transition whitespace-nowrap">Terms of Service</a>
          </nav>
        </div>
        {/* Copyright notice */}
        <div className="text-center text-gray-500 text-[11px] mt-6">© {new Date().getFullYear()} Kieu AI. All rights reserved.</div>
      </footer>
      {/* Bottom decorative strip */}
      <div style={{ background: 'var(--color-dark-purple)', height: '28px', width: '100%' }}></div>
      
      {/* # SCROLL TO TOP BUTTON */}
      <button
        className="fixed right-6 bottom-6 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:brightness-110 transition"
        style={{ background: 'linear-gradient(90deg, #7e57c2 0%, #9575cd 100%)' }}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
}

export default App;
