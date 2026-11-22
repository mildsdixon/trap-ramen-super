import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react';
import './styles.css';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const phoneDisplay = '586-630-0099';
const phoneHref = 'tel:+15866300099';

const menuGroups = {
  ramen: [
    { name: 'Chicken Ramen', price: '$15', desc: 'Spicy or regular broth, bok choy, trap veggies, carrots, green onion, egg and furikake.' },
    { name: 'Steak Ramen', price: '$18', desc: 'A hearty bowl with your choice of spicy or regular broth.' },
    { name: 'Shrimp Ramen', price: '$18', desc: 'Shrimp, vegetables, egg and furikake in your choice of broth.' },
    { name: 'Salmon Ramen', price: '$20', desc: 'Salmon with bok choy, trap veggies and a rich, savory broth.' },
    { name: 'Seafood Boil Ramen', price: '$28', desc: 'Shrimp, crab legs, beef sausage, corn and onions.' },
    { name: 'Two Meat Ramen', price: '$25', desc: 'Build it your way with two proteins.' },
  ],
  rice: [
    { name: 'Veggie Trap Rice', price: '$12 / $15', desc: 'Fried rice with carrots, mushrooms, onions, zucchini and garlic butter.' },
    { name: 'Chicken Trap Rice', price: '$17 / $22', desc: 'Mini or biggie. One sauce included.' },
    { name: 'Steak Trap Rice', price: '$18 / $25', desc: 'Mini or biggie. One sauce included.' },
    { name: 'Shrimp Trap Rice', price: '$18 / $25', desc: 'Mini or biggie. One sauce included.' },
    { name: 'Salmon Trap Rice', price: '$20 / $27', desc: 'Mini or biggie. One sauce included.' },
    { name: 'Three Meat Trap Rice', price: '$30 / $35', desc: 'A fully loaded mini or biggie.' },
  ],
  trapetizers: [
    { name: 'Trap Whole Wings', price: '5/$10 · 10/$20', desc: 'Garlic parm, Trap Sauce, sweet chili, buffalo, General Tso or spicy honey garlic.' },
    { name: 'Trap Rolls', price: '3/$18', desc: 'Hibachi rice, trap veggies and your choice of chicken, steak or shrimp.' },
    { name: 'Trap Jumbo Shrimp', price: '10/$18', desc: 'Deep fried and hand-tossed in honey teriyaki, firecracker, sweet chili or Trap Sauce.' },
    { name: 'Trap Fries', price: '$16', desc: 'Gochujang cheese sauce, parm, green onion and jalapeño with your choice of protein.' },
    { name: 'Trap Trio', price: '$25', desc: 'Three wings, one Trap Roll and five fried shrimp.' },
    { name: 'Seasoned Fries', price: '$4', desc: 'Crispy, seasoned and ready for your favorite sauce.' },
  ],
  wraps: [
    { name: 'Chicken Trap Wrap', price: '$15', desc: 'Flour tortilla, hibachi rice, trap veggies and glazed chicken.' },
    { name: 'Steak Trap Wrap', price: '$15', desc: 'Flour tortilla, hibachi rice, trap veggies and glazed steak.' },
    { name: 'Shrimp Trap Wrap', price: '$15', desc: 'Flour tortilla, hibachi rice, trap veggies and glazed shrimp.' },
    { name: 'Add Beef Sausage', price: '+$3', desc: 'Turn up any wrap with beef sausage.' },
    { name: 'Add Broccoli', price: '+$3', desc: 'Add fresh broccoli.' },
    { name: 'Add Trap Veggies', price: '+$4', desc: 'Zucchini, onion and mushrooms.' },
  ],
  desserts: [
    { name: 'Banana Pudding', price: '$5', desc: 'Creamy house-style banana pudding.' },
    { name: 'Strawberry Banana Pudding', price: '$6', desc: 'A strawberry spin on the classic.' },
    { name: 'Dipped Cheesecake', price: '$8', desc: 'Ask about today’s available flavor.' },
    { name: 'Trapade — Original Lemon', price: '$5', desc: 'Fresh, bright and made to hit.' },
    { name: 'Flavored Trapade', price: '$6', desc: 'Strawberry, cherry, green apple, raspberry, peach, mango, coconut or blue raspberry.' },
  ],
};

const categoryLabels = {
  ramen: 'Ramen',
  rice: 'Trap Rice',
  trapetizers: 'Trapetizers',
  wraps: 'Wraps',
  desserts: 'Desserts + Drinks',
};

