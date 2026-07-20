#!/usr/bin/env node
// Calcule les hashes CSP (sha256) des scripts inline de index.html.
// A relancer apres toute modification d'un script inline, puis reporter
// les valeurs dans la Content-Security-Policy de vercel.json.
// Usage: node tools/generate-csp-hashes.cjs

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

const scripts = [];
const regex = /<script>([\s\S]*?)<\/script>/g;
let match = regex.exec(html);
while (match) {
  scripts.push(match[1]);
  match = regex.exec(html);
}

if (!scripts.length) {
  console.log("Aucun script inline dans index.html.");
  process.exit(0);
}

console.log(`${scripts.length} script(s) inline dans index.html:\n`);
scripts.forEach((content, index) => {
  const hash = crypto.createHash("sha256").update(content, "utf8").digest("base64");
  const preview = content.trim().slice(0, 60).replace(/\s+/g, " ");
  console.log(`${index + 1}. ${preview}...`);
  console.log(`   'sha256-${hash}'\n`);
});
