
"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-panel transition duration-200 hover:-translate-y-1 hover:border-spice">
      <Link href={`/products/${product.id}`} className="relative block overflow-hidden">
        <Image src={product.image} alt={product.name} loading="lazy" width={400} height={400} className="product-image transition duration-500 group-hover:scale-[1.035]" />
        {product.tag && <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{product.tag}</span>}
      </Link>

      <div className="p-4 sm:p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-spice">{product.weight} · {product.category}</p>
        <Link href={`/products/${product.id}`} prefetch={false} className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-snug sm:text-lg">{product.name}</h3>
          <i className="bi bi-arrow-up-right mt-1 shrink-0 text-neutral-500 transition group-hover:text-spice"></i>
        </Link>
        <p className="mt-2 min-h-10 text-sm leading-5 text-neutral-400">{product.short}</p>

        <div className="mt-5 flex items-center justify-between gap-2">
          <span className="text-lg font-black">₹{product.price}</span>
          <button onClick={() => addToCart(product)} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-bold transition hover:border-spice hover:bg-spice hover:text-ink" aria-label={`Add ${product.name} to cart`}>
            <i className="bi bi-bag-plus text-base"></i>
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
