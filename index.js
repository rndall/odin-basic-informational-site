import http from "node:http";
import fs from "node:fs/promises";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const pageFile = `./${url === "/" ? "index" : url}.html`;

  try {
    const page = await fs.readFile(pageFile, { encoding: "utf8" });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(page);
  } catch (err) {
    try {
      const notFoundPage = await fs.readFile("./404.html", {
        encoding: "utf8",
      });
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(notFoundPage);
    } catch (err) {
      console.error(err);
    }
  }
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
