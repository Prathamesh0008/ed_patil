import Link from "next/link";
import Image from "next/image";
import {
  FiShoppingCart,
  FiStar,
  FiTruck,
  FiClock,
  FiShield,
  FiChevronRight,
  FiPackage,
  FiHeart,
  FiCheckCircle,
  FiActivity,
  FiUserCheck,
  FiDroplet,
} from "react-icons/fi";

const Container = ({ className = "", children }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ title, subtitle }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center">
    <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
      {title}
    </h2>
    {subtitle ? (
      <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
        {subtitle}
      </p>
    ) : null}
  </div>
);

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Hand Sanitizer 500ml",
      description: "Alcohol-based antibacterial sanitizer with moisturizers",
      price: 8.99,
      originalPrice: 12.99,
      rating: 4.3,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=600&h=400&fit=crop",
      category: "Hygiene",
      isBestSeller: true,
      inStock: true,
    },
    {
      id: 2,
      name: "Vitamin C 1000mg",
      description: "High potency Vitamin C tablets for immune support",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.5,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
      category: "Vitamins",
      isNew: true,
      inStock: true,
    },
    {
      id: 3,
      name: "Digital Thermometer",
      description: "Fast and accurate fever detection",
      price: 19.99,
      rating: 4.7,
      reviews: 256,
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      category: "Medical Devices",
      inStock: true,
    },
    {
      id: 4,
      name: "First Aid Kit",
      description: "Complete emergency medical supplies kit",
      price: 34.99,
      rating: 4.8,
      reviews: 167,
      image:
        "https://images.unsplash.com/photo-1516549655669-df6654e43580?w=600&h=400&fit=crop",
      category: "First Aid",
      inStock: true,
    },
  ];

  const services = [
    {
      id: 1,
      title: "Online Consultation",
      description: "Video consult with licensed pharmacists 24/7",
      icon: <FiUserCheck className="h-6 w-6" />,
      tone: "blue",
    },
    {
      id: 2,
      title: "Medicine Delivery",
      description: "Same-day delivery of prescriptions and OTC",
      icon: <FiTruck className="h-6 w-6" />,
      tone: "green",
    },
    {
      id: 3,
      title: "Prescription Refills",
      description: "Easy prescription renewal and management",
      icon: <FiPackage className="h-6 w-6" />,
      tone: "purple",
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Always available for your health queries",
      icon: <FiClock className="h-6 w-6" />,
      tone: "orange",
    },
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers" },
    { value: "24/7", label: "Service Hours" },
    { value: "99.8%", label: "Accuracy Rate" },
    { value: "2-Hour", label: "Delivery Time" },
  ];

  const toneClasses = (tone) => {
    switch (tone) {
      case "blue":
        return "bg-blue-50 text-blue-700 ring-blue-100";
      case "green":
        return "bg-emerald-50 text-emerald-700 ring-emerald-100";
      case "purple":
        return "bg-violet-50 text-violet-700 ring-violet-100";
      case "orange":
        return "bg-amber-50 text-amber-700 ring-amber-100";
      default:
        return "bg-slate-50 text-slate-700 ring-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />
          <div className="absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-indigo-100/20 blur-3xl" />
          
          {/* Floating capsules */}
          <div className="absolute left-1/4 top-1/3 hidden lg:block">
            <div className="animate-float-slow">
              <div className="h-16 w-16 rotate-12 rounded-2xl bg-gradient-to-br from-blue-50/50 to-blue-100/30 p-3 shadow-sm backdrop-blur">
                <div className="flex h-full items-center justify-center space-x-1">
                  <div className="h-3 w-1.5 rounded-full bg-blue-400"></div>
                  <div className="h-4 w-1.5 rounded-full bg-blue-500"></div>
                  <div className="h-3 w-1.5 rounded-full bg-blue-400"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute right-1/4 bottom-1/3 hidden lg:block">
            <div className="animate-float">
              <div className="h-12 w-12 -rotate-12 rounded-xl bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 p-2.5 shadow-sm backdrop-blur">
                <FiDroplet className="h-full w-full text-emerald-400/70" />
              </div>
            </div>
          </div>
        </div>

        <Container className="relative py-12 sm:py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2.5 text-xs font-semibold tracking-wide text-blue-700 shadow-sm backdrop-blur transition-all hover:shadow">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                <FiShield className="h-3.5 w-3.5" />
                <span className="uppercase tracking-widest">Trusted Since 2010</span>
              </div>

              <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Professional
                <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Pharmacy Care
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Authentic medications, expert consultations, and reliable delivery 
                services from certified pharmacists who prioritize your health and wellness.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-600/30"
                >
                  <FiShoppingCart className="h-5 w-5" />
                  Browse Medications
                  <FiChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/consultation"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl border-2 border-blue-200 bg-white px-8 py-4 text-base font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
                >
                  <FiUserCheck className="h-5 w-5" />
                  Book Consultation
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group rounded-xl border border-slate-200/60 bg-white/80 p-5 backdrop-blur transition-all hover:border-blue-200 hover:bg-white hover:shadow-lg"
                  >
                    <div className="text-2xl font-bold text-slate-900 group-hover:text-blue-700">
                      {stat.value}
                      <span className="ml-1 inline-block h-1 w-1 rounded-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></span>
                    </div>
                    <div className="mt-1.5 text-xs font-medium text-slate-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                {/* Main Professional Image - Pharmacist or Medication */}
                <div className="relative h-[400px] w-full sm:h-[450px] lg:h-[500px]">
                  <Image
                    alt="Professional Pharmacist Consultation"
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&h=1200&fit=crop&q=80&auto=format"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    style={{ objectFit: "cover" }}
                    priority
                    className="transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                </div>

                {/* Floating stats card */}
                <div className="absolute left-6 top-6 rounded-xl border border-slate-200/60 bg-white/95 p-5 shadow-2xl backdrop-blur">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                      <FiStar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-600">Trust Score</p>
                      <p className="text-2xl font-bold text-slate-900">4.9/5</p>
                      <p className="text-xs text-slate-500">2,500+ Reviews</p>
                    </div>
                  </div>
                </div>

                {/* Promo Card */}
                <div className="absolute -bottom-6 -right-6 w-5/6 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50 p-6 shadow-2xl lg:w-4/6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                          Health Plan
                        </span>
                      </div>
                      <h4 className="mt-2 text-lg font-bold text-slate-900">Medication Savings</h4>
                      <p className="text-sm text-slate-600">Save up to 30% monthly</p>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                      -30% OFF
                    </span>
                  </div>
                  
                  <div className="mt-5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">$24.99</span>
                      <span className="text-sm text-slate-400 line-through">$35.99</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Limited spots available</p>
                  </div>
                  
                  <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-blue-600/25">
                    <span>Subscribe Now</span>
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50">
                    <FiCheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">FDA Approved</p>
                    <p className="text-xs text-slate-600">Certified</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50">
                    <FiShield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">100% Secure</p>
                    <p className="text-xs text-slate-600">HIPAA Compliant</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-50">
                    <FiClock className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">24/7 Support</p>
                    <p className="text-xs text-slate-600">Always Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured products - Updated with professional medical images */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Professional Medical Products"
            subtitle="High-quality healthcare essentials and medications for your wellness"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="relative">
                  <div className="relative h-56 w-full bg-gradient-to-br from-slate-100 to-slate-50">
                    <Image
                      alt={p.name}
                      src={p.image}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Professional badges */}
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    {p.isBestSeller && (
                      <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                        Bestseller
                      </span>
                    )}
                    {p.isNew && (
                      <span className="rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-1 text-xs font-bold text-white shadow">
                        New
                      </span>
                    )}
                  </div>

                  <button className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow backdrop-blur transition hover:bg-white">
                    <FiHeart className="h-4 w-4 text-slate-600 group-hover:text-rose-500" />
                  </button>

                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-700 backdrop-blur shadow-sm">
                    {p.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(p.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {p.rating}
                      </span>
                    </div>

                    <span className={`text-xs font-bold ${p.inStock ? "text-emerald-700" : "text-rose-700"}`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-slate-900">
                          ${p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            ${p.originalPrice}
                          </span>
                        )}
                      </div>
                      {p.originalPrice && (
                        <p className="mt-1 text-xs font-bold text-emerald-700">
                          Save ${(p.originalPrice - p.price).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-all hover:from-blue-100 hover:to-blue-200 hover:shadow">
                      <FiShoppingCart className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg"
            >
              View All Medical Products
              <FiChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Services - Enhanced */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Comprehensive Pharmacy Services
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Professional healthcare services designed around your needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${toneClasses(s.tone)} shadow-sm transition-transform group-hover:scale-110`}>
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {s.description}
                </p>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  Learn more
                  <FiChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust - Enhanced */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why Choose Our Professional Pharmacy?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: <FiShield className="h-7 w-7" />,
                title: "Certified Quality",
                desc: "All medications are sourced from FDA-approved manufacturers with rigorous quality control.",
                tone: "blue",
              },
              {
                icon: <FiUserCheck className="h-7 w-7" />,
                title: "Expert Consultation",
                desc: "Access to licensed pharmacists for personalized medication advice and health guidance.",
                tone: "green",
              },
              {
                icon: <FiActivity className="h-7 w-7" />,
                title: "Fast & Reliable",
                desc: "Same-day prescription delivery with real-time tracking and temperature control.",
                tone: "purple",
              },
            ].map((x, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200 bg-white p-10 text-center transition-all hover:border-blue-200 hover:shadow-lg"
              >
                <div className={`mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full ${toneClasses(x.tone)} shadow-sm`}>
                  {x.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{x.title}</h3>
                <p className="mt-4 text-sm text-slate-600">{x.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA - Enhanced */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-16 sm:py-20">
        <Container className="text-center text-white">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <FiShield className="h-3.5 w-3.5" />
              Secure & Trusted
            </div>
            
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Experience Professional Healthcare
            </h2>
            <p className="mx-auto mt-4 text-lg leading-8 text-white/90">
              Join our community of health-conscious individuals who trust us for 
              authentic medications and premium pharmacy services.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-900 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-2xl"
              >
                <FiShoppingCart className="h-5 w-5" />
                Shop Professional Products
                <FiChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/consultation"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-transparent px-8 py-4 text-base font-bold text-white backdrop-blur transition-all hover:border-white hover:bg-white/10 hover:shadow-lg"
              >
                <FiUserCheck className="h-5 w-5" />
                Schedule Consultation
              </Link>
            </div>

            <div className="mt-12 border-t border-white/20 pt-8">
              <p className="text-sm font-medium text-white/85">
                HIPAA Compliant • Certified Pharmacists • 24/7 Professional Support • 
                99.8% Customer Satisfaction
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}