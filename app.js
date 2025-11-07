import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

function getPath(fileName) {
  return join(__dirname, fileName);
}

app.get("/", (_req, res) => res.sendFile(getPath("index.html")));
app.get("/about", (_req, res) => res.sendFile(getPath("about.html")));
app.get("/contact-me", (_req, res) => res.sendFile(getPath("contact-me.html")));
app.use((_req, res) => res.status(404).sendFile(getPath("404.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
