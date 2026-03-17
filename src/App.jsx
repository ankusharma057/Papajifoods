import { useState, useEffect, useRef } from "react";
import "./papaji.css";

const SLIDES = [
  {
    bg: "/Papaji-Product-Catalogue-6-5.jpg",
    title: "Pure & Authentic Spices",
    sub: "Straight from the farms of India",
  },
  {
    bg: "/Local-Collaboration.jpg",
    title: "Bold Flavours, Rich Heritage",
    sub: "Crafted with generations of expertise",
  },
  {
    bg: "/Schezwan-Sauce.jpg",
    title: "Spice Up Every Moment",
    sub: "Premium blends for every kitchen",
  },
];

const SPICES = [
  {
    name: "Turmeric Powder",
    origin: "Kerala, India",
    heat: "🌶",
    price: "₹120",
    img: "/Gemini_Generated_Image_65aya665aya665ay.png",
    accent: "#f59e0b",
  },
  {
    name: "Red Chilli Powder",
    origin: "Rajasthan, India",
    heat: "🌶🌶🌶",
    price: "₹95",
    img: "/Gemini_Generated_Image_9rbak99rbak99rba.png",
    accent: "#dc2626",
  },
  {
    name: "Cumin Seeds",
    origin: "Gujarat, India",
    heat: "🌶",
    price: "₹85",
    img: "/Gemini_Generated_Image_dn4mq0dn4mq0dn4m.png",
    accent: "#92400e",
  },
  {
    name: "Coriander Powder",
    origin: "Madhya Pradesh",
    heat: "🌶",
    price: "₹75",
    img: "/Gemini_Generated_Image_en2goxen2goxen2g.png",
    accent: "#16a34a",
  },
  {
    name: "Garam Masala",
    origin: "Punjab, India",
    heat: "🌶🌶",
    price: "₹150",
    img: "/Gemini_Generated_Image_o334b7o334b7o334.png",
    accent: "#ea580c",
  },
  {
    name: "Black Pepper",
    origin: "Karnataka, India",
    heat: "🌶🌶",
    price: "₹200",
    img: "/Gemini_Generated_Image_oe348noe348noe34.png",
    accent: "#1e293b",
  },
  {
    name: "Cardamom",
    origin: "Sikkim, India",
    heat: "🌶",
    price: "₹350",
    img: "/Gemini_Generated_Image_zandl7zandl7zand.png",
    accent: "#15803d",
  },
  {
    name: "Saffron",
    origin: "Kashmir, India",
    heat: "✨",
    price: "₹800",
    img: "/Gemini_Generated_Image_65aya665aya665ay.png",
    accent: "#b45309",
  },
];

const NEWS_TABS = ["Latest News", "Company Updates", "Product News"]

const NEWS_ITEMS = [
  {
    tab: "Latest News",
    date: "March 10, 2026",
    title: "Papaji Wins Best Spice Brand at India Food Awards",
    desc: "Our commitment to purity and authenticity has been recognised at the prestigious India Food Awards 2026, winning the Best Spice Brand category.",
    img: "/Local-Collaboration.jpg",
    accent: "#f59e0b",
    slides: [
      { title: "The Award Ceremony", body: "Held in Mumbai, the India Food Awards celebrated the finest in Indian food industry. Papaji stood out among 200+ nominees for its farm-direct sourcing model." },
      { title: "What This Means", body: "This recognition validates our 30-year journey of bringing authentic spices from Indian farms to kitchens across the country." },
      { title: "Thank You", body: "A heartfelt thanks to our 200+ farming partners and 1M+ loyal customers who made this possible." },
    ]
  },
  {
    tab: "Company Updates",
    date: "February 20, 2026",
    title: "Papaji Expands to 5 New States Across India",
    desc: "We are thrilled to announce our expansion into Assam, Meghalaya, Tripura, Manipur and Nagaland — bringing authentic spices to the Northeast.",
    img: "/Papaji-Product-Catalogue-6-5.jpg",
    accent: "#3b82f6",
    slides: [
      { title: "Northeast Expansion", body: "Our new distribution network covers 500+ retail outlets across 5 northeastern states, making Papaji accessible to millions of new customers." },
      { title: "Local Partnerships", body: "We've partnered with local distributors to ensure fresh stock and timely delivery across the region." },
      { title: "New Warehouses", body: "Two new cold-storage warehouses have been set up in Guwahati and Imphal to maintain product freshness." },
    ]
  },
  {
    tab: "Product News",
    date: "January 15, 2026",
    title: "Introducing Papaji Schezwan Sauce — Bold & Fiery",
    desc: "Our newest product — Schezwan Sauce — is here. Made with hand-picked red chillis and authentic spices, it's the perfect fusion of Indian and Asian flavours.",
    img: "/Schezwan-Sauce.jpg",
    accent: "#dc2626",
    slides: [
      { title: "What's Inside", body: "A bold blend of red chillis, garlic, ginger and Papaji's signature spice mix — no artificial preservatives, no shortcuts." },
      { title: "How to Use", body: "Perfect as a dip, spread, or cooking sauce. Pairs beautifully with momos, noodles, fried rice and more." },
      { title: "Where to Buy", body: "Available now on our website and at 2000+ retail stores across India. Look for the iconic red bottle." },
    ]
  },
]

