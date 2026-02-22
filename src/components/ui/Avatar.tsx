import { useState } from "react";

export function Avatar({
  name,
  src,
  size = 40,
  className = "",
  alt,
  shape = "circle"
}: {
  name?: string;
  src?: string;
  size?: number;
  className?: string;
  alt?: string;
  shape?: "circle" | "rounded" | "square";
}) {
  const [err, setErr] = useState(false);

  // prefer explicit src, else build base from name (we'll try .svg then .png)
  const hasExt = src ? /\.(svg|png)$/i.test(src) : false;
  const baseSrc = src ? (hasExt ? src.replace(/\.(svg|png)$/i, "") : src) : name ? `/assets/avatars/${name.toLowerCase()}` : undefined;
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(
    baseSrc ? (hasExt && src ? src : `${baseSrc}.svg`) : undefined
  );

  const letter = (name || "?").charAt(0).toUpperCase();

  // deterministic background color per name for individualized placeholders
  function bgForName(n?: string) {
    if (!n) return "#e6e7ea";
    let h = 0;
    for (let i = 0; i < n.length; i++) h = (h << 5) - h + n.charCodeAt(i);
    // produce H in 0..360
    const hue = Math.abs(h) % 360;
    return `hsl(${hue} 70% 85%)`;
  }

  const borderRadius = shape === "circle" ? 9999 : shape === "rounded" ? 12 : 0;

  if (!currentSrc || err) {
    return (
      <div
        className={`grid place-items-center border border-line ${className}`}
        style={{ height: size, width: size, background: bgForName(name), borderRadius }}
        aria-hidden
      >
        <span className="text-sm font-semibold text-ink">{letter}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={currentSrc}
      alt={alt ?? name}
      onError={() => {
        // if svg failed, try png once
        if (currentSrc && currentSrc.endsWith(".svg")) {
          setCurrentSrc(currentSrc.replace(/\.svg$/, ".png"));
          return;
        }
        setErr(true);
      }}
      className={`object-cover ${className}`}
      style={{ height: size, width: size, borderRadius }}
    />
  );
}
 
