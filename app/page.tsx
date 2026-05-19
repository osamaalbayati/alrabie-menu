"use client";

import { useEffect, useMemo, useState } from "react";

type CategoryKey =
  | "breakfast"
  | "manakish"
  | "pizza"
  | "mashawi"
  | "kunafa"
  | "dairy";

type Product = {
  id: number;
  name: string;
  price: number;
  category: CategoryKey;
  badge?: string;
  description?: string;
};

type CartItem = Product & {
  quantity: number;
};

const WHATSAPP_NUMBER = "9647804000463";

const categories: {
  key: CategoryKey;
  labelAr: string;
  labelEn: string;
  short: string;
}[] = [
  { key: "breakfast", labelAr: "الفطور", labelEn: "Breakfast", short: "بداية فخمة" },
  { key: "manakish", labelAr: "المناقيش", labelEn: "Manakish", short: "طازج من الفرن" },
  { key: "pizza", labelAr: "البيتزا", labelEn: "Pizza", short: "مذاق غني" },
  { key: "mashawi", labelAr: "مشاوي الضيعة", labelEn: "Mashawi", short: "شغل نار" },
  { key: "kunafa", labelAr: "كنافة حمد", labelEn: "Kunafa", short: "حلا فاخر" },
  { key: "dairy", labelAr: "الألبان", labelEn: "Dairy", short: "طعم نظيف" },
];

const products: Product[] = [
  { id: 1, name: "فطور الربيع", price: 10000, category: "breakfast", badge: "مميز", description: "فطور صباحي فاخر ومتكامل." },
  { id: 2, name: "فطور شرقي", price: 15000, category: "breakfast", description: "خيار غني ومناسب للبداية القوية." },

  { id: 3, name: "مناقيش زعتر", price: 3500, category: "manakish", badge: "الأكثر طلبًا", description: "خفيفة وطازجة دائمًا." },
  { id: 4, name: "مناقيش جبن", price: 4500, category: "manakish", description: "جبن ذائب بطبقة ذهبية." },

  { id: 5, name: "بيتزا مشكلة", price: 8000, category: "pizza", badge: "جديد", description: "مذاق متوازن ومشهي." },
  { id: 6, name: "بيتزا دجاج", price: 9000, category: "pizza", description: "دجاج طري مع جبن غني." },

  { id: 7, name: "مشاوي الضيعة", price: 18000, category: "mashawi", badge: "مفضل", description: "شوي فاخر بطابع عراقي." },
  { id: 8, name: "مشاوي مشكلة", price: 22000, category: "mashawi", description: "صحن غني مناسب للمشاركة." },

  { id: 9, name: "كنافة حمد", price: 5000, category: "kunafa", badge: "خاص", description: "حلا ساخن بطابع فاخر." },
  { id: 10, name: "كنافة بالقشطة", price: 7000, category: "kunafa", description: "كريمة ناعمة وطعم غني." },

  { id: 11, name: "لبن ربيع", price: 2500, category: "dairy", description: "منعش وخفيف." },
  { id: 12, name: "لبنة ربيع", price: 3000, category: "dairy", description: "قوام ناعم ومميز." },
];

const heroSlides = [
  {
    title: "منيو فاخر بطابع عربي",
    subtitle: "الربيع يقدم تجربة طلب حديثة، مرتبة، وسهلة من الموبايل.",
    image: "/image/main.jpg",
    accent: "from-green-900/70 via-black/40 to-black/90",
  },
  {
    title: "فطور ومناقيش ساخنة",
    subtitle: "كل قسم مرتب بشكل أنيق حتى الزبون يطلب بسرعة بدون تشتت.",
    image: "/image/breakfast.jpg",
    accent: "from-emerald-900/60 via-black/35 to-black/90",
  },
  {
    title: "مشاوي وكنافة Premium",
    subtitle: "هوية داكنة، لمسة خضراء، وحركة ناعمة تعطيك شكل عالمي.",
    image: "/image/mashwai.jpg",
    accent: "from-lime-900/50 via-black/35 to-black/90",
  },
];

