"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "../../components/ProductCard";

function ProductListing() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("search") || "";
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [sort, setSort] = useState("featured");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products and categories from the route handler
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to load products.");
        const data = await res.json();
        if (!cancelled) {
          setProducts(data.products);
          setCategories(data.categories);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();
    return () => { cancelled = true; };
  }, []);

  function chooseCategory(value) {
    setCategory(value);

    const params = new URLSearchParams();

    if (value !== "all") {
      params.set("category", value);
    }

    if (query) {
      params.set("search", query);
    }

    router.replace(
      `/products${params.size ? `?${params}` : ""}`,
      { scroll: false }
    );
  }

  if (loading) {
    return (
      <div className="container-shell py-20 text-neutral-400">
        Loading the pantry...
      </div>
    );
  }

  if (error) {
    return <div className="container-shell py-20 text-red-400">{error}</div>;
  }

  let filtered = products.filter((product) => {
    const matchesCategory =
      category === "all" || product.category === category;

    const matchesSearch = `${product.name} ${product.short} ${product.category}`
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  if (sort === "price-low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  if (sort === "price-high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container-shell py-12 sm:py-16">
      {/* Heading */}
      <div className="mb-10">
        <p className="eyebrow mb-3">The Karaampatta pantry</p>

        <h1 className="section-title">
          Find your next <span className="text-spice">favourite.</span>
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
          From familiar homemade pickles to aromatic spices and traditional
          powders, find the flavour that belongs in your kitchen.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-7 grid gap-3 lg:grid-cols-[1fr_auto]">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {[["all", "All products"], ...categories.map((c) => [c.id, c.name])].map(
            ([id, label]) => (
              <button
                key={id}
                onClick={() => chooseCategory(id)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  category === id
                    ? "border-spice bg-spice text-ink"
                    : "border-line bg-panel text-neutral-300 hover:border-spice"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <label className="flex items-center gap-2 rounded-full border border-line bg-panel px-3">
            <i className="bi bi-sliders text-neutral-500"></i>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="max-w-28 bg-transparent py-2 text-xs outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      {/* Product Count */}
      <p className="mb-5 text-sm text-neutral-500">
        {filtered.length} products to explore
      </p>

      {/* Products */}
      {filtered.length ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line py-16 text-center">
          <p className="text-xl font-bold">No pantry favourites found.</p>

          <p className="mt-2 text-sm text-neutral-400">
            Try another search or category.
          </p>

          <button
            className="btn-primary mt-5"
            onClick={() => {
              setCategory("all");
              router.replace("/products", { scroll: false });
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-shell py-20 text-neutral-400">
          Loading the pantry...
        </div>
      }
    >
      <ProductListing />
    </Suspense>
  );
}