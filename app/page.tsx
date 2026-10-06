"use client";

import React, { useState } from "react";
import {
  TriangleAlert, Clock, Phone, PhoneCall, CarFront, Menu, X, ShieldCheck, CircleCheck,
  Headset, MapPin, Search, Scale, PhoneOff, FileSignature, Info, Users, Briefcase,
  Fuel, Mountain, Star, ChevronDown, FileText, RotateCcw, ShieldUser,
  type LucideIcon,
} from "lucide-react";

const PHONE = "1 (888) 990-9020";
const TEL = "tel:18889909020";
const ADDRESS = "30 N Gould Street, Sheridan, WY 82801";

type ModalId = "terms" | "refund" | "privacy" | null;

const features: { icon: LucideIcon; bg: string; title: string; text: string }[] = [
  { icon: Headset, bg: "bg-brand-100 text-brand-600", title: "24/7 Dedicated Assistance", text: "Speak with actual travel specialists who can adjust reservations, answer questions, and secure special deals anytime." },
  { icon: Scale, bg: "bg-emerald-100 text-emerald-600", title: "Unbiased Comparison", text: "As an independent travel agency, we evaluate multiple fleet options to deliver unbiased recommendations for your itinerary." },
  { icon: PhoneOff, bg: "bg-amber-100 text-amber-600", title: "Unpublished Phone Rates", text: "Access exclusive phone-only discounts and flexible options not advertised on standard online booking portals." },
  { icon: FileSignature, bg: "bg-purple-100 text-purple-600", title: "Transparent Booking Terms", text: "No confusing fine print. We clearly explain agency service terms, cancellations, and supplier rules upfront." },
];

const fleet: { img: string; alt: string; price: string; title: string; eg: string; specs: [LucideIcon, string][] }[] = [
  { img: "photo-1549399542-7e3f8b79c341", alt: "Economy Car", price: "$24", title: "Economy & Compact", eg: "e.g. Nissan Versa, Hyundai Elantra or similar", specs: [[Users, "4-5 Passengers"], [Briefcase, "2 Bags"], [Fuel, "Excellent Fuel Economy"]] },
  { img: "photo-1617814076367-b759c7d7e738", alt: "Midsize Sedan", price: "$32", title: "Midsize & Fullsize", eg: "e.g. Toyota Camry, Chevrolet Malibu or similar", specs: [[Users, "5 Passengers"], [Briefcase, "3 Bags"], [CarFront, "Comfortable Highway Cruising"]] },
  { img: "photo-1519641471654-76ce0107ad1b", alt: "SUV", price: "$45", title: "SUVs & Crossovers", eg: "e.g. Ford Explorer, Jeep Grand Cherokee or similar", specs: [[Users, "5-7 Passengers"], [Briefcase, "4+ Large Bags"], [Mountain, "Spacious & All-Weather Ready"]] },
  { img: "photo-1555215695-3004980ad54e", alt: "Luxury Car", price: "$65", title: "Luxury & Premium", eg: "e.g. BMW 3 Series, Audi A4, Mercedes-Benz", specs: [[Users, "5 Passengers"], [Briefcase, "3 Bags"], [Star, "High-end Comfort & Features"]] },
  { img: "photo-1533473359331-0135ef1b58bf", alt: "Minivan", price: "$55", title: "Passenger Vans & Minivans", eg: "e.g. Dodge Grand Caravan, Chrysler Pacifica", specs: [[Users, "7-12 Passengers"], [Briefcase, "5+ Bags"], [Users, "Perfect For Large Families"]] },
];

const reviews = [
  { initials: "RM", name: "Robert M.", trip: "Booked SUV in Orlando, FL", text: "Calling bestcarrentaldeals.com saved me over $120 on my last-minute trip to Miami. The phone representative was friendly and explained the agency cancellation policy very clearly." },
  { initials: "ST", name: "Sarah T.", trip: "Booked Minivan in Denver, CO", text: "I appreciated that they were straightforward about being an independent travel agency. No fake promises. They compared options across major fleets and got me a great minivan for our family." },
  { initials: "DL", name: "David L.", trip: "Booked Sedan in Phoenix, AZ", text: `Great customer service on ${PHONE}. I needed to modify my drop-off date, and their agent handled the update smoothly with the rental counter.` },
];

const inputCls =
  "w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none";
