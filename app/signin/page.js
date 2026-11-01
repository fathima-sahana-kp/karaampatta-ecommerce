"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    setMessage("Welcome back to Karaampatta! 🌿 Taking you to the pantry...");

    setTimeout(() => {
      router.replace("/products");
    }, 1000);
  }

  return (
    <div className="container-shell grid min-h-[65vh] place-items-center py-14">
      <div className="surface w-full max-w-md rounded-3xl p-7 sm:p-9">
        {/* Lock Icon */}
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-spice text-ink">
          <i className="bi bi-shield-lock-fill text-xl"></i>
        </div>

        <p className="eyebrow mb-3">Welcome back</p>
        <h1 className="text-3xl font-black">Your pantry, your way.</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          Sign in to manage your account and orders.
        </p>

        <form onSubmit={submit} className="mt-7 grid gap-4">
          <label className="text-sm font-semibold">
            Email
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field mt-2"
              placeholder="you@example.com"
            />
          </label>

          <label className="text-sm font-semibold">
            Password
            <input type="password"
            autoComplete="current-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field mt-2"
              placeholder="At least 8 characters"
            />
          </label>

          <button className="btn-primary mt-2 w-full">Sign in</button>
        </form>

        {message && (
          <p role="status" className="mt-4 text-sm leading-6 text-spice">
            {message}
          </p>
        )}

        <p className="mt-5 text-center text-sm text-neutral-400">
          New to Karaampatta?{" "}
          <Link href="/products" className="font-bold text-spice">
            Explore the pantry
          </Link>
        </p>
      </div>
    </div>
  );
}
