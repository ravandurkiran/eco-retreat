/**
 * Failed admin login lockout (in-memory). Keyed by email + IP.
 */

type LockEntry = { failures: number; lockedUntil: number; lastFailureAt: number };

const store = new Map<string, LockEntry>();

const MAX_FAILURES = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const WINDOW_MS = 60 * 60 * 1000;

function entryKey(email: string, ip: string): string {
  return `${email.toLowerCase().trim()}:${ip}`;
}

export function isLoginLocked(email: string, ip: string): { locked: boolean; retryAfterSec?: number } {
  const entry = store.get(entryKey(email, ip));
  if (!entry) return { locked: false };
  const now = Date.now();
  if (entry.lockedUntil > now) {
    return { locked: true, retryAfterSec: Math.ceil((entry.lockedUntil - now) / 1000) };
  }
  if (now - entry.lastFailureAt > WINDOW_MS) {
    store.delete(entryKey(email, ip));
  }
  return { locked: false };
}

export function recordFailedLogin(email: string, ip: string): void {
  const k = entryKey(email, ip);
  const now = Date.now();
  let entry = store.get(k);

  if (!entry || now - entry.lastFailureAt > WINDOW_MS) {
    entry = { failures: 0, lockedUntil: 0, lastFailureAt: now };
  }

  entry.failures += 1;
  entry.lastFailureAt = now;
  if (entry.failures >= MAX_FAILURES) {
    entry.lockedUntil = now + LOCKOUT_MS;
  }
  store.set(k, entry);
}

export function clearFailedLogins(email: string, ip: string): void {
  store.delete(entryKey(email, ip));
}

/** @internal test helper */
export function resetLoginLockoutStore(): void {
  store.clear();
}
