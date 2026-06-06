/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  Home,
  Gamepad2,
  Users,
  Sparkles,
  ChevronRight,
  Download,
  CheckCircle2,
  Heart,
  Star,
  Languages
} from 'lucide-react';
import { translations } from './translations';

const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-64 h-64 bg-hearth-lime/30 rounded-full blur-[80px] pointer-events-none z-[-1] -translate-x-1/2 -translate-y-1/2"
      style={{ x, y }}
    />
  );
};

const GlassButton = ({ children, className = "", primary = false, onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: primary ? "rgba(26, 71, 33, 0.9)" : "rgba(255, 255, 255, 0.2)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      relative px-8 py-4 rounded-2xl font-bold transition-all duration-300
      flex items-center justify-center gap-2 overflow-hidden
      backdrop-blur-xl border border-white/30
      ${primary
        ? "bg-hearth-green text-white shadow-lg shadow-hearth-green/10"
        : "bg-white/10 text-hearth-green hover:border-white/50"
      }
      ${className}
    `}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
    {children}
  </motion.button>
);

const Navbar = ({ t, currentLang, onToggleLang }: { t: any, currentLang: string, onToggleLang: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-hearth-green/10">
            <img
              src={new URL("../pic/wipe.png", import.meta.url).href}
              alt="Wipe Banner"
              className="w-10 h-10 object-contain rounded-xl"
            />
          </div>
          <span className="font-bold text-2xl tracking-tighter text-hearth-green">Wipe</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-hearth-green/80">
            <a href="#features" className="hover:text-hearth-green transition-colors">{t.nav.features}</a>
            <a href="#how-it-works" className="hover:text-hearth-green transition-colors">{t.nav.howItWorks}</a>
            <GlassButton
              primary
              className="px-6 py-2.5 !rounded-full !bg-hearth-lime !text-hearth-green !border-none text-sm"
              onClick={() => window.open(t.playtest.iframeSrc, '_blank')}
            >
              {t.nav.download}
            </GlassButton>
          </div>

          <button
            onClick={onToggleLang}
            className="p-2.5 hover:bg-white/40 backdrop-blur-md border border-white/20 rounded-full transition-all flex items-center gap-1.5 text-hearth-green"
          >
            <Languages className="w-5 h-5" />
            <span className="text-xs font-black uppercase">{currentLang === 'zh' ? 'EN' : '中文'}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ t }: { t: any }) => (
  <section className="pt-[96px] pb-24 px-4 overflow-hidden relative bg-[#fff4e1]">
    <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={new URL("../pic/Gemini_Generated_Image_fvlofcfvlofcfvlo.png", import.meta.url).href}
          alt="Wipe Banner"
          className="w-screen max-w-none relative left-1/2 -translate-x-1/2 mb-10 drop-shadow-2xl"
        />
        <span className="inline-block px-5 py-2 mb-8 text-sm font-black tracking-[0.2em] text-hearth-green uppercase bg-white/40 backdrop-blur-xl rounded-full border border-hearth-green/10">
          {t.hero.tag}
        </span>
        <h1 className="text-5xl md:text-8xl font-black text-hearth-green leading-[1.1] mb-8 tracking-tighter">
          {t.hero.title}<br />
          <span className="opacity-70">{t.hero.titleAccent}</span>
        </h1>
        <p className="text-xl md:text-2xl text-hearth-green/60 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
          {t.hero.desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <GlassButton
            primary
            className="!px-12 !py-6 !text-lg !rounded-full"
            onClick={() => window.open(t.playtest.iframeSrc, '_blank')}
          >
            <Download className="w-6 h-6" />
            {t.hero.ctaPrimary}
          </GlassButton>
          <GlassButton className="!px-12 !py-6 !text-lg !rounded-full">
            {t.hero.ctaSecondary}
            <ChevronRight className="w-6 h-6" />
          </GlassButton>
        </div>
      </motion.div>
    </div>
  </section>
);

const PlaytestSection = ({ t }: { t: any }) => (
  <section id="how-it-works" className="py-24 px-4 bg-[#fff4e1]">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black text-hearth-green mb-4 tracking-tight">
          {t.playtest.title}
        </h2>
        <p className="text-hearth-green/60 text-lg leading-relaxed max-w-2xl mx-auto">
          {t.playtest.subtitle}
        </p>
      </div>
      <div className="rounded-[2.5rem] border border-hearth-green/10 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden">
        <iframe
          title={t.playtest.iframeTitle}
          src={t.playtest.iframeSrc}
          className="w-full h-[70vh] min-h-[520px] max-h-[900px]"
          loading="lazy"
          allow="fullscreen; clipboard-read; clipboard-write"
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: any) => (
  <motion.div
    className="p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-sm hover:shadow-xl transition-all group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="w-12 h-12 bg-hearth-secondary/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-hearth-green transition-colors">
      <Icon className="text-hearth-green w-6 h-6 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-hearth-green">{title}</h3>
    <p className="text-hearth-green/60 leading-relaxed font-medium">
      {description}
    </p>
  </motion.div>
);

const Features = ({ t }: { t: any }) => (
  <section id="features" className="py-24 px-4 bg-white/20">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16 -mt-8">
        <div className="text-left pl-8 md:pl-10">
          <h2 className="text-3xl md:text-4xl font-black text-hearth-green mb-4 tracking-tight">
            {t.features.bannerTitle}
          </h2>
          <p className="text-hearth-green/60 text-lg leading-relaxed font-medium">
            {t.features.bannerDesc}
          </p>
        </div>
        <div className="md:justify-self-end w-full">
          <video
            className="w-full max-w-[520px] rounded-3xl shadow-2xl pointer-events-none"
            src={new URL("../Timeline 1.mp4", import.meta.url).href}
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
      </div>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-hearth-green mb-4 tracking-tight">{t.features.title}</h2>
        <p className="text-hearth-green/60 max-w-xl mx-auto text-lg leading-relaxed">
          {t.features.subtitle}
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[Gamepad2, Users].map((icon, idx) => (
          <FeatureCard
            key={idx}
            icon={icon}
            title={t.features.cards[idx].title}
            description={t.features.cards[idx].desc}
            delay={0.1 * (idx + 1)}
          />
        ))}
      </div>
    </div>
  </section>
);

const FunctionShowcase = () => null;

type MonsterText = {
  label: string;
  quote: string;
};


type MonsterAsset = {
  src: string;
  bg: string;
};

const MonsterCard = ({ label, quote, src, bg }: { label: string; quote: string; src: string; bg: string }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');
  const [tooltipStyle, setTooltipStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const updatePlacement = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();
    if (!rect || !tooltipRect) return;

    const spacing = 12;
    let nextPlacement: 'top' | 'bottom' = 'top';
    let top = rect.top - tooltipRect.height - spacing;
    if (top < 8) {
      nextPlacement = 'bottom';
      top = rect.bottom + spacing;
    }

    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
    if (left < 8) {
      left = rect.left;
    }
    if (left + tooltipRect.width > window.innerWidth - 8) {
      left = rect.right - tooltipRect.width;
    }

    setPlacement(nextPlacement);
    setTooltipStyle({ top, left });
  };

  const handleHover = () => {
    setIsActive(true);
    requestAnimationFrame(() => requestAnimationFrame(updatePlacement));
  };

  useEffect(() => {
    if (!isActive) return;

    const handlePosition = () => updatePlacement();
    handlePosition();

    window.addEventListener('resize', handlePosition);
    window.addEventListener('scroll', handlePosition, true);
    return () => {
      window.removeEventListener('resize', handlePosition);
      window.removeEventListener('scroll', handlePosition, true);
    };
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 mx-4 md:mx-8 w-24 h-24 md:w-36 md:h-36 relative group"
      onMouseEnter={handleHover}
      onMouseMove={handleHover}
      onMouseLeave={() => setIsActive(false)}
      onFocus={handleHover}
      onBlur={() => setIsActive(false)}
    >
      {/* Fallback placeholder background (visible if image fails/missing) */}
      <div className={`absolute inset-0 rounded-2xl md:rounded-3xl ${bg} flex items-center justify-center -z-10 ring-1 ring-white/10`}>
        <span className="text-[10px] md:text-xs text-white/50 font-medium px-2 text-center uppercase tracking-wider">{label}</span>
      </div>

      {isActive &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`fixed z-[9999] w-[min(90vw,420px)] rounded-3xl bg-white/95 px-6 py-5 text-left text-hearth-green shadow-2xl opacity-100 scale-100 transition duration-200 pointer-events-none ${placement === 'top' ? 'origin-bottom' : 'origin-top'}`}
            style={tooltipStyle}
          >
            <div className="text-sm font-black tracking-wider">{label}</div>
            <div className="mt-2 text-sm leading-relaxed text-hearth-green/80">{quote}</div>
          </div>,
          document.body
        )}

      <img
        src={src}
        alt={label}
        className="w-full h-full object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3"
        onError={(e) => {
          (e.target as HTMLImageElement).style.opacity = '0';
        }}
        onLoad={(e) => {
          (e.target as HTMLImageElement).style.opacity = '1';
        }}
      />
    </div>
  );
};

const monsterAssets: MonsterAsset[] = [
  { src: new URL("../pic/垃圾怪.webp", import.meta.url).href, bg: "bg-stone-500/20" },
  { src: new URL("../pic/掃地怪.png", import.meta.url).href, bg: "bg-yellow-500/20" },
  { src: new URL("../pic/曬衣怪.png", import.meta.url).href, bg: "bg-orange-500/20" },
  { src: new URL("../pic/洗衣怪.png", import.meta.url).href, bg: "bg-blue-500/20" },
  { src: new URL("../pic/清潔怪.png", import.meta.url).href, bg: "bg-cyan-500/20" },
  { src: new URL("../pic/盆栽怪.png", import.meta.url).href, bg: "bg-green-500/20" },
  { src: new URL("../pic/臟碗怪.png", import.meta.url).href, bg: "bg-red-500/20" },
];

const DownloadSection = ({ t }: { t: any }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackError, setFeedbackError] = useState('');

  useEffect(() => {
    if (!isFeedbackSent) return;
    const timer = window.setTimeout(() => {
      setIsFeedbackOpen(false);
      setIsFeedbackSent(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [isFeedbackSent]);

  const submitFeedback = async () => {
    if (isSubmitting) return;
    if (!feedbackText.trim()) {
      setFeedbackError(t.feedback.errorRequired);
      return;
    }

    setIsSubmitting(true);
    setFeedbackError('');

    try {
      const body = new URLSearchParams({
        email: feedbackEmail,
        feedback: feedbackText,
      });
      const response = await fetch(t.feedback.endpoint, {
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        body,
      });

      if (!response.ok && response.type !== 'opaque') {
        throw new Error('Submission failed');
      }

      setIsFeedbackSent(true);
      setFeedbackEmail('');
      setFeedbackText('');
    } catch (error) {
      setFeedbackError(t.feedback.errorFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="download" className="py-24 px-4 overflow-hidden flex flex-col gap-8">
      {/* Banner */}
      <div className="w-screen relative text-white -mx-4">
        {/* Dirt Monsters Infinite Scroll Banner */}
        <div className="relative w-full h-32 md:h-48 overflow-hidden flex items-center">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
            {[...monsterAssets, ...monsterAssets].map((asset, i) => {
              const text = (t.monsters as MonsterText[] | undefined)?.[i % monsterAssets.length];
              return (
                <MonsterCard
                  key={i}
                  label={text?.label ?? ''}
                  quote={text?.quote ?? ''}
                  src={asset.src}
                  bg={asset.bg}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Download Action Card */}
      <div className="max-w-5xl w-full mx-auto bg-hearth-green text-white rounded-[3.5rem] py-16 md:py-20 text-center relative overflow-hidden shadow-2xl">
        {/* Texture Layer */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />

        <div className="relative z-10 px-10 md:px-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{t.feedback.title}</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            {t.feedback.subtitle}
          </p>
          <div className="flex justify-center">
            <GlassButton
              primary
              onClick={() => {
                setIsFeedbackSent(false);
                setFeedbackError('');
                setIsFeedbackOpen(true);
              }}
              className="!px-12 !py-5 !rounded-2xl !bg-hearth-lime !text-hearth-green border-none"
            >
              {t.feedback.cta}
            </GlassButton>
          </div>
        </div>

        {/* Decorative Orbs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-hearth-lime/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 rounded-full blur-3xl" />
      </div>

      {isFeedbackOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsFeedbackOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl rounded-[2.5rem] bg-white p-8 md:p-10 text-hearth-green shadow-2xl">
            <button
              className="absolute right-6 top-6 text-hearth-green/50 hover:text-hearth-green"
              onClick={() => setIsFeedbackOpen(false)}
              aria-label={t.feedback.close}
            >
              ✕
            </button>
            {isFeedbackSent ? (
              <div className="py-10 text-center">
                <div className="text-2xl font-black mb-3">{t.feedback.successTitle}</div>
                <div className="text-hearth-green/60 mb-8">{t.feedback.successDesc}</div>
                <GlassButton
                  primary
                  onClick={() => setIsFeedbackOpen(false)}
                  className="!px-10 !py-4 !rounded-2xl !bg-hearth-lime !text-hearth-green border-none"
                >
                  {t.feedback.close}
                </GlassButton>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold tracking-wide text-hearth-green/70 mb-2">
                    {t.feedback.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={feedbackEmail}
                    onChange={(event) => setFeedbackEmail(event.target.value)}
                    className="w-full rounded-2xl border border-hearth-green/20 bg-hearth-bg/60 px-4 py-3 text-hearth-green placeholder-hearth-green/40 focus:outline-none focus:ring-2 focus:ring-hearth-lime/60 focus:border-transparent"
                    placeholder={t.feedback.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold tracking-wide text-hearth-green/70 mb-2">
                    {t.feedback.label}
                  </label>
                  <textarea
                    value={feedbackText}
                    onChange={(event) => setFeedbackText(event.target.value)}
                    className="w-full min-h-[180px] rounded-2xl border border-hearth-green/20 bg-hearth-bg/60 px-4 py-3 text-hearth-green placeholder-hearth-green/40 focus:outline-none focus:ring-2 focus:ring-hearth-lime/60 focus:border-transparent"
                    placeholder={t.feedback.placeholder}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-xs font-medium">
                    {feedbackError ? (
                      <span className="text-red-500">{feedbackError}</span>
                    ) : (
                      <span className="text-hearth-green/50">{t.feedback.helper}</span>
                    )}
                  </div>
                  <GlassButton
                    primary
                    onClick={submitFeedback}
                    className="!px-10 !py-4 !rounded-2xl !bg-hearth-lime !text-hearth-green border-none"
                  >
                    {t.feedback.submit}
                  </GlassButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const Footer = ({ t }: { t: any }) => (
  <footer className="py-16 px-4 border-t border-hearth-secondary/50 bg-hearth-bg">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded flex items-center justify-center">
          <img
            src={new URL("../pic/wipe.png", import.meta.url).href}
            alt="Wipe Banner"
            className="w-10 h-10 object-contain rounded-xl"
          />
        </div>
        <span className="font-bold text-xl text-hearth-green tracking-widest">Wipe</span>
      </div>

      <div className="flex gap-10 text-sm font-semibold text-hearth-green/50">
        <a href="#" className="hover:text-hearth-green transition-colors">{t.footer.privacy}</a>
        <a href="#" className="hover:text-hearth-green transition-colors">{t.footer.terms}</a>
        <a href="#" className="hover:text-hearth-green transition-colors">{t.footer.contact}</a>
      </div>

      <div className="flex items-center gap-4 text-hearth-green/30">
        <Heart className="w-5 h-5" />
        <span className="text-sm font-medium">{t.footer.tagline}</span>
      </div>
    </div>
    <div className="mt-12 text-center text-xs font-semibold text-hearth-green/20 uppercase tracking-widest">
      {t.footer.copy}
    </div>
  </footer>
);

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const t = translations[lang];

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen selection:bg-white selection:text-hearth-green">
      <CursorFollower />
      <Navbar t={t} currentLang={lang} onToggleLang={toggleLang} />
      <Hero t={t} />
      <section className="bg-[#fff4e1] px-4 h-[180px] md:h-[220px]">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-center text-center">
          <div className="font-art leading-none tracking-[0.18em] text-hearth-green/70 text-[clamp(2.5rem,12vw,10rem)]">
            Collaboration
          </div>
        </div>
      </section>
      <PlaytestSection t={t} />
      <Features t={t} />
      <FunctionShowcase t={t} />
      <DownloadSection t={t} />
      <Footer t={t} />
    </div>
  );
}
