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
  // Your posts go here, newest first. Copy the template below to start one:
  //
  // {
  //   id: "my-first-video",
  //   title: "My first video",
  //   date: "2026-09-01",
  //   summary: "One line about it, shown on the home page.",
  //   video: { type: "youtube", id: "dQw4w9WgXcQ" },
  //   tags: ["vlog"],
  //   body: `The longer description.
  //
  // Blank lines become new paragraphs.`
  // },
];