const offers = [
  {
    title: "عرض الفطور الصباحي",
    desc: "ابدأ يومك بصحن أنيق ومتكامل.",
    price: "ابتداءً من 10,000 د.ع",
    targetId: "breakfast" as CategoryKey,
  },
  {
    title: "عرض البيتزا العائلية",
    desc: "مذاق غني ومناسب للمشاركة.",
    price: "ابتداءً من 8,000 د.ع",
    targetId: "pizza" as CategoryKey,
  },
  {
    title: "عرض الكنافة الخاص",
    desc: "حلا فاخر مع تقديم مميز.",
    price: "ابتداءً من 5,000 د.ع",
    targetId: "kunafa" as CategoryKey,
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("breakfast");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const [heroIndex, setHeroIndex] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || cartDrawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, cartDrawerOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : product.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const groupedSections = useMemo(() => {
    return categories
      .map((category) => ({
        ...category,
        items: filteredProducts.filter((product) => product.category === category.key),
      }))
      .filter((section) => section.items.length > 0);
  }, [filteredProducts]);

  const featuredProducts = useMemo(() => {
    return products.filter((product) => product.badge).slice(0, 6);
  }, []);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);

      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setCartDrawerOpen(true);
  };

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const sendWhatsApp = () => {
    if (cart.length === 0) return;

    const itemsText = cart
      .map(
        (item) =>
          `• ${item.name} × ${item.quantity} = ${formatPrice(item.price * item.quantity)} د.ع`
      )
      .join("\n");

    const customerBlock = [
      customerName ? `الاسم: ${customerName}` : "",
      customerPhone ? `الرقم: ${customerPhone}` : "",
      customerAddress ? `العنوان: ${customerAddress}` : "",
      note ? `ملاحظات: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const message = `السلام عليكم 🌿

أريد الطلب التالي من مطعم الربيع:

${itemsText}

المجموع الكلي: ${formatPrice(total)} د.ع

${customerBlock ? `${customerBlock}\n` : ""}شكراً لكم`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-[#050505] text-white scroll-smooth">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <button
            onClick={() => scrollToId("hero")}
            className="flex items-center gap-3 text-right"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.18)]">
              ↗
            </div>
            <div>
              <h1 className="text-lg font-black leading-5 md:text-2xl">الربيع</h1>
              <p className="text-xs text-gray-400 md:text-sm">Luxury Arabic Menu</p>
            </div>
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveCategory(category.key);
                  scrollToId(category.key);
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category.key
                    ? "bg-green-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {category.labelAr}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 md:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative rounded-full bg-green-600 px-4 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-green-500"
            >
              <span className="flex items-center gap-2">
                🛒
                <span className="hidden sm:inline">السلة</span>
              </span>

              {cartCount > 0 && (
                <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE CATEGORY BAR */}
        <div className="border-t border-white/5 md:hidden">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveCategory(category.key);
                  scrollToId(category.key);
                }}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category.key
                    ? "bg-green-600 text-white"
                    : "bg-white/5 text-gray-300"
                }`}
              >
                {category.labelAr}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="absolute right-0 top-0 h-full w-[92vw] max-w-sm border-l border-white/10 bg-[#0b0b0b] p-5 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black">الأقسام</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => {
                    setActiveCategory(category.key);
                    setMobileMenuOpen(false);
                    scrollToId(category.key);
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 transition ${
                    activeCategory === category.key
                      ? "bg-green-600 text-white"
                      : "bg-white/5 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  <span>
                    <span className="block text-lg font-bold">{category.labelAr}</span>
                    <span className="block text-xs text-gray-300">{category.short}</span>
                  </span>
                  <span className="text-lg">‹</span>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] bg-white/5 p-4">
              <p className="text-sm text-gray-300">النجف الأشرف</p>
              <p className="mt-2 text-lg font-bold">حي السلام - مقابل شقق السلام</p>
            </div>
          </aside>
        </div>
      )}

      {/* CART DRAWER */}
      {cartDrawerOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/80"
          onClick={() => setCartDrawerOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 h-full w-[94vw] max-w-md overflow-hidden border-r border-white/10 bg-[#0b0b0b] text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <h3 className="text-2xl font-black">سلة الطلبات</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    راجع الطلب ثم أرسله مباشرة إلى واتساب.
                  </p>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-gray-400">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl text-green-400">
                      🛒
                    </div>
                    السلة فارغة حاليًا
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-[28px] border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <span className="inline-flex rounded-full bg-green-600 px-3 py-1 text-xs font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            <h5 className="mt-3 text-xl font-black leading-tight">
                              {item.name}
                            </h5>

                            <p className="mt-2 text-sm text-gray-400">
                              {item.description}
                            </p>

                            <p className="mt-2 text-sm font-semibold text-green-400">
                              {formatPrice(item.price)} د.ع
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-3 md:justify-end">
                            <div className="flex items-center gap-2 rounded-2xl bg-black/30 p-2">
                              <button
                                onClick={() => decrease(item.id)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/15"
                              >
                                −
                              </button>
                              <span className="min-w-8 text-center text-lg font-black">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => increase(item.id)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/15"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 transition hover:bg-red-500/25"
                              aria-label="Remove item"
                            >
                              🗑
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                          <span className="text-gray-300">المجموع الجزئي</span>
                          <span className="font-black text-green-400">
                            {formatPrice(item.price * item.quantity)} د.ع
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 space-y-4">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <h4 className="mb-4 text-2xl font-black">بيانات الطلب</h4>

                    <div className="space-y-3">
                      <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="الاسم"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                      <input
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="رقم الهاتف"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                      <input
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="العنوان"
                        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="ملاحظات الطلب"
                        rows={4}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-gray-300">المجموع الكلي</span>
                      <span className="text-3xl font-black text-green-400">
                        {formatPrice(total)} د.ع
                      </span>
                    </div>

                    <button
                      onClick={sendWhatsApp}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 text-lg font-black transition hover:bg-green-500"
                    >
                      إرسال الطلب عبر واتساب
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative min-h-screen overflow-hidden pt-28 md:pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(to top, ${heroSlides[heroIndex].accent}, rgba(0,0,0,0.15)), url('/image/main.jpg')`,
          }}
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-right">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
                طلبات سريعة عبر واتساب
              </p>

              <h2 className="mb-8 block text-right text-5xl font-black leading-tight md:text-7xl">
                الربيع
              </h2>

              <h3 className="max-w-2xl text-2xl font-bold md:text-4xl">
                {heroSlides[heroIndex].title}
              </h3>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-2xl">
                {heroSlides[heroIndex].subtitle}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToId("offers")}
                  className="rounded-full bg-green-600 px-7 py-4 text-lg font-bold transition hover:-translate-y-0.5 hover:bg-green-500"
                >
                  العروض المميزة
                </button>

                <button
                  onClick={sendWhatsApp}
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-lg font-bold text-white transition hover:bg-white/10"
                >
                  اطلب الآن عبر واتساب
                </button>
              </div>

              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => {
                      setActiveCategory(category.key);
                      scrollToId(category.key);
                    }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 text-right transition hover:-translate-y-1 hover:bg-white/10"
                  >
                    <span className="block text-sm text-gray-400">{category.labelEn}</span>
                    <span className="mt-1 block text-lg font-black">{category.labelAr}</span>
                    <span className="mt-1 block text-xs text-green-400">{category.short}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="relative h-[540px] overflow-hidden rounded-[28px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{
                      backgroundImage: `url('${heroSlides[heroIndex].image}')`,
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${heroSlides[heroIndex].accent}`} />

                  <div className="absolute bottom-6 right-6 left-6">
                    <div className="flex flex-wrap gap-3">
                      <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold">
                        Premium
                      </span>
                      <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                        RTL Ready
                      </span>
                      <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                        WhatsApp Order
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HERO DOTS */}
          <div className="mt-10 flex items-center gap-2 self-center lg:self-start">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                onClick={() => setHeroIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === heroIndex ? "w-10 bg-green-500" : "w-3 bg-white/25"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
            ★ أفضل العروض
          </span>
          <h3 className="inline-block text-4xl font-black md:text-5xl">العروض المميزة</h3>
          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            قسم سريع للطلبات الأكثر جذبًا، مصمم بشكل فاخر حتى يركز الزبون على الأقوى.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-right backdrop-blur">
              <span className="inline-flex rounded-full bg-green-600 px-3 py-2 text-xs font-bold">
                عرض
              </span>

              <h4 className="mt-4 text-2xl font-black">{offer.title}</h4>
              <p className="mt-3 text-sm leading-7 text-gray-400">{offer.desc}</p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="font-bold text-green-400">{offer.price}</span>
                <button
                  onClick={() => scrollToId(offer.targetId)}
                  className="rounded-full bg-green-600 px-5 py-3 text-sm font-bold transition hover:bg-green-500"
                >
                  عرض القسم
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
            ★ الأكثر طلبًا
          </span>
          <h3 className="inline-block text-4xl font-black md:text-5xl">المنتجات المميزة</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-right backdrop-blur">
              <span className="inline-flex rounded-full bg-green-600 px-3 py-2 text-xs font-bold">
                {product.badge}
              </span>

              <h4 className="mt-4 text-2xl font-black">{product.name}</h4>
              <p className="mt-3 text-sm leading-7 text-gray-400">{product.description}</p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-black text-green-400">
                  {formatPrice(product.price)} د.ع
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className="rounded-full bg-green-600 px-5 py-3 text-sm font-bold transition hover:bg-green-500"
                >
                  إضافة للسلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-center gap-3 rounded-[26px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
            <span className="text-green-400">⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-transparent outline-none placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                filter === "all" ? "bg-green-600 text-white" : "bg-white/5 text-gray-300"
              }`}
            >
              الكل
            </button>

            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                  filter === category.key ? "bg-green-600 text-white" : "bg-white/5 text-gray-300"
                }`}
              >
                {category.labelAr}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="mx-auto max-w-7xl px-4 py-10 pb-32 md:px-6 md:pb-20">
        <div className="mb-12 text-center">
          <h3 className="inline-block text-4xl font-black md:text-5xl">منيو الربيع</h3>
          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            كل قسم مرتب بشكل أنيق، وكل صنف قابل للإضافة للسلة وإرساله مباشرة إلى واتساب.
          </p>
        </div>

        {groupedSections.length === 0 ? (
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-10 text-center text-gray-400">
            لا توجد نتائج مطابقة للبحث أو الفلتر الحالي.
          </div>
        ) : (
          <div className="space-y-20">
            {groupedSections.map((categorySection) => (
              <section
                key={categorySection.key}
                id={categorySection.key}
                className="scroll-mt-32"
              >
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-green-400">
                      {categorySection.labelEn}
                    </p>
                    <h4 className="mt-2 text-4xl font-black md:text-5xl">
                      {categorySection.labelAr}
                    </h4>
                  </div>
                  <p className="text-gray-400">{categorySection.short}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {categorySection.items.map((product) => (
                    <article
                      key={product.id}
                      className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-right backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {product.badge && (
                            <span className="inline-flex rounded-full bg-green-600 px-3 py-1 text-xs font-bold">
                              {product.badge}
                            </span>
                          )}

                          <h5 className="mt-3 text-2xl font-black leading-snug">
                            {product.name}
                          </h5>

                          <p className="mt-2 text-sm leading-7 text-gray-400">
                            {product.description ?? "صنف فاخر جاهز للإضافة إلى السلة."}
                          </p>
                        </div>

                        <div className="shrink-0 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-center">
                          <span className="block text-xs text-gray-300">السعر</span>
                          <span className="block text-lg font-black text-green-400">
                            {formatPrice(product.price)} د.ع
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 text-lg font-bold transition hover:bg-green-500"
                      >
                        ＋ إضافة للسلة
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/80 px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div className="text-right">
            <h5 className="text-4xl font-black">الربيع</h5>
            <p className="mt-4 max-w-sm leading-8 text-gray-400">
              تجربة عربية فخمة للمنيو الإلكتروني، بهوية داكنة وأسلوب راقٍ وسهل على الموبايل.
            </p>
          </div>

          <div className="space-y-4 text-right">
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-green-400">⌂</span>
              <span>النجف الأشرف - حي السلام - مقابل شقق السلام</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-green-400">⏱</span>
              <span>طلب سريع عبر واتساب</span>
            </div>
          </div>

          <div className="space-y-4 text-right">
            <a
              href="https://instagram.com/al__rabie"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 transition hover:text-white"
            >
              <span className="text-green-400">◎</span>
              @al__rabie
            </a>
            <a
              href="https://instagram.com/kanafa.hamad"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 transition hover:text-white"
            >
              <span className="text-green-400">◎</span>
              @kanafa.hamad
            </a>
            <a
              href="https://instagram.com/mashawi.aldayea"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 transition hover:text-white"
            >
              <span className="text-green-400">◎</span>
              @mashawi.aldayea
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTONS */}
      <button
        onClick={() => setCartDrawerOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 md:bottom-6 md:right-6"
        aria-label="Open cart"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-black">
            {cartCount}
          </span>
        )}
      </button>

      <button
        onClick={sendWhatsApp}
        className="fixed bottom-20 left-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 md:bottom-6 md:left-6"
        aria-label="WhatsApp order"
      >
        ☎
      </button>

      {/* MOBILE BOTTOM DOCK */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/85 px-3 py-3 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => scrollToId("hero")}
            className="rounded-2xl bg-white/5 py-3 text-xs font-bold"
          >
            الرئيسية
          </button>
          <button
            onClick={() => scrollToId("offers")}
            className="rounded-2xl bg-white/5 py-3 text-xs font-bold"
          >
            العروض
          </button>
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="rounded-2xl bg-white/5 py-3 text-xs font-bold"
          >
            السلة
          </button>
          <button
            onClick={sendWhatsApp}
            className="rounded-2xl bg-green-600 py-3 text-xs font-bold"
          >
            واتساب
          </button>
        </div>
      </div>
    </main>
  );
}