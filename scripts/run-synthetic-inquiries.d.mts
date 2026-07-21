export const syntheticFixtures: Readonly<Record<"care" | "recruitment", Readonly<Record<string, string>>>>;
export type SyntheticEnvironment = Readonly<Record<string, string | undefined>>;
export function assertSyntheticTarget(env: SyntheticEnvironment): URL;
export function runSynthetic(env?: SyntheticEnvironment, fetchFn?: typeof fetch): Promise<void>;
