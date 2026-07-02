# 2D Materials & Devices Lab — Website

Static site, no build step, no framework. Plain HTML/CSS/JS. Works by just
opening `index.html`, and hosts for free on GitHub Pages.

## File map

```
index.html            Home
group-leader.html      Dr. Jatis Kumar Dash's bio + career timeline
group-members.html     Ph.D. students / postdocs (pulled from js/data.js)
facilities.html        Instruments (pulled from js/data.js)
research.html          Research write-ups (edit directly in the HTML)
publications.html      Publications (pulled from js/data.js) + Scholar link
contact.html           Address, map, contact form link
css/style.css          All styling / design tokens (colors, fonts, spacing)
js/data.js             <-- EDIT THIS to add/update members, facilities, publications
js/render.js           Turns js/data.js entries into cards (no need to touch)
js/main.js             Draws the hex-lattice graphic, handles nav highlighting
```

## Adding/updating content (the usual workflow)

Almost everything you'll want to change day-to-day lives in **`js/data.js`**.
Open it in any text editor (or GitHub's web editor — no local setup needed)
and add a new entry to the relevant list, matching the shape of the existing
ones. For example, to add a new Ph.D. student:

```js
phdStudents: [
  ...
  { name: "New Student Name", title: "Mr.", role: "Ph.D. Scholar", joined: "Jan 1, 2026" }
]
```

Save, commit, push — the site updates. No HTML/CSS knowledge needed for this.

For the **Group Leader bio** and **Research** page text, those are written
directly into `group-leader.html` / `research.html` since they change rarely
— just edit the text between the tags.

## Photos

Right now people/facilities use placeholder initials/icons instead of real
photos (deliberately — didn't want to hotlink images from the old Google
Sites CDN, which isn't reliable long-term). To add a real photo:

1. Drop the image file into a new `images/` folder (e.g. `images/abzal.jpg`)
2. In `js/render.js`, swap the `<div class="avatar">initials</div>` line for
   `<img class="avatar" src="images/abzal.jpg">` — happy to do this for you
   once photos are ready, just send them over.

## Hosting on GitHub Pages (free, ~5 minutes)

1. Create a GitHub account if you don't have one, and a new repository
   (e.g. `2dmd-lab`).
2. Upload all files in this folder to that repository (drag-and-drop works
   on github.com, or `git push` if you're comfortable with git).
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set Source to **Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
5. Wait ~1 minute. Your site will be live at:
   `https://<your-github-username>.github.io/2dmd-lab/`

If SRM-AP later gives the lab a proper subdomain (e.g.
`physics.srmap.edu.in/2dmd-lab`), point it at this GitHub Pages URL, or ask
me and I'll adjust the site for that host — no rebuild needed.
