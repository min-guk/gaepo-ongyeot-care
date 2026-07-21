import type { FactRecord } from "./fact-validation.mjs";

export type ProductionFacts = Record<string, FactRecord>;

export function isExplicitProductionRelease(env?: NodeJS.ProcessEnv): boolean;
export function productionRequirementErrors(facts: ProductionFacts, env?: NodeJS.ProcessEnv, now?: Date): string[];
export function publicationIsReady(facts: ProductionFacts, env?: NodeJS.ProcessEnv, now?: Date): boolean;
