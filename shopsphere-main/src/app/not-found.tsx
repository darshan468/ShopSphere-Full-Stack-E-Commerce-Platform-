import Link from 'next/link';

/** Custom 404 page. */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-gray-500">The page you are looking for does not exist.</p>
      <Link href="/" className="text-brand hover:underline">
        Back to home
      </Link>
    </div>
  );
}
