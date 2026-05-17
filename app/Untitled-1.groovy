"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "فطور الربيع",
    price: 10000,
    image: "/image/breakfast.jpg",
    category: "الفطور",
  },
  {
    id: 2,
    name: "فطور شرقي فاخر",
    price: 15000,
    image: "/image/breakfast2.jpg",
    category: "الفطور",
  },
  {
    id: 3,
    name: "مناقيش زعتر",
    price: 3500,
    image: "/image/manqish.jpg",
    category: "المناقيش",
  },
  {
    id: 4,
    name: "مناقيش جبن",
    price: 4500,
    image: "/image/manqish2.jpg",
    category: "المناقيش",
  },
  {
    id: 5,
    name: "بيتزا مشكلة",
    price: 8000,
    image: "/image/pizza.jpg",
    category: "البيتزا",
  },
  {
    id: 6,
    name: "بيتزا دجاج",
    price: 9000,
    image: "/image/pizza2.jpg",
    category: "البيتزا",
  },
  {
    id: 7,
    name: "مشاوي الضيعة",
    price: 18000,
    image: "/image/mashwai.jpg",
    category: "المشاوي",
  },
  {
    id: 8,
    name: "مشاوي مشكلة",
    price: 22000,
    image: "/image/mashwai2.jpg",
    category: "المشاوي",
  },
  {
    id: 9,
    name: "كنافة حمد",
    price: 5000,
    image: "/image/kanafa.jpg",
    category: "الكنافة",
  },
  {
    id: 10,
    name: "كنافة بالقشطة",
    price: 7000,
    image: "/image/kanafa2.jpg",
    category: "الكنافة",
  },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  const sendWhatsApp = () => {
    if (cart.length === 0) return;

    const text = `
السلام عليكم 🌿

أريد أطلب من مطعم الربيع:

${cart
  .map(
    (item) =>
      `• ${item.name} × ${item.quantity} = ${
        item.price * item.quantity
      } د.ع`
  )
  .join("\n")}

المجموع الكلي: ${total} د.ع

العنوان:
`;

    const url = `https://wa.me/9647804000463?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank");
  };

  return (
    <main className="bg-[#070707] text-white min-h-screen">

      {/* HERO */}

      <section className="relative h-screen overflow-hidden">

        <Image
          src="/image/main.jpg"
          alt="Al Rabie"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">

          <h1 className="text-6xl md:text-8xl font-black tracking-wide text-white">
            الربيع
          </h1>

          <p className="mt-5 text-green-500 text-2xl tracking-[8px] uppercase">
            Luxury Restaurant
          </p>

          <p className="mt-8 max-w-2xl text-gray-300 text-lg leading-8">
            فطور صباحي • مناقيش • بيتزا • مشاوي الضيعة • كنافة حمد
          </p>

          <button
            onClick={sendWhatsApp}
            className="mt-10 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300 px-10 py-4 text-lg font-bold shadow-2xl"
          >
            اطلب الآن عبر واتساب
          </button>

        </div>
      </section>

      {/* PRODUCTS */}

      <section className="px-6 py-20 max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-black text-white">
            منيو الربيع
          </h2>

          <div className="mx-auto mt-5 h-1 w-32 rounded-full bg-green-500" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {products.map((product) => (

            <div
              key={product.id}
              className="group overflow-hidden rounded-[35px] bg-[#111111] border border-white/10 hover:border-green-500/40 transition-all duration-500 shadow-2xl"
            >

              <div className="relative h-[320px] overflow-hidden">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-5 right-5">

                  <span className="bg-green-600 text-white text-sm px-4 py-2 rounded-full">
                    {product.category}
                  </span>

                </div>

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between gap-4">

                  <h3 className="text-2xl font-bold">
                    {product.name}
                  </h3>

                  <span className="text-green-400 text-xl font-black">
                    {product.price.toLocaleString()} د.ع
                  </span>

                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-6 w-full rounded-2xl bg-green-600 py-4 text-lg font-bold hover:bg-green-700 transition-all duration-300"
                >
                  إضافة للسلة
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CART */}

      <div className="fixed bottom-5 left-5 z-50 w-[370px] max-w-[92vw] rounded-[30px] border border-green-500/20 bg-[#111111]/95 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">

        <div className="flex items-center justify-between mb-5">

          <h3 className="text-2xl font-black">
            سلة الطلبات
          </h3>

          <span className="bg-green-600 px-4 py-2 rounded-full text-sm">
            {cart.length} منتجات
          </span>

        </div>

        <div className="max-h-[300px] overflow-y-auto pr-2">

          {cart.length === 0 && (
            <p className="text-gray-400 text-center py-10">
              السلة فارغة
            </p>
          )}

          {cart.map((item) => (

            <div
              key={item.id}
              className="mb-4 rounded-2xl bg-white/5 p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h4 className="font-bold text-lg">
                    {item.name}
                  </h4>

                  <p className="text-green-400 mt-1">
                    {(item.price * item.quantity).toLocaleString()} د.ع
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decrease(item.id)}
                    className="h-9 w-9 rounded-full bg-white/10 text-xl"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increase(item.id)}
                    className="h-9 w-9 rounded-full bg-white/10 text-xl"
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="mt-5 border-t border-white/10 pt-5">

          <div className="flex items-center justify-between mb-5">

            <span className="text-xl font-bold">
              المجموع
            </span>

            <span className="text-2xl font-black text-green-400">
              {total.toLocaleString()} د.ع
            </span>

          </div>

          <button
            onClick={sendWhatsApp}
            className="w-full rounded-2xl bg-green-600 hover:bg-green-700 transition-all duration-300 py-4 text-lg font-black"
          >
            إرسال الطلب عبر واتساب
          </button>

        </div>

      </div>

      {/* WHATSAPP FLOAT */}

      <a
        href="https://wa.me/9647804000463"
        target="_blank"
        className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl hover:scale-110 transition-all duration-300"
      >
        <span className="text-3xl">☎</span>
      </a>

      {/* FOOTER */}

      <footer className="mt-32 border-t border-white/10 px-6 py-16">

        <div className="max-w-7xl mx-auto text-center">

          <h3 className="text-4xl font-black text-white">
            الربيع
          </h3>

          <p className="mt-5 text-gray-400 text-lg">
            النجف الأشرف - حي السلام - مقابل شقق السلام
          </p>

          <div className="mt-8 flex flex-col gap-3 text-green-400 text-lg">

            <a href="https://instagram.com/al__rabie" target="_blank">
              @al__rabie
            </a>

            <a href="https://instagram.com/kanafa.hamad" target="_blank">
              @kanafa.hamad
            </a>

            <a href="https://instagram.com/mashawi.aldayea" target="_blank">
              @mashawi.aldayea
            </a>

          </div>

        </div>

      </footer>

    </main>
  );
}