const menuVisuals = {
  ramen: ['assets/food/seafood-boil-ramen.jpg', 'assets/food/pineapple-bowls.jpg', 'assets/food/seafood-boil-ramen.jpg', 'assets/food/pineapple-bowls.jpg'],
  rice: ['assets/food/pineapple-bowls.jpg', 'assets/food/pineapple-bowl-cutout.png', 'assets/food/pineapple-bowls.jpg', 'assets/food/pineapple-bowl-cutout.png'],
  trapetizers: ['assets/food/trap-wings.jpg', 'assets/food/lobster-egg-roll.jpg', 'assets/food/lobster-egg-roll.jpg', 'assets/food/trap-wings.jpg'],
  wraps: ['assets/food/pineapple-bowls.jpg', 'assets/food/pineapple-bowls.jpg', 'assets/food/pineapple-bowls.jpg', 'assets/food/trap-wings.jpg'],
  desserts: ['assets/ads/ad-14.jpg', 'assets/ads/ad-14.jpg', 'assets/ads/ad-14.jpg', 'assets/ads/ad-17.jpg'],
};

const featuredAds = [15, 19, 17, 20, 14, 12, 9, 5].map((n) => `assets/ads/ad-${String(n).padStart(2, '0')}.jpg`);
const allAds = Array.from({ length: 20 }, (_, index) => `assets/ads/ad-${String(index + 1).padStart(2, '0')}.jpg`);

function Logo({ className = '' }) {
  return <img className={`logo ${className}`} src="assets/brand/trap-ramen-logo.png" alt="Trap Ramen — Ramen Done Different" />;
}

function BrushButton({ href, children, variant = 'red', onClick }) {
  return (
    <a className={`brush-button brush-button--${variant}`} href={href} onClick={onClick}>
      <span>{children}</span><ArrowRight aria-hidden="true" size={20} strokeWidth={3} />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <a href="#top" className="brand-link" aria-label="Trap Ramen home" onClick={close}><Logo /></a>
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <a href="#menu" onClick={close}>Menu</a>
        <a href="#specials" onClick={close}>Specials</a>
        <a href="#gallery" onClick={close}>Gallery</a>
        <a href="#visit" onClick={close}>Visit</a>
      </nav>
      <a className="header-order" href={phoneHref}><Phone size={17} aria-hidden="true" /> Order now</a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-chopsticks" aria-hidden="true" />
      <div className="hero-copy">
        <h1><span>Ramen</span><strong>done</strong><em>different.</em></h1>
        <p>Big flavor. No shortcuts. Built in Clinton Township.</p>
        <div className="hero-actions">
          <BrushButton href={phoneHref}>Call to order</BrushButton>
          <BrushButton href="#menu" variant="ghost">View menu</BrushButton>
        </div>
      </div>
      <div className="hero-food-wrap" aria-hidden="true">
        <span className="hero-sun" />
        <img src="assets/food/pineapple-bowl-cutout.png" alt="" />
        <span className="price-sticker"><strong>STACKED</strong><small>YOUR WAY</small></span>
      </div>
      <div className="hero-chinese" aria-hidden="true">拉麵</div>
      <div className="hero-mantra"><span>Same trap.</span> Different level.</div>
    </section>
  );
}

function MenuSection() {
  const [active, setActive] = useState('ramen');
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? menuGroups[active] : menuGroups[active].slice(0, 4);

  const changeCategory = (key) => {
    setActive(key);
    setExpanded(false);
  };

  return (
    <section className="menu-section" id="menu">
      <div className="category-tabs" role="tablist" aria-label="Menu categories">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button key={key} type="button" role="tab" aria-selected={active === key} onClick={() => changeCategory(key)}>{label}</button>
        ))}
      </div>
      <div className="favorites-title">
        <i aria-hidden="true" />
        <h2>Fan <em>favorites</em></h2>
        <i aria-hidden="true" />
      </div>
      <p className="favorites-intro">Tap a category, then call to build your order.</p>
      <div className="menu-list" role="tabpanel">
        {visibleItems.map((item, index) => (
          <article className="menu-item" key={item.name} style={{ '--delay': `${index * 35}ms` }}>
            <img src={menuVisuals[active][index % menuVisuals[active].length]} alt="" loading="lazy" />
            <div><h3>{item.name}</h3><p>{item.desc}</p></div>
            <strong>{item.price}</strong>
            <ChevronRight className="menu-chevron" aria-hidden="true" />
          </article>
        ))}
      </div>
      {menuGroups[active].length > 4 && (
        <button className="menu-expand" type="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show fan favorites' : `See full ${categoryLabels[active]} menu`} <ArrowRight size={18} />
        </button>
      )}
      <div className="menu-note">
        <span>SAUCES</span> Yum Yum · Teriyaki · Garlic Butter · Spicy Yum Yum · Spicy Teriyaki<br />
        <small>Prices and availability may change. Call with allergy questions.</small>
      </div>
    </section>
  );
}

