"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FiChevronLeft,
  FiClock,
  FiInstagram,
  FiMapPin,
  FiMenu,
  FiMessageCircle,
  FiMinus,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiStar,
  FiTrash2,
  FiX,
} from "react-icons/fi";

type CategoryKey = "breakfast" | "manakish" | "pizza" | "mashawi" | "kunafa" | "dairy";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
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
  {
    id: 1,
    name: "فطور الربيع",
    price: 10000,
    image: "/image/breakfast.jpg",
    category: "breakfast",
    badge: "مميز",
    description: "تشكلية فطور صباحي فخمة ومتكاملة.",
  },
  {
    id: 2,
    name: "فطور شرقي فاخر",
    price: 15000,
    image: "/image/breakfast2.jpg",
    category: "breakfast",
    description: "خيار غني ومناسب للبداية القوية.",
  },
  {
    id: 3,
    name: "مناقيش زعتر",
    price: 3500,
    image: "/image/manqish.jpg",
    category: "manakish",
    badge: "الأكثر طلبًا",
    description: "طازجة، خفيفة، ومحبوبة دائمًا.",
  },
  {
    id: 4,
    name: "مناقيش جبن",
    price: 4500,
    image: "/image/manqish2.jpg",
    category: "manakish",
    description: "جبن ذائب بطبقة ذهبية جميلة.",
  },
  {
    id: 5,
    name: "بيتزا مشكلة",
    price: 8000,
    image: "/image/pizza.jpg",
    category: "pizza",
    badge: "جديد",
    description: "مذاق متوازن ومشهي جدًا.",
  },
  {
    id: 6,
    name: "بيتزا دجاج",
    price: 9000,
    image: "/image/pizza2.jpg",
    category: "pizza",
    description: "دجاج طري مع جبن غني.",
  },
  {
    id: 7,
    name: "مشاوي الضيعة",
    price: 18000,
    image: "/image/mashwai.jpg",
    category: "mashawi",
    badge: "مفضل",
    description: "شوي فاخر ولمسة عراقية أصيلة.",
  },
  {
    id: 8,
    name: "مشاوي مشكلة",
    price: 22000,
    image: "/image/mashwai2.jpg",
    category: "mashawi",
    description: "صحن مشاوي غني مناسب للمشاركة.",
  },
  {
    id: 9,
    name: "كنافة حمد",
    price: 5000,
    image: "/image/kanafa.jpg",
    category: "kunafa",
    badge: "خاص",
    description: "حلا ساخن ولمسة فخمة ومشبعة.",
  },
  {
    id: 10,
    name: "كنافة بالقشطة",
    price: 7000,
    image: "/image/kanafa2.jpg",
    category: "kunafa",
    description: "كريمة ناعمة وطعم غني جدًا.",
  },
  {
    id: 11,
    name: "لبن ربيع",
    price: 2500,
    image: "/image/main.jpg",
    category: "dairy",
    description: "منعش وخفيف ولطيف على المائدة.",
  },
  {
    id: 12,
    name: "لبنة ربيع",
    price: 3000,
    image: "/image/main.jpg",
    category: "dairy",
    description: "قوام ناعم ومذاق نظيف ومميز.",
  },
];

const heroSlides = [
  {
    title: "منيو فاخر بطابع عربي",
    subtitle: "الربيع يقدم تجربة طلب حديثة، مرتبة، وسهلة من الموبايل.",
    image: "/image/main.jpg",
  },
  {
    title: "فطور، مناقيش، وبيتزا",
    subtitle: "كل قسم مرتب بشكل أنيق حتى الزبون يطلب بسرعة بدون تشتت.",
    image: "/image/breakfast.jpg",
  },
  {
    title: "مشاوي وكنافة بطابع Premium",
    subtitle: "هوية داكنة، لمسة خضراء، وحركة ناعمة تعطيك شكل عالمي.",
    image: "/image/mashwai.jpg",
  },
];

