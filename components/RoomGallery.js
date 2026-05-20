"use client";

import Image from "next/image";
import { useState } from "react";

// Image gallery with a large main image + clickable thumbnails.
export default function RoomGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative h-72 overflow-hidden rounded-2xl md:h-[460px]">
        <Image
          src={images[active]}
          alt={`${name} photo ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-24 overflow-hidden rounded-xl border-2 transition ${
              active === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={img} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" sizes="30vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
