#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://www.asa-prenois-bourgogne.org";

const FILES_WITH_ASSETS = ["index.html", "app.js", "site-data.js", "styles.css"];
const FILES_WITH_URLS = ["index.html", "app.js", "site-data.js", "sitemap.xml", "robots.txt"];

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function toLineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function collectMeetingIds(siteDataContent) {
  const ids = new Set();
  const regex = /\bid:\s*"(r\d+)"/g;
  let match = regex.exec(siteDataContent);
  while (match) {
    ids.add(match[1]);
    match = regex.exec(siteDataContent);
  }
  return [...ids];
}

function getExpectedSitemapPaths(meetingIds) {
  const staticPaths = [
    "/",
    "/meetings",
    "/meetings/commissaire",
    "/meetings/pilote",
    "/inscriptions",
    "/inscriptions/commissaire",
    "/inscriptions/pilote",
    "/actualites",
    "/pilotes",
    "/commissaires",
    "/vie-asa",
    "/partenaires",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
    "/politique-cookies",
  ];

  const detailPaths = meetingIds.flatMap((id) => [
    `/meetings/commissaire/${id}`,
    `/meetings/pilote/${id}`,
  ]);

  return new Set([...staticPaths, ...detailPaths].map(normalizePathname));
}

function collectSitemapPaths(sitemapContent) {
  const paths = new Set();
  const locRegex = /<loc>\s*https:\/\/www\.asa-prenois-bourgogne\.org([^<]*)<\/loc>/g;
  let match = locRegex.exec(sitemapContent);

  while (match) {
    const rawPath = match[1] || "/";
    paths.add(normalizePathname(rawPath || "/"));
    match = locRegex.exec(sitemapContent);
  }

  return paths;
}

function checkAssetReferences() {
  const missing = [];
  const assetRegex = /(["'`])(assets\/[^\r\n]*?)\1/g;

  FILES_WITH_ASSETS.forEach((relativePath) => {
    const content = readFile(relativePath);
    let match = assetRegex.exec(content);

    while (match) {
      const rawAssetPath = match[2];
      const cleanAssetPath = rawAssetPath.split("?")[0];
      const absolutePath = path.join(ROOT, cleanAssetPath);

      if (!fs.existsSync(absolutePath)) {
        missing.push({
          file: relativePath,
          line: toLineNumber(content, match.index),
          asset: cleanAssetPath,
        });
      }

      match = assetRegex.exec(content);
    }
  });

  return missing;
}

function cleanUrlCandidate(value) {
  return value.replace(/[),.;]+$/, "");
}

function checkUrls() {
  const invalid = [];
  const nonHttps = [];
  const ignoredHttpUrls = new Set([
    "http://www.sitemaps.org/schemas/sitemap/0.9",
  ]);
  const urlRegex = /https?:\/\/[^\s"'`<>]+/g;

  FILES_WITH_URLS.forEach((relativePath) => {
    const content = readFile(relativePath);
    let match = urlRegex.exec(content);

    while (match) {
      const url = cleanUrlCandidate(match[0]);
      const line = toLineNumber(content, match.index);

      if (ignoredHttpUrls.has(url)) {
        match = urlRegex.exec(content);
        continue;
      }

      try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:") {
          nonHttps.push({ file: relativePath, line, url });
        }
      } catch (_error) {
        invalid.push({ file: relativePath, line, url });
      }

      match = urlRegex.exec(content);
    }
  });

  return { invalid, nonHttps };
}

function checkSitemapCoverage() {
  const siteDataContent = readFile("site-data.js");
  const sitemapContent = readFile("sitemap.xml");
  const meetingIds = collectMeetingIds(siteDataContent);
  const expected = getExpectedSitemapPaths(meetingIds);
  const actual = collectSitemapPaths(sitemapContent);

  const missing = [...expected].filter((pathName) => !actual.has(pathName));
  const unexpected = [...actual].filter((pathName) => !expected.has(pathName));

  return { missing, unexpected };
}

function main() {
  const missingAssets = checkAssetReferences();
  const { invalid: invalidUrls, nonHttps } = checkUrls();
  const sitemap = checkSitemapCoverage();

  let hasError = false;

  if (missingAssets.length) {
    hasError = true;
    console.error("Assets manquants:");
    missingAssets.forEach((item) => {
      console.error(`- ${item.file}:${item.line} -> ${item.asset}`);
    });
  }

  if (invalidUrls.length) {
    hasError = true;
    console.error("URLs invalides:");
    invalidUrls.forEach((item) => {
      console.error(`- ${item.file}:${item.line} -> ${item.url}`);
    });
  }

  if (nonHttps.length) {
    hasError = true;
    console.error("URLs non HTTPS:");
    nonHttps.forEach((item) => {
      console.error(`- ${item.file}:${item.line} -> ${item.url}`);
    });
  }

  if (sitemap.missing.length) {
    hasError = true;
    console.error("Routes absentes du sitemap:");
    sitemap.missing.forEach((pathName) => {
      console.error(`- ${BASE_URL}${pathName}`);
    });
  }

  if (sitemap.unexpected.length) {
    console.warn("Routes supplementaires dans le sitemap (a verifier):");
    sitemap.unexpected.forEach((pathName) => {
      console.warn(`- ${BASE_URL}${pathName}`);
    });
  }

  if (hasError) {
    process.exitCode = 1;
    return;
  }

  console.log("OK: verifications qualite passees (assets, URLs, sitemap).");
}

main();
