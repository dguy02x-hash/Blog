# Self-hosted video files

Drop `.mp4` files here if you want to host video yourself instead of embedding
YouTube or Vimeo, then reference one from `posts.js`:

```js
video: { type: "file", src: "assets/video/my-clip.mp4", poster: "assets/img/my-thumb.jpg" }
```

Two things worth knowing before you do:

- GitHub limits individual files to 100 MB, and a Pages site to 1 GB total with
  a soft 100 GB/month bandwidth limit. Long or high-bitrate videos will blow
  through that — YouTube or Vimeo embeds are the safer default.
- Git stores every version of a binary file forever, so re-uploading a large
  edit repeatedly will bloat the repository.
