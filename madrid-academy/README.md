# Madrid Academy

A Spanish-learning adventure RPG: nine cities across Spain, local mentors, lessons, vocabulary, idioms, grammar, readings, a study plan, and Madrid as the final destination.

## Technology

- **Plain HTML, CSS and JavaScript.** No React, no Vite, no npm, and no build step.
- `index.html` holds all the CSS and loads the `.js` files in order with `<script>` tags. **Do not change the script order.**
- The app is a single page. Routes use the URL hash (`#home`, `#map`, `#studyplan`, …), so it works on any static host.
- Character illustrations are drawn in code as SVG (`avatar.js`, `art.js`). There are no image files.
- The six Madrid attraction pictures are stored as WebP data in `madrid-photos.js`. They are AI-generated illustrations (ChatGPT), not photographs.
- The maps use Leaflet 1.9, which is included in `vendor/` (BSD-2-Clause licence). They do not load map tiles from the internet.
- Fonts (Cormorant Garamond, Zen Maru Gothic) load from Google Fonts. Without internet, the page uses fallback fonts.

## Run it locally

Open `index.html` in a browser. That's all. You can also run a small local server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy on GitHub Pages

1. Create a repository and upload **everything in this folder** to the root of the repository, including `.nojekyll` (see the note below).
2. Go to **Settings → Pages → Build and deployment**.
3. For **Source**, choose "Deploy from a branch". Then choose `main` and `/ (root)`.
4. After a minute or two, the site is live at `https://<your-username>.github.io/<repo-name>/`.

Note: `.nojekyll` starts with a dot, so your computer may hide it. If it goes missing, the site still works. It only tells GitHub not to process the files.

## What works only inside Claude (claude.ai)

Some features use the Claude artifact runtime (`window.claude`). On GitHub Pages that runtime is not there. The app checks for it and falls back where it can:

| Feature | On claude.ai | On GitHub Pages |
|---|---|---|
| Lessons, vocabulary, grammar, readings, idioms, games, exams, maps, study plan, wardrobe | ✅ | ✅ |
| Saving progress | Cloud, tied to your Claude account | Saved only in that browser (`localStorage`) |
| Audio (🔊) | Claude voice | The browser's Spanish voice, if your device has one |
| AI conversations (mentor chats, NPC talks, AI feedback on writing and speaking) | ✅ | ❌ shows "AI is not available" |
| Speech dictation | ✅ | ❌ |
| Export progress button | Downloads a file | Copies the JSON to the clipboard |

To make the AI features work outside Claude, you would need your own backend server. **Never put an API key in this client code.**

## Moving your progress

Your progress is **not** stored in these files. To move it:

1. On claude.ai, open Madrid Academy → **Settings → Your data → Export progress (JSON)**, and keep the file.
2. On the GitHub Pages site, open **Settings → Your data → Import / merge** and paste the JSON.

Progress on the GitHub Pages site stays in that one browser on that one device. Export it from time to time as a backup.
