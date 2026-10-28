# Dārzkopības kooperatīvā sabiedrība — site draft

Multi-page site in Latvian for a gardening cooperative. Static HTML, no server, no paid services.

- Preview: https://slavakhl.github.io/total-web-projects/darzkopibas-koop/
- Pages: Sākums · Par mums · Jaunumi · Dokumenti · Biedriem · Kontakti

## How to edit

1. Texts and data: `_src/content.mjs`. Page layout: `_src/build.mjs`. Styles: `assets/site.css`.
2. Rebuild: `node darzkopibas-koop/_src/build.mjs` (Node 18+). Built pages are committed so the site works without a build.
3. Text in `[[ ... ]]` is a placeholder. It shows highlighted in yellow on the site until replaced.
4. PDF documents: put files in `docs/` and set `file` for each item in `documents`.

## Notes

- Forms open the visitor's mail program (`mailto:`). No server needed.
- Map: free OpenStreetMap embed. Set real coordinates in `org.map`.
- `noindex` is on while it is a draft. Remove it in `_src/build.mjs` before launch. A custom domain can be added later with Netlify or Cloudflare Pages (free).
- News items marked `example: true` are sample texts and show a "paraugs" label.
- Waiting from the client: name, reg. number, address, contacts, board members, fees, bank details, logo, photos, real documents and texts.
