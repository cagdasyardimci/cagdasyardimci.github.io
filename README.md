# cagdasyardimci.github.io

Personal portfolio site for **Çağdaş Yardımcı** — Robotics & Signal Processing Engineer.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

## What this site does

Presents engineering work through demo videos and project descriptions in a two-column, scroll-based layout. Designed to compensate for NDA constraints that prevent sharing source code — the portfolio shows *what* the systems do, not *how* they're implemented.

## Structure

```
├── index.html              # Single-page site
├── css/
│   └── style.css           # All styles (~500 lines)
├── js/
│   └── main.js             # Scroll tracking, nav, reveals (~80 lines)
├── assets/
│   ├── resume.pdf          # Downloadable resume (add yours)
│   └── videos/
│       ├── agv-poster.jpg       # Thumbnail for AGV project
│       ├── agv-navigation.mp4   # Demo video
│       ├── welding-poster.jpg   # Thumbnail for welding project
│       └── welding-ui.mp4       # Demo video
└── README.md
```

## Deploy to GitHub Pages

1. Create a repository named `<your-username>.github.io`
2. Push all files to the `main` branch
3. Go to **Settings → Pages** → set source to `main` branch, root directory
4. Your site will be live at `https://<your-username>.github.io/`

No build step required. GitHub Pages serves the files as-is.

## Adding your videos

1. **Record or export** your demo clips. Recommended: 720p, 30–60 seconds, H.264 `.mp4`.
2. **Create a poster frame**: Take a screenshot from the video to use as the thumbnail.
   ```bash
   ffmpeg -i your-video.mp4 -ss 00:00:05 -vframes 1 poster.jpg
   ```
3. **Place files** in `/assets/videos/`:
   - `agv-poster.jpg` + `agv-navigation.mp4` — for the AGV project
   - `welding-poster.jpg` + `welding-ui.mp4` — for the welding project
4. Optionally add `.webm` versions for smaller file sizes:
   ```bash
   ffmpeg -i your-video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
   ```
5. The placeholder overlay will automatically hide once a valid poster or video source is detected.

### File size guidance

GitHub Pages has a soft limit of **1 GB** per repository. Keep videos under 25 MB each (720p H.264 at ~2 Mbps gives ~15 MB per minute). If your clips are longer, consider hosting on YouTube and embedding with a `<lite-youtube>` web component instead.

## Adding your resume

Place your generalized (non-NDA) resume as `assets/resume.pdf`. The "Download Resume" button in the About section links to this file.

## Custom domain (optional)

1. Add a `CNAME` file to the repo root containing your domain (e.g., `cagdasyardimci.com`)
2. Configure your DNS provider to point to GitHub Pages
3. See [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Browser support

Tested against all modern browsers (Chrome, Firefox, Safari, Edge). Uses:
- CSS custom properties
- CSS `aspect-ratio`
- Intersection Observer API
- `scroll-behavior: smooth`

All features are either widely supported or have graceful fallbacks.

## License

Content and design are personal. Code structure may be reused with attribution.
