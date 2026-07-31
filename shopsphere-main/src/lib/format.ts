/** Formats an integer amount of cents as a localized currency string (e.g. "$129.00"). */
export function formatPrice(cents: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    cents / 100,
  );
}
