# Arun Pillai — AI Security Briefings

A static GitHub Pages website in plain HTML, CSS, and JavaScript. No build process, external fonts, analytics, or package installation is required. The responsive editorial design starts with weekly briefings and includes reserved profile, articles, and projects pages.

## Exact directory structure

```text
ai-security-briefings/
├── .nojekyll
├── index.html
├── README.md
├── assets/
│   ├── styles.css
│   └── app.js
├── data/
│   └── briefings.json
├── templates/
│   └── friday-briefing.json
├── profile/
│   └── index.html
├── articles/
│   └── index.html
└── projects/
    └── index.html
```

All runnable code is included in these files. Upload the CONTENTS of this folder to your repository root, so index.html is at the root rather than inside an extra nested directory.

## Publish on GitHub Pages

1. Create a GitHub repository named `ai-security-briefings` (or use an existing repository).
2. Upload all files, including the empty `.nojekyll` file, to the `main` branch.
3. In repository **Settings → Pages**, select **Deploy from a branch**, then **main** and **/(root)**. Save.
4. Open the Pages URL GitHub shows after deployment. A project repository normally uses `https://YOUR-USERNAME.github.io/ai-security-briefings/`.

Relative paths support both project repositories and a `YOUR-USERNAME.github.io` user site. A custom domain can be added later. There is no CNAME file with a guessed domain.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Preview locally

From this folder run:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/. On Windows, `py -m http.server 8000` may be appropriate. Use an HTTP server: opening index.html as a local file may block the JSON fetch.

## Insert a Friday edition

The public site intentionally starts with no published research. No example finding is represented as genuine research.

1. Copy the object from `templates/friday-briefing.json`.
2. Replace ALL `REPLACE` text and the example source URL with verified research. Use 3–5 worthwhile items; do not pad a quiet week.
3. Use a unique `id` (typically the edition date), an ISO `YYYY-MM-DD` edition date, and actual source publication dates.
4. Set `status` to `published` only after editorial review.
5. Insert the object into the `briefings` array in `data/briefings.json`. Keep older editions in the array.
6. Commit and push the change. Pages republishes from the configured branch.

A completed data file has this structure:

```json
{
  "briefings": [
    {"id":"YYYY-MM-DD","date":"YYYY-MM-DD","status":"published","title":"Edition title","summary":"Editorial summary","topics":["AI/LLM security"],"items":[]}
  ]
}
```

The empty items array above illustrates structure only; replace it with the source objects in the template before publishing. Allowed filter topics are `AI/LLM security`, `Secure SDLC for AI`, and `AI-assisted security engineering`. Each item contains title, publisher, date, url, mustRead, whatChanged, whyItMatters, worthReading, and limitations. Dates must be valid ISO dates. Source links should use HTTPS. Use one mustRead item per edition.

Latest edition selection is automatic by descending date. Draft editions are hidden. The archive supports text search, topic filtering, and expandable source summaries. Archive links can use `#brief-2026-10-09`.

## Friday-update automation handoff

The scheduled ChatGPT Friday brief delivers a reading shortlist in ChatGPT. It does NOT currently write to this repository or publish this website. The site fetches only its own static JSON file; it cannot retrieve private ChatGPT conversations.

Start with a reviewed manual update. For future publishing automation, an authorized GitHub integration or a separate GitHub Actions workflow needs to generate an edition, validate it, open a pull request or commit it, and trigger Pages publication. No credentials or pretend working auto-publisher are included.

Use this transformation instruction with the Friday results:

> Convert the reviewed briefing into one JSON object matching templates/friday-briefing.json. Preserve verified source URLs, authors/publishers and publication dates. Fill every explanatory field. Set status to draft. Include 3–5 substantive reads, pick one must-read, and do not invent evidence. Return JSON only.

Review that draft, set status to published, and append it to the public array. The public JSON is not a private draft store: keep confidential drafts outside the repository.

## Grow into a professional website

- **Profile:** replace profile/index.html with your approved bio, experience, services, and contact links.
- **Articles:** add static article pages under articles/ and link them from articles/index.html.
- **Projects:** add case studies under projects/ and link them from projects/index.html. Use only material you have permission to publish.
- **Branding:** edit colors in assets/styles.css and the publisher wording in the HTML files.
- **Brochure:** this site provides a publication hub; a downloadable PDF brochure can be added later as a separate asset.

No email address, client endorsement, employer affiliation, or professional claim beyond the minimal publication description has been invented.

## Accessibility and content handling

Includes semantic headings, skip links, labeled controls, visible keyboard focus, responsive layouts, reduced-motion support, and a JavaScript-disabled data link. Source content is rendered as text rather than HTML; non-HTTP source links are not activated. Briefings require JavaScript. This is a static template, not a CMS.
