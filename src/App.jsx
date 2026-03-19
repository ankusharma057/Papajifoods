import { useState, useEffect, useRef } from "react";
import "./papaji.css";

const HERO_PRODUCTS = [
  {
    nameFirst: "Cardamom",
    nameLast: "Chai",
    bgWord: "CHAI",
    tag: "PREMIUM PREMIX — 200G",
    img: "/chai/3-removebg-preview.png",
    badges: ["Vegan", "Halal", "Canada"],
  },
  {
    nameFirst: "Masala",
    nameLast: "Chai",
    bgWord: "CHAI",
    tag: "PREMIUM PREMIX — 200G",
    img: "/chai/9-removebg-preview.png",
    badges: ["Vegan", "Halal", "Canada"],
  },
  {
    nameFirst: "Schezwan",
    nameLast: "Sauce",
    bgWord: "SAUCE",
    tag: "SIGNATURE SAUCE — 300G",
    img: "/sauce/2.png",
    badges: ["Vegan", "Halal", "Canada"],
  },
  {
    nameFirst: "Tandoori",
    nameLast: "Mayo",
    bgWord: "MAYO",
    tag: "CREAMY CONDIMENT — 250G",
    img: "/mayo/6-removebg-preview.png",
    badges: ["Halal", "Canada"],
  },
];

const FILTER_TABS = ["All", "Chai", "Sauces", "Mayo", "Halal", "Vegan"];

