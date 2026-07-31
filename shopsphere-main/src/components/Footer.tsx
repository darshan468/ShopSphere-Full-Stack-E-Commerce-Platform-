/** Simple site footer with a link back to the admin login. */
export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} ShopSphere. Demo storefront for portfolio
        purposes.
      </p>
      <a href="/admin/login" className="mt-1 inline-block text-gray-400 hover:text-brand">
        Admin login
      </a>
    </footer>
  );
}
