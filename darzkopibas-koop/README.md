# Dārzkopības kooperatīvā sabiedrība — site draft

Bilingual (Latvian + Russian) multi-page site for a gardening cooperative. Static HTML, no server, no paid services.

- Preview: https://slavakhl.github.io/total-web-projects/darzkopibas-koop/
- Pages (in `lv/` and `ru/`): Sākums · Par mums · Jaunumi · Dokumenti · Biedriem · Kontakti
- Logo ideas: [logo/index.html](logo/index.html) (regenerate with `node darzkopibas-koop/_src/logos.mjs`)
- LV/RU switch in the header. The root `index.html` opens the Latvian version (or Russian, if the visitor chose it before).

## How to edit

1. Texts and data: `_src/content.mjs`. Texts come in pairs `{ lv: '...', ru: '...' }`. Page layout: `_src/build.mjs`. Styles: `assets/site.css`.
2. Rebuild: `node darzkopibas-koop/_src/build.mjs` (Node 18+). Built pages are committed so the site works without a build.
3. Text in `[[ ... ]]` is a placeholder. It shows highlighted in yellow on the site until replaced.
4. PDF documents: put files in `docs/` and set `file` for each item in `documents`.

## Notes

- Forms open the visitor's mail program (`mailto:`). No server needed.
- Map: free Google Maps embed by address search (`org.mapQuery`), no API key.
- Name, reg. No. 40103057883, legal address and phone are from the Enterprise Register via company.lursoft.lv (checked 28.10.2026).
- `noindex` is on while it is a draft. Remove it in `_src/build.mjs` before launch. A custom domain can be added later with Netlify or Cloudflare Pages (free).
- News items marked `example: true` are sample texts and show a "paraugs" / "пример" label.
- Waiting from the client: email, office hours, board members, fees, bank details, plot count and area, logo choice, photos, real documents and texts.
