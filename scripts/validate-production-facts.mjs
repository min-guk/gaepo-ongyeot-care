import { readFile } from "node:fs/promises";
import { isExplicitProductionRelease, productionRequirementErrors } from "../src/lib/config/production-validation.mjs";

const siteFacts = JSON.parse(await readFile(new URL("../src/data/site-facts.json", import.meta.url), "utf8"));
const strict = process.argv.includes("--mode=production") || isExplicitProductionRelease(process.env);
const errors = productionRequirementErrors(siteFacts.facts, process.env);

if (errors.length > 0) {
  const message = `Unresolved production requirements: ${errors.join(", ")}`;
  if (strict) throw new Error(message);
  console.warn(`[preview only] ${message}`);
} else {
  console.info("Production facts and required controls are verified.");
}
