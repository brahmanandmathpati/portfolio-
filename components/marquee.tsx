/** CSS-only infinite strip; pauses on hover/focus and becomes a static wrapped list under reduced motion. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  return (
    <div
      className="marquee relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      role="region"
      aria-label={label}
    >
      <ul className="marquee-track flex w-max gap-3">
        {[...items, ...items].map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className="glass whitespace-nowrap rounded-full px-4 py-2 font-display text-sm font-medium"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
