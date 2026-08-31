/* Shared rendering for the blog. Reads window.POSTS from posts.js. */
(function () {
  "use strict";

  var posts = (window.POSTS || []).slice().sort(function (a, b) {
    return String(b.date || "").localeCompare(String(a.date || ""));
  });

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function formatDate(iso) {
    var parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
    if (!parts) return esc(iso);
    var d = new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3]));
    return d.toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC"
    });
  }

  function thumbFor(post) {
    if (post.thumb) return post.thumb;
    var v = post.video || {};
    if (v.type === "youtube" && v.id) {
      return "https://i.ytimg.com/vi/" + encodeURIComponent(v.id) + "/hqdefault.jpg";
    }
    return "";
  }

  function playerHTML(video, title) {
    var v = video || {};
    var label = esc(title || "video");
    if (v.type === "youtube" && v.id) {
      return '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) +
        '" title="' + label + '" loading="lazy" allowfullscreen ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>';
    }
    if (v.type === "vimeo" && v.id) {
      return '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(v.id) +
        '" title="' + label + '" loading="lazy" allowfullscreen ' +
        'allow="autoplay; fullscreen; picture-in-picture"></iframe>';
    }
    if (v.type === "file" && v.src) {
      return '<video controls preload="metadata" playsinline' +
        (v.poster ? ' poster="' + esc(v.poster) + '"' : "") +
        '><source src="' + esc(v.src) + '">Your browser cannot play this video.</video>';
    }
    return '<video controls></video>';
  }

  function tagsHTML(tags) {
    if (!tags || !tags.length) return "";
    return '<div class="tags">' + tags.map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("") + "</div>";
  }

  function paragraphs(body) {
    if (!body) return "";
    return String(body).split(/\n\s*\n/).map(function (p) {
      return "<p>" + esc(p.trim()).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  /* ---------- home page ---------- */

  function cardHTML(post) {
    var href = "post.html?id=" + encodeURIComponent(post.id);
    var thumb = thumbFor(post);
    return '<li class="card">' +
      '<a class="thumb" href="' + esc(href) + '" aria-label="' + esc(post.title) + '"' +
      (thumb ? ' style="background-image:url(' + esc(thumb).replace(/[()]/g, "") + ')"' : "") +
      "></a>" +
      '<div class="card-body">' +
        '<div class="meta">' + formatDate(post.date) + "</div>" +
        '<h2><a href="' + esc(href) + '">' + esc(post.title) + "</a></h2>" +
        (post.summary ? "<p>" + esc(post.summary) + "</p>" : "") +
        tagsHTML(post.tags) +
      "</div></li>";
  }

  function renderHome() {
    var grid = document.getElementById("post-grid");
    if (!grid) return;
    var search = document.getElementById("search");
    var count = document.getElementById("count");

    function draw(query) {
      var q = (query || "").trim().toLowerCase();
      var list = !q ? posts : posts.filter(function (p) {
        return [p.title, p.summary, p.body, (p.tags || []).join(" ")]
          .join(" ").toLowerCase().indexOf(q) !== -1;
      });

      if (count) {
        count.textContent = list.length + (list.length === 1 ? " video" : " videos");
      }

      if (!posts.length) {
        grid.innerHTML = '<li class="empty">No videos yet. Add your first one in ' +
          "<code>posts.js</code>, then commit and push.</li>";
        return;
      }
      if (!list.length) {
        grid.innerHTML = '<li class="empty">Nothing matches “' + esc(query) + '”.</li>';
        return;
      }
      grid.innerHTML = list.map(cardHTML).join("");
    }

    draw("");
    if (search) {
      search.addEventListener("input", function () { draw(search.value); });
    }
  }

  /* ---------- single post page ---------- */

  function renderPost() {
    var root = document.getElementById("post");
    if (!root) return;

    var id = new URLSearchParams(window.location.search).get("id");
    var post = posts.filter(function (p) { return p.id === id; })[0];

    if (!post) {
      root.innerHTML = '<p class="back"><a href="index.html">&larr; All videos</a></p>' +
        "<h1>Post not found</h1>" +
        '<p class="meta">There is no post with that link. It may have been renamed or removed.</p>';
      return;
    }

    document.title = post.title + " — " + (window.SITE_TITLE || "Blog");

    root.innerHTML =
      '<p class="back"><a href="index.html">&larr; All videos</a></p>' +
      '<div class="meta">' + formatDate(post.date) + "</div>" +
      "<h1>" + esc(post.title) + "</h1>" +
      (post.summary ? '<p class="meta">' + esc(post.summary) + "</p>" : "") +
      '<div class="player">' + playerHTML(post.video, post.title) + "</div>" +
      '<div class="post-body">' + paragraphs(post.body) + "</div>" +
      tagsHTML(post.tags);
  }

  /* ---------- boot ---------- */

  function boot() {
    renderHome();
    renderPost();
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
