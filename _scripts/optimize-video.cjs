const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const { spawn } = require("node:child_process");
const ffmpegPath = require("ffmpeg-static");

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
const stripAudio = args.has("--strip-audio");

const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".avi", ".mkv", ".webm"]);

function isSupportedVideoFile(filePath) {
  return VIDEO_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function shouldProcessSourceFile(filePath) {
  return isSupportedVideoFile(filePath) && Boolean(resolveMirroredOutputPath(filePath));
}

function runFfmpeg(commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, commandArgs, {
      stdio: ["ignore", "ignore", "pipe"],
    });

    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(stderr || `ffmpeg exited with code ${code}`));
    });
  });
}

function buildOutputTargets(sourcePath) {
  const resolved = resolveMirroredOutputPath(sourcePath);

  if (!resolved) {
    return null;
  }

  const parsedOutput = path.parse(resolved.outputPath);
  const baseOutput = path.join(parsedOutput.dir, parsedOutput.name);

  return {
    mp4Path: `${baseOutput}.mp4`,
    webmPath: `${baseOutput}.webm`,
  };
}

async function outputsAreFresh(sourceStats, outputPaths) {
  for (const outputPath of outputPaths) {
    if (!fs.existsSync(outputPath)) {
      return false;
    }

    const outputStats = await fsp.stat(outputPath);
    if (outputStats.mtimeMs < sourceStats.mtimeMs) {
      return false;
    }
  }

  return true;
}

function buildMp4Args(sourcePath, outputPath) {
  const argsList = [
    "-y",
    "-i",
    sourcePath,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "26",
    "-movflags",
    "+faststart",
  ];

  if (stripAudio) {
    argsList.push("-an");
  }

  argsList.push(outputPath);
  return argsList;
}

function buildWebmArgs(sourcePath, outputPath) {
  const argsList = [
    "-y",
    "-i",
    sourcePath,
    "-c:v",
    "libvpx-vp9",
    "-crf",
    "36",
    "-b:v",
    "0",
    "-deadline",
    "good",
    "-cpu-used",
    "2",
  ];

  if (stripAudio) {
    argsList.push("-an");
  }

  argsList.push(outputPath);
  return argsList;
}

async function processVideo(sourcePath) {
  const targets = buildOutputTargets(sourcePath);

  if (!targets) {
    return { status: "ignored", sourcePath };
  }

  const sourceStats = await fsp.stat(sourcePath);
  const outputPaths = [targets.mp4Path, targets.webmPath];

  if (!force && (await outputsAreFresh(sourceStats, outputPaths))) {
    return {
      status: "skipped",
      sourcePath,
      outputPaths,
    };
  }

  if (dryRun) {
    return {
      status: "planned",
      sourcePath,
      outputPaths,
    };
  }

  ensureDirSync(path.dirname(targets.mp4Path));

  await runFfmpeg(buildMp4Args(sourcePath, targets.mp4Path));
  await runFfmpeg(buildWebmArgs(sourcePath, targets.webmPath));

  const [mp4Stats, webmStats] = await Promise.all([
    fsp.stat(targets.mp4Path),
    fsp.stat(targets.webmPath),
  ]);

  return {
    status: "processed",
    sourcePath,
    outputPaths,
    originalSize: sourceStats.size,
    optimizedSize: mp4Stats.size + webmStats.size,
  };
}

async function main() {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static is not available in this environment.");
  }

  if (!fs.existsSync(SOURCE_ROOT)) {
    console.log("No _assets-source directory found.");
    console.log(
      "Create mirrored video sources under _assets-source/public or _assets-source/src/assets."
    );
    return;
  }

  const files = walkFilesSync(SOURCE_ROOT).filter(shouldProcessSourceFile);

  if (files.length === 0) {
    console.log("No supported source videos found in _assets-source.");
    return;
  }

  console.log(`Video pipeline source root: ${SOURCE_ROOT}`);
  console.log(`Mode: ${dryRun ? "dry-run" : force ? "force" : "incremental"}`);
  console.log(`Audio: ${stripAudio ? "strip" : "preserve if present"}`);

  let processedCount = 0;
  let skippedCount = 0;
  let plannedCount = 0;

  for (const file of files) {
    const result = await processVideo(file);

    if (result.status === "ignored") {
      continue;
    }

    if (result.status === "skipped") {
      skippedCount += 1;
      console.log(`SKIP  ${result.outputPaths.join(" , ")}`);
      continue;
    }

    if (result.status === "planned") {
      plannedCount += 1;
      console.log(`PLAN  ${result.sourcePath} -> ${result.outputPaths.join(" , ")}`);
      continue;
    }

    processedCount += 1;
    console.log(
      `DONE  ${result.sourcePath} -> ${result.outputPaths.join(" , ")} (${formatBytes(result.originalSize)} -> ${formatBytes(result.optimizedSize)})`
    );
  }

  console.log("");
  console.log("Video pipeline summary");
  console.log(`- processed: ${processedCount}`);
  console.log(`- planned: ${plannedCount}`);
  console.log(`- skipped: ${skippedCount}`);
}

main().catch((error) => {
  console.error("Video optimization failed.");
  console.error(error);
  process.exitCode = 1;
});
