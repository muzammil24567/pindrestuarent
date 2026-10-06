import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, Flame, MapPin, Menu as MenuIcon, Phone, Star, Users, Utensils, X } from 'lucide-react';
import karahiVisual from './assets/chicken-karahi.png';

type Dish = { name: string; category: string; description: string; visual?: boolean };

const dishes: Dish[] = [
  { name: 'BBQ Plate', category: 'BBQ', description: 'A generous assortment from the grill.' },
  { name: 'Chicken Kabab', category: 'BBQ', description: 'Punjabi-style chicken kabab.' },
  { name: 'Mutton Karahi Cooked in Butter', category: 'KARAHI', description: 'A rich, traditional mutton karahi.' },
  { name: 'Desi Chicken Karahi', category: 'KARAHI', description: 'Desi chicken, served karahi style.' },
  { name: 'Chicken Karahi Gosht', category: 'KARAHI', description: 'A classic chicken karahi favourite.', visual: true },
  { name: 'Mutton Karahi Lahori', category: 'KARAHI', description: 'Lahori-style mutton karahi.' },
  { name: 'Mutton Curry', category: 'DESI SPECIALS', description: 'A warming Punjabi curry.' },
  { name: 'Mutton Champ', category: 'DESI SPECIALS', description: 'A much-loved Punjabi special.' },
  { name: 'Red Handi Chicken', category: 'DESI SPECIALS', description: 'Chicken cooked in a red handi.' },
  { name: 'Spicy Chicken Curry', category: 'DESI SPECIALS', description: 'A warmly spiced chicken curry.' },
  { name: 'Chicken Fried Rice', category: 'RICE', description: 'Chicken fried rice.' },
  { name: 'Egg Fried Rice', category: 'RICE', description: 'Egg fried rice.' },
  { name: 'Russian Salad', category: 'SALADS', description: 'Russian salad.' },
  { name: 'Fresh Salad', category: 'SALADS', description: 'Fresh salad.' },
  { name: 'Fries', category: 'SIDES', description: 'Golden fries.' },
  { name: 'Freshly Baked Indian Flatbread', category: 'BREADS', description: 'Freshly baked Indian flatbread.' },
  { name: 'Gulab Jaman', category: 'DESSERTS', description: 'A traditional sweet finish.' },
  { name: 'Cakes', category: 'DESSERTS', description: 'A selection of cakes.' },
];

const categories = ['BBQ', 'KARAHI', 'DESI SPECIALS', 'RICE', 'SALADS', 'SIDES', 'BREADS', 'DESSERTS'];
const signatureNames = [
  'BBQ Plate', 'Mutton Karahi Cooked in Butter', 'Chicken Kabab',
  'Desi Chicken Karahi', 'Chicken Karahi Gosht', 'Mutton Karahi Lahori',
  'Mutton Champ', 'Red Handi Chicken', 'Spicy Chicken Curry',
  'Freshly Baked Indian Flatbread', 'Gulab Jaman',
];
const galleryCategories = ['ALL', 'FOOD', 'BBQ', 'KARAHI', 'RESTAURANT', 'AMBIENCE'];
const phoneHref = 'tel:+923084761633';

