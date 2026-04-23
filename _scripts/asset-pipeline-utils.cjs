const fs = require("node:fs");
const path = require("node:path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const SOURCE_ROOT = path.join(PROJECT_ROOT, "_assets-source");

function normalizeRelativePath(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function ensureDirSync(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${Math.round(value * 100) / 100} ${units[unitIndex]}`;
}

function walkFilesSync(rootDir, collected = []) {
  if (!fs.existsSync(rootDir)) {
    return collected;
  }

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      walkFilesSync(fullPath, collected);
      continue;
    }

    if (entry.isFile()) {
      collected.push(fullPath);
    }
  }

  return collected;
}

function isAllowedOutputRelativePath(relativePath) {
  const normalized = normalizeRelativePath(relativePath);

  return (
    normalized === "public" ||
    normalized.startsWith("public/") ||
    normalized === "src/assets" ||
    normalized.startsWith("src/assets/")
  );
}

function resolveMirroredOutputPath(sourcePath) {
  const absoluteSourcePath = path.resolve(sourcePath);
  const relativePath = path.relative(SOURCE_ROOT, absoluteSourcePath);

  if (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath) ||
    !isAllowedOutputRelativePath(relativePath)
  ) {
    return null;
  }

  return {
    relativePath,
    normalizedRelativePath: normalizeRelativePath(relativePath),
    outputPath: path.resolve(PROJECT_ROOT, relativePath),
  };
}

module.exports = {
  PROJECT_ROOT,
  SOURCE_ROOT,
  ensureDirSync,
  formatBytes,
  normalizeRelativePath,
  resolveMirroredOutputPath,
  walkFilesSync,
};
