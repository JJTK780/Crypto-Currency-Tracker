export default function formatPriceChange(
  price: number | null | undefined
): string {
  if (price == null || Number.isNaN(price)) return "—";

  const fixed = price.toFixed(2);
  return price >= 0 ? fixed : fixed.slice(1);
}
