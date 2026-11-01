import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";


export default async function AboutPage() {
    const h = await headers();
  const userAgent = h.get("user-agent");
  return (
    <div className="container-shell py-12 sm:py-16">
      
      {/* Hero Section */}
      <section className="grid items-center gap-9 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">Our story · Our roots</p>
          <h1 className="section-title">
            Some flavours<br />feel like <span className="text-spice">home.</span>
          </h1>
          <p className="mt-6 leading-7 text-neutral-400">
            Karaampatta is built around a simple idea: the flavours we grow up with deserve a place at every table. We celebrate homemade-style pickles, aromatic spices, traditional powders and thoughtfully sourced pantry favourites.
          </p>
          <p className="mt-4 leading-7 text-neutral-400">
            Our name stands for the familiar comfort of a well-loved kitchen — the aroma of spices warming in a pan, a favourite pickle beside lunch, and recipes passed from one generation to the next.
          </p>
          <Link href="/products" className="btn-primary mt-7 inline-block">Explore the pantry</Link>
        </div>
        <Image 
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1300&q=85" 
          alt="Warm home kitchen with ingredients ready for cooking"  width={1300} height={975}
          className="aspect-[4/3] w-full rounded-3xl border border-line object-cover" 
        />
      </section>

      {/* Features Cards Section */}
      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {/* Card 1 */}
        <div className="surface rounded-2xl p-6">
          <i className="bi bi-tree-fill mb-5 text-spice text-2xl block"></i>
          <h2 className="text-xl font-extrabold">Rooted in tradition</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            We take inspiration from familiar regional flavours and the rituals that make home cooking special.
          </p>
        </div>

        {/* Card 2 */}
        <div className="surface rounded-2xl p-6">
          <i className="bi bi-heart-fill mb-5 text-spice text-2xl block"></i>
          <h2 className="text-xl font-extrabold">Made with care</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            Every product should earn its place in your kitchen through clear details, care and a love of flavour.
          </p>
        </div>

        {/* Card 3 */}
        <div className="surface rounded-2xl p-6">
          <i className="bi bi-flower1 mb-5 text-spice text-2xl block"></i>
          <h2 className="text-xl font-extrabold">Sourced thoughtfully</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            We believe customers deserve transparent product information and ingredients they can understand.
          </p>
        </div>
      </section>

      {/* Bottom Banner Section */}
      <section className="mt-10 rounded-3xl border border-line bg-panel p-7 sm:p-10">
        <i className="bi bi-suit-heart-fill mb-4 text-spice text-3xl block"></i>
        <h2 className="text-3xl font-black">A Taste of Tradition, Made with Love.</h2>
        <p className="mt-3 max-w-2xl leading-7 text-neutral-400">
          We are growing this kitchen-minded brand with care. Before launch, we will share verified ingredient lists, sourcing information and the details you need to shop with confidence.
        </p>
        <Link href="/contact" className="btn-secondary mt-6 inline-block">Talk to us</Link>
      </section>
         <p className="mt-6 text-xs text-neutral-500">
            Your browser: {userAgent}
        </p>
    </div>
  );
}