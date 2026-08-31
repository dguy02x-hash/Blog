/* ============================================================
   YOUR VIDEO POSTS
   ------------------------------------------------------------
   This is the only file you need to edit to publish a video.
   Add a new object to the top of the list below, save, commit,
   and push. The site updates itself.

   Fields:
     id       (required) unique url-safe name, e.g. "my-first-video"
     title    (required) the post headline
     date     (required) "YYYY-MM-DD"
     video    (required) see the three supported forms below
     summary  (optional) one or two lines shown on the home page
     thumb    (optional) image url for the card. YouTube/Vimeo
                         posts get one automatically if omitted.
     tags     (optional) array of strings, e.g. ["vlog", "howto"]
     body     (optional) description shown under the video.
                         Blank lines start a new paragraph.

   The three forms of `video`:
     { type: "youtube", id: "dQw4w9WgXcQ" }
     { type: "vimeo",   id: "76979871" }
     { type: "file",    src: "assets/video/clip.mp4" }   // or any direct URL
   ============================================================ */

window.POSTS = [
  {
    id: "hello-world",
    title: "Hello, world — this is a sample post",
    date: "2026-08-31",
    summary:
      "Delete me once you have posted your own video. I exist to show you what the fields look like.",
    video: { type: "youtube", id: "aqz-KE-bpKQ" },
    tags: ["sample"],
    body: `This is the post body. Write whatever you like here — a description of the video, credits, links, gear you used.

Leave a blank line between paragraphs and they render as separate paragraphs.

To remove this post, open posts.js and delete this whole block.`
  }
];
