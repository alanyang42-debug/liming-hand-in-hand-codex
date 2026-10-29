import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

// Run from the CURRENT production source root, after copying the additive files.
// Only the verified marker is touched; the rest of the current source is retained.
const path = resolve("app/home-page.tsx");
const original = await readFile(path, "utf8");
const importLine = 'import SchoolActivities from "./components/SchoolActivities";';
const marker = '    <section className="newsroom" id="media-stories" aria-labelledby="media-stories-title">';
if (original.includes("<SchoolActivities")) {
  console.log("School activities already integrated; no change made.");
  process.exit(0);
}
if (original.split(marker).length !== 2) throw new Error("Expected exactly one newsroom marker. Stop and rebase manually on current production source.");
if (!original.startsWith('"use client";')) throw new Error("Unexpected home-page.tsx layout. Stop and inspect current source.");
const updated = original.replace('"use client";', `"use client";\n\n${importLine}`).replace(marker, `    <SchoolActivities />\n\n${marker}`);
await writeFile(`${path}.before-school-activities.bak`, original);
await writeFile(path, updated);
console.log("Added the school activity records above the existing media section. All existing content retained.");
