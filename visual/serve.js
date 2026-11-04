// Dependency-free static server for the built Storybook, so the Playwright container needs nothing extra.
const http = require("http")
const fs = require("fs")
const path = require("path")

const root = path.resolve(__dirname, "../storybook-static")
const port = Number(process.env.PORT || 6200)

const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0])
    const file = path.join(root, url.endsWith("/") ? `${url}index.html` : url)
    if (!file.startsWith(root) || !fs.existsSync(file)) {
      res.writeHead(404)
      res.end()
      return
    }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" })
    fs.createReadStream(file).pipe(res)
  })
  .listen(port, () => console.log(`storybook-static on ${port}`))
