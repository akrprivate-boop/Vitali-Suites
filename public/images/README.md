# 📸 Image Folder — How to add your own photos

Your photos live here. The folders are organised by purpose:

```
public/images/
├── rooms/      → room photos (AC, Non-AC, Suite)
├── pool/       → swimming pool photos
├── reception/  → reception / lobby photos
├── restaurant/ → restaurant / dining photos
└── events/     → party & event photos
```

## 1. Recommended image sizes

| Use case            | Recommended size (px) | Notes                          |
|---------------------|-----------------------|--------------------------------|
| Hero / banner       | 2000 × 1200           | Wide, high quality             |
| Room gallery        | 1200 × 800            | Landscape                      |
| Gallery thumbnails  | 1000 × 700            | Landscape                      |
| Event cards         | 1000 × 750            | Landscape                      |
| Open Graph (og-image.jpg) | 1200 × 630      | For social link previews       |

Keep each file **under ~300 KB** for fast loading. Use **.jpg** for photos,
**.webp** if you can (smaller). **.png** only for logos/graphics.

## 2. How to replace the demo images

Right now the site uses free Unsplash demo photos (links in the config files).
To use your own:

1. Drop your photo into the correct folder, e.g. `public/images/rooms/ac-1.jpg`
2. Open the matching config file and change the link to a local path:
   - **Rooms** → `config/rooms.config.js` → `gallery: ["/images/rooms/ac-1.jpg", ...]`
   - **Gallery** → `config/gallery.config.js` → `src: "/images/pool/pool-1.jpg"`
   - **Events** → `config/events.config.js` → `image: "/images/events/party-1.jpg"`
   - **Hero** → `components/Hero.js` → change the `src` on the `<Image>` tag
3. Save. The website updates automatically.

> Local paths always start with `/images/...` (no `public` in the path).

## 3. How to optimize images (free)

- **Squoosh** — https://squoosh.app (drag image, export as WebP/JPEG ~80% quality)
- **TinyPNG** — https://tinypng.com (compress JPG/PNG)
- Next.js also auto-optimizes images at runtime, so you mainly need to avoid
  uploading huge 5 MB camera files. Resize to the sizes in the table above first.
