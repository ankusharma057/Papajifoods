import { useState, useEffect, useRef } from "react";
import "./papaji.css";

const HERO_PRODUCTS = [
  {
    nameFirst: "Cardamom",
    nameLast: "Chai",
    bgWord: "CHAI",
    tag: "PREMIUM PREMIX — 200G",
    img: "/Cardamom-Milk-Icon.jpg",
    badges: ["Vegan", "Halal", "Canada"],
  },
  {
    nameFirst: "Masala",
    nameLast: "Chai",
    bgWord: "CHAI",
    tag: "PREMIUM PREMIX — 200G",
    img: "/Masala-Chai-Icon.jpg",
    badges: ["Vegan", "Halal", "Canada"],
  },
  {
    nameFirst: "Schezwan",
    nameLast: "Sauce",
    bgWord: "SAUCE",
    tag: "SIGNATURE SAUCE — 300G",
    img: "/Schezwan-Sauce-New.jpg",
    badges: ["Vegan", "Halal", "Canada"],
  },
  {
    nameFirst: "Tandoori",
    nameLast: "Mayo",
    bgWord: "MAYO",
    tag: "CREAMY CONDIMENT — 250G",
    img: "/Tandoori-Mayo-Icon.jpg",
    badges: ["Halal", "Canada"],
  },
];

const FILTER_TABS = ["All", "Chai", "Sauces", "Mayo", "Halal", "Vegan"];

const BESTSELLERS = [
  // CHAI
  {
    name: "Cardamom Chai Premix",
    desc: "Rich aromatic cardamom — restaurant quality at home.",
    img: "/Cardamom-Milk-Icon.jpg",
    tags: ["Vegan", "Halal"],
    category: ["All", "Chai", "Vegan", "Halal"],
  },
  {
    name: "Masala Chai Premix",
    desc: "Bold warming spices — the classic Indian chai blend.",
    img: "/Masala-Chai-Icon.jpg",
    tags: ["Vegan", "GF"],
    category: ["Chai", "Vegan"],
  },
  {
    name: "Kadak Chai",
    desc: "Strong, full-bodied chai for the true chai lover.",
    img: "/Kadak-Chai-Icon.jpg",
    tags: ["Vegan", "GF"],
    category: ["Chai", "Vegan"],
  },
  {
    name: "Zafrani Chai",
    desc: "Saffron-infused premium chai — rich and aromatic.",
    img: "/Zafrani-Chai-Icon.jpg",
    tags: ["Vegan", "Halal"],
    category: ["Chai", "Vegan", "Halal"],
  },
  {
    name: "Pink Chai",
    desc: "Kashmiri noon chai — delicate, floral and creamy.",
    img: "/Pink-Tea-Icon.jpg",
    tags: ["Vegan"],
    category: ["Chai", "Vegan"],
  },
  {
    name: "Ginger Cardamom Chai",
    desc: "Zesty ginger meets fragrant cardamom in every sip.",
    img: "/Ginger-Cardamom-Icon.jpg",
    tags: ["Vegan", "Halal"],
    category: ["Chai", "Vegan", "Halal"],
  },
  // SAUCES
  {
    name: "Schezwan Sauce",
    desc: "Fiery Indo-Chinese. 1kg food service pack.",
    img: "/Schezwan-Sauce-New.jpg",
    tags: ["Vegan", "Halal"],
    category: ["All", "Sauces", "Vegan", "Halal"],
  },
  // MAYO
  {
    name: "Tandoori Mayo",
    desc: "Smoky spiced mayo — perfect for wraps & dips.",
    img: "/Tandoori-Mayo-Icon.jpg",
    tags: ["Halal"],
    category: ["All", "Mayo", "Halal"],
  },
  {
    name: "Peri Peri Mayo",
    desc: "Tangy, fiery peri peri — great for grills & burgers.",
    img: "/Peri-Peri-Mayo-Icon.jpg",
    tags: ["Halal"],
    category: ["Mayo", "Halal"],
  },
  {
    name: "Jalapeño Mayo",
    desc: "Cool heat of jalapeño in a creamy mayo base.",
    img: "/Jalapeno-Mayo-Icon.jpg",
    tags: ["Halal"],
    category: ["Mayo", "Halal"],
  },
  {
    name: "Achari Mayo",
    desc: "Tangy pickle-spiced mayo — uniquely Indian.",
    img: "/Achari-May-Icon.jpg",
    tags: ["Halal"],
    category: ["Mayo", "Halal"],
  },
  {
    name: "Vegan Plain Mayo",
    desc: "100% plant-based creamy mayo — clean and simple.",
    img: "/Vegan-Plain-Mayo-Icon.jpg",
    tags: ["Vegan"],
    category: ["Mayo", "Vegan"],
  },
  {
    name: "Italian Herb & Garlic",
    desc: "Herb-infused mayo with roasted garlic notes.",
    img: "/Italian-Herb-and-Garlic-Icon.jpg",
    tags: ["Vegan"],
    category: ["Mayo", "Vegan"],
  },
];

