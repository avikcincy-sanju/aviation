# Airspace — local flight scope

A single-page radar-style dashboard that shows real-time aircraft near a
location you choose (ZIP code or lat/lon), with a live radar scope and
per-flight detail cards (callsign, airline, distance, bearing, altitude,
speed, climb/descend trend, squawk code).

Runs entirely in the browser — no backend, no build step, no paid API keys.
Deploys straight to GitHub Pages.

## What it uses (all free)

| Purpose | API | Key needed? |
|---|---|---|
| Live aircraft position | [OpenSky Network](https://opensky-network.org) | No (anonymous, rate-limited) |
| Aircraft type / registration | [hexdb.io](https://hexdb.io) | No |
| ZIP → coordinates | [Zippopotam.us](https://www.zippopotam.us) | No |

**Not included:** flight origin/destination (route) data. The realistic free
options for that (e.g. AviationStack's free tier) only work over plain HTTP,
and GitHub Pages serves over HTTPS — so a browser blocks that call as mixed
content. Getting route data working would mean either paying for an HTTPS-
enabled plan (e.g. FlightAware AeroAPI) or adding a small serverless proxy
(a free Cloudflare Worker would do it). Everything else in this app works
with zero cost and zero signups.

## Deploy to GitHub Pages

1. Create a new **public** GitHub repo (e.g. `airspace`).
2. Upload `index.html` and `config.js` to the repo root (drag-and-drop on
   github.com works fine, or `git push` if you're using the command line).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a URL like `https://yourusername.github.io/airspace/`
   within a minute or two. That's your live page.

## Set your home location

Open `config.js` and fill in your defaults so the page loads pointed at your
house automatically instead of requiring manual entry every visit:

```js
window.AIRSPACE_CONFIG = {
  defaultZip: "45044",
  defaultLat: null,
  defaultLon: null,
  defaultRadiusMiles: 15,
  autoScanOnLoad: true
};
```

Use either `defaultZip` (US only) or `defaultLat`/`defaultLon` — if both
lat/lon are set they take priority. Nothing in this file is secret; it's
fine that it's public in the repo.

The page also remembers the last location/radius you entered manually via
the browser's local storage, so it doesn't strictly require editing
`config.js` — that's just the fastest way to make it "yours" out of the box.

## Known limitations

- **OpenSky's free/anonymous tier is rate-limited** (roughly one request per
  10 seconds, with a daily credit cap). The app refreshes every 20 seconds,
  which stays comfortably under that.
- **Coverage depends on volunteer ADS-B receivers** near your location.
  Dense in the US, Europe, and other well-covered regions; sparser
  elsewhere. An empty scope can mean "no local receiver," not "no planes."
- **Squawk 7500/7600/7700** are real universal emergency transponder codes
  (hijack / radio failure / general emergency) — the app flags them for
  awareness, not as a diagnostic tool.

## Upgrading to a real hardware feed

If you want guaranteed local coverage and no rate limits, the natural next
step is an RTL-SDR dongle + Raspberry Pi running `dump1090`, feeding this
same UI from your own receiver instead of OpenSky. That removes the
CORS/rate-limit dependency entirely and is what makes this a genuinely
always-on wall display rather than a browser demo. Ask if you want that
version built next — it swaps the OpenSky fetch for a small local Flask
endpoint and everything else here stays the same.
