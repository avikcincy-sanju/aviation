// Edit these defaults so the page loads pointed at your house automatically.
// Nothing here is secret -- this file is public once pushed to GitHub.
window.AIRSPACE_CONFIG = {
  defaultZip: "45011",     // e.g. "45044" -- leave blank to require manual entry
  defaultLat: null,        // e.g. 39.4419 -- used instead of ZIP if both lat/lon are set
  defaultLon: null,        // e.g. -84.3927
  defaultRadiusMiles: 15,  // how far out to scan
  autoScanOnLoad: true,    // if a default location is set above, scan immediately on page load

  // OpenSky's CORS support is unreliable from browsers, so requests are routed
  // through a proxy that adds the missing header. This free public proxy works
  // with no signup. For a more reliable setup, deploy the included Cloudflare
  // Worker (see cloudflare-worker.js) and replace this with your own worker URL
  // in the same "?url=" style, e.g. "https://airspace-proxy.yoursubdomain.workers.dev/?url="
  corsProxy: "https://api.allorigins.win/raw?url="
};