const NEWS_ITEMS = [
  {
    tab: "Latest News",
    category: "LATEST NEWS",
    date: "March 2026",
    title: "Papaji Foods Expands Across Major Canadian Retailers",
    desc: "Our products are now available at major Canadian retailers nationwide, bringing authentic flavours closer to every kitchen.",
    icon: "🏆",
    accent: "#E65300",
    slides: [
      { title: "The Expansion", body: "Papaji Foods is now stocked in 500+ retail locations across Canada including major grocery chains." },
      { title: "What This Means", body: "Customers across Canada can now find their favourite chai premixes and sauces at their local store." },
      { title: "Thank You", body: "A heartfelt thanks to our 1M+ loyal customers who made this expansion possible." },
    ]
  },
  {
    tab: "Company Updates",
    category: "COMPANY UPDATES",
    date: "Feb 2026",
    title: "New Chai Machine Partnership",
    desc: "We've partnered with leading hospitality chains to bring our chai machines to restaurants and cafes across the GTA.",
    icon: "🤝",
    accent: "#E65300",
    slides: [
      { title: "The Partnership", body: "Our chai machines are now deployed in 200+ hospitality locations across the Greater Toronto Area." },
      { title: "What's Next", body: "We plan to expand to Vancouver and Montreal by end of 2026." },
      { title: "For Businesses", body: "Interested in a chai machine for your business? Contact us at sales@papajifoods.com" },
    ]
  },
  {
    tab: "Product News",
    category: "PRODUCT NEWS",
    date: "Jan 2026",
    title: "3 New Mayo Flavours Launched",
    desc: "We've launched three exciting new mayo flavours — Italian Herb & Garlic, Jalapeño, and Vegan Plain — available now.",
    icon: "🆕",
    accent: "#E65300",
    slides: [
      { title: "New Flavours", body: "Italian Herb & Garlic, Jalapeño Mayo, and Vegan Plain Mayo are now available online and in stores." },
      { title: "Why We Made Them", body: "Customer feedback drove us to expand our mayo range with more vegan and bold flavour options." },
      { title: "Where to Buy", body: "Available now on our website and at select retailers across Canada." },
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
  const [heroIdx, setHeroIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false)
  const [slideItem, setSlideItem] = useState(null)

  const openSlide = (item) => { setSlideItem(item); setSlideOpen(true) }
  const closeSlide = () => setSlideOpen(false)
  const timerRef = useRef(null);

  // Header scroll effect
  useEffect(() => {
    const header = document.querySelector('.header');
    const onScroll = () => {
      if (window.scrollY > 10) header?.classList.add('scrolled');
      else header?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero product auto-rotation
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_PRODUCTS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Scroll reveal for bestseller cards
  useEffect(() => {
    const cards = document.querySelectorAll('.bs-card');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Array.from(cards).indexOf(e.target);
          setTimeout(() => e.target.classList.add('revealed'), idx * 100);
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [activeFilter]);

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
      {/* ANNOUNCEMENT BAR */}
      <div className="announce-bar">
        <span className="announce-new-badge">NEW</span>
        <span className="announce-leaf">✿</span>
        <span className="announce-text">Free delivery across GTA on orders $49+</span>
        <a href="#" className="announce-link">Shop Now →</a>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => scrollTo("home")}>
            <span className="logo-text">Papaji</span>
            <span className="logo-dot">.</span>
            <span className="logo-caption">Foods</span>
          </div>
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a onClick={() => scrollTo("spices")}>Products</a>
            <a href="#">Recipes</a>
            <a href="#">Wholesale</a>
            <a onClick={() => scrollTo("about")}>About</a>
            <a onClick={() => scrollTo("whatsnew")}>News</a>
          </nav>
          <div className="header-actions">
            <a href="#" className="btn-find-product">Find Product →</a>
            <button className="btn-shop-now" onClick={() => scrollTo("spices")}>Shop Now</button>
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

      {/* HERO */}
      <section id="home" className="hero-split">
        {/* LEFT — dark panel */}
        <div className="hero-left">
          <div className="hero-left-inner">
            {/* two pill badges */}
            <div className="hero-pills">
              <span className="hero-pill">+ Made in Canada</span>
              <span className="hero-pill hero-pill-orange">Est. 2015</span>
            </div>

            <h1 className="hero-headline">
              <span className="hero-h-white">Good Taste.</span>
              <span className="hero-h-orange">Good Health.</span>
              <span className="hero-h-gray">Papaji Foods.</span>
            </h1>

            <p className="hero-desc">
              Authentic Indian chai premixes, bold mayo sauces and fiery hakka sauces — crafted for every Canadian kitchen.
            </p>

            <div className="hero-btns">
              <button className="hero-btn-primary" onClick={() => scrollTo("spices")}>Explore Products →</button>
              <button className="hero-btn-secondary" onClick={() => scrollTo("about")}>Our Story →</button>
            </div>
          </div>
        </div>

        {/* RIGHT — cream panel */}
        <div className="hero-right">
          {/* faded bg word */}
          <div className="hero-right-bg-word">{HERO_PRODUCTS[heroIdx].bgWord}</div>

          {/* sparkle stars */}
          <span className="hero-sparkle">✦</span>
          <span className="hero-sparkle">✦</span>
          <span className="hero-sparkle">✦</span>
          <span className="hero-sparkle">✦</span>

          <div className="hero-product-showcase">
            {HERO_PRODUCTS.map((p, i) => (
              <div key={i} className={`hero-product-slide ${i === heroIdx ? "active" : ""}`}>
                <div className="hero-product-img-wrap">
                  <img src={p.img} alt={p.name} className="hero-product-img" />
                </div>
                <div className="hero-product-name">
                  <span className="hero-product-name-regular">{p.nameFirst} </span>
                  <span className="hero-product-name-italic">{p.nameLast}</span>
                </div>
                <div className="hero-product-tag">{p.tag}</div>
                <div className="hero-badges">
                  {p.badges.map((b, j) => (
                    <span key={j} className={`hero-badge ${b === "Halal" ? "hero-badge-orange" : b === "Vegan" ? "" : "hero-badge-outline"}`}>{b}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="hero-dots">
              {HERO_PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot ${i === heroIdx ? "active" : ""}`}
                  onClick={() => setHeroIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...Array(4)].map((_, ri) =>
            ['Chai Premix', 'Vegan Sauces', 'Halal Certified', 'Gluten Free', 'Made in Canada', 'Free GTA Delivery'].map((item, i) => (
              <span key={`${ri}-${i}`} className="marquee-item">
                {item.toUpperCase()}
                <span className="marquee-dot">•</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* OUR COLLECTION — BESTSELLERS */}
      <section id="spices" className="bestsellers-section">
        <div className="bestsellers-header">
          <div className="bestsellers-header-left">
            <span className="bs-eyebrow">Most Popular</span>
            <h2 className="bs-title">Our <em>Bestsellers</em></h2>
          </div>
          <button className="bs-view-all" onClick={() => setShowAllProducts(true)}>View All Products →</button>
        </div>

        {/* filter pills */}
        <div className="bs-filters">
          {FILTER_TABS.map((f) => (
            <button
              key={f}
              className={`bs-filter ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* product grid — max 3 per category */}
        <div className="bs-grid">
          {BESTSELLERS
            .filter(p => p.category.includes(activeFilter))
            .slice(0, 3)
            .map((p, i) => (
              <div className="bs-card" key={`${activeFilter}-${i}`}>
                <div className="bs-card-img">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="bs-card-body">
                  <div className="bs-card-tags">
                    {p.tags.map((t, j) => (
                      <span key={j} className={`bs-tag ${t === "Halal" ? "bs-tag-orange" : ""}`}>{t}</span>
                    ))}
                  </div>
                  <h3 className="bs-card-name">{p.name}</h3>
                  <p className="bs-card-desc">{p.desc}</p>
                  <a href="#" className="bs-card-link">View Product →</a>
                </div>
              </div>
            ))}
        </div>

        {/* show count hint */}
        {BESTSELLERS.filter(p => p.category.includes(activeFilter)).length > 3 && (
          <div className="bs-more-hint">
            +{BESTSELLERS.filter(p => p.category.includes(activeFilter)).length - 3} more in this category —{" "}
            <button className="bs-more-link" onClick={() => setShowAllProducts(true)}>View All</button>
          </div>
        )}
      </section>

      {/* ALL PRODUCTS MODAL */}
      {showAllProducts && (
        <div className="all-products-overlay" onClick={() => setShowAllProducts(false)}>
          <div className="all-products-modal" onClick={e => e.stopPropagation()}>
            <div className="all-products-header">
              <h2>All Products</h2>
              <button className="all-products-close" onClick={() => setShowAllProducts(false)}>✕</button>
            </div>
            {/* group by category */}
            {["Chai", "Sauces", "Mayo"].map(cat => {
              const items = BESTSELLERS.filter(p => p.category.includes(cat) && !p.category.includes("All") || (p.category.includes("All") && p.category.includes(cat)));
              const unique = BESTSELLERS.filter(p => p.category.includes(cat));
              return (
                <div key={cat} className="all-products-group">
                  <h3 className="all-products-cat">{cat}</h3>
                  <div className="all-products-grid">
                    {unique.map((p, i) => (
                      <div className="all-products-card" key={i}>
                        <div className="all-products-img">
                          <img src={p.img} alt={p.name} />
                        </div>
                        <div className="all-products-info">
                          <div className="bs-card-tags">
                            {p.tags.map((t, j) => (
                              <span key={j} className={`bs-tag ${t === "Halal" ? "bs-tag-orange" : ""}`}>{t}</span>
                            ))}
                          </div>
                          <p className="all-products-name">{p.name}</p>
                          <p className="all-products-desc">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FEATURED PRODUCT — CHAI MACHINE */}
      <section className="fp-section">
        {/* LEFT — dark panel with glow */}
        <div className="fp-left">
          <div className="fp-glow" />
          <span className="fp-sparkle fp-sparkle-1">✦</span>
          <span className="fp-sparkle fp-sparkle-2">✦</span>
          <span className="fp-sparkle fp-sparkle-3">✦</span>
          <div className="fp-img-wrap">
            <img src="/Chai machine 1.png" alt="Chai Machine" className="fp-img" />
          </div>
        </div>

        {/* RIGHT — cream panel */}
        <div className="fp-right">
          <span className="fp-eyebrow">Featured Product</span>
          <h2 className="fp-title">
            Chai Machine —<br />
            <em>Prebook Now</em>
          </h2>
          <p className="fp-desc">
            Built for North America with 110V compatibility. Perfectly brewed chai every time. Free GTA delivery on prebook.
          </p>
          <div className="fp-badges">
            <span className="fp-badge"><span className="fp-badge-dot" />110V Canada Ready</span>
            <span className="fp-badge"><span className="fp-badge-dot" />Free GTA Delivery</span>
            <span className="fp-badge"><span className="fp-badge-dot" />Halal</span>
          </div>
          <button className="fp-btn">Prebook Now →</button>
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
      <section id="whatsnew" className="wn-section">
        <div className="wn-header">
          <div>
            <span className="wn-eyebrow">What's New</span>
            <h2 className="wn-title">The World of <em>Papaji Foods</em></h2>
          </div>
          <button className="wn-view-more" onClick={() => openSlide(NEWS_ITEMS[0])}>View More →</button>
        </div>

        <div className="wn-grid">
          {NEWS_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`wn-card ${i === 0 ? "wn-card-featured" : ""}`}
              onClick={() => openSlide(item)}
            >
              <div className="wn-card-icon">
                {i === 2
                  ? <span className="wn-new-badge">NEW</span>
                  : <span className="wn-icon">{item.icon}</span>
                }
              </div>
              <div className="wn-card-body">
                <span className="wn-category">{item.category}</span>
                <span className="wn-date">{item.date}</span>
                <h3 className="wn-card-title">{item.title}</h3>
              </div>
            </div>
          ))}
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

      {/* SLIDE PANEL */}
      {slideOpen && slideItem && (
        <div className="slide-panel-overlay" onClick={closeSlide}>
          <div className="slide-panel" onClick={e => e.stopPropagation()}>
            <button className="slide-panel-close" onClick={closeSlide}>✕</button>
            <div className="slide-panel-body" style={{ paddingTop: '48px' }}>
              <span className="wn-category">{slideItem.category}</span>
              <span className="wn-date" style={{ display: 'block', marginTop: '4px', marginBottom: '12px' }}>{slideItem.date}</span>
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

      {/* NEWSLETTER / CONTACT */}
      <section id="contact" className="newsletter-section">
        {/* rotating mandala decoration */}
        <div className="newsletter-mandala" aria-hidden="true" />

        <div className="newsletter-inner">
          {/* LEFT */}
          <div className="newsletter-left">
            <span className="newsletter-eyebrow">Stay In Touch</span>
            <h2 className="newsletter-heading">
              Spice Up<br />
              Your <em>Inbox</em>
            </h2>
            <p className="newsletter-sub">
              Get exclusive recipes, new launches and offers delivered to you.
            </p>
          </div>

          {/* RIGHT */}
          <div className="newsletter-right">
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="your@email.com"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe →
              </button>
            </form>
            <p className="newsletter-disclaimer">
              *I'd like to receive updates from Papaji Foods. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">Papaji</span>
              <span className="logo-dot">.</span>
              <span className="logo-caption">Foods</span>
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
          <p>© 2026 Papaji Foods · Mississauga, Ontario, Canada</p>
        </div>
      </footer>
    </div>
  );
}