const PRODUCTS = [
  { name: 'Schezwan Sauce',   img: '/Schezwan-Sauce.jpg',                        bg: '#c2410c', tag: 'Bold & Fiery' },
  { name: 'Masala Chai',      img: '/Masala-Chai-Icon.jpg',                      bg: '#92400e', tag: 'Warm & Aromatic' },
  { name: 'Flavoured Mayo',   img: '/Flavoured-Mayo-Style-Sauce-300g.jpeg',      bg: '#1e3a5f', tag: 'Creamy & Rich' },
  { name: 'Garam Masala',     img: '/Gemini_Generated_Image_o334b7o334b7o334.png', bg: '#14532d', tag: 'Classic Blend' },
]

const BlobSVG = ({ color }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="blob-svg"
  >
    <path
      fill={color}
      d="M44.7,-67.1C56.3,-60.3,62.7,-44.6,68.4,-28.8C74.1,-13,79.1,2.9,75.6,16.7C72.1,30.5,60.1,42.2,47.1,51.8C34.1,61.4,20.1,68.9,4.2,72.1C-11.7,75.3,-29.5,74.2,-43.1,65.5C-56.7,56.8,-66.1,40.5,-70.3,23.3C-74.5,6.1,-73.5,-12,-66.2,-27.1C-58.9,-42.2,-45.3,-54.3,-31.1,-60.5C-16.9,-66.7,-2.1,-67,13.2,-67.2C28.5,-67.4,33.1,-73.9,44.7,-67.1Z"
      transform="translate(100 100)"
    />
  </svg>
);

