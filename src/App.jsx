import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const weddingDate = new Date(2026, 5, 5, 18, 0, 0);
const audioSrc = '/wedding-music.mp3';


function formatCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  };
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(() => weddingDate - new Date());
  const [musicOn, setMusicOn] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [state, handleSubmit] = useForm('xaqkbvpn');
  const audioRef = useRef(null);

  const countdown = useMemo(() => formatCountdown(timeLeft), [timeLeft]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(weddingDate - new Date());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicOn) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Playback may be blocked until the user interacts with the page.
        });
      }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [musicOn]);

  const handleSectionScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleWishSubmit = async (event) => {
    event.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    await handleSubmit(event);
    setWish({ name: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-hero-gradient text-[#2c2115] overflow-x-hidden">
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-4 pb-28 pt-6 sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-10 z-0 mx-auto h-[360px] w-[360px] rounded-full bg-gradient-to-br from-[#fff7ec]/70 via-transparent to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-6 top-40 z-0 h-24 w-24 rounded-full bg-[#d4b483]/20 blur-2xl" />

        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 rounded-[1.5rem] border border-[#d6c3a4] bg-white/85 px-5 py-5 shadow-sm backdrop-blur-xl"
        >
          <div className="flex flex-col gap-2 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#8d7d61]">Shaxrux & Ruxshona</p>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#5f513f]">Fotiha celebration</p>
          </div>
        </motion.header>
          <main className="relative z-10 mt-6 flex-1 scroll-snap overflow-hidden">
          <section id="hero" className="snap-start min-h-[80vh] pb-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="relative rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-luxury backdrop-blur-xl"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(212,180,131,0.14),transparent_28%)]" />
              <div className="relative space-y-5 text-center">
                <div className="space-y-2">
                  <p className="text-[0.65rem] uppercase tracking-[0.4em] text-[#9d855f]">Open invitation</p>
                  <h1 className="text-6xl font-semibold leading-[0.98] text-[#1f1a16] sm:text-[6.8rem]">
                    <span className="name-display block text-[4.5rem] sm:text-[6.4rem]">Shaxrux</span>
                    <span className="mx-0 mt-2 block text-[#a88e61] text-4xl sm:text-5xl">&</span>
                    <span className="name-display block text-[4.5rem] sm:text-[6.4rem]">Ruxshona</span>
                  </h1>
                </div>

                <div className="grid gap-3 rounded-[1.75rem] border border-[#dbc4a2]/60 bg-[#fff7f0]/90 p-4 text-center sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.32em] text-[#96764c]">Date</p>
                    <p className="text-lg font-semibold text-[#3c2d1e]">June 5th, 2026</p>
                    <p className="text-sm text-[#6f5d4c]">6:00 PM</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.32em] text-[#96764c]">Venue</p>
                    <p className="text-lg font-semibold text-[#3c2d1e]">Almaz Restaurant</p>
                    <p className="text-sm text-[#6f5d4c]">2637 86th St, Brooklyn</p>
                  </div>
                </div>

                <div className="grid gap-3 grid-cols-2 rounded-[1.75rem] bg-[#fff8f1]/95 p-4 text-center shadow-sm sm:grid-cols-4">
                  <div>
                    <p className="text-2xl font-semibold text-[#3b2b1f]">{countdown.days}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#8a7b6d]">Days</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#3b2b1f]">{countdown.hours}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#8a7b6d]">Hours</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#3b2b1f]">{countdown.minutes}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#8a7b6d]">Minutes</span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#3b2b1f]">{countdown.seconds}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#8a7b6d]">Seconds</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() => handleSectionScroll('details')}
                    className="rounded-full bg-[#98754b] px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-white shadow-lg shadow-[#d4b483]/20 transition hover:-translate-y-0.5"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSectionScroll('wishes')}
                    className="rounded-full border border-[#d0b287] bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#5f4a35] transition hover:-translate-y-0.5"
                  >
                    Send a wish
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="details" className="snap-start min-h-[100vh] pt-4">
            <div className="space-y-5 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.38em] text-[#a27f53]">Wedding details</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#3d2f1f]">A refined evening in Brooklyn</h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7 }}
                className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-luxury text-center"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.34em] text-[#a5814e]">Ceremony</p>
                    <p className="text-lg font-semibold text-[#3d2f1f]">Fotiha To'y</p>
                    <p className="text-sm leading-7 text-[#5e4e3b]">A heartfelt celebration with family, music and premium hospitality.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.34em] text-[#a5814e]">Experience</p>
                    <p className="text-lg font-semibold text-[#3d2f1f]">Editorial, intimate, unforgettable</p>
                    <p className="text-sm leading-7 text-[#5e4e3b]">Soft lighting, couture-inspired decor, and elevated service designed for the moment.</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="glass-panel rounded-[2rem] border border-white/70 p-5 shadow-luxury text-center"
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-[#a17f52]">Date & time</p>
                  <p className="mt-3 text-2xl font-semibold text-[#3d2f1f]">June 5th, 2026 · 6:00 PM</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="glass-panel rounded-[2rem] border border-white/70 p-5 shadow-luxury text-center"
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-[#a17f52]">Venue</p>
                  <p className="mt-3 text-2xl font-semibold text-[#3d2f1f]">Almaz Restaurant</p>
                  <p className="mt-2 text-sm leading-7 text-[#5e4e3b]">2637 86th St, Brooklyn, NY · One tap directions</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-luxury"
              >
                <iframe
                  title="Almaz Restaurant map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.2901084696508!2d-73.98614468459375!3d40.59607928435047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c245ea5efb059d%3A0x197347947c9cd193!2sAlmaz%20Restaurant%20Banquet%20Hall!5e0!3m2!1sen!2sus!4v1700000000000"
                  className="h-72 w-full border-0"
                  loading="lazy"
                />
              </motion.div>
              <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-luxury">
                <img
                  src="/65ecb5b1-c04e-4c9c-bdb1-7d7a1f16d0ef.jpg"
                  alt="Venue photo"
                  className="h-72 w-full object-cover"
                />
              </div>
            </div>
          </section>

          <section id="wishes" className="snap-start min-h-[100vh] pt-4 pb-20">
            <div className="space-y-5 text-center">
              <div>
                <p className="text-xs uppercase tracking-[0.38em] text-[#a27f53]">Guest wishes</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#3d2f1f]">Notes for the couple</h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
                className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-luxury"
              >
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.34em] text-[#a27f53]">A gentle note</p>
                  <p className="text-sm leading-7 text-[#5e4e3b]">Your presence in spirit is a cherished part of this evening. Please keep this invitation close to your heart.</p>

                  <form className="mt-5 space-y-4" onSubmit={handleWishSubmit}>
                    <label className="block text-sm font-medium text-[#53432a]">
                      Name
                      <input
                        className="mt-2 w-full rounded-3xl border border-[#d6bfa1] bg-[#fdf7f1] px-4 py-3 text-sm text-[#3d2f1f] outline-none focus:border-[#d4b483]"
                        placeholder="Your name"
                        id="name"
                        name="name"
                        value={wish.name}
                        onChange={(event) => setWish((prev) => ({ ...prev, name: event.target.value }))}
                        required
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </label>
                    <label className="block text-sm font-medium text-[#53432a]">
                      Message
                      <textarea
                        className="mt-2 w-full rounded-[1.5rem] border border-[#d6bfa1] bg-[#fdf7f1] px-4 py-3 text-sm text-[#3d2f1f] outline-none focus:border-[#d4b483]"
                        placeholder="Your warm wishes"
                        id="message"
                        name="message"
                        rows="4"
                        value={wish.text}
                        onChange={(event) => setWish((prev) => ({ ...prev, text: event.target.value }))}
                        required
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </label>
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full rounded-full border border-[#d4b483] bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#5f4a35] transition hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {state.submitting ? 'Sending...' : 'Share your note'}
                    </button>
                    {state.succeeded && (
                      <p className="text-sm text-[#5f4a35]">Thank you! Your wish has been sent.</p>
                    )}
                  </form>

                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>

      <audio ref={audioRef} src={audioSrc} loop preload="auto" className="hidden" />
      <div className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-full border border-white/80 bg-white/90 px-3 py-2 shadow-luxury backdrop-blur-xl">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handleSectionScroll('wishes')}
            className="rounded-full bg-[#98754b] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#d4b483]/20"
          >
            Wishes
          </button>
          <motion.button
            type="button"
            onClick={() => setMusicOn((current) => !current)}
            className="rounded-full border border-[#d4b483] bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#5f4a35] shadow-sm"
            animate={musicOn ? { boxShadow: ['0px 0px 0px rgba(212,180,131,0.18)', '0px 0px 14px rgba(212,180,131,0.35)', '0px 0px 0px rgba(212,180,131,0.18)'] } : { scale: [1, 1.04, 1], boxShadow: ['0px 0px 0px rgba(212,180,131,0.15)', '0px 0px 12px rgba(212,180,131,0.3)', '0px 0px 0px rgba(212,180,131,0.15)'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.08 }}
          >
            {musicOn ? 'Pause music' : 'Play music'}
          </motion.button>
          <button
            type="button"
            onClick={() => handleSectionScroll('details')}
            className="rounded-full border border-[#d4b483] bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#5f4a35]"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