function Specials() {
  const railRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);
  const scroll = (direction) => railRef.current?.scrollBy({ left: direction * Math.min(640, window.innerWidth * 0.78), behavior: 'smooth' });

  useEffect(() => {
    if (!activeImage) return;
    const onKey = (event) => event.key === 'Escape' && setActiveImage(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeImage]);

  return (
    <section className="specials-section" id="specials">
      <div className="section-heading specials-heading">
        <div>
          <span className="section-number">02 / RECENT DROPS</span>
          <h2>What’s <em>dropping.</em></h2>
        </div>
        <div className="rail-controls">
          <button type="button" aria-label="Previous promotions" onClick={() => scroll(-1)}><ChevronLeft /></button>
          <button type="button" aria-label="Next promotions" onClick={() => scroll(1)}><ChevronRight /></button>
        </div>
      </div>
      <p className="specials-disclaimer">Promos rotate. Tap any flyer to see it full-size, and call to confirm today’s availability.</p>
      <div className="specials-rail" ref={railRef}>
        {featuredAds.map((src, index) => (
          <button type="button" className={`promo-card promo-card--${index % 3}`} key={src} onClick={() => setActiveImage(src)} aria-label={`Open promotion ${index + 1}`}>
            <img src={src} alt={`Trap Ramen promotional flyer ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Promotion preview" onClick={() => setActiveImage(null)}>
          <button type="button" className="lightbox-close" aria-label="Close preview"><X /></button>
          <img src={activeImage} alt="Trap Ramen promotion enlarged" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const visibleAds = useMemo(() => showAll ? allAds : allAds.slice(0, 8), [showAll]);

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-intro">
        <span className="section-number">03 / THE WALL</span>
        <h2>Eat the <em>culture.</em></h2>
        <p>Big bowls, louder flavor, and every drop we’ve put into the world.</p>
      </div>
      <div className="gallery-mosaic">
        <figure className="gallery-food">
          <img src="assets/food/pineapple-bowls.jpg" alt="Two Trap Ramen pineapple bowls with chicken, steak and shrimp" loading="lazy" />
          <figcaption>Built loud. Served fresh.</figcaption>
        </figure>
        {visibleAds.map((src, index) => (
          <figure className="gallery-tile" key={src}>
            <img src={src} alt={`Trap Ramen campaign artwork ${index + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
      <button className="archive-toggle" type="button" onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show fewer drops' : 'Open the full drop archive'} <ArrowRight size={18} />
      </button>
    </section>
  );
}

function Visit() {
  return (
    <section className="visit-section" id="visit">
      <div className="visit-copy">
        <span className="section-number">04 / CLINTON TOWNSHIP</span>
        <h2>Pull up <em>hungry.</em></h2>
        <p>We’ll handle the rest.</p>
      </div>
      <div className="visit-details">
        <a href="https://maps.google.com/?q=33415+Harper+Clinton+Township+MI+48035" target="_blank" rel="noreferrer" className="visit-line">
          <MapPin aria-hidden="true" /><span><strong>33415 Harper</strong>Clinton Township, MI 48035</span><ArrowRight />
        </a>
        <a href={phoneHref} className="visit-line">
          <Phone aria-hidden="true" /><span><strong>{phoneDisplay}</strong>Call to order</span><ArrowRight />
        </a>
        <div className="visit-line">
          <Clock3 aria-hidden="true" /><span><strong>Tuesday–Thursday</strong>2 PM–10 PM</span><span className="visit-hours">Fri–Sat · 2 PM–11 PM<br />Sun–Mon · Closed</span>
        </div>
        <a href="https://www.instagram.com/trapramen" target="_blank" rel="noreferrer" className="visit-line">
          <InstagramIcon /><span><strong>@TRAPRAMEN</strong>Follow the next drop</span><ArrowRight />
        </a>
      </div>
      <div className="visit-map" aria-hidden="true">
        <div className="map-grid" />
        <MapPin />
        <span>HARPER AVE.</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <Logo />
      <div className="footer-mantra">Good food. Good vibes. <em>Always.</em></div>
      <div className="footer-links"><a href="#menu">Menu</a><a href="#specials">Specials</a><a href={phoneHref}>Call</a></div>
      <small>© {new Date().getFullYear()} Trap Ramen. Prices and availability may change.</small>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <Specials />
        <Gallery />
        <Visit />
      </main>
      <Footer />
      <a className="mobile-order" href={phoneHref}><Phone size={20} /> Call to order <ArrowRight size={20} /></a>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