export default function App() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [spiceIdx, setSpiceIdx] = useState(0);
  const [activeTab, setActiveTab] = useState(0)
  const [slideOpen, setSlideOpen] = useState(false)
  const [slideItem, setSlideItem] = useState(null)

  const openSlide = (item) => { setSlideItem(item); setSlideOpen(true) }
  const closeSlide = () => setSlideOpen(false)
  const activeNews = NEWS_ITEMS[activeTab]
  const timerRef = useRef(null);
  const spiceTimerRef = useRef(null);
  const trackRef = useRef(null);
  const isJumping = useRef(false);

  // 3 clones at start + 3 at end for seamless loop
  const CLONE_COUNT = 3;
  const CLONED = [
    ...SPICES.slice(-CLONE_COUNT),
    ...SPICES,
    ...SPICES.slice(0, CLONE_COUNT),
  ];
  // real items start at index CLONE_COUNT
  const realStart = CLONE_COUNT;

  const goSpice = (idx) => {
    if (isJumping.current) return;
    setSpiceIdx(idx);
  };

  const spicePrev = () => goSpice(spiceIdx - 1);
  const spiceNext = () => goSpice(spiceIdx + 1);

  const handleTrackTransitionEnd = () => {
    const total = SPICES.length;
    if (spiceIdx < 0) {
      isJumping.current = true;
      trackRef.current.style.transition = "none";
      setSpiceIdx(spiceIdx + total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (trackRef.current) trackRef.current.style.transition = "";
          isJumping.current = false;
        }),
      );
    } else if (spiceIdx >= total) {
      isJumping.current = true;
      trackRef.current.style.transition = "none";
      setSpiceIdx(spiceIdx - total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (trackRef.current) trackRef.current.style.transition = "";
          isJumping.current = false;
        }),
      );
    }
  };

  useEffect(() => {
    spiceTimerRef.current = setInterval(() => {
      setSpiceIdx((i) => i + 1);
    }, 2500);
    return () => clearInterval(spiceTimerRef.current);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setCurrent(i);
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      4000,
    );
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Scroll-triggered animations
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".about-left, .about-right, .about-feat, .about-stat",
    );

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" },
    );

    elements.forEach((el) => {
      el.classList.remove("in-view");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax on scroll inside about section
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const shift = (progress - 0.5) * 80;
      section.querySelectorAll(".about-img-stack").forEach((el, i) => {
        el.style.transform = `translateY(${i % 2 === 0 ? -shift : shift}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="papaji-root">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => scrollTo("home")}>
            <span className="logo-text">Papaji</span>
            <span className="logo-caption">foods</span>
          </div>
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a onClick={() => scrollTo("home")}>Home</a>
            <a onClick={() => scrollTo("about")}>About</a>
            <a onClick={() => scrollTo("contact")}>Contact</a>
          </nav>
          <div className="header-actions">
            <button className="btn-login" onClick={() => setLoginOpen(true)}>
              Login
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen((m) => !m)}
              aria-label="menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div className="modal-overlay" onClick={() => setLoginOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setLoginOpen(false)}>
              ✕
            </button>
            <div className="modal-logo">🌶 Papaji</div>
            <h2>Welcome Back</h2>
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <button className="btn-submit">Login</button>
            <p className="modal-footer">
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </div>
        </div>
      )}

      {/* BANNER SLIDER */}
      <section id="home" className="slider">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.bg})` }}
          >
            <div className="slide-overlay" />
            <div className="slide-content">
              <h1>{s.title}</h1>
              <p>{s.sub}</p>
              <button className="btn-cta" onClick={() => scrollTo("spices")}>
                Explore Spices
              </button>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          className="slider-arrow left"
          onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        >
          &#8249;
        </button>
        <button
          className="slider-arrow right"
          onClick={() => goTo((current + 1) % SLIDES.length)}
        >
          &#8250;
        </button>
      </section>

      {/* SPICES LISTING */}
      <section id="spices" className="section spices-section">
        <div className="section-tag">Our Collection</div>
        <h2 className="section-title">Premium Spices</h2>
        <p className="section-sub">
          Hand-picked, sun-dried, and packed with flavour
        </p>

        <div className="spices-slider-outer">
          <button className="sc-arrow-side" onClick={spicePrev}>
            &#8249;
          </button>

          <div className="spices-slider-wrap">
            {/* 
              CLONED = [last3, ...SPICES(8), first3] = 14 items
              spiceIdx goes 0..7 (maps to SPICES[0..7])
              center card in CLONED = spiceIdx + CLONE_COUNT
              translateX so center card is in middle slot:
                offset = (centerInCloned - 1) * cardWidth
                       = (spiceIdx + CLONE_COUNT - 1) * (100/3)%
            */}
            <div
              className="spices-track"
              ref={trackRef}
              onTransitionEnd={handleTrackTransitionEnd}
              style={{
                transform: `translateX(-${(spiceIdx + CLONE_COUNT - 1) * (100 / 3)}%)`,
              }}
            >
              {CLONED.map((s, i) => {
                const centerInCloned = spiceIdx + CLONE_COUNT;
                const isCenter = i === centerInCloned;
                return (
                  <div
                    className={`spice-card ${isCenter ? "active" : ""}`}
                    key={i}
                    style={{ "--accent": s.accent }}
                  >
                    <div className="spice-blob-wrap">
                      <BlobSVG color={s.accent} />
                      <img src={s.img} alt={s.name} className="spice-img" />
                    </div>
                    <h3>{s.name}</h3>
                    <div className="spice-tags">
                      <span className="spice-tag">✔ {s.heat} Heat</span>
                      <span className="spice-tag">✔ Pure</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="sc-arrow-side" onClick={spiceNext}>
            &#8250;
          </button>
        </div>

        <div className="spices-controls">
          <div className="sc-dots">
            {SPICES.map((_, i) => (
              <span
                key={i}
                className={`sc-dot ${((spiceIdx % SPICES.length) + SPICES.length) % SPICES.length === i ? "active" : ""}`}
                onClick={() => setSpiceIdx(i)}
              />
            ))}
          </div>
          <button className="btn-view-all">View All ›</button>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="about-section">
        {/* ROW 1 — left image, right content */}
        <div className="about-split">
          <div className="about-left">
            <div className="about-img-stack">
              <div className="about-img-deco" />
              <img
                src="/Papaji-Product-Catalogue-7.jpg"
                alt="Papaji"
                className="about-main-img"
              />
              <div className="about-pill pill-top">🌶 Since 1994</div>
              <div className="about-pill pill-bottom">
                ✨ 1M+ Happy Customers
              </div>
            </div>
          </div>
          <div className="about-right">
            <div className="about-tag-line">Our Story</div>
            <h2 className="about-title">
              Spices that carry
              <br />
              <span>the soul of India</span>
            </h2>
            <p className="about-desc">
              Indulge in the authentic taste of our preservative-free chai
              premixes, capturing the essence of traditional Indian tea. Crafted
              with care, our Elaichi Chai, Masala Chai, Jaggery Chai, and Pink
              Chai blends transport you to a world of warmth and comfort. Our
              chai machines are proudly serving customers all across Canada,
              from Brampton, Toronto, and Mississauga to Surrey, Montreal, and
              even Winnipeg. No matter where you are in Canada, you can enjoy
              the convenience and delight of our chai machines, bringing premium
              chai right to your doorstep. Shoot us a message and we will send
              you some chaitastic 🙂 samples.
            </p>
            <p className="about-desc">
              From saffron fields of Kashmir to pepper vines of Karnataka —
              every product carries the soul of its origin.
            </p>
            <div className="about-features">
              <div className="about-feat">
                <div className="about-feat-icon">🌱</div>
                <div>
                  <h5>Farm Direct</h5>
                  <p>No middlemen. Pure quality straight from the source.</p>
                </div>
              </div>
              <div className="about-feat">
                <div className="about-feat-icon">🔬</div>
                <div>
                  <h5>Lab Tested</h5>
                  <p>Every batch tested for purity and freshness.</p>
                </div>
              </div>
              <div className="about-feat">
                <div className="about-feat-icon">📦</div>
                <div>
                  <h5>Sealed Fresh</h5>
                  <p>Airtight packaging locks aroma from grind to kitchen.</p>
                </div>
              </div>
            </div>
            <div className="about-stats-row">
              <div className="about-stat">
                <span>30+</span>
                <p>Years</p>
              </div>
              <div className="about-stat">
                <span>50+</span>
                <p>Varieties</p>
              </div>
              <div className="about-stat">
                <span>1M+</span>
                <p>Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 — left content, right image */}
        <div className="about-split">
          <div className="about-right">
            <div className="about-tag-line">Our Process</div>
            <h2 className="about-title">
              From harvest to
              <br />
              <span>your kitchen table</span>
            </h2>
            <p className="about-desc">
              Enhance your meals with our signature condiments. Our Tandoori
              Mayo, Achari Mayo, and Regular Mayo add a perfect blend of flavors
              and creaminess to your dishes. Explore our range of condiments,
              including the fiery Chilly Garlic Sauce, the bold Shezwan Chutney,
              and our versatile Tandoori, Achari, and Peri Peri concentrate
              powders. They are designed to elevate your culinary creations with
              their distinctive tastes..
            </p>
            <p className="about-desc">
              We work with over 200 farming families across 15 states, ensuring
              fair trade practices and sustainable agriculture at every step.
            </p>
            <div className="about-features">
              <div className="about-feat">
                <div className="about-feat-icon">☀️</div>
                <div>
                  <h5>Sun Dried</h5>
                  <p>
                    Natural drying preserves essential oils and deep colour.
                  </p>
                </div>
              </div>
              <div className="about-feat">
                <div className="about-feat-icon">🤝</div>
                <div>
                  <h5>Fair Trade</h5>
                  <p>
                    200+ farming families, fair wages, sustainable practices.
                  </p>
                </div>
              </div>
              <div className="about-feat">
                <div className="about-feat-icon">🏆</div>
                <div>
                  <h5>Award Winning</h5>
                  <p>Recognised for quality by FSSAI and export councils.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-left">
            <div className="about-img-stack">
              <div className="about-img-deco about-img-deco-right" />
              <img
                src="/Local-Collaboration.jpg"
                alt="Papaji Process"
                className="about-main-img"
              />
              <div className="about-pill pill-top">🏆 Award Winning</div>
              <div className="about-pill pill-bottom">🌿 200+ Farmers</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S NEW */}
      <section id="whatsnew" className="whatsnew-section">
        <div className="whatsnew-header">
          <div className="section-tag">What's New</div>
          <h2 className="whatsnew-title">The World of Papaji</h2>
          <button className="btn-view-more" onClick={() => openSlide(activeNews)}>View More ›</button>
        </div>

        <div className="whatsnew-body">
          {/* Main card */}
          <div className="whatsnew-card" onClick={() => openSlide(activeNews)}>
            <div className="whatsnew-card-img">
              <img src={activeNews.img} alt={activeNews.title} />
              <div className="whatsnew-card-overlay" style={{ background: `linear-gradient(to right, ${activeNews.accent}cc, transparent)` }} />
            </div>
            <div className="whatsnew-card-content">
              <span className="whatsnew-date">{activeNews.date}</span>
              <h3>{activeNews.title}</h3>
              <p>{activeNews.desc}</p>
              <button className="btn-read-more">Read More ›</button>
            </div>
          </div>

          {/* Vertical tabs */}
          <div className="whatsnew-tabs">
            {NEWS_TABS.map((tab, i) => (
              <button
                key={i}
                className={`whatsnew-tab ${i === activeTab ? 'active' : ''}`}
                style={{ '--tab-color': NEWS_ITEMS[i].accent }}
                onClick={(e) => { e.stopPropagation(); setActiveTab(i) }}
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS YOU LOVE */}
      <section className="pyl-section">
        <h2 className="pyl-heading">PRODUCTS YOU LOVE</h2>
        <div className="pyl-grid">
          {PRODUCTS.map((p, i) => (
            <div className="pyl-card" key={i} style={{ background: p.bg }}>
              <div className="pyl-img-wrap">
                <img src={p.img} alt={p.name} className="pyl-img" />
              </div>
              <div className="pyl-card-footer">
                <span className="pyl-name">{p.name.toUpperCase()}</span>
                <button className="pyl-arrow">›</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(3)].map((_, ri) =>
            ['Spices', 'Sauces', 'Masala Blends', 'Chai', 'Mayo', 'Schezwan', 'Chutneys', 'Seasonings'].map((item, i) => (
              <span key={`${ri}-${i}`} className="marquee-item">
                <span className="marquee-dot" />
                {item.toUpperCase()}
              </span>
            ))
          )}
        </div>
      </div>

      {/* SLIDE PANEL */}
      {slideOpen && slideItem && (
        <div className="slide-panel-overlay" onClick={closeSlide}>
          <div className="slide-panel" onClick={e => e.stopPropagation()}>
            <button className="slide-panel-close" onClick={closeSlide}>✕</button>
            <div className="slide-panel-img">
              <img src={slideItem.img} alt={slideItem.title} />
            </div>
            <div className="slide-panel-body">
              <span className="whatsnew-date">{slideItem.date}</span>
              <h2>{slideItem.title}</h2>
              <p className="slide-panel-desc">{slideItem.desc}</p>
              <div className="slide-panel-slides">
                {slideItem.slides.map((s, i) => (
                  <div key={i} className="slide-panel-item">
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <div className="section-tag">Get In Touch</div>
        <h2 className="section-title">Contact Us</h2>
        <p className="section-sub">We'd love to hear from you</p>
        <div className="contact-inner">
          <div className="contact-info">
            <div className="contact-item">
              <span>📍</span>
              <p>123 Spice Market, Old Delhi, India</p>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-item">
              <span>✉️</span>
              <p>hello@papaji.in</p>
            </div>
            <div className="contact-item">
              <span>🕐</span>
              <p>Mon–Sat: 9am – 6pm IST</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your message..." rows="4" required />
            <button type="submit" className="btn-submit">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">Papaji</span>
              <span className="logo-caption">foods</span>
            </div>
            <p>
              Bringing the authentic taste of India to your kitchen since 1994.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="Instagram">
                in
              </a>
              <a href="#" aria-label="Twitter">
                𝕏
              </a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a onClick={() => scrollTo("home")}>Home</a>
            <a onClick={() => scrollTo("spices")}>Spices</a>
            <a onClick={() => scrollTo("about")}>About</a>
            <a onClick={() => scrollTo("contact")}>Contact</a>
          </div>
          <div className="footer-links">
            <h4>Categories</h4>
            <a href="#">Whole Spices</a>
            <a href="#">Ground Spices</a>
            <a href="#">Masala Blends</a>
            <a href="#">Exotic Spices</a>
          </div>
          <div className="footer-links">
            <h4>Support</h4>
            <a href="#">FAQ</a>
            <a href="#">Shipping Policy</a>
            <a href="#">Return Policy</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Papaji. All rights reserved. Made with ❤️ in India.</p>
        </div>
      </footer>
    </div>
  );
}
