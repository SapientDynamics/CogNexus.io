# Brand assets for Forge app

Place the Forge-specific logo and brand assets here. Files are served from /brand/ at the site root for the Forge app.

Recommended filename: logo.svg
Alternative fallback: logo.png (transparent, 2x size)

Usage in code (Next.js Image):

```tsx
import Image from 'next/image';

export function ForgeBrandMark() {
  return (
    <Image
      src="/brand/logo.svg"
      alt="Forge logo"
      width={140}
      height={32}
      priority
    />
  );
}
```

Guidelines:
- Prefer SVG; provide PNG fallback if needed.
- Transparent background; keep heights around 24–40px based on placement.
- Use lowercase, hyphenated names (logo-dark.svg, etc.).

Note:
- This folder is per-app. If the Forge logo differs from the main platform, save the Forge asset here.