const labelCls = "block text-xs font-bold uppercase text-slate-600 mb-1";
const reserveBtn =
  "w-full bg-slate-900 hover:bg-brand-600 text-white font-bold py-2.5 rounded-lg text-center text-sm transition flex items-center justify-center gap-2";

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalId>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openModal = (m: ModalId) => {
    setModal(m);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModal(null);
    document.body.style.overflow = "";
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Thank you for submitting your inquiry! Due to high demand, please call our toll-free hotline directly at ${PHONE} to lock in your live rate immediately.`);
  };

  const faqs: { q: string; a: React.ReactNode }[] = [
    { q: "Are you directly affiliated with specific car rental companies?", a: <><strong>bestcarrentaldeals.com</strong> is an independent travel agency. We are not owned by, operated by, or affiliated with any specific car rental company or brand. We act as an independent intermediary helper to assist you in searching, comparing, and reserving rental vehicles.</> },
    { q: "Why should I book through your phone assistance desk?", a: <>Booking by phone at <strong>{PHONE}</strong> grants you direct access to our travel specialists who can compare rates across multiple fleet suppliers simultaneously, find flexible discount combinations, and clarify local rental requirements (such as driver deposits and ID requirements).</> },
    { q: "What documents do I need when picking up the rental vehicle?", a: <>When picking up your vehicle at the counter, the primary driver must present a valid driver&apos;s license, a major credit card (or approved debit card depending on supplier rules) in the primary driver&apos;s name, and your booking confirmation voucher provided by our agency.</> },
    { q: "How do cancellations and refunds work?", a: <>Refund eligibility depends on the type of reservation booked (Prepaid vs Pay-at-Counter) and the timing of your cancellation notice. Please review our detailed <button onClick={() => openModal("refund")} className="text-brand-600 font-bold underline">Refund Policy</button> or call {PHONE} for cancellation requests.</> },
  ];

  const ModalShell = ({ id, title, icon, btn, children }: { id: ModalId; title: string; icon: React.ReactNode; btn: string; children: React.ReactNode }) =>
    modal === id ? (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
          <div className="p-5 bg-slate-900 text-white flex justify-between items-center border-b border-slate-800">
            <h3 className="text-lg font-bold flex items-center gap-2">{icon} {title}</h3>
            <button onClick={closeModal} aria-label="Close" className="text-slate-400 hover:text-white"><X size={22} /></button>
          </div>
          <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">{children}</div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
            <button onClick={closeModal} className="bg-brand-600 text-white font-bold px-5 py-2 rounded-lg text-xs hover:bg-brand-700">{btn}</button>
          </div>
        </div>
      </div>
    ) : null;

  const H = ({ children }: { children: React.ReactNode }) => <h4 className="font-bold text-slate-900 text-sm">{children}</h4>;

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased flex flex-col min-h-screen">
      {/* Top Announcement Bar */}
      <div className="bg-brand-900 text-white text-xs sm:text-sm py-2 px-4 border-b border-brand-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-amber-300 font-medium text-center md:text-left">
            <TriangleAlert size={12} />
            <span><strong>Disclaimer:</strong> We are an independent travel agency and not associated or affiliated with any car rental company or organization.</span>
          </div>
          <div className="flex items-center gap-4 shrink-0 font-medium">
            <span className="hidden sm:inline-flex items-center gap-1"><Clock size={14} className="text-brand-500" /> 24/7 Phone Support</span>
            <a href={TEL} className="text-white hover:text-amber-300 transition flex items-center gap-1">
              <Phone size={14} className="text-accent-500" />
              <span className="font-bold">{PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="bg-brand-600 text-white p-2.5 rounded-xl shadow-md"><CarFront size={24} /></div>
            <div>
              <span className="text-xl font-extrabold text-brand-900 tracking-tight block leading-none">bestcarrentaldeals<span className="text-accent-500">.com</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mt-1">Independent Travel Agency</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <a href="#search" className="hover:text-brand-600 transition">Search Deals</a>
            <a href="#why-us" className="hover:text-brand-600 transition">Why Us</a>
            <a href="#fleet" className="hover:text-brand-600 transition">Vehicle Fleet</a>
            <a href="#faq" className="hover:text-brand-600 transition">FAQs</a>
            <button onClick={() => openModal("terms")} className="hover:text-brand-600 transition">Terms</button>
            <button onClick={() => openModal("refund")} className="hover:text-brand-600 transition">Refund Policy</button>
          </nav>

          <div className="hidden sm:flex items-center">
            <a href={TEL} className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2">
              <PhoneCall size={18} className="animate-pulse" />
              <div className="text-left">
                <span className="text-[10px] block leading-tight opacity-90 uppercase">Call for Exclusive Rates</span>
                <span className="text-base leading-tight">{PHONE}</span>
              </div>
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="lg:hidden text-slate-700 p-2 focus:outline-none">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
            {[["#search", "Search Deals"], ["#why-us", "Why Us"], ["#fleet", "Vehicle Fleet"], ["#faq", "FAQs"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-brand-600">{label}</a>
            ))}
            <button onClick={() => { setMenuOpen(false); openModal("terms"); }} className="block text-left w-full text-slate-700 font-medium hover:text-brand-600">Terms &amp; Conditions</button>
            <button onClick={() => { setMenuOpen(false); openModal("refund"); }} className="block text-left w-full text-slate-700 font-medium hover:text-brand-600">Refund Policy</button>
            <div className="pt-2">
              <a href={TEL} className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 rounded-lg shadow text-center flex items-center justify-center gap-2">
                <Phone size={16} /><span>Call {PHONE}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="search"
        className="relative bg-slate-900 text-white py-12 md:py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,25,47,0.95) 0%, rgba(0,61,122,0.85) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-500/30 border border-blue-400/30 text-amber-300 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
                <ShieldCheck size={16} />
                <span>Independent Rental Comparison &amp; Booking Desk</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Compare &amp; Save Up To <span className="text-accent-500">35% Off</span> On Top Car Rentals
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
                Speak directly with our independent travel agents to unlock unpublished phone-only rates, flexible reservations, and instant support across top fleet partners nationwide.
              </p>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300 border-t border-slate-700/60 max-w-lg mx-auto lg:mx-0">
                {["No Hidden Fees", "Free Cancellations", "24/7 Agent Help"].map((t, i) => (
                  <div key={t} className={`flex items-center gap-2 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                    <CircleCheck size={16} className="text-emerald-400" /> {t}
                  </div>
                ))}
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-200 text-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 text-slate-900 p-2 rounded-full"><Headset size={16} /></div>
                  <span>Prefer booking over the phone? Get instant quotes now!</span>
                </div>
                <a href={TEL} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider shrink-0 transition">Call Agent</a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-800 border border-slate-100 relative">
                <div className="mb-4">
                  <span className="bg-brand-100 text-brand-800 text-xs font-bold px-2.5 py-1 rounded uppercase">Live Rate Search</span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">Get Instant Quotes</h2>
                  <p className="text-xs text-slate-500">Fill in details or call us directly to secure your vehicle.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className={labelCls}>Pick-up Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                      <input type="text" required placeholder="City or Airport Code (e.g. LAX, Orlando)" className={`${inputCls} pl-9`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Pick-up Date</label>
                      <input type="date" required className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Drop-off Date</label>
                      <input type="date" required className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Vehicle Class</label>
                    <select className={inputCls}>
                      <option value="economy">Economy / Compact</option>
                      <option value="sedan">Midsize / Fullsize Sedan</option>
                      <option value="suv">SUV / Crossover</option>
                      <option value="luxury">Luxury / Premium</option>
                      <option value="van">Minivan / Passenger Van</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Your Phone Number (For Callback)</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                      <input type="tel" required placeholder="(555) 000-0000" className={`${inputCls} pl-9`} />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg shadow-md transition flex items-center justify-center gap-2">
                    <Search size={16} /><span>Find Available Rates</span>
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500 mb-2">Need immediate confirmation?</p>
                  <a href={TEL} className="inline-flex items-center justify-center gap-2 text-accent-600 font-extrabold text-lg hover:underline">
                    <PhoneCall size={18} /><span>Call Agent: {PHONE}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-600 font-bold text-xs uppercase tracking-widest block mb-2">Independent Travel Desk</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Why Travelers Choose bestcarrentaldeals.com</h2>
            <p className="text-slate-600 mt-2 text-base">We work for you, not the car rental providers. Our goal is finding you the best match and lowest rates with complete phone booking assistance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, bg, title, text }) => (
              <div key={title} className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 hover:shadow-lg transition">
                <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mb-4`}><Icon size={22} /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
                <Info size={14} /> Important Disclosure
              </div>
              <h3 className="text-xl font-bold text-slate-900">Independent Travel Agency Notice</h3>
              <p className="text-slate-700 text-sm leading-relaxed max-w-3xl">
                <strong>bestcarrentaldeals.com</strong> is a third-party independent travel agency. We are not directly affiliated with, endorsed by, or partnered with any specific car rental provider, company, or brand. All trademarks, company names, and logos belong solely to their respective registered owners.
              </p>
            </div>
            <a href={TEL} className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-xl shadow shrink-0 text-center transition flex items-center gap-2">
              <Phone size={16} /><span>Speak To An Agent</span>
            </a>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-brand-600 font-bold text-xs uppercase tracking-widest block mb-2">Fleet Selection</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Explore Popular Rental Categories</h2>
            <p className="text-slate-600 mt-2 text-base">Select a category and call <strong>{PHONE}</strong> to check live vehicle availability for your destination.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleet.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-slate-200 flex flex-col">
                <div className="bg-slate-200 h-48 flex items-center justify-center relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/${v.img}?q=80&w=800&auto=format&fit=crop`} alt={v.alt} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-brand-900 text-white text-xs font-bold px-3 py-1 rounded-full">From {v.price}/day*</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{v.eg}</p>
                    <ul className="mt-4 space-y-2 text-xs text-slate-600">
                      {v.specs.map(([Icon, label]) => (
                        <li key={label} className="flex items-center gap-2"><Icon size={14} className="text-brand-500" /> {label}</li>
                      ))}
                    </ul>
                  </div>
                  <a href={TEL} className={reserveBtn}><Phone size={14} /> Call To Reserve</a>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-brand-900 to-brand-800 rounded-2xl p-6 text-white flex flex-col justify-between border border-brand-700 shadow-xl">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-white"><Headset size={18} /></div>
                <h3 className="text-2xl font-bold">Need a Custom Vehicle or Truck?</h3>
                <p className="text-slate-300 text-sm">Our agents can find specialty convertibles, 15-passenger vans, or pickup trucks across our independent supplier network.</p>
              </div>
              <div className="pt-6 border-t border-brand-700/60 mt-6">
                <p className="text-xs text-amber-300 font-semibold uppercase mb-1">Toll-Free Booking Desk</p>
                <a href={TEL} className="text-2xl font-black text-white hover:text-accent-500 block transition">{PHONE}</a>
                <span className="text-[11px] text-slate-400 block mt-1">*Rates vary by season, location, and supplier availability.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-600 font-bold text-xs uppercase tracking-widest block mb-2">Verified Feedback</span>
            <h2 className="text-3xl font-extrabold text-slate-900">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <div key={r.name} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex text-amber-400 gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">&quot;{r.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm">{r.initials}</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{r.name}</h4>
                    <span className="text-[11px] text-slate-500">{r.trip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-600 font-bold text-xs uppercase tracking-widest block mb-2">Got Questions?</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={f.q} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 text-left font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition">
                  <span>{f.q}</span>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2">
                <div className="bg-brand-600 text-white p-2 rounded-lg"><CarFront size={20} /></div>
                <span className="text-xl font-extrabold text-white">bestcarrentaldeals<span className="text-accent-500">.com</span></span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">An independent travel agency committed to assisting travelers with car rental price comparisons, phone booking support, and hassle-free travel arrangements.</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact &amp; Address</h4>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2"><MapPin size={14} className="text-brand-500 mt-0.5 shrink-0" /><span>{ADDRESS}</span></li>
                <li className="flex items-center gap-2"><Phone size={14} className="text-accent-500" /><a href={TEL} className="hover:text-white font-bold text-sm text-amber-300">{PHONE}</a></li>
                <li className="flex items-center gap-2"><Clock size={14} className="text-brand-500" /><span>24/7 Phone Booking Assistance</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Legal &amp; Information</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => openModal("terms")} className="hover:text-amber-300 transition">Terms &amp; Conditions</button></li>
                <li><button onClick={() => openModal("refund")} className="hover:text-amber-300 transition">Refund &amp; Cancellation Policy</button></li>
                <li><button onClick={() => openModal("privacy")} className="hover:text-amber-300 transition">Privacy Policy</button></li>
                <li><a href="#faq" className="hover:text-amber-300 transition">Frequently Asked Questions</a></li>
              </ul>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
              <h4 className="text-amber-300 font-bold text-xs uppercase mb-2 flex items-center gap-1"><TriangleAlert size={12} /> Agency Notice</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">We are an independent travel agency and not associated or affiliated with any car rental company or organization. All brand names, trademarks, and logos displayed belong to their respective owners.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-3">
            <p><strong>Disclaimer &amp; Agency Statement:</strong> bestcarrentaldeals.com operates strictly as an independent travel agency providing travel consulting and booking assistance services. We do not own, operate, or maintain any vehicle fleets. All car rental services booked through our desk are subject to the terms, conditions, rental agreements, and availability determined by the respective third-party supplier or fleet operator providing the vehicle at the destination counter.</p>
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 pt-4 border-t border-slate-800/60">
              <p>&copy; {new Date().getFullYear()} bestcarrentaldeals.com. All Rights Reserved.</p>
              <p>Address: {ADDRESS} | TFN: {PHONE}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ModalShell id="terms" title="Terms and Conditions" icon={<FileText size={18} className="text-brand-500" />} btn="I Understand">
        <p className="font-bold text-slate-900">Effective Date: October 2026</p>
        <H>1. Independent Agency Relationship</H>
        <p>bestcarrentaldeals.com is an independent third-party travel agency providing reservation arrangement services. We are not an agent, representative, subsidiary, or affiliate of any rental car supplier or vehicle brand.</p>
        <H>2. Booking &amp; Service Fees</H>
        <p>Prices quoted on our site or by phone hotline (1-888-990-9020) include applicable taxes, rental estimates, and may include an agency service fee for processing your reservation. Rates are subject to change based on real-time supplier availability until booking confirmation is issued.</p>
        <H>3. Rental Counter Requirements</H>
        <p>The primary driver must present a valid driver&apos;s license, major credit card in their name, and meet the minimum age requirements specified by the fulfilling rental supplier. Security deposits at the counter are required directly by the car rental company.</p>
        <H>4. Limitation of Liability</H>
        <p>As an independent agency, bestcarrentaldeals.com is not liable for vehicle condition, mechanical issues, counter wait times, or service disputes occurring directly with the rental operator.</p>
        <H>5. Contact Information</H>
        <p>For questions regarding these terms, contact our support team at:<br />{ADDRESS}<br />Toll-Free Phone: {PHONE}</p>
      </ModalShell>

      <ModalShell id="refund" title="Refund & Cancellation Policy" icon={<RotateCcw size={18} className="text-accent-500" />} btn="Close Policy">
        <p className="font-bold text-slate-900">Last Updated: October 2026</p>
        <H>1. Cancellation Timelines &amp; Eligibility</H>
        <p>Cancellations made at least 48 hours prior to the scheduled pick-up time are eligible for a full or partial refund based on the specific ticket type and supplier rule. Requests made within 48 hours of pick-up may incur a standard cancellation or processing fee.</p>
        <H>2. Non-Refundable Conditions &amp; No-Shows</H>
        <p>Failure to arrive at the rental counter (&quot;No-Show&quot;), failure to present required driver&apos;s license/credit card, or failure to meet supplier age criteria will result in forfeiture of the booking payment without refund eligibility.</p>
        <H>3. Agency Service Fees</H>
        <p>Administrative and booking assistance fees charged by bestcarrentaldeals.com for reservation handling are non-refundable once the reservation confirmation voucher has been generated and sent to the client.</p>
        <H>4. Requesting a Refund</H>
        <p>To request a cancellation or process a refund inquiry, please call our support hotline directly at <strong>{PHONE}</strong> with your booking confirmation ID available.</p>
      </ModalShell>

      <ModalShell id="privacy" title="Privacy Policy" icon={<ShieldUser size={18} className="text-emerald-400" />} btn="Close">
        <p>Your privacy is paramount to bestcarrentaldeals.com. We collect necessary contact details (such as phone numbers and travel itineraries) solely to fulfill rental car quotes and reservation requests with third-party suppliers.</p>
        <p>We do not sell your personal data to third-party marketers. Information is transmitted securely strictly for travel booking purposes.</p>
      </ModalShell>
    </div>
  );
};

export default Page;