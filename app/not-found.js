import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container-shell grid min-h-[55vh] place-items-center py-16 text-center">
      <div>
        <p className="eyebrow mb-3">404 · Wrong shelf</p>
        <h1 className="text-4xl font-black">That page isn't in our pantry.</h1>
        <p className="mt-3 text-neutral-400">
          Let's get you back to something delicious.
        </p>
        <Link href="/" className="btn-primary mt-6">
          Back home
        </Link>
      </div>
    </div>
  );
}