function App() {
  const [activeCategory, setActiveCategory] = useState('BBQ');
  const [galleryFilter, setGalleryFilter] = useState('ALL');
  const [dishDialog, setDishDialog] = useState<Dish | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!dishDialog) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDishDialog(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dishDialog]);

  const filteredDishes = useMemo(
    () => dishes.filter((dish) => dish.category === activeCategory),
    [activeCategory],
  );
  const signatureDishes = useMemo(
    () => signatureNames.map((name) => dishes.find((dish) => dish.name === name)).filter((dish): dish is Dish => Boolean(dish)),
    [],
  );

  const galleryTiles = [
    { title: 'A taste of karahi', type: 'KARAHI', kind: 'food', photo: true },
    { title: 'From the grill', type: 'BBQ', kind: 'grill' },
    { title: 'Punjabi favourites', type: 'FOOD', kind: 'table' },
    { title: 'A place to gather', type: 'RESTAURANT', kind: 'room' },
    { title: 'Warm welcomes', type: 'AMBIENCE', kind: 'light' },
  ];
  const visibleGallery = galleryTiles.filter((tile) => galleryFilter === 'ALL' || tile.type === galleryFilter);

  const navLinks = [
    ['Home', '#home'],
    ['Menu', '#menu'],
    ['About', '#about'],
    ['Gallery', '#gallery'],
    ['Reviews', '#reviews'],
    ['Contact', '#contact'],
  ];

  const goTo = () => setMobileOpen(false);

  return (
    <div className="site-shell grain min-h-[100dvh]">
      <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? 'nav-glass border-b border-white/10' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <a href="#home" onClick={goTo} className="group flex items-center gap-3" aria-label="PIND Restaurant home">
            <svg viewBox="0 0 92 68" className="h-[58px] w-[82px] shrink-0" role="img" aria-label="PIND">
              <path d="M5 30 11 8h5l6 22H5Z" fill="#d95b37" />
              <path d="M20 30 26 5h5l6 25H20Z" fill="#e29b4b" />
              <path d="M35 30 41 7h5l6 23H35Z" fill="#cf4b32" />
              <path d="M50 30 56 5h5l6 25H50Z" fill="#e29b4b" />
              <path d="M65 30 71 8h5l6 22H65Z" fill="#d95b37" />
              <path d="M4 31h79" stroke="#e8d6ca" strokeWidth="1.5" />
              <text x="5" y="63" fill="#f5eee4" fontFamily="Space Grotesk, sans-serif" fontSize="30" fontWeight="500" letterSpacing="4">PIND</text>
            </svg>
            <span className="hidden border-l border-white/20 pl-3 text-[9px] leading-[1.45] tracking-[.2em] text-[#aaa39b] sm:block">PUNJABI<br />KITCHEN</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navLinks.map(([label, href]) => <a key={label} href={href} className="text-[11px] font-semibold tracking-[.12em] text-[#d0cbc4] transition-colors hover:text-[#ff772e]">{label}</a>)}
          </nav>
          <div className="hidden lg:block">
            <a href={phoneHref} className="inline-flex items-center gap-2 bg-[#f26725] px-5 py-3 text-[10px] font-bold tracking-[.15em] text-[#1b120d] transition-colors hover:bg-[#ff8950]">
              BOOK A TABLE <ArrowUpRight size={14} />
            </a>
          </div>
          <button type="button" className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#f5eee4] lg:hidden" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-navigation">
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
        {mobileOpen && <nav aria-label="Mobile navigation" className="nav-glass border-t border-white/10 px-6 py-4 lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {navLinks.map(([label, href]) => <a key={label} href={href} onClick={goTo} className="px-3 py-3 text-sm text-[#e7ded2] hover:bg-white/5">{label}</a>)}
            <a href={phoneHref} onClick={goTo} className="col-span-2 mt-2 flex items-center justify-center gap-2 bg-[#f26725] px-4 py-3 text-xs font-bold tracking-widest text-[#1b120d]">BOOK A TABLE <ArrowUpRight size={14} /></a>
          </div>
        </nav>}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[780px] items-center overflow-hidden bg-[#100e0c] pt-20 sm:min-h-[820px] lg:min-h-[890px]">
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-14 lg:pb-20 lg:pt-0">
            <div className="relative z-10 max-w-[700px]">
              <div className="eyebrow hero-tag-animate mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f16a26]" />KALA SHAH KAKU · GT ROAD
              </div>
              <h1 className="display-font hero-title-animate text-[clamp(4rem,10.6vw,9.7rem)] font-bold leading-[.78] tracking-[-.075em] text-[#f5eee4]">
                THE TASTE<br /><span className="text-shimmer-orange">OF PUNJAB</span><span className="text-[#f5eee4]">.</span>
              </h1>
              <p className="hero-subtitle-animate mt-8 max-w-[460px] text-base leading-7 text-[#c2b9ae] sm:text-lg sm:leading-8">
                Traditional flavors. Rich aromas. An unforgettable PIND experience.
              </p>
              <div className="hero-buttons-animate mt-8 flex flex-wrap items-center gap-3">
                <a href="#menu" className="inline-flex min-h-14 items-center gap-8 bg-[#f26725] px-6 text-[11px] font-bold tracking-[.14em] text-[#1a120e] transition-all hover:bg-[#ff8b51] hover:scale-[1.02]">
                  EXPLORE MENU <ArrowRight size={16} />
                </a>
                <a href={phoneHref} className="inline-flex min-h-14 items-center gap-3 border border-white/30 px-6 text-[11px] font-bold tracking-[.14em] text-[#f5eee4] transition-all hover:border-[#f26725] hover:text-[#ff8542] hover:scale-[1.02]">
                  <Phone size={14} /> BOOK A TABLE
                </a>
              </div>
              <div className="hero-reviews-animate mt-10 flex items-center gap-3 text-xs text-[#c8beb3]">
                <span className="flex gap-[2px] text-[#ff8a42]" aria-label="Rated 4.3 out of 5">
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                </span>
                <span className="font-semibold text-[#f0e8de]">4.3</span>
                <span className="text-white/25">/</span>
                <span>4,963+ Google Reviews</span>
              </div>
            </div>
            <div className="relative mx-auto flex items-center justify-center w-full max-w-[540px] sm:max-w-[640px] lg:max-w-[700px] xl:max-w-[740px]">
              <div className="hero-karahi-animate relative aspect-square w-full rounded-full overflow-hidden drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]">
                <img
                  src={karahiVisual}
                  alt="Authentic Punjabi Chicken Karahi"
                  className="h-full w-full object-cover select-none pointer-events-none"
                  style={{ objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
          <a href="#about" className="absolute bottom-8 left-6 hidden items-center gap-3 text-[9px] font-semibold tracking-[.19em] text-[#9d958c] md:flex lg:left-14">
            SCROLL TO DISCOVER <ArrowDown size={13} />
          </a>
          <div className="absolute bottom-0 left-1/2 h-px w-[88%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </section>

        <div className="ticker bg-[#171310] py-4 text-[10px] font-semibold tracking-[.24em] text-[#e6ddd2]">
          <div className="ticker-track flex w-max gap-8">{Array.from({ length: 4 }, (_, i) => <span className="flex items-center gap-8" key={i}><span>AUTHENTIC PUNJABI TASTE</span><span className="text-[#f26725]">/</span><span>KALA SHAH KAKU</span><span className="text-[#f26725]">/</span><span>GOOD FOOD, TOGETHER</span><span className="text-[#f26725]">/</span></span>)}</div>
        </div>

        <section id="about" className="section-pad relative bg-[#f0e9de] text-[#211b17]">
          <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div>
              <p className="eyebrow mb-5">WELCOME TO PIND</p>
              <h2 className="display-font max-w-[620px] text-[clamp(2.7rem,5.6vw,5.2rem)] font-bold leading-[.92] tracking-[-.065em]">WHERE TRADITION<br /><span className="text-[#e85f20]">MEETS TASTE</span></h2>
              <p className="mt-7 max-w-[560px] text-[15px] leading-7 text-[#514941]">PIND Restaurant brings the authentic flavors of Punjabi cuisine to Kala Shah Kaku. From smoky BBQ and rich karahi to traditional breads and classic desserts, every dish is prepared to create a memorable desi dining experience.</p>
              <a href="#menu" className="mt-8 inline-flex items-center gap-4 border-b border-[#e85f20] pb-2 text-[10px] font-bold tracking-[.16em] text-[#261b14] transition-colors hover:text-[#e85f20]">DISCOVER OUR MENU <ArrowRight size={14} /></a>
            </div>
            <div className="relative min-h-[360px] overflow-hidden bg-[#211a15] sm:min-h-[450px]">
              <div className="food-placeholder absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#100e0c]/65 via-transparent to-[#100e0c]/15" />
              <div className="absolute left-6 top-6 border border-white/30 px-4 py-2 text-[9px] font-semibold tracking-[.18em] text-[#f0e8de]">A TABLE FOR EVERYONE</div>
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                <div><p className="eyebrow mb-2">THE PIND WAY</p><p className="display-font text-3xl font-bold tracking-[-.04em] text-white sm:text-4xl">Gather. Eat. Belong.</p></div>
                <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white sm:flex"><ArrowUpRight size={20} /></span>
              </div>
              <p className="absolute bottom-2 right-3 text-[8px] tracking-[.08em] text-white/55">Illustrative food artwork · not a venue photograph</p>
            </div>
          </div>
        </section>

        <section id="signature" className="section-pad bg-[#100e0c]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><p className="eyebrow mb-4">FROM THE PIND TABLE</p><h2 className="display-font text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-none tracking-[-.06em]">SIGNATURE <span className="text-[#f26725]">FLAVORS</span></h2><p className="mt-4 text-sm text-[#a8a097]">A taste of our most-loved Punjabi dishes</p></div>
              <a href="#menu" className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[.15em] text-[#eee7df] hover:text-[#ff772e]">VIEW FULL MENU <ArrowRight size={14} /></a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {signatureDishes.slice(0, 8).map((dish, index) => <DishCard key={dish.name} dish={dish} index={index} onSelect={setDishDialog} />)}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {signatureDishes.slice(8).map((dish, index) => <DishCard key={dish.name} dish={dish} index={index + 8} onSelect={setDishDialog} />)}
            </div>
            <div className="mt-8 border-l-2 border-[#f26725] pl-4 text-[11px] leading-5 text-[#a8a097]">Menu prices are not published here. Please call for current pricing and availability.</div>
          </div>
        </section>

        <section className="section-pad bg-[#201811]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="eyebrow mb-4">MORE THAN A MEAL</p><h2 className="display-font text-[clamp(2.7rem,6vw,5.3rem)] font-bold leading-[.9] tracking-[-.065em] text-[#f2eadf]">THE PIND<br className="sm:hidden" /> <span className="text-[#f26725]">EXPERIENCE</span></h2></div>
              <p className="max-w-[340px] text-sm leading-6 text-[#b8a99a]">Come for the flavors. Stay for the time around the table.</p>
            </div>
            <div className="grid gap-0 md:grid-cols-3">
              {[
                { icon: <Flame size={21} />, title: 'AUTHENTIC FLAVORS', copy: 'Traditional Punjabi recipes and rich desi flavors.' },
                { icon: <Users size={21} />, title: 'FAMILY DINING', copy: 'A welcoming environment for families and groups.' },
                { icon: <Utensils size={21} />, title: 'PRIVATE DINING', copy: 'A comfortable private dining experience for special occasions.' },
              ].map((item, index) => <article key={item.title} className={`relative border-t border-white/15 py-8 md:px-8 md:py-10 ${index === 0 ? 'md:pl-0' : ''}`}>
                <div className="mb-7 flex h-11 w-11 items-center justify-center border border-[#f26725]/50 text-[#f26725]">{item.icon}</div>
                <h3 className="display-font text-xl font-bold tracking-[.02em] text-[#f2eadf]">{item.title}</h3>
                <p className="mt-3 max-w-[300px] text-sm leading-6 text-[#b9afa4]">{item.copy}</p>
                <div className="feature-rule absolute bottom-0 left-0 h-px w-20" />
              </article>)}
            </div>
          </div>
        </section>

        <section id="menu" className="section-pad bg-[#f0e9de] text-[#211b17]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-9 text-center"><p className="eyebrow mb-4">MADE FOR THE TABLE</p><h2 className="display-font text-[clamp(2.8rem,6vw,5.6rem)] font-bold leading-none tracking-[-.065em]">THE <span className="text-[#e85f20]">MENU</span></h2><p className="mx-auto mt-4 max-w-[530px] text-sm leading-6 text-[#655d55]">Find your Punjabi favourite. Choose a category to explore.</p></div>
            <div className="mb-9 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Menu categories">
              {categories.map((category) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} className={`border px-4 py-3 text-[9px] font-bold tracking-[.11em] transition-colors sm:px-5 ${activeCategory === category ? 'border-[#e85f20] bg-[#e85f20] text-[#1b130e]' : 'border-[#cfc4b7] text-[#514941] hover:border-[#e85f20] hover:text-[#cf4e16]'}`} data-testid={`tab-menu-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
            </div>
            <div role="tabpanel" aria-label={`${activeCategory} menu`} className="mx-auto max-w-[850px] border-t border-[#cfc4b7]">
              {filteredDishes.map((dish, index) => <button key={dish.name} type="button" onClick={() => setDishDialog(dish)} className="menu-item group flex w-full items-center justify-between gap-4 border-b border-[#d8cec2] px-3 py-5 text-left" data-testid={`button-menu-item-${dish.name.toLowerCase().replaceAll(' ', '-')}`}>
                <span className="flex items-center gap-4"><span className="display-font w-6 text-[10px] text-[#e85f20]">0{index + 1}</span><span><span className="display-font block text-lg font-semibold tracking-[-.025em] text-[#27201b] sm:text-xl">{dish.name}</span><span className="mt-1 block text-xs text-[#766b60]">{dish.description}</span></span></span>
                <span className="flex shrink-0 items-center gap-3 text-right"><span className="hidden text-[10px] text-[#847a70] sm:block">Rs — <span className="text-[9px]">(price placeholder)</span></span><ArrowUpRight size={16} className="text-[#b8a897] transition-colors group-hover:text-[#df5d20]" /></span>
              </button>)}
            </div>
            <p className="mt-6 text-center text-[10px] leading-5 text-[#766b60] sm:text-xs">Prices shown as placeholders only. Please call <a href={phoneHref} className="font-semibold text-[#c94b16] underline underline-offset-4">0308 4761633</a> for current prices.</p>
          </div>
        </section>

        <section className="relative flex min-h-[440px] items-center overflow-hidden bg-[#17110d] sm:min-h-[560px]">
          <img src={karahiVisual} alt="Close-up of chicken karahi, illustrative Punjabi food imagery" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'right 52%' }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100e0c] via-[#100e0c]/70 to-[#100e0c]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c]/55 via-transparent to-[#100e0c]/25" />
          <div className="relative mx-auto w-full max-w-[1240px] px-6 py-20 lg:px-0">
            <div className="max-w-[650px]">
              <p className="eyebrow mb-6">KARAHI · BBQ · NAAN · PUNJABI FOOD</p>
              <h2 className="display-font text-[clamp(3.5rem,9vw,8rem)] font-bold leading-[.82] tracking-[-.075em] text-[#f5eee4]">CRAFTED<br /><span className="text-[#f26725]">WITH</span><br />TRADITION</h2>
              <a href="#menu" className="mt-8 inline-flex items-center gap-4 border border-white/40 px-5 py-4 text-[10px] font-bold tracking-[.16em] text-[#f5eee4] hover:border-[#f26725] hover:text-[#ff8243]">FIND YOUR FAVOURITE <ArrowRight size={14} /></a>
            </div>
          </div>
          <p className="absolute bottom-4 right-5 text-[8px] tracking-[.08em] text-white/55">Illustrative food imagery · not a PIND venue photograph</p>
        </section>

        <section id="gallery" className="section-pad bg-[#100e0c]">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div><p className="eyebrow mb-4">A LITTLE TASTE OF PUNJAB</p><h2 className="display-font text-[clamp(2.7rem,5.6vw,5.2rem)] font-bold leading-none tracking-[-.065em]">FOOD & <span className="text-[#f26725]">FEELING</span></h2></div>
              <p className="max-w-[320px] text-xs leading-5 text-[#a8a097]">Illustrative food artwork. These visuals are not photographs of PIND Restaurant.</p>
            </div>
            <div className="my-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
              {galleryCategories.map((category) => <button key={category} type="button" aria-pressed={galleryFilter === category} onClick={() => setGalleryFilter(category)} className={`px-3 py-2 text-[9px] font-bold tracking-[.14em] transition-colors ${galleryFilter === category ? 'bg-[#f26725] text-[#1d130d]' : 'border border-white/15 text-[#c4bbb0] hover:border-[#f26725] hover:text-[#ff8a48]'}`} data-testid={`button-gallery-${category.toLowerCase()}`}>{category}</button>)}
            </div>
            <div className="grid auto-rows-[190px] gap-3 sm:grid-cols-2 sm:auto-rows-[230px] lg:grid-cols-6 lg:auto-rows-[240px]">
              {visibleGallery.map((tile, index) => <article key={tile.title} className={`gallery-tile relative overflow-hidden border border-white/10 ${index === 0 && galleryFilter === 'ALL' ? 'sm:row-span-2 lg:col-span-3 lg:row-span-2' : 'lg:col-span-3'}`}>
                {tile.photo ? <img src={karahiVisual} alt="Illustrative chicken karahi close-up, not a PIND venue photograph" className="gallery-art absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'right center' }} /> : <div className={`gallery-art food-placeholder absolute inset-0 ${tile.kind === 'room' ? 'bg-[radial-gradient(ellipse_at_50%_20%,rgba(232,121,52,.2),transparent_44%),linear-gradient(145deg,#29221d,#171411)]' : ''}`} />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c]/90 via-[#100e0c]/10 to-[#100e0c]/10" />
                <span className="absolute left-5 top-5 border border-white/35 bg-[#100e0c]/35 px-3 py-2 text-[8px] font-bold tracking-[.15em] text-[#f1e9e0]">{tile.type}</span>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><h3 className="display-font text-xl font-bold tracking-[-.03em] text-white">{tile.title}</h3><ArrowUpRight size={18} className="text-[#ff8141]" /></div>
              </article>)}
            </div>
            {visibleGallery.length === 0 && <div className="py-16 text-center text-sm text-[#b9afa4]">No gallery items in this category yet.</div>}
          </div>
        </section>

        <section id="reviews" className="relative overflow-hidden bg-[#e85f20] px-5 py-20 text-[#1c140f] sm:py-28">
          <div className="pointer-events-none absolute -right-16 -top-28 h-[420px] w-[420px] rounded-full border border-[#24180f]/20 sm:right-[4%] sm:top-[-40%]"><div className="absolute inset-[14%] rounded-full border border-[#24180f]/20" /><div className="absolute inset-[28%] rounded-full border border-[#24180f]/20" /></div>
          <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 md:grid-cols-[.7fr_1.3fr]">
            <div><p className="mb-4 text-[10px] font-bold tracking-[.2em] text-[#2b1a10]/75">THE WORD IS OUT</p><div className="display-font text-[clamp(7rem,17vw,13rem)] font-bold leading-[.72] tracking-[-.09em]">4.3</div><div className="mt-6 flex gap-1 text-[#2c1a10]"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div></div>
            <div className="border-t border-[#2b1a10]/30 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <p className="eyebrow !text-[#321c11]">GOOGLE REVIEWS</p>
              <h2 className="display-font mt-4 max-w-[600px] text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[.9] tracking-[-.065em]">4,963+ GOOGLE<br className="hidden sm:block" /> REVIEWS</h2>
              <p className="mt-5 max-w-[450px] text-sm leading-6 text-[#321d12]/80">A rating shaped by thousands of visits to PIND Restaurant in Kala Shah Kaku.</p>
              <a href="https://www.google.com/maps/search/?api=1&query=PIND+Restaurant+Kala+Shah+Kaku" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-3 border border-[#25170f]/55 px-5 py-4 text-[10px] font-bold tracking-[.15em] text-[#24160f] transition-colors hover:bg-[#24160f] hover:text-[#f0e9de]">FIND PIND ON GOOGLE MAPS <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad bg-[#17130f]">
          <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="eyebrow mb-5">COME ON IN</p>
              <h2 className="display-font text-[clamp(3.5rem,8vw,7.2rem)] font-bold leading-[.82] tracking-[-.075em] text-[#f5eee4]">YOUR TABLE<br /><span className="text-[#f26725]">AWAITS.</span></h2>
              <p className="mt-7 max-w-[470px] text-sm leading-6 text-[#b5aaa0]">Bring your family, bring your appetite. Call ahead and we’ll help you plan your visit.</p>
              <a href={phoneHref} className="mt-8 inline-flex min-h-14 items-center gap-3 bg-[#f26725] px-6 text-[11px] font-bold tracking-[.14em] text-[#1a120e] transition-colors hover:bg-[#ff8950]"><Phone size={15} /> CALL TO BOOK · 0308 4761633</a>
            </div>
            <div className="border-t border-white/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="grid gap-8">
                <div className="flex gap-4"><span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[#f26725]/50 text-[#f26725]"><MapPin size={18} /></span><div><p className="eyebrow !text-[#c3b7aa]">FIND US</p><p className="mt-2 max-w-[370px] text-sm leading-6 text-[#f0e8df]">P7M8+H67, Kala Shah Kaku GT Road, Maridkey, Kala Shah Kaku, 54000</p><a className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[.12em] text-[#f4793c] hover:text-[#ff9b64]" href="https://www.google.com/maps/search/?api=1&query=P7M8%2BH67+PIND+Restaurant+Kala+Shah+Kaku" target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={12} /></a></div></div>
                <div className="flex gap-4"><span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[#f26725]/50 text-[#f26725]"><Clock3 size={18} /></span><div><p className="eyebrow !text-[#c3b7aa]">TONIGHT AT PIND</p><p className="mt-2 text-sm text-[#f0e8df]">Open until 1:00 AM</p><p className="mt-1 text-xs text-[#94897e]">Please call ahead to confirm today's hours.</p></div></div>
                <div className="flex gap-4"><span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-[#f26725]/50 text-[#f26725]"><Phone size={17} /></span><div><p className="eyebrow !text-[#c3b7aa]">CALL PIND</p><a href={phoneHref} className="mt-2 inline-block text-lg font-semibold text-[#f0e8df] hover:text-[#ff8542]">0308 4761633</a></div></div>
              </div>
              <div className="mt-9 border-t border-white/10 pt-6 text-xs text-[#b5aaa0]">Price range <span className="mx-2 text-[#f26725]">/</span> Rs 1,000–7,000 per person</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#100e0c] px-5 py-7 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" className="display-font text-xl font-bold tracking-[.16em] text-[#f5eee4]">PIND<span className="text-[#f26725]">.</span></a>
          <p className="text-[10px] tracking-[.08em] text-[#948b82]">Authentic Punjabi Taste · Traditional Flavors · Memorable Experiences</p>
          <a href={phoneHref} className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.12em] text-[#f0783b] hover:text-[#ffa06a]"><Phone size={13} /> 0308 4761633</a>
        </div>
      </footer>

      {dishDialog && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDishDialog(null); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="dish-title" className="relative w-full max-w-md border border-white/15 bg-[#1b1713] p-7 shadow-2xl sm:p-9">
          <button type="button" onClick={() => setDishDialog(null)} aria-label="Close dish details" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/15 text-[#d8cfc4] hover:border-[#f26725] hover:text-[#ff8141]" data-testid="button-close-dish-dialog"><X size={18} /></button>
          <p className="eyebrow">{dishDialog.category}</p>
          <h2 id="dish-title" className="display-font mt-4 pr-8 text-3xl font-bold leading-tight tracking-[-.04em] text-[#f5eee4]">{dishDialog.name}</h2>
          <p className="mt-4 text-sm leading-6 text-[#b9afa4]">{dishDialog.description}</p>
          <div className="mt-6 border-y border-white/10 py-4"><span className="text-[10px] font-bold tracking-[.15em] text-[#f0783b]">PRICE PLACEHOLDER</span><p className="mt-1 text-sm text-[#eee7df]">Rs — · Call for current price</p></div>
          <a href={phoneHref} className="mt-6 flex min-h-12 items-center justify-center gap-2 bg-[#f26725] text-[10px] font-bold tracking-[.13em] text-[#1a120e] hover:bg-[#ff8950]"><Phone size={14} /> CALL TO ASK ABOUT THIS DISH</a>
        </section>
      </div>}
    </div>
  );
}

function DishCard({ dish, index, onSelect }: { dish: Dish; index: number; onSelect: (dish: Dish) => void }) {
  return <article className="group border border-white/10 bg-[#171411]">
    <div className={`relative h-[190px] overflow-hidden ${dish.visual ? 'bg-[#231a15]' : 'food-placeholder'}`}>
      {dish.visual && <img src={karahiVisual} alt="Illustrative chicken karahi close-up" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: 'right center' }} />}
      <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c]/65 to-transparent" />
      <span className="absolute left-4 top-4 text-[9px] font-bold tracking-[.15em] text-[#eee3d7]">{dish.category}</span>
      <span className="absolute bottom-4 right-4 display-font text-3xl font-bold text-white/40">0{(index % 9) + 1}</span>
      <p className="absolute bottom-2 left-3 text-[7px] tracking-[.05em] text-white/60">Illustrative food artwork</p>
    </div>
    <div className="p-4 sm:p-5">
      <h3 className="display-font min-h-[48px] text-lg font-bold leading-6 tracking-[-.025em] text-[#f1e9df]">{dish.name}</h3>
      <p className="mt-2 min-h-[36px] text-xs leading-[18px] text-[#a79d92]">{dish.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-[9px] font-medium text-[#c2b8ad]">Rs — <span className="text-[#80776f]">(placeholder)</span></span>
        <button type="button" onClick={() => onSelect(dish)} className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[.12em] text-[#ff8748] hover:text-[#ffb07d]" data-testid={`button-view-dish-${dish.name.toLowerCase().replaceAll(' ', '-')}`}>VIEW DISH <ArrowUpRight size={12} /></button>
      </div>
    </div>
  </article>;
}

export default App;
