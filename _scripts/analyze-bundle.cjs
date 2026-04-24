const { spawnSync } = require("node:child_process");
const path = require("node:path");

const viteEntrypoint = path.join(
  process.cwd(),
  "node_modules",
  "vite",
  "bin",
  "vite.js"
);

const result = spawnSync(process.execPath, [viteEntrypoint, "build"], {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: false,
  env: {
    ...process.env,
    BUNDLE_ANALYZE: "true",
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
