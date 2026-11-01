
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-800 bg-[#0d0d0d]">
      <div className="container-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Brand Section */}
        <div>
          <Link href="/" className="mb-4 flex items-center gap-2 text-xl font-black text-white"><i className="bi bi-leaf text-orange-500 inline-block scale-x-[-1]"></i>karaampatta.</Link>
          <p className="max-w-xs text-sm leading-6 text-neutral-400">A Taste of Tradition, Made with Love. Bringing the warmth of our roots to your kitchen.</p>
        </div>

        {/* 2. Explore Links */}
        <div>
          <h3 className="mb-4 font-bold text-white">Explore</h3>
          <div className="grid gap-3 text-sm text-neutral-400">
            <Link href="/products" className="hover:text-orange-500">All products</Link>
            <Link href="/about" className="hover:text-orange-500">Our story</Link>
            <Link href="/contact" className="hover:text-orange-500">Contact us</Link>
            <Link href="/cart" className="hover:text-orange-500">Your cart</Link>
          </div>
        </div>

        {/* 3. Contact Info */}
        <div>
          <h3 className="mb-4 font-bold text-white">Get in touch</h3>
          <p className="mb-3 text-sm leading-6 text-neutral-400">Questions about ingredients, orders or sourcing? We would love to hear from you.</p>
          <a href="mailto:karaampatta@gmail.com" className="inline-flex items-center gap-2 text-sm text-orange-500">karaampatta@gmail.com <i className="bi bi-arrow-up-right text-xs"></i></a>
        </div>

        {/* 4. Social Media */}
        <div>
          <h3 className="mb-4 font-bold text-white">Follow our kitchen</h3>
          <p className="mb-4 text-sm text-neutral-400">Fresh ideas, old favourites and a little spice for your feed.</p>
          <div className="flex gap-3">
            <a aria-label="Instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-colors hover:border-orange-500 hover:text-orange-500"><i className="bi bi-instagram"></i></a>
            <a aria-label="Facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-colors hover:border-orange-500 hover:text-orange-500"><i className="bi bi-facebook"></i></a>
            <a aria-label="Email us" href="mailto:karaampatta@gmail.com" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-300 transition-colors hover:border-orange-500 hover:text-orange-500"><i className="bi bi-envelope"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026, Karaampatta. Made with care.</span>
          <span>Real ingredients. Rooted flavours. Everyday joy.</span>
        </div>
      </div>
    </footer>
  );
}
