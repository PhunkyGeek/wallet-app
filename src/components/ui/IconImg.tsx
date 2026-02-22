import { useState } from "react";
import { Copy } from "lucide-react";

export function IconImg({ name, size = 20, alt }: { name: string; size?: number; alt?: string }) {
  const src = `/assets/icons/${name}.svg`;
  const [showImg, setShowImg] = useState(true);

  if (showImg) {
    return (
      <img
        src={src}
        alt={alt ?? name}
        width={size}
        height={size}
        className="inline-block"
        onError={() => setShowImg(false)}
      />
    );
  }

  // fallback: simple inline icon using lucide if asset missing
  return <Copy className="inline-block" style={{ width: size, height: size }} />;
}

export default IconImg;
