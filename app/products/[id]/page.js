"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { CartContext } from "@/context/CartContext";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useContext(CartContext);

  // Fetch products from the route handler
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to load products.");
        const data = await res.json();
        if (!cancelled) setProducts(data.products);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => { cancelled = true; };
  }, []);

  const product = products.find((item) => item.id === params.id);

  if (loading) {
    return (
      <div className="container-shell py-24 text-center text-neutral-400">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-shell py-24 text-center">
        <p className="eyebrow mb-3">Not in the pantry</p>

        <h1 className="text-3xl font-black">
          We couldn't find that product.
        </h1>

        <Link href="/products" className="btn-primary mt-6">
          <i className="bi bi-arrow-left mr-2"></i>
          Back to products
        </Link>
      </div>
    );
  }

  const related = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 3);

  function handleAdd() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
  }

  return (
    <div className="container-shell py-10 sm:py-14">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 transition hover:text-spice"
      >
        <i className="bi bi-arrow-left"></i>
        Back
      </button>

      {/* Product Details */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-3xl border border-line bg-panel">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            priority
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="eyebrow mb-4">
            {product.category} · {product.weight}
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-black text-spice">
            ₹{product.price}
          </p>

          <p className="mt-5 leading-7 text-neutral-400">
            {product.description}
          </p>

          {/* Quantity and Add to Cart */}
          <div className="mt-7 rounded-2xl border border-line bg-panel p-5">
            <p className="mb-3 text-sm font-bold">Quantity</p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-line">
                <button
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="p-3 transition hover:text-spice"
                  aria-label="Decrease quantity"
                >
                  <i className="bi bi-dash-lg"></i>
                </button>

                <span className="min-w-8 text-center font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((current) => Math.min(99, current + 1))
                  }
                  className="p-3 transition hover:text-spice"
                  aria-label="Increase quantity"
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>

              <button onClick={handleAdd} className="btn-primary flex-1">
                <i className="bi bi-bag-plus"></i>
                Add to cart · ₹{product.price * quantity}
              </button>
            </div>

            {added && (
              <p
                role="status"
                className="mt-4 flex flex-wrap items-center gap-2 text-sm text-leaf"
              >
                <i className="bi bi-check-circle-fill"></i>
                Added to your cart.
                <Link href="/cart" className="underline hover:text-spice">
                  View cart
                </Link>
              </p>
            )}
          </div>

          <p className="mt-5 text-xs leading-5 text-neutral-500">
            Product images and catalogue details are demo content. Confirm
            ingredients, net weight, shelf life, allergen details and
            applicable food-label requirements before selling.
          </p>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-black">More from this shelf</h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}