import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-7xl font-semibold text-gradient">404</p>
      <h1 className="mt-4 font-serif text-3xl text-cream">Page Not Found</h1>
      <p className="mt-2 text-cream/60">The page you're looking for doesn't exist.</p>
      <Link href="/" className="btn-gold mt-8">Back to Home</Link>
    </div>
  );
}
