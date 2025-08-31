# Brand assets for Cognexus app

Place your logo and related brand assets here. This folder lives under the app's public/ directory, so everything inside is served at the site root under /brand/.

Recommended filename: logo.svg
Alternative fallback: logo.png (transparent, 2x size for crispness)

How to reference in code (Next.js Image):

```tsx
import Image from 'next/image';

export function BrandMark() {
  return (
    <Image
      src="/brand/logo.svg" // or "/brand/logo.png"
      alt="CogNexus logo"
      width={140}
      height={32}
      priority
    />
  );
}
```

Guidelines:
- Prefer SVG (scales cleanly, small file size).
- If PNG, export on transparent BG. Suggested heights: 24–40px depending on placement.
- Keep file names lowercase and hyphenated (e.g., logo-dark.svg if we add themes later).
- This path is public: /brand/<file> (no import needed).

Where it will be used:
- Navbar brand slot in `apps/cognexus/src/components/Navigation.tsx` (currently text). After you drop your logo, I can wire it in.
