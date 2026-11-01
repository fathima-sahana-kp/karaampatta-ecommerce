"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to load products.");
        const data = await res.json();
        if (!cancelled) {
          setProducts(data.products);
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }

    loadData();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="container-shell grid min-h-155 items-center gap-10 py-14 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-2">
            <i className="bi bi-leaf text-base inline-block scale-x-[-1]"></i>
            Rooted in flavour. Made with love.
          </p>

          <h1 className="text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl">
            A little taste
            <br />
            of <span className="text-spice">home.</span>
            <br />
            A lot of heart.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-400 sm:text-lg">
            Discover the authentic flavours of homemade pickles, aromatic
            spices, traditional powders, and carefully sourced goodness —
            bringing the warmth of our roots to your kitchen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">
              Explore Our Products
              <i className="bi bi-arrow-right"></i>
            </Link>

            <Link href="/about" className="btn-secondary">
              Our story
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-neutral-400">
            <span className="flex items-center gap-2">
              <i className="bi bi-flower1 text-base text-spice"></i>
              Rooted in tradition
            </span>

            <span className="flex items-center gap-2">
              <i className="bi bi-heart-fill text-spice"></i>
              Made with care
            </span>

            <span className="flex items-center gap-2">
              <i className="bi bi-box-seam text-base text-spice"></i>
              Pantry-ready favourites
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rounded-4xl border border-line"></div>

          <Image
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1300&q=90"
            alt="Colourful traditional spices arranged in bowls"
            width={1200}
            height={800}
            priority
            className="relative aspect-4/4.5 w-full rounded-[1.6rem] object-cover"
          />

          <div className="absolute -bottom-5 -left-3 max-w-61.25 rounded-2xl border border-line bg-panel p-4 shadow-2xl sm:-left-7">
            <p className="eyebrow mb-2">From our roots</p>
            <p className="text-lg font-extrabold leading-snug">
              The little things that make a meal feel like home.
            </p>
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-spice px-4 py-2 text-xs font-black uppercase tracking-wider text-ink">
            Flavour, first.
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-y border-line bg-panel py-16 sm:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-3">Shop by feeling</p>
              <h2 className="section-title">
                Good things, <span className="text-spice">from the ground up.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-neutral-400">
              Pantry staples and traditional favourites, selected to bring a
              little more character to everyday cooking.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group relative block min-h-66.25 overflow-hidden rounded-2xl border border-line"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent"></div>

                <div className="absolute bottom-0 p-5">
                  <span className="mb-3 inline-block rounded-full bg-spice px-2.5 py-1 text-[10px] font-black text-ink">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-extrabold">{category.name}</h3>

                  <p className="mt-1 text-sm text-neutral-300">{category.note}</p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-spice">
                    Explore range
                    <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container-shell py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Loved in the kitchen</p>
            <h2 className="section-title">
              Pantry <span className="text-spice">favourites.</span>
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden items-center gap-2 text-sm font-bold text-spice sm:inline-flex"
          >
            Shop all
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link href="/products" className="btn-secondary mt-6 w-full sm:hidden">
          View all products
          <i className="bi bi-arrow-right"></i>
        </Link>
      </section>

      {/* Bottom Banner */}
      <section className="container-shell pb-16">
        <div className="grid gap-6 rounded-3xl border border-line bg-panel p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
          <div>
            <p className="eyebrow mb-3">Tradition at your table</p>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Bring home a little{" "}
              <span className="text-spice">more flavour.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400">
              From tangy pickles to fragrant spices, discover the pantry
              companions that make everyday meals feel special.
            </p>
          </div>

          <Link href="/products" className="btn-primary">
            Find your favourites
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>
    </>
  );
}