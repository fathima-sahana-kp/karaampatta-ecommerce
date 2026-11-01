
"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container-shell py-12 sm:py-16">
      <p className="eyebrow mb-3">Your basket</p>
      <h1 className="section-title">Good things, <span className="text-spice">gathered.</span></h1>
      <p className="mt-3 text-neutral-400">Your selected pantry favourites, all in one place.</p>

      {!cart.length ? (
        <div className="mt-9 rounded-2xl border border-dashed border-line py-16 text-center">
          <i className="bi bi-bag text-4xl text-spice"></i>
          <h2 className="mt-4 text-2xl font-black">Your cart is taking a little breather.</h2>
          <p className="mt-2 text-sm text-neutral-400">Explore the pantry and add something delicious.</p>
          <Link href="/products" className="btn-primary mt-6">Explore products</Link>
        </div>
      ) : (
        <div className="mt-9 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-3">
            {cart.map((item) => (
              <article key={item.id} className="surface flex gap-4 rounded-2xl p-3 sm:p-4">
                <Image src={item.image} alt={item.name} width={200} height={240} className="h-28 w-24 rounded-xl object-cover sm:h-32 sm:w-28" />
                <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                  <div>
                    <Link href={`/products/${item.id}`} className="font-extrabold hover:text-spice">{item.name}</Link>
                    <p className="mt-1 text-xs text-neutral-500">{item.weight}</p>
                    <p className="mt-2 font-black">₹{item.price}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-line">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 transition hover:text-spice" aria-label="Decrease quantity"><i className="bi bi-dash-lg"></i></button>
                      <span className="min-w-6 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 transition hover:text-spice" aria-label="Increase quantity"><i className="bi bi-plus-lg"></i></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="inline-flex items-center gap-1 text-xs text-neutral-500 transition hover:text-red-400"><i className="bi bi-trash3"></i>Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="surface rounded-2xl p-6">
            <h2 className="text-xl font-black">Order summary</h2>
            <div className="mt-5 flex justify-between text-sm text-neutral-400"><span>Subtotal</span><span>₹{cartTotal}</span></div>
            <div className="mt-3 flex justify-between text-sm text-neutral-400"><span>Shipping</span><span>Calculated at checkout</span></div>
            <div className="my-5 border-t border-line"></div>
            <div className="flex justify-between text-lg font-black"><span>Total</span><span>₹{cartTotal}</span></div>
            <button onClick={() => alert("Online ordering coming soon! Stay tuned for updates and connect with us on social media.  ")} className="btn-primary mt-6 w-full"><i className="bi bi-lock-fill mr-2"></i>Continue to checkout</button>
            <Link href="/products" className="mt-4 block text-center text-sm font-bold text-spice">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