const BESTSELLERS = [
  // CHAI
  {
    name: "Cardamom Chai Premix",
    desc: "Rich aromatic cardamom — restaurant quality at home.",
    img: "/chai/3-removebg-preview.png",
    tags: ["Vegan", "Halal"],
    category: ["All", "Chai", "Vegan", "Halal"],
  },
  {
    name: "Masala Chai Premix",
    desc: "Bold warming spices — the classic Indian chai blend.",
    img: "/chai/9-removebg-preview.png",
    tags: ["Vegan", "GF"],
    category: ["Chai", "Vegan"],
  },
  {
    name: "Kadak Chai",
    desc: "Strong, full-bodied chai for the true chai lover.",
    img: "/chai/6-removebg-preview.png",
    tags: ["Vegan", "GF"],
    category: ["Chai", "Vegan"],
  },
  {
    name: "Zafrani Chai",
    desc: "Saffron-infused premium chai — rich and aromatic.",
    img: "/chai/8-removebg-preview.png",
    tags: ["Vegan", "Halal"],
    category: ["Chai", "Vegan", "Halal"],
  },
  {
    name: "Pink Chai",
    desc: "Kashmiri noon chai — delicate, floral and creamy.",
    img: "/chai/10-removebg-preview.png",
    tags: ["Vegan"],
    category: ["Chai", "Vegan"],
  },
  {
    name: "Ginger Cardamom Chai",
    desc: "Zesty ginger meets fragrant cardamom in every sip.",
    img: "/chai/4-removebg-preview.png",
    tags: ["Vegan", "Halal"],
    category: ["Chai", "Vegan", "Halal"],
  },
  // SAUCES
  {
    name: "Schezwan Sauce",
    desc: "Fiery Indo-Chinese. 1kg food service pack.",
    img: "/sauce/2.png",
    tags: ["Vegan", "Halal"],
    category: ["All", "Sauces", "Vegan", "Halal"],
  },
  {
    name: "Chilli Garlic Sauce",
    desc: "Fiery Indo-Chinese. 1kg food service pack.",
    img: "/sauce/1.png",
    tags: ["Vegan", "Halal"],
    category: ["All", "Sauces", "Vegan", "Halal"],
  },
  // MAYO
  {
    name: "Tandoori Mayo",
    desc: "Smoky spiced mayo — perfect for wraps & dips.",
    img: "/mayo/6-removebg-preview.png",
    tags: ["Halal"],
    category: ["All", "Mayo", "Halal"],
  },
  {
    name: "Peri Peri Mayo",
    desc: "Tangy, fiery peri peri — great for grills & burgers.",
    img: "/mayo/3-removebg-preview.png",
    tags: ["Halal"],
    category: ["Mayo", "Halal"],
  },
  {
    name: "Jalapeño Mayo",
    desc: "Cool heat of jalapeño in a creamy mayo base.",
    img: "/mayo/4-removebg-preview.png",
    tags: ["Halal"],
    category: ["Mayo", "Halal"],
  },
  {
    name: "Achari Mayo",
    desc: "Tangy pickle-spiced mayo — uniquely Indian.",
    img: "/mayo/2-removebg-preview.png",
    tags: ["Halal"],
    category: ["Mayo", "Halal"],
  },
  {
    name: "Vegan Plain Mayo",
    desc: "100% plant-based creamy mayo — clean and simple.",
    img: "/mayo/5-removebg-preview.png",
    tags: ["Vegan"],
    category: ["Mayo", "Vegan"],
  },
  {
    name: "Italian Herb & Garlic",
    desc: "Herb-infused mayo with roasted garlic notes.",
    img: "/mayo/1.png",
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
  { name: 'Schezwan Sauce',   img: '/sauce/2.png',   bg: '#7B2D8B', tag: 'Bold & Fiery',    label: 'Sauce' },
  { name: 'Masala Chai',      img: '/chai/9-removebg-preview.png',   bg: '#29A8D4', tag: 'Warm & Aromatic', label: 'Chai' },
  { name: 'Tandoori Mayo',    img: '/mayo/6-removebg-preview.png',   bg: '#C2410C', tag: 'Smoky & Creamy',  label: 'Mayo' },
  { name: 'Peri Peri Mayo',   img: '/mayo/3-removebg-preview.png',   bg: '#E6A800', tag: 'Tangy & Fiery',   label: 'Mayo' },
  { name: 'Cardamom Chai',    img: '/chai/3-removebg-preview.png',   bg: '#16A34A', tag: 'Rich & Aromatic', label: 'Chai' },
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
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [pylIdx, setPylIdx] = useState(0);
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

        {/* filter tabs */}
        <div className="bs-filters">
          {FILTER_TABS.map((f) => (
            <button
              key={f}
              className={`bs-filter ${activeFilter === f ? "active" : ""}`}
              onClick={() => { setActiveFilter(f); setCarouselIdx(0); }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* carousel */}
        {(() => {
          const filtered = BESTSELLERS.filter(p => p.category.includes(activeFilter));
          const visible = 3;
          const maxIdx = Math.max(0, filtered.length - visible);
          const centerIdx = carouselIdx + 1; // middle of the 3 visible

          const BlobSVG = () => (
            <svg className="bs-blob-svg" viewBox="136 271 537 537" xmlns="http://www.w3.org/2000/svg">
              <path fill="#E65300" d="M 654.972656 499.960938 C 655.082031 491.914062 653.792969 483.867188 650.894531 476.464844 C 646.175781 464.660156 637.054688 451.359375 616.777344 448.246094 C 627.078125 432.582031 624.179688 417.558594 619.351562 406.402344 C 616.242188 399.105469 611.414062 392.5625 605.617188 386.875 C 583.195312 364.878906 592.527344 347.820312 592.527344 347.820312 C 592.527344 347.820312 575.46875 357.15625 553.476562 334.730469 C 547.789062 328.9375 541.242188 324.214844 533.949219 320.996094 C 522.359375 315.953125 506.375 313.058594 489.851562 325.179688 C 485.988281 306.835938 473.328125 298.25 462.167969 293.746094 C 454.765625 290.847656 446.71875 289.558594 438.671875 289.667969 C 407.234375 289.988281 401.761719 271.429688 401.761719 271.429688 C 401.761719 271.429688 396.289062 290.097656 364.960938 289.773438 C 356.914062 289.667969 348.867188 290.953125 341.464844 293.851562 C 329.660156 298.574219 316.359375 307.691406 313.246094 327.972656 C 297.582031 317.671875 282.5625 320.566406 271.402344 325.394531 C 264.105469 328.507812 257.5625 333.335938 251.875 339.128906 C 229.878906 361.445312 212.820312 352.113281 212.820312 352.113281 C 212.820312 352.113281 222.15625 369.171875 199.730469 391.167969 C 193.9375 396.851562 189.214844 403.398438 185.996094 410.695312 C 180.953125 422.28125 178.058594 438.269531 190.179688 454.789062 C 171.835938 458.652344 163.25 471.3125 158.746094 482.472656 C 155.847656 489.875 154.558594 497.921875 154.667969 505.96875 C 154.882812 537.300781 136.320312 542.769531 136.320312 542.769531 C 136.320312 542.769531 154.988281 548.242188 154.667969 579.574219 C 154.558594 587.621094 155.847656 595.667969 158.746094 603.070312 C 163.464844 614.871094 172.585938 628.175781 192.863281 631.289062 C 182.5625 646.953125 185.460938 661.972656 190.289062 673.132812 C 193.398438 680.425781 198.230469 686.972656 204.023438 692.660156 C 226.445312 714.652344 217.113281 731.714844 217.113281 731.714844 C 217.113281 731.714844 234.171875 722.378906 256.167969 744.804688 C 261.851562 750.597656 268.398438 755.316406 275.695312 758.535156 C 287.28125 763.578125 303.269531 766.476562 319.792969 754.351562 C 323.652344 772.699219 336.3125 781.28125 347.578125 785.789062 C 354.984375 788.6875 363.03125 789.972656 371.078125 789.867188 C 402.40625 789.652344 407.878906 808.214844 407.878906 808.214844 C 407.878906 808.214844 413.351562 789.652344 444.679688 789.867188 C 452.726562 789.972656 460.773438 788.6875 468.175781 785.789062 C 479.980469 781.066406 493.285156 771.949219 496.394531 751.667969 C 512.058594 761.96875 527.082031 759.074219 538.238281 754.246094 C 545.535156 751.132812 552.078125 746.304688 557.765625 740.511719 C 579.761719 718.085938 596.820312 727.421875 596.820312 727.421875 C 596.820312 727.421875 587.488281 710.363281 609.910156 688.367188 C 615.703125 682.679688 620.425781 676.136719 623.644531 668.839844 C 628.6875 657.253906 631.582031 641.265625 619.460938 624.742188 C 637.808594 620.878906 646.390625 608.21875 650.894531 596.953125 C 653.792969 589.550781 655.082031 581.503906 654.972656 573.457031 C 654.757812 542.128906 673.320312 536.65625 673.320312 536.65625 C 673.320312 536.65625 654.652344 531.398438 654.972656 499.960938 Z" />
            </svg>
          );

          return (
            <>
              <div className="bs-carousel-wrap">
                <div
                  className="bs-carousel"
                  style={{ transform: `translateX(calc(-${carouselIdx} * var(--bs-item-w)))` }}
                >
                  {filtered.map((p, i) => (
                    <div
                      className={`bs-item ${i === centerIdx ? "bs-item-center" : ""}`}
                      key={`${activeFilter}-${i}`}
                    >
                      <div className="bs-blob" aria-hidden="true">
                        <BlobSVG />
                      </div>
                      <div className="bs-item-img">
                        <img src={p.img} alt={p.name} />
                      </div>
                      <h3 className="bs-item-name">{p.name.toUpperCase()}</h3>
                      <div className="bs-item-tags">
                        {p.tags.map((t, j) => (
                          <span key={j} className={`bs-item-tag ${t === "Halal" ? "bs-item-tag-orange" : t === "Vegan" ? "bs-item-tag-green" : ""}`}>
                            <span className="bs-item-dot" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* pagination bar */}
              <div className="bs-pagination">
                <button
                  className="bs-pag-arrow"
                  onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}
                  disabled={carouselIdx === 0}
                >‹</button>
                <div className="bs-pag-dots">
                  {filtered.map((_, i) => (
                    <button
                      key={i}
                      className={`bs-pag-dot ${i === carouselIdx ? "active" : ""}`}
                      onClick={() => setCarouselIdx(Math.min(i, maxIdx))}
                    />
                  ))}
                </div>
                <button
                  className="bs-pag-arrow"
                  onClick={() => setCarouselIdx(i => Math.min(maxIdx, i + 1))}
                  disabled={carouselIdx >= maxIdx}
                >›</button>
                <button className="bs-pag-viewall" onClick={() => setShowAllProducts(true)}>
                  View All <span className="bs-pag-count">{filtered.length}</span>
                </button>
              </div>
            </>
          );
        })()}
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
            <img src="/3d final image ion.png" alt="Chai Machine" className="fp-img" />
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

      {/* DELIVERY MARQUEE */}
      <div className="delivery-marquee-strip">
        <div className="delivery-marquee-track">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="delivery-marquee-item">
              <span className="delivery-marquee-badge">NEW</span>
              <span className="delivery-marquee-leaf">✿</span>
              Free delivery across GTA on orders $49+
              <a href="#" className="delivery-marquee-link">Shop Now →</a>
              <span className="delivery-marquee-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* PAPER PLANE — before about */}
      <div className="plane-divider plane-divider-before" aria-hidden="true">
        <svg viewBox="0 0 1400 80" className="plane-divider-svg" xmlns="http://www.w3.org/2000/svg">
          <path className="plane-dash-path" d="M0,55 C180,20 360,70 560,40 C720,18 860,55 1050,35 C1180,22 1300,45 1400,38" />
          {/* plane 1 */}
          <text fontSize="50" fill="#E6C800" dominantBaseline="middle">
            ✈
            <animateMotion dur="8s" repeatCount="indefinite" rotate="auto">
              <mpath href="#wavePath1" />
            </animateMotion>
          </text>
          {/* plane 2 — delayed */}
          <text fontSize="20" fill="#E6C800" dominantBaseline="middle" opacity="0.85">
            ✈
            <animateMotion dur="8s" begin="4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#wavePath1" />
            </animateMotion>
          </text>
          <defs>
            <path id="wavePath1" d="M0,55 C180,20 360,70 560,40 C720,18 860,55 1050,35 C1180,22 1300,45 1400,38" />
          </defs>
        </svg>
      </div>

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

      {/* PAPER PLANE DIVIDER — after about */}
      <div className="plane-divider plane-divider-after" aria-hidden="true">
        <svg viewBox="0 0 1400 80" className="plane-divider-svg" xmlns="http://www.w3.org/2000/svg">
          <path className="plane-dash-path" d="M0,28 C260,38 380,65 540,70 C700,74 860,52 1050,44 C1200,37 1320,42 1400,40" />
          {/* single plane flying along the curve */}
          <text fontSize="30" fill="#E6C800" dominantBaseline="middle">
            ✈
            <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
              <mpath href="#curvePath2" />
            </animateMotion>
          </text>
          <defs>
            <path id="curvePath2" d="M0,28 C260,38 380,65 540,70 C700,74 860,52 1050,44 C1200,37 1320,42 1400,40" />
          </defs>
        </svg>
      </div>

      {/* PREMIX BANNER */}
      <div className="premix-banner">
        <img src="/21Website-Banner-2-Machine-and-Premixes-.jpg" alt="Tea & Coffee Premix — Papaji Foods" className="premix-banner-img" />
      </div>

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
          {[
            { img: "/chai/9-removebg-preview.png",      tag: "Latest News",      title: "Papaji Expands Across Canada",       desc: "Now in 500+ retail locations nationwide." },
            { img: "/3d final image ion.png",    tag: "Company Updates",  title: "New Chai Machine Partnership",       desc: "200+ hospitality locations across GTA." },
            { img: "/mayo/3-removebg-preview.png",  tag: "Product News",     title: "3 New Mayo Flavours Launched",       desc: "Italian Herb, Jalapeño & Vegan Plain." },
            { img: "/chai/8-removebg-preview.png",    tag: "Awards",           title: "Award Winning Quality",              desc: "Recognised for excellence across Canada." },
          ].map((item, i) => (
            <div key={i} className="wn-img-card" onClick={() => openSlide(NEWS_ITEMS[i % NEWS_ITEMS.length])}>
              <img src={item.img} alt={item.title} className="wn-img-card-bg" />
              <div className="wn-img-card-overlay" />
              <div className="wn-img-card-body">
                <span className="wn-img-card-tag">{item.tag}</span>
                <h3 className="wn-img-card-title">{item.title}</h3>
                <p className="wn-img-card-desc">{item.desc}</p>
              </div>
              <button className="img-card-cart-btn" onClick={e => e.stopPropagation()} aria-label="Shop now">🛒</button>
            </div>
          ))}
        </div>
      </section>

      {/* RECIPES */}
      <section className="recipes-section">
        <div className="recipes-header">
          <div>
            <span className="recipes-eyebrow">Recipes</span>
            <h2 className="recipes-title">From Our Kitchen <em>To Yours</em></h2>
          </div>
          <button className="recipes-view-more">View More →</button>
        </div>

        <div className="rc-img-grid">
          {[
            { img: "/Masala Back.jpeg",      time: "15 min", diet: "Veg",   title: "Tandoori Mayo Paneer Wrap",  desc: "Grilled paneer in Papaji mayo, warm roti, fresh veggies." },
            { img: "/Cardamom Back.jpeg",    time: "20 min", diet: "Vegan", title: "Cardamom Chai Latte",        desc: "Creamy, spiced and perfect for a cozy morning." },
            { img: "/Coffee Back.jpeg",      time: "5 min",  diet: "Vegan", title: "Iced Cardamom Chai",         desc: "Brew, chill, pour over ice with oat milk." },
            { img: "/zafarani back .jpeg",   time: "10 min", diet: "Veg",   title: "Zafrani Chai Pudding",       desc: "Saffron-infused dessert with a chai twist." },
          ].map((r, i) => (
            <div className="rc-img-card" key={i}>
              <img src={r.img} alt={r.title} className="rc-img-card-bg" />
              <div className="rc-img-card-overlay" />
              <div className="rc-img-card-body">
                <span className="rc-img-card-meta">⏱ {r.time} &nbsp;·&nbsp; 🌿 {r.diet}</span>
                <h3 className="rc-img-card-title">{r.title}</h3>
                <p className="rc-img-card-desc">{r.desc}</p>
              </div>
              <button className="img-card-cart-btn" aria-label="View recipe">🛒</button>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS YOU LOVE */}
      <section className="pyl-section">
        <div className="pyl-header">
          <div>
            <span className="pyl-eyebrow">Our Range</span>
            <h2 className="pyl-title">Products <em>You Love</em></h2>
          </div>
        </div>

        {(() => {
          const centerIdx = pylIdx + 1;
          const maxIdx = Math.max(0, PRODUCTS.length - 3);
          return (
            <>
              <div className="pyl-carousel-wrap">
                <div className="pyl-carousel" style={{ transform: `translateX(calc(-${pylIdx} * (var(--pyl-item-w) + 16px)))` }}>
                  {PRODUCTS.map((p, i) => (
                    <div className={`pyl-card ${i === centerIdx ? "pyl-card-center" : ""}`} key={i} style={{ "--pyl-bg": p.bg }}>
                      {/* photo fills top */}
                      <div className="pyl-card-photo">
                        <img src={p.img} alt={p.name} />
                      </div>
                      {/* colored body */}
                      <div className="pyl-card-body" style={{ background: p.bg }}>
                        <div className="pyl-card-tag">
                          <span className="pyl-tag-dot" />{p.tag}
                        </div>
                        <h3 className="pyl-card-name">{p.name.toUpperCase()}</h3>
                        <button className="pyl-shop-btn">
                          Shop Now <span className="pyl-btn-icon">›</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pyl-pagination">
                <button className="pyl-pag-arrow" onClick={() => setPylIdx(i => Math.max(0, i - 1))} disabled={pylIdx === 0}>‹</button>
                <div className="pyl-pag-dots">
                  {PRODUCTS.map((_, i) => (
                    <button key={i} className={`pyl-pag-dot ${i === pylIdx ? "active" : ""}`} onClick={() => setPylIdx(Math.min(i, maxIdx))} />
                  ))}
                </div>
                <button className="pyl-pag-arrow" onClick={() => setPylIdx(i => Math.min(maxIdx, i + 1))} disabled={pylIdx >= maxIdx}>›</button>
              </div>
            </>
          );
        })()}
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
