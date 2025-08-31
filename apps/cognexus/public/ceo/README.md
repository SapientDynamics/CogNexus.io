# CEO Portrait Assets

Place a square portrait image of the CEO in this folder so it can be displayed on the homepage founder-quote band.

Recommended:
- File name: `portrait.jpg` (you can also use `portrait.png`)
- Size: 320×320 (or larger), square aspect ratio
- Format: JPG (compressed) or PNG (transparent background)

How it’s used:
- The homepage (`apps/cognexus/src/app/page.tsx`) references `/ceo/portrait.jpg` as a CSS background image for the small circular avatar under the founder quote.
- If no file exists yet, a neutral gradient orb is shown by default.

Steps:
1. Export or crop a square headshot of the CEO.
2. Save it here as `portrait.jpg`.
3. Hard refresh the browser to see it live.

Notes:
- If you prefer PNG, save as `portrait.png` and update the `backgroundImage` URL in `page.tsx` accordingly.
- Use an optimized image to keep page weight low.
