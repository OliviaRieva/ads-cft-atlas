# The Holographic Atlas

A source-linked, interactive study companion for the NBI Gauge/Gravity Duality 2021 course.

## Content

- 98 page-by-page lessons, preserving the original PDF and page images.
- 448 equation entries with explanations, derivations, conventions and corrections.
- Mathematical and physical foundations, six interactive labs, and a 128-question initial practice bank.
- All 17 tabs of the supplied Google Doc, including 3,891 image/drawing objects and 330 native equations; source order is retained.
- Reader’s guides synthesize notebook questions. OCR supports search, not authoritative mathematical transcription. Original images remain available at full resolution.

The source is *Lecture notes for GGD 2021*, Stefano Baiguera, Niels Obers and Gerben Oling (3 June 2021). Notes were imported from the document supplied by the site owner. Corrections are marked separately from originals. This is an explanatory companion, not a claim of infallibility or coverage of all research beyond this course.

## Development

Node.js >=22.13.0. Install with `npm install`; run `npm run dev`, `npm run build`, and `npm test`. Retain the vinext / Cloudflare Workers structure and Sites build plugin.

## Learning progress

D1 stores individual learner profiles, test snapshots and answers. A random HttpOnly cookie identifies a profile. Only hashes of authentication/recovery secrets are stored. Save an ATLAS recovery code to restore a profile on another browser/device. Do not share that code. Clearing cookies without a recovery code loses access to the profile; progress is not merely localStorage data. Browser storage is used only for the reading-place preference.

Tests contain unique questions. Three consecutive correct answers across tests establish mastery; a wrong answer resets the streak. Accuracy counts recorded attempts separately from mastered-question counts. End-of-test mode withholds correctness and explanation until completion. Answer keys remain server-side until the configured reveal point.

## Source ingestion

`scripts/extract_pdf.swift` renders the supplied PDF with PDFKit. `scripts/ingest-notes.mjs` downloads document images; `scripts/ocr-notes.swift` extracts search text with Vision; `scripts/prepare-notes.py` preserves structured blocks and converts native OMML equations recovered from tab DOCX exports. Private download URLs and intermediate exports stay in ignored `tmp/`, never in public data.

## Hosting

`.openai/hosting.json` declares the logical D1 binding and records the Sites project ID after creation. Sites supplies the deployed database and applies the checked-in Drizzle migration. Local migration configuration is in `db/wrangler.local.jsonc`; it is not the production database.

The bespoke social card in `public/og.png` was generated with the built-in image tool from this brief: warm ivory/teal/terracotta editorial card, title “The Holographic Atlas”, subtitle “AdS/CFT, from first principles.”, and “Derive · Explore · Practice”, with decorative boundary/bulk geometry. It is decorative, not a physical diagram.
