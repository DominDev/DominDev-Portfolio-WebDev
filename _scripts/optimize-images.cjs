const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const {
  SOURCE_ROOT,
  ensureDirSync,
  formatBytes,
  resolveMirroredOutputPath,
  walkFilesSync,
} = require("./asset-pipeline-utils.cjs");

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");

const RASTER_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".tif",
  ".tiff",
]);

const COPY_ONLY_EXTENSIONS = new Set([".ico", ".svg", ".gif"]);

function isSupportedImageFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return RASTER_EXTENSIONS.has(extension) || COPY_ONLY_EXTENSIONS.has(extension);
}

function shouldProcessSourceFile(filePath) {
  return isSupportedImageFile(filePath) && Boolean(resolveMirroredOutputPath(filePath));
}

function buildSharpPipeline(inputPath, extension) {
  const pipeline = sharp(inputPath, { failOn: "none" }).rotate();

  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return pipeline.jpeg({
        quality: 82,
        mozjpeg: true,
        progressive: true,
      });
    case ".png":
      return pipeline.png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: false,
      });
    case ".webp":
      return pipeline.webp({
        quality: 80,
        effort: 6,
      });
    case ".avif":
      return pipeline.avif({
        quality: 70,
        effort: 6,
      });
    case ".tif":
    case ".tiff":
      return pipeline.tiff({
        quality: 82,
        compression: "lzw",
      });
    default:
      return pipeline;
  }
}

async function copyWithoutOptimization(sourcePath, outputPath) {
  ensureDirSync(path.dirname(outputPath));
  await fsp.copyFile(sourcePath, outputPath);
}

async function optimizeRasterImage(sourcePath, outputPath) {
  ensureDirSync(path.dirname(outputPath));
  const extension = path.extname(sourcePath).toLowerCase();
  const pipeline = buildSharpPipeline(sourcePath, extension);
  await pipeline.toFile(outputPath);
}

async function processImage(sourcePath) {
  const resolved = resolveMirroredOutputPath(sourcePath);

  if (!resolved) {
    return { status: "ignored", sourcePath };
  }

  const outputPath = resolved.outputPath;
  const extension = path.extname(sourcePath).toLowerCase();
  const sourceStats = await fsp.stat(sourcePath);

  if (!force && fs.existsSync(outputPath)) {
    const outputStats = await fsp.stat(outputPath);
    if (outputStats.mtimeMs >= sourceStats.mtimeMs) {
      return {
        status: "skipped",
        sourcePath,
        outputPath,
      };
    }
  }

  if (dryRun) {
    return {
      status: "planned",
      sourcePath,
      outputPath,
    };
  }

  const originalSize = sourceStats.size;

  if (COPY_ONLY_EXTENSIONS.has(extension)) {
    await copyWithoutOptimization(sourcePath, outputPath);
  } else {
    await optimizeRasterImage(sourcePath, outputPath);
  }

  const outputStats = await fsp.stat(outputPath);

  return {
    status: "processed",
    sourcePath,
    outputPath,
    originalSize,
    optimizedSize: outputStats.size,
  };
}

async function main() {
  if (!fs.existsSync(SOURCE_ROOT)) {
    console.log("No _assets-source directory found.");
    console.log("Create _assets-source/public or _assets-source/src/assets and place original files there.");
    return;
  }

  const files = walkFilesSync(SOURCE_ROOT).filter(shouldProcessSourceFile);

  if (files.length === 0) {
    console.log("No supported source images found in _assets-source.");
    return;
  }

  console.log(`Image pipeline source root: ${SOURCE_ROOT}`);
  console.log(`Mode: ${dryRun ? "dry-run" : force ? "force" : "incremental"}`);

  let processedCount = 0;
  let skippedCount = 0;
  let plannedCount = 0;
  let savedBytes = 0;

  for (const file of files) {
    const result = await processImage(file);

    if (result.status === "ignored") {
      continue;
    }

    if (result.status === "skipped") {
      skippedCount += 1;
      console.log(`SKIP  ${result.outputPath}`);
      continue;
    }

    if (result.status === "planned") {
      plannedCount += 1;
      console.log(`PLAN  ${result.sourcePath} -> ${result.outputPath}`);
      continue;
    }

    processedCount += 1;
    savedBytes += Math.max(0, result.originalSize - result.optimizedSize);
    console.log(
      `DONE  ${result.sourcePath} -> ${result.outputPath} (${formatBytes(result.originalSize)} -> ${formatBytes(result.optimizedSize)})`
    );
  }

  console.log("");
  console.log("Image pipeline summary");
  console.log(`- processed: ${processedCount}`);
  console.log(`- planned: ${plannedCount}`);
  console.log(`- skipped: ${skippedCount}`);

  if (!dryRun) {
    console.log(`- saved: ${formatBytes(savedBytes)}`);
  }
}

main().catch((error) => {
  console.error("Image optimization failed.");
  console.error(error);
  process.exitCode = 1;
});
