export type UpstreamStatusClass = "2xx" | "4xx" | "5xx" | "network";
export type DiscordDeliveryResult =
  | { state: "confirmed"; messageId: string; statusClass: "2xx" }
  | { state: "known_failure"; statusClass: "2xx" | "4xx" }
  | { state: "unknown"; statusClass: "5xx" | "network" };
