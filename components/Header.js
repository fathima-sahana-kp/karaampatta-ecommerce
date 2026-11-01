
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  function submitSearch(e) {
    e.preventDefault();
    const term = search.trim();
    router.push(term ? `/products?search=${encodeURIComponent(term)}` : "/products");
    setOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-line bg-ink">
      <nav className="mx-auto flex min-h-[76px] w-[min(1180px,calc(100%-40px))] items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-spice text-black"><i className="bi bi-leaf text-lg inline-block scale-x-[-1]"></i></span>
          <span className="text-xl font-black tracking-tight text-white">karaampatta<span className="text-spice">.</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          <Link href="/" className="text-sm font-semibold text-neutral-300 transition hover:text-spice">Home</Link>
          <Link href="/products" className="text-sm font-semibold text-neutral-300 transition hover:text-spice">Products</Link>
          <Link href="/about" className="text-sm font-semibold text-neutral-300 transition hover:text-spice">About</Link>
          <Link href="/contact" className="text-sm font-semibold text-neutral-300 transition hover:text-spice">Contact</Link>
        </div>

        {/* Desktop search */}
        <form onSubmit={submitSearch} className="hidden items-center gap-2 rounded-full border border-line bg-panel px-3 py-2 lg:flex">
          <i className="bi bi-search text-neutral-400"></i>
          <input type="search" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500" />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition hover:border-spice hover:text-spice"><i className={`bi ${theme === "dark" ? "bi-sun-fill" : "bi-moon-fill"}`}></i></button>
          <Link href="/signin" aria-label="signin" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-white transition hover:border-spice hover:text-spice"><i className="bi bi-person"></i></Link>
          <Link href="/cart" aria-label="Cart" className="flex h-10 w-10 items-center justify-center rounded-full bg-spice text-black transition hover:opacity-90"><i className="bi bi-bag"></i></Link>

          {/* Mobile toggle */}
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-2xl text-white md:hidden"><i className="bi bi-list"></i></button>
        </div>
      </nav>

      {/* Overlay */}
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}></div>

      {/* Mobile drawer */}
      <aside className={`fixed right-0 top-0 z-[70] flex h-full w-72 max-w-[85%] flex-col bg-ink shadow-2xl transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-5">
          <h5 className="text-lg font-bold text-white">Menu</h5>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="text-xl text-white hover:text-spice"><i className="bi bi-x-lg"></i></button>
        </div>

        <div className="flex flex-col gap-2 px-5 py-5">
          <form onSubmit={submitSearch} className="mb-3 flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-2">
            <input type="search" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500" />
            <button type="submit" aria-label="Search" className="text-white hover:text-spice"><i className="bi bi-search"></i></button>
          </form>

          <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-white hover:bg-panel hover:text-spice">Home</Link>
          <Link href="/products" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-white hover:bg-panel hover:text-spice">Products</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-white hover:bg-panel hover:text-spice">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-white hover:bg-panel hover:text-spice">Contact</Link>
        </div>
      </aside>
    </header>
  );
}
