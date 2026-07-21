const requiredPrefix = "__REQUIRED_";

function hasPublishableValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0 && value.every((item) => typeof item === "string" && item.trim().length > 0 && !item.startsWith(requiredPrefix));
  }
  return typeof value === "string" && value.trim().length > 0 && !value.startsWith(requiredPrefix);
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function factValidationErrors(fact, now = new Date()) {
  const errors = [];
  const verifiedAt = Date.parse(fact.verifiedAt ?? "");
  const reviewDueAt = Date.parse(fact.reviewDueAt ?? "");
  const currentTime = now.getTime();

  if (fact.status !== "verified") errors.push("status");
  if (!hasPublishableValue(fact.value)) errors.push("value");
  if (typeof fact.source !== "string" || !isHttpsUrl(fact.source)) errors.push("source");
  if (!Number.isFinite(verifiedAt) || verifiedAt > currentTime) errors.push("verifiedAt");
  if (!Number.isFinite(reviewDueAt) || reviewDueAt < currentTime || reviewDueAt <= verifiedAt) errors.push("reviewDueAt");
  return errors;
}

export function factIsVerified(fact, now = new Date()) {
  return factValidationErrors(fact, now).length === 0;
}

function normalizedPhone(value) {
  return typeof value === "string" ? value.replace(/[\s()-]/gu, "") : "";
}

export function factValueIsValidForKey(key, value) {
  if (key === "phone") return /^0\d{8,10}$/u.test(normalizedPhone(value));
  if (key === "canonicalUrl" || key === "kakaoChannelUrl") return isHttpsUrl(value);
  if (key === "designatedServices" || key === "serviceArea") {
    return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === "string" && item.trim().length > 0);
  }
  return hasPublishableValue(value);
}

export function factIsVerifiedForKey(key, fact, now = new Date()) {
  return factIsVerified(fact, now) && factValueIsValidForKey(key, fact.value);
}
