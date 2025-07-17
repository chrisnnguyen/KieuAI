import { useState } from 'react';

function App() {
  // Newsletter form state
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    try {
      const res = await fetch('http://127.0.0.1:8000/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setNewsletterStatus(data.message || 'Signed up successfully!');
      setEmail('');
    } catch {
      setNewsletterStatus('An error occurred, please try again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-dark-purple)] flex flex-col scroll-smooth">
      {/* Header Navigation */}
      <header className="w-full flex flex-col md:flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          {/* You can add a logo here if desired */}
          <span className="text-2xl font-bold" style={{ color: 'var(--color-lilac-400)' }}>Kieu AI</span>
        </div>
        <nav className="flex gap-12 text-base font-medium justify-center w-full md:w-auto">
          <a href="#features" className="text-gray-200 hover:text-[var(--color-lilac-400)] transition" onClick={e => { e.preventDefault(); document.getElementById('features').scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
          <a href="#cta" className="text-gray-200 hover:text-[var(--color-lilac-400)] transition" onClick={e => { e.preventDefault(); document.getElementById('cta').scrollIntoView({ behavior: 'smooth' }); }}>Get Started</a>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center w-full pb-8">
        <div className="w-full max-w-7xl px-4 flex flex-col md:flex-row items-center gap-16 mx-auto">
          {/* Left: Headline, subheadline, form */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-start justify-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[var(--color-lilac-400)] to-[var(--color-lilac-500)] bg-clip-text text-transparent">Speak Vietnamese</span> with Confidence
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
            Stuck finding the right words? Get instant help with pronunciation and grammar.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 mb-3 w-full" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-lilac-400)] bg-[#23263a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-lilac-400)] shadow"
              />
              <button type="submit" className="px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 hover:brightness-110 duration-200"
                style={{ background: 'var(--color-lilac-500)', color: 'white' }}
              >Get Started</button>
            </form>
            {newsletterStatus && (
              <div style={{ background: '#23263a', borderRadius: '0.5rem', padding: '0.5rem 1rem', marginBottom: '0.5rem', color: newsletterStatus === 'loading' ? 'var(--color-lilac-400)' : newsletterStatus.includes('successfully') ? '#4ade80' : '#f87171' }}>
                {newsletterStatus === 'loading' ? 'Sending...' : newsletterStatus}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
              <span className="material-icons text-base">lock</span>
              Your email is secure. We don't share your information.
            </div>
          </div>
          {/* Right: App Preview Chat Box */}
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
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span className="material-icons text-2xl">smart_toy</span>
                    Kieu AI
                    <span className="ml-auto text-xs text-gray-200">Now</span>
                  </div>
                  <div className="bg-[#23263a] rounded-lg p-3 text-gray-200 text-base self-start mb-2 max-w-[80%]">
                    Xin chào! Hãy nói "Tôi muốn học tiếng Việt"
                    <div className="text-xs text-gray-400 mt-1">Hello! Please say "I want to learn Vietnamese"</div>
                  </div>
                  <div className="flex flex-col items-end mb-2 max-w-[80%] self-end">
                    <div className="bg-[#35384a] rounded-lg p-3 text-white text-base relative">
                      <span className="absolute left-3 top-2 text-xs text-gray-400 font-normal">You said:</span>
                      <span className="block mt-5">"Tôi muốn học tiếng Việt"</span>
                    </div>
                  </div>
                  <div className="bg-transparent border border-[var(--color-lilac-400)] rounded-lg p-3 text-gray-300 text-base self-start mt-2 max-w-[80%]">
                    Great! Let's try something more challenging...
                  </div>
                </div>
                <button className="mx-auto mt-6 rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg transition transform hover:scale-110 hover:brightness-110 duration-200"
                  style={{ background: 'var(--color-lilac-500)', color: 'white' }}>
                  <span className="material-icons">mic</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 w-full" style={{ background: '#23263a' }}>
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-14">Here's what makes us different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <span className="material-icons text-3xl mb-4" style={{ color: 'var(--color-lilac-400)' }}>record_voice_over</span>
              <span className="text-xl font-bold text-white mb-2">Grammar Correction</span>
              <span className="text-gray-300">Instant feedback on your Vietnamese mistakes. No more wondering if you're saying it right.</span>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <span className="material-icons text-3xl mb-4" style={{ color: 'var(--color-lilac-400)' }}>event_available</span>
              <span className="text-xl font-bold text-white mb-2">Learn Anytime, Anywhere</span>
              <span className="text-gray-300">Practice anytime. Your AI tutor is always on and ready when you are.</span>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <span className="material-icons text-3xl mb-4" style={{ color: 'var(--color-lilac-400)' }}>forum</span>
              <span className="text-xl font-bold text-white mb-2">Real Conversations</span>
              <span className="text-gray-300">Speak how you actually talk. Build confidence through real, everyday dialogue.</span>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <span className="material-icons text-3xl mb-4" style={{ color: 'var(--color-lilac-400)' }}>theater_comedy</span>
              <span className="text-xl font-bold text-white mb-2">Real-World Roleplays</span>
              <span className="text-gray-300">Still defaulting to "con"? Practice useful situations: Ordering food, chatting with family, or meeting new people.</span>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <span className="material-icons text-3xl mb-4" style={{ color: 'var(--color-lilac-400)' }}>menu_book</span>
              <span className="text-xl font-bold text-white mb-2">Structured Lessons</span>
              <span className="text-gray-300">Follow a clear, step-by-step path from understanding to speaking with confidence.</span>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 flex flex-col items-start border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <span className="material-icons text-3xl mb-4" style={{ color: 'var(--color-lilac-400)' }}>translate</span>
              <span className="text-xl font-bold text-white mb-2">Vocabulary Tools</span>
              <span className="text-gray-300">Learn words you’ll use with family and friends. Built-in flashcards reinforce what sticks.</span>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section id="cta" className="py-24 w-full" style={{ background: '#23263a' }}>
        <div className="w-full max-w-3xl px-4 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to start speaking?</h2>
          <p className="text-lg text-gray-300 mb-8">Be among the first to try our AI Vietnamese tutor. Join the waitlist.</p>
          <form className="flex flex-col sm:flex-row gap-3 mb-4 w-full justify-center" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Enter your email for early access"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-lilac-400)] bg-[#23263a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-lilac-400)] shadow"
            />
            <button type="submit" className="px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 hover:brightness-110 duration-200"
              style={{ background: 'var(--color-lilac-500)', color: 'white' }}
            >Get Early Access</button>
          </form>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400 mb-4">
            <span>✔ Early access to all features</span>
            <span>✔ Exclusive beta tester benefits</span>
            <span>✔ Influence future development</span>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-24 w-full" style={{ background: '#23263a' }}>
        <div className="w-full max-w-7xl px-4 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-14">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <strong className="text-[var(--color-lilac-500)] text-lg">Is Kieu AI free?</strong>
              <p className="text-gray-300 mt-2">Yes, you can try it for free with basic features.</p>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <strong className="text-[var(--color-lilac-500)] text-lg">How can I improve my pronunciation?</strong>
              <p className="text-gray-300 mt-2">Kieu AI provides instant pronunciation feedback and correction tips.</p>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <strong className="text-[var(--color-lilac-500)] text-lg">Is it suitable for beginners?</strong>
              <p className="text-gray-300 mt-2">Absolutely! Kieu AI has a learning path for every level.</p>
            </div>
            <div className="bg-[#23263a] rounded-2xl shadow-lg p-8 border border-[var(--color-lilac-700)] transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5 cursor-pointer">
              <strong className="text-[var(--color-lilac-500)] text-lg">Do I need to download an app?</strong>
              <p className="text-gray-300 mt-2">No, you can learn directly on the website anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full py-10 px-4" style={{ background: '#23263a' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white text-lg font-bold">
            <span className="material-icons text-2xl" style={{ color: 'var(--color-lilac-400)' }}>smart_toy</span>
            Kieu AI
          </div>
          <nav className="flex gap-6 text-gray-300 text-base">
            <a href="#features" className="hover:text-[var(--color-lilac-400)] transition">Features</a>
            <a href="#cta" className="hover:text-[var(--color-lilac-400)] transition">Get Started</a>
            <a href="#" className="hover:text-[var(--color-lilac-400)] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-lilac-400)] transition">Terms of Service</a>
          </nav>
      </div>
        <div className="text-center text-gray-500 text-sm mt-6">© {new Date().getFullYear()} Kieu AI. All rights reserved.</div>
      </footer>
      {/* Bottom Strip */}
      <div style={{ background: 'var(--color-dark-purple)', height: '28px', width: '100%' }}></div>
      {/* Scroll to top button */}
      <button
        className="fixed right-6 bottom-6 bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:bg-purple-700 transition"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
        </button>
      </div>
  );
}

export default App;