const offers = [
  {
    title: "عرض الفطور الصباحي",
    desc: "ابدأ يومك بصحن أنيق ومتكامل.",
    price: "ابتداءً من 10,000 د.ع",
    targetId: "breakfast" as CategoryKey,
    image: "/image/breakfast.jpg",
  },
  {
    title: "عرض البيتزا العائلية",
    desc: "مذاق غني ومناسب للمشاركة.",
    price: "ابتداءً من 8,000 د.ع",
    targetId: "pizza" as CategoryKey,
    image: "/image/pizza.jpg",
  },
  {
    title: "عرض الكنافة الخاص",
    desc: "حلا فاخر مع تقديم مميز.",
    price: "ابتداءً من 5,000 د.ع",
    targetId: "kunafa" as CategoryKey,
    image: "/image/kanafa.jpg",
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("breakfast");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [note, setNote] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryKey | "all">("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setCartDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      mobileMenuOpen || cartDrawerOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, cartDrawerOpen]);

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.key))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveCategory(visible.target.id as CategoryKey);
        }
      },
      {
        root: null,
        threshold: 0.35,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [search, filter]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" ? true : product.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const visibleSections = useMemo(() => {
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
          `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} د.ع`
      )
      .join("\n");

    const meta = [
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

المجموع الكلي: ${total.toLocaleString()} د.ع

${meta ? `${meta}\n` : ""}شكراً لكم`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main dir="rtl" lang="ar" className="min-h-screen bg-[#050505] text-white">
      {/* NAVBAR */}
      <header className="navbar-blur fixed top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <button
            onClick={() => scrollToId("hero")}
            className="flex items-center gap-3 text-right"
          >
            <div className="green-glow flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/15 text-green-400">
              <FiChevronLeft className="text-2xl" />
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
              <FiMenu className="text-xl" />
            </button>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative rounded-full bg-green-600 px-4 py-3 text-sm font-bold btn-premium"
            >
              <span className="flex items-center gap-2">
                <FiShoppingBag />
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
            className="glass absolute right-0 top-0 h-full w-[92vw] max-w-sm p-5 text-right transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black">الأقسام</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5"
              >
                <FiX className="text-2xl" />
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
                  <FiChevronLeft />
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
            className="glass absolute top-0 h-full w-[94vw] max-w-md overflow-hidden text-right transition-all duration-300 md:w-[420px]"
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
                  <FiX className="text-2xl" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="glass rounded-[28px] p-8 text-center text-gray-400">
                    <FiShoppingBag className="mx-auto mb-4 text-4xl text-green-400" />
                    السلة فارغة حاليًا
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="glass flex flex-col gap-4 rounded-[28px] p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-2xl">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>

                          <div>
                            <h5 className="text-xl font-black">{item.name}</h5>
                            <p className="mt-1 text-sm text-green-400">
                              {item.price.toLocaleString()} د.ع
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              المجموع: {(item.price * item.quantity).toLocaleString()} د.ع
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 md:justify-end">
                          <div className="flex items-center gap-2 rounded-2xl bg-white/5 p-2">
                            <button
                              onClick={() => decrease(item.id)}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/15"
                            >
                              <FiMinus />
                            </button>
                            <span className="min-w-8 text-center text-lg font-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increase(item.id)}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/15"
                            >
                              <FiPlus />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/15 text-red-400 transition hover:bg-red-500/25"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 space-y-4">
                  <div className="glass rounded-[28px] p-5">
                    <h4 className="mb-4 text-2xl font-black">بيانات الطلب</h4>

                    <div className="space-y-3">
                      <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="الاسم"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                      <input
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="رقم الهاتف"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                      <input
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="العنوان"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="ملاحظات الطلب"
                        rows={4}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-gray-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="glass rounded-[28px] p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-gray-300">المجموع الكلي</span>
                      <span className="text-3xl font-black text-green-400">
                        {total.toLocaleString()} د.ع
                      </span>
                    </div>

                    <button
                      onClick={sendWhatsApp}
                      className="btn-premium mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-black"
                    >
                      <FiMessageCircle />
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
        {heroSlides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-all duration-700 ${
              index === heroIndex ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}

        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-right">
              <p className="glass mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-200">
                <FiClock className="text-green-400" />
                طلبات سريعة عبر واتساب
              </p>

              <h2 className="section-title text-gradient mb-8 block text-right text-6xl font-black leading-tight md:text-8xl">
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
                  className="btn-premium rounded-full px-7 py-4 text-lg font-bold"
                >
                  العروض المميزة
                </button>

                <button
                  onClick={sendWhatsApp}
                  className="glass rounded-full border border-white/10 px-7 py-4 text-lg font-bold text-white transition hover:bg-white/10"
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
                    className="glass rounded-3xl border border-white/10 p-4 text-right transition hover:-translate-y-1 hover:bg-white/10"
                  >
                    <span className="block text-sm text-gray-400">{category.labelEn}</span>
                    <span className="mt-1 block text-lg font-black">{category.labelAr}</span>
                    <span className="mt-1 block text-xs text-green-400">{category.short}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="glass card-premium overflow-hidden rounded-[36px] p-4">
                <div className="relative h-[540px] overflow-hidden rounded-[28px]">
                  <Image
                    src={heroSlides[heroIndex].image}
                    alt="Hero preview"
                    fill
                    className="object-cover image-hover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

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

      {/* FEATURED OFFERS */}
      <section id="offers" className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
            <FiStar />
            أفضل العروض
          </span>
          <h3 className="section-title text-gradient inline-block">العروض المميزة</h3>
          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            قسم سريع للطلبات الأكثر جذبًا، مصمم بشكل فاخر حتى يركز الزبون على الأقوى.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.title} className="card-premium overflow-hidden rounded-[32px]">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover image-hover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-green-600 px-3 py-2 text-xs font-bold">
                    عرض
                  </span>
                </div>
              </div>

              <div className="p-6 text-right">
                <h4 className="text-2xl font-black">{offer.title}</h4>
                <p className="mt-3 text-sm leading-7 text-gray-400">{offer.desc}</p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-green-400 font-bold">{offer.price}</span>
                  <button
                    onClick={() => scrollToId(offer.targetId)}
                    className="btn-premium rounded-full px-5 py-3 text-sm font-bold"
                  >
                    عرض القسم
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
            <FiStar />
            الأكثر طلبًا
          </span>
          <h3 className="section-title text-gradient inline-block">المنتجات المميزة</h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card-premium overflow-hidden rounded-[32px]">
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover image-hover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute right-4 top-4">
                  <span className="rounded-full bg-green-600 px-3 py-2 text-xs font-bold">
                    {product.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 text-right">
                <h4 className="text-2xl font-black">{product.name}</h4>
                <p className="mt-3 text-sm leading-7 text-gray-400">{product.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-black text-green-400">
                    {product.price.toLocaleString()} د.ع
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="btn-premium rounded-full px-5 py-3 text-sm font-bold"
                  >
                    إضافة للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="glass mb-5 flex items-center gap-3 rounded-[26px] px-5 py-4">
            <FiSearch className="text-green-400" />
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
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-12 text-center">
          <h3 className="section-title text-gradient inline-block">منيو الربيع</h3>
          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            كل قسم مرتب بشكل أنيق، وكل صنف قابل للإضافة للسلة وإرساله مباشرة إلى واتساب.
          </p>
        </div>

        {visibleSections.length === 0 ? (
          <div className="glass rounded-[30px] p-10 text-center text-gray-400">
            لا توجد نتائج مطابقة للبحث أو الفلتر الحالي.
          </div>
        ) : (
          <div className="space-y-20">
            {visibleSections.map((categorySection) => (
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
                    <article key={product.id} className="card-premium group overflow-hidden rounded-[34px]">
                      <div className="relative h-[280px] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover image-hover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute right-5 top-5 flex gap-2">
                          {product.badge && (
                            <span className="rounded-full bg-green-600 px-3 py-2 text-xs font-bold">
                              {product.badge}
                            </span>
                          )}
                          <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur">
                            {product.price.toLocaleString()} د.ع
                          </span>
                        </div>
                      </div>

                      <div className="p-6 text-right">
                        <h5 className="text-2xl font-black">{product.name}</h5>
                        <p className="mt-2 text-sm leading-7 text-gray-400">
                          {product.description ?? "صنف فاخر جاهز للإضافة إلى السلة."}
                        </p>

                        <button
                          onClick={() => addToCart(product)}
                          className="btn-premium mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-bold"
                        >
                          <FiPlus />
                          إضافة للسلة
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer-premium px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div className="text-right">
            <h5 className="text-4xl font-black">الربيع</h5>
            <p className="mt-4 max-w-sm leading-8 text-gray-400">
              تجربة عربية فخمة للمنيو الإلكتروني، بهوية داكنة وأسلوب راقٍ وسهل على الموبايل.
            </p>
          </div>

          <div className="space-y-4 text-right">
            <div className="flex items-center gap-3 text-gray-300">
              <FiMapPin className="text-green-400" />
              <span>النجف الأشرف - حي السلام - مقابل شقق السلام</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FiClock className="text-green-400" />
              <span>طلب سريع عبر واتساب</span>
            </div>
          </div>

          <div className="space-y-4 text-right">
            <a
              href="https://instagram.com/al__rabie"
              target="_blank"
              className="flex items-center gap-3 text-gray-300 transition hover:text-white"
            >
              <FiInstagram className="text-green-400" />
              @al__rabie
            </a>
            <a
              href="https://instagram.com/kanafa.hamad"
              target="_blank"
              className="flex items-center gap-3 text-gray-300 transition hover:text-white"
            >
              <FiInstagram className="text-green-400" />
              @kanafa.hamad
            </a>
            <a
              href="https://instagram.com/mashawi.aldayea"
              target="_blank"
              className="flex items-center gap-3 text-gray-300 transition hover:text-white"
            >
              <FiInstagram className="text-green-400" />
              @mashawi.aldayea
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING QUICK ACTIONS */}
      <button
        onClick={() => setCartDrawerOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110"
        aria-label="Open cart"
      >
        <FiShoppingBag className="text-3xl" />
        {cartCount > 0 && (
          <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-black">
            {cartCount}
          </span>
        )}
      </button>

      <button
        onClick={sendWhatsApp}
        className="fixed bottom-5 left-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110"
        aria-label="WhatsApp order"
      >
        <FiMessageCircle className="text-3xl" />
      </button>

      {/* MOBILE BOTTOM DOCK */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 px-3 py-3 backdrop-blur-md md:hidden">
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
            className="btn-premium rounded-2xl py-3 text-xs font-bold"
          >
            واتساب
          </button>
        </div>
      </div>
    </main>
  );
}