# My Video Blog

A small, dependency-free video blog. Plain HTML, CSS and JavaScript — no build
step, no framework, nothing to install. Hosted free on GitHub Pages.

## Publishing a video

1. Open `posts.js`.
2. Copy the example block and put your new post at the **top** of the list.
3. Commit and push. The site redeploys itself within a minute or two.

```js
{
  id: "studio-tour",                 // unique, url-safe — becomes the page link
  title: "A tour of my studio",
  date: "2026-09-04",                // YYYY-MM-DD, controls the ordering
  summary: "Where I shoot everything.",
  video: { type: "youtube", id: "dQw4w9WgXcQ" },
  tags: ["behind the scenes"],
  body: `Longer description goes here.

Blank lines become new paragraphs.`
}
```

### The three kinds of video

| Source | What to write |
| --- | --- |
| YouTube | `{ type: "youtube", id: "dQw4w9WgXcQ" }` — the id is the part after `v=` |
| Vimeo | `{ type: "vimeo", id: "76979871" }` — the number in the video's URL |
| Your own file | `{ type: "file", src: "assets/video/clip.mp4" }` — see `assets/video/README.md` |

YouTube posts get a thumbnail automatically. For anything else, add
`thumb: "assets/img/something.jpg"` or the card shows a plain black tile.

## Going live on GitHub Pages

The repository already contains the deploy workflow; Pages itself needs one
switch flipped by hand, because the workflow's token is not allowed to turn it
on for you:

1. Go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and re-run the latest *Deploy to GitHub Pages* run
   (or just push any commit).

The site then publishes at:

```
https://dguy02x-hash.github.io/Blog/
```

Every later push to the default branch redeploys automatically — watch it run
under the repository's **Actions** tab.

> Prefer not to use Actions? Set **Source** to *Deploy from a branch*, pick your
> default branch and the `/ (root)` folder instead. The included `.nojekyll`
> file makes that work too.

### A custom domain

Add a file named `CNAME` at the repository root containing just your domain
(e.g. `videos.example.com`), point a DNS `CNAME` record at
`dguy02x-hash.github.io`, then set the domain under **Settings → Pages**.

## Previewing locally

Open `index.html` directly in a browser — it works, because the posts live in a
JavaScript file rather than being fetched. For a closer match to the real thing:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Making it yours

| What | Where |
| --- | --- |
| Site name, headline, intro text | `index.html` (and the `brand` link in each page's header) |
| About page copy | `about.html` |
| Colours, spacing, fonts | the `:root` block at the top of `assets/css/style.css` |
| Favicon | `assets/img/favicon.svg` |
| Posts | `posts.js` |

Light and dark themes both ship — the site follows the visitor's system setting.

## Layout

```
index.html            home page, grid of every video
post.html             single-video page, reads ?id= from the URL
about.html            static about page
posts.js              your content — the only file you edit to publish
assets/css/style.css  all styling
assets/js/app.js      rendering, search, embeds
assets/video/         optional self-hosted video files
.github/workflows/    GitHub Pages deployment
```
