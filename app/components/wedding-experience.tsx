'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  CalendarBlank,
  Check,
  Copy,
  FlowerLotus,
  Gift,
  Heart,
  MapPin,
  List,
  NavigationArrow,
  ShareNetwork,
  Sparkle,
  X,
} from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import HeroCanvas from '@/app/components/hero-canvas';

const eventDate = 'Saturday, 14 November 2026';
const venue = "Deeper Life Young Adults' Church Uyo";
const address = 'Four Lanes, 14 Edem Akai Street, Uyo, Akwa Ibom State';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue}, ${address}`)}`;
const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Favour weds Success')}&dates=20261114T100000/20261114T130000&details=${encodeURIComponent("The solemnization of Favour Ntiense Oton and Godswill Alexander Abiodun. #GodsFav'26")}&location=${encodeURIComponent(`${venue}, ${address}`)}`;

const accountDetails = {
  groom: { name: 'Godswill Alexander Abiodun', number: '2255389514', bank: 'Zenith Bank' },
  bride: { name: 'Favour Ntiense Oton', number: '2177916624', bank: 'Zenith Bank' },
};

const wishlistItems = [
  { name: 'Any amount', price: 'Cash gift', image: '/wedding/wishlist/any-amount.png', alt: 'Cash gifts are welcomed' },
  { name: 'Buchymix Premium Digital Turbocrush Blender', price: 'N60,000', image: '/wedding/wishlist/blender.jpg', alt: 'Buchymix Premium Digital Turbocrush Blender' },
  { name: 'High-quality non-stick cookware set', price: 'N145,000', image: '/wedding/wishlist/cookware.jpg', alt: 'High-quality non-stick cookware set' },
  { name: 'LG Split AC 1.5HP Artcool Black Mirror', price: 'N420,000', image: '/wedding/wishlist/air-conditioner.jpg', alt: 'LG Split AC 1.5HP Artcool Black Mirror' },
  { name: 'LG 8kg Fully Automatic Front Load Washing Machine', price: 'N280,000', image: '/wedding/wishlist/washing-machine.jpg', alt: 'LG 8kg Fully Automatic Front Load Washing Machine' },
  { name: 'Electric oven', price: 'N60,000', image: '/wedding/wishlist/electric-oven.jpg', alt: 'Electric oven' },
  { name: 'Three-burner tabletop gas cooker', price: 'N80,000', image: '/wedding/wishlist/gas-cooker.jpg', alt: 'Three-burner tabletop gas cooker' },
  { name: '700W countertop microwave', price: 'N80,000', image: '/wedding/wishlist/microwave.jpg', alt: '700W countertop microwave' },
  { name: 'A 60+4pcs kitchen set including plates, bowls, and cups', price: 'N50,000', image: '/wedding/wishlist/kitchen-set.jpg', alt: 'A 60 plus 4 pieces kitchen set' },
  { name: 'Binatone fan, 18 inch blades, rechargeable, RCFM-1875, 2 units', price: 'N70,000', image: '/wedding/wishlist/fan.jpg', alt: 'Binatone rechargeable fan' },
  { name: 'Samsung TV 43 FHD Smart Black UA43T5300', price: 'N350,000', image: '/wedding/wishlist/television.jpg', alt: 'Samsung 43 inch FHD Smart TV' },
  { name: 'Hisense Bottom Freezer Refrigerator 225L (29DCA)', price: 'N250,000', image: '/wedding/wishlist/refrigerator.jpg', alt: 'Hisense bottom freezer refrigerator' },
  { name: 'Multi-layer shoe rack with wheels', price: 'N50,000', image: '/wedding/wishlist/shoe-rack.jpg', alt: 'Multi-layer shoe rack with wheels' },
  { name: 'Spacious multi-functional metal kitchen rack', price: 'N30,000', image: '/wedding/wishlist/kitchen-rack.png', alt: 'Spacious multi-functional metal kitchen rack' },
  { name: 'Rubitec 550W/500W monocrystalline solar panel', price: 'N270,000', image: '/wedding/wishlist/solar-panel.jpg', alt: 'Rubitec monocrystalline solar panel' },
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.75, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ActionButton({ href, onClick, children, icon }: { href?: string; onClick?: () => void; children: React.ReactNode; icon: React.ReactNode }) {
  const className = 'action-button';
  if (href) {
    return (
      <motion.a href={href} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <span>{children}</span>{icon}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" onClick={onClick} className={className} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <span>{children}</span>{icon}
    </motion.button>
  );
}

export default function WeddingExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState('');
  const [shareLabel, setShareLabel] = useState('Share the invitation');
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  async function copyText(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(''), 2200);
    } catch {
      setCopied('Copy unavailable');
    }
  }

  async function shareInvite() {
    const shareData = { title: 'Favour weds Success', text: "Join Favour and Godswill on 14 November 2026.", url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareLabel('Invitation shared');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareLabel('Link copied');
      }
      window.setTimeout(() => setShareLabel('Share the invitation'), 2200);
    } catch {
      setShareLabel('Share cancelled');
      window.setTimeout(() => setShareLabel('Share the invitation'), 2200);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main className="site-shell">
      <div className="paper-grain" aria-hidden="true" />
      <header className="site-nav">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="FG 26 home">
          FG<span>&apos;26</span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} aria-label="Primary navigation">
          <a href="#story" onClick={closeMenu}>Our story</a>
          <a href="#day" onClick={closeMenu}>The day</a>
          <a href="#gifts" onClick={closeMenu}>Gifts</a>
          <a href={calendarUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Calendar <ArrowUpRight size={14} /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </header>

      <section id="top" ref={heroRef} className="hero-section">
        <HeroCanvas />
        <div className="hero-photo" aria-hidden="true"><Image src="/wedding/hero-florals.png" alt="" fill priority sizes="100vw" /></div>
        <div className="hero-wash" aria-hidden="true" />
        <motion.div className="hero-content" style={{ y: reduceMotion ? 0 : heroY, opacity: reduceMotion ? 1 : heroOpacity }}>
          <p className="eyebrow light-eyebrow"><span className="eyebrow-dot" /> A solemnization of love <span className="eyebrow-dot" /></p>
          <h1>Favour <em>weds</em> Success</h1>
          <p className="hero-names">Favour Ntiense Oton <span>&</span> Godswill Alexander Abiodun</p>
          <p className="hero-date">{eventDate} <span>·</span> 10:00 AM <span>·</span> Uyo</p>
          <div className="hero-actions">
            <ActionButton href={calendarUrl} icon={<CalendarBlank size={18} weight="duotone" />}>Save the date</ActionButton>
            <a href="#story" className="quiet-link">Read our invitation <ArrowDown size={16} /></a>
          </div>
          <p className="hero-hashtag">#GodsFav&apos;26</p>
        </motion.div>
        <div className="hero-bottom-line"><span>Scroll to unfold</span><span className="line" /><span>14 / 11 / 26</span></div>
      </section>

      <section id="story" className="story-section section-pad">
        <div className="section-kicker"><span>01</span><span className="section-rule" /><span>The invitation</span></div>
        <div className="story-grid">
          <Reveal className="story-intro">
            <p className="eyebrow">With grateful hearts</p>
            <h2>Two lives, one <em>beautiful</em> promise.</h2>
            <p className="lead-copy">The families of late Pst. and late Mrs. Ntiense Oton, together with late and Mrs. Alexander Abiodun, cordially invite you to the solemnization of their beloved children.</p>
            <p className="couple-line">Favour Ntiense Oton <span>&</span> Godswill Alexander Abiodun</p>
          </Reveal>
          <Reveal className="quote-card" delay={0.12}>
            <FlowerLotus size={28} weight="duotone" />
            <blockquote>“Whoso findeth a wife findeth a good thing, and obtaineth favour of the Lord.”</blockquote>
            <cite>Proverbs 18:22</cite>
          </Reveal>
        </div>
        <Reveal className="story-image-wrap" delay={0.1}>
          <Image src="/wedding/rings-paper.png" alt="Gold wedding rings on peach handmade paper with burgundy ribbon and blue flowers" fill sizes="(max-width: 768px) 100vw, 70vw" />
          <div className="image-caption"><span>FG&apos;26</span><span>A promise held close</span></div>
        </Reveal>
        <Reveal className="quote-wide" delay={0.1}>
          <span className="quote-mark">“</span>
          <p>Finding my wife has truly meant finding Favour in every sense of the word, and I am endlessly blessed to share this lifetime with her</p>
          <span className="quote-signature">Godswill</span>
        </Reveal>
      </section>

      <section className="chapters-section section-pad">
        <div className="section-kicker"><span>02</span><span className="section-rule" /><span>A gentle unfolding</span></div>
        <div className="chapter-grid">
          <Reveal className="chapter-card chapter-card-featured">
            <p className="chapter-number">01</p>
            <Sparkle size={24} weight="duotone" />
            <h3>The invitation</h3>
            <p>Come as you are, with an open heart, to witness a promise made before God and the people they love.</p>
          </Reveal>
          <Reveal className="chapter-card" delay={0.1}>
            <p className="chapter-number">02</p>
            <Heart size={24} weight="duotone" />
            <h3>The promise</h3>
            <p>A day shaped by faith, family, tenderness, and the joy of choosing a shared future.</p>
          </Reveal>
          <Reveal className="chapter-card" delay={0.2}>
            <p className="chapter-number">03</p>
            <FlowerLotus size={24} weight="duotone" />
            <h3>The celebration</h3>
            <p>Dress in the colours of the day and bring your warmest wishes for Favour and Success.</p>
          </Reveal>
        </div>
      </section>

      <section id="day" className="day-section section-pad">
        <div className="section-kicker"><span>03</span><span className="section-rule" /><span>Meet us there</span></div>
        <div className="day-grid">
          <Reveal className="day-copy">
            <p className="eyebrow">The day</p>
            <h2>Make room for <em>joy.</em></h2>
            <div className="date-lockup"><span className="date-day">14</span><span><strong>November</strong><small>Saturday · 2026</small></span></div>
            <div className="event-list">
              <div><CalendarBlank size={21} weight="duotone" /><span><strong>10:00 AM</strong><small>Service begins</small></span></div>
              <div><MapPin size={21} weight="duotone" /><span><strong>{venue}</strong><small>{address}</small></span></div>
            </div>
            <div className="action-row">
              <ActionButton href={mapsUrl} icon={<NavigationArrow size={18} weight="duotone" />}>Get directions</ActionButton>
              <ActionButton href={calendarUrl} icon={<CalendarBlank size={18} weight="duotone" />}>Add to calendar</ActionButton>
            </div>
          </Reveal>
          <Reveal className="venue-image-wrap" delay={0.12}>
            <Image src="/wedding/venue-atmosphere.png" alt="Warm floral archway atmosphere representing the wedding venue" fill sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="venue-image-note"><MapPin size={16} /> Uyo, Akwa Ibom State</div>
          </Reveal>
        </div>
      </section>

      <section className="palette-section section-pad">
        <Reveal className="palette-intro">
          <p className="eyebrow">The palette</p>
          <h2>Colours for a day <em>worth remembering.</em></h2>
          <p>Come dressed in the warmth of our celebration.</p>
        </Reveal>
        <div className="palette-row" aria-label="Colours of the day">
          <Reveal className="swatch swatch-burgundy" delay={0.05}><span>Burgundy</span><small>#731A38</small></Reveal>
          <Reveal className="swatch swatch-peach" delay={0.1}><span>Peach</span><small>#F1B8AD</small></Reveal>
          <Reveal className="swatch swatch-navy" delay={0.15}><span>Navy blue</span><small>#172A4A</small></Reveal>
          <Reveal className="swatch swatch-sky" delay={0.2}><span>Sky blue</span><small>#A7CFE0</small></Reveal>
        </div>
      </section>

      <section id="gifts" className="gifts-section section-pad">
        <div className="section-kicker"><span>04</span><span className="section-rule" /><span>A thoughtful gesture</span></div>
        <div className="gifts-grid">
          <Reveal className="gift-image-wrap">
            <Image src="/wedding/gift-envelope.png" alt="Burgundy envelope with a champagne seal on peach paper" fill sizes="(max-width: 768px) 100vw, 48vw" />
            <div className="gift-image-label"><Gift size={17} weight="duotone" /> Your presence is the present</div>
          </Reveal>
          <Reveal className="gift-copy" delay={0.12}>
            <p className="eyebrow">Gifts</p>
            <h2>Help us begin <em>beautifully.</em></h2>
            <p className="lead-copy">Your presence means the world to us. If you would also like to bless us with a gift, cash gifts are warmly welcomed.</p>
            <p className="account-heading">Cash gifts are welcome via either account:</p>
            <div className="account-list account-list-static">
              {Object.values(accountDetails).map((account) => (
                <div className="account-card" key={account.number}>
                  <div><span>{account.name}</span><strong>{account.bank}</strong><b>{account.number}</b></div>
                  <button type="button" className="copy-button" onClick={() => copyText(account.number, account.number)} aria-label={`Copy account number for ${account.name}`}>
                    {copied === account.number ? <Check size={17} /> : <Copy size={17} />}
                    <span>{copied === account.number ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              ))}
              <p className="copy-status" aria-live="polite">{copied && copied !== accountDetails.groom.number && copied !== accountDetails.bride.number ? copied : ''}</p>
            </div>
          </Reveal>
        </div>
        <Reveal className="wishlist-block" delay={0.08}>
          <div className="wishlist-heading">
            <div><p className="eyebrow">Our wishlist</p><h3>Gifts we would <em>love</em> to receive.</h3></div>
            <p>Choose any item that speaks to you, or bless us with any amount.</p>
          </div>
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <article className="wishlist-card" key={item.name}>
                <div className="wishlist-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 45vw, (max-width: 980px) 30vw, 18vw" /></div>
                <div className="wishlist-meta"><h4>{item.name}</h4><strong>{item.price}</strong></div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="site-footer section-pad">
        <Reveal className="footer-card">
          <p className="eyebrow light-eyebrow">With love, from us to you</p>
          <h2>We cannot wait to celebrate <em>with you.</em></h2>
          <p>Saturday, 14 November 2026 <span>·</span> 10:00 AM <span>·</span> Uyo</p>
          <div className="footer-actions">
            <ActionButton href={calendarUrl} icon={<CalendarBlank size={18} weight="duotone" />}>Save the date</ActionButton>
            <ActionButton onClick={shareInvite} icon={<ShareNetwork size={18} weight="duotone" />}>{shareLabel}</ActionButton>
          </div>
          <div className="hashtag-row"><span>#GodsFav&apos;26</span><span>#FavWillLove&apos;26</span><span>#GodsFavoured&apos;26</span><span>#FG&apos;26</span></div>
          <div className="footer-mark"><span>F</span><Heart size={17} weight="fill" /><span>G</span></div>
        </Reveal>
        <div className="footer-bottom"><span>Favour weds Success</span><span>Made with faith and joy</span><span>FG&apos;26</span></div>
      </footer>
    </main>
  );
}
