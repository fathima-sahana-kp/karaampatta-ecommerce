"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setStatus({ loading: false, error: "", success: "" });
  }

  function submit(event) {
    event.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    setTimeout(() => {
      setStatus({
        loading: false,
        error: "",
        success: "Thanks for reaching out! We'll get back to you soon.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  }

  return (
    <div className="container-shell py-12 sm:py-16">
      <div className="mb-10">
        <p className="eyebrow mb-3">We’re listening</p>
        <h1 className="section-title">Let’s talk <span className="text-spice">good food.</span></h1>
        <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
          Have a question about a product, an order or our ingredients? Send us a note and we’ll be happy to help.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">

        {/* Contact Info Sidebar */}
        <aside className="surface h-fit rounded-2xl p-6">
          <h2 className="text-xl font-extrabold">Let’s stay connected</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            We love hearing from fellow food lovers! Whether it’s a question about our traditional recipes, ingredients, or feedback, our kitchen is always open.
          </p>

          <a href="mailto:karaampatta@gmail.com" className="mt-6 flex items-center gap-3 text-sm hover:text-spice">
            <i className="bi bi-envelope-fill text-spice text-lg"></i> karaampatta@gmail.com
          </a>

          <p className="mt-4 flex items-center gap-3 text-sm text-neutral-400">
            <i className="bi bi-geo-alt-fill text-spice text-lg"></i> Kerala, India
          </p>
        </aside>

        {/* Contact Form */}
        <form onSubmit={submit} className="surface rounded-2xl p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Your name
              <input className="field mt-2" name="name" value={form.name} onChange={update} minLength={2} maxLength={80} autoComplete="name" required placeholder="Name" />
            </label>
            <label className="text-sm font-semibold">
              Email address
              <input className="field mt-2" name="email" type="email" value={form.email} onChange={update} maxLength={254} autoComplete="email" required placeholder="you@example.com" />
            </label>
          </div>

          <label className="mt-5 block text-sm font-semibold">
            Subject
            <input className="field mt-2" name="subject" value={form.subject} onChange={update} maxLength={120} required placeholder="How can we help?" />
          </label>

          <label className="mt-5 block text-sm font-semibold">
            Your message
            <textarea className="field mt-2 min-h-36 resize-y" name="message" value={form.message} onChange={update} minLength={10} maxLength={3000} required placeholder="Tell us a little more…" />
          </label>

          {status.error && (
            <p role="alert" className="mt-4 text-sm text-red-400">{status.error}</p>
          )}

          {status.success && (
            <p role="status" className="mt-4 flex items-center gap-2 text-sm text-leaf">
              <i className="bi bi-check-circle-fill text-base"></i> {status.success}
            </p>
          )}

          <button disabled={status.loading} className="btn-primary mt-6 inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-60">
            <i className="bi bi-send-fill text-sm"></i>
            {status.loading ? "Sending…" : "Send message"}
          </button>

        </form>

      </div>
    </div>
  );
